import Link from 'next/link';
import Image from 'next/image';
import { BASE_PATH } from '@/lib/constants';

const values = [
  {
    icon: (
      <svg className="w-8 h-8 text-[#0D1B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    ),
    title: 'Our Mission',
    desc: 'To empower job seekers in Kerala and beyond by connecting them with fulfilling careers, and helping employers build high-performing teams.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#0D1B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    ),
    title: 'Our Vision',
    desc: 'To be the most reliable and efficient job consultancy and recruitment partner in India, known for integrity, quality, and fast placements.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#0D1B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    ),
    title: 'Integrity First',
    desc: 'We believe in honest partnerships. We verify all job details and applicant credentials to ensure a safe, transparent hiring process.'
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#0D1B5E] via-[#152478] to-[#1e3a8a] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About IBees Jobs</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">Connecting exceptional talent with premium opportunities in IT, Non-IT, and Abroad sectors.</p>
        </div>
      </section>

      {/* Main Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Based in Thiruvananthapuram, Kerala, near the IT hub of Infosys and Technopark, **IBees Jobs** is a premier recruitment agency and job consulting partner. Over the years, we have built a reputation for bridging the gap between talent and opportunities.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Whether you are a software engineer seeking your next career leap at Technopark, a healthcare professional looking for hospital placements, or a skilled worker seeking international opportunities abroad, IBees Jobs provides customized solutions tailored to your goals.
            </p>
            <div className="flex gap-4">
              <Link href="/jobs" className="px-6 py-3 bg-[#0D1B5E] text-white font-semibold rounded-xl hover:bg-[#152478] transition-all">
                Browse Openings
              </Link>
              <Link href="/contact" className="px-6 py-3 bg-white border border-gray-200 text-[#0D1B5E] font-semibold rounded-xl hover:bg-gray-50 transition-all">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative bg-white rounded-3xl p-6 border border-gray-100 shadow-xl max-w-md w-full">
              <Image
                src={`${BASE_PATH}/logo.png`}
                alt="IBees Jobs Logo"
                width={320}
                height={180}
                className="w-full object-contain rounded-xl"
                priority
                unoptimized
              />
              <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#0D1B5E]">56</div>
                  <div className="text-xs text-gray-400 font-medium">Job Categories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#0D1B5E]">3</div>
                  <div className="text-xs text-gray-400 font-medium">Core Sectors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-white py-16 md:py-24 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Core Pillars</h2>
            <p className="text-gray-500 mt-2 font-medium">The foundation of everything we do at IBees Jobs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  {val.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{val.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
