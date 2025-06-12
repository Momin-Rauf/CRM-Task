export type JobType = 'Full-time' | 'Part-time';

export interface Job {
  title: string;
  type: JobType;
  salaryRange?: string;
}

export type LeadSource = 'Website' | 'Referral' | 'Cold Call' | 'Other';

export interface Lead {
  id?: number;
  companyName: string;
  contactPerson: string;
  designation?: string;
  email: string;
  phone: string;
  leadSource: LeadSource;
  otherSource?: string;
  followUpDate: string;
  jobs: Job[];
  createdAt?: string;
  updatedAt?: string;
} 