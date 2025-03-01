// project-imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import Login from 'views/authentication/Login';

// ==============================|| LANDING PAGE ||============================== //

export default function Landing() {
  return (
    // <AuthGuard>
    <Login />
    // </AuthGuard>
  );
}