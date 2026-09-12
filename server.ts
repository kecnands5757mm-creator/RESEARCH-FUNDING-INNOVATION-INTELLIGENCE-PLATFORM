import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

// Since we use ES Modules or TSX, let's derive __dirname if necessary
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Persistent database file paths
const STORAGE_FILE = path.join(process.cwd(), 'storage.json');

// Initialize local database storage
interface LocalStorage {
  users: Array<{
    id: string;
    full_name: string;
    email: string;
    passwordHash: string; // Plain/simple hash for mock auth
    institution: string;
    role: string;
    bio: string;
    avatar_url: string;
    created_at: string;
    research_interests: string[];
  }>;
  saved_items: Array<{
    id: string;
    user_id: string;
    item_type: string;
    item_id: string;
    created_at: string;
  }>;
  notifications: Array<{
    id: string;
    user_id: string;
    title: string;
    content: string;
    type: string;
    read: boolean;
    created_at: string;
    link: string;
  }>;
  search_history: Array<{
    id: string;
    user_id: string;
    query: string;
    created_at: string;
  }>;
}

// Default storage configuration
const defaultStorage: LocalStorage = {
  users: [
    {
      id: 'user-default',
      full_name: 'Dr. Alex Morgan',
      email: 'user@example.com',
      passwordHash: 'password123', // Demo credentials
      institution: 'Stanford University',
      role: 'Principal Researcher',
      bio: 'Innovation analyst and quantum systems researcher exploring computational physics, bio-interfaces, and deep-tech funding grids.',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format',
      created_at: new Date().toISOString(),
      research_interests: ['Quantum Computing', 'Artificial Intelligence', 'Biotechnology & Gene Editing']
    }
  ],
  saved_items: [
    {
      id: 'saved-1',
      user_id: 'user-default',
      item_type: 'publication',
      item_id: 'pub-1',
      created_at: new Date().toISOString()
    },
    {
      id: 'saved-2',
      user_id: 'user-default',
      item_type: 'funding',
      item_id: 'fund-2',
      created_at: new Date().toISOString()
    }
  ],
  notifications: [
    {
      id: 'notif-1',
      user_id: 'user-default',
      title: 'Approaching Grant Deadline',
      content: 'The "Therapeutics Innovation Grants for Neurological Degeneration" ($8.0M) deadline is approaching on 2026-09-28.',
      type: 'deadline',
      read: false,
      created_at: new Date().toISOString(),
      link: '/funding/fund-3'
    },
    {
      id: 'notif-2',
      user_id: 'user-default',
      title: 'New Publication in Saved Topic',
      content: 'Dr. Evelyn Carter and Dr. Marcus Vance published "Attention-Based Brain Wave Extraction via Distributed Transformer Networks" under Artificial Intelligence.',
      type: 'publication',
      read: false,
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      link: '/publications/pub-1'
    },
    {
      id: 'notif-3',
      user_id: 'user-default',
      title: 'New High-Value Grant Opportunity',
      content: 'European Research Council announced "Horizon Europe Quantum Computing Scaleup Initiative" with €25.0M funding amount.',
      type: 'funding',
      read: true,
      created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      link: '/funding/fund-2'
    }
  ],
  search_history: [
    {
      id: 'sh-1',
      user_id: 'user-default',
      query: 'Quantum qubits',
      created_at: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
      id: 'sh-2',
      user_id: 'user-default',
      query: 'CRISPR Gene Editing',
      created_at: new Date(Date.now() - 3600000 * 12).toISOString()
    }
  ]
};

function readStorage(): LocalStorage {
  try {
    if (!fs.existsSync(STORAGE_FILE)) {
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(defaultStorage, null, 2), 'utf-8');
      return defaultStorage;
    }
    const data = fs.readFileSync(STORAGE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading storage, reverting to in-memory defaults:', err);
    return defaultStorage;
  }
}

function writeStorage(store: LocalStorage) {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing storage:', err);
  }
}

// Dynamically import seed data to handle ESM/CJS compatibility in tsx
import { PUBLICATIONS, PATENTS, FUNDING_OPPORTUNITIES, RESEARCHERS, INSTITUTIONS } from './src/data';

// Auth middleware to simple-verify mock JWT token
function getUserIdFromHeader(req: express.Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7);
  // In our simplified auth, the token is simply the userId itself
  return token;
}

// API ENDPOINTS

