import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'neno-finance.db');
const db = new Database(dbPath);

// 初始化数据库表
export function initDatabase() {
  // 交易记录表
  db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      amount REAL NOT NULL,
      currency TEXT DEFAULT 'USD',
      description TEXT,
      category TEXT,
      type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
      source TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 发票表
  db.exec(`
    CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email_id TEXT,
      subject TEXT,
      sender TEXT,
      amount REAL,
      currency TEXT DEFAULT 'USD',
      date TEXT,
      status TEXT DEFAULT 'pending',
      transaction_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (transaction_id) REFERENCES transactions (id)
    )
  `);

  // 账户配置表
  db.exec(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      api_key TEXT,
      api_secret TEXT,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 分类表
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
      color TEXT DEFAULT '#3B82F6',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 插入默认分类
  const defaultCategories = [
    { name: '工资收入', type: 'income', color: '#10B981' },
    { name: '服务收入', type: 'income', color: '#3B82F6' },
    { name: '餐饮', type: 'expense', color: '#F59E0B' },
    { name: '交通', type: 'expense', color: '#EF4444' },
    { name: '办公用品', type: 'expense', color: '#8B5CF6' },
    { name: '软件订阅', type: 'expense', color: '#06B6D4' },
  ];

  const insertCategory = db.prepare(`
    INSERT OR IGNORE INTO categories (name, type, color) VALUES (?, ?, ?)
  `);

  defaultCategories.forEach(category => {
    insertCategory.run(category.name, category.type, category.color);
  });
}

export default db; 