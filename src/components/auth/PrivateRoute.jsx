import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';

function PrivateRoute({ element, ...rest }) {
  const ctx = useAuth();

  return ctx.isUserLoggedIn ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;