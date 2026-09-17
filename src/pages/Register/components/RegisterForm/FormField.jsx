/**
 * FormField component.
 * Single Responsibility: renders a single form field (input, select, or textarea)
 * with label, error state, and optional badge.
 *
 * Open/Closed Principle: supports multiple field types via `type` prop
 * without modifying internal logic.
 */

import { useEffect, useRef } from 'react';
import { TEXTAREA_CONFIG } from '../../constants/formConfig';

/**
 * @param {Object} props
 * @param {string} props.label - The label text (displayed uppercase)
 * @param {string} props.id - Unique identifier for the field
 * @param {'text'|'email'|'select'|'textarea'} props.type - Field type
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Current value
 * @param {Function} props.onChange - Change handler (receives value string)
 * @param {string} [props.error] - Error message to display
 * @param {boolean} [props.optional] - Whether to show "OPSIONAL" badge
 * @param {number} [props.maxLength] - Max character length (for textarea)
 * @param {Array} [props.options] - Options for select type
 */
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
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (type === 'textarea' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, type]);

  /**
   * Handles input change events with exception handling.
   */
  const handleInputChange = (event) => {
    try {
      const newValue = event.target.value;

      // Enforce maxLength for textarea
      if (type === 'textarea' && maxLength && newValue.length > maxLength) {
        return;
      }

      onChange(newValue);
    } catch (err) {
      console.error(`Error handling change for field "${id}":`, err);
    }
  };

  /**
   * Renders the appropriate input element based on type.
   */
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
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9E9E9E"
                strokeWidth="2"
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
        {label}
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
