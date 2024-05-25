'use client';
import { DistributePoints } from '@/lib/types';
import React, { createContext, useContext } from 'react';

interface PointsDistributionContextType {
  handleDistribute: (data: DistributePoints) => Promise<void>;
}

export const PointsDistributionContext = createContext<PointsDistributionContextType | undefined>(undefined);

function PointsDistributionProvider({ children }: { children: React.ReactNode }) {
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
      const res = await response.json();
      if (response.ok) {
        alert('Points distributed successfully');
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return <PointsDistributionContext.Provider value={{ handleDistribute }}>{children}</PointsDistributionContext.Provider>;
}

export default PointsDistributionProvider;
