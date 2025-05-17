import React from 'react';
import AuthStatusWaiter from './AuthStatusWaiter';
import AppRoutes from '../AppRoutes';

const AuthProtectedContent: React.FC = () => {
  return (
    <AuthStatusWaiter>
      <AppRoutes />
    </AuthStatusWaiter>
  );
};

export default AuthProtectedContent;
