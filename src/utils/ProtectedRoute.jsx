import { useUser } from '../features/auth/useUser';
import { FullPageSpinner } from '../components/Spinner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, navigate, isLoading]);

  if (isLoading) return <FullPageSpinner additionalStyles={'h-screen'} />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
