'use client';

import { CalculationResult } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  results: CalculationResult;
  age: number;
}

export function TimeCharts({ results, age }: Props) {
  const pieData = [
    { name: 'Time Elapsed', value: age },
    { name: 'Time Remaining', value: results.remainingYears },
  ];

  const COLORS = ['hsl(var(--muted))', 'hsl(var(--primary))'];

  // Generate yearly data for the next 10 years or remaining years, whichever is less
  const yearsToShow = Math.min(10, Math.ceil(results.remainingYears));
  const yearlyData = Array.from({ length: yearsToShow }, (_, i) => ({
    year: `Year ${i + 1}`,
    hours: results.totalHours / results.remainingYears,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Life Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value.toFixed(1)} years`}
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hours per Year</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(0)} hours`, 'Time Together']}
              />
              <Bar 
                dataKey="hours" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}