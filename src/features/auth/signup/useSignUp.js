import { useMutation } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useSignUp() {
  const navigate = useNavigate();
  const { mutate: signUp, status: isUserSigningUp } = useMutation({
    mutationFn: signUpApi,

    onSuccess: (data) => {
      console.log(data);
      toast.success('User created');
      navigate('/login', { replace: true, state: { email: data.user.email } });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signUp, isUserSigningUp: isUserSigningUp === 'pending' };
}
