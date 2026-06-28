'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Job } from '@/lib/types';
import JobCard from '@/components/JobCard';
import CategoryFilter from '@/components/CategoryFilter';

function JobsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('jobs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (selectedCategory) {
      query = query.eq('category', selectedCategory);
    }

    if (searchQuery) {
      query = query.ilike('title', `%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching jobs:', error);
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#0D1B5E] via-[#152478] to-[#1e3a8a] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-blue-200 max-w-2xl mx-auto mb-8">
            Browse through hundreds of opportunities across 41+ categories
          </p>
          
          {/* Keyword Search Input */}
          <div className="max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white border border-gray-200 rounded-2xl p-1.5 shadow-md focus-within:ring-2 focus-within:ring-white/30 transition-all">
              <div className="flex items-center pl-3 flex-1">
                <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      fetchJobs();
                    }
                  }}
                  placeholder="Search jobs by title..."
                  className="w-full bg-transparent text-gray-950 placeholder-gray-400 focus:outline-none py-2 text-sm sm:text-base"
                />
              </div>
              <button 
                onClick={fetchJobs}
                className="px-5 sm:px-6 py-2.5 bg-[#0D1B5E] text-white text-sm font-semibold rounded-xl hover:bg-[#152478] transition-all duration-200 flex-shrink-0 shadow-sm active:scale-95"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Results layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filter Selector */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm sticky top-24">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory('')}
                  className="mt-3 w-full py-2 text-xs text-gray-500 hover:text-[#0D1B5E] transition-colors"
                >
                  ✕ Clear filter
                </button>
              )}
            </div>
          </aside>

          {/* Job Listings Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                {loading ? 'Loading...' : `${jobs.length} job${jobs.length !== 1 ? 's' : ''} found`}
                {selectedCategory && <span className="text-[#0D1B5E] font-medium"> in {selectedCategory}</span>}
              </p>
            </div>

            {loading ? (
              <div className="grid gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
                    <div className="flex gap-3 mb-4">
                      <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                      <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="h-5 w-3/4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory(''); }}
                  className="px-6 py-2.5 bg-[#0D1B5E] text-white text-sm font-medium rounded-xl hover:bg-[#1a2d7c] transition-all"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D1B5E]"></div>
      </div>
    }>
      <JobsContent />
    </Suspense>
  );
}
