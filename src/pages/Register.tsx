
import React from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register below to start shopping with us"
      accountText="Already have an account?"
      accountLinkText="Sign in"
      accountLinkPath="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
