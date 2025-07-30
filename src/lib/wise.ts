import axios from 'axios';

export interface WiseTransaction {
  id: string;
  amount: {
    value: number;
    currency: string;
  };
  description: string;
  date: string;
  type: 'income' | 'expense';
}

export class WiseAPI {
  private apiToken: string;
  private baseURL = 'https://api.wise.com';

  constructor(apiToken: string) {
    this.apiToken = apiToken;
  }

  async getTransactions(profileId: string, from?: string, to?: string): Promise<WiseTransaction[]> {
    try {
      const response = await axios.get(`${this.baseURL}/v3/profiles/${profileId}/transfers`, {
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json'
        },
        params: {
          from: from,
          to: to,
          limit: 100
        }
      });

      return response.data.map((transfer: any) => ({
        id: transfer.id,
        amount: {
          value: parseFloat(transfer.sourceAmount.value),
          currency: transfer.sourceAmount.currency
        },
        description: transfer.reference || 'Transfer',
        date: transfer.created,
        type: transfer.status === 'completed' ? 'expense' : 'pending'
      }));
    } catch (error) {
      console.error('Error fetching Wise transactions:', error);
      throw new Error('Failed to fetch Wise transactions');
    }
  }

  async getProfiles(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseURL}/v1/profiles`, {
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching Wise profiles:', error);
      throw new Error('Failed to fetch Wise profiles');
    }
  }
} 