/**
 * FormField component.
 * Single Responsibility: renders a single form field (input, select, or textarea)
 * with label, error state, and optional badge according to Figma specs.
 */

import { ChangeEvent, useEffect, useRef } from 'react';
import { OrganizationOption, TEXTAREA_CONFIG } from '../../constants/formConfig';

export type FieldType = 'text' | 'email' | 'select' | 'textarea';

export interface FormFieldProps {
  label: string;
  id: string;
  type?: FieldType;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  optional?: boolean;
  maxLength?: number;
  options?: OrganizationOption[];
}

export default function FormField({
  label,
  id,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  error = '',
  optional = false,
  maxLength,
  options = [],
}: FormFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (type === 'textarea' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, type]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    try {
      const newValue = event.target.value;

      if (type === 'textarea' && maxLength && newValue.length > maxLength) {
        return;
      }

      onChange(newValue);
    } catch (err) {
      console.error(`Error handling change for field "${id}":`, err);
    }
  };

  const renderField = () => {
    const baseClassName = `form-field__input ${error ? 'form-field__input--error' : ''}`;

    try {
      switch (type) {
        case 'select':
          return (
            <div className="form-field__select-wrapper">
              <select
                id={id}
                className={`${baseClassName} form-field__select`}
                value={value}
                onChange={handleInputChange}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value} disabled={option.value === ''}>
                    {option.label}
                  </option>
                ))}
              </select>
              <svg
                className="form-field__select-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E20D20"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          );

        case 'textarea':
          return (
            <div className="form-field__textarea-wrapper">
              <textarea
                ref={textareaRef}
                id={id}
                className={`${baseClassName} form-field__textarea`}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                maxLength={maxLength || TEXTAREA_CONFIG.maxLength}
                rows={4}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
              />
            </div>
          );

        default:
          return (
            <input
              id={id}
              type={type}
              className={baseClassName}
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : undefined}
            />
          );
      }
    } catch (err) {
      console.error(`Error rendering field "${id}":`, err);
      return <p className="form-field__render-error">Gagal memuat field.</p>;
    }
  };

  return (
    <div className="form-field" id={`field-${id}`}>
      <label className="form-field__label" htmlFor={id}>
        <span>{label}</span>
        {optional && <span className="form-field__optional-badge">OPSIONAL</span>}
      </label>
      {renderField()}
      {type === 'textarea' && (
        <span className="form-field__char-count">
          {value.length}/{maxLength || TEXTAREA_CONFIG.maxLength}
        </span>
      )}
      {error && (
        <span className="form-field__error" id={`${id}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
