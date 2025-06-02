
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
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Separator } from '@/components/ui/separator';

// Admin emails list - in a real app, this would be stored in a secure backend
const ADMIN_EMAILS = [
  'admin@shophub.com',
  'manager@shophub.com',
  'support@shophub.com'
];

// Schema for admin login
const adminLoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { 
    message: 'Password must be at least 6 characters.' 
  }),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

const AdminLoginForm = () => {
  const { signIn, signInWithGoogle, currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const setUserAsAdmin = async (email: string, uid: string) => {
    if (ADMIN_EMAILS.includes(email.toLowerCase())) {
      await setDoc(doc(db, 'users', uid), {
        role: 'admin'
      }, { merge: true });
      return true;
    }
    return false;
  };

  const onSubmit = async (data: AdminLoginFormValues) => {
    setIsSubmitting(true);
    try {
      const user = await signIn(data.email, data.password);
      
      // Check if user is admin and set role
      const isAdmin = await setUserAsAdmin(data.email, user?.uid || '');
      
      if (isAdmin) {
        toast.success("Signed in as admin successfully!");
        navigate('/admin');
      } else {
        toast.error("Access denied. This email is not authorized for admin access.");
        // Don't navigate, let them try again
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      toast.error(error.message || "Failed to sign in as admin");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleSignIn(true);
    try {
      await signInWithGoogle();
      
      // Check if the signed-in user is an admin
      if (currentUser?.email) {
        const isAdmin = await setUserAsAdmin(currentUser.email, currentUser.uid);
        
        if (isAdmin) {
          toast.success("Signed in as admin with Google successfully!");
          navigate('/admin');
        } else {
          toast.error("Access denied. This Google account is not authorized for admin access.");
        }
      }
    } catch (error: any) {
      console.error('Google admin sign in error:', error);
      toast.error(error.message || "Failed to sign in with Google");
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
        {isGoogleSignIn ? 'Signing in...' : 'Continue with Google'}
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
          
          <Button type="submit" className="w-full bg-brand-chocolate hover:bg-brand-chocolate-dark" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In to Admin Panel'}
          </Button>
        </form>
      </Form>

      <div className="text-xs text-center text-muted-foreground">
        <p>Authorized admin emails only</p>
      </div>
    </div>
  );
};

export default AdminLoginForm;
