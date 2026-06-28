import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const values = [
    { icon: '🎯', title: 'Our Mission', desc: 'To empower job seekers in Kerala and beyond by connecting them with fulfilling careers, and helping employers build high-performing teams.' },
    { icon: '👁️', title: 'Our Vision', desc: 'To be the most reliable and efficient job consultancy and recruitment partner in India, known for integrity, quality, and fast placements.' },
    { icon: '🤝', title: 'Integrity First', desc: 'We believe in honest partnerships. We verify all job details and applicant credentials to ensure a safe, transparent hiring process.' },
  ];

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
                src="/logo.png"
                alt="IBees Jobs Logo"
                width={320}
                height={180}
                className="w-full object-contain rounded-xl"
              />
              <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#0D1B5E]">500+</div>
                  <div className="text-xs text-gray-400">Jobs Listed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">1000+</div>
                  <div className="text-xs text-gray-400">Placed Candidates</div>
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
            <p className="text-gray-500 mt-2">The foundation of everything we do at IBees Jobs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{val.icon}</div>
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
