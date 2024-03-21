import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, status: isUserLoggingIn } = useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success('User logged in');
      navigate('/home', { replace: true });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isUserLoggingIn: isUserLoggingIn === 'pending' };
}
