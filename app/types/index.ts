export interface LifeExpectancyInput {
  sex: 'male' | 'female';
  age: number;
  country: string;
  visitsPerYear: number;
  hoursPerVisit: number;
}

export interface CountryLifeExpectancy {
  country: string;
  maleExpectancy: number;
  femaleExpectancy: number;
}

export interface CalculationResult {
  remainingYears: number;
  remainingHours: number;
  totalVisits: number;
  totalHours: number;
}