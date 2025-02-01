'use client';

import { useState } from 'react';
import { LifeExpectancyForm } from './components/LifeExpectancyForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { TimeCharts } from './components/TimeCharts';
import { calculateLifeExpectancy } from './services/lifeExpectancy';
import { LifeExpectancyInput, CalculationResult } from './types';
import { Clock } from 'lucide-react';

export default function Home() {
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [currentAge, setCurrentAge] = useState<number>(30);

  const countries = ['United States', 'Canada', 'United Kingdom', 'Australia'];

  const handleSubmit = async (data: LifeExpectancyInput) => {
    const results = await calculateLifeExpectancy(data);
    setCurrentAge(data.age);
    setResults(results);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Clock className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight">Time Together Calculator</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Calculate the precious time you have left to spend with your loved ones and make every moment count.
            </p>
          </div>

          <div className="w-full flex flex-col items-center space-y-8">
            <LifeExpectancyForm onSubmit={handleSubmit} countries={countries} />
            {results && (
              <>
                <ResultsDisplay results={results} />
                <TimeCharts results={results} age={currentAge} />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}