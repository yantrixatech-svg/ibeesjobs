'use client';

import { useState } from 'react';
import { COMPANY } from '@/lib/constants';

export default function CustomInquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    desiredJob: '',
    experience: '',
    details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format the WhatsApp message exactly as requested in Phase 6
    const message = `🔍 Custom Job Inquiry - IBees Jobs\n` +
      `👤 Name: ${formData.name}\n` +
      `📱 Phone: ${formData.phone}\n` +
      `📧 Email: ${formData.email}\n` +
      `💼 Desired Job: ${formData.desiredJob}\n` +
      `⏳ Experience: ${formData.experience} years\n` +
      `💬 Details: ${formData.details}\n\n` +
      `[Please attach your resume PDF/DOC here]`;

    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;

    // Redirect to WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      desiredJob: '',
      experience: '',
      details: '',
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl max-w-xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0D1B5E]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Didn&apos;t find your desired job?</h3>
          <p className="text-xs text-gray-500">Inquire for custom roles and get placed directly.</p>
        </div>
      </div>

      {submitted && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
          <p className="font-semibold">Inquiry Prepared!</p>
          <p className="text-xs mt-1 text-emerald-600">
            If WhatsApp did not open automatically, please make sure pop-ups are allowed on your device or click the button again. Remember to attach your resume file in the chat.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="inquiry-name" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="inquiry-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] transition-all"
              placeholder="Your name"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="inquiry-phone" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="inquiry-phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] transition-all"
              placeholder="e.g. +91 98765 43210"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label htmlFor="inquiry-email" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="inquiry-email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] transition-all"
              placeholder="you@example.com"
            />
          </div>

          {/* Desired Job */}
          <div>
            <label htmlFor="inquiry-job" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Desired Position / Title *
            </label>
            <input
              type="text"
              id="inquiry-job"
              required
              value={formData.desiredJob}
              onChange={(e) => setFormData({ ...formData, desiredJob: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] transition-all"
              placeholder="e.g. Graphic Designer / Clerk"
            />
          </div>
        </div>

        {/* Experience */}
        <div>
          <label htmlFor="inquiry-experience" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Years of Experience *
          </label>
          <input
            type="number"
            id="inquiry-experience"
            required
            min="0"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] transition-all"
            placeholder="e.g. 2"
          />
        </div>

        {/* Details / Message */}
        <div>
          <label htmlFor="inquiry-details" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Details / Message *
          </label>
          <textarea
            id="inquiry-details"
            required
            rows={4}
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] transition-all resize-none"
            placeholder="Tell us about the type of role, preferred location, and salary expectations..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0D1B5E] text-white font-bold rounded-xl py-4 hover:bg-[#1a2d7c] hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          {isSubmitting ? 'Submitting...' : 'Submit Inquiry on WhatsApp'}
        </button>
      </form>
    </div>
  );
}
