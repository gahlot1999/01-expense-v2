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

export async function editExpense(updatedExpense) {
  const { data, error } = await supabase
    .from('expenses')
    .update(updatedExpense)
    .eq('id', Number(updatedExpense.id))
    .select();

  if (error) {
    console.error(error);
    throw new Error('Expense could not be updated');
  }

  return data;
}

export async function deleteExpense(id) {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', Number(id));

  if (error) {
    console.error(error);
    throw new Error('Expense could not be deleted');
  }
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

export async function getBudget(id) {
  const { data: budget, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('id', Number(id));

  if (error) {
    console.error(error);
    throw new Error('Budgets could not be loaded');
  }

  return budget;
}

export async function updateBudget(updatedObject) {
  const { data: response, error } = await supabase
    .from('budgets')
    .update(updatedObject)
    .eq('id', Number(updatedObject.id))
    .select();

  if (error) {
    console.error(error);
    throw new Error('Budget could not be updated');
  }

  return response;
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

// #region CATEGORIES

export async function getCategories() {
  let { data: expenseCategories, error } = await supabase
    .from('expenseCategories')
    .select('*');

  if (error) {
    console.error(error);
    throw new Error('Could not be get categories');
  }

  return expenseCategories;
}

export async function addCategory(category) {
  const { data, error } = await supabase
    .from('expenseCategories')
    .insert(category)
    .select();

  if (error) {
    console.error(error);
    throw new Error('Category could not be added');
  }

  return data;
}

export async function deleteCategory(id) {
  const { error } = await supabase
    .from('expenseCategories')
    .delete()
    .eq('id', Number(id));

  if (error) {
    console.error(error);
    throw new Error('Category could not be deleted');
  }
}

// #endregion
