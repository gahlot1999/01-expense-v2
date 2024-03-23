import { capitalizeFirstLetter } from '../utils/helpers';
import supabase from './Supabase';

export async function addExpense(expense) {
  const { data, error } = await supabase
    .from('expenses')
    .insert(expense)
    .select();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function editExpense(updatedExpense) {
  const { data, error } = await supabase
    .from('expenses')
    .update(updatedExpense)
    .eq('id', Number(updatedExpense.id))
    .select();

  if (error) {
    console.error(error);
    throw new Error(error.message);
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
    throw new Error(error.message);
  }
}

export async function addBudget(budget) {
  const { data, error } = await supabase
    .from('budgets')
    .insert(budget)
    .select();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getBudgets(uid) {
  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('uid', uid)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getBudget(id) {
  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('id', Number(id));

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function updateBudget(updatedObject) {
  const { data, error } = await supabase
    .from('budgets')
    .update(updatedObject)
    .eq('id', Number(updatedObject.id))
    .select();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getExpenses(id) {
  let { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('budgetId', id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function deleteBudget(id) {
  const { error } = await supabase
    .from('budgets')
    .delete()
    .eq('id', Number(id));

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

// #region CATEGORIES

export async function getCategories(uid) {
  console.log(uid);
  let { data: expenseCategories, error } = await supabase
    .from('expenseCategories')
    .select('*')
    .eq('uid', uid);

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

// #region AUTH

export async function login(user) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function signUp(user) {
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        name: `${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(
          user.lastName,
        )}`,
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data } = await supabase.auth.getUser();

  return data?.user;
}

// #endregion AUTH
