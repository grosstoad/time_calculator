'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { LifeExpectancyInput, CalculationResult } from '../types';
import { ResultsDisplay } from './ResultsDisplay';

const formSchema = z.object({
  sex: z.enum(['male', 'female'], {
    required_error: 'Please select your sex.',
  }),
  age: z.number().min(0).max(120),
  country: z.string().min(1),
  visitsPerYear: z.number().min(1),
  hoursPerVisit: z.number().min(0.5),
  results: z.object({
    remainingHours: z.number(),
  }).optional(),
});

const COUNTRIES = [
  'Australia', 'Austria', 'Belarus', 'Belgium', 'Bulgaria',
  'Canada', 'Chile', 'Croatia', 'Czechia', 'Denmark',
  'Estonia', 'Finland', 'France', 'Germany', 'Greece',
  'Hong Kong', 'Hungary', 'Iceland', 'Ireland', 'Israel',
  'Italy', 'Japan', 'Latvia', 'Lithuania', 'Luxembourg',
  'Netherlands', 'New Zealand', 'Norway', 'Poland', 'Portugal',
  'Republic of Korea', 'Russia', 'Slovakia', 'Slovenia',
  'Spain', 'Sweden', 'Switzerland', 'Taiwan', 'Ukraine',
  'United Kingdom', 'United States'
];

interface Props {
  onSubmit: (data: LifeExpectancyInput) => Promise<void>;
  results: CalculationResult | null;
}

export function LifeExpectancyForm({ onSubmit, results }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sex: 'male',
      age: 65,
      country: 'Australia',
      visitsPerYear: 4,
      hoursPerVisit: 3,
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Time Left Together</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sex</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sex" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visitsPerYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visits per Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hoursPerVisit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours per Visit</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.5"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  'Calculate'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <ResultsDisplay results={results} />
      </div>
    </div>
  );
}