'use client';

import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import usePointsDistribution from '../hooks/usePointsDistribution';
import { formSchema } from '@/lib/validations';
import { DistributePoints } from '@/lib/types';

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: '',
      address: '',
      points: 0,
      eventName: '',
    },
  });
  const onSubmit = async (data: DistributePoints) => {
    await handleDistribute(data);
    reset();
  };
  const { handleDistribute } = usePointsDistribution();

  return (
    <div className="max-w-[900px] mx-auto px-4 py-8 text-black">
      <h1 className="text-black text-3xl font-bold text-center mb-8">Distribute Points</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
        <Input type="search" placeholder="API Key" {...register('apiKey')} />
        {errors.apiKey && <p className="text-red-500">{errors.apiKey.message}</p>}

        <Input type="search" placeholder="Event Name" {...register('eventName')} />
        {errors.eventName && <p className="text-red-500">{errors.eventName.message}</p>}

        <Input type="search" placeholder="Address" {...register('address')} />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}

        <Input type="number" placeholder="Points" {...register('points')} />
        {errors.points && <p className="text-red-500">{errors.points.message}</p>}

        <Button type="submit" disabled={isSubmitting} className="bg-primary">
          {isSubmitting ? 'Distributing' : 'Distribute'}
        </Button>
      </form>
    </div>
  );
}
