import { NextRequest, NextResponse } from 'next/server';
import db, { initDatabase } from '@/lib/database';

// 初始化数据库
initDatabase();

export async function GET() {
  try {
    const transactions = db.prepare(`
      SELECT * FROM transactions 
      ORDER BY date DESC 
      LIMIT 100
    `).all();

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, amount, currency, description, category, type, source } = body;

    const insertTransaction = db.prepare(`
      INSERT INTO transactions (date, amount, currency, description, category, type, source)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertTransaction.run(date, amount, currency, description, category, type, source);

    return NextResponse.json({ 
      id: result.lastInsertRowid,
      message: 'Transaction created successfully' 
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
} 