-- IBees Jobs Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Jobs table
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text not null,
  location text not null default 'Thiruvananthapuram, Kerala',
  type text not null default 'Full-time',
  salary_range text,
  qualification text,
  experience text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Applications table
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  name text not null,
  email text not null,
  phone text not null,
  resume_url text not null,
  cover_note text,
  status text not null default 'pending',
  applied_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS)
alter table public.jobs enable row level security;
alter table public.applications enable row level security;

-- Jobs policies
-- Public can read active jobs
create policy "Public can read active jobs"
  on public.jobs for select
  to anon, authenticated
  using (is_active = true);

-- Admin can read all jobs
create policy "Admin can read all jobs"
  on public.jobs for select
  to authenticated
  using (true);

-- Admin can insert jobs
create policy "Admin can insert jobs"
  on public.jobs for insert
  to authenticated
  with check (true);

-- Admin can update jobs
create policy "Admin can update jobs"
  on public.jobs for update
  to authenticated
  using (true)
  with check (true);

-- Admin can delete jobs
create policy "Admin can delete jobs"
  on public.jobs for delete
  to authenticated
  using (true);

-- Applications policies
-- Public can insert applications
create policy "Public can insert applications"
  on public.applications for insert
  to anon, authenticated
  with check (true);

-- Admin can read all applications
create policy "Admin can read applications"
  on public.applications for select
  to authenticated
  using (true);

-- Admin can update application status
create policy "Admin can update applications"
  on public.applications for update
  to authenticated
  using (true)
  with check (true);

-- Admin can delete applications
create policy "Admin can delete applications"
  on public.applications for delete
  to authenticated
  using (true);

-- Grant permissions
grant select on public.jobs to anon;
grant select, insert, update, delete on public.jobs to authenticated;
grant insert on public.applications to anon;
grant select, insert, update, delete on public.applications to authenticated;

-- Storage policies (run in SQL editor to create resumes bucket policies)
-- Note: Create a private or public bucket named 'resumes' in Supabase Storage.
-- Then run the following policies:
insert into storage.buckets (id, name, public) values ('resumes', 'resumes', false)
  on conflict (id) do nothing;

create policy "Anyone can upload resumes"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'resumes');

create policy "Admin can read resumes"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'resumes');

