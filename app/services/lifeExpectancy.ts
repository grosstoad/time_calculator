import { CountryLifeExpectancy, LifeExpectancyInput, CalculationResult } from '../types';

// This would be replaced with actual API call to your database
async function getCountryLifeExpectancy(country: string): Promise<CountryLifeExpectancy> {
  // Mock data - replace with actual API call
  const mockData: Record<string, CountryLifeExpectancy> = {
    'United States': {
      country: 'United States',
      maleExpectancy: 76.1,
      femaleExpectancy: 81.1,
    },
    // Add more countries as needed
  };

  return mockData[country] || mockData['United States'];
}

export async function calculateLifeExpectancy(
  input: LifeExpectancyInput
): Promise<CalculationResult> {
  const countryData = await getCountryLifeExpectancy(input.country);
  
  const lifeExpectancy = input.sex === 'male' 
    ? countryData.maleExpectancy 
    : countryData.femaleExpectancy;
    
  const remainingYears = Math.max(0, lifeExpectancy - input.age);
  const totalVisits = remainingYears * input.visitsPerYear;
  const totalHours = totalVisits * input.hoursPerVisit;
  
  return {
    remainingYears,
    remainingHours: totalHours,
    totalVisits,
    totalHours: totalHours
  };
}