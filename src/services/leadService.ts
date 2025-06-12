import type { Lead } from '../types/lead';

const API_BASE_URL = 'http://localhost:3001';

export const leadService = {
  async getLeads(): Promise<Lead[]> {
    const response = await fetch(`${API_BASE_URL}/leads`);
    if (!response.ok) {
      throw new Error('Failed to fetch leads');
    }
    return response.json();
  },

  async createLead(lead: Omit<Lead, 'id'>): Promise<Lead> {
    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...lead,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to create lead');
    }
    return response.json();
  },

  async deleteLead(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete lead');
    }
  },
}; 