import React from 'react';
import { SubmitHandler, FieldValues, UseFormRegister, FormState } from 'react-hook-form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';

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
      <div className="space-y-1">
        <Label htmlFor="apiKey">API Key</Label>
        <Input type="search" placeholder="Enter a valid API Key" {...register('apiKey')} />
        {errors.apiKey && <p className="text-red-500">{errors.apiKey.message}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="eventName">Event Name</Label>
        <Input type="search" placeholder="Enter an Event Name.." {...register('eventName')} />
        {errors.eventName && <p className="text-red-500">{errors.eventName.message}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="address">Address</Label>
        <Input type="search" placeholder="Enter an account address.. 0x123" {...register('address')} />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="points">Points</Label>
        <Input type="number" placeholder="Enter number of points" {...register('points')} />
        {errors.points && <p className="text-red-500">{errors.points.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="bg-primary">
        {isSubmitting ? 'Distributing...' : 'Distribute'}
      </Button>
    </form>
  );
}

export default DistributionForm;
