
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
import { Separator } from '@/components/ui/separator';

// Admin emails list - in a real app, this would be stored in a secure backend
const ADMIN_EMAILS = [
  'admin@shophub.com',
  'manager@shophub.com',
  'support@shophub.com'
];

const adminRegisterSchema = z.object({
  displayName: z.string().min(2, { 
    message: 'Display name must be at least 2 characters.' 
  }),
  email: z.string().email({ message: 'Please enter a valid email address.' })
    .refine((email) => ADMIN_EMAILS.includes(email.toLowerCase()), {
      message: 'This email is not authorized for admin access.',
    }),
  password: z.string().min(6, { 
    message: 'Password must be at least 6 characters.' 
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type AdminRegisterFormValues = z.infer<typeof adminRegisterSchema>;

const AdminRegisterForm = () => {
  const { signUp, signInWithGoogle } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<AdminRegisterFormValues>({
    resolver: zodResolver(adminRegisterSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: AdminRegisterFormValues) => {
    setIsSubmitting(true);
    try {
      // Pass true as the isAdmin parameter
      await signUp(data.email, data.password, data.displayName, true);
      // Navigation will be handled automatically in the signUp function
    } catch (error: any) {
      console.error('Admin registration error:', error);
      // Error toast is already shown in signUp function
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleSignIn(true);
    try {
      await signInWithGoogle();
      // Check if the user is an admin after sign-in
      setTimeout(() => {
        // This will be handled by the auth state change
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.error('Google admin sign up error:', error);
      toast.error(error.message || "Failed to sign up with Google");
    } finally {
      setIsGoogleSignIn(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-4">
        <div className="bg-brand-chocolate p-3 rounded-full">
          <Shield className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Only authorized email addresses can create admin accounts
        </p>
        <div className="text-xs bg-blue-50 p-3 rounded-lg">
          <p className="font-semibold mb-1">Authorized Admin Emails:</p>
          {ADMIN_EMAILS.map((email) => (
            <p key={email} className="text-blue-600">{email}</p>
          ))}
        </div>
      </div>

      <Button
        onClick={handleGoogleSignIn}
        disabled={isGoogleSignIn}
        variant="outline"
        className="w-full border-brand-chocolate hover:bg-brand-chocolate/10"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {isGoogleSignIn ? 'Signing up...' : 'Continue with Google'}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="displayName"
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
                  <Input placeholder="admin@shophub.com" {...field} />
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
                  <Input type="password" placeholder="******" {...field} />
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
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-brand-chocolate hover:bg-brand-chocolate-dark" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Admin Account...' : 'Create Admin Account'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AdminRegisterForm;
