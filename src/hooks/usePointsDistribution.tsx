import { PointsDistributionContext } from '@/context/PointsDistributionContext';
import { useContext } from 'react';

function usePointsDistribution() {
  const context = useContext(PointsDistributionContext);
  if (!context) {
    throw new Error('usePointsDistribution must be used within a PointsDistributionProvider');
  }
  return context;
}

export default usePointsDistribution;
