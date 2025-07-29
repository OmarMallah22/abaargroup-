// src/services/fetchArticles.ts
import { supabase } from '../config/articles';

export const fetchArticles = async (page: number, perPage: number) => {
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, error } = await supabase
    .from('articles')
    .select('id, title, image, summary, category')
    .order('id', { ascending: true })
    .range(from, to);

  if (error) throw new Error(error.message);
  return data;
};
