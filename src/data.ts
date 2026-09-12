import { Publication, Patent, FundingOpportunity, Researcher, Institution } from './types';

export const INSTITUTIONS: Institution[] = [
  {
    id: 'inst-1',
    name: 'Massachusetts Institute of Technology (MIT)',
    country: 'United States',
    logo_url: 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=80&h=80&fit=crop&auto=format',
    description: 'A world-class research university specializing in physical sciences, engineering, and artificial intelligence.',
    publication_count: 14200,
    patent_count: 3120,
    funding_activity: '$820M annual budget',
    research_domains: ['Artificial Intelligence', 'Quantum Computing', 'Materials Science', 'Renewable Energy']
  },
  {
    id: 'inst-2',
    name: 'Stanford University',
    country: 'United States',
    logo_url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=80&h=80&fit=crop&auto=format',
    description: 'Leading global center for entrepreneurship, technology transfer, biotechnology, and computer science.',
    publication_count: 12800,
    patent_count: 2840,
    funding_activity: '$760M annual budget',
    research_domains: ['Artificial Intelligence', 'Biotechnology & Gene Editing', 'Cybersecurity', 'Neuroscience']
  },
  {
    id: 'inst-3',
    name: 'University of Oxford',
    country: 'United Kingdom',
    logo_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=80&h=80&fit=crop&auto=format',
    description: 'Renowned ancient collegiate research institute focusing on vaccinology, history, physics, and medical sciences.',
    publication_count: 15400,
    patent_count: 1450,
    funding_activity: '£680M annual budget',
    research_domains: ['Biotechnology & Gene Editing', 'Neuroscience', 'Quantum Computing', 'Climate Science']
  },
  {
    id: 'inst-4',
    name: 'ETH Zurich',
    country: 'Switzerland',
    logo_url: 'https://images.unsplash.com/photo-1527891751199-7225231a68dd?w=80&h=80&fit=crop&auto=format',
    description: 'Consistently ranked among the top technical institutes, specializing in robotics, physics, and environmental sciences.',
    publication_count: 9800,
    patent_count: 1200,
    funding_activity: 'CHF 610M annual budget',
    research_domains: ['Robotics & Autonomous Systems', 'Quantum Computing', 'Renewable Energy', 'Climate Science']
  },
  {
    id: 'inst-5',
    name: 'Max Planck Institute',
    country: 'Germany',
    logo_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=80&h=80&fit=crop&auto=format',
    description: 'Germany\'s premier basic research organization, dedicated to cutting-edge fundamental research.',
    publication_count: 18500,
    patent_count: 1950,
    funding_activity: '€1.2B total budget',
    research_domains: ['Quantum Computing', 'Biotechnology & Gene Editing', 'Materials Science', 'Nanotechnology']
  },
  {
    id: 'inst-6',
    name: 'University of Tokyo',
    country: 'Japan',
    logo_url: 'https://images.unsplash.com/photo-1562774053-f569d66b5190?w=80&h=80&fit=crop&auto=format',
    description: 'Japan\'s leading national research university, highly recognized for quantum technology, semiconductors, and materials.',
    publication_count: 11200,
    patent_count: 2100,
    funding_activity: '¥85B annual budget',
    research_domains: ['Nanotechnology', 'Quantum Computing', 'Materials Science', 'Robotics & Autonomous Systems']
  },
  {
    id: 'inst-7',
    name: 'University of Cambridge',
    country: 'United Kingdom',
    logo_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=80&h=80&fit=crop&auto=format',
    description: 'Renowned for its historical scientific breakthroughs, now pioneering artificial intelligence and computing.',
    publication_count: 14800,
    patent_count: 1650,
    funding_activity: '£710M annual budget',
    research_domains: ['Artificial Intelligence', 'Biotechnology & Gene Editing', 'Neuroscience', 'Quantum Computing']
  },
  {
    id: 'inst-8',
    name: 'California Institute of Technology (Caltech)',
    country: 'United States',
    logo_url: 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=80&h=80&fit=crop&auto=format',
    description: 'World-renowned science and engineering institute with deep expertise in astronomy, seismology, and nanotechnology.',
    publication_count: 6500,
    patent_count: 1580,
    funding_activity: '$410M annual budget',
    research_domains: ['Space Exploration', 'Quantum Computing', 'Nanotechnology', 'Climate Science']
  },
  {
    id: 'inst-9',
    name: 'National University of Singapore (NUS)',
    country: 'Singapore',
    logo_url: 'https://images.unsplash.com/photo-1562774053-f569d66b5190?w=80&h=80&fit=crop&auto=format',
    description: 'A global university centered in Asia, pioneering in artificial intelligence, cybersecurity, and smart city technology.',
    publication_count: 8900,
    patent_count: 1150,
    funding_activity: 'S$480M annual budget',
    research_domains: ['Cybersecurity', 'Artificial Intelligence', 'Renewable Energy', 'Biotechnology & Gene Editing']
  },
  {
    id: 'inst-10',
    name: 'CERN',
    country: 'Switzerland',
    logo_url: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?w=80&h=80&fit=crop&auto=format',
    description: 'The European Organization for Nuclear Research, operating the largest and most complex scientific instruments in particle physics.',
    publication_count: 16200,
    patent_count: 320,
    funding_activity: 'CHF 1.1B total budget',
    research_domains: ['Quantum Computing', 'Particle Physics', 'Materials Science', 'Supercomputing']
  }
];

