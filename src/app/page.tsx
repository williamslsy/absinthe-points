'use client';

import React from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import usePointsDistribution from '../hooks/usePointsDistribution';
import { formSchema } from '@/lib/validations';
import DistributionForm from '@/components/distribution-form';

interface FormValues extends FieldValues {
  apiKey: string;
  address: string;
  points: number;
  eventName: string;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: '',
      address: '',
      points: 0,
      eventName: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await handleDistribute(data);
    reset();
  };

  const { handleDistribute } = usePointsDistribution();

  return (
    <div className="max-w-[900px] mx-auto px-4 py-8 text-black">
      <h1 className="text-black text-3xl font-bold text-center mb-8">Distribute Points</h1>
      <DistributionForm {...{ register, handleSubmit, errors, isSubmitting, onSubmit }} />
    </div>
  );
}
