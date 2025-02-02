import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Environment Variables Check:');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

console.log('Supabase URL:', supabaseUrl?.slice(0, 8) + '...');  // Log partial URL for security
console.log('Supabase Key exists:', !!supabaseAnonKey);

if (!supabaseUrl) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL');
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
});

// Test the connection with more detailed logging
console.log('Testing Supabase connection...');

void (async () => {
  try {
    const { data, error } = await supabase
      .from('conditional_life_expectancy')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase connection test failed:', {
        code: error.code,
        message: error.message,
        details: error.details
      });
    } else {
      console.log('Supabase connection successful');
      console.log('Sample data:', data);
    }
  } catch (error) {
    console.error('Supabase connection test error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error)
    });
  }
})();

// Add after creating the supabase client
console.log('Testing basic query...');
void supabase
  .from('conditional_life_expectancy')
  .select('*')
  .limit(1)
  .then(response => {
    console.log('Query Response:', {
      error: response.error,
      data: response.data,
      status: response.status,
    });
  });