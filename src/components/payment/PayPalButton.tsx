
import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/sonner';

interface PayPalButtonProps {
  onSuccess: () => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ onSuccess }) => {
  const { subtotal, clearCart } = useCart();
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return <div className="animate-pulse bg-gray-200 h-12 rounded"></div>;
  }

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: (subtotal + 9.99 + (subtotal * 0.08)).toFixed(2),
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        try {
          const details = await actions.order?.capture();
          toast.success('Payment completed successfully!');
          clearCart();
          onSuccess();
        } catch (error) {
          console.error('PayPal payment error:', error);
          toast.error('Payment failed. Please try again.');
        }
      }}
      onError={(err) => {
        console.error('PayPal error:', err);
        toast.error('Payment failed. Please try again.');
      }}
    />
  );
};

export default PayPalButton;
