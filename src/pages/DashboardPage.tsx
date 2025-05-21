import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { useHumanizerStore } from '../store/humanizerStore';
import { formatDate, truncateText } from '../lib/utils';
import { 
  PlusCircle, 
  Clock, 
  CreditCard, 
  ChevronRight,
  Copy,
  Check,
  FileText,
  Trash,
  Eye,
  BarChart3,
  Sparkles,
  AlertCircle 
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { profile } = useAuthStore();
  const { savedTexts, fetchSavedTexts, isLoading } = useHumanizerStore();
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [viewText, setViewText] = useState<{
    id: string;
    title: string | null;
    originalText: string;
    humanizedText: string;
  } | null>(null);
  
  useEffect(() => {
    fetchSavedTexts();
  }, []);
  
  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(id);
    setTimeout(() => setIsCopied(null), 2000);
  };
  
  const handleView = (item: typeof viewText) => {
    setViewText(item);
  };
  
  const closeModal = () => {
    setViewText(null);
  };
  
  // Sample activity data
  const recentActivity = [
    { type: 'humanized', date: '2023-09-15T14:30:00Z', credits: 5, id: '1' },
    { type: 'purchased', date: '2023-09-10T09:15:00Z', credits: 1000, id: '2' },
    { type: 'humanized', date: '2023-09-05T16:45:00Z', credits: 3, id: '3' },
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {profile?.fullName || 'User'}
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your humanized texts and account.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Available Credits</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {profile?.creditsRemaining || 0}
                </h3>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <Sparkles className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/billing">
                <Button variant="outline" size="sm" className="w-full">
                  Get More Credits
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Current Plan</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {profile?.planType === 'free' ? 'Free' : 
                   profile?.planType === 'pro' ? 'Pro' : 
                   profile?.planType === 'business' ? 'Business' : 'Free'}
                </h3>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/pricing">
                <Button variant="outline" size="sm" className="w-full">
                  Upgrade Plan
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Saved Texts</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {savedTexts.length}
                </h3>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/">
                <Button variant="outline" size="sm" className="w-full">
                  Create New
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Saved Texts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Your Saved Texts</h2>
                <Link to="/">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Text
                  </Button>
                </Link>
              </div>
              
              <div className="divide-y divide-gray-200">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-indigo-600 mb-4"></div>
                    <p className="text-gray-600">Loading your saved texts...</p>
                  </div>
                ) : savedTexts.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="inline-block bg-gray-100 p-3 rounded-full mb-4">
                      <FileText className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No saved texts yet</h3>
                    <p className="text-gray-600 mb-4">
                      You haven't saved any humanized texts. Start creating now!
                    </p>
                    <Link to="/">
                      <Button>
                        Create Your First Text
                      </Button>
                    </Link>
                  </div>
                ) : (
                  savedTexts.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.title || 'Untitled Text'}
                          </h3>
                          <p className="text-gray-600 mt-1 text-sm">
                            {truncateText(item.humanizedText, 150)}
                          </p>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{formatDate(item.createdAt)}</span>
                            <span className="mx-2">•</span>
                            <span>{item.creditsUsed} credits used</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleView(item)}
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleCopy(item.humanizedText, item.id)}
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                          >
                            {isCopied === item.id ? 
                              <Check className="h-5 w-5 text-green-500" /> : 
                              <Copy className="h-5 w-5" />
                            }
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Credit Usage */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Credit Usage</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-900">Monthly Usage</span>
                    <span className="text-gray-600">
                      {savedTexts.reduce((sum, item) => sum + item.creditsUsed, 0)} / {
                        profile?.planType === 'free' ? '100' :
                        profile?.planType === 'pro' ? '1,000' :
                        profile?.planType === 'business' ? '10,000' : '100'
                      }
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full"
                      style={{ 
                        width: `${Math.min(
                          100, 
                          (savedTexts.reduce((sum, item) => sum + item.creditsUsed, 0) / 
                            (profile?.planType === 'free' ? 100 :
                             profile?.planType === 'pro' ? 1000 :
                             profile?.planType === 'business' ? 10000 : 100)
                          ) * 100
                        )}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <Link to="/billing" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center mt-2">
                  View usage details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
              {recentActivity.length === 0 ? (
                <p className="text-gray-600 text-sm">No recent activity</p>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className={`p-2 rounded-full ${
                          activity.type === 'humanized' 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {activity.type === 'humanized' ? (
                            <FileText className="h-4 w-4" />
                          ) : (
                            <CreditCard className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.type === 'humanized' 
                            ? 'Humanized a text' 
                            : 'Purchased credits'}
                        </p>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-600">
                            {formatDate(activity.date)}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {activity.type === 'humanized' ? '-' : '+'}{activity.credits} credits
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* View Text Modal */}
      {viewText && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {viewText.title || 'Untitled Text'}
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="overflow-y-auto p-6 max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-2">Original Text</h4>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-wrap">{viewText.originalText}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-2">Humanized Text</h4>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-wrap">{viewText.humanizedText}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-4 bg-gray-50 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={closeModal}
              >
                Close
              </Button>
              <Button
                onClick={() => handleCopy(viewText.humanizedText, viewText.id)}
              >
                {isCopied === viewText.id ? 
                  <Check className="h-4 w-4 mr-2" /> : 
                  <Copy className="h-4 w-4 mr-2" />
                }
                {isCopied === viewText.id ? 'Copied!' : 'Copy Humanized Text'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};