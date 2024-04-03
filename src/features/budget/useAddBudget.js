import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { addBudget as addBudgetApi } from '../../services/api';
import { getPendingEmi } from '../../utils/helpers';
import useUserId from '../../hooks/useUserId';
import useAddExpense from '../expense/useAddExpense';

export default function useAddBudget(reset, emiData, addEmi) {
  const { addExpense, expenseAddingStatus } = useAddExpense({ source: 'emi' });
  const uid = useUserId();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { status: isBudgetAdding, mutate: createBudget } = useMutation({
    mutationFn: addBudgetApi,

    onSuccess: (budgetInfo) => {
      toast.success('Budget created');

      if (addEmi) {
        const pendingEMI = getPendingEmi(budgetInfo, emiData, uid);
        if (pendingEMI.length > 0) addExpense(pendingEMI);
      }

      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      navigate(`/budget/${budgetInfo[0].id}`, { replace: true });
    },

    onError: (err) => {
      toast.error(err.message);
    },

    onSettled: () => {
      reset();
    },
  });

  return {
    isBudgetAdding: isBudgetAdding || expenseAddingStatus === 'pending',
    createBudget,
  };
}
