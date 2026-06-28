'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Job, Application, ContactInquiry } from '@/lib/types';
import { JOB_CATEGORIES } from '@/lib/constants';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(true);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'inquiries'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(false);

  // Job form modal state
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobForm, setJobForm] = useState({
    title: '', category: '', description: '', location: 'Thiruvananthapuram, Kerala',
    type: 'Full-time', salary_range: '', qualification: '', experience: '', is_active: true,
  });

  // Verify auth session on load
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setAuthLoading(false);
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch lists when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchJobs();
      fetchApplications();
      fetchInquiries();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAuthError(error.message);
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const fetchJobs = async () => {
    setLoading(true);
    const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
    setJobs(data || []);
    setLoading(false);
  };

  const fetchApplications = async () => {
    const { data } = await supabase
      .from('applications')
      .select('*, jobs:job_id(title, category)')
      .order('applied_at', { ascending: false });
    setApplications((data as unknown as Application[]) || []);
  };

  const fetchInquiries = async () => {
    const { data } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    setInquiries((data as ContactInquiry[]) || []);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingJob) {
      await supabase.from('jobs').update(jobForm).eq('id', editingJob.id);
    } else {
      await supabase.from('jobs').insert(jobForm);
    }
    setShowJobForm(false);
    setEditingJob(null);
    setJobForm({ title: '', category: '', description: '', location: 'Thiruvananthapuram, Kerala', type: 'Full-time', salary_range: '', qualification: '', experience: '', is_active: true });
    fetchJobs();
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title, category: job.category, description: job.description,
      location: job.location, type: job.type, salary_range: job.salary_range || '',
      qualification: job.qualification || '', experience: job.experience || '',
      is_active: job.is_active,
    });
    setShowJobForm(true);
  };

  const handleToggleActive = async (job: Job) => {
    await supabase.from('jobs').update({ is_active: !job.is_active }).eq('id', job.id);
    fetchJobs();
  };

  const handleDeleteJob = async (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      await supabase.from('jobs').delete().eq('id', id);
      fetchJobs();
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    await supabase.from('applications').update({ status }).eq('id', id);
    fetchApplications();
  };

  if (authLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D1B5E]"></div>
      </div>
    );
  }

  // Admin login layout
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#0D1B5E] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-sm text-gray-500 mt-1">IBees Jobs Dashboard</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
            {authError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {authError}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email" id="admin-email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E]"
                  placeholder="admin@ibeesjobs.com"
                />
              </div>
              <div>
                <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input
                  type="password" id="admin-password" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E]"
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="w-full py-3.5 bg-[#0D1B5E] text-white text-sm font-semibold rounded-xl hover:bg-[#1a2d7c] transition-all duration-300">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard layout
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar info */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-xs text-gray-500">IBees Jobs Management</p>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Statistics boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-2xl font-bold text-[#0D1B5E]">{jobs.length}</p>
            <p className="text-xs text-gray-500">Total Jobs</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-2xl font-bold text-emerald-600">{jobs.filter(j => j.is_active).length}</p>
            <p className="text-xs text-gray-500">Active Jobs</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-2xl font-bold text-amber-600">{applications.length}</p>
            <p className="text-xs text-gray-500">Applications</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-2xl font-bold text-indigo-600">{inquiries.length}</p>
            <p className="text-xs text-gray-500">Inquiries</p>
          </div>
        </div>

        {/* Tab triggers */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'jobs' ? 'bg-white text-[#0D1B5E] shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Jobs ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'applications' ? 'bg-white text-[#0D1B5E] shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'inquiries' ? 'bg-white text-[#0D1B5E] shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Inquiries ({inquiries.length})
          </button>
        </div>

        {/* Jobs List Panel */}
        {activeTab === 'jobs' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Job Listings</h2>
              <button
                onClick={() => { setShowJobForm(true); setEditingJob(null); setJobForm({ title: '', category: '', description: '', location: 'Thiruvananthapuram, Kerala', type: 'Full-time', salary_range: '', qualification: '', experience: '', is_active: true }); }}
                className="px-4 py-2 bg-[#0D1B5E] text-white text-sm font-medium rounded-xl hover:bg-[#1a2d7c] transition-all"
              >
                + Add Job
              </button>
            </div>

            {/* Modal Job Form overlay */}
            {showJobForm && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">{editingJob ? 'Edit Job' : 'Add New Job'}</h3>
                    <button onClick={() => setShowJobForm(false)} className="text-gray-400 hover:text-gray-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <form onSubmit={handleSaveJob} className="space-y-4">
                    <div>
                      <label htmlFor="form-job-title" className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                      <input type="text" id="form-job-title" required value={jobForm.title} onChange={(e) => setJobForm(p => ({ ...p, title: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="form-job-cat" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                        <select id="form-job-cat" required value={jobForm.category} onChange={(e) => setJobForm(p => ({ ...p, category: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E]">
                          <option value="">Select category</option>
                          {JOB_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="form-job-type" className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                        <select id="form-job-type" required value={jobForm.type} onChange={(e) => setJobForm(p => ({ ...p, type: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E]">
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                          <option value="Remote">Remote</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="form-job-loc" className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                        <input type="text" id="form-job-loc" required value={jobForm.location} onChange={(e) => setJobForm(p => ({ ...p, location: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E]" />
                      </div>
                      <div>
                        <label htmlFor="form-job-salary" className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                        <input type="text" id="form-job-salary" value={jobForm.salary_range} onChange={(e) => setJobForm(p => ({ ...p, salary_range: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E]"
                          placeholder="e.g. ₹20,000 - ₹30,000/month" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="form-job-qualification" className="block text-sm font-medium text-gray-700 mb-1">Minimum Qualification</label>
                        <input type="text" id="form-job-qualification" value={jobForm.qualification} onChange={(e) => setJobForm(p => ({ ...p, qualification: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E]"
                          placeholder="e.g. B.Tech, BSc Nursing, MBA" />
                      </div>
                      <div>
                        <label htmlFor="form-job-experience" className="block text-sm font-medium text-gray-700 mb-1">Experience Required</label>
                        <input type="text" id="form-job-experience" value={jobForm.experience} onChange={(e) => setJobForm(p => ({ ...p, experience: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E]"
                          placeholder="e.g. 2+ years, Freshers" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="form-job-desc" className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                      <textarea id="form-job-desc" required rows={5} value={jobForm.description} onChange={(e) => setJobForm(p => ({ ...p, description: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] resize-none" />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="form-job-active" checked={jobForm.is_active} onChange={(e) => setJobForm(p => ({ ...p, is_active: e.target.checked }))} className="rounded" />
                      <label htmlFor="form-job-active" className="text-sm text-gray-700">Active (visible to public)</label>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setShowJobForm(false)} className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all">
                        Cancel
                      </button>
                      <button type="submit" className="flex-1 py-2.5 bg-[#0D1B5E] text-white text-sm font-medium rounded-xl hover:bg-[#1a2d7c] transition-all">
                        {editingJob ? 'Update Job' : 'Create Job'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Jobs list grid table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Title</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5 hidden md:table-cell">Category</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5 hidden lg:table-cell">Location</th>
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Status</th>
                      <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="px-4 py-3.5">
                          <p className="text-sm font-medium text-gray-900">{job.title}</p>
                          <p className="text-xs text-gray-400 md:hidden mt-0.5">{job.category}</p>
                        </td>
                        <td className="px-4 py-3.5 hidden md:table-cell"><span className="text-xs px-2 py-1 bg-blue-50 text-[#0D1B5E] rounded-full font-medium">{job.category}</span></td>
                        <td className="px-4 py-3.5 text-sm text-gray-500 hidden lg:table-cell">{job.location}</td>
                        <td className="px-4 py-3.5 text-center">
                          <button onClick={() => handleToggleActive(job)} className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${job.is_active ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                            {job.is_active ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => handleEditJob(job)} className="p-1.5 text-gray-400 hover:text-[#0D1B5E] hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                            <button onClick={() => handleDeleteJob(job.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {jobs.length === 0 && !loading && (
                <div className="text-center py-12 text-gray-400">
                  <p>No jobs found. Add your first job listing!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Applications List Tab */}
        {activeTab === 'applications' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Applications</h2>
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{app.name}</h3>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                          app.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                          app.status === 'shortlisted' ? 'bg-emerald-50 text-emerald-700' :
                          'bg-red-50 text-red-700'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#0D1B5E] font-medium mb-1">
                        {app.jobs?.title || 'Unknown Position'} — {app.jobs?.category || ''}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                        <span>📧 {app.email}</span>
                        <span>📱 {app.phone}</span>
                        <span>📅 {new Date(app.applied_at).toLocaleDateString('en-IN')}</span>
                      </div>
                      {app.cover_note && (
                        <p className="mt-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3 whitespace-pre-line">{app.cover_note}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={app.resume_url} target="_blank" rel="noopener noreferrer"
                        className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-[#0D1B5E] rounded-lg hover:bg-blue-100 transition-all flex items-center gap-1">
                        📄 Resume
                      </a>
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                        className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 bg-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              {applications.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <p>No applications received yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contact Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">General Inquiries</h2>
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{inq.name}</h3>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
                        <span>📧 {inq.email}</span>
                        {inq.phone && <span>📱 {inq.phone}</span>}
                        <span>📅 {new Date(inq.created_at).toLocaleDateString('en-IN')}</span>
                      </div>
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 whitespace-pre-line">{inq.message}</p>
                    </div>
                    <button
                      onClick={async () => {
                        if (confirm('Delete this inquiry?')) {
                          await supabase.from('contacts').delete().eq('id', inq.id);
                          fetchInquiries();
                        }
                      }}
                      className="px-3 py-1.5 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {inquiries.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <p>No inquiries received yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
