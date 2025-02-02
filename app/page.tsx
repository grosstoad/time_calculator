'use client';

import { useState, useEffect } from 'react';
import { LifeExpectancyForm } from './components/LifeExpectancyForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { TimeCharts } from './components/TimeCharts';
import { calculateLifeExpectancy, getAvailableCountries } from './services/lifeExpectancy';
import { LifeExpectancyInput, CalculationResult } from './types';
import { Clock } from 'lucide-react';
import { supabase } from './lib/supabase';

export default function Home() {
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [countries, setCountries] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCountries() {
      try {
        setIsLoading(true);
        const availableCountries = await getAvailableCountries();
        console.log('Fetched countries:', availableCountries);
        setCountries(availableCountries);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError('Failed to load countries');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCountries();
  }, []);

  const handleSubmit = async (data: LifeExpectancyInput) => {
    try {
      const results = await calculateLifeExpectancy(data);
      setCurrentAge(data.age);
      setResults(results);
    } catch (error) {
      console.error('Error calculating life expectancy:', error);
    }
  };

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (isLoading) {
    return <div className="p-4">Loading countries...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Clock className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight">Time Together Calculator</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Calculate the precious time you have left to spend with your loved ones and make every moment count.
            </p>
          </div>
          <div className="w-full max-w-5xl">
            <LifeExpectancyForm onSubmit={handleSubmit} results={results} />
          </div>
        </div>
      </div>
    </main>
  );
}