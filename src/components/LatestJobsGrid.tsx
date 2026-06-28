import { STATIC_JOBS } from '@/lib/constants';
import JobCard from '@/components/JobCard';

export default function LatestJobsGrid() {
  // Extract first 3 active jobs
  const latestJobs = STATIC_JOBS.filter((j) => j.is_active).slice(0, 3);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {latestJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
