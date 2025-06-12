const API_BASE_URL = 'http://localhost:3001';

export const leadService = {
  async getLeads() {
    const response = await fetch(`${API_BASE_URL}/leads`);
    if (!response.ok) {
      throw new Error('Failed to fetch leads');
    }
    return response.json();
  },

  async createLead(lead) {
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

  async deleteLead(id) {
    const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete lead');
    }
  },
}; 