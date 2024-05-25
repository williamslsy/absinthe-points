import React from 'react';
import { SubmitHandler, FieldValues, UseFormRegister, FormState } from 'react-hook-form';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface FormValues extends FieldValues {
  apiKey: string;
  address: string;
  points: number;
  eventName: string;
}

interface DistributionFormProps {
  register: UseFormRegister<FormValues>;
  handleSubmit: any;
  errors: FormState<FormValues>['errors'];
  isSubmitting: boolean;
  onSubmit: SubmitHandler<FormValues>;
}

function DistributionForm({ register, handleSubmit, errors, isSubmitting, onSubmit }: DistributionFormProps) {
  return (
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
        {isSubmitting ? 'Distributing...' : 'Distribute'}
      </Button>
    </form>
  );
}

export default DistributionForm;
