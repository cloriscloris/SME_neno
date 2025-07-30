'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Key, Mail } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [wiseToken, setWiseToken] = useState('');
  const [gmailToken, setGmailToken] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // 这里可以添加保存到数据库的逻辑
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟保存
      alert('设置已保存');
    } catch (error) {
      alert('保存失败');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-8">
        {/* 头部 */}
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">设置</h1>
            <p className="text-gray-600 mt-2">配置您的API连接</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wise API 配置 */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-blue-600" />
                <CardTitle>Wise API 配置</CardTitle>
              </div>
              <CardDescription>
                配置您的Wise账户API令牌以同步交易数据
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="wise-token">API 令牌</Label>
                <Input
                  id="wise-token"
                  type="password"
                  placeholder="输入您的Wise API令牌"
                  value={wiseToken}
                  onChange={(e) => setWiseToken(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="text-sm text-gray-500">
                <p>• 在Wise开发者平台获取API令牌</p>
                <p>• 确保令牌具有读取交易记录的权限</p>
              </div>
            </CardContent>
          </Card>

          {/* Gmail API 配置 */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-green-600" />
                <CardTitle>Gmail API 配置</CardTitle>
              </div>
              <CardDescription>
                配置Gmail API以自动识别发票邮件
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="gmail-token">访问令牌</Label>
                <Input
                  id="gmail-token"
                  type="password"
                  placeholder="输入您的Gmail访问令牌"
                  value={gmailToken}
                  onChange={(e) => setGmailToken(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="text-sm text-gray-500">
                <p>• 通过Google OAuth获取访问令牌</p>
                <p>• 需要Gmail读取权限</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 保存按钮 */}
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="px-8"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                保存中...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                保存设置
              </>
            )}
          </Button>
        </div>

        {/* 使用说明 */}
        <Card className="mt-8 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>使用说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Wise API 设置</h4>
                <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                  <li>访问 Wise 开发者平台</li>
                  <li>创建新的API应用程序</li>
                  <li>获取API令牌</li>
                  <li>将令牌粘贴到上方输入框</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Gmail API 设置</h4>
                <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                  <li>访问 Google Cloud Console</li>
                  <li>启用 Gmail API</li>
                  <li>创建OAuth 2.0凭据</li>
                  <li>获取访问令牌</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 