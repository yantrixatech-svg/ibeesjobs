import Link from 'next/link';
import { STATIC_JOBS, COMPANY } from '@/lib/constants';
import ApplyForm from '@/components/ApplyForm';

export function generateStaticParams() {
  return STATIC_JOBS.map((job) => ({
    id: job.id,
  }));
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  // Find job from static array
  const job = STATIC_JOBS.find((j) => j.id === params.id && j.is_active) || null;

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
        <p className="text-gray-500 mb-6 text-center max-w-sm">This job listing may have been removed or is no longer active.</p>
        <Link href="/jobs" className="px-6 py-3 bg-[#0D1B5E] text-white rounded-xl hover:bg-[#1a2d7c] transition-all font-semibold active:scale-95 shadow-md">
          Browse All Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Detail Header Banner */}
      <section className="bg-gradient-to-br from-[#0D1B5E] via-[#152478] to-[#1e3a8a] text-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors mb-6 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Jobs
          </Link>
          <div className="flex flex-wrap gap-2.5 mb-4">
            <span className="px-3.5 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-semibold tracking-wide uppercase">{job.category}</span>
            <span className="px-3.5 py-1 bg-emerald-500/20 border border-emerald-500/10 text-emerald-200 rounded-full text-xs font-semibold tracking-wide uppercase">{job.type}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4">{job.title}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-blue-200">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Contact Office for Location Details
            </span>
          </div>
        </div>
      </section>

      {/* Main Details and side info panel */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Description & Criteria */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-50">Job Info</h2>
              <div className="prose prose-sm text-gray-600 max-w-none">
                <p className="whitespace-pre-line leading-relaxed text-sm sm:text-base">{job.description}</p>
              </div>

              {/* Job Requirements & Criteria */}
              {job.qualification && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Requirements & Criteria</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">Minimum Qualification</span>
                      <span className="text-sm font-semibold text-gray-800">{job.qualification}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Embedded Resume Application Form */}
            <div id="apply-form-section" className="scroll-mt-24">
              <ApplyForm jobTitle={job.title} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Action Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-sm sm:text-base">Interested in this position?</h3>
              <a
                href="#apply-form-section"
                className="block w-full py-3.5 bg-[#0D1B5E] text-white text-sm font-bold rounded-xl text-center hover:bg-[#1a2d7c] hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 mb-3 active:scale-95"
              >
                Apply Directly
              </a>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(`Hi! I am interested in the ${job.title} position listed on IBees Jobs.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-50 text-green-700 text-sm font-bold rounded-xl hover:bg-green-100 transition-all duration-300 active:scale-95"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp Quick Apply
              </a>
            </div>

            {/* Premium Job Summary Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl pointer-events-none"></div>
              
              <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-5 pb-3 border-b border-gray-100 flex items-center gap-2 relative z-10">
                <svg className="w-5 h-5 text-[#0D1B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 00-2 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                Job Summary
              </h3>
              
              <div className="space-y-5 relative z-10">
                {/* Category */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#0D1B5E] flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-gray-400 tracking-wider">Sector / Category</span>
                    <span className="text-sm font-bold text-gray-800">{job.category}</span>
                  </div>
                </div>

                {/* Job Type */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#0D1B5E] flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-gray-400 tracking-wider">Job Type</span>
                    <span className="text-sm font-bold text-gray-800">{job.type}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#0D1B5E] flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-gray-400 tracking-wider">Location</span>
                    <span className="text-sm font-bold text-gray-800">Contact Office for Details</span>
                  </div>
                </div>

                {/* Salary */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#0D1B5E] flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-gray-400 tracking-wider">Salary Range</span>
                    <span className="text-sm font-bold text-gray-800">Contact Office (Competitive)</span>
                  </div>
                </div>

                {/* Qualification */}
                {job.qualification && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#0D1B5E] flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-gray-400 tracking-wider">Qualification</span>
                      <span className="text-sm font-bold text-gray-800">{job.qualification}</span>
                    </div>
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