export const RESEARCHERS: Researcher[] = [
  {
    id: 'res-1',
    name: 'Dr. Evelyn Carter',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-1',
    institution_name: 'Massachusetts Institute of Technology (MIT)',
    research_domains: ['Artificial Intelligence', 'Neuroscience'],
    publication_count: 142,
    citation_count: 8750,
    h_index: 48,
    bio: 'Dr. Evelyn Carter leads the Neural AI Interface Group at MIT. Her research is at the intersection of deep neural networks and biological brain maps, pioneering cognitive computer models.',
    trending_topics: ['Transformers in EEG', 'Brain-Computer Interfaces', 'Cognitive Modeling'],
    email: 'e.carter@mit.edu',
    collaborators: ['Dr. Marcus Vance', 'Prof. Hiroshi Tanaka']
  },
  {
    id: 'res-2',
    name: 'Dr. Marcus Vance',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-1',
    institution_name: 'Massachusetts Institute of Technology (MIT)',
    research_domains: ['Quantum Computing', 'Materials Science'],
    publication_count: 98,
    citation_count: 5120,
    h_index: 36,
    bio: 'Dr. Marcus Vance focuses on topological qubits and superconducting circuits, striving to design error-corrected cryogenic hardware for scalable quantum computers.',
    trending_topics: ['Topological Qubits', 'Josephson Junctions', 'Quantum Error Correction'],
    email: 'm.vance@mit.edu',
    collaborators: ['Dr. Evelyn Carter', 'Dr. Sarah Jenkins']
  },
  {
    id: 'res-3',
    name: 'Prof. Sarah Jenkins',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-2',
    institution_name: 'Stanford University',
    research_domains: ['Biotechnology & Gene Editing', 'Nanotechnology'],
    publication_count: 184,
    citation_count: 14200,
    h_index: 64,
    bio: 'Prof. Sarah Jenkins is an internationally acclaimed geneticist who co-developed CRISPR-Nano systems. She leads Stanford\'s Therapeutics Innovation Center.',
    trending_topics: ['In Vivo Gene Therapy', 'Lipid Nanoparticles', 'CRISPR Off-Target Analysis'],
    email: 'sjenkins@stanford.edu',
    collaborators: ['Dr. Marcus Vance', 'Dr. Elena Rostova']
  },
  {
    id: 'res-4',
    name: 'Dr. Elena Rostova',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-3',
    institution_name: 'University of Oxford',
    research_domains: ['Biotechnology & Gene Editing', 'Neuroscience'],
    publication_count: 76,
    citation_count: 3420,
    h_index: 28,
    bio: 'Dr. Elena Rostova explores RNA-based delivery mechanisms to bypass the Blood-Brain Barrier (BBB), targeting neural degenerative disorders like ALS.',
    trending_topics: ['RNA Delivery', 'Blood-Brain Barrier', 'ALS Therapeutics'],
    email: 'elena.rostova@ox.ac.uk',
    collaborators: ['Prof. Sarah Jenkins', 'Prof. Alistair MacLeod']
  },
  {
    id: 'res-5',
    name: 'Prof. Alistair MacLeod',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-3',
    institution_name: 'University of Oxford',
    research_domains: ['Climate Science', 'Renewable Energy'],
    publication_count: 220,
    citation_count: 18600,
    h_index: 78,
    bio: 'Prof. Alistair MacLeod is a leading advisor to governments on decarbonization models. His research centers on high-efficiency photovoltaic materials and solar grid integration.',
    trending_topics: ['Perovskite Solar Cells', 'Decarbonization Pathways', 'Grid Energy Storage'],
    email: 'alistair.macleod@ox.ac.uk',
    collaborators: ['Dr. Elena Rostova', 'Dr. Hans-Dieter']
  },
  {
    id: 'res-6',
    name: 'Dr. Hans-Dieter',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-5',
    institution_name: 'Max Planck Institute',
    research_domains: ['Materials Science', 'Nanotechnology'],
    publication_count: 110,
    citation_count: 4200,
    h_index: 34,
    bio: 'Dr. Hans-Dieter runs the Graphene Nanomaterial Lab, synthesising single-atom alloys and ultra-lightweight carbon aerogels for space aerospace components.',
    trending_topics: ['Carbon Aerogels', 'Single-Atom Catalysts', 'Graphene Layers'],
    email: 'dieter.hans@mpg.de',
    collaborators: ['Prof. Alistair MacLeod', 'Dr. Mei-Ling Zhou']
  },
  {
    id: 'res-7',
    name: 'Dr. Mei-Ling Zhou',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-9',
    institution_name: 'National University of Singapore (NUS)',
    research_domains: ['Cybersecurity', 'Artificial Intelligence'],
    publication_count: 85,
    citation_count: 2950,
    h_index: 25,
    bio: 'Dr. Mei-Ling Zhou works on differential privacy and adversarial robustness in machine learning models, creating secure frameworks for healthcare predictions.',
    trending_topics: ['Adversarial Defenses', 'Federated Learning', 'Differential Privacy'],
    email: 'meiling.zhou@nus.edu.sg',
    collaborators: ['Dr. Hans-Dieter', 'Prof. Hiroshi Tanaka']
  },
  {
    id: 'res-8',
    name: 'Prof. Hiroshi Tanaka',
    avatar_url: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-6',
    institution_name: 'University of Tokyo',
    research_domains: ['Quantum Computing', 'Robotics & Autonomous Systems'],
    publication_count: 175,
    citation_count: 11300,
    h_index: 52,
    bio: 'Prof. Hiroshi Tanaka is at the forefront of Quantum Robotics, designing algorithms that allow high-dimensional machine sensors to operate on quantum co-processors.',
    trending_topics: ['Quantum Reinforcement Learning', 'Autonomous Swarms', 'Micro-actuators'],
    email: 'tanaka.h@u-tokyo.ac.jp',
    collaborators: ['Dr. Evelyn Carter', 'Dr. Mei-Ling Zhou']
  },
  {
    id: 'res-9',
    name: 'Dr. David Foster',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-2',
    institution_name: 'Stanford University',
    research_domains: ['Artificial Intelligence', 'Cybersecurity'],
    publication_count: 64,
    citation_count: 1980,
    h_index: 21,
    bio: 'Dr. David Foster researches synthetic media detection and zero-knowledge cryptographic proofs for authenticated content sharing.',
    trending_topics: ['Deepfake Audio Attribution', 'Zero Knowledge Proofs', 'Source Authentication'],
    email: 'dfoster@stanford.edu',
    collaborators: ['Prof. Sarah Jenkins', 'Dr. Evelyn Carter']
  },
  {
    id: 'res-10',
    name: 'Dr. Sophia Lindqvist',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-4',
    institution_name: 'ETH Zurich',
    research_domains: ['Robotics & Autonomous Systems', 'Climate Science'],
    publication_count: 88,
    citation_count: 3110,
    h_index: 29,
    bio: 'Dr. Sophia Lindqvist builds drone swarms fitted with micro-sensors that autonomously map glacial crevasse networks and measure real-time melting trends.',
    trending_topics: ['Glacial Photogrammetry', 'Autonomous UAS Swarms', 'Albedo Calibration'],
    email: 'sophia.lind@ethz.ch',
    collaborators: ['Dr. Hans-Dieter', 'Prof. Alistair MacLeod']
  },
  {
    id: 'res-11',
    name: 'Dr. Robert Oppenheimer II',
    avatar_url: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-10',
    institution_name: 'CERN',
    research_domains: ['Quantum Computing', 'Particle Physics'],
    publication_count: 240,
    citation_count: 28400,
    h_index: 92,
    bio: 'A core physics researcher investigating high-energy particle interactions and quantum computing applications for parsing petabyte-scale collider data.',
    trending_topics: ['Higgs Boson Coupling', 'LHC Quantum Algorithms', 'Dark Matter Candidates'],
    email: 'r.oppenheimer@cern.ch',
    collaborators: ['Dr. Marcus Vance', 'Prof. Hiroshi Tanaka']
  },
  {
    id: 'res-12',
    name: 'Prof. Alice Zhao',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-1',
    institution_name: 'Massachusetts Institute of Technology (MIT)',
    research_domains: ['Artificial Intelligence', 'Cybersecurity'],
    publication_count: 90,
    citation_count: 4100,
    h_index: 31,
    bio: 'Prof. Alice Zhao researches automated neural architecture search and its application to highly constrained embedded systems.',
    trending_topics: ['Neural Architecture Search', 'Edge AI', 'TinyML Security'],
    email: 'alicez@mit.edu',
    collaborators: ['Dr. Evelyn Carter', 'Dr. Mei-Ling Zhou']
  },
  {
    id: 'res-13',
    name: 'Dr. Richard Feynman III',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-8',
    institution_name: 'California Institute of Technology (Caltech)',
    research_domains: ['Quantum Computing', 'Nanotechnology'],
    publication_count: 140,
    citation_count: 9800,
    h_index: 45,
    bio: 'Leading nanotech engineer developing quantum dots for ultra-precise quantum cellular telemetry.',
    trending_topics: ['Quantum Dots', 'Cellular Telemetry', 'Atomic-scale Transistors'],
    email: 'rfeynman@caltech.edu',
    collaborators: ['Dr. Marcus Vance', 'Dr. Hans-Dieter']
  },
  {
    id: 'res-14',
    name: 'Dr. Clara Barton II',
    avatar_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-7',
    institution_name: 'University of Cambridge',
    research_domains: ['Biotechnology & Gene Editing', 'Neuroscience'],
    publication_count: 112,
    citation_count: 6700,
    h_index: 38,
    bio: 'Pioneering biochemical work on targeted peptide arrays for Alzheimer\'s diagnostics and early intervention.',
    trending_topics: ['Tau Fibril Disruption', 'Peptide Arrays', 'Abeta Imaging Markers'],
    email: 'clara.barton@cam.ac.uk',
    collaborators: ['Dr. Elena Rostova', 'Prof. Sarah Jenkins']
  },
  {
    id: 'res-15',
    name: 'Prof. Nicholas Tesla II',
    avatar_url: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-4',
    institution_name: 'ETH Zurich',
    research_domains: ['Renewable Energy', 'Materials Science'],
    publication_count: 155,
    citation_count: 12100,
    h_index: 55,
    bio: 'Pioneering work in resonant induction and wireless high-efficiency power distribution for renewable microgrids.',
    trending_topics: ['Inductive Resonant Links', 'Microgrid Decoupling', 'Superconductive Energy Storage'],
    email: 'ntesla@ethz.ch',
    collaborators: ['Dr. Sophia Lindqvist', 'Prof. Alistair MacLeod']
  },
  {
    id: 'res-16',
    name: 'Dr. Rosalind Franklin II',
    avatar_url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-7',
    institution_name: 'University of Cambridge',
    research_domains: ['Biotechnology & Gene Editing', 'Nanotechnology'],
    publication_count: 83,
    citation_count: 4200,
    h_index: 29,
    bio: 'X-ray crystallographic modeling of synthetic nucleosomes and bio-compatible nano-scaffolding.',
    trending_topics: ['Nucleosome Dynamics', 'Biocompatible Scaffolding', 'Crystallography'],
    email: 'rosfranklin@cam.ac.uk',
    collaborators: ['Prof. Sarah Jenkins', 'Dr. Richard Feynman III']
  },
  {
    id: 'res-17',
    name: 'Dr. Jane Goodall II',
    avatar_url: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-2',
    institution_name: 'Stanford University',
    research_domains: ['Climate Science', 'Neuroscience'],
    publication_count: 75,
    citation_count: 3100,
    h_index: 26,
    bio: 'Investigating environmental toxicology and neuro-behavioral impacts of microplastic inhalation.',
    trending_topics: ['Microplastic Neurotoxicity', 'Eco-epidemiology', 'Environmental Toxins'],
    email: 'goodallj@stanford.edu',
    collaborators: ['Dr. David Foster', 'Dr. Elena Rostova']
  },
  {
    id: 'res-18',
    name: 'Dr. Enrico Fermi II',
    avatar_url: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-10',
    institution_name: 'CERN',
    research_domains: ['Quantum Computing', 'Particle Physics'],
    publication_count: 167,
    citation_count: 14800,
    h_index: 58,
    bio: 'Focused on neutrino thermalization kinetics and superconducting logic gates for extreme environments.',
    trending_topics: ['Neutrino Flux Calibration', 'Cryo-Logic Gates', 'Superconductive Electronics'],
    email: 'fermi@cern.ch',
    collaborators: ['Dr. Robert Oppenheimer II', 'Dr. Marcus Vance']
  },
  {
    id: 'res-19',
    name: 'Dr. Barbara McClintock II',
    avatar_url: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-5',
    institution_name: 'Max Planck Institute',
    research_domains: ['Biotechnology & Gene Editing', 'Materials Science'],
    publication_count: 104,
    citation_count: 5900,
    h_index: 39,
    bio: 'Research into dynamic chromatin loops and biological self-repair mechanisms using synthetic structural materials.',
    trending_topics: ['Chromatin Loops', 'Transposon Editing', 'Bio-inspired Materials'],
    email: 'mcclintock@mpg.de',
    collaborators: ['Dr. Hans-Dieter', 'Prof. Sarah Jenkins']
  },
  {
    id: 'res-20',
    name: 'Dr. Stephen Hawking II',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&auto=format',
    institution_id: 'inst-8',
    institution_name: 'California Institute of Technology (Caltech)',
    research_domains: ['Space Exploration', 'Quantum Computing'],
    publication_count: 189,
    citation_count: 22100,
    h_index: 73,
    bio: 'Theoretical astrophysicist specializing in black hole information paradoxes and quantum gravity simulators.',
    trending_topics: ['Black Hole Telemetry', 'Quantum Gravity Analogs', 'Holographic Principle'],
    email: 'hawking@caltech.edu',
    collaborators: ['Dr. Richard Feynman III', 'Dr. Robert Oppenheimer II']
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-1',
    title: 'Attention-Based Brain Wave Extraction via Distributed Transformer Networks',
    authors: ['Dr. Evelyn Carter', 'Dr. Marcus Vance'],
    abstract: 'Electroencephalogram (EEG) signal processing has historically been plagued by low signal-to-noise ratios. We present EEG-Transformer, a distributed network that implements spatial-temporal self-attention. Our architecture models dynamic cortical connections as a dense multi-head attention graph, yielding a 14.5% improvement in decoding motor-imagery paradigms compared to standard CNNs. We demonstrate robustness in subjects across multiple demographics, showing potential for continuous, high-throughput consumer neuro-interfacing.',
    abstract_excerpt: 'We present EEG-Transformer, a distributed network that implements spatial-temporal self-attention, yielding a 14.5% improvement in decoding motor-imagery paradigms.',
    publication_year: 2025,
    publication_date: '2025-02-14',
    journal: 'IEEE Transactions on Neural Networks and Learning Systems',
    citation_count: 320,
    research_domain: 'Artificial Intelligence',
    institution_id: 'inst-1',
    institution: 'Massachusetts Institute of Technology (MIT)',
    open_access: true,
    doi: '10.1109/TNNLS.2025.1042129',
    keywords: ['EEG', 'Transformers', 'Brain-Computer Interfaces', 'Self-Attention'],
    references: ['Deep Learning for EEG (2020)', 'Attention is All You Need (2017)']
  },
  {
    id: 'pub-2',
    title: 'Josephson Junction Superconducting Qubits with Topological Nanopillars',
    authors: ['Dr. Marcus Vance', 'Dr. Hans-Dieter'],
    abstract: 'Decoherence remains a primary roadblock to physical quantum architectures. We demonstrate topological preservation of quantum states using custom-etched superconducting niobium micro-pillars acting as Josephson Junction nodes. At a dilution refrigerator base temperature of 12mK, we observed a T1 lifetime exceeding 240 microseconds, representing a two-fold improvement over standard planar designs. These findings suggest a feasible scaling trajectory for fault-tolerant physical quantum registers without requiring aggressive feedback circuits.',
    abstract_excerpt: 'We demonstrate topological preservation of quantum states using custom niobium micro-pillars, observing a T1 lifetime exceeding 240 microseconds.',
    publication_year: 2024,
    publication_date: '2024-08-30',
    journal: 'Nature Quantum Information',
    citation_count: 185,
    research_domain: 'Quantum Computing',
    institution_id: 'inst-1',
    institution: 'Massachusetts Institute of Technology (MIT)',
    open_access: false,
    doi: '10.1038/s41534-024-0982-x',
    keywords: ['Josephson Junction', 'Qubits', 'Superconductive Electronics', 'Topological Insulation'],
    references: ['Quantum Decoherence Barriers (2022)', 'Niobium Thin Films (2021)']
  },
  {
    id: 'pub-3',
    title: 'In Vivo Polymeric Lipid Nanoparticle Delivery for Targeted CRISPR Gene Editing',
    authors: ['Prof. Sarah Jenkins', 'Dr. Elena Rostova'],
    abstract: 'Systemic delivery of genomic payloads requires vehicle design that circumvents hepatic clearance. In this study, we synthesized a library of 120 amine-containing ionizable lipid-like polymers (ILLPs) integrated with gold nanoparticles. Our lead formulation, ILLP-108, successfully delivered Cas9-sgRNA complexes targeting hepatic PCSK9 in mice, reducing serum LDL cholesterol by 58% over six months without significant systemic toxicity. This study establishes a safe paradigm for targeting genetic chronic conditions at scale.',
    abstract_excerpt: 'We synthesized ionizable lipid-like polymers integrated with gold nanoparticles, reducing serum LDL cholesterol in mice by 58% over six months.',
    publication_year: 2025,
    publication_date: '2025-01-05',
    journal: 'Journal of Controlled Release',
    citation_count: 412,
    research_domain: 'Biotechnology & Gene Editing',
    institution_id: 'inst-2',
    institution: 'Stanford University',
    open_access: true,
    doi: '10.1016/j.jconrel.2025.01.002',
    keywords: ['CRISPR', 'Lipid Nanoparticles', 'Gene Therapy', 'PCSK9 Inhibition'],
    references: ['Liposomal Delivery Vehicles (2018)', 'CRISPR-Cas9 Therapeutics (2023)']
  },
  {
    id: 'pub-4',
    title: 'Bypassing the Blood-Brain Barrier: RNA Therapeutics for Neural Proteostasis',
    authors: ['Dr. Elena Rostova', 'Dr. Clara Barton II'],
    abstract: 'Therapeutic RNA delivery to the brain is hindered by the blood-brain barrier. We present a novel peptide-conjugated vesicle that targets transferrin receptors, enabling trans-endothelial crossing. In vivo results demonstrate robust protein restoration in corticospinal neurons, mitigating ALS-like degeneration in transgenic SOD1-mutant mice. This represents an unprecedented milestone for non-invasive, targeted RNA therapies.',
    abstract_excerpt: 'We present a peptide-conjugated vesicle targeting transferrin receptors, demonstrating robust protein restoration in corticospinal neurons for ALS mitigation.',
    publication_year: 2024,
    publication_date: '2024-11-12',
    journal: 'Lancet Neurology',
    citation_count: 210,
    research_domain: 'Neuroscience',
    institution_id: 'inst-3',
    institution: 'University of Oxford',
    open_access: true,
    doi: '10.1016/S1474-4422(24)00412-2',
    keywords: ['Blood-Brain Barrier', 'RNA Therapeutics', 'ALS', 'Neurodegeneration'],
    references: ['Blood-Brain Crossing Techniques (2021)', 'SOD1 Toxicity Models (2019)']
  },
  {
    id: 'pub-5',
    title: 'High-Efficiency Perovskite Solar Cells via Dynamic Phase-Separation Passivation',
    authors: ['Prof. Alistair MacLeod', 'Dr. Hans-Dieter'],
    abstract: 'Perovskite solar devices offer high theoretical performance, but suffer from halide migration and surface defects. We introduce a chemical passivation layer using fluorinated ammonium salts that stabilizes the perovskite lattice at grain boundaries. Our cells achieved a certified power conversion efficiency (PCE) of 26.2% under simulated 1-sun illumination, maintaining 94% of initial capacity after 1500 hours of continuous operational testing under ambient humidity.',
    abstract_excerpt: 'We introduce fluorinated ammonium salt passivation for perovskite solar devices, achieving a certified 26.2% power conversion efficiency.',
    publication_year: 2024,
    publication_date: '2024-06-15',
    journal: 'Energy & Environmental Science',
    citation_count: 530,
    research_domain: 'Renewable Energy',
    institution_id: 'inst-3',
    institution: 'University of Oxford',
    open_access: false,
    doi: '10.1039/D4EE01042B',
    keywords: ['Perovskite Solar Cells', 'Photovoltaics', 'Passivation', 'Grid Integration'],
    references: ['Perovskite Stability Limits (2022)', 'Fluorinated Coatings (2020)']
  },
  {
    id: 'pub-6',
    title: 'Single-Atom Platinum Alloys on Graphene Nanomaterials for Oxygen Reduction Catalysis',
    authors: ['Dr. Hans-Dieter', 'Dr. Richard Feynman III'],
    abstract: 'Scaling hydrogen fuel cells is limited by high platinum requirements. We synthesized atomic-scale platinum active sites on nitrogen-doped carbon-graphene matrices. This single-atom catalyst exhibits an ultra-high mass activity of 1.85 A/mg_Pt, representing a 5-fold increase over commercial platinum-on-carbon catalysts, with negligible degradation over 10,000 cycles. We propose an economic pathway to mass-market fuel cell vehicles.',
    abstract_excerpt: 'We synthesized atomic platinum active sites on nitrogen-doped graphene, achieving 1.85 A/mg_Pt mass activity for oxygen reduction catalysis.',
    publication_year: 2025,
    publication_date: '2025-03-01',
    journal: 'Advanced Materials',
    citation_count: 88,
    research_domain: 'Materials Science',
    institution_id: 'inst-5',
    institution: 'Max Planck Institute',
    open_access: true,
    doi: '10.1002/adma.202500122',
    keywords: ['Single-Atom Alloys', 'Platinum Catalyst', 'Fuel Cells', 'Graphene Matrices'],
    references: ['Single-Atom Catalysis (2021)', 'Fuel Cell Electrocatalysis (2022)']
  },
  {
    id: 'pub-7',
    title: 'Adversarial Defenses in Federated Learning using Zero-Knowledge Differential Privacy',
    authors: ['Dr. Mei-Ling Zhou', 'Dr. David Foster'],
    abstract: 'Federated learning enables edge computing without centralized data extraction. However, gradient inversion attacks can reconstruct patient records. We propose ZK-FL, a framework using zero-knowledge cryptographic verification of model gradients before aggregation, combined with localized differential privacy noise calibration. We prove bounds showing resistance to active backdoors and reconstructed assets with under 2.1% performance decay.',
    abstract_excerpt: 'We propose ZK-FL, a cryptographic verification framework for federated learning gradients, securing edge health models from inversion attacks.',
    publication_year: 2024,
    publication_date: '2024-09-18',
    journal: 'IEEE Security & Privacy',
    citation_count: 145,
    research_domain: 'Cybersecurity',
    institution_id: 'inst-9',
    institution: 'National University of Singapore (NUS)',
    open_access: true,
    doi: '10.1109/MSEC.2024.3129841',
    keywords: ['Federated Learning', 'Zero-Knowledge Proofs', 'Differential Privacy', 'Gradient Inversion'],
    references: ['Federated Leakage Channels (2020)', 'Differentially Private SGD (2016)']
  },
  {
    id: 'pub-8',
    title: 'Quantum Reinforcement Learning for Multi-Agent Robotics Swarm Coordination',
    authors: ['Prof. Hiroshi Tanaka', 'Dr. Sophia Lindqvist'],
    abstract: 'Coordinating large robot groups is mathematically intractable in classical computing due to non-linear action space explosions. We propose a hybrid algorithm mapping multi-agent states into a parameterized quantum circuit of 16 qubits. The resulting quantum reinforcement policy shows super-exponential convergence over classical equivalents during glacial sensor tracking. We validated the model using micro-aerial swarms under high turbulence.',
    abstract_excerpt: 'We propose a hybrid quantum reinforcement learning algorithm using 16 qubits, showing super-exponential swarm coordination convergence.',
    publication_year: 2025,
    publication_date: '2025-02-10',
    journal: 'Autonomous Robots',
    citation_count: 112,
    research_domain: 'Robotics & Autonomous Systems',
    institution_id: 'inst-6',
    institution: 'University of Tokyo',
    open_access: false,
    doi: '10.1007/s10514-025-10144-x',
    keywords: ['Quantum Algorithms', 'Reinforcement Learning', 'Robot Swarms', 'Embedded Co-processors'],
    references: ['Parameterized Quantum Circuits (2023)', 'Glacial Swarm Networks (2024)']
  },
  {
    id: 'pub-9',
    title: 'Continuous Seismological Gravity Waves: Mapping Crustal Micro-faults with Atom Interferometers',
    authors: ['Dr. Richard Feynman III', 'Dr. Stephen Hawking II'],
    abstract: 'Predicting earthquake ruptures requires scanning sub-surface density variations at kilometric depth. We utilized atomic rubidium-87 interferometers as high-precision seismic gravimeters. Field deployment at San Andreas Fault zones mapped structural shifts of <12μm, revealing dynamic micro-cracking sequences months prior to macro-slippage.',
    abstract_excerpt: 'We deployed rubidium atomic interferometers, detecting sub-surface crustal fractures under 12 microns in active seismic zones.',
    publication_year: 2024,
    publication_date: '2024-10-04',
    journal: 'Science Seismology',
    citation_count: 215,
    research_domain: 'Space Exploration',
    institution_id: 'inst-8',
    institution: 'California Institute of Technology (Caltech)',
    open_access: true,
    doi: '10.1126/science.ade3042',
    keywords: ['Atom Interferometry', 'Gravity Waves', 'Seismic Gravimeters', 'Fault Mapping'],
    references: ['Seismic Density Variations (2020)', 'Atomic Gravimetry (2019)']
  },
  {
    id: 'pub-10',
    title: 'Higgs Boson Coupling Kinematics and Dark Matter Intermittency inside Colliders',
    authors: ['Dr. Robert Oppenheimer II', 'Dr. Enrico Fermi II'],
    abstract: 'Using Run-3 data from the Large Hadron Collider, we reconstruct heavy lepton collisions to bound potential dark matter candidates. Our search focuses on missing transverse momentum indicators alongside Higgs coupling anomalies, establishing an upper mass constraint of 1.4 eV for axion-like particle candidates.',
    abstract_excerpt: 'We reconstruct Run-3 collision events, placing a strict upper mass constraint of 1.4 eV on axion-like dark matter particles.',
    publication_year: 2024,
    publication_date: '2024-05-12',
    journal: 'Physical Review Letters',
    citation_count: 420,
    research_domain: 'Particle Physics',
    institution_id: 'inst-10',
    institution: 'CERN',
    open_access: true,
    doi: '10.1103/PhysRevLett.132.191801',
    keywords: ['Higgs Boson', 'Large Hadron Collider', 'Dark Matter Axions', 'Transverse Momentum'],
    references: ['LHC Higgs Search (2012)', 'Axion Thermalization Kinetics (2021)']
  },
  // Adding remaining 20 publications to make it 30+ publications
  ...Array.from({ length: 20 }).map((_, i) => {
    const id = `pub-gen-${i + 11}`;
    const domains = [
      'Artificial Intelligence', 'Quantum Computing', 'Biotechnology & Gene Editing',
      'Renewable Energy', 'Materials Science', 'Cybersecurity', 'Nanotechnology',
      'Space Exploration', 'Climate Science', 'Neuroscience', 'Particle Physics',
      'Robotics & Autonomous Systems'
    ];
    const domain = domains[i % domains.length];
    
    // Distribute among researchers
    const rIdx1 = (i * 3) % RESEARCHERS.length;
    const rIdx2 = (i * 7 + 1) % RESEARCHERS.length;
    const author1 = RESEARCHERS[rIdx1];
    const author2 = RESEARCHERS[rIdx2];
    
    // Distribute among institutions
    const instIdx = i % INSTITUTIONS.length;
    const inst = INSTITUTIONS[instIdx];

    const citations = Math.floor(Math.random() * 250) + 10;
    const year = 2023 + (i % 3); // 2023, 2024, 2025

    return {
      id,
      title: `Advanced Breakthroughs and Analysis in ${domain}: Case Studies on Systems and Architectures Vol. ${i + 3}`,
      authors: [author1.name, author2.name],
      abstract: `This peer-reviewed paper analyzes state-of-the-art models and physical architectures in ${domain}. By conducting high-fidelity modeling and field investigations at the ${inst.name}, we evaluated mechanical efficiency, processing speed, and localized robustness. Our results validate the proposed frameworks under extreme constraints, indicating potential transitions to industrial integration over the next fiscal window.`,
      abstract_excerpt: `This research paper introduces advanced models in ${domain}, validating physical constraints in collaboration with the ${inst.name}.`,
      publication_year: year,
      publication_date: `${year}-04-${(10 + i % 20).toString().padStart(2, '0')}`,
      journal: `Journal of Global Advanced ${domain} Research`,
      citation_count: citations,
      research_domain: domain,
      institution_id: inst.id,
      institution: inst.name,
      open_access: i % 2 === 0,
      doi: `10.5555/${domain.toLowerCase().replace(/[^a-z]/g, '')}.202${i % 3}.${1000 + i}`,
      keywords: [domain, 'Innovation Metrics', 'Experimental Validation', 'State-of-the-art'],
      references: [`Foundations of ${domain} (2018)`, `Applied Research in ${domain} (2021)`]
    };
  })
];

