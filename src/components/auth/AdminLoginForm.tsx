
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

// Schema for admin login
const adminLoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { 
    message: 'Password must be at least 6 characters.' 
  }),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

const AdminLoginForm = () => {
  const { signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: AdminLoginFormValues) => {
    setIsSubmitting(true);
    try {
      await signIn(data.email, data.password);
      
      // In a real app, we'd check if the user has admin role here
      // and redirect accordingly
      navigate('/admin');
    } catch (error: any) {
      console.error('Admin login error:', error);
      toast.error(error.message || "Failed to sign in as admin");
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
                <FormLabel>Admin Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-brand-purple hover:bg-brand-purple-dark" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In to Admin Panel'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AdminLoginForm;
