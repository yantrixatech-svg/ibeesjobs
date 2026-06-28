'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { sendInquiryNotification } from '@/lib/resend';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // 1. Insert message into Supabase DB
      const { error: dbError } = await supabase.from('contacts').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message,
        }
      ]);

      if (dbError) {
        console.error('Database insert error:', dbError);
        throw new Error('Failed to submit message to database. Please try again.');
      }

      // 2. Send email notification to agency
      try {
        await sendInquiryNotification({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        });
      } catch (emailErr) {
        console.error('Email alert delivery error:', emailErr);
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#0D1B5E] via-[#152478] to-[#1e3a8a] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">Have questions about our services? Want to post a job? We&apos;d love to hear from you.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact info list */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-6">
              {/* Visit office address */}
              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#0D1B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                  <p className="text-sm text-gray-500">TC. 97/2440, Near Infosys, Thampuranmukku, Kazhakootom, Thiruvananthapuram, Kerala 695583</p>
                </div>
              </div>

              {/* Call details */}
              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#0D1B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                  <p className="text-sm text-gray-500 flex flex-col gap-1">
                    <a href="tel:+918075946173" className="hover:text-[#0D1B5E] transition-colors font-medium">+91 8075946173</a>
                  </p>
                </div>
              </div>

              {/* Email details */}
              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#0D1B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-sm text-gray-500 font-medium">
                    <a href="mailto:balasankar8943@gmail.com" className="hover:text-[#0D1B5E] transition-colors">balasankar8943@gmail.com</a>
                  </p>
                </div>
              </div>

              {/* Quick WhatsApp button info */}
              <a
                href="https://wa.me/918075946173?text=Hi!%20I%20have%20a%20query%20about%20IBees%20Jobs."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-green-50 rounded-2xl border border-green-100 hover:bg-green-100 transition-all group"
              >
                <div className="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg className="w-6 h-6 text-green-700" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Chat on WhatsApp</h3>
                  <p className="text-sm text-green-600">Get instant responses</p>
                </div>
              </a>
            </div>

            {/* Map Frame Container */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.5!2d76.88!3d8.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bef1d7aa52e7%3A0x2c4e0f6c6f1cdcc!2sKazhakuttam%2C%20Thiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="IBees Jobs Location Map"
              ></iframe>
            </div>
          </div>

          {/* Form Side card */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-sm text-gray-500 mb-6">Fill out the form and we&apos;ll get back to you as soon as possible.</p>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-sm text-gray-500 mb-4">Your inquiry has been successfully recorded and emailed to our team. We will get in touch with you shortly.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); setErrorMsg(''); }}
                    className="text-sm text-[#0D1B5E] font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        id="contact-phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] transition-all"
                        placeholder="+91 XXXXXXXXXX"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#0D1B5E] text-white text-sm font-semibold rounded-xl hover:bg-[#1a2d7c] hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
