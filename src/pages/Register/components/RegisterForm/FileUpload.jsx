/**
 * FileUpload component.
 * Single Responsibility: handles file selection, drag-and-drop, and displays
 * selected file info or upload prompt.
 */

import { useCallback, useRef, useState } from 'react';
import { FILE_UPLOAD_CONFIG } from '../../constants/formConfig';
import { validateFile } from '../../utils/validators';

/**
 * @param {Object} props
 * @param {File|null} props.file - Currently selected file
 * @param {Function} props.onFileChange - Handler when file is selected
 * @param {Function} props.onFileRemove - Handler to remove file
 * @param {string} [props.error] - Error message from parent
 */
export default function FileUpload({ file, onFileChange, onFileRemove, error = '' }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState('');

  const displayError = error || localError;

  /**
   * Processes a file with validation and error handling.
   * @param {File} selectedFile
   */
  const processFile = useCallback(
    (selectedFile) => {
      try {
        if (!selectedFile) {
          return;
        }

        const validationError = validateFile(selectedFile);
        if (validationError) {
          setLocalError(validationError);
          return;
        }

        setLocalError('');
        onFileChange(selectedFile);
      } catch (err) {
        console.error('Error processing file:', err);
        setLocalError('Terjadi kesalahan saat memproses file.');
      }
    },
    [onFileChange]
  );

  /**
   * Handles the file input change event.
   */
  const handleFileInputChange = useCallback(
    (event) => {
      try {
        const selectedFile = event.target.files?.[0];
        processFile(selectedFile);
      } catch (err) {
        console.error('Error reading file input:', err);
        setLocalError('Gagal membaca file yang dipilih.');
      }
    },
    [processFile]
  );

  /**
   * Handles click on the upload area.
   */
  const handleClick = useCallback(() => {
    try {
      fileInputRef.current?.click();
    } catch (err) {
      console.error('Error triggering file input:', err);
    }
  }, []);

  /**
   * Handles drag over event.
   */
  const handleDragOver = useCallback((event) => {
    try {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(true);
    } catch (err) {
      console.error('Error handling drag over:', err);
    }
  }, []);

  /**
   * Handles drag leave event.
   */
  const handleDragLeave = useCallback((event) => {
    try {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
    } catch (err) {
      console.error('Error handling drag leave:', err);
    }
  }, []);

  /**
   * Handles file drop event.
   */
  const handleDrop = useCallback(
    (event) => {
      try {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);

        const droppedFile = event.dataTransfer?.files?.[0];
        processFile(droppedFile);
      } catch (err) {
        console.error('Error handling file drop:', err);
        setLocalError('Gagal memproses file yang di-drop.');
      }
    },
    [processFile]
  );

  /**
   * Handles removing the selected file.
   */
  const handleRemove = useCallback(
    (event) => {
      try {
        event.stopPropagation();
        setLocalError('');
        onFileRemove();

        // Reset the file input value
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (err) {
        console.error('Error removing file:', err);
      }
    },
    [onFileRemove]
  );

  return (
    <div className="file-upload" id="field-dokumen">
      <label className="form-field__label">DOKUMEN VERIFIKASI</label>

      <div
        className={`file-upload__area ${isDragging ? 'file-upload__area--dragging' : ''} ${displayError ? 'file-upload__area--error' : ''}`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        aria-label="Unggah dokumen verifikasi"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={FILE_UPLOAD_CONFIG.acceptedExtensions}
          onChange={handleFileInputChange}
          className="file-upload__input"
          id="dokumen-input"
          aria-hidden="true"
          tabIndex={-1}
        />

        {file ? (
          <div className="file-upload__selected">
            <div className="file-upload__file-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div className="file-upload__file-info">
              <span className="file-upload__file-name">{file.name}</span>
              <span className="file-upload__file-size">
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
            <button
              type="button"
              className="file-upload__remove-btn"
              onClick={handleRemove}
              aria-label="Hapus file"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="file-upload__prompt">
            <div className="file-upload__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div className="file-upload__text">
              <span className="file-upload__title">Unggah dokumen</span>
              <span className="file-upload__subtitle">
                SIUP, izin praktik, atau surat resmi (PDF/JPG)
              </span>
            </div>
          </div>
        )}
      </div>

      {displayError && (
        <span className="form-field__error" role="alert">
          {displayError}
        </span>
      )}
    </div>
  );
}
