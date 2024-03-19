import supabase from './Supabase';

export async function createBudget(budget) {
  const { data: response, error } = await supabase
    .from('budgets')
    .insert(budget)
    .select();

  if (error) {
    console.error(error);
    if (error.message.includes('duplicate key value')) {
      throw new Error('Duplicate budget name');
    }
    throw new Error('Budget could not be created');
  }

  return response;
}

export async function getBudgets() {
  const { data: budgets, error } = await supabase
    .from('budgets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    throw new Error('Budgets could not be loaded');
  }

  return budgets;
}
