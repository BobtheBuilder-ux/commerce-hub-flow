
import React, { useState, useEffect } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn } from 'lucide-react';
import { isSignInWithEmailLink } from '@/lib/firebase';

// Schema for email/password login
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { 
    message: 'Password must be at least 6 characters.' 
  }),
});

// Schema for passwordless login
const passwordlessSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type PasswordlessFormValues = z.infer<typeof passwordlessSchema>;

const LoginForm = () => {
  const { signIn, signInWithGoogle, sendPasswordlessSignIn, completePasswordlessSignIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('email');
  const navigate = useNavigate();
  
  // Initialize forms
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const passwordlessForm = useForm<PasswordlessFormValues>({
    resolver: zodResolver(passwordlessSchema),
    defaultValues: {
      email: '',
    },
  });

  // Check for email sign-in link
  useEffect(() => {
    const checkEmailLink = async () => {
      const currentUrl = window.location.href;
      
      if (isSignInWithEmailLink(currentUrl)) {
        // Get the email from localStorage that was used for sign-in link
        const email = window.localStorage.getItem('emailForSignIn');
        if (email) {
          setIsSubmitting(true);
          try {
            // Fixed: Pass both required arguments - email and currentUrl
            await completePasswordlessSignIn(email, currentUrl);
            navigate('/dashboard');
          } catch (error) {
            console.error('Error completing sign-in', error);
            toast.error('Failed to complete sign-in');
          } finally {
            setIsSubmitting(false);
          }
        } else {
          // If email is not available, prompt the user to provide their email
          toast.error('Please enter your email to complete sign-in');
          setActiveTab('passwordless');
        }
      }
    };

    checkEmailLink();
  }, [navigate, completePasswordlessSignIn]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await signIn(data.email, data.password);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || "Failed to sign in");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onPasswordlessSubmit = async (data: PasswordlessFormValues) => {
    setIsSubmitting(true);
    try {
      await sendPasswordlessSignIn(data.email);
      toast.success(`Sign-in link sent to ${data.email}. Please check your email.`);
      passwordlessForm.reset();
    } catch (error: any) {
      console.error('Passwordless login error:', error);
      toast.error(error.message || "Failed to send sign-in link");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast.error(error.message || "Failed to sign in with Google");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email">Email & Password</TabsTrigger>
          <TabsTrigger value="passwordless">Passwordless Sign-In</TabsTrigger>
        </TabsList>
        
        {/* Email & Password Login */}
        <TabsContent value="email">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
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
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </Form>
        </TabsContent>
        
        {/* Passwordless Login */}
        <TabsContent value="passwordless">
          <Form {...passwordlessForm}>
            <form onSubmit={passwordlessForm.handleSubmit(onPasswordlessSubmit)} className="space-y-4">
              <FormField
                control={passwordlessForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending Link...' : 'Send Sign-In Link'}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        type="button" 
        className="w-full" 
        onClick={handleGoogleSignIn} 
        disabled={isSubmitting}
      >
        <LogIn className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>
    </div>
  );
};

export default LoginForm;
