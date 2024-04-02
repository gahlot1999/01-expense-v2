import { useQuery } from '@tanstack/react-query';
import { getAllEmi } from '../../services/api';

export default function useGetAllEmi(uid) {
  const { data: emiData, isLoading: isEmiLoading } = useQuery({
    queryKey: ['emis'],
    queryFn: () => getAllEmi(uid),
  });

  return { emiData, isEmiLoading };
}
