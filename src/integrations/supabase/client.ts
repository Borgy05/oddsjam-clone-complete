import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pesmrxusxuubguwjwkgd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlc21yeHVzeHV1Ymd1d2p3a2dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NTQyNjQsImV4cCI6MjA3NTQzMDI2NH0.bA8LpLi-WAL0KKbY2Kotw7WBVE3z6dlCggtYvu3o3Jo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";
