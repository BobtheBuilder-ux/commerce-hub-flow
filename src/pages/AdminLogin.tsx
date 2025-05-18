
import React from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import AdminLoginForm from '@/components/auth/AdminLoginForm';

const AdminLogin = () => {
  return (
    <AuthLayout
      title="Admin Sign In"
      subtitle="Enter your credentials to access the admin panel"
      accountText="Not an administrator?"
      accountLinkText="Go to customer login"
      accountLinkPath="/login"
    >
      <AdminLoginForm />
    </AuthLayout>
  );
};

export default AdminLogin;
