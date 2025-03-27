'use client'

import React, { useState, useTransition } from 'react';
import { Button } from './Button';
import { TableFormData, TableStatus } from '@/types/tables';
import { useNotification } from './NotificationContext';
import { useRouter } from 'next/navigation';
import { NotificationType } from '@/types/notifications';

interface ItemFormProps {
  action: (formData: FormData) => Promise<{ success: boolean; message: string } | void>;
  initialValues?: TableFormData;
  id: string;
}

export function ItemDetailsForm({ action, initialValues = { title: '', description: '', status: TableStatus.PENDING }, id }: ItemFormProps) {
  // Use TableFormData type but with separate state variables for simplicity
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [status, setStatus] = useState(initialValues.status);
  const [errors, setErrors] = useState<{title?: string; description?: string}>({});
  const [isPending, startTransition] = useTransition();
  const { addNotification } = useNotification();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: {title?: string; description?: string} = {};
    
    if (!title.trim()) {
      newErrors.title = "Name is required";
    } else if (title.length > 100) {
      newErrors.title = "Name must be less than 100 characters";
    }
    
    if (description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // React to form submission
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop if validation fails
    }
    
    // Our TableFormData
    const tableData: TableFormData = {
      title,
      description,
      status
    };
    
    // For server action compatibility only
    const formData = new FormData();
    formData.set('title', tableData.title);
    formData.set('description', tableData.description);
    formData.set('status', tableData.status);
    formData.set('id', id);
    
    startTransition(async () => {
      try {
        const result = await action(formData);
        
        // Handle the result
        if (result && 'success' in result) {
          if (result.success) {
            addNotification(NotificationType.Success, result.message);
            // Navigate back to home page on success
            router.push('/');
          } else {
            addNotification(NotificationType.Error, result.message);
          }
        } else {
          // For backward compatibility if no result is returned
          addNotification(NotificationType.Success, 'Operation completed successfully');
          router.push('/');
        }
      } catch (error) {
        addNotification(NotificationType.Error, `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    });
  };

  return (
    <form 
      onSubmit={onSubmit}
      className="space-y-6 font-light"
    >
      <div>
        <label htmlFor="title" className="block text-gray-600 mb-2">Name</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md bg-secondary`}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-gray-600 mb-2">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md h-24 bg-secondary"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="status" className="block text-gray-600 mb-2">Status</label>
        <div className="relative">
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TableStatus)}
            className="w-full p-2 pr-10 border border-gray-300 rounded-md appearance-none bg-white text-black"
          >
            <option value={TableStatus.COMPLETED}>Done</option>
            <option value={TableStatus.IN_PROGRESS}>In Progress</option>
            <option value={TableStatus.PENDING}>Pending</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M4 7 L16 7 L10 13 Z" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <Button 
          text={isPending ? "Saving..." : "Save"} 
          className="w-24" 
          disabled={isPending}
          type="submit"
        />
      </div>
    </form>
  );
} 