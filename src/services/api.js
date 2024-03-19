import supabase from './Supabase';

export async function addExpense(expense) {
  const { data: response, error } = await supabase
    .from('expenses')
    .insert(expense)
    .select();

  if (error) {
    console.error(error);
    throw new Error('Expense could not be added');
  }

  return response;
}

export async function addBudget(budget) {
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

export async function getExpenses(id) {
  let { data: expenses, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('budgetId', id);

  if (error) {
    console.error(error);
    throw new Error('Expenses could not be loaded');
  }

  return expenses;
}

export async function deleteBudget(id) {
  const { error } = await supabase
    .from('budgets')
    .delete()
    .eq('id', Number(id));

  if (error) {
    console.error(error);
    throw new Error('Budget could not be deleted');
  }
}
