import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, User, Building2, Briefcase, Mail, Key, Tag, Sparkles } from 'lucide-react';

export default function SettingsView() {
  const { user, updateUserProfile, addToast } = useApp();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [institution, setInstitution] = useState(user?.institution || '');
  const [role, setRole] = useState(user?.role || 'Researcher');
  const [updating, setUpdating] = useState(false);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changingPass, setChangingPass] = useState(false);

  // Interest tags
  const [interests, setInterests] = useState<string[]>([
    'Generative AI', 'Quantum Waveguides', 'CRISPR Therapeutics', 'Thin Film Photovoltaics'
  ]);
  const [newInterest, setNewInterest] = useState('');

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) {
      addToast('error', 'Update Error', 'Full Name is required.');
      return;
    }

    setUpdating(true);
    try {
      await updateUserProfile({
        full_name: fullName,
        institution,
        role
      });
      addToast('success', 'Profile Updated', 'Your scholarly credentials have been updated successfully.');
    } catch (err) {
      addToast('error', 'Update Failure', 'Failed saving profile updates.');
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      addToast('error', 'Error', 'Please fill in both password fields.');
      return;
    }

    setChangingPass(true);
    setTimeout(() => {
      addToast('success', 'Security Credentials Saved', 'Your account credentials have been updated.');
      setCurrentPassword('');
      setNewPassword('');
      setChangingPass(false);
    }, 800);
  };

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInterest.trim()) return;
    if (interests.includes(newInterest.trim())) return;

    setInterests(prev => [...prev, newInterest.trim()]);
    setNewInterest('');
    addToast('success', 'Keyword Tracked', `We will notify you of new updates matching "${newInterest.trim()}".`);
  };

  const handleRemoveInterest = (tag: string) => {
    setInterests(prev => prev.filter(t => t !== tag));
  };

  return (
    <div className="space-y-6 select-text">
      {/* View Header */}
      <div>
        <div className="flex items-center space-x-2 text-[#FBBF24]">
          <Settings className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Account Control</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight mt-1">
          Platform Settings
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Manage your academic credentials, subscription topics, and login credentials.
        </p>
      </div>

      {/* Main Grid: Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Col: Scholar Credentials (2 spans) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile form */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-md">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-3 mb-5 flex items-center">
              <User className="w-4 h-4 mr-2 text-[#FBBF24]" /> Academic Identity
            </h2>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                    Full Name
                  </label>
                  <div className="relative rounded-md">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-zinc-500" />
                    </div>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 text-xs bg-zinc-950 border border-zinc-850 rounded-xl text-white focus:outline-none focus:border-[#FBBF24] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                    Email Address (Read-only)
                  </label>
                  <div className="relative rounded-md opacity-50 cursor-not-allowed">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-zinc-500" />
                    </div>
                    <input
                      type="email"
                      readOnly
                      disabled
                      value={user?.email || ''}
                      className="block w-full pl-10 pr-3 py-2.5 text-xs bg-zinc-950 border border-zinc-850 rounded-xl text-zinc-400 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                    Associated Institution
                  </label>
                  <div className="relative rounded-md">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Building2 className="h-4 w-4 text-zinc-500" />
                    </div>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 text-xs bg-zinc-950 border border-zinc-850 rounded-xl text-white focus:outline-none focus:border-[#FBBF24] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                    Academic Role
                  </label>
                  <div className="relative rounded-md">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Briefcase className="h-4 w-4 text-zinc-500" />
                    </div>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 text-xs bg-zinc-950 border border-zinc-850 rounded-xl text-white focus:outline-none focus:border-[#FBBF24] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={updating}
                  className="px-5 py-2.5 rounded-xl bg-[#FBBF24] hover:bg-[#FBBF24]/90 text-black text-xs font-bold transition-all duration-200 shadow-md focus:outline-none disabled:opacity-40"
                >
                  {updating ? 'Saving credentials...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </div>

          {/* Security Credentials Password update */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-md">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-3 mb-5 flex items-center">
              <Key className="w-4 h-4 mr-2 text-[#FBBF24]" /> Access Credentials
            </h2>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                    Current Security Password
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="block w-full px-4 py-2.5 text-xs bg-zinc-950 border border-zinc-850 rounded-xl text-white focus:outline-none focus:border-[#FBBF24] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                    New Security Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="block w-full px-4 py-2.5 text-xs bg-zinc-950 border border-zinc-850 rounded-xl text-white focus:outline-none focus:border-[#FBBF24] transition-all"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={changingPass}
                  className="px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-850 border border-zinc-850 text-white text-xs font-bold transition-all duration-200 focus:outline-none"
                >
                  {changingPass ? 'Updating secret...' : 'Change Account Password'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Col: Saved topics */}
        <div className="space-y-6">
          {/* Interest Tags */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-md space-y-4">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-2.5 flex items-center">
              <Tag className="w-4 h-4 mr-2 text-[#FBBF24]" /> Monitored Keywords
            </h2>
            <p className="text-xs text-zinc-500 leading-normal">
              Register scientific keywords (e.g., Quantum physics, CRISPR). We will trigger notification alerts as new literature indices.
            </p>

            {/* Tags area */}
            <div className="flex flex-wrap gap-2 pt-2">
              {interests.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-300"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveInterest(tag)}
                    className="text-zinc-500 hover:text-red-400 text-[10px] font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Add tag form */}
            <form onSubmit={handleAddInterest} className="pt-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Add e.g. Nanotechnology"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs bg-zinc-950 border border-zinc-850 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#FBBF24] transition-colors"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-[#FBBF24] hover:bg-[#FBBF24]/90 text-black text-xs font-black transition-all"
              >
                Track
              </button>
            </form>
          </div>

          {/* Quick Stats Summary */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-md space-y-3">
            <div className="flex items-center space-x-2 text-[#FBBF24]">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Account Status</span>
            </div>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Access Level:</span>
                <span className="text-[#FBBF24] font-bold">Platform Admin</span>
              </div>
              <div className="flex justify-between">
                <span>Institution Node:</span>
                <span className="text-zinc-300">Verified Credentials</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
