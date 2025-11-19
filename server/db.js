// db.js — CommonJS safe loader for DB/Supabase client
// This file loads dotenv and exports a safe interface. It will not crash
// the application if `@supabase/supabase-js` is not installed; instead
// it exports `getSupabase()` which returns `null` when supabase isn't available.

require('dotenv').config();

const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  databaseUrl: process.env.DATABASE_URL || '',
  nodeEnv: process.env.NODE_ENV || 'development'
};

let supabase = null;
let supabaseAvailable = false;

try {
  // require dynamically to avoid crashing when package not installed
  const { createClient } = require('@supabase/supabase-js');
  if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    supabaseAvailable = true;
  } else {
    // env not configured; keep supabase null
    supabaseAvailable = false;
    console.warn('SUPABASE_URL or SUPABASE_KEY not set in .env; supabase client not created.');
  }
} catch (e) {
  // package not installed or other error — don't throw, just warn
  console.warn('Supabase client not available (optional). Install @supabase/supabase-js to enable it.');
}

module.exports = {
  config,
  getSupabase: () => (supabaseAvailable ? supabase : null),
  hasSupabase: () => supabaseAvailable
};
