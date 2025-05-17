import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface RoleBasedContentProps {
  allowedRoles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const RoleBasedContent: React.FC<RoleBasedContentProps> = ({ allowedRoles, children, fallback = null }) => {
  const { profile, loading } = useAuth();

  if (loading) {
    return null; // Or a loading indicator
  }

  // Check if the user's profile exists and their role is in the allowedRoles array
  const hasAccess = profile && allowedRoles.includes(profile.role);

  if (hasAccess) {
    return <>{children}</>;
  } else {
    return <>{fallback}</>;
  }
};

export default RoleBasedContent;
