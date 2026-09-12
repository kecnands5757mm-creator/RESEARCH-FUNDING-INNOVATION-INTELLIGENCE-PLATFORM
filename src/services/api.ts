import { 
  UserProfile, Publication, Patent, FundingOpportunity, 
  Researcher, Institution, SavedItem, Notification, SearchHistory 
} from '../types';

const API_BASE = '/api';

// Helper to get auth header
function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('ri_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Request helper
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const authApi = {
  async signup(data: any): Promise<{ user: UserProfile; token: string }> {
    return request<{ user: UserProfile; token: string }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async login(data: any): Promise<{ user: UserProfile; token: string }> {
    return request<{ user: UserProfile; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async getProfile(): Promise<UserProfile> {
    return request<UserProfile>('/auth/profile');
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    return request<UserProfile>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
};

export const publicationsApi = {
  async list(filters: {
    search?: string;
    domain?: string;
    year?: string;
    open_access?: boolean;
    author?: string;
    institution?: string;
    sort?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{
    data: Publication[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        params.append(key, String(val));
      }
    });
    return request(`/publications?${params.toString()}`);
  },

  async get(id: string): Promise<Publication> {
    return request<Publication>(`/publications/${id}`);
  }
};

export const patentsApi = {
  async list(filters: {
    search?: string;
    domain?: string;
    status?: string;
    country?: string;
    assignee?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{
    data: Patent[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        params.append(key, String(val));
      }
    });
    return request(`/patents?${params.toString()}`);
  },

  async get(id: string): Promise<Patent> {
    return request<Patent>(`/patents/${id}`);
  }
};

export const fundingApi = {
  async list(filters: {
    search?: string;
    domain?: string;
    minAmount?: number;
    maxAmount?: number;
    country?: string;
    status?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{
    data: FundingOpportunity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        params.append(key, String(val));
      }
    });
    return request(`/funding?${params.toString()}`);
  },

  async get(id: string): Promise<FundingOpportunity> {
    return request<FundingOpportunity>(`/funding/${id}`);
  }
};

export const researchersApi = {
  async list(filters: {
    search?: string;
    domain?: string;
    institution?: string;
    minHIndex?: number;
    page?: number;
    limit?: number;
  } = {}): Promise<{
    data: Researcher[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        params.append(key, String(val));
      }
    });
    return request(`/researchers?${params.toString()}`);
  },

  async get(id: string): Promise<Researcher> {
    return request<Researcher>(`/researchers/${id}`);
  }
};

export const institutionsApi = {
  async list(filters: {
    search?: string;
    country?: string;
    domain?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{
    data: Institution[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        params.append(key, String(val));
      }
    });
    return request(`/institutions?${params.toString()}`);
  },

  async get(id: string): Promise<Institution> {
    return request<Institution>(`/institutions/${id}`);
  }
};

export const searchApi = {
  async global(q: string): Promise<{
    publications: Publication[];
    patents: Patent[];
    funding: FundingOpportunity[];
    researchers: Researcher[];
    institutions: Institution[];
  }> {
    return request(`/search/global?q=${encodeURIComponent(q)}`);
  },

  async getHistory(): Promise<SearchHistory[]> {
    return request<SearchHistory[]>('/search-history');
  },

  async saveQuery(query: string): Promise<SearchHistory> {
    return request<SearchHistory>('/search-history', {
      method: 'POST',
      body: JSON.stringify({ query })
    });
  }
};

export const savedItemsApi = {
  async list(): Promise<SavedItem[]> {
    return request<SavedItem[]>('/saved');
  },

  async save(item_type: SavedItem['item_type'], item_id: string): Promise<SavedItem> {
    return request<SavedItem>('/saved', {
      method: 'POST',
      body: JSON.stringify({ item_type, item_id })
    });
  },

  async unsave(item_type: SavedItem['item_type'], item_id: string): Promise<{ success: boolean }> {
    return request<{ success: boolean }>('/saved', {
      method: 'DELETE',
      body: JSON.stringify({ item_type, item_id })
    });
  }
};

export const notificationsApi = {
  async list(): Promise<Notification[]> {
    return request<Notification[]>('/notifications');
  },

  async markAsRead(id: string | 'all'): Promise<{ success: boolean }> {
    return request<{ success: boolean }>('/notifications/read', {
      method: 'POST',
      body: JSON.stringify({ id })
    });
  }
};
