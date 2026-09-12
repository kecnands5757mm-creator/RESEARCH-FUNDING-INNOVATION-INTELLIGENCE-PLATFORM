import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigation } from '../context/NavigationContext';
import { Mail, Lock, User, Building2, Briefcase, Eye, EyeOff, AlertCircle } from 'lucide-react';

export function Login() {
  const { login } = useApp();
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please fill in all credentials.');
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
      navigate('dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-center py-12 px-6 lg:px-8 relative selection:bg-[#FBBF24] selection:text-black">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#FBBF24]/5 blur-[100px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div 
          onClick={() => navigate('landing')}
          className="flex items-center justify-center space-x-3 cursor-pointer select-none mb-6"
        >
          <div className="w-9 h-9 rounded-lg bg-[#FBBF24] flex items-center justify-center font-black text-black text-base shadow-lg shadow-[#FBBF24]/10">
            RI
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-white tracking-tight leading-none text-sm">Research</span>
            <span className="text-[10px] text-[#FBBF24] font-medium tracking-widest uppercase">Intelligence</span>
          </div>
        </div>
        <h2 className="text-center text-xl font-bold tracking-tight text-white">
          Sign In To Research Intel
        </h2>
        <p className="mt-1.5 text-center text-xs text-zinc-500">
          Or{' '}
          <button 
            onClick={() => navigate('signup')}
            className="font-semibold text-[#FBBF24] hover:text-[#FBBF24]/80 focus:outline-none"
          >
            create a new research account
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#121212] border border-zinc-800/80 py-8 px-6 shadow-xl rounded-2xl sm:px-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-zinc-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@university.edu"
                  className="block w-full pl-10 pr-3 py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#FBBF24] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wide">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate('forgot-password')}
                  className="text-[10px] font-semibold text-[#FBBF24] hover:text-[#FBBF24]/80 focus:outline-none"
                >
                  Forgot your password?
                </button>
              </div>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-zinc-500" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#FBBF24] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Hint of default credential */}
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-[11px] text-zinc-500">
              <span className="font-bold text-[#FBBF24] block mb-0.5">Demo Account Available:</span>
              <span>Email: <strong className="text-zinc-300 font-medium">user@example.com</strong> • Pass: <strong className="text-zinc-300 font-medium">password123</strong></span>
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex justify-center py-2.5 px-4 rounded-xl border border-transparent bg-[#FBBF24] hover:bg-[#FBBF24]/90 text-black text-xs font-bold transition-all duration-200 shadow-md focus:outline-none disabled:opacity-50"
              >
                {submitting ? 'Authenticating...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function SignUp() {
  const { signup } = useApp();
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [institution, setInstitution] = useState('');
  const [role, setRole] = useState('Researcher');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password || !fullName) {
      setError('Please provide name, email, and password.');
      return;
    }

    setSubmitting(true);
    try {
      await signup({
        email,
        password,
        full_name: fullName,
        institution,
        role
      });
      navigate('dashboard');
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const roleOptions = [
    { label: 'Academic Researcher', value: 'Academic Researcher' },
    { label: 'Postgraduate Student', value: 'Postgraduate Student' },
    { label: 'R&D Director', value: 'R&D Director' },
    { label: 'Innovation Analyst', value: 'Innovation Analyst' },
    { label: 'University Administrator', value: 'University Administrator' }
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-center py-12 px-6 lg:px-8 relative selection:bg-[#FBBF24] selection:text-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#FBBF24]/5 blur-[100px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div 
          onClick={() => navigate('landing')}
          className="flex items-center justify-center space-x-3 cursor-pointer select-none mb-6"
        >
          <div className="w-9 h-9 rounded-lg bg-[#FBBF24] flex items-center justify-center font-black text-black text-base shadow-lg shadow-[#FBBF24]/10">
            RI
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-white tracking-tight leading-none text-sm">Research</span>
            <span className="text-[10px] text-[#FBBF24] font-medium tracking-widest uppercase">Intelligence</span>
          </div>
        </div>
        <h2 className="text-center text-xl font-bold tracking-tight text-white">
          Create Your Research Intel Account
        </h2>
        <p className="mt-1.5 text-center text-xs text-zinc-500">
          Already registered?{' '}
          <button 
            onClick={() => navigate('login')}
            className="font-semibold text-[#FBBF24] hover:text-[#FBBF24]/80 focus:outline-none"
          >
            log in to your profile
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#121212] border border-zinc-800/80 py-8 px-6 shadow-xl rounded-2xl sm:px-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="fullName" className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                Full Name
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-zinc-500" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Dr. Evelyn Carter"
                  className="block w-full pl-10 pr-3 py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#FBBF24] transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-zinc-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.carter@mit.edu"
                  className="block w-full pl-10 pr-3 py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#FBBF24] transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-zinc-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#FBBF24] transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="institution" className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                Institution
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Building2 className="h-4 w-4 text-zinc-500" />
                </div>
                <input
                  id="institution"
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="Massachusetts Institute of Technology (MIT)"
                  className="block w-full pl-10 pr-3 py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#FBBF24] transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                Primary Research Role
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Briefcase className="h-4 w-4 text-zinc-500" />
                </div>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-[#FBBF24] transition-all cursor-pointer appearance-none"
                >
                  {roleOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex justify-center py-2.5 px-4 rounded-xl border border-transparent bg-[#FBBF24] hover:bg-[#FBBF24]/90 text-black text-xs font-bold transition-all duration-200 shadow-md focus:outline-none disabled:opacity-50"
              >
                {submitting ? 'Creating Profile...' : 'Complete Signup'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function ForgotPassword() {
  const { addToast } = useApp();
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate password recovery sending
    setSent(true);
    addToast('success', 'Reset Mail Sent', 'We have dispatched a secure recovery code to your registered inbox.');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-center py-12 px-6 lg:px-8 relative selection:bg-[#FBBF24] selection:text-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#FBBF24]/5 blur-[100px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div 
          onClick={() => navigate('landing')}
          className="flex items-center justify-center space-x-3 cursor-pointer select-none mb-6"
        >
          <div className="w-9 h-9 rounded-lg bg-[#FBBF24] flex items-center justify-center font-black text-black text-base shadow-lg shadow-[#FBBF24]/10">
            RI
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-white tracking-tight leading-none text-sm">Research</span>
            <span className="text-[10px] text-[#FBBF24] font-medium tracking-widest uppercase">Intelligence</span>
          </div>
        </div>
        <h2 className="text-center text-xl font-bold tracking-tight text-white">
          Reset Your Password
        </h2>
        <p className="mt-1.5 text-center text-xs text-zinc-500">
          Enter your registered email below to receive security instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#121212] border border-zinc-800/80 py-8 px-6 shadow-xl rounded-2xl sm:px-10">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="p-3.5 rounded-full bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/20 w-fit mx-auto">
                <Mail className="w-6 h-6 animate-bounce" />
              </div>
              <h3 className="text-sm font-bold text-white">Check Your Inbox</h3>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mx-auto">
                We have sent an authentication link to <strong className="text-zinc-300 font-semibold">{email}</strong>. It will expire in 15 minutes.
              </p>
              <button
                onClick={() => navigate('login')}
                className="text-xs font-bold text-[#FBBF24] hover:text-[#FBBF24]/80 focus:outline-none"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Email Address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-zinc-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.carter@mit.edu"
                    className="block w-full pl-10 pr-3 py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#FBBF24] transition-all"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 rounded-xl border border-transparent bg-[#FBBF24] hover:bg-[#FBBF24]/90 text-black text-xs font-bold transition-all duration-200 shadow-md focus:outline-none"
                >
                  Send Recovery Link
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('login')}
                  className="text-xs font-semibold text-zinc-400 hover:text-white focus:outline-none"
                >
                  Cancel and return to login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
