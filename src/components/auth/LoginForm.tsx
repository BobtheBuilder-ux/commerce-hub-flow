
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { 
    message: 'Password must be at least 6 characters.' 
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { signIn, signInWithMagicLink } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMagicLink, setIsMagicLink] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      if (isMagicLink) {
        const currentUrl = window.location.origin;
        await signInWithMagicLink(data.email, currentUrl);
        toast.success("Magic link sent! Check your email to sign in.");
      } else {
        await signIn(data.email, data.password);
        toast.success("Signed in successfully!");
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || "Failed to sign in");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {!isMagicLink && (
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
          )}
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : isMagicLink ? 'Send Magic Link' : 'Sign In'}
          </Button>
        </form>
      </Form>
      
      <div className="text-center">
        <Button 
          variant="link" 
          onClick={() => setIsMagicLink(!isMagicLink)}
          className="text-sm"
        >
          {isMagicLink ? 'Use password instead' : 'Use magic link instead'}
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
