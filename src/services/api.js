import toast from 'react-hot-toast';
import supabase from './Supabase';

export async function createbudget(budget) {
  const { data, error } = await supabase
    .from('budgets')
    .insert(budget)
    .select();

  if (error) {
    error.message.includes('duplicate key value')
      ? toast.error('Duplicate budget name')
      : toast.error('Failed to create budget.');
    throw new Error(error?.message);
  }

  if (!error && data) toast.success('Budget created successfully');
}
