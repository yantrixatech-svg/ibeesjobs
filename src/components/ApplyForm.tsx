'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { sendApplicationNotification, sendCandidateConfirmation } from '@/lib/resend';
import { sendWhatsAppNotification } from '@/lib/twilio';

interface ApplyFormProps {
  jobId: string;
  jobTitle: string;
}

export default function ApplyForm({ jobId, jobTitle }: ApplyFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverNote: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      if (!resumeFile) {
        throw new Error('Please upload your resume');
      }

      // Upload resume to Supabase Storage (resumes bucket)
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `${Date.now()}_${formData.name.replace(/\s+/g, '_')}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, resumeFile);

      if (uploadError) {
        console.error('Upload error details:', uploadError);
        throw new Error('Failed to upload resume. Please verify the "resumes" storage bucket is created in Supabase.');
      }

      const { data: urlData } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      // Insert application record
      const { error: insertError } = await supabase
        .from('applications')
        .insert({
          job_id: jobId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          resume_url: urlData.publicUrl,
          cover_note: formData.coverNote || null,
        });

      if (insertError) {
        console.error('DB Insert error details:', insertError);
        throw new Error('Failed to submit application. Please try again.');
      }

      // Send email alert via Resend API
      try {
        await sendApplicationNotification({
          applicantName: formData.name,
          applicantEmail: formData.email,
          applicantPhone: formData.phone,
          jobTitle,
        });
        await sendCandidateConfirmation({
          candidateEmail: formData.email,
          candidateName: formData.name,
          jobTitle,
        });
      } catch (emailErr) {
        console.error('Email notify failed:', emailErr);
      }

      // Send WhatsApp notification via Twilio API
      try {
        await sendWhatsAppNotification({
          applicantName: formData.name,
          jobTitle,
          applicantPhone: formData.phone,
        });
      } catch (waErr) {
        console.error('WhatsApp notify failed:', waErr);
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', coverNote: '' });
      setResumeFile(null);
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Submitted!</h3>
        <p className="text-gray-500 mb-6">Thank you for applying. We will review your application and get back to you soon.</p>
        <a
          href={`https://wa.me/918075946173?text=${encodeURIComponent(`Hi! I just applied for the ${jobTitle} position. My name is ${formData.name}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-all"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          Follow up on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
        <input
          type="text"
          id="full-name"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] transition-all"
          placeholder="Enter your full name"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] transition-all"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
          <input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] transition-all"
            placeholder="+91 XXXXXXXXXX"
          />
        </div>
      </div>

      <div>
        <label htmlFor="resume-file" className="block text-sm font-medium text-gray-700 mb-1.5">Resume (PDF/DOC) *</label>
        <div className="relative">
          <input
            type="file"
            id="resume-file"
            required
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] transition-all file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-[#0D1B5E] file:text-white hover:file:bg-[#1a2d7c] file:cursor-pointer"
          />
        </div>
        {resumeFile && (
          <p className="mt-1 text-xs text-green-600">✓ {resumeFile.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="cover-note" className="block text-sm font-medium text-gray-700 mb-1.5">Cover Note (Optional)</label>
        <textarea
          id="cover-note"
          rows={4}
          value={formData.coverNote}
          onChange={(e) => setFormData(prev => ({ ...prev, coverNote: e.target.value }))}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] transition-all resize-none"
          placeholder="Tell us why you're a great fit for this role..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-[#0D1B5E] text-white text-sm font-semibold rounded-xl hover:bg-[#1a2d7c] hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
            Submitting Application...
          </span>
        ) : (
          'Submit Application'
        )}
      </button>
    </form>
  );
}
