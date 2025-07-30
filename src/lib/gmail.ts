import { google } from 'googleapis';

export interface GmailInvoice {
  id: string;
  subject: string;
  sender: string;
  date: string;
  snippet: string;
  amount?: number;
  currency?: string;
}

export class GmailAPI {
  private auth: any;
  private gmail: any;

  constructor(accessToken: string) {
    this.auth = new google.auth.OAuth2();
    this.auth.setCredentials({ access_token: accessToken });
    this.gmail = google.gmail({ version: 'v1', auth: this.auth });
  }

  async getInvoices(maxResults: number = 50): Promise<GmailInvoice[]> {
    try {
      // 搜索包含发票关键词的邮件
      const query = 'subject:(invoice OR receipt OR bill) OR body:(invoice OR receipt OR bill)';
      
      const response = await this.gmail.users.messages.list({
        userId: 'me',
        q: query,
        maxResults: maxResults
      });

      const messages = response.data.messages || [];
      const invoices: GmailInvoice[] = [];

      for (const message of messages) {
        const messageDetails = await this.gmail.users.messages.get({
          userId: 'me',
          id: message.id!
        });

        const headers = messageDetails.data.payload?.headers;
        const subject = headers?.find((h: any) => h.name === 'Subject')?.value || '';
        const sender = headers?.find((h: any) => h.name === 'From')?.value || '';
        const date = headers?.find((h: any) => h.name === 'Date')?.value || '';

        // 简单的金额提取逻辑（可以根据需要改进）
        const amountMatch = subject.match(/\$?(\d+(?:\.\d{2})?)/);
        const amount = amountMatch ? parseFloat(amountMatch[1]) : undefined;

        invoices.push({
          id: message.id!,
          subject,
          sender,
          date,
          snippet: messageDetails.data.snippet || '',
          amount,
          currency: 'USD'
        });
      }

      return invoices;
    } catch (error) {
      console.error('Error fetching Gmail invoices:', error);
      throw new Error('Failed to fetch Gmail invoices');
    }
  }

  async getMessageContent(messageId: string): Promise<string> {
    try {
      const response = await this.gmail.users.messages.get({
        userId: 'me',
        id: messageId,
        format: 'full'
      });

      const payload = response.data.payload;
      if (payload?.body?.data) {
        return Buffer.from(payload.body.data, 'base64').toString('utf-8');
      } else if (payload?.parts) {
        // 处理多部分邮件
        for (const part of payload.parts) {
          if (part.mimeType === 'text/plain' && part.body?.data) {
            return Buffer.from(part.body.data, 'base64').toString('utf-8');
          }
        }
      }

      return '';
    } catch (error) {
      console.error('Error fetching message content:', error);
      return '';
    }
  }
} 