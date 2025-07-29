import { createClient } from '@supabase/supabase-js'

// ⚠️ الخطوة الأهم: استبدل هذه القيم بالقيم الصحيحة من مشروعك في Supabase
const supabaseUrl = 'https://pmrkzpjuziindbqgjxid.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtcmt6cGp1emlpbmRicWdqeGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NjY5NTgsImV4cCI6MjA2NzQ0Mjk1OH0.Eqr2cwnDYDdf47m8lAB3lACnLVaN6VmGWXIH9_W5yxQ';

// This will stop the app from running if the keys are missing
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required. Make sure to set them in your connection file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)