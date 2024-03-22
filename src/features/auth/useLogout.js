import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logout as logoutApi } from '../../services/api';

export default function useLogout(setIsMenuOpen) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, status: isUserLoggingOut } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      toast.success('Logged out');
    },

    onError: (err) => {
      toast.error(err.message);
    },

    onSettled: () => {
      queryClient.clear();
      navigate('/login', { replace: true });
      setIsMenuOpen(false);
    },
  });

  return { logout, isUserLoggingOut: isUserLoggingOut === 'pending' };
}
