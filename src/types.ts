export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  institution: string;
  role: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  research_interests?: string[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string[]; // List of author names
  abstract: string;
  abstract_excerpt: string;
  publication_year: number;
  publication_date: string;
  journal: string;
  citation_count: number;
  research_domain: string;
  institution_id: string;
  institution: string;
  open_access: boolean;
  doi: string;
  keywords: string[];
  references: string[]; // Mock related titles or citations
}

export interface Patent {
  id: string;
  title: string;
  patent_number: string;
  abstract: string;
  inventors: string[];
  assignee: string;
  assignee_id: string;
  filing_date: string;
  publication_date: string;
  status: 'Granted' | 'Pending' | 'Expired';
  technology_domain: string;
  country: string;
}

export interface FundingOpportunity {
  id: string;
  title: string;
  organization: string;
  amount: number; // Numeric for sorting / filter
  amount_formatted: string;
  deadline: string;
  research_domain: string;
  eligibility: string;
  country_region: string;
  status: 'Open' | 'Closed' | 'Draft';
  description: string;
  application_process: string;
  official_website: string;
}

export interface Researcher {
  id: string;
  name: string;
  avatar_url: string;
  institution_id: string;
  institution_name: string;
  research_domains: string[];
  publication_count: number;
  citation_count: number;
  h_index: number;
  bio: string;
  trending_topics: string[];
  email: string;
  collaborators: string[]; // Names of collaborators
}

export interface Institution {
  id: string;
  name: string;
  country: string;
  logo_url?: string;
  description: string;
  publication_count: number;
  patent_count: number;
  funding_activity: string; // e.g., "$120M total research budget"
  research_domains: string[];
}

export interface SavedItem {
  id: string;
  user_id: string;
  item_type: 'publication' | 'patent' | 'funding' | 'researcher' | 'institution';
  item_id: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  content: string;
  type: 'funding' | 'publication' | 'patent' | 'researcher' | 'deadline';
  read: boolean;
  created_at: string;
  link: string;
}

export interface SearchHistory {
  id: string;
  user_id: string;
  query: string;
  created_at: string;
}
