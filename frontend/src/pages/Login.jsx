import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Import your axios instance

export default function ResumeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post("/login", { email, password });
      
      // SAVE THE REAL TOKEN
      localStorage.setItem("token", response.data.access_token);
      
      setIsLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.detail || 'Invalid email or password.');
    }
  };

  const handleDemoLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123'); // Ensure your backend has this user with this password
    // We call handleSubmit manually after a tiny delay so the state updates
    setTimeout(() => document.getElementById('login-btn').click(), 100);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 font-sans antialiased bg-slate-50 text-slate-900">
      
      {/* Left Pane: DESIGN REMAINS SAME */}
      <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-90 h-90 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="flex items-center gap-2 font-bold text-xl tracking-tight relative z-10">
          <span className="text-indigo-400 text-2xl">✦</span> ResumeAI
        </div>

        <div className="space-y-6 max-w-md my-auto relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
            Land your dream job with a resume that actually gets read
          </h1>
          <p className="text-indigo-200/80 leading-relaxed text-sm">
            Join 12,400+ job seekers who use ResumeAI to score, optimize, and perfect their resumes before applying.
          </p>

          <ul className="space-y-3 pt-4 text-sm font-medium text-indigo-100">
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-700/60 text-indigo-300 text-xs font-bold">✓</span>
              ATS compatibility check in seconds
            </li>
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-700/60 text-indigo-300 text-xs font-bold">✓</span>
              Keyword gap analysis vs any job description
            </li>
          </ul>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-5 space-y-4 relative z-10">
          <div className="flex justify-between items-center text-xs">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">LATEST REVIEW</p>
              <h3 className="font-bold text-white">Senior Product Designer · Figma</h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-white">91</span>
              <span className="text-[10px] text-indigo-300 block">/ 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane: Login Form */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-center items-center p-6 sm:p-12 md:p-20 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back</h2>
            <p className="text-sm text-slate-500">Sign in to access your resume reviews.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-700 text-xs px-4 py-3 rounded-lg font-medium">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase" htmlFor="email">Email address</label>
              <input
                id="email" type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none bg-slate-50/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase" htmlFor="password">Password</label>
              <input
                id="password" type="password" required value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none bg-slate-50/50"
              />
            </div>

            <button
              id="login-btn"
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition text-sm shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : "Sign in to ResumeAI"}
            </button>
          </form>

          {/* Demo Accounts - NOW FUNCTIONAL */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 space-y-3">
             <h4 className="text-[10px] font-bold text-slate-400 uppercase">DEMO ACCOUNTS (Click to Login)</h4>
             <button 
                onClick={() => handleDemoLogin('marcus@jobhunt.dev')}
                className="w-full flex items-center justify-between text-xs bg-white border border-slate-200 p-2 rounded-lg hover:bg-slate-50 transition"
              >
                <div className="text-left">
                  <p className="font-bold text-slate-700">Starter Account</p>
                  <p className="text-slate-400 text-[10px]">marcus@jobhunt.dev</p>
                </div>
                <span className="text-indigo-600 font-bold">Use →</span>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}