import { capitalizeFirstLetter } from '../utils/helpers';
import supabase from './Supabase';

// #region EMI

export async function getAllEmi(uid) {
  let { data, error } = await supabase.from('emi').select('*').eq('uid', uid);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function addEmi(emi) {
  const { data, error } = await supabase.from('emi').insert(emi).select();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function deleteEmi(data) {
  const { error } = await supabase
    .from('emi')
    .delete()
    .eq('uid', data.uid)
    .eq('id', data.selectedEmiId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function updateEmi(object) {
  const { data, error } = await supabase
    .from('emi')
    .update(object.updatedEmi)
    .eq('id', object.id)
    .eq('uid', object.uid)
    .select();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

// #endregion EMI

// #region EXPENSES

export async function getExpenses(id, uid) {
  let { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('budgetId', id)
    .eq('uid', uid)
    .order('expenseName', { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

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

// #endregion

// #region BUDGET

export async function addBudget(budget) {
  const { data, error } = await supabase
    .from('budgets')
    .insert(budget)
    .select();

  if (error) {
    console.error(error);
    if (error.message.includes('duplicate key value'))
      throw new Error('Duplicate budget name');
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

export async function getBudget(id, uid) {
  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('id', Number(id))
    .eq('uid', uid);

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
    .order('created_at', { ascending: false })
    .eq('uid', uid);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

// #endregion

// #region CATEGORIES

export async function getCategories(uid) {
  let { data: expenseCategories, error } = await supabase
    .from('expenseCategories')
    .select('*')
    .order('categoryLabel', { ascending: true })
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
