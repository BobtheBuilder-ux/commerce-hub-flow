
import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/sonner';

interface PayPalButtonProps {
  onSuccess: (orderId: string, paymentId: string) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ onSuccess }) => {
  const { subtotal, clearCart } = useCart();
  const [{ isPending }] = usePayPalScriptReducer();

  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (isPending) {
    return (
      <div className="animate-pulse bg-gray-200 h-12 rounded">
        <div className="h-full bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <PayPalButtons
      style={{
        layout: "vertical",
        color: "gold",
        shape: "rect",
        label: "paypal"
      }}
      createOrder={(data, actions) => {
        console.log('Creating PayPal order with total:', total.toFixed(2));
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: total.toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: subtotal.toFixed(2)
                  },
                  shipping: {
                    currency_code: "USD",
                    value: shipping.toFixed(2)
                  },
                  tax_total: {
                    currency_code: "USD",
                    value: tax.toFixed(2)
                  }
                }
              },
              description: "E-commerce Order"
            }
          ],
          application_context: {
            shipping_preference: "SET_PROVIDED_ADDRESS"
          }
        });
      }}
      onApprove={async (data, actions) => {
        try {
          console.log('PayPal order approved:', data.orderID);
          const details = await actions.order?.capture();
          console.log('PayPal order captured:', details);
          
          if (details?.status === 'COMPLETED') {
            toast.success('Payment completed successfully!');
            clearCart();
            onSuccess(data.orderID, details.id);
          } else {
            throw new Error('Payment not completed');
          }
        } catch (error) {
          console.error('PayPal payment error:', error);
          toast.error('Payment failed. Please try again.');
        }
      }}
      onError={(err) => {
        console.error('PayPal error:', err);
        toast.error('Payment service unavailable. Please try again later.');
      }}
      onCancel={() => {
        console.log('PayPal payment cancelled by user');
        toast.info('Payment cancelled');
      }}
    />
  );
};

export default PayPalButton;
