import { NextRequest, NextResponse } from 'next/server';
import db, { initDatabase } from '@/lib/database';

// 初始化数据库
initDatabase();

export async function GET() {
  try {
    const categories = db.prepare(`
      SELECT * FROM categories 
      ORDER BY type, name
    `).all();

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type, color } = body;

    const insertCategory = db.prepare(`
      INSERT INTO categories (name, type, color)
      VALUES (?, ?, ?)
    `);

    const result = insertCategory.run(name, type, color);

    return NextResponse.json({ 
      id: result.lastInsertRowid,
      message: 'Category created successfully' 
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
} 