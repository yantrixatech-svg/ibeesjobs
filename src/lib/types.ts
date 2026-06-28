export type JobCategory =
  | '3Ds Max Designer' | 'Accountant' | 'Administration' | 'Architect'
  | 'Architectural / Model Designer' | 'Assistant' | 'Autocad Expert / Trainee' | 'Ayurveda Therapist'
  | 'Banking jobs' | 'Beautician' | 'Billing Staff' | 'BPO jobs'
  | 'Branch Manager' | 'Business Development' | 'Cashier' | 'Cleaning / Other jobs'
  | 'Co-ordinator' | 'Computer Operator' | 'Construction / Supervising' | 'Content / Copy Writer'
  | 'Cook / Chef' | 'Counsellor' | 'CRM' | 'Customer Relation Officer'
  | 'Data Analyst' | 'Data Entry' | 'Delivery Boy' | 'Digital Marketing'
  | 'Driver' | 'DTP Operator' | 'Electrician' | 'Engineer - Civil'
  | 'Engineer - Mechanical' | 'Executive' | 'Executive Asst., Front Office' | 'Faculty'
  | 'Fashion Design' | 'Finance' | 'Graphic Design' | 'Helper'
  | 'Holiday Consultant' | 'House Keeping' | 'HR Consultant' | 'HR/Admin'
  | 'Interior Designer' | 'IT jobs' | 'Java Developer' | 'Lab Technician'
  | 'Manager' | 'Mechanic' | 'Medical/Health care' | 'Mobile App Developer'
  | 'Mobile Technician' | 'Network Administration' | 'Nurse' | 'Office Co-Ordinator';

export interface Job {
  id: string;
  title: string;
  category: JobCategory;
  description: string;
  location: string;
  type: string;
  salary_range: string | null;
  qualification: string | null;
  experience: string | null;
  is_active: boolean;
  created_at: string;
}
