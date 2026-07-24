import React from 'react';
import api from '../api/axios';

const Billing = ({ userPlan }) => {
  const handleUpgrade = async () => {
    try {
      const response = await api.post("/create-checkout-session");
      if (response.data.url) {
        window.location.href = response.data.url; // Redirect to Stripe
      }
    } catch (error) {
      alert("Billing Error: Could not connect to Stripe.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-black text-slate-900 mb-6">Manage Subscription</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan Card */}
        <div className={`p-8 rounded-3xl border-2 ${userPlan === 'FREE' ? 'border-indigo-600 bg-white' : 'border-slate-100 bg-slate-50 opacity-50'}`}>
          <h3 className="font-bold text-xl mb-2">Starter</h3>
          <p className="text-4xl font-black mb-6">$0 <span className="text-sm text-slate-400">/mo</span></p>
          <ul className="space-y-3 mb-8 text-sm text-slate-600 font-medium">
            <li>✓ 3 Resume scans per day</li>
            <li>✓ Basic keyword matching</li>
          </ul>
          {userPlan === 'FREE' && (
            <span className="block text-center py-3 bg-slate-100 text-slate-400 rounded-xl font-bold uppercase tracking-widest text-xs">Current Plan</span>
          )}
        </div>

        {/* Pro Plan Card */}
        <div className={`p-8 rounded-3xl border-2 ${userPlan === 'PRO' ? 'border-indigo-600 bg-white' : 'border-slate-200 bg-white shadow-xl'}`}>
          <div className="flex justify-between items-start mb-2">
             <h3 className="font-bold text-xl">ResumeAI Pro</h3>
             <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">Popular</span>
          </div>
          <p className="text-4xl font-black mb-6">$19 <span className="text-sm text-slate-400">/mo</span></p>
          <ul className="space-y-3 mb-8 text-sm text-slate-600 font-medium">
            <li>✓ Unlimited Resume scans</li>
            <li>✓ Advanced RAG History matching</li>
            <li>✓ AI Phrase Rewriting</li>
            <li>✓ Priority support</li>
          </ul>
          
          {userPlan === 'PRO' ? (
            <span className="block text-center py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold uppercase tracking-widest text-xs">Active Subscription</span>
          ) : (
            <button 
              onClick={handleUpgrade}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition shadow-lg shadow-indigo-200"
            >
              Upgrade Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Billing;