export const PATENTS: Patent[] = [
  {
    id: 'pat-1',
    title: 'Sparse Self-Attention Neural Coprocessor with Hardware-Level Masking',
    patent_number: 'US12405821B2',
    abstract: 'An integrated circuit design comprising an array of tensor arithmetic logic units (ALUs), a dedicated static random-access memory (SRAM) cache holding attention matrices, and a hardware-level pruning engine. The hardware-level pruning engine dynamically screens weights under a configured activation threshold, skipping matrix MAC instructions entirely to enable real-time sub-watt transformer processing on mobile neurological telemetry.',
    inventors: ['Dr. Evelyn Carter', 'Prof. Alice Zhao'],
    assignee: 'Massachusetts Institute of Technology (MIT)',
    assignee_id: 'inst-1',
    filing_date: '2023-04-12',
    publication_date: '2025-01-20',
    status: 'Granted',
    technology_domain: 'Artificial Intelligence',
    country: 'United States'
  },
  {
    id: 'pat-2',
    title: 'Superconducting Qubit Coupler with Variable Inductance and Zero Parasitic Coupling',
    patent_number: 'US11902844B1',
    abstract: 'A scalable cryogenic quantum processor architecture featuring an active Josephson-junction loop acting as a tunable coupler between neighboring transmon qubits. The circuit utilizes an offset induction coil to fully zero-out residual capacitive leakages, thereby elevating multi-qubit randomized benchmarking gate fidelity above 99.98% without requiring physical spacer qubits.',
    inventors: ['Dr. Marcus Vance', 'Dr. Enrico Fermi II'],
    assignee: 'Massachusetts Institute of Technology (MIT)',
    assignee_id: 'inst-1',
    filing_date: '2022-10-18',
    publication_date: '2024-06-15',
    status: 'Granted',
    technology_domain: 'Quantum Computing',
    country: 'United States'
  },
  {
    id: 'pat-3',
    title: 'CRISPR-Guided Gold Nanoparticle Carriers for Targeted In Vivo Liver Editing',
    patent_number: 'US12001948B2',
    abstract: 'A therapeutic delivery formulation consisting of a cationic lipid envelope, an internal core comprising chemically passivated colloidal gold clusters, and an active payload of Cas9 ribonucleoprotein vectors. The lipid shell is functionalized with specific peptide ligands targeting low-density lipoprotein receptors to prevent macrophage interception in the blood.',
    inventors: ['Prof. Sarah Jenkins', 'Dr. Rosalind Franklin II'],
    assignee: 'Stanford University',
    assignee_id: 'inst-2',
    filing_date: '2023-01-09',
    publication_date: '2025-02-05',
    status: 'Granted',
    technology_domain: 'Biotechnology & Gene Editing',
    country: 'United States'
  },
  {
    id: 'pat-4',
    title: 'Glacial Sub-surface Thermal Imager Drone and Swarm Integration Method',
    patent_number: 'EP3982405A1',
    abstract: 'An autonomous multi-UAV system designed to perform active photogrammetry on moving ice sheets. Drones are synchronized using decentralized mesh telemetry, measuring thermal radiation and micro-gravity gradients at high speeds. Data are dynamically combined inside a cloud-hosted structural model to output volumetric melting profiles.',
    inventors: ['Dr. Sophia Lindqvist', 'Prof. Nicholas Tesla II'],
    assignee: 'ETH Zurich',
    assignee_id: 'inst-4',
    filing_date: '2023-07-22',
    publication_date: '2024-11-28',
    status: 'Pending',
    technology_domain: 'Robotics & Autonomous Systems',
    country: 'Germany'
  },
  // Adding remaining 16 patents to make it 20 patents
  ...Array.from({ length: 16 }).map((_, i) => {
    const id = `pat-gen-${i + 5}`;
    const domains = [
      'Artificial Intelligence', 'Quantum Computing', 'Biotechnology & Gene Editing',
      'Renewable Energy', 'Materials Science', 'Cybersecurity', 'Nanotechnology',
      'Space Exploration', 'Climate Science', 'Neuroscience', 'Robotics & Autonomous Systems'
    ];
    const domain = domains[i % domains.length];
    
    // Assignees & Inventors
    const instIdx = i % INSTITUTIONS.length;
    const inst = INSTITUTIONS[instIdx];
    const res1 = RESEARCHERS[i % RESEARCHERS.length];
    const res2 = RESEARCHERS[(i + 4) % RESEARCHERS.length];
    const stat: 'Granted' | 'Pending' | 'Expired' = i % 3 === 0 ? 'Pending' : (i % 5 === 0 ? 'Expired' : 'Granted');
    const patNum = `US1${240000 + i * 1357}B2`;

    return {
      id,
      title: `System and Apparatus for High-Fidelity ${domain} Processing and Optimization Core`,
      patent_number: patNum,
      abstract: `This invention relates to an advanced hardware and chemical system designed for ${domain}. Utilizing localized sensor modules and microstructured feedback nodes developed at the ${inst.name}, the device improves processing throughput, structural thermal limits, and operating lifetime under high-load conditions. The apparatus features standard peripheral interfaces to integrate directly with existing commercial systems.`,
      inventors: [res1.name, res2.name],
      assignee: inst.name,
      assignee_id: inst.id,
      filing_date: `202${2 + (i % 2)}-03-14`,
      publication_date: `2024-09-${(10 + i).toString().padStart(2, '0')}`,
      status: stat,
      technology_domain: domain,
      country: i % 3 === 0 ? 'Germany' : (i % 3 === 1 ? 'Switzerland' : 'United States')
    };
  })
];

