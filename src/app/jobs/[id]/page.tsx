'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Job } from '@/lib/types';
import ApplyForm from '@/components/ApplyForm';

export default function JobDetailPage() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', params.id)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching job:', error);
      } else {
        setJob(data);
      }
      setLoading(false);
    }

    if (params.id) {
      fetchJob();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D1B5E]"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
        <p className="text-gray-500 mb-6">This job listing may have been removed or is no longer active.</p>
        <Link href="/jobs" className="px-6 py-3 bg-[#0D1B5E] text-white rounded-xl hover:bg-[#1a2d7c] transition-all">
          Browse All Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Detail Header Banner */}
      <section className="bg-gradient-to-br from-[#0D1B5E] via-[#152478] to-[#1e3a8a] text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Jobs
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium">{job.category}</span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-200 rounded-full text-xs font-medium">{job.type}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{job.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {job.location}
            </span>
            {job.salary_range && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {job.salary_range}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Posted {new Date(job.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>
      </section>

      {/* Main Details and side info panel */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Description & Criteria */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <div className="prose prose-sm text-gray-600 max-w-none">
                <p className="whitespace-pre-line leading-relaxed">{job.description}</p>
              </div>

              {/* Job Requirements & Criteria */}
              {(job.qualification || job.experience) && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Requirements & Criteria</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {job.qualification && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <span className="block text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Minimum Qualification</span>
                        <span className="text-sm font-medium text-gray-800">{job.qualification}</span>
                      </div>
                    )}
                    {job.experience && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <span className="block text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Required Experience</span>
                        <span className="text-sm font-medium text-gray-800">{job.experience}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Embedded Resume Application Form */}
            <div id="apply-form-section" className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm scroll-mt-24">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Submit Your Details & Resume</h2>
                <p className="text-sm text-gray-500">Fill out the form below to apply for this job instantly. Your resume and candidate profile will be reviewed by the IBees Jobs team.</p>
              </div>
              <ApplyForm jobId={job.id} jobTitle={job.title} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Action Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Interested in this job?</h3>
              <a
                href="#apply-form-section"
                className="block w-full py-3 bg-[#0D1B5E] text-white text-sm font-semibold rounded-xl text-center hover:bg-[#1a2d7c] hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 mb-3"
              >
                Apply Directly
              </a>
              <a
                href={`https://wa.me/918075946173?text=${encodeURIComponent(`Hi! I am interested in the ${job.title} position listed on IBees Jobs.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-50 text-green-700 text-sm font-semibold rounded-xl hover:bg-green-100 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp Quick Apply
              </a>
            </div>

            {/* Job Summary widget */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Job Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium text-gray-900">{job.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Job Type</span>
                  <span className="font-medium text-gray-900">{job.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>
                  <span className="font-medium text-gray-900">{job.location}</span>
                </div>
                {job.salary_range && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Salary</span>
                    <span className="font-medium text-gray-900">{job.salary_range}</span>
                  </div>
                )}
                {job.qualification && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Qualification</span>
                    <span className="font-medium text-gray-900">{job.qualification}</span>
                  </div>
                )}
                {job.experience && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Experience</span>
                    <span className="font-medium text-gray-900">{job.experience}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
