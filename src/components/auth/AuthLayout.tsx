
import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  accountText: string;
  accountLinkText: string;
  accountLinkPath: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  accountText,
  accountLinkText,
  accountLinkPath,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="block text-3xl font-bold text-brand-purple">
            ShopHub
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        </div>
        
        {children}
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {accountText}{' '}
            <Link to={accountLinkPath} className="font-medium text-brand-purple hover:text-brand-purple-dark">
              {accountLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
