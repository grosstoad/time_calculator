'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalculationResult } from '../types';
import { Clock, Calendar, HeartPulse, Users } from 'lucide-react';

interface Props {
  results: CalculationResult | null;
}

export function ResultsDisplay({ results }: Props) {
  if (!results) return null;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <Calendar className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl">Remaining Years</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{results.remainingYears.toFixed(1)}</p>
          <p className="text-muted-foreground">years to cherish</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <Clock className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl">Total Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{Math.round(results.remainingHours)}</p>
          <p className="text-muted-foreground">hours together</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <Users className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl">Total Visits</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{Math.round(results.totalVisits)}</p>
          <p className="text-muted-foreground">future meetings</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <HeartPulse className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl">Quality Time</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{Math.round(results.remainingHours / 24)}</p>
          <p className="text-muted-foreground">days worth of time</p>
        </CardContent>
      </Card>
    </>
  );
}