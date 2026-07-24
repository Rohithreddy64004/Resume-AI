import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function ResumeSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await api.post("/signup", { email, password });
      setIsLoading(false);
      navigate("/login"); // Redirect to login
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.detail || 'Account creation failed.');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 font-sans antialiased bg-slate-50 text-slate-900">
      
      {/* Left Pane (Same as Login) */}
      <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="flex items-center gap-2 font-bold text-xl relative z-10">
          <span className="text-indigo-400 text-2xl">✦</span> ResumeAI
        </div>
        <div className="space-y-6 max-w-md my-auto relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight">Land your dream job today</h1>
          <p className="text-indigo-200/80 text-sm">Join thousands of job seekers optimizing their careers with AI.</p>
        </div>
      </div>

      {/* Right Pane: Signup Form */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-center items-center p-6 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900">Create your account</h2>
            <p className="text-sm text-slate-500">Free access to ATS scoring in 60 seconds.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-700 text-xs px-4 py-3 rounded-lg font-medium">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Work email</label>
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none bg-slate-50/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Password</label>
              <input
                type="password" required value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none bg-slate-50/50"
              />
            </div>

            <button
              type="submit" disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition text-sm shadow-md flex items-center justify-center gap-2"
            >
              {isLoading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : "Create free account"}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400">
            Already have an account? <a href="/login" className="text-indigo-600 font-bold">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}