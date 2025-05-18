
import React from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import AdminRegisterForm from '@/components/auth/AdminRegisterForm';

const AdminRegister = () => {
  return (
    <AuthLayout
      title="Admin Registration"
      subtitle="Create a new administrator account"
      accountText="Already an administrator?"
      accountLinkText="Sign in"
      accountLinkPath="/admin/login"
    >
      <AdminRegisterForm />
    </AuthLayout>
  );
};

export default AdminRegister;
