import { useQueryClient } from '@tanstack/react-query';

export default function useUserId() {
  const queryClient = useQueryClient();
  const userId = queryClient.getQueryData(['user']).id;

  return userId;
}
