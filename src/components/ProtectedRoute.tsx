import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-orange-50">
        <div className="text-brand-orange font-bold text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}