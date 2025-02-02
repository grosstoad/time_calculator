import { supabase } from '../lib/supabase';
import { LifeExpectancyInput, CalculationResult } from '../types';

async function getLifeExpectancy(year: number, country: string, sex: string, age: number) {
  try {
    console.log('Fetching life expectancy with params:', { year, country, sex, age });
    
    // First, test if we can get any data at all
    const testQuery = await supabase
      .from('conditional_life_expectancy')
      .select('*', { count: 'exact' });  // Get count of all records
      
    console.log('Total records in table:', testQuery.count);
    console.log('Sample of records:', testQuery.data?.slice(0, 2));

    // Then try our specific query
    const response = await supabase
      .from('conditional_life_expectancy')
      .select('ex')
      .eq('Year', year)
      .eq('Country', country)
      .eq('Sex', sex === 'male' ? 'Male' : 'Female')
      .eq('Age', age);

    console.log('Raw Supabase response:', JSON.stringify(response, null, 2));

    if (response.error) {
      console.error('Supabase query error:', response.error);
      throw new Error(`Database query failed: ${response.error.message}`);
    }

    if (!response.data || response.data.length === 0) {
      const errorMessage = `No data found for params: year=${year}, country=${country}, sex=${sex}, age=${age}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    return response.data[0].ex;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in getLifeExpectancy:', errorMessage);
    throw new Error(errorMessage);
  }
}

export async function calculateLifeExpectancy(
  input: LifeExpectancyInput
): Promise<CalculationResult> {
  try {
    // We'll use the most recent year available (2000 in your sample)
    const currentYear = 2000;
    
    const lifeExpectancy = await getLifeExpectancy(
      currentYear,
      input.country,
      input.sex,
      input.age
    );
      
    const remainingYears = lifeExpectancy;
    const totalVisits = remainingYears * input.visitsPerYear;
    const remainingHours = totalVisits * input.hoursPerVisit;
    
    return {
      remainingYears,
      remainingHours,
      totalVisits,
      totalHours: remainingHours
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in calculateLifeExpectancy:', errorMessage);
    throw new Error(errorMessage);
  }
}

// Function to get available countries
export async function getAvailableCountries(): Promise<string[]> {
  try {
    console.log('Attempting to fetch countries from Supabase...');
    
    const { data, error } = await supabase
      .from('conditional_life_expectancy')
      .select('Country')
      .eq('Age', 0);

    if (error) {
      console.error('Supabase error details:', {
        code: error.code,
        message: error.message,
        details: error.details
      });
      throw new Error(`Failed to fetch countries: ${error.message}`);
    }

    if (!data) {
      console.error('No data returned from Supabase');
      throw new Error('No data returned from Supabase');
    }

    console.log('Raw Supabase response:', data);

    const countries = Array.from(new Set(data.map(row => row.Country))).sort();
    console.log('Processed countries:', countries);

    return countries;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in getAvailableCountries:', errorMessage);
    throw new Error(errorMessage);
  }
}