import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://xinjmliyypvduxfuvgle.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpbmptbGl5eXB2ZHV4ZnV2Z2xlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzNjkwMTcsImV4cCI6MjAxNjk0NTAxN30.-38U0qkMIZg2_opRI1TwXIYWRpfG13HOP7fyNyXzSq8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