export const FUNDING_OPPORTUNITIES: FundingOpportunity[] = [
  {
    id: 'fund-1',
    title: 'National Robotics & AI Core Infrastructure Program',
    organization: 'National Science Foundation (NSF)',
    amount: 15000000,
    amount_formatted: '$15.0M',
    deadline: '2026-11-15',
    research_domain: 'Artificial Intelligence',
    eligibility: 'Academic institutions, non-profit consortia, and collaborative industry teams.',
    country_region: 'United States',
    status: 'Open',
    description: 'This funding initiative aims to establish regional hubs for deep learning and robotics testing. Key focus areas include edge computing algorithms, decentralized swarm systems, and high-fidelity simulated testbeds.',
    application_process: 'Applicants must submit a 5-page letters of intent, followed by a comprehensive full-proposal that highlights inter-departmental collaboration, infrastructure layout, and academic-industry mentorship models.',
    official_website: 'https://nsf.gov/funding/robotics-ai-infrastructure'
  },
  {
    id: 'fund-2',
    title: 'Horizon Europe Quantum Computing Scaleup Initiative',
    organization: 'European Research Council (ERC)',
    amount: 25000000,
    amount_formatted: '€25.0M',
    deadline: '2026-10-30',
    research_domain: 'Quantum Computing',
    eligibility: 'European Union academic centers and approved global associated research partners.',
    country_region: 'Europe',
    status: 'Open',
    description: 'The Horizon Quantum Scaleup seeks to fund the design and integration of cryogenic hardware housing more than 100 logical qubits. Projects demonstrating robust error correction and high temperature operation are highly prioritized.',
    application_process: 'Submit a complete preliminary pre-proposal detailing qubit gate fidelity results and cryogenic scaling diagrams. Selected teams will be invited to pitch directly to the ERC review committee.',
    official_website: 'https://erc.europa.eu/funding/quantum-scaleup'
  },
  {
    id: 'fund-3',
    title: 'Therapeutics Innovation Grants for Neurological Degeneration',
    organization: 'National Institutes of Health (NIH)',
    amount: 8000000,
    amount_formatted: '$8.0M',
    deadline: '2026-09-28', // Deadline approaching!
    research_domain: 'Neuroscience',
    eligibility: 'Licensed medical research universities, biotech incubators, and state hospitals.',
    country_region: 'United States',
    status: 'Open',
    description: 'A targeted initiative looking to finance gene therapies and RNA formulations addressing neurodegenerative disorders such as ALS, Parkinson\'s, and Alzheimer\'s. Preference is given to clinical trial stage-1 applications.',
    application_process: 'Complete an online application detailing toxicity metrics and in vivo results on transgenic rodents. Submit full investigator CVs and patent certificates.',
    official_website: 'https://nih.gov/grants/neurological-degeneration'
  },
  {
    id: 'fund-4',
    title: 'Decarbonization Pathways and Renewables Integration Fund',
    organization: 'Global Climate Alliance',
    amount: 5000000,
    amount_formatted: '$5.0M',
    deadline: '2026-12-01',
    research_domain: 'Climate Science',
    eligibility: 'International universities, green technology startups, and municipal environmental offices.',
    country_region: 'Global',
    status: 'Open',
    description: 'Grants supporting the synthesis and deployment of high-stability perovskite cells and advanced grid-decoupling algorithms. Research must produce a physical field prototype.',
    application_process: 'Proposals must outline carbon reduction models, mechanical architecture of microgrids, and cost-benefit ratios of the proposed installation sites.',
    official_website: 'https://globalclimatealliance.org/decarbonization-fund'
  },
  // Adding remaining 16 funding opportunities to make it 20
  ...Array.from({ length: 16 }).map((_, i) => {
    const id = `fund-gen-${i + 5}`;
    const domains = [
      'Artificial Intelligence', 'Quantum Computing', 'Biotechnology & Gene Editing',
      'Renewable Energy', 'Materials Science', 'Cybersecurity', 'Nanotechnology',
      'Space Exploration', 'Climate Science', 'Neuroscience', 'Robotics & Autonomous Systems'
    ];
    const domain = domains[i % domains.length];
    
    const organizations = [
      'Department of Energy (DOE)', 'Wellcome Trust', 'DARPA', 'Bill & Melinda Gates Foundation',
      'Japan Science and Technology Agency (JST)', 'Swiss National Science Foundation (SNSF)'
    ];
    const org = organizations[i % organizations.length];
    
    // deadlines: some close (Sept/Oct 2026), some far (2027)
    const year = 2026;
    const month = (9 + i % 4); // 9, 10, 11, 12
    const day = (1 + i * 3) % 28 + 1;
    const deadline = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    const amountVal = (3 + i * 1.5) * 1000000;
    const formatted = `$${(amountVal / 1000000).toFixed(1)}M`;
    const eligibilities = [
      'Global academic institutions and multi-country research consortia.',
      'Small business innovation teams and partner university laboratories.',
      'Individual postdoctoral researchers and senior academic investigators.'
    ];

    return {
      id,
      title: `Global Research Initiative in ${domain}: Pioneer Grant`,
      organization: org,
      amount: amountVal,
      amount_formatted: formatted,
      deadline,
      research_domain: domain,
      eligibility: eligibilities[i % eligibilities.length],
      country_region: i % 2 === 0 ? 'United States' : (i % 3 === 0 ? 'Europe' : 'Asia-Pacific'),
      status: i % 10 === 9 ? 'Closed' as const : 'Open' as const,
      description: `This program seeks to fund revolutionary discoveries in ${domain}. Our core mission is supporting early-stage high-risk, high-reward models that display substantial capability to leapfrog current technological hurdles.`,
      application_process: `Applicants must upload a complete research project plan, detailed resource allocation spreadsheet, letters of institutional support, and preliminary testbed validation logs to the official grant portal.`,
      official_website: `https://${org.toLowerCase().replace(/[^a-z]/g, '')}.org/grants/${domain.toLowerCase().replace(/[^a-z]/g, '')}`
    };
  })
];

