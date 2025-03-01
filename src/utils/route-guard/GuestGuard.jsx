'use client';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './path-to/AuthGuard'; // Assuming AuthProvider is exported from the same file
import Loader from 'components/Loader';

// ==============================|| GUEST GUARD ||============================== //

export default function GuestGuard({ children }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (user && user.role) {
      const normalizedRole = user.role.toLowerCase().trim();
      const dashboardPath = getDashboardPath(normalizedRole);

      if (pathname !== dashboardPath) {
        console.log(`Authenticated user detected. Redirecting to: ${dashboardPath}`);
        router.replace(dashboardPath);
      }
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (user && user.role) {
    return null; // Redirect logic already handled above
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
      <p className="text-lg mb-6">
        You’re already authenticated! Please wait while we redirect you to your dashboard.
      </p>
      <button
        onClick={() => router.replace('/auth/login')}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Go to Login
      </button>
    </div>
  );
}

GuestGuard.propTypes = { children: PropTypes.any };

const getDashboardPath = (role) => {
  console.log(`Mapping role to dashboard: ${role}`);
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
      console.log(`Role '${role}' not recognized.`);
      return '/auth/login';
  }
};
