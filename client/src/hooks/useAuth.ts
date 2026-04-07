import { useState, useEffect } from 'react';
import { User, AuthState } from '../types';

const MOCK_USER: User = {
  id: '1',
  email: 'user@example.com',
  name: 'Book Lover',
  avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export function useAuth(): AuthState & { signIn: () => void; signOut: () => void } {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate authentication check
    const timer = setTimeout(() => {
      setUser(MOCK_USER);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signIn = () => {
    setLoading(true);
    setError(null);
    // Simulate sign in
    setTimeout(() => {
      setUser(MOCK_USER);
      setLoading(false);
    }, 500);
  };

  const signOut = () => {
    setUser(null);
    setError(null);
  };

  return {
    user,
    loading,
    error,
    signIn,
    signOut,
  };
}
