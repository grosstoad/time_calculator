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
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={200}>
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
    </div>
  );
}