import React, { useState } from 'react';

export default function ResumeLanding() {
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' or 'annual'

  const features = [
    {
      title: "ATS Compatibility Check",
      desc: "We parse your resume exactly like applicant tracking systems do — flagging formatting issues, missing sections, and unparseable content before it costs you an interview.",
      bullets: ["Detects ATS-hostile formatting", "Checks for required sections", "Flags unparseable elements"]
    },
    {
      title: "Keyword Gap Analysis",
      desc: "Every job description has a hidden keyword fingerprint. ResumeAI extracts it, matches it against your resume, and shows you exactly which terms to add — and where.",
      bullets: ["JD keyword extraction", "Match / missing / partial chips", "Placement suggestions per section"]
    },
    {
      title: "Section-by-Section Scoring",
      desc: "Don't guess which part of your resume is dragging down your score. Get individual scores for Summary, Experience, Skills, and Education with specific improvement actions.",
      bullets: ["4-section breakdown", "Specific rewrite suggestions", "Before/after examples"]
    },
    {
      title: "Review History & Progress",
      desc: "Track how your resume improves over time. Every review is saved with its score, job title, and date so you can see your optimization journey at a glance.",
      bullets: ["Persistent review history", "Score trend over time", "Side-by-side comparison"]
    }
  ];

  const testimonials = [
    {
      name: "Priya Nair",
      role: "Software Engineer",
      score: 91,
      quote: "I applied to 47 jobs with a 2% response rate. After using ResumeAI to optimize for each JD, my response rate jumped to 28% in two weeks. The keyword gap tool is insane.",
      company: "Hired at Stripe",
      initials: "PN"
    },
    {
      name: "DeShawn Carter",
      role: "Product Manager",
      score: 88,
      quote: "The ATS check caught that my resume was using tables — which most ATS systems completely mangle. Fixed it in 10 minutes. Got my first callback the next day.",
      company: "Hired at Airbnb",
      initials: "DC"
    },
    {
      name: "Mei-Ling Zhou",
      role: "Data Analyst",
      score: 87,
      quote: "The section-by-section scores told me my Skills section was at 54% while my Experience was 89%. I rewrote Skills, got my overall score to 87, and started getting interviews at FAANG companies.",
      company: "Hired at Netflix",
      initials: "MZ"
    },
    {
      name: "Aleksei Volkov",
      role: "DevOps Engineer",
      score: 93,
      quote: "As a non-native English speaker I was worried my resume phrasing was hurting me. The rewrite suggestions were specific and professional. Worth every cent of the Pro plan.",
      company: "Hired at HashiCorp",
      initials: "AV"
    }
  ];

  const faqs = [
    {
      q: "What file formats does ResumeAI accept?",
      a: "ResumeAI accepts PDF and DOCX files up to 5MB. For best results, upload a PDF — it preserves formatting and is the format most ATS systems prefer."
    },
    {
      q: "How does the free tier work exactly?",
      a: "You get 3 complete resume scans per day for free. No credit card is required to sign up. If you need more scans, you can upgrade to our Pro tier."
    },
    {
      q: "Is my resume data stored securely?",
      a: "Yes, absolute privacy is guaranteed. Your resumes are encrypted at rest and never shared with external recruiters or used to train public LLM models."
    },
    {
      q: "How accurate is the AI scoring?",
      a: "Highly accurate. Our scoring engine matches against strict rules gathered from top corporate recruitment frameworks and common ATS configuration patterns."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
          <span className="text-indigo-600 text-2xl">✦</span> ResumeAI
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition">Features</a>
          <a href="#pricing" className="hover:text-indigo-600 transition">Pricing</a>
          <a href="#faq" className="hover:text-indigo-600 transition">FAQ</a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">
            Sign in
          </a>
          <a href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition shadow-sm shadow-indigo-100">
            Get started free
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 max-w-2xl">
          <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
            AI-Powered Resume Scoring
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Get your resume scored in seconds — <span className="text-indigo-600 block sm:inline">not days</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Upload your resume, paste a job description, and ResumeAI instantly scores your match, flags missing keywords, and tells you exactly what to fix before you apply.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition shadow-lg shadow-indigo-100 text-center">
              Analyze my resume free
            </a>
            <a href="#pricing" className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium px-6 py-3 rounded-xl transition text-center">
              See pricing
            </a>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 font-medium pt-4">
            <span className="flex items-center gap-1.5"><span className="text-emerald-500 font-bold">✓</span> No credit card required</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-500 font-bold">✓</span> ATS compatibility check</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-500 font-bold">✓</span> 3 free reviews/day</span>
          </div>
        </div>

        {/* Dynamic Interactive Hero Widget Box */}
        <div className="lg:col-span-5 bg-white border border-slate-100 shadow-xl rounded-2xl p-6 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Match Score</p>
              <h3 className="font-bold text-lg text-slate-800">Senior Frontend Engineer</h3>
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              ✦ ATS Ready
            </span>
          </div>

          <div className="flex items-center justify-center py-2">
            <div className="relative flex items-center justify-center w-28 h-28 rounded-full border-8 border-slate-100 border-t-indigo-600 border-r-indigo-600">
              <div className="text-center">
                <span className="text-3xl font-extrabold text-slate-800">85</span>
                <p className="text-[10px] text-slate-400 font-medium">out of 100</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Summary', score: 92, color: 'bg-emerald-500' },
              { label: 'Experience', score: 88, color: 'bg-indigo-500' },
              { label: 'Skills Match', score: 74, color: 'bg-amber-500' },
              { label: 'Education', score: 95, color: 'bg-sky-500' },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>{item.label}</span>
                  <span>{item.score}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <hr className="border-slate-100" />

          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Keyword Analysis</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-medium px-2 py-0.5 rounded-md">✓ React</span>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-medium px-2 py-0.5 rounded-md">✓ TypeScript</span>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-medium px-2 py-0.5 rounded-md">✓ Node.js</span>
              <span className="bg-rose-50 text-rose-700 border border-rose-100 text-xs font-medium px-2 py-0.5 rounded-md">✗ AWS</span>
              <span className="bg-amber-50 text-amber-700 border border-amber-100 text-xs font-medium px-2 py-0.5 rounded-md">~ Docker</span>
            </div>
            <div className="flex justify-between items-center pt-2 text-[11px] text-slate-400">
              <span>Analyzed just now</span>
              <a href="/signup" className="text-indigo-600 font-semibold hover:underline">View full report →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Banner / Brand Bar */}
      <div className="bg-white border-y border-slate-100 py-8 text-center">
        <p className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-4">
          Trusted by job seekers at top companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 font-bold text-lg text-slate-300">
          <span className="hover:text-slate-400 transition cursor-default">Google</span>
          <span className="hover:text-slate-400 transition cursor-default">Microsoft</span>
          <span className="hover:text-slate-400 transition cursor-default">Amazon</span>
          <span className="hover:text-slate-400 transition cursor-default">Meta</span>
          <span className="hover:text-slate-400 transition cursor-default">Stripe</span>
          <span className="hover:text-slate-400 transition cursor-default">Airbnb</span>
        </div>
      </div>

      {/* Features Grid Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Features</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything you need to land the interview
            </h2>
            <p className="text-slate-500">
              Stop guessing why your resume isn't getting callbacks. ResumeAI gives you the same tools recruiters use — free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition duration-300">
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{feat.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                  <ul className="space-y-2 pt-2">
                    {feat.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-slate-500 flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">✓</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Toggles & Cards Section */}
      <section id="pricing" className="bg-slate-50 py-20 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Pricing</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Simple, honest pricing
            </h2>
            <p className="text-slate-500">Start free. Upgrade when you need more reviews.</p>
          </div>

          {/* Monthly / Annual Selector */}
          <div className="flex justify-center items-center gap-4 mb-12">
            <button 
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition ${billingPeriod === 'monthly' ? 'bg-white shadow-sm border border-slate-200 text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingPeriod('annual')}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition flex items-center gap-1.5 ${billingPeriod === 'annual' ? 'bg-white shadow-sm border border-slate-200 text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Annual <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-md">-21%</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase">STARTER</h3>
                  <p className="text-xs text-slate-400 mt-1">Perfect for active job seekers doing occasional reviews.</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">$0</span>
                  <span className="text-slate-500 text-sm">/month</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2">✓ 3 resume reviews per day</li>
                  <li className="flex items-center gap-2">✓ ATS compatibility check</li>
                  <li className="flex items-center gap-2">✓ Overall match score</li>
                  <li className="flex items-center gap-2">✓ Basic keyword analysis</li>
                  <li className="flex items-center gap-2">✓ Review history (last 7 days)</li>
                </ul>
              </div>
              <a href="/signup" className="mt-8 block bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-center py-2.5 rounded-xl transition text-sm">
                Get started free
              </a>
            </div>

            {/* Pro Plan */}
            <div className="bg-white border-2 border-indigo-600 rounded-2xl p-8 flex flex-col justify-between shadow-xl relative">
              <span className="absolute -top-3 right-6 bg-indigo-600 text-white text-[10px] font-bold tracking-wide uppercase px-3 py-1 rounded-full">
                Most Popular
              </span>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold tracking-wider text-slate-900 uppercase">PRO</h3>
                  <p className="text-xs text-slate-400 mt-1">For serious job seekers who need unlimited power.</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {billingPeriod === 'monthly' ? '$19' : '$15'}
                  </span>
                  <span className="text-slate-500 text-sm">/month</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2 font-semibold text-slate-900">✓ Unlimited resume reviews</li>
                  <li className="flex items-center gap-2">✓ ATS compatibility check</li>
                  <li className="flex items-center gap-2">✓ Section-by-section scoring</li>
                  <li className="flex items-center gap-2">✓ Advanced keyword analysis</li>
                  <li className="flex items-center gap-2">✓ Full review history</li>
                  <li className="flex items-center gap-2">✓ AI rewrite suggestions</li>
                  <li className="flex items-center gap-2">✓ Priority AI processing</li>
                </ul>
              </div>
              <a href="/signup" className="mt-8 block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-center py-2.5 rounded-xl transition text-sm shadow-md shadow-indigo-100">
                Start Pro free trial
              </a>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-8">All plans include a 7-day money-back guarantee. Cancel anytime.</p>
        </div>
      </section>

      {/* Testimonials / Success Stories */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Success Stories</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Real results from real job seekers
            </h2>
            <p className="text-slate-500">Over 12,400 job seekers have used ResumeAI to land interviews at top companies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
                      {t.initials}
                    </div>
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-md">
                      {t.score} score
                    </span>
                  </div>
                  <p className="text-xs italic text-slate-600 leading-relaxed">“ {t.quote} ”</p>
                </div>
                <div className="pt-4 border-t border-slate-200/60 mt-4">
                  <h4 className="text-sm font-bold text-slate-800">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                  <p className="text-xs text-emerald-600 font-semibold mt-1">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faq" className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">FAQ</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently asked questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-slate-800 text-sm sm:text-base flex justify-between items-center">
                  {faq.q}
                  <span className="text-slate-400 text-xs">▼</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2.5 pt-2.5 border-t border-slate-100">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="font-bold text-lg text-slate-800 flex items-center gap-1.5">
              <span className="text-indigo-600">✦</span> ResumeAI
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              AI-powered resume scoring that helps job seekers land more interviews securely and quickly.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3">Product</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><a href="#features" className="hover:text-indigo-600">Features</a></li>
              <li><a href="#pricing" className="hover:text-indigo-600">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3">Company</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><span className="hover:text-indigo-600 cursor-pointer">About</span></li>
              <li><span className="hover:text-indigo-600 cursor-pointer">Blog</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3">Legal</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><span className="hover:text-indigo-600 cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-indigo-600 cursor-pointer">Terms of Service</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© 2026 ResumeAI, Inc. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Built with ❤️ for job seekers everywhere.</p>
        </div>
      </footer>
    </div>
  );
}