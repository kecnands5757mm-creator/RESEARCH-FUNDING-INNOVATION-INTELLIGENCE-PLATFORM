import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, SavedItem, Notification } from '../types';
import { authApi, savedItemsApi, notificationsApi } from '../services/api';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  savedItems: SavedItem[];
  notifications: Notification[];
  toasts: ToastMessage[];
  login: (email: string, password: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
  toggleSave: (itemType: SavedItem['item_type'], itemId: string) => Promise<boolean>;
  isSaved: (itemType: SavedItem['item_type'], itemId: string) => boolean;
  markNotificationRead: (id: string | 'all') => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('ri_token'));
  const [loading, setLoading] = useState<boolean>(true);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sleek custom toast system
  const addToast = useCallback((type: ToastMessage['type'], title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500); // Auto dismiss after 4.5s
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Fetch saved and notifications
  const refreshUserData = useCallback(async () => {
    if (!localStorage.getItem('ri_token')) return;
    try {
      const [saved, notifs] = await Promise.all([
        savedItemsApi.list(),
        notificationsApi.list()
      ]);
      setSavedItems(saved);
      setNotifications(notifs);
    } catch (err) {
      console.error('Error refreshing secure user data:', err);
    }
  }, []);

  // Restore session
  useEffect(() => {
    async function restoreSession() {
      const savedToken = localStorage.getItem('ri_token');
      if (savedToken) {
        try {
          const profile = await authApi.getProfile();
          setUser(profile);
          setToken(savedToken);
          await refreshUserData();
        } catch (err) {
          console.error('Session restore failed:', err);
          // Token is invalid/expired, clean it
          localStorage.removeItem('ri_token');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    }
    restoreSession();
  }, [refreshUserData]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      localStorage.setItem('ri_token', res.token);
      setToken(res.token);
      setUser(res.user);
      addToast('success', 'Welcome Back!', `Successfully logged in as ${res.user.full_name}`);
      // Refresh user data (saved, notifications)
      const [saved, notifs] = await Promise.all([
        savedItemsApi.list(),
        notificationsApi.list()
      ]);
      setSavedItems(saved);
      setNotifications(notifs);
    } catch (err: any) {
      addToast('error', 'Login Failed', err.message || 'Check credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: any) => {
    setLoading(true);
    try {
      const res = await authApi.signup(data);
      localStorage.setItem('ri_token', res.token);
      setToken(res.token);
      setUser(res.user);
      addToast('success', 'Account Created', `Welcome to Research Intelligence, ${res.user.full_name}!`);
      setSavedItems([]);
      setNotifications([]);
    } catch (err: any) {
      addToast('error', 'Signup Failed', err.message || 'Please check your inputs.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('ri_token');
    setToken(null);
    setUser(null);
    setSavedItems([]);
    setNotifications([]);
    addToast('info', 'Logged Out', 'You have been securely signed out.');
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      const updated = await authApi.updateProfile(data);
      setUser(updated);
      addToast('success', 'Profile Updated', 'Your settings have been successfully applied.');
    } catch (err: any) {
      addToast('error', 'Update Failed', err.message || 'Could not update profile.');
      throw err;
    }
  };

  // Saved items handling
  const toggleSave = async (itemType: SavedItem['item_type'], itemId: string): Promise<boolean> => {
    if (!user) {
      addToast('warning', 'Authentication Required', 'Please sign in to save items.');
      return false;
    }
    try {
      const saved = savedItems.some(i => i.item_type === itemType && i.item_id === itemId);
      if (saved) {
        await savedItemsApi.unsave(itemType, itemId);
        setSavedItems(prev => prev.filter(i => !(i.item_type === itemType && i.item_id === itemId)));
        addToast('info', 'Bookmark Removed', 'The item was removed from your saved list.');
        return false;
      } else {
        const item = await savedItemsApi.save(itemType, itemId);
        setSavedItems(prev => [...prev, item]);
        addToast('success', 'Bookmark Saved', 'The item has been added to your saved list.');
        return true;
      }
    } catch (err: any) {
      addToast('error', 'Action Failed', err.message || 'Unable to update bookmark state.');
      return false;
    }
  };

  const isSaved = (itemType: SavedItem['item_type'], itemId: string): boolean => {
    return savedItems.some(i => i.item_type === itemType && i.item_id === itemId);
  };

  const markNotificationRead = async (id: string | 'all') => {
    try {
      await notificationsApi.markAsRead(id);
      setNotifications(prev => prev.map(n => {
        if (id === 'all' || n.id === id) {
          return { ...n, read: true };
        }
        return n;
      }));
    } catch (err) {
      console.error('Error marking notification read:', err);
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      token,
      loading,
      savedItems,
      notifications,
      toasts,
      login,
      signup,
      logout,
      updateProfile,
      addToast,
      removeToast,
      toggleSave,
      isSaved,
      markNotificationRead,
      refreshUserData
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
