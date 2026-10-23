export const profile = {
  name: 'Neel Kakadiya',
  role: 'Senior Application Developer',
  location: 'Winnipeg, Manitoba, Canada',
  tagline:
    'I build secure, end-to-end case management platforms on Dynamics 365, Power Platform and Azure, and I bring a research background in reinforcement learning for robotics.',
  email: 'neelkakadiya422@gmail.com',
  github: 'https://github.com/NeelK1609',
  linkedin: 'https://www.linkedin.com/in/Neel-Kakadiya',
}

export const about = {
  paragraphs: [
    'I am a Senior Application Developer with the Government of Manitoba, where I design and ship the systems behind health card registration and rebate programs, from public portals and authentication to automated workflows and AI-assisted review.',
    'I hold a B.Sc. in Computer Science from the University of Manitoba. Before government work, I trained robots with deep reinforcement learning in Germany through DAAD RISE, collaborating with Nvidia and BMW, and researched Bitcoin mining incentives at the Computational Finance Lab.',
  ],
  stats: [
    { value: '50–60%', label: 'less manual review with AI-assisted case approval' },
    { value: '95%', label: 'success rate in RL robot manipulation tasks' },
    { value: '3', label: 'Microsoft certifications' },
  ],
}

export type Job = {
  role: string
  org: string
  dates: string
  place: string
  points: string[]
}

export const experience: Job[] = [
  {
    role: 'Senior Application Developer',
    org: 'Government of Manitoba',
    dates: 'Jan 2023 – Present',
    place: 'Winnipeg, MB',
    points: [
      'Lead developer on two large case management platforms (HCRS and SRP), covering application, assessment, approval and audit.',
      'Built public portals with Power Pages and internal model-driven apps on Dynamics 365 and Dataverse.',
      'Secured citizen sign-in with Azure AD B2C (Entra ID) and MFA; integrated the Canada Post address API.',
      'Leading the migration of 10 legacy Microsoft Access applications to SQL Server.',
      'Handle 5–10 high-urgency incidents monthly across DEV, STG and PROD while meeting SLAs.',
    ],
  },
  {
    role: 'Business Process Automation & Application Developer',
    org: 'Advancement Services, University of Manitoba',
    dates: 'Sep 2024 – Apr 2025',
    place: 'Winnipeg, MB',
    points: [
      'Designed SQL Server databases and Power BI dashboards to track donations and fund allocations.',
      'Automated repetitive work with Python and Power Automate, and integrated systems over REST APIs.',
      'Built .NET, JavaScript and jQuery features that added self-serve capabilities to internal portals.',
    ],
  },
  {
    role: 'Researcher, Deep Reinforcement Learning in Robot Manipulation',
    org: 'HTW Dresden (CLEVER Project), DAAD RISE',
    dates: 'Jun 2024 – Aug 2024',
    place: 'Dresden, Germany',
    points: [
      'Reached a 95% success rate on precise manipulation tasks with Franka and DofBot robots.',
      'Trained and tested robots in Nvidia Omniverse Isaac Sim; implemented 6+ RL algorithms with RLlib.',
      'Applied RL to 6-axis industrial robots at BMW, reducing error rates by 15%.',
    ],
  },
  {
    role: 'Undergraduate Research Assistant',
    org: 'Computational Finance Lab, University of Manitoba',
    dates: 'May 2023 – Aug 2023',
    place: 'Winnipeg, MB',
    points: [
      'Built a dataset of 50,000+ Bitcoin price, difficulty, reward and fee data points.',
      'Developed 5 transaction allocation algorithms that increased mining rewards by 20% for miners with varying compute power.',
    ],
  },
]

export type Project = {
  title: string
  context: string
  metric: string
  description: string
  tech: string[]
}

export const projects: Project[] = [
  {
    title: 'Security Rebate Program (SRP)',
    context: 'Government of Manitoba',
    metric: '50–60% less manual review',
    description:
      'Automated case management for rebate applications. AI image classification checks uploaded receipts and equipment photos, then approves or escalates each case based on confidence.',
    tech: ['Power Platform', 'Azure AI Foundry', 'Azure Functions (C#)', 'Logic Apps', 'SQL Server'],
  },
  {
    title: 'Health Card Registration System (HCRS)',
    context: 'Government of Manitoba',
    metric: 'End-to-end case lifecycle',
    description:
      'A public Power Pages portal and an internal adjudication app on Dynamics 365, with MFA sign-in, Canada Post address lookup, and secure transfer of approved cases to the provincial registry.',
    tech: ['Dynamics 365', 'Power Pages', 'Dataverse', 'Entra ID B2C', 'Power Automate'],
  },
  {
    title: 'RL for Robot Manipulation',
    context: 'HTW Dresden · Nvidia · BMW',
    metric: '95% task success',
    description:
      'Trained robot arms to perform precise manipulation using deep reinforcement learning in simulation, then applied the techniques to industrial 6-axis robots.',
    tech: ['Python', 'RLlib', 'Isaac Sim', 'ROS'],
  },
  {
    title: 'Bitcoin Mining Reward Optimization',
    context: 'Computational Finance Lab',
    metric: '+20% mining rewards',
    description:
      'Researched mining incentives and designed transaction allocation algorithms that improved rewards for miners with different computational power.',
    tech: ['Python', 'Statistics', 'Data Visualization'],
  },
  {
    title: 'Access to SQL Server Modernization',
    context: 'Government of Manitoba',
    metric: '10 legacy apps',
    description:
      'Leading the migration of legacy Microsoft Access applications to SQL Server for Health Department case management, including migration plans and tooling.',
    tech: ['SQL Server', 'Microsoft Access', 'Migration Planning'],
  },
]

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Power Platform',
    items: ['Power Apps', 'Power Automate', 'Power Pages', 'Dataverse', 'Dynamics 365', 'Power BI'],
  },
  {
    group: 'Azure',
    items: ['Functions', 'Logic Apps', 'App Services', 'Key Vault', 'App Insights', 'AI Foundry', 'Entra ID'],
  },
  { group: 'Languages', items: ['C#', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'HTML/CSS'] },
  { group: 'Frameworks', items: ['.NET Core', 'ASP.NET MVC', 'React', 'Node.js', 'REST APIs', 'Entity Framework'] },
  { group: 'Data', items: ['SQL Server', 'Azure SQL', 'Oracle', 'DB2', 'Crystal Reports'] },
  { group: 'DevOps', items: ['Azure DevOps', 'GitHub Actions', 'CI/CD', 'Git', 'JIRA', 'Agile/Scrum'] },
]

export const certifications = [
  { code: 'AZ-204', name: 'Azure Developer Associate' },
  { code: 'PL-200', name: 'Power Platform Functional Consultant Associate' },
  { code: 'PL-900', name: 'Power Platform Fundamentals' },
]

export const awards = [
  { name: 'DAAD RISE Participant', detail: 'Selected to research industrial automation in Germany with Nvidia and BMW.' },
  { name: 'Undergraduate Research Award', detail: 'For structural workflow analysis and system efficiency research.' },
]

export const education = {
  school: 'University of Manitoba',
  degree: 'B.Sc. Computer Science',
  dates: '2021 – 2025',
}
