// Pre-filled professional CV/Resume templates with sample data
// Users can select a template and edit with their own details

export const sampleTemplates = {
  modern: {
    personalInfo: {
      fullName: 'Anna Rodriguez',
      jobTitle: 'Senior Housekeeper',
      email: 'anna.rodriguez@email.com',
      phone: '(206) 555-0134',
      location: '5678 Walnut Avenue, Seattle, WA 98101',
      linkedin: 'linkedin.com/in/annarodriguez',
      website: '',
      github: '',
      summary: 'Dedicated and detail-oriented Senior Housekeeper with 8+ years of experience in luxury hospitality. Expert in maintaining impeccable cleanliness standards, training housekeeping teams, and ensuring guest satisfaction. Proven track record of reducing cleaning time by 20% while maintaining 5-star quality ratings. Committed to creating welcoming environments that exceed guest expectations.'
    },
    experience: [
      {
        id: '1',
        position: 'Senior Housekeeper',
        company: 'Hyatt Regency Seattle',
        startDate: '2019-03',
        endDate: '',
        description: '• Supervise and train a team of 12 housekeepers across 200+ rooms\n• Maintain exceptional cleanliness standards with 98% guest satisfaction rating\n• Implement eco-friendly cleaning protocols reducing chemical usage by 30%\n• Coordinate with front desk for efficient room turnovers during peak seasons\n• Conduct quality inspections ensuring compliance with brand standards'
      },
      {
        id: '2',
        position: 'Housekeeper',
        company: 'The Westin Seattle',
        startDate: '2016-06',
        endDate: '2019-02',
        description: '• Cleaned and maintained 18-22 guest rooms daily to luxury standards\n• Received "Employee of the Month" award 4 times for exceptional service\n• Trained new team members on cleaning procedures and safety protocols\n• Managed inventory of cleaning supplies and linens efficiently'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Certificate in Hospitality Management',
        field: 'Hotel Operations',
        school: 'Seattle Central College',
        startDate: '2015',
        endDate: '2016'
      },
      {
        id: '2',
        degree: 'High School Diploma',
        field: '',
        school: 'Roosevelt High School',
        startDate: '2011',
        endDate: '2015'
      }
    ],
    skills: [
      { id: '1', name: 'Deep Cleaning' },
      { id: '2', name: 'Team Leadership' },
      { id: '3', name: 'Time Management' },
      { id: '4', name: 'Inventory Control' },
      { id: '5', name: 'Quality Inspection' },
      { id: '6', name: 'Guest Relations' },
      { id: '7', name: 'Safety Protocols' },
      { id: '8', name: 'Eco-Friendly Cleaning' }
    ],
    languages: [
      { id: '1', language: 'English', proficiency: 'Native' },
      { id: '2', language: 'Spanish', proficiency: 'Fluent' }
    ],
    certifications: [
      { id: '1', name: 'OSHA Safety Certification', issuer: 'OSHA', date: '2022' },
      { id: '2', name: 'Hospitality Housekeeping Executive', issuer: 'IEHA', date: '2020' }
    ],
    references: []
  },

  classic: {
    personalInfo: {
      fullName: 'Mike Beckinsale',
      jobTitle: 'Finance Officer',
      email: 'mike.beckinsale@email.com',
      phone: '(215) 555-0198',
      location: 'Philadelphia, PA',
      linkedin: 'linkedin.com/in/mikebeckinsale',
      website: '',
      github: '',
      summary: 'Results-driven Finance Officer with 14 years of experience in financial planning, analysis, and reporting. Expert in budget management, forecasting, and implementing cost-saving initiatives that have saved organizations over $2M annually. Strong analytical skills combined with excellent communication abilities to present complex financial data to stakeholders at all levels.'
    },
    experience: [
      {
        id: '1',
        position: 'Senior Finance Officer',
        company: 'Sterling Financial Systems',
        startDate: '2018-01',
        endDate: '',
        description: '• Manage annual budgets exceeding $50M across multiple departments\n• Lead financial forecasting and variance analysis for executive leadership\n• Implement automated reporting systems reducing monthly close time by 40%\n• Coordinate with external auditors ensuring SOX compliance\n• Mentor team of 5 junior financial analysts'
      },
      {
        id: '2',
        position: 'Finance Analyst',
        company: 'Morgan Stanley Operations',
        startDate: '2012-06',
        endDate: '2017-12',
        description: '• Performed detailed financial analysis for investment portfolios worth $200M+\n• Created monthly financial reports and presentations for senior management\n• Developed Excel models for cash flow projections and scenario analysis\n• Collaborated with cross-functional teams on cost reduction initiatives'
      },
      {
        id: '3',
        position: 'Junior Accountant',
        company: 'PwC Philadelphia',
        startDate: '2010-08',
        endDate: '2012-05',
        description: '• Assisted in audit engagements for Fortune 500 clients\n• Prepared financial statements and reconciliations\n• Supported tax preparation and compliance documentation'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Master of Business Administration',
        field: 'Finance',
        school: 'Wharton School, University of Pennsylvania',
        startDate: '2008',
        endDate: '2010'
      },
      {
        id: '2',
        degree: 'Bachelor of Science',
        field: 'Accounting',
        school: 'Temple University',
        startDate: '2004',
        endDate: '2008'
      }
    ],
    skills: [
      { id: '1', name: 'Financial Analysis' },
      { id: '2', name: 'Budget Management' },
      { id: '3', name: 'SAP & Oracle' },
      { id: '4', name: 'Advanced Excel' },
      { id: '5', name: 'Financial Modeling' },
      { id: '6', name: 'SOX Compliance' },
      { id: '7', name: 'Team Leadership' },
      { id: '8', name: 'Strategic Planning' }
    ],
    languages: [
      { id: '1', language: 'English', proficiency: 'Native' },
      { id: '2', language: 'French', proficiency: 'Intermediate' }
    ],
    certifications: [
      { id: '1', name: 'Certified Public Accountant (CPA)', issuer: 'AICPA', date: '2011' },
      { id: '2', name: 'Chartered Financial Analyst (CFA)', issuer: 'CFA Institute', date: '2015' }
    ],
    references: [
      { id: '1', name: 'Sarah Johnson', position: 'CFO, Sterling Financial', contact: 'Available upon request' }
    ]
  },

  creative: {
    personalInfo: {
      fullName: 'Alex Simone',
      jobTitle: 'Senior Accountant',
      email: 'alex.simone@email.com',
      phone: '(312) 555-0167',
      location: 'Chicago, IL 60601',
      linkedin: 'linkedin.com/in/alexsimone',
      website: 'alexsimone-accounting.com',
      github: '',
      summary: 'Detail-oriented Senior Accountant with 7 years of progressive experience in corporate accounting and financial reporting. Specialized in GAAP compliance, month-end close processes, and ERP system implementations. Track record of improving financial processes and maintaining 100% audit compliance. Passionate about leveraging technology to streamline accounting operations.'
    },
    experience: [
      {
        id: '1',
        position: 'Senior Accountant',
        company: 'Morrison & Associates LLC',
        startDate: '2020-03',
        endDate: '',
        description: '• Lead month-end and year-end close processes for $75M revenue company\n• Prepare consolidated financial statements and management reports\n• Supervise accounts payable/receivable team of 4 staff members\n• Implement NetSuite ERP system resulting in 50% faster reporting\n• Coordinate with external auditors for annual audit with zero findings'
      },
      {
        id: '2',
        position: 'Staff Accountant',
        company: 'Grant Thornton LLP',
        startDate: '2017-06',
        endDate: '2020-02',
        description: '• Performed audit procedures for clients across manufacturing and retail sectors\n• Prepared and reviewed workpapers for audit engagements\n• Assisted in tax return preparation for corporate clients\n• Developed client relationships through professional service delivery'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Master of Accountancy',
        field: 'Financial Accounting',
        school: 'University of Illinois at Chicago',
        startDate: '2015',
        endDate: '2017'
      },
      {
        id: '2',
        degree: 'Bachelor of Science',
        field: 'Accounting',
        school: 'DePaul University',
        startDate: '2011',
        endDate: '2015'
      }
    ],
    skills: [
      { id: '1', name: 'GAAP Compliance', level: 'Expert' },
      { id: '2', name: 'Financial Reporting', level: 'Expert' },
      { id: '3', name: 'NetSuite ERP', level: 'Advanced' },
      { id: '4', name: 'QuickBooks', level: 'Expert' },
      { id: '5', name: 'Excel & VBA', level: 'Advanced' },
      { id: '6', name: 'Tax Preparation', level: 'Intermediate' }
    ],
    languages: [
      { id: '1', language: 'English', proficiency: 'Native' },
      { id: '2', language: 'Italian', proficiency: 'Conversational' }
    ],
    certifications: [
      { id: '1', name: 'Certified Public Accountant (CPA)', issuer: 'Illinois Board', date: '2018' },
      { id: '2', name: 'NetSuite Administrator Certification', issuer: 'Oracle', date: '2021' }
    ],
    references: [
      { id: '1', name: 'Jennifer Martinez', position: 'Partner, Grant Thornton', contact: 'Available upon request' }
    ]
  },

  minimal: {
    personalInfo: {
      fullName: 'Jack Clark',
      jobTitle: 'Office Administrator',
      email: 'jack.clark@email.com',
      phone: '(619) 555-0145',
      location: '1234 Harbor Drive, San Diego, CA 92101',
      linkedin: 'linkedin.com/in/jackclark',
      website: '',
      github: '',
      summary: 'Highly organized Office Administrator with 5+ years of experience managing daily operations for busy real estate offices. Skilled in coordinating schedules, managing client communications, and maintaining efficient office systems. Known for problem-solving abilities and creating positive work environments. Proficient in real estate software and Microsoft Office Suite.'
    },
    experience: [
      {
        id: '1',
        position: 'Office Administrator',
        company: 'Hunter Realty San Diego',
        startDate: '2021-01',
        endDate: '',
        description: '• Manage front office operations for 15-agent real estate firm\n• Coordinate property listings, showings, and client communications\n• Maintain CRM database with 2,000+ client records\n• Process commission payments and vendor invoices\n• Organize marketing materials and open house events'
      },
      {
        id: '2',
        position: 'Administrative Assistant',
        company: 'Pacific Property Management',
        startDate: '2018-06',
        endDate: '2020-12',
        description: '• Provided administrative support to property management team\n• Scheduled maintenance requests and coordinated with contractors\n• Managed tenant communications and lease documentation\n• Assisted with accounts receivable and rent collection'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Associate Degree',
        field: 'Business Administration',
        school: 'San Diego Mesa College',
        startDate: '2016',
        endDate: '2018'
      }
    ],
    skills: [
      { id: '1', name: 'Office Management' },
      { id: '2', name: 'Microsoft Office Suite' },
      { id: '3', name: 'CRM Systems' },
      { id: '4', name: 'Calendar Management' },
      { id: '5', name: 'Customer Service' },
      { id: '6', name: 'Data Entry' },
      { id: '7', name: 'Real Estate Software' },
      { id: '8', name: 'Event Coordination' }
    ],
    languages: [
      { id: '1', language: 'English', proficiency: 'Native' },
      { id: '2', language: 'Spanish', proficiency: 'Basic' }
    ],
    certifications: [
      { id: '1', name: 'Microsoft Office Specialist', issuer: 'Microsoft', date: '2019' },
      { id: '2', name: 'Real Estate Administrative Professional', issuer: 'NAR', date: '2021' }
    ],
    references: []
  },

  executive: {
    personalInfo: {
      fullName: 'Sarah Mitchell',
      jobTitle: 'Marketing Director',
      email: 'sarah.mitchell@email.com',
      phone: '(415) 555-0189',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/sarahmitchell',
      website: 'sarahmitchell.io',
      github: '',
      summary: 'Strategic Marketing Director with 12+ years of experience driving brand growth and revenue for Fortune 500 companies and high-growth startups. Expert in digital marketing, brand strategy, and team leadership. Led campaigns generating $50M+ in revenue and built marketing teams from ground up. Passionate about data-driven decision making and innovative marketing technologies.'
    },
    experience: [
      {
        id: '1',
        position: 'Marketing Director',
        company: 'Global Tech Solutions Inc.',
        startDate: '2019-06',
        endDate: '',
        description: '• Lead 25-person marketing team across brand, digital, and content divisions\n• Develop and execute integrated marketing strategies with $15M annual budget\n• Increased brand awareness by 45% and lead generation by 60% YoY\n• Launch successful product campaigns generating $30M in pipeline\n• Implement marketing automation systems improving efficiency by 35%'
      },
      {
        id: '2',
        position: 'Senior Marketing Manager',
        company: 'Salesforce',
        startDate: '2015-03',
        endDate: '2019-05',
        description: '• Managed demand generation programs for enterprise segment\n• Led team of 8 marketing specialists across multiple product lines\n• Developed ABM strategies resulting in 40% increase in enterprise deals\n• Created content marketing programs generating 100K+ monthly visitors'
      },
      {
        id: '3',
        position: 'Marketing Manager',
        company: 'Adobe Systems',
        startDate: '2012-01',
        endDate: '2015-02',
        description: '• Executed digital marketing campaigns for Creative Cloud products\n• Managed $5M paid media budget across search, social, and display\n• Collaborated with product teams on go-to-market strategies'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Master of Business Administration',
        field: 'Marketing',
        school: 'Stanford Graduate School of Business',
        startDate: '2010',
        endDate: '2012'
      },
      {
        id: '2',
        degree: 'Bachelor of Arts',
        field: 'Communications',
        school: 'UCLA',
        startDate: '2006',
        endDate: '2010'
      }
    ],
    skills: [
      { id: '1', name: 'Strategic Planning' },
      { id: '2', name: 'Team Leadership' },
      { id: '3', name: 'Digital Marketing' },
      { id: '4', name: 'Brand Strategy' },
      { id: '5', name: 'Marketing Analytics' },
      { id: '6', name: 'Budget Management' },
      { id: '7', name: 'Salesforce Marketing Cloud' },
      { id: '8', name: 'HubSpot' }
    ],
    languages: [
      { id: '1', language: 'English', proficiency: 'Native' },
      { id: '2', language: 'Mandarin', proficiency: 'Conversational' }
    ],
    certifications: [
      { id: '1', name: 'Google Analytics Certified', issuer: 'Google', date: '2023' },
      { id: '2', name: 'HubSpot Inbound Marketing', issuer: 'HubSpot Academy', date: '2022' }
    ],
    references: []
  },

  tech: {
    personalInfo: {
      fullName: 'David Chen',
      jobTitle: 'Senior Software Engineer',
      email: 'david.chen@email.com',
      phone: '(206) 555-0123',
      location: 'Seattle, WA',
      linkedin: 'linkedin.com/in/davidchen-dev',
      website: 'davidchen.dev',
      github: 'github.com/davidchen',
      summary: 'Full-stack Software Engineer with 8+ years of experience building scalable web applications and distributed systems. Expert in JavaScript/TypeScript, Python, and cloud technologies. Passionate about clean code, system design, and mentoring junior developers. Contributed to open-source projects with 5K+ GitHub stars.'
    },
    experience: [
      {
        id: '1',
        position: 'Senior Software Engineer',
        company: 'Amazon Web Services',
        startDate: '2020-01',
        endDate: '',
        description: '• Lead development of internal tools serving 10,000+ AWS employees\n• Design and implement microservices handling 1M+ daily requests\n• Mentor team of 5 engineers and conduct technical interviews\n• Reduced deployment time by 70% through CI/CD improvements\n• Collaborate with product managers on technical roadmap planning'
      },
      {
        id: '2',
        position: 'Software Engineer',
        company: 'Microsoft',
        startDate: '2017-06',
        endDate: '2019-12',
        description: '• Developed features for Azure DevOps used by millions of developers\n• Built React components for enterprise dashboard applications\n• Implemented RESTful APIs and GraphQL services\n• Participated in on-call rotation for production systems'
      },
      {
        id: '3',
        position: 'Junior Developer',
        company: 'Startup XYZ',
        startDate: '2015-08',
        endDate: '2017-05',
        description: '• Built full-stack features using Node.js and React\n• Managed PostgreSQL databases and Redis caching\n• Deployed applications to AWS EC2 and S3'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Master of Science',
        field: 'Computer Science',
        school: 'University of Washington',
        startDate: '2013',
        endDate: '2015'
      },
      {
        id: '2',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        school: 'UC Berkeley',
        startDate: '2009',
        endDate: '2013'
      }
    ],
    skills: [
      { id: '1', name: 'JavaScript/TypeScript' },
      { id: '2', name: 'React & Node.js' },
      { id: '3', name: 'Python' },
      { id: '4', name: 'AWS/Cloud' },
      { id: '5', name: 'PostgreSQL' },
      { id: '6', name: 'Docker & Kubernetes' },
      { id: '7', name: 'System Design' },
      { id: '8', name: 'GraphQL' }
    ],
    languages: [
      { id: '1', language: 'English', proficiency: 'Native' },
      { id: '2', language: 'Mandarin', proficiency: 'Native' }
    ],
    certifications: [
      { id: '1', name: 'AWS Solutions Architect', issuer: 'Amazon', date: '2021' },
      { id: '2', name: 'Kubernetes Administrator (CKA)', issuer: 'CNCF', date: '2022' }
    ],
    projects: [
      { id: '1', name: 'OpenSource CLI Tool', description: 'Built a CLI tool for automating deployments with 3K+ GitHub stars', technologies: 'Node.js, TypeScript', link: 'github.com/davidchen/cli-tool' }
    ],
    references: []
  },

  elegant: {
    personalInfo: {
      fullName: 'Emma Thompson',
      jobTitle: 'Human Resources Manager',
      email: 'emma.thompson@email.com',
      phone: '(212) 555-0178',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/emmathompson-hr',
      website: '',
      github: '',
      summary: 'Strategic Human Resources Manager with 10+ years of experience in talent acquisition, employee relations, and organizational development. Proven track record of reducing turnover by 30% and implementing HR systems that improve operational efficiency. SHRM-certified professional committed to building inclusive workplace cultures and developing high-performing teams.'
    },
    experience: [
      {
        id: '1',
        position: 'Human Resources Manager',
        company: 'Deloitte Consulting LLP',
        startDate: '2018-04',
        endDate: '',
        description: '• Manage HR operations for 500+ employee consulting practice\n• Lead talent acquisition strategy reducing time-to-hire by 40%\n• Implement HRIS systems improving data accuracy and reporting\n• Design and deliver leadership development programs\n• Partner with senior leadership on workforce planning initiatives'
      },
      {
        id: '2',
        position: 'HR Business Partner',
        company: 'JPMorgan Chase',
        startDate: '2014-06',
        endDate: '2018-03',
        description: '• Supported HR needs for 300+ employees in technology division\n• Managed employee relations cases with 95% resolution rate\n• Coordinated performance management and compensation cycles\n• Led diversity and inclusion initiatives for the department'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Master of Science',
        field: 'Human Resource Management',
        school: 'Cornell University ILR School',
        startDate: '2012',
        endDate: '2014'
      },
      {
        id: '2',
        degree: 'Bachelor of Arts',
        field: 'Psychology',
        school: 'NYU',
        startDate: '2008',
        endDate: '2012'
      }
    ],
    skills: [
      { id: '1', name: 'Talent Acquisition' },
      { id: '2', name: 'Employee Relations' },
      { id: '3', name: 'HRIS (Workday, SAP)' },
      { id: '4', name: 'Performance Management' },
      { id: '5', name: 'Compensation & Benefits' },
      { id: '6', name: 'Training & Development' }
    ],
    languages: [
      { id: '1', language: 'English', proficiency: 'Native' },
      { id: '2', language: 'Spanish', proficiency: 'Intermediate' }
    ],
    certifications: [
      { id: '1', name: 'SHRM-SCP', issuer: 'SHRM', date: '2019' },
      { id: '2', name: 'PHR', issuer: 'HRCI', date: '2016' }
    ],
    references: []
  },

  professional: {
    personalInfo: {
      fullName: 'James Wilson',
      jobTitle: 'Regional Sales Manager',
      email: 'james.wilson@email.com',
      phone: '(404) 555-0156',
      location: 'Atlanta, GA',
      linkedin: 'linkedin.com/in/jameswilson-sales',
      website: '',
      github: '',
      summary: 'Results-driven Regional Sales Manager with 9+ years of experience exceeding revenue targets and building high-performance sales teams. Consistently achieved 120%+ of quota while managing territories generating $25M+ annually. Expert in consultative selling, CRM optimization, and sales team development. Known for turning around underperforming territories and creating winning sales cultures.'
    },
    experience: [
      {
        id: '1',
        position: 'Regional Sales Manager',
        company: 'Salesforce Inc.',
        startDate: '2019-08',
        endDate: '',
        description: '• Lead team of 12 Account Executives across Southeast region\n• Exceeded annual revenue target by 125% ($28M closed)\n• Developed sales playbooks improving win rates by 20%\n• Recruited and onboarded 8 new sales reps with 90% retention\n• Collaborate with marketing on demand generation campaigns'
      },
      {
        id: '2',
        position: 'Senior Account Executive',
        company: 'Oracle Corporation',
        startDate: '2015-03',
        endDate: '2019-07',
        description: '• Managed enterprise accounts with deal sizes $500K-$5M\n• Achieved Presidents Club status 3 consecutive years\n• Built pipeline through strategic prospecting and networking\n• Partnered with solution engineers on technical demonstrations'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Bachelor of Business Administration',
        field: 'Marketing',
        school: 'Georgia State University',
        startDate: '2010',
        endDate: '2014'
      }
    ],
    skills: [
      { id: '1', name: 'Sales Leadership' },
      { id: '2', name: 'Salesforce CRM' },
      { id: '3', name: 'Pipeline Management' },
      { id: '4', name: 'Negotiation' },
      { id: '5', name: 'Team Development' },
      { id: '6', name: 'Forecasting' },
      { id: '7', name: 'Enterprise Sales' },
      { id: '8', name: 'Solution Selling' }
    ],
    languages: [
      { id: '1', language: 'English', proficiency: 'Native' }
    ],
    certifications: [
      { id: '1', name: 'Salesforce Administrator', issuer: 'Salesforce', date: '2020' },
      { id: '2', name: 'MEDDIC Sales Methodology', issuer: 'MEDDIC Academy', date: '2018' }
    ],
    references: []
  },

  compact: {
    personalInfo: {
      fullName: 'Lisa Anderson',
      jobTitle: 'Senior Project Manager',
      email: 'lisa.anderson@email.com',
      phone: '(425) 555-0134',
      location: 'Bellevue, WA',
      linkedin: 'linkedin.com/in/lisaanderson-pm',
      website: '',
      github: '',
      summary: 'PMP-certified Senior Project Manager with 8+ years of experience delivering complex technology projects on time and within budget. Expertise in Agile and Waterfall methodologies, stakeholder management, and cross-functional team leadership. Successfully delivered 50+ projects with combined budgets exceeding $100M.'
    },
    experience: [
      {
        id: '1',
        position: 'Senior Project Manager',
        company: 'Microsoft Corporation',
        startDate: '2019-02',
        endDate: '',
        description: '• Lead enterprise software implementation projects ($5M-$20M)\n• Manage cross-functional teams of 15-30 members\n• Achieve 95% on-time delivery rate across all projects\n• Implement PMO best practices improving efficiency by 25%'
      },
      {
        id: '2',
        position: 'Project Manager',
        company: 'Accenture',
        startDate: '2016-06',
        endDate: '2019-01',
        description: '• Delivered digital transformation projects for Fortune 500 clients\n• Managed project budgets ranging from $2M-$10M\n• Coordinated offshore and onshore development teams'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Master of Science',
        field: 'Information Systems',
        school: 'University of Washington',
        startDate: '2014',
        endDate: '2016'
      },
      {
        id: '2',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        school: 'Washington State University',
        startDate: '2010',
        endDate: '2014'
      }
    ],
    skills: [
      { id: '1', name: 'Agile/Scrum' },
      { id: '2', name: 'Waterfall' },
      { id: '3', name: 'JIRA & Confluence' },
      { id: '4', name: 'MS Project' },
      { id: '5', name: 'Risk Management' },
      { id: '6', name: 'Stakeholder Management' }
    ],
    languages: [
      { id: '1', language: 'English', proficiency: 'Native' }
    ],
    certifications: [
      { id: '1', name: 'Project Management Professional (PMP)', issuer: 'PMI', date: '2017' },
      { id: '2', name: 'Certified Scrum Master (CSM)', issuer: 'Scrum Alliance', date: '2018' },
      { id: '3', name: 'ITIL Foundation', issuer: 'Axelos', date: '2019' }
    ],
    references: []
  },

  bold: {
    personalInfo: {
      fullName: 'Robert Taylor',
      jobTitle: 'Creative Director',
      email: 'robert.taylor@email.com',
      phone: '(503) 555-0167',
      location: 'Portland, OR',
      linkedin: 'linkedin.com/in/roberttaylor-design',
      website: 'roberttaylor.design',
      github: '',
      summary: 'Award-winning Creative Director with 11+ years of experience leading design teams and creating impactful brand experiences. Expert in brand strategy, visual design, and creative leadership. Led campaigns for global brands including Nike, Apple, and Coca-Cola. Passionate about pushing creative boundaries and mentoring the next generation of designers.'
    },
    experience: [
      {
        id: '1',
        position: 'Creative Director',
        company: 'Nike Design Studio',
        startDate: '2020-01',
        endDate: '',
        description: '• Lead creative team of 20 designers, copywriters, and art directors\n• Develop brand campaigns reaching 500M+ consumers globally\n• Won 5 Cannes Lions for innovative digital experiences\n• Oversee $10M annual creative budget and vendor relationships\n• Collaborate with product teams on footwear and apparel design'
      },
      {
        id: '2',
        position: 'Associate Creative Director',
        company: 'Wieden+Kennedy',
        startDate: '2015-06',
        endDate: '2019-12',
        description: '• Led creative development for Coca-Cola and KFC accounts\n• Managed teams of 8-12 creatives across multiple campaigns\n• Pitched and won $15M in new business\n• Mentored junior designers and developed creative talent'
      },
      {
        id: '3',
        position: 'Senior Designer',
        company: 'Apple Inc.',
        startDate: '2012-03',
        endDate: '2015-05',
        description: '• Designed marketing materials for product launches\n• Created digital experiences for apple.com\n• Collaborated with engineering on UI/UX projects'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Master of Fine Arts',
        field: 'Graphic Design',
        school: 'Rhode Island School of Design',
        startDate: '2010',
        endDate: '2012'
      },
      {
        id: '2',
        degree: 'Bachelor of Arts',
        field: 'Visual Communication',
        school: 'Parsons School of Design',
        startDate: '2006',
        endDate: '2010'
      }
    ],
    skills: [
      { id: '1', name: 'Brand Strategy' },
      { id: '2', name: 'Creative Direction' },
      { id: '3', name: 'Adobe Creative Suite' },
      { id: '4', name: 'Figma & Sketch' },
      { id: '5', name: 'Motion Design' },
      { id: '6', name: 'Team Leadership' },
      { id: '7', name: 'Art Direction' },
      { id: '8', name: 'Typography' }
    ],
    languages: [
      { id: '1', language: 'English', proficiency: 'Native' },
      { id: '2', language: 'Japanese', proficiency: 'Conversational' }
    ],
    certifications: [],
    references: []
  }
}

// Get sample data for a specific template
export const getSampleTemplate = (templateId) => {
  return sampleTemplates[templateId] || sampleTemplates.modern
}

// Get all template IDs
export const getTemplateIds = () => Object.keys(sampleTemplates)
