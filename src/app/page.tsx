import Link from 'next/link';
import Image from 'next/image';
import { STATIC_JOBS, COMPANY, getSectorForCategory, BASE_PATH } from '@/lib/constants';
import LatestJobsGrid from '@/components/LatestJobsGrid';

const stats = [
  { value: `${STATIC_JOBS.length}`, label: 'Live Jobs Available' },
  { value: '150+', label: 'Corporate Partners' },
  { value: '3', label: 'Recruitment Sectors' },
];

const categories = [
  {
    name: 'IT',
    icon: (
      <svg className="w-6 h-6 text-[#0D1B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
    count: `${STATIC_JOBS.filter(j => getSectorForCategory(j.category) === 'IT').length} active roles`
  },
  {
    name: 'Non-IT',
    icon: (
      <svg className="w-6 h-6 text-[#0D1B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0V9a2 2 0 012-2h2a2 2 0 012 2v12m-6 0h6" /></svg>
    ),
    count: `${STATIC_JOBS.filter(j => getSectorForCategory(j.category) === 'Non-IT').length} active roles`
  },
  {
    name: 'Abroad',
    icon: (
      <svg className="w-6 h-6 text-[#0D1B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2.5M10.5 20.25a7.5 7.5 0 119.9-9.9" /></svg>
    ),
    count: `${STATIC_JOBS.filter(j => getSectorForCategory(j.category) === 'Abroad').length} active roles`
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#1d35a6] via-[#0D1B5E] to-[#08103b] text-white min-h-[85vh] flex items-center">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text details */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/10 text-xs font-semibold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Official Manpower Agency
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Connecting{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
                  Talent
                </span>
                {' '}with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-300">
                  Opportunities
                </span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-blue-100/90 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                IBees Jobs is Kerala&apos;s trusted placement partner. We connect professionals with premium job openings across IT, administrative, healthcare, and engineering sectors in local and international markets.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/jobs"
                  className="px-8 py-4 bg-white text-[#0D1B5E] font-bold rounded-xl hover:bg-blue-50 hover:shadow-xl hover:shadow-white/10 transition-all duration-300 text-center active:scale-95"
                >
                  Explore Vacancies
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center active:scale-95"
                >
                  Submit Profile
                </Link>
              </div>

              {/* WhatsApp Quick Apply */}
              <div className="mt-8">
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent('Hi! I am interested in job opportunities.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-30 inline-flex items-center gap-2.5 px-6 py-3.5 bg-emerald-600 text-white text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-900/20 transition-all duration-300 active:scale-95"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  Connect On WhatsApp
                </a>
              </div>
            </div>

            {/* Right Brand Logo Box */}
            <div className="flex justify-center z-20">
              <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xl transition-all duration-300">
                <Image
                  src={`${BASE_PATH}/logo.png`}
                  alt="IBees Jobs Logo"
                  width={350}
                  height={200}
                  className="w-[240px] sm:w-[320px] lg:w-[350px] h-auto object-contain rounded-xl"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Stats Board */}
      <section className="py-16 bg-gray-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D1B5E] mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manpower Services Section */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Manpower Recruitment Domains</h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">We provide comprehensive recruiting services across major sectors.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-[#0D1B5E] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">IT & Tech Placements</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">
                Sourcing developers, project managers, database administrators, and QA specialists for IT firms in Technopark Thiruvananthapuram and Infopark Kochi.
              </p>
              <Link href="/jobs?category=IT" className="text-xs font-bold text-[#0D1B5E] hover:underline uppercase tracking-wider">Search Tech Jobs →</Link>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-[#0D1B5E] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0V9a2 2 0 012-2h2a2 2 0 012 2v12m-6 0h6" /></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Office Staff & Non-IT</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">
                Placing administrative officers, executive assistants, corporate accountants, sales representatives, and customer managers in commercial sectors.
              </p>
              <Link href="/jobs?category=Non-IT" className="text-xs font-bold text-[#0D1B5E] hover:underline uppercase tracking-wider">Search Office Jobs →</Link>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-[#0D1B5E] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2.5M10.5 20.25a7.5 7.5 0 119.9-9.9" /></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Overseas & Abroad Recruitment</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">
                Assisting skilled workers, technicians, healthcare nurses, and structural engineers secure placements in GCC and European markets.
              </p>
              <Link href="/jobs?category=Abroad" className="text-xs font-bold text-[#0D1B5E] hover:underline uppercase tracking-wider">Inquire For Abroad →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Openings Section */}
      <section className="py-16 md:py-24 bg-gray-50 border-b border-gray-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Recent Job Openings</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">Latest job listings verified by the IBees Jobs recruitment team.</p>
            </div>
            <Link href="/jobs" className="mt-4 md:mt-0 inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider rounded-lg text-gray-700 hover:bg-[#0D1B5E] hover:text-white hover:border-[#0D1B5E] transition-all">
              View All Listings
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <LatestJobsGrid />
        </div>
      </section>

      {/* Explore Sectors */}
      <section className="py-16 md:py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Explore Job Sectors</h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto">Click any sector card to filter current active opportunities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="group p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-[#0D1B5E] hover:border-[#0D1B5E] hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 text-center"
              >
                <div className="w-10 h-10 bg-white group-hover:bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-sm text-gray-900 group-hover:text-white transition-colors mb-1">{cat.name} Recruitment</h3>
                <p className="text-[10px] sm:text-xs text-gray-400 group-hover:text-blue-200 transition-colors">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards Section */}
      <section className="py-16 md:py-24 bg-gray-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Our Service Guarantee</h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto">We focus on candidate credentials and genuine corporate placements.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-[#0D1B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                ),
                title: 'Verified Employer Listings',
                desc: 'Every vacancy on our portal is vetted directly. We negotiate with HR divisions to ensure clear details about qualifications, experience, and salary.'
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-[#0D1B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                ),
                title: 'Rapid Response Placements',
                desc: 'Our direct submission model routes candidate resumes straight to corporate decision makers. We avoid unnecessary delays, providing feedback fast.'
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-[#0D1B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ),
                title: 'Professional Support',
                desc: 'From advising fresh graduates to managing experienced profiles, our local consultancy offers end-to-end guidance from resume review to onboarding.'
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Candidate Reviews */}
      <section className="py-16 md:py-24 bg-white border-t border-b border-gray-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Placement Testimonials</h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto">Hear from candidates placed in local and global positions.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "I applied for a Visualizer role through IBees Jobs. The team coordinated my interview process with the firm in Kazhakootom within a week. I highly recommend their direct service.", author: "Sujith Kumar", role: "3Ds Max Designer" },
              { text: "Very prompt and professional service. The staff helped map my nursing credentials and placed me at a premium clinic. The direct communication via WhatsApp was excellent.", author: "Anjali G. Nair", role: "Staff Nurse" },
              { text: "I was looking for accounts executive vacancies near Thiruvananthapuram. IBees Jobs found me an opening in Technopark. The direct communication was excellent.", author: "Rahul Madhav", role: "Junior Accountant" }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm relative">
                <div className="text-4xl text-blue-200 absolute top-4 right-6 font-serif select-none pointer-events-none">“</div>
                <p className="text-xs text-gray-500 italic mb-6 leading-relaxed relative z-10">{item.text}</p>
                <div>
                  <h4 className="font-bold text-gray-900 text-xs">{item.author}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0D1B5E] to-[#1e3a8a] text-white relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">Find Your Next Professional Opportunity</h2>
          <p className="text-sm sm:text-base text-blue-200 mb-8 max-w-2xl mx-auto">Whether you are planning to take a career leap locally in Kerala or explore global markets, IBees Jobs connects you to the right employers.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/jobs"
              className="px-8 py-4 bg-white text-[#0D1B5E] font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 text-center"
            >
              Browse Jobs
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 text-center"
            >
              Contact Recruiting Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
