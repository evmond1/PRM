export interface Partner {
  id: string;
  name: string;
  logo: string;
  type: 'Distributor' | 'Reseller' | 'VAR' | 'MSP';
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Bronze';
  status: 'Active' | 'Inactive' | 'Pending';
  region: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  joinDate: string;
  lastActivity: string;
  salesYTD: number;
  targetAchievement: number;
  certifications: string[];
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  category: string;
  products: Product[];
  primaryContact: {
    name: string;
    email: string;
    phone: string;
  };
  partnerSince: string;
  contractRenewal: string;
  status: 'Active' | 'Inactive' | 'Under Review';
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  vendorId: string;
  vendorName: string;
  description: string;
  price: number;
  msrp: number;
  discount: number;
  stock: number;
  image: string;
  status: 'Available' | 'Limited' | 'Out of Stock' | 'Discontinued';
  features: string[];
  certificationRequired: boolean;
}

export interface Deal {
  id: string;
  partnerId: string;
  partnerName: string;
  products: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  totalValue: number;
  status: 'Prospecting' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  probability: number;
  expectedCloseDate: string;
  actualCloseDate: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  type: 'Email' | 'Webinar' | 'Event' | 'Social Media' | 'Co-branded';
  status: 'Planned' | 'Active' | 'Completed' | 'Cancelled';
  startDate: string;
  endDate: string;
  budget: number;
  targetPartners: string[];
  targetProducts: string[];
  description: string;
  metrics: {
    reach: number;
    engagement: number;
    leads: number;
    opportunities: number;
    revenue: number;
    roi: number;
  };
}

export interface TrainingProgram {
  id: string;
  name: string;
  type: 'Online' | 'In-person' | 'Hybrid';
  status: 'Upcoming' | 'Active' | 'Completed';
  startDate: string;
  endDate: string;
  description: string;
  targetPartners: string[];
  targetProducts: string[];
  enrolledPartners: string[];
  completedPartners: string[];
  materials: {
    name: string;
    type: string;
    url: string;
  }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  date: string;
  link?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Sales Rep' | 'Marketing' | 'Support';
  avatar: string;
  department: string;
  permissions: string[];
}
