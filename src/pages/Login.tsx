
import React from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Enter your credentials below to access your account"
      accountText="Don't have an account?"
      accountLinkText="Create one now"
      accountLinkPath="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
