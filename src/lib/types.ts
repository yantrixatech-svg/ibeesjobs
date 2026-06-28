export interface Job {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  type: string;
  salary_range: string | null;
  qualification: string | null;
  experience: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Application {
  id: string;
  job_id: string;
  name: string;
  email: string;
  phone: string;
  resume_url: string;
  cover_note: string | null;
  status: 'pending' | 'shortlisted' | 'rejected';
  applied_at: string;
  jobs?: {
    title: string;
    category: string;
  };
}

export type JobCategory = 'IT' | 'Non-IT' | 'Abroad';
