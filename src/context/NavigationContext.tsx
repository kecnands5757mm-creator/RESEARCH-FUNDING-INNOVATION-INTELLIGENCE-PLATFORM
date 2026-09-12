import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApp } from './AppContext';

export type PageView = 
  | 'landing' 
  | 'login' 
  | 'signup' 
  | 'forgot-password' 
  | 'dashboard' 
  | 'publications' 
  | 'publication-detail' 
  | 'patents' 
  | 'patent-detail' 
  | 'funding' 
  | 'funding-detail' 
  | 'researchers' 
  | 'researcher-profile' 
  | 'institutions' 
  | 'institution-profile' 
  | 'analytics' 
  | 'saved' 
  | 'notifications' 
  | 'settings';

interface NavigationContextType {
  currentView: PageView;
  viewParams: Record<string, any>;
  navigate: (view: PageView, params?: Record<string, any>) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Hash format parser helper
// e.g. "#/publications/pub-1" -> view: 'publication-detail', params: { id: 'pub-1' }
// e.g. "#/dashboard" -> view: 'dashboard'
function parseHash(hash: string): { view: PageView; params: Record<string, any> } {
  const cleanHash = hash.startsWith('#/') ? hash.substring(2) : hash.replace('#', '');
  if (!cleanHash) {
    return { view: 'landing', params: {} };
  }

  const parts = cleanHash.split('/');
  const mainPart = parts[0];

  switch (mainPart) {
    case 'login': return { view: 'login', params: {} };
    case 'signup': return { view: 'signup', params: {} };
    case 'forgot-password': return { view: 'forgot-password', params: {} };
    case 'dashboard': return { view: 'dashboard', params: {} };
    case 'publications':
      if (parts[1]) {
        return { view: 'publication-detail', params: { id: parts[1] } };
      }
      return { view: 'publications', params: {} };
    case 'patents':
      if (parts[1]) {
        return { view: 'patent-detail', params: { id: parts[1] } };
      }
      return { view: 'patents', params: {} };
    case 'funding':
      if (parts[1]) {
        return { view: 'funding-detail', params: { id: parts[1] } };
      }
      return { view: 'funding', params: {} };
    case 'researchers':
      if (parts[1]) {
        return { view: 'researcher-profile', params: { id: parts[1] } };
      }
      return { view: 'researchers', params: {} };
    case 'institutions':
      if (parts[1]) {
        return { view: 'institution-profile', params: { id: parts[1] } };
      }
      return { view: 'institutions', params: {} };
    case 'analytics': return { view: 'analytics', params: {} };
    case 'saved': return { view: 'saved', params: {} };
    case 'notifications': return { view: 'notifications', params: {} };
    case 'settings': return { view: 'settings', params: {} };
    default:
      return { view: 'landing', params: {} };
  }
}

// Convert view & params back to hash
function formatHash(view: PageView, params: Record<string, any>): string {
  switch (view) {
    case 'landing': return '#/';
    case 'login': return '#/login';
    case 'signup': return '#/signup';
    case 'forgot-password': return '#/forgot-password';
    case 'dashboard': return '#/dashboard';
    case 'publications': return '#/publications';
    case 'publication-detail': return `#/publications/${params.id}`;
    case 'patents': return '#/patents';
    case 'patent-detail': return `#/patents/${params.id}`;
    case 'funding': return '#/funding';
    case 'funding-detail': return `#/funding/${params.id}`;
    case 'researchers': return '#/researchers';
    case 'researcher-profile': return `#/researchers/${params.id}`;
    case 'institutions': return '#/institutions';
    case 'institution-profile': return `#/institutions/${params.id}`;
    case 'analytics': return '#/analytics';
    case 'saved': return '#/saved';
    case 'notifications': return '#/notifications';
    case 'settings': return '#/settings';
    default: return '#/';
  }
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useApp();
  const [currentView, setCurrentView] = useState<PageView>('landing');
  const [viewParams, setViewParams] = useState<Record<string, any>>({});
  const [historyStack, setHistoryStack] = useState<Array<{ view: PageView; params: Record<string, any> }>>([]);

  // Sync internal state with browser URL Hash
  useEffect(() => {
    function handleHashChange() {
      const { view, params } = parseHash(window.location.hash);
      
      // Strict Authentication Route Guarding
      const authRequired = ![
        'landing', 'login', 'signup', 'forgot-password'
      ].includes(view);

      if (!loading) {
        if (authRequired && !user) {
          // Redirect unauthenticated users to landing
          window.location.hash = formatHash('landing', {});
          return;
        }
        if (user && ['login', 'signup', 'forgot-password', 'landing'].includes(view)) {
          // Logged-in users should jump straight to dashboard rather than landing/auth pages
          window.location.hash = formatHash('dashboard', {});
          return;
        }
      }

      setCurrentView(view);
      setViewParams(params);
    }

    handleHashChange(); // Run once at initial load
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [user, loading]);

  const navigate = (view: PageView, params: Record<string, any> = {}) => {
    // Save current to stack before navigating
    setHistoryStack(prev => [...prev, { view: currentView, params: viewParams }]);
    window.location.hash = formatHash(view, params);
  };

  const goBack = () => {
    if (historyStack.length > 0) {
      const previous = historyStack[historyStack.length - 1];
      setHistoryStack(prev => prev.slice(0, -1));
      window.location.hash = formatHash(previous.view, previous.params);
    } else {
      // Default fallback
      navigate(user ? 'dashboard' : 'landing');
    }
  };

  return (
    <NavigationContext.Provider value={{
      currentView,
      viewParams,
      navigate,
      goBack
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
