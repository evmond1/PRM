import { Partner, Vendor, Product, Deal, MarketingCampaign, TrainingProgram, Notification, User } from '../types';

export const partners: Partner[] = [
  {
    id: '1',
    name: 'TechSolutions Inc.',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    type: 'Distributor',
    tier: 'Platinum',
    status: 'Active',
    region: 'North America',
    contactName: 'John Smith',
    contactEmail: 'john.smith@techsolutions.com',
    contactPhone: '(555) 123-4567',
    address: '123 Tech Blvd, San Francisco, CA 94105',
    joinDate: '2020-03-15',
    lastActivity: '2023-09-28',
    salesYTD: 1250000,
    targetAchievement: 85,
    certifications: ['Cloud Solutions', 'Security', 'Enterprise Networks']
  },
  {
    id: '2',
    name: 'Global IT Distributors',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    type: 'Distributor',
    tier: 'Gold',
    status: 'Active',
    region
