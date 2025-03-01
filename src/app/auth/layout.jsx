import PropTypes from 'prop-types';
// project-imports
import AuthGuard from 'utils/route-guard/AuthGuard';

// ==============================|| AUTH LAYOUT ||============================== //

export default function Layout({ children }) {
  return children;
  // return (
  //   <>
  //     <AuthGuard>
  //       {children}
  //     </AuthGuard>
  //   </>
  // );
}

Layout.propTypes = { children: PropTypes.node };
