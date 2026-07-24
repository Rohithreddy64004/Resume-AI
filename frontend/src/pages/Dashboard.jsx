import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();

  // Input & Result State
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // User & Usage State
  const [user, setUser] = useState({ email: "", name: "", plan: "FREE" });
  const [usage, setUsage] = useState({ used: 0, limit: 3 });
  const [notification, setNotification] = useState("");

  // 1. Check for Stripe Payment Success in URL Query Params
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("payment") === "success") {
      setNotification("🎉 Payment successful! Your account has been upgraded to PRO.");
      // Clean up URL query parameters without reloading
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (query.get("payment") === "cancelled") {
      setNotification("⚠️ Payment was cancelled. Your plan remains unchanged.");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // 2. Fetch User Profile and Usage Stats on Load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/users/me");
        setUser({
          email: response.data.email,
          name: response.data.name || response.data.email.split("@")[0],
          plan: (response.data.plan || "FREE").toUpperCase(),
        });
        setUsage({
          used: response.data.reviews_used || 0,
          limit: 3,
        });
      } catch (error) {
        console.error("Session fetch failed:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };
    fetchUserData();
  }, [navigate]);

  // 3. Handle Stripe Upgrade Redirection
  const handleUpgrade = async () => {
    try {
      const response = await api.post("/create-checkout-session");
      if (response.data.url) {
        window.location.href = response.data.url; // Redirect to Stripe Hosted Checkout
      } else {
        alert("Failed to create Stripe checkout session.");
      }
    } catch (error) {
      alert("Error initiating checkout. Please check your Stripe keys in backend.");
    }
  };

  // 4. Handle Sign Out
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 5. Core Feature: Analyze Resume with AI
  async function analyzeResume() {
    if (!file || !jobDescription.trim()) {
      alert("Please upload a PDF resume and paste a job description.");
      return;
    }

    // Client-side Gating Check
    if (user.plan === "FREE" && usage.used >= usage.limit) {
      alert("Daily limit reached! Please upgrade to Pro for unlimited scans.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);
      // NOTE: Do NOT manually set Content-Type header; browser must auto-set multipart boundary
      const response = await api.post("/analyze", formData);
      setResult(response.data);

      // Increment usage count locally for instant UI update
      setUsage((prev) => ({ ...prev, used: prev.used + 1 }));
    } catch (error) {
      console.error("Analysis Error:", error);
      const msg =
        error.response?.data?.detail ||
        "Analysis failed. Please make sure the uploaded file is a valid text-based PDF.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  }

  // Helper to render feedback cleanly whether AI returns Array or String
  const renderFeedback = (data) => {
    if (!data) return "No specific details provided.";
    if (Array.isArray(data)) return data.join("\n\n• ");
    return data;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex">
      {/* Sidebar Workspace */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-6 sticky top-0 h-screen shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-800">
            <span className="text-indigo-600 text-2xl">✦</span> ResumeAI
          </div>

          {/* Plan Status Widget */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase mb-2 tracking-widest">
              <span>Current Plan</span>
              <span
                className={`px-2 py-0.5 rounded-full ${
                  user.plan === "PRO"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-indigo-100 text-indigo-700"
                }`}
              >
                {user.plan}
              </span>
            </div>

            <p className="text-xs text-slate-600 font-semibold mb-2">
              {user.plan === "PRO"
                ? "Unlimited scans unlocked"
                : `${usage.used} of ${usage.limit} daily reviews used`}
            </p>

            {user.plan === "FREE" && (
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-700"
                  style={{
                    width: `${Math.min((usage.used / usage.limit) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <nav className="space-y-1 text-sm font-medium text-slate-500">
            <button
              onClick={() => {
                setResult(null);
                setFile(null);
                setJobDescription("");
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 transition font-bold"
            >
              <span>✦</span> New Review
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition text-left">
              <span>🕒</span> History
            </button>
          </nav>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <div className="px-2 mb-3">
            <p className="font-bold text-slate-800 text-sm truncate">{user.name}</p>
            <p className="text-slate-400 text-[11px] truncate">{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-2 text-xs font-bold text-rose-500 hover:text-rose-600 transition"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:block">
            Resume Optimization Dashboard
          </div>

          {user.plan === "FREE" && (
            <button
              onClick={handleUpgrade}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-indigo-100 flex items-center gap-2"
            >
              Upgrade to Pro ⭐
            </button>
          )}
        </header>

        <div className="p-6 md:p-10 max-w-5xl w-full mx-auto space-y-8">
          {/* Notification Banner */}
          {notification && (
            <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 p-4 rounded-2xl text-sm font-semibold flex justify-between items-center">
              <span>{notification}</span>
              <button
                onClick={() => setNotification("")}
                className="text-indigo-400 hover:text-indigo-600 font-bold"
              >
                ✕
              </button>
            </div>
          )}

          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              AI Resume Match Analysis
            </h2>
            <p className="text-slate-500 mt-1">
              Upload your target PDF resume and job description to get ATS scoring and skill gap insights.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-[2rem] p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* File Upload Input */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  1. Your Resume (PDF Only)
                </label>
                <div className="relative border-2 border-dashed border-slate-200 hover:border-indigo-600 bg-slate-50/50 rounded-2xl transition flex flex-col items-center justify-center p-6 h-52 cursor-pointer group">
                  <input
                    type="file"
                    accept=".pdf"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-3 text-indigo-600 shadow-sm group-hover:scale-110 transition duration-300">
                    {file ? "✓" : "↑"}
                  </div>
                  <p className="text-sm font-bold text-slate-700 text-center truncate max-w-[200px]">
                    {file ? file.name : "Click or Drop PDF Resume here"}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 uppercase font-semibold">
                    Max size 5MB
                  </p>
                </div>
              </div>

              {/* Job Description Textarea */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  2. Target Job Description
                </label>
                <textarea
                  placeholder="Paste the target job description requirements here..."
                  className="w-full h-52 px-4 py-4 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none bg-slate-50/50 resize-none transition duration-300"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={analyzeResume}
                disabled={loading || !file || !jobDescription.trim()}
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold px-12 py-4 rounded-2xl transition shadow-xl shadow-indigo-200 flex items-center justify-center gap-3 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Evaluating Resume with RAG AI...
                  </>
                ) : (
                  "Analyze Match Score →"
                )}
              </button>
            </div>
          </div>

          {/* Results Display Section */}
          {result && (
            <div className="bg-white border-2 border-indigo-100 shadow-2xl rounded-[2rem] p-8 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">ATS Assessment Report</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                    Powered by Groq LLM & TF-IDF Vector Search
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-black text-indigo-600">
                    {result.score != null ? result.score : 0}%
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                    Overall Match Rating
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Strengths Card */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-600 uppercase tracking-wider">
                    <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold">
                      ✓
                    </span>
                    Key Profile Strengths
                  </h4>
                  <div className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-5 rounded-3xl border border-slate-100 whitespace-pre-line shadow-inner">
                    {renderFeedback(result.strengths)}
                  </div>
                </div>

                {/* Improvements Card */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-amber-600 uppercase tracking-wider">
                    <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center font-bold">
                      !
                    </span>
                    Recommended Improvements
                  </h4>
                  <div className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-5 rounded-3xl border border-slate-100 whitespace-pre-line shadow-inner">
                    {renderFeedback(result.improvements)}
                  </div>
                </div>
              </div>

              {/* Summary / Final Verdict */}
              {result.summary && (
                <div className="bg-indigo-50/60 p-6 rounded-3xl border border-indigo-100">
                  <h4 className="text-[10px] font-bold text-indigo-500 uppercase mb-2 tracking-widest">
                    Executive Summary
                  </h4>
                  <p className="text-sm text-indigo-950 font-medium leading-relaxed">
                    {result.summary}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Upgrade Banner for Free Users */}
          {user.plan === "FREE" && !result && (
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
              <div className="relative z-10 max-w-md">
                <h3 className="text-2xl font-bold">Unlock Unlimited Evaluations 🚀</h3>
                <p className="text-slate-400 mt-2 text-sm">
                  Upgrade to Pro to remove daily scan limits, unlock deeper keyword gap extraction, and save complete review histories.
                </p>
              </div>
              <button
                onClick={handleUpgrade}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-bold transition relative z-10 whitespace-nowrap shadow-xl shadow-indigo-500/20 active:scale-95"
              >
                Upgrade to Pro ($19/mo)
              </button>
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[120px] rounded-full"></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;