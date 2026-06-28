import Link from 'next/link';
import InquiryForm from '@/components/InquiryForm';

export function generateStaticParams() {
  return [
    { domain: 'it' },
    { domain: 'office' },
    { domain: 'abroad' },
  ];
}

const DOMAIN_INFO: Record<string, { label: string; desc: string }> = {
  it: {
    label: 'IT & Tech Jobs',
    desc: 'Register your profile for development, system administration, and digital technology placements.',
  },
  office: {
    label: 'Office & Non-IT Jobs',
    desc: 'Submit your details for administration, accounting, corporate sales, and customer relations roles.',
  },
  abroad: {
    label: 'Overseas & Abroad Jobs',
    desc: 'Apply for skilled technical, healthcare, engineering, and nursing positions in GCC and European markets.',
  },
};

export default function DomainInquiryPage({ params }: { params: { domain: string } }) {
  const info = DOMAIN_INFO[params.domain] || null;

  if (!info) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Inquiry Domain Not Found</h2>
        <p className="text-gray-500 mb-6 text-center max-w-sm">Please select a valid recruitment domain to submit your inquiry.</p>
        <Link href="/" className="px-6 py-3 bg-[#0D1B5E] text-white rounded-xl hover:bg-[#1a2d7c] transition-all font-semibold active:scale-95 shadow-md">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#0D1B5E] via-[#152478] to-[#1e3a8a] text-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors mb-6 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4">
            Inquire for {info.label}
          </h1>
          <p className="text-sm text-blue-200 max-w-xl mx-auto">
            {info.desc}
          </p>
        </div>
      </section>

      {/* Form Container */}
      <section className="max-w-xl mx-auto px-4 py-12">
        <InquiryForm domain={params.domain} domainLabel={info.label} />
      </section>
    </div>
  );
}
