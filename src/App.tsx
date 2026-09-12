import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import DashboardLayout from './components/DashboardLayout';

// Public views
import Landing from './views/Landing';
import { Login, SignUp, ForgotPassword } from './views/AuthViews';

// Authenticated views
import Dashboard from './views/Dashboard';
import PublicationsView from './views/PublicationsView';
import PublicationDetailView from './views/PublicationDetailView';
import PatentsView from './views/PatentsView';
import PatentDetailView from './views/PatentDetailView';
import FundingView from './views/FundingView';
import FundingDetailView from './views/FundingDetailView';
import ResearchersView from './views/ResearchersView';
import ResearcherProfileView from './views/ResearcherProfileView';
import InstitutionsView from './views/InstitutionsView';
import InstitutionProfileView from './views/InstitutionProfileView';
import AnalyticsView from './views/AnalyticsView';
import SavedView from './views/SavedView';
import NotificationsView from './views/NotificationsView';
import SettingsView from './views/SettingsView';

// Icons for dynamic toast
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`
              p-4 rounded-xl border shadow-xl flex items-start space-x-3 pointer-events-auto bg-[#121212] select-none
              transition-all duration-300 transform translate-y-0 opacity-100 animate-in slide-in-from-bottom-5 duration-200
              ${isSuccess ? 'border-green-500/30' : isError ? 'border-red-500/30' : 'border-zinc-800'}
            `}
          >
            {/* Left icon */}
            {isSuccess ? (
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
            ) : isError ? (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-zinc-400 shrink-0" />
            )}

            {/* Message area */}
            <div className="flex-1 min-w-0 text-left">
              <span className="block text-xs font-bold text-white mb-0.5">{toast.title}</span>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                {toast.message}
              </p>
            </div>

            {/* Right dismiss */}
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-600 hover:text-white transition-colors focus:outline-none"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

function MainAppSwitch() {
  const { currentView } = useNavigation();

  // Route switches
  switch (currentView) {
    // Public non-layout views
    case 'landing':
      return <Landing />;
    case 'login':
      return <Login />;
    case 'signup':
      return <SignUp />;
    case 'forgot-password':
      return <ForgotPassword />;

    // Authenticated layout views
    case 'dashboard':
      return (
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      );
    case 'publications':
      return (
        <DashboardLayout>
          <PublicationsView />
        </DashboardLayout>
      );
    case 'publication-detail':
      return (
        <DashboardLayout>
          <PublicationDetailView />
        </DashboardLayout>
      );
    case 'patents':
      return (
        <DashboardLayout>
          <PatentsView />
        </DashboardLayout>
      );
    case 'patent-detail':
      return (
        <DashboardLayout>
          <PatentDetailView />
        </DashboardLayout>
      );
    case 'funding':
      return (
        <DashboardLayout>
          <FundingView />
        </DashboardLayout>
      );
    case 'funding-detail':
      return (
        <DashboardLayout>
          <FundingDetailView />
        </DashboardLayout>
      );
    case 'researchers':
      return (
        <DashboardLayout>
          <ResearchersView />
        </DashboardLayout>
      );
    case 'researcher-profile':
      return (
        <DashboardLayout>
          <ResearcherProfileView />
        </DashboardLayout>
      );
    case 'institutions':
      return (
        <DashboardLayout>
          <InstitutionsView />
        </DashboardLayout>
      );
    case 'institution-profile':
      return (
        <DashboardLayout>
          <InstitutionProfileView />
        </DashboardLayout>
      );
    case 'analytics':
      return (
        <DashboardLayout>
          <AnalyticsView />
        </DashboardLayout>
      );
    case 'saved':
      return (
        <DashboardLayout>
          <SavedView />
        </DashboardLayout>
      );
    case 'notifications':
      return (
        <DashboardLayout>
          <NotificationsView />
        </DashboardLayout>
      );
    case 'settings':
      return (
        <DashboardLayout>
          <SettingsView />
        </DashboardLayout>
      );

    default:
      return <Landing />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <NavigationProvider>
        <MainAppSwitch />
        <ToastContainer />
      </NavigationProvider>
    </AppProvider>
  );
}
