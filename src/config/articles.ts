import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://pmrkzpjuziindbqgjxid.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtcmt6cGp1emlpbmRicWdqeGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NjY5NTgsImV4cCI6MjA2NzQ0Mjk1OH0.Eqr2cwnDYDdf47m8lAB3lACnLVaN6VmGWXIH9_W5yxQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);