export interface ProjectStatus {
  name: string;
  type: 'Telegram App' | 'Website';
  status: 'active' | 'maintenance' | 'development';
  url: string;
  metric: {
    value: number;
    label: string;
  };
}

export interface DashboardMetrics {
  projectsCount: number;
  uptime: number;
  supportHours: number;
  monthlyGrowth: number;
  responseTime: number;
}

export interface TechStackItem {
  name: string;
  performance: number;
  color: string;
}

export const dashboardData = {
  metrics: {
    projectsCount: 50,
    uptime: 99.8,
    supportHours: 24,
    monthlyGrowth: 12,
    responseTime: 5
  } as DashboardMetrics,

  projects: [
    {
      name: "Celebrity Strike",
      type: "Telegram App",
      status: "active",
      url: "https://t.me/CelebrityStrike_bot",
      metric: {
        value: 1200,
        label: "users"
      }
    },
    {
      name: "Zagranpasport24",
      type: "Website",
      status: "active", 
      url: "https://zagranpasport24.ru",
      metric: {
        value: 850,
        label: "visits/day"
      }
    },
    {
      name: "Self Detail Bot",
      type: "Telegram App",
      status: "active",
      url: "https://t.me/self_detail_bot", 
      metric: {
        value: 45,
        label: "bookings"
      }
    },
    {
      name: "VisaLand",
      type: "Website",
      status: "active",
      url: "https://visaland.ru",
      metric: {
        value: 320,
        label: "requests"
      }
    }
  ] as ProjectStatus[],

  techStack: [
    {
      name: "Java Spring",
      performance: 95,
      color: "#00ffff"
    },
    {
      name: "React",
      performance: 90,
      color: "#ff00ff"
    },
    {
      name: "Telegram API",
      performance: 88,
      color: "#ffff00"
    },
    {
      name: "PostgreSQL",
      performance: 92,
      color: "#00ff00"
    }
  ] as TechStackItem[]
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return '#00ff00';
    case 'maintenance':
      return '#ffff00';
    case 'development':
      return '#ff00ff';
    default:
      return '#ffffff';
  }
};

export const getStatusEmoji = (status: string): string => {
  switch (status) {
    case 'active':
      return '🟢';
    case 'maintenance':
      return '🟡';
    case 'development':
      return '🔵';
    default:
      return '⚪';
  }
}; 