// 1. AUTH
app.post('/api/auth/signup', (req, res) => {
  const { email, password, full_name, institution, role } = req.body;
  if (!email || !password || !full_name) {
    return res.status(400).json({ error: 'Missing required signup fields' });
  }

  const db = readStorage();
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  const newUser = {
    id: 'user-' + Math.random().toString(36).substring(2, 11),
    full_name,
    email,
    passwordHash: password, // Keep plain-text/simple for mock database validation
    institution: institution || 'Independent Researcher',
    role: role || 'Researcher',
    bio: '',
    avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(full_name)}`,
    created_at: new Date().toISOString(),
    research_interests: []
  };

  db.users.push(newUser);
  writeStorage(db);

  // Return user details + session token (which is the user ID)
  const { passwordHash, ...userResponse } = newUser;
  res.status(201).json({ user: userResponse, token: newUser.id });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  const db = readStorage();
  const user = db.users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const { passwordHash, ...userResponse } = user;
  res.json({ user: userResponse, token: user.id });
});

app.get('/api/auth/profile', (req, res) => {
  const userId = getUserIdFromHeader(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const db = readStorage();
  const user = db.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User profile not found' });
  }

  const { passwordHash, ...userResponse } = user;
  res.json(userResponse);
});

app.put('/api/auth/profile', (req, res) => {
  const userId = getUserIdFromHeader(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { full_name, institution, role, bio, avatar_url, research_interests } = req.body;

  const db = readStorage();
  const userIdx = db.users.findIndex(u => u.id === userId);
  if (userIdx === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  db.users[userIdx] = {
    ...db.users[userIdx],
    full_name: full_name || db.users[userIdx].full_name,
    institution: institution || db.users[userIdx].institution,
    role: role || db.users[userIdx].role,
    bio: bio !== undefined ? bio : db.users[userIdx].bio,
    avatar_url: avatar_url || db.users[userIdx].avatar_url,
    research_interests: research_interests || db.users[userIdx].research_interests
  };

  writeStorage(db);

  const { passwordHash, ...userResponse } = db.users[userIdx];
  res.json(userResponse);
});

// 2. SAVED ITEMS (RLS Simulation)
app.get('/api/saved', (req, res) => {
  const userId = getUserIdFromHeader(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const db = readStorage();
  const saved = db.saved_items.filter(item => item.user_id === userId);
  res.json(saved);
});

app.post('/api/saved', (req, res) => {
  const userId = getUserIdFromHeader(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { item_type, item_id } = req.body;
  if (!item_type || !item_id) {
    return res.status(400).json({ error: 'Missing item_type or item_id' });
  }

  const db = readStorage();
  // Prevent duplicate saves
  const exists = db.saved_items.some(
    item => item.user_id === userId && item.item_type === item_type && item.item_id === item_id
  );

  if (exists) {
    return res.json({ message: 'Item already saved' });
  }

  const newItem = {
    id: 'save-' + Math.random().toString(36).substring(2, 11),
    user_id: userId,
    item_type,
    item_id,
    created_at: new Date().toISOString()
  };

  db.saved_items.push(newItem);
  writeStorage(db);

  res.status(201).json(newItem);
});

app.delete('/api/saved', (req, res) => {
  const userId = getUserIdFromHeader(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { item_type, item_id } = req.body;
  if (!item_type || !item_id) {
    return res.status(400).json({ error: 'Missing item_type or item_id' });
  }

  const db = readStorage();
  const lengthBefore = db.saved_items.length;
  db.saved_items = db.saved_items.filter(
    item => !(item.user_id === userId && item.item_type === item_type && item.item_id === item_id)
  );

  writeStorage(db);

  res.json({ success: db.saved_items.length < lengthBefore });
});

// 3. NOTIFICATIONS
app.get('/api/notifications', (req, res) => {
  const userId = getUserIdFromHeader(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const db = readStorage();
  const notifs = db.notifications.filter(n => n.user_id === userId);
  res.json(notifs);
});

app.post('/api/notifications/read', (req, res) => {
  const userId = getUserIdFromHeader(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.body;
  const db = readStorage();

  db.notifications = db.notifications.map(n => {
    if (n.user_id === userId && (id === 'all' || n.id === id)) {
      return { ...n, read: true };
    }
    return n;
  });

  writeStorage(db);
  res.json({ success: true });
});

// 4. SEARCH HISTORY
app.get('/api/search-history', (req, res) => {
  const userId = getUserIdFromHeader(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const db = readStorage();
  const history = db.search_history
    .filter(h => h.user_id === userId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  res.json(history.slice(0, 10)); // Top 10 searches
});

app.post('/api/search-history', (req, res) => {
  const userId = getUserIdFromHeader(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { query } = req.body;
  if (!query || !query.trim()) {
    return res.status(400).json({ error: 'Query is empty' });
  }

  const db = readStorage();
  // Avoid duplicate adjacent searches
  const cleanQuery = query.trim();
  db.search_history = db.search_history.filter(h => !(h.user_id === userId && h.query.toLowerCase() === cleanQuery.toLowerCase()));

  const newHist = {
    id: 'sh-' + Math.random().toString(36).substring(2, 11),
    user_id: userId,
    query: cleanQuery,
    created_at: new Date().toISOString()
  };

  db.search_history.push(newHist);
  writeStorage(db);
  res.status(201).json(newHist);
});

// 5. PUBLICATIONS
app.get('/api/publications', (req, res) => {
  const { search, domain, year, open_access, author, institution, sort, page = '1', limit = '10' } = req.query;
  let list = [...PUBLICATIONS];

  if (search) {
    const q = (search as string).toLowerCase();
    list = list.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.abstract.toLowerCase().includes(q) ||
      p.keywords.some(k => k.toLowerCase().includes(q))
    );
  }

  if (domain) {
    list = list.filter(p => p.research_domain.toLowerCase() === (domain as string).toLowerCase());
  }

  if (year) {
    list = list.filter(p => p.publication_year === parseInt(year as string));
  }

  if (open_access === 'true') {
    list = list.filter(p => p.open_access === true);
  }

  if (author) {
    const aut = (author as string).toLowerCase();
    list = list.filter(p => p.authors.some(a => a.toLowerCase().includes(aut)));
  }

  if (institution) {
    list = list.filter(p => p.institution_id === institution as string);
  }

  // Sorting
  if (sort === 'citations') {
    list.sort((a, b) => b.citation_count - a.citation_count);
  } else if (sort === 'newest') {
    list.sort((a, b) => b.publication_year - a.publication_year || new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime());
  } else if (sort === 'relevance') {
    // Basic search relevance
    list.sort((a, b) => b.citation_count - a.citation_count);
  }

  // Pagination
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const startIdx = (pageNum - 1) * limitNum;
  const paginatedList = list.slice(startIdx, startIdx + limitNum);

  res.json({
    data: paginatedList,
    total: list.length,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(list.length / limitNum)
  });
});

app.get('/api/publications/:id', (req, res) => {
  const pub = PUBLICATIONS.find(p => p.id === req.params.id);
  if (!pub) {
    return res.status(404).json({ error: 'Publication not found' });
  }
  res.json(pub);
});

// 6. PATENTS
app.get('/api/patents', (req, res) => {
  const { search, domain, status, country, assignee, page = '1', limit = '10' } = req.query;
  let list = [...PATENTS];

  if (search) {
    const q = (search as string).toLowerCase();
    list = list.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.patent_number.toLowerCase().includes(q) ||
      p.abstract.toLowerCase().includes(q) ||
      p.inventors.some(i => i.toLowerCase().includes(q))
    );
  }

  if (domain) {
    list = list.filter(p => p.technology_domain.toLowerCase() === (domain as string).toLowerCase());
  }

  if (status) {
    list = list.filter(p => p.status.toLowerCase() === (status as string).toLowerCase());
  }

  if (country) {
    list = list.filter(p => p.country.toLowerCase() === (country as string).toLowerCase());
  }

  if (assignee) {
    list = list.filter(p => p.assignee_id === assignee as string);
  }

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const startIdx = (pageNum - 1) * limitNum;
  const paginatedList = list.slice(startIdx, startIdx + limitNum);

  res.json({
    data: paginatedList,
    total: list.length,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(list.length / limitNum)
  });
});

app.get('/api/patents/:id', (req, res) => {
  const patent = PATENTS.find(p => p.id === req.params.id);
  if (!patent) {
    return res.status(404).json({ error: 'Patent not found' });
  }
  res.json(patent);
});

// 7. FUNDING
app.get('/api/funding', (req, res) => {
  const { search, domain, minAmount, maxAmount, country, status, page = '1', limit = '10' } = req.query;
  let list = [...FUNDING_OPPORTUNITIES];

  if (search) {
    const q = (search as string).toLowerCase();
    list = list.filter(f => 
      f.title.toLowerCase().includes(q) || 
      f.organization.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q)
    );
  }

  if (domain) {
    list = list.filter(f => f.research_domain.toLowerCase() === (domain as string).toLowerCase());
  }

  if (status) {
    list = list.filter(f => f.status.toLowerCase() === (status as string).toLowerCase());
  }

  if (country) {
    list = list.filter(f => f.country_region.toLowerCase() === (country as string).toLowerCase());
  }

  if (minAmount) {
    list = list.filter(f => f.amount >= parseInt(minAmount as string));
  }

  if (maxAmount) {
    list = list.filter(f => f.amount <= parseInt(maxAmount as string));
  }

  // Sort by deadline ascending
  list.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const startIdx = (pageNum - 1) * limitNum;
  const paginatedList = list.slice(startIdx, startIdx + limitNum);

  res.json({
    data: paginatedList,
    total: list.length,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(list.length / limitNum)
  });
});

app.get('/api/funding/:id', (req, res) => {
  const fund = FUNDING_OPPORTUNITIES.find(f => f.id === req.params.id);
  if (!fund) {
    return res.status(404).json({ error: 'Funding opportunity not found' });
  }
  res.json(fund);
});

// 8. RESEARCHERS
app.get('/api/researchers', (req, res) => {
  const { search, domain, institution, page = '1', limit = '10' } = req.query;
  let list = [...RESEARCHERS];

  if (search) {
    const q = (search as string).toLowerCase();
    list = list.filter(r => 
      r.name.toLowerCase().includes(q) || 
      r.bio.toLowerCase().includes(q) ||
      r.research_domains.some(d => d.toLowerCase().includes(q))
    );
  }

  if (domain) {
    list = list.filter(r => r.research_domains.some(d => d.toLowerCase() === (domain as string).toLowerCase()));
  }

  if (institution) {
    list = list.filter(r => r.institution_id === institution as string);
  }

  list.sort((a, b) => b.citation_count - a.citation_count); // Sort by citation impact

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const startIdx = (pageNum - 1) * limitNum;
  const paginatedList = list.slice(startIdx, startIdx + limitNum);

  res.json({
    data: paginatedList,
    total: list.length,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(list.length / limitNum)
  });
});

app.get('/api/researchers/:id', (req, res) => {
  const resr = RESEARCHERS.find(r => r.id === req.params.id);
  if (!resr) {
    return res.status(404).json({ error: 'Researcher not found' });
  }
  res.json(resr);
});

// 9. INSTITUTIONS
app.get('/api/institutions', (req, res) => {
  const { search, country, page = '1', limit = '10' } = req.query;
  let list = [...INSTITUTIONS];

  if (search) {
    const q = (search as string).toLowerCase();
    list = list.filter(i => 
      i.name.toLowerCase().includes(q) || 
      i.description.toLowerCase().includes(q)
    );
  }

  if (country) {
    list = list.filter(i => i.country.toLowerCase() === (country as string).toLowerCase());
  }

  list.sort((a, b) => b.publication_count - a.publication_count);

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const startIdx = (pageNum - 1) * limitNum;
  const paginatedList = list.slice(startIdx, startIdx + limitNum);

  res.json({
    data: paginatedList,
    total: list.length,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(list.length / limitNum)
  });
});

app.get('/api/institutions/:id', (req, res) => {
  const inst = INSTITUTIONS.find(i => i.id === req.params.id);
  if (!inst) {
    return res.status(404).json({ error: 'Institution not found' });
  }
  res.json(inst);
});

// 10. GLOBAL GLOBAL SEARCH
app.get('/api/search/global', (req, res) => {
  const { q } = req.query;
  if (!q || !(q as string).trim()) {
    return res.json({ publications: [], patents: [], funding: [], researchers: [] });
  }

  const query = (q as string).toLowerCase();

  const matchedPubs = PUBLICATIONS.filter(p => p.title.toLowerCase().includes(query) || p.abstract_excerpt.toLowerCase().includes(query)).slice(0, 5);
  const matchedPatents = PATENTS.filter(p => p.title.toLowerCase().includes(query) || p.patent_number.toLowerCase().includes(query)).slice(0, 5);
  const matchedFunding = FUNDING_OPPORTUNITIES.filter(f => f.title.toLowerCase().includes(query) || f.organization.toLowerCase().includes(query)).slice(0, 5);
  const matchedResearchers = RESEARCHERS.filter(r => r.name.toLowerCase().includes(query) || r.research_domains.some(d => d.toLowerCase().includes(query))).slice(0, 5);
  const matchedInstitutions = INSTITUTIONS.filter(i => i.name.toLowerCase().includes(query)).slice(0, 5);

  res.json({
    publications: matchedPubs,
    patents: matchedPatents,
    funding: matchedFunding,
    researchers: matchedResearchers,
    institutions: matchedInstitutions
  });
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // For Express 4 and 5 SPA handling, fallback to index.html
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next();
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
