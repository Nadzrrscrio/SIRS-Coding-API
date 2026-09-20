/**
 * Custom hook for register form state management.
 * TypeScript implementation with strong typing and error handling.
 */

import { FormEvent, useCallback, useState } from 'react';
import { FORM_INITIAL_VALUES, RegisterFormData } from '../constants/formConfig';
import { FormErrors, validateForm } from '../utils/validators';

export type SubmitStatus = 'success' | 'error' | null;

export interface UseRegisterFormReturn {
  formData: RegisterFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  submitStatus: SubmitStatus;
  handleChange: (fieldName: keyof RegisterFormData, value: string) => void;
  handleFileChange: (file: File | null) => void;
  handleFileRemove: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
}

export function useRegisterForm(): UseRegisterFormReturn {
  const [formData, setFormData] = useState<RegisterFormData>({ ...FORM_INITIAL_VALUES });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  /**
   * Handles changes for text/select/textarea fields.
   */
  const handleChange = useCallback((fieldName: keyof RegisterFormData, value: string) => {
    try {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }));

      setErrors((prev) => ({
        ...prev,
        [fieldName]: '',
      }));

      setSubmitStatus(null);
    } catch (error) {
      console.error(`Error updating field "${String(fieldName)}":`, error);
    }
  }, []);

  /**
   * Handles file selection/change.
   */
  const handleFileChange = useCallback((file: File | null) => {
    try {
      setFormData((prev) => ({
        ...prev,
        dokumen: file,
      }));

      setErrors((prev) => ({
        ...prev,
        dokumen: '',
      }));

      setSubmitStatus(null);
    } catch (error) {
      console.error('Error updating file:', error);
    }
  }, []);

  /**
   * Removes the currently selected file.
   */
  const handleFileRemove = useCallback(() => {
    try {
      setFormData((prev) => ({
        ...prev,
        dokumen: null,
      }));
    } catch (error) {
      console.error('Error removing file:', error);
    }
  }, []);

  /**
   * Resets the entire form to initial state.
   */
  const resetForm = useCallback(() => {
    try {
      setFormData({ ...FORM_INITIAL_VALUES });
      setErrors({});
      setSubmitStatus(null);
    } catch (error) {
      console.error('Error resetting form:', error);
    }
  }, []);

  /**
   * Handles form submission with full validation and error handling.
   */
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
      } catch (error) {
        console.warn('Could not prevent default:', error);
      }

      try {
        const { isValid, errors: validationErrors } = validateForm(formData);

        if (!isValid) {
          setErrors(validationErrors);
          setSubmitStatus(null);
          return;
        }

        setIsSubmitting(true);
        setErrors({});

        // Simulate API submission
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setSubmitStatus('success');
        resetForm();
      } catch (error: any) {
        console.error('Form submission error:', error);
        setSubmitStatus('error');

        setErrors((prev) => ({
          ...prev,
          submit:
            error?.message ||
            'Terjadi kesalahan saat mengirim pendaftaran. Silakan coba lagi.',
        }));
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, resetForm]
  );

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleFileChange,
    handleFileRemove,
    handleSubmit,
    resetForm,
  };
}
