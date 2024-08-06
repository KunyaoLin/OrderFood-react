import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_supabaseUrl;
const supabaseKey = process.env.REACT_APP_supabaseKey;

export const supabase = createClient(supabaseUrl, supabaseKey);
