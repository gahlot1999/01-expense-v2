import toast from 'react-hot-toast';
import supabase from './Supabase';

export async function createbudget(budget) {
  const { data, error } = await supabase
    .from('budgets')
    .insert(budget)
    .select();

  if (error) {
    toast.error('Failed to create budget.');
    throw new Error(error?.message);
  }

  if (!error && data) toast.success('Budget created successfully');
}
