
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/sonner';
import { Shield } from 'lucide-react';

// Schema for admin registration
const adminRegisterSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Admin password must be at least 8 characters.',
  }),
  confirmPassword: z.string(),
  adminCode: z.string().min(4, {
    message: 'Admin registration code is required.',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type AdminRegisterFormValues = z.infer<typeof adminRegisterSchema>;

const AdminRegisterForm = () => {
  const { signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<AdminRegisterFormValues>({
    resolver: zodResolver(adminRegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      adminCode: '',
    },
  });

  const onSubmit = async (data: AdminRegisterFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, we'd verify the admin code here
      // For this example, we'll just create the account
      await signUp(data.email, data.password, data.name);
      
      // In a real implementation, we would set the user role to admin here
      toast.success("Admin account created successfully!");
      navigate('/admin');
    } catch (error: any) {
      console.error('Admin registration error:', error);
      toast.error(error.message || "Failed to create admin account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-4">
        <div className="bg-brand-purple p-3 rounded-full">
          <Shield className="h-6 w-6 text-white" />
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Email</FormLabel>
                <FormControl>
                  <Input placeholder="admin@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="adminCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Registration Code</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter admin code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-brand-purple hover:bg-brand-purple-dark" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create Admin Account'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AdminRegisterForm;
