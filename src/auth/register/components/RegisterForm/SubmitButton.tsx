/**
 * SubmitButton component.
 * Single Responsibility: renders the submit button with loading state.
 */

export interface SubmitButtonProps {
  isSubmitting?: boolean;
  label?: string;
}

export default function SubmitButton({ isSubmitting = false, label = 'Kirim Pendaftaran' }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={`submit-button ${isSubmitting ? 'submit-button--loading' : ''}`}
      disabled={isSubmitting}
      id="submit-button"
      aria-busy={isSubmitting}
    >
      {isSubmitting ? (
        <span className="submit-button__content">
          <svg
            className="submit-button__spinner"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          <span>Mengirim...</span>
        </span>
      ) : (
        <span className="submit-button__content">{label}</span>
      )}
    </button>
  );
}
