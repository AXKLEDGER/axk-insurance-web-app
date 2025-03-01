'use client';
import PropTypes from 'prop-types';
import { useEffect, useState, useContext, createContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Loader from 'components/Loader';

// Authentication Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      console.log('🔍 AuthProvider: Checking for user in localStorage');
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log('✅ AuthProvider: Found user', parsedUser.username || parsedUser.email);
          setUser(parsedUser);
        } else {
          console.log('❌ AuthProvider: No user found in localStorage');
        }
      } catch (error) {
        console.error('⚠️ AuthProvider: Error fetching user from localStorage:', error);
      } finally {
        console.log('🏁 AuthProvider: Finished loading user');
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData) => {
    console.log('🔑 AuthProvider: Logging in user', userData.username || userData.email);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    console.log('🚪 AuthProvider: Logging out user');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = { children: PropTypes.node };

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log('🛡️ AuthGuard: Initializing guard check on path', pathname);

    const checkAuth = () => {
      try {
        console.log('🔐 AuthGuard: Checking authentication status');
        const userStr = localStorage.getItem('user');

        if (!userStr) {
          console.log('❌ AuthGuard: No user found in localStorage');
          // No user found, redirect to login
          if (!pathname.startsWith('/auth')) {
            console.log('🔄 AuthGuard: Redirecting to login page');
            router.replace('/auth/login');
          } else {
            console.log('✅ AuthGuard: Already on auth page, no redirect needed');
          }
          setIsChecking(false);
          return;
        }

        const user = JSON.parse(userStr);
        console.log('✅ AuthGuard: User found', user.username || user.email);

        const role = user?.role?.toLowerCase()?.trim();
        if (!role) {
          console.log('⚠️ AuthGuard: User has no role, redirecting to login');
          if (!pathname.startsWith('/auth')) {
            router.replace('/auth/login');
          }
          setIsChecking(false);
          return;
        }

        console.log('👤 AuthGuard: User role is', role);

        // User is authenticated
        const dashboardPath = getDashboardPath(role);
        console.log('🏠 AuthGuard: Dashboard path is', dashboardPath);

        // If on auth route, redirect to dashboard
        if (pathname.startsWith('/auth')) {
          console.log('🔄 AuthGuard: On auth page with valid user, redirecting to dashboard');
          router.replace(dashboardPath);
        }
        // If at root, redirect to dashboard
        else if (pathname === '/') {
          console.log('🔄 AuthGuard: At root path, redirecting to dashboard');
          router.replace(dashboardPath);
        } else {
          console.log('✅ AuthGuard: User is authenticated on a valid path');
        }

        setIsChecking(false);
      } catch (error) {
        console.error('⚠️ AuthGuard: Auth check error:', error);
        setIsChecking(false);
        if (!pathname.startsWith('/auth')) {
          console.log('🔄 AuthGuard: Error during auth check, redirecting to login');
          router.replace('/auth/login');
        }
      }
    };

    // Short timeout to ensure console logs appear in sequence
    setTimeout(checkAuth, 100);
  }, [pathname, router]);

  // Show what's being rendered
  useEffect(() => {
    if (!isChecking) {
      if (pathname.startsWith('/auth')) {
        console.log('🎭 AuthGuard: Rendering auth page content');
      } else if (localStorage.getItem('user')) {
        console.log('🎭 AuthGuard: Rendering protected content for authenticated user');
      } else {
        console.log('⏳ AuthGuard: Showing loader while redirecting');
      }
    }
  }, [isChecking, pathname]);

  // Only show loader during the initial check
  if (isChecking) {
    console.log('⏳ AuthGuard: Showing loader during initial check');
    return <Loader />;
  }

  // For auth pages or authenticated users, render children
  if (pathname.startsWith('/auth') || localStorage.getItem('user')) {
    return <>{children}</>;
  }

  // Show loader during redirect for protected pages
  console.log('⏳ AuthGuard: Showing loader during redirect');
  return <Loader />;
}

AuthGuard.propTypes = { children: PropTypes.node };

const getDashboardPath = (role) => {
  switch (role) {
    case 'admin':
      return '/admin-portal/dashboard';
    case 'cooperative_member':
      return '/alliance-portal/dashboard';
    case 'large_scale_farmer':
      return '/farmer-portal/dashboard';
    case 'wholesale_trader':
      return '/trader-portal/dashboard';
    case 'retail_client':
      return '/retail-portal/dashboard';
    default:
      return '/auth/login';
  }
};