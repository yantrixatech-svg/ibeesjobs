import Link from 'next/link';
import { Job } from '@/lib/types';

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="group block">
      <div className="relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
        {/* Category Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-[#0D1B5E]">
            {job.category}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
            {job.type}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#0D1B5E] transition-colors duration-200 mb-2 pr-8 line-clamp-2">
          {job.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {job.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {job.location}
          </span>
          {job.salary_range && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {job.salary_range}
            </span>
          )}
        </div>

        {/* Arrow indicator */}
        <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#0D1B5E] flex items-center justify-center transition-all duration-300">
          <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
