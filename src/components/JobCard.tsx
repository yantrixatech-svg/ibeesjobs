import Link from 'next/link';
import { Job } from '@/lib/types';

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="group block">
      <div className="relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
        {/* Category Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0D1B5E]">
            {job.category}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
            {job.type}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0D1B5E] transition-colors duration-200 mb-2 pr-8 line-clamp-2">
          {job.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Qualification & Contact Info */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-50 text-xs">
          {job.qualification ? (
            <span className="text-gray-500 font-medium">
              <span className="text-gray-400 font-normal">Min. Qualification:</span> {job.qualification}
            </span>
          ) : (
            <span className="text-gray-400">Open to all qualifications</span>
          )}
          <span className="text-[#0D1B5E] font-bold group-hover:underline flex items-center gap-1">
            Interested? Contact Us
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
