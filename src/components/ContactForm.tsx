import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  message: ''
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as content changes
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const currentHeight = textarea.style.height;
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = currentHeight;
      
      requestAnimationFrame(() => {
        textarea.style.height = `${Math.max(scrollHeight, 150)}px`;
      });
    }
  }, [formData.message]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return !value.trim() ? 'Please enter your name' : undefined;
      case 'email':
        if (!value.trim()) return 'Please enter your email address';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return undefined;
      case 'message':
        return !value.trim() ? 'Please enter your message' : undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormData, value);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim()
          }
        ]);

      if (error) throw error;

      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData(initialFormData);
      setFormErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Name*"
          required
          disabled={isSubmitting}
          className={`w-full p-3 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(0,191,166,0.15),inset_0_0_0_3px_rgba(229,231,235,0.8)] hover:shadow-[0_0_30px_rgba(0,191,166,0.4),inset_0_0_0_3px_rgba(0,191,166,0.4)] focus:shadow-[0_0_30px_rgba(0,191,166,0.4),inset_0_0_0_3px_rgba(0,191,166,0.4)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
            formErrors.name ? 'shadow-[inset_0_0_0_3px_rgba(239,68,68,0.4)]' : ''
          }`}
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {formErrors.name && (
          <p className="text-red-500 text-sm text-left pl-1">{formErrors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <input
          type="email"
          name="email"
          placeholder="Email*"
          required
          disabled={isSubmitting}
          className={`w-full p-3 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(0,191,166,0.15),inset_0_0_0_3px_rgba(229,231,235,0.8)] hover:shadow-[0_0_30px_rgba(0,191,166,0.4),inset_0_0_0_3px_rgba(0,191,166,0.4)] focus:shadow-[0_0_30px_rgba(0,191,166,0.4),inset_0_0_0_3px_rgba(0,191,166,0.4)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
            formErrors.email ? 'shadow-[inset_0_0_0_3px_rgba(239,68,68,0.4)]' : ''
          }`}
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {formErrors.email && (
          <p className="text-red-500 text-sm text-left pl-1">{formErrors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <textarea
          ref={textareaRef}
          name="message"
          placeholder="Message*"
          required
          disabled={isSubmitting}
          className={`w-full p-3 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(0,191,166,0.15),inset_0_0_0_3px_rgba(229,231,235,0.8)] hover:shadow-[0_0_30px_rgba(0,191,166,0.4),inset_0_0_0_3px_rgba(0,191,166,0.4)] focus:shadow-[0_0_30px_rgba(0,191,166,0.4),inset_0_0_0_3px_rgba(0,191,166,0.4)] focus:outline-none resize-y disabled:opacity-50 disabled:cursor-not-allowed ${
            formErrors.message ? 'shadow-[inset_0_0_0_3px_rgba(239,68,68,0.4)]' : ''
          }`}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            minHeight: '150px',
            transition: 'height 0.2s ease-in-out, border-color 0.2s ease-in-out'
          }}
        />
        {formErrors.message && (
          <p className="text-red-500 text-sm text-left pl-1">{formErrors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#00BFA6] text-white py-4 rounded-2xl transition-all duration-300 hover:bg-[#00A693] shadow-[0_0_25px_rgba(0,191,166,0.3)] hover:shadow-[0_0_35px_rgba(0,191,166,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#00BFA6]"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}