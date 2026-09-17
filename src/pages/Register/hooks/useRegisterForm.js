/**
 * Custom hook for register form state management.
 * Following Dependency Inversion Principle — components depend on this
 * abstraction rather than implementing logic directly.
 * Includes comprehensive exception handling.
 */

import { useCallback, useState } from 'react';
import { FORM_INITIAL_VALUES } from '../constants/formConfig';
import { validateForm } from '../utils/validators';

/**
 * @returns {Object} Form state, handlers, and submission status
 */
export function useRegisterForm() {
  const [formData, setFormData] = useState({ ...FORM_INITIAL_VALUES });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  /**
   * Handles changes for text/select/textarea fields.
   * @param {string} fieldName - The form field name
   * @param {string} value - The new value
   */
  const handleChange = useCallback((fieldName, value) => {
    try {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }));

      // Clear the error for this field when user starts typing
      setErrors((prev) => ({
        ...prev,
        [fieldName]: '',
      }));

      // Reset submit status when user makes changes
      setSubmitStatus(null);
    } catch (error) {
      console.error(`Error updating field "${fieldName}":`, error);
    }
  }, []);

  /**
   * Handles file selection/change.
   * @param {File|null} file - The selected file
   */
  const handleFileChange = useCallback((file) => {
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
   * @param {Event} event - The form submit event
   */
  const handleSubmit = useCallback(
    async (event) => {
      try {
        event.preventDefault();
      } catch (error) {
        // Event might not always be preventable
        console.warn('Could not prevent default:', error);
      }

      try {
        // Validate all fields
        const { isValid, errors: validationErrors } = validateForm(formData);

        if (!isValid) {
          setErrors(validationErrors);
          setSubmitStatus(null);
          return;
        }

        setIsSubmitting(true);
        setErrors({});

        // Simulate API submission (replace with actual API call)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // On success
        setSubmitStatus('success');
        resetForm();
      } catch (error) {
        // Handle network errors, API errors, etc.
        console.error('Form submission error:', error);
        setSubmitStatus('error');

        // Set a generic submission error
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