-- Seed data: sample job listings across requested categories
insert into public.jobs (title, category, description, location, type, salary_range) values
('Senior 3Ds Max Designer', '3Ds Max Designer', 'We are looking for a skilled 3Ds Max Designer with 3+ years of experience in architectural visualization and product rendering. Must be proficient in V-Ray rendering, modeling, and animation. Portfolio required.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹25,000 - ₹40,000/month'),
('Junior Accountant', 'Accountant', 'Seeking a detail-oriented Junior Accountant to manage financial records, prepare reports, and assist with audits. Knowledge of Tally and GST filing required.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹18,000 - ₹25,000/month'),
('Office Administrator', 'Administration', 'Looking for an experienced Office Administrator to manage day-to-day operations, coordinate with staff, and maintain office records. Strong organizational skills required.', 'Kochi, Kerala', 'Full-time', '₹20,000 - ₹30,000/month'),
('Architect - Residential Projects', 'Architect', 'Experienced Architect needed for residential projects. Must have proficiency in AutoCAD, SketchUp, and Revit. Minimum 2 years experience required.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹30,000 - ₹50,000/month'),
('AutoCAD Draftsman', 'Autocad Expert / Trainee', 'AutoCAD expert needed for creating detailed technical drawings and blueprints. Experience in civil/structural drafting preferred.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹20,000 - ₹35,000/month'),
('Ayurveda Therapist', 'Ayurveda Therapist', 'Certified Ayurveda Therapist required for a leading wellness center. Must have knowledge of Panchakarma treatments and traditional massage techniques.', 'Kollam, Kerala', 'Full-time', '₹15,000 - ₹25,000/month'),
('Banking Operations Executive', 'Banking jobs', 'Banking professional needed for customer service operations. Experience in retail banking, KYC verification, and loan processing preferred.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹22,000 - ₹35,000/month'),
('Senior Beautician', 'Beautician', 'Experienced beautician with expertise in skincare, hair styling, and bridal makeup. CIDESCO or VLCC certification preferred.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹15,000 - ₹30,000/month'),
('BPO Voice Process Executive', 'BPO jobs', 'Customer support executive for international voice process. Excellent English communication skills required. Rotational shifts.', 'Technopark, Thiruvananthapuram', 'Full-time', '₹18,000 - ₹28,000/month'),
('Business Development Manager', 'Business Development', 'Dynamic BD Manager needed to identify new business opportunities, build client relationships, and drive revenue growth. MBA preferred.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹30,000 - ₹50,000/month'),
('Retail Cashier', 'Cashier', 'Cashier needed for a leading retail store. Must be comfortable with POS systems, cash handling, and customer interaction.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹12,000 - ₹18,000/month'),
('Computer Operator', 'Computer Operator', 'Computer operator with good typing speed and knowledge of MS Office required. Data entry and document management tasks.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹12,000 - ₹20,000/month'),
('Content Writer - Digital Media', 'Content / Copy Writer', 'Creative content writer for blog posts, social media content, and website copy. Strong command over English and SEO knowledge required.', 'Remote / Thiruvananthapuram', 'Full-time', '₹18,000 - ₹30,000/month'),
('Head Chef - Multi-Cuisine', 'Cook / Chef', 'Experienced head chef specializing in multi-cuisine cooking. Must have hotel management background and 5+ years kitchen experience.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹25,000 - ₹45,000/month'),
('CRM Executive', 'CRM', 'CRM executive to manage customer relationships using Salesforce/HubSpot. Experience in customer engagement and retention strategies required.', 'Technopark, Thiruvananthapuram', 'Full-time', '₹22,000 - ₹35,000/month'),
('Customer Relations Officer', 'Customer Relation Officer', 'Front-desk customer relations officer for a hospitality firm. Excellent communication and problem-solving skills essential.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹15,000 - ₹25,000/month'),
('Data Analyst', 'Data Analyst', 'Data analyst with expertise in Python, SQL, and Tableau. Will be responsible for data visualization, reporting, and actionable insights.', 'Technopark, Thiruvananthapuram', 'Full-time', '₹30,000 - ₹50,000/month'),
('Data Entry Operator', 'Data Entry', 'Data entry operator with minimum 35 WPM typing speed. Accuracy and attention to detail are critical. MS Excel proficiency required.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹12,000 - ₹18,000/month'),
('Digital Marketing Executive', 'Digital Marketing', 'Digital marketing professional for SEO, SEM, social media marketing, and email campaigns. Google Ads certification is a plus.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹20,000 - ₹35,000/month'),
('Company Driver', 'Driver', 'Licensed driver with clean record needed for corporate transportation. Must have valid LMV license and knowledge of city routes.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹15,000 - ₹22,000/month'),
('Licensed Electrician', 'Electrician', 'Certified electrician for commercial and residential wiring, maintenance, and troubleshooting. Wireman license required.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹18,000 - ₹30,000/month'),
('Civil Engineer - Site', 'Engineer - Civil', 'Site civil engineer for ongoing construction projects. B.Tech in Civil Engineering required. Experience in estimation and project management preferred.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹25,000 - ₹45,000/month'),
('Mechanical Engineer', 'Engineer - Mechanical', 'Mechanical engineer for manufacturing unit. Must have experience in AutoCAD, SolidWorks, and production planning.', 'Kochi, Kerala', 'Full-time', '₹25,000 - ₹40,000/month'),
('Sales Executive', 'Executive', 'Sales executive for FMCG products. Must have own vehicle, good communication skills, and willingness to travel within Kerala.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹18,000 - ₹28,000/month'),
('Faculty - Computer Science', 'Faculty', 'Computer Science faculty for engineering college. M.Tech/PhD required. Teaching experience in programming, DBMS, and networking preferred.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹30,000 - ₹50,000/month'),
('Fashion Designer', 'Fashion Design', 'Creative fashion designer for a boutique brand. Must have portfolio showcasing original designs. Knowledge of textile science preferred.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹20,000 - ₹35,000/month'),
('Finance Manager', 'Finance', 'Finance manager with CA/MBA Finance for financial planning, budgeting, and compliance. Experience in SAP/ERP systems preferred.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹40,000 - ₹70,000/month'),
('Graphic Designer', 'Graphic Design', 'Creative graphic designer proficient in Adobe Creative Suite (Photoshop, Illustrator, InDesign). Portfolio required. Experience in branding preferred.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹18,000 - ₹30,000/month'),
('Production Helper', 'Helper', 'Helper needed for production unit. Physical fitness required. Will assist in loading, unloading, and assembly tasks.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹10,000 - ₹15,000/month'),
('HR Consultant', 'HR Consultant', 'Experienced HR consultant for recruitment, employee engagement, and compliance management. SHRM/HRCI certification is a plus.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹30,000 - ₹50,000/month'),
('Interior Designer', 'Interior Designer', 'Creative interior designer for residential and commercial projects. Proficiency in SketchUp, 3Ds Max, and AutoCAD required.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹25,000 - ₹40,000/month'),
('IT Support Engineer', 'IT jobs', 'IT support engineer for hardware/software troubleshooting, network management, and system administration. CCNA certification preferred.', 'Technopark, Thiruvananthapuram', 'Full-time', '₹20,000 - ₹35,000/month'),
('Java Developer', 'Java Developer', 'Java developer with Spring Boot experience for enterprise application development. 2+ years experience in Java, REST APIs, and microservices.', 'Technopark, Thiruvananthapuram', 'Full-time', '₹35,000 - ₹60,000/month'),
('Lab Technician - Pathology', 'Lab Technician', 'Certified lab technician for diagnostic laboratory. DMLT/BMLT qualification required. Experience in sample collection and reporting.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹15,000 - ₹25,000/month'),
('Operations Manager', 'Manager', 'Operations manager to oversee daily business activities, manage teams, and optimize processes. MBA with 5+ years experience preferred.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹40,000 - ₹65,000/month'),
('Automobile Mechanic', 'Mechanic', 'Skilled automobile mechanic for a multi-brand service center. Must have ITI/Diploma in automobile engineering and hands-on experience.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹15,000 - ₹28,000/month'),
('Medical Representative', 'Medical/Health care', 'Medical representative for pharmaceutical company covering Thiruvananthapuram district. B.Pharm/B.Sc preferred. Own vehicle required.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹20,000 - ₹35,000/month'),
('Mobile App Developer - Flutter', 'Mobile App Developer', 'Flutter developer for cross-platform mobile app development. Experience with Dart, REST APIs, and state management (Bloc/Provider) required.', 'Technopark, Thiruvananthapuram', 'Full-time', '₹30,000 - ₹55,000/month'),
('Network Administrator', 'Network Administration', 'Network administrator for enterprise network infrastructure management. CCNA/CCNP certification and experience with Cisco equipment required.', 'Technopark, Thiruvananthapuram', 'Full-time', '₹28,000 - ₹45,000/month'),
('Staff Nurse - ICU', 'Nurse', 'Registered nurse for ICU department. BSc Nursing with Kerala Nurses Council registration required. Minimum 1 year ICU experience.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹22,000 - ₹35,000/month'),
('Office Coordinator', 'Office Co-Ordinator', 'Office coordinator to manage schedules, coordinate meetings, and handle correspondence. Strong MS Office skills and organizational abilities required.', 'Thiruvananthapuram, Kerala', 'Full-time', '₹15,000 - ₹25,000/month');

-- Contacts (inquiries) table
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS)
alter table public.contacts enable row level security;

-- Policies
create policy "Public can insert contacts"
  on public.contacts for insert
  to anon, authenticated
  with check (true);

create policy "Admin can read contacts"
  on public.contacts for select
  to authenticated
  using (true);

-- Grant permissions
grant insert on public.contacts to anon;
grant select, delete on public.contacts to authenticated;

-- Seed Admin user account into auth.users (email: balasankar8943@gmail.com, password: IBeesAdmin8943!)
create extension if not exists pgcrypto;

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) values (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'balasankar8943@gmail.com',
  crypt('IBeesAdmin8943!', gen_salt('bf')),
  now(),
  null,
  null,
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
) on conflict (email) do nothing;