export const COLLABORATION_NETWORKS = {
  nodes: RESEARCHERS.map(r => ({ id: r.id, name: r.name, institution: r.institution_name })),
  links: [
    { source: 'res-1', target: 'res-2', value: 5 },
    { source: 'res-1', target: 'res-8', value: 3 },
    { source: 'res-2', target: 'res-3', value: 4 },
    { source: 'res-3', target: 'res-4', value: 6 },
    { source: 'res-4', target: 'res-5', value: 3 },
    { source: 'res-5', target: 'res-6', value: 2 },
    { source: 'res-6', target: 'res-7', value: 4 },
    { source: 'res-7', target: 'res-8', value: 3 },
    { source: 'res-8', target: 'res-1', value: 2 },
    { source: 'res-9', target: 'res-3', value: 5 },
    { source: 'res-10', target: 'res-6', value: 3 },
    { source: 'res-11', target: 'res-2', value: 2 },
    { source: 'res-12', target: 'res-1', value: 4 },
    { source: 'res-13', target: 'res-2', value: 3 },
    { source: 'res-14', target: 'res-4', value: 5 },
    { source: 'res-15', target: 'res-10', value: 4 },
    { source: 'res-16', target: 'res-3', value: 3 },
    { source: 'res-17', target: 'res-9', value: 2 },
    { source: 'res-18', target: 'res-11', value: 5 },
    { source: 'res-19', target: 'res-6', value: 4 },
    { source: 'res-20', target: 'res-13', value: 6 }
  ]
};
