'use client';
import { toast } from '@/components/ui/use-toast';
import { DistributePoints } from '@/lib/types';
import React, { createContext } from 'react';

interface PointsDistributionContextType {
  handleDistribute: (data: DistributePoints) => Promise<void>;
}

export const PointsDistributionContext = createContext<PointsDistributionContextType | undefined>(undefined);

function PointsDistributionProvider({ children }: { children: React.ReactNode }) {
  const handleError = async (response: Response) => {
    if (response.headers.get('content-type')?.includes('application/json')) {
      const res = await response.json();
      let errorMessage = res.message || 'Failed to distribute points. Please try again.';
      switch (response.status) {
        case 404:
          errorMessage = 'Endpoint not found. Please check the URL.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        case 403:
        case 401:
          errorMessage = 'Authorization error. Please check your API key.';
          break;
      }
      throw new Error(errorMessage);
    } else {
      // If the response is not in JSON format, likely an HTML error page was returned.
      throw new Error('The server responded with a non-JSON format. Please contact the admin.');
    }
  };

  const handleDistribute = async (data: DistributePoints) => {
    try {
      const response = await fetch('/api/points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.apiKey}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        await handleError(response);
      }

      toast({
        title: 'Success',
        description: 'Points distributed successfully!',
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Error',
        description: error.message || 'Unknown error occurred.',
        variant: 'destructive',
      });
      throw error;
    }
  };
  return <PointsDistributionContext.Provider value={{ handleDistribute }}>{children}</PointsDistributionContext.Provider>;
}

export default PointsDistributionProvider;
