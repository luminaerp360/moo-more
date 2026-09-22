import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Loader2, Upload, X, ImagePlus } from 'lucide-react';
import { uploadImage } from '../../services/cloudinary';

export const Spinner: React.FC<{ label?: string }> = ({ label }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-12">
    <Loader2 className="w-8 h-8 text-[#15803D] animate-spin" />
    {label && <p className="text-sm text-stone-500">{label}</p>}
  </div>
);

export const PageHeader: React.FC<{
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}> = ({ title, subtitle, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl font-bold text-[#0F3020] font-serif-heading">{title}</h1>
      {subtitle && <p className="text-sm text-stone-500 mt-1">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className = '', children, ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center gap-2 px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

export const OutlineButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className = '', children, ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center gap-2 px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-100 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

export const DangerButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className = '', children, ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 border border-red-300 text-red-600 hover:bg-red-50 text-xs font-medium rounded-lg transition-colors ${className}`}
  >
    {children}
  </button>
);

export const GhostEditButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className = '', children, ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#15803D]/40 text-[#15803D] hover:bg-emerald-50 text-xs font-medium rounded-lg transition-colors ${className}`}
  >
    {children}
  </button>
);

export const Card: React.FC<{ title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }> = ({
  title,
  action,
  children,
  className = '',
}) => (
  <section className={`bg-white rounded-xl border border-stone-200 shadow-xs p-5 ${className}`}>
    {(title || action) && (
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#0F3020]">{title}</h2>
        {action}
      </div>
    )}
    {children}
  </section>
);

export const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-center py-10 bg-stone-50 rounded-lg">
    <p className="text-sm text-stone-500">{message}</p>
  </div>
);

export const Field: React.FC<{
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}> = ({ label, required, hint, children }) => (
  <div>
    <label className="block text-sm font-medium text-stone-700 mb-1.5">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
    {hint && <p className="text-xs text-stone-400 mt-1">{hint}</p>}
  </div>
);

export const inputClass =
  'w-full px-3.5 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#15803D]/40 focus:border-[#15803D] bg-white';

export const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className = '',
  ...props
}) => <input {...props} className={`${inputClass} ${className}`} />;

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className = '',
  ...props
}) => <textarea {...props} className={`${inputClass} ${className}`} />;

export const NumberInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className = '',
  ...props
}) => <input type="number" {...props} className={`${inputClass} ${className}`} />;

export const Checkbox: React.FC<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => (
  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 text-[#15803D] rounded border-stone-300 focus:ring-[#15803D]"
    />
    <span className="text-sm text-stone-700">{label}</span>
  </label>
);

export const TagInput: React.FC<{
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}> = ({ tags, onChange, placeholder = 'Add tag (press Enter)' }) => {
  const [draft, setDraft] = useState('');

  const add = () => {
    const value = draft.trim();
    if (value && !tags.includes(value)) {
      onChange([...tags, value]);
    }
    setDraft('');
  };

  return (
    <div>
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            add();
          }
        }}
        onBlur={add}
        placeholder={placeholder}
        className={inputClass}
      />
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
            >
              {tag}
              <button
                type="button"
                onClick={() => onChange(tags.filter((t) => t !== tag))}
                className="text-emerald-600 hover:text-emerald-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export const ImageUploader: React.FC<{
  value: string;
  onChange: (url: string) => void;
  label?: string;
}> = ({ value, onChange, label = 'Image' }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        {value ? (
          <div className="relative">
            <img src={value} alt={label} className="h-24 w-24 object-cover rounded-lg border border-stone-200" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="h-24 w-24 border-2 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center gap-1 text-stone-400 hover:border-[#15803D] hover:text-[#15803D] transition-colors"
          >
            <ImagePlus className="w-6 h-6" />
            <span className="text-[10px] font-medium">Upload</span>
          </button>
        )}
        <div className="flex flex-col gap-2">
          <OutlineButton
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" /> {value ? 'Replace' : 'Upload'} {label}
              </>
            )}
          </OutlineButton>
          <TextInput
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="...or paste image URL"
            className="text-xs py-1.5 w-56"
          />
        </div>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export const Toast: React.FC<{ message: string | null; type?: 'success' | 'error' }> = ({ message, type = 'success' }) => {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed bottom-6 right-6 z-[100] px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white ${
        type === 'success' ? 'bg-[#15803D]' : 'bg-red-600'
      }`}
    >
      {message}
    </motion.div>
  );
};
