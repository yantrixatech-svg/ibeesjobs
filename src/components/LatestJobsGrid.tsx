'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Job } from '@/lib/types';
import JobCard from '@/components/JobCard';

interface LatestJobsGridProps {
  fallbackJobs: Job[];
}

export default function LatestJobsGrid({ fallbackJobs }: LatestJobsGridProps) {
  const [jobs, setJobs] = useState<Job[]>(fallbackJobs);

  useEffect(() => {
    let active = true;

    async function loadJobs() {
      try {
        // Quick fetch request from Supabase
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (active && !error && data && data.length > 0) {
          setJobs(data as Job[]);
        }
      } catch (err) {
        console.warn('Supabase fetch failed, displaying fallback jobs:', err);
      }
    }

    // Attempt loading live jobs
    loadJobs();

    return () => {
      active = false;
    };
  }, [fallbackJobs]);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
