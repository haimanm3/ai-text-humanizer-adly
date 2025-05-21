import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';
import { CreditCard, Shield, CheckCircle2, AlertCircle, DivideIcon as LucideIcon, Package } from 'lucide-react';

interface PlanOption {
  id: string;
  name: string;
  description: string;
  price: number;
  frequency: string;
  credits: number;
  features: string[];
  current?: boolean;
}

export const BillingPage: React.FC = () => {
  const { profile } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState<'subscription' | 'payment' | 'history'>('subscription');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  
  // Card details state
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });
  
  const getCurrentPlan = (): string => {
    return profile?.planType || 'free';
  };
  
  const planOptions: PlanOption[] = [
    {
      id: 'free',
      name: 'Free',
      description: 'Basic features for occasional use',
      price: 0,
      frequency: 'forever',
      credits: 100,
      features: [
        '100 free credits',
        'Humanize up to 50,000 characters',
        'Standard humanization quality',
        'Basic support',
      ],
      current: getCurrentPlan() === 'free',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Advanced features for content creators',
      price: 19.99,
      frequency: 'month',
      credits: 1000,
      features: [
        '1,000 credits monthly',
        'Humanize up to 500,000 characters',
        'Advanced humanization quality',
        'Priority email support',
        'Save humanized texts',
        'Download in multiple formats',
      ],
      current: getCurrentPlan() === 'pro',
    },
    {
      id: 'business',
      name: 'Business',
      description: 'Enterprise-grade for teams',
      price: 99.99,
      frequency: 'month',
      credits: 10000,
      features: [
        '10,000 credits monthly',
        'Unlimited characters',
        'Premium humanization quality',
        'Priority support with dedicated manager',
        'Team collaboration features',
        'API access',
        'Custom dictionaries',
      ],
      current: getCurrentPlan() === 'business',
    },
  ];
  
  // Credit pack options
  const creditPacks = [
    { id: 'small', amount: 500, price: 9.99 },
    { id: 'medium', amount: 1000, price: 17.99 },
    { id: 'large', amount: 2500, price: 39.99 },
  ];
  
  // Transaction history (sample data)
  const transactions = [
    { id: '1', date: '2023-09-20', type: 'subscription', amount: 19.99, status: 'completed' },
    { id: '2', date: '2023-08-20', type: 'subscription', amount: 19.99, status: 'completed' },
    { id: '3', date: '2023-07-20', type: 'credits', amount: 9.99, status: 'completed' },
  ];
  
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };
  
  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'number') {
      // Format card number with spaces after every 4 digits
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
      
      setCardDetails(prev => ({ ...prev, number: formattedValue }));
      return;
    }
    
    if (name === 'expiry') {
      // Format expiry as MM/YY
      const formattedValue = value
        .replace(/\//g, '')
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .slice(0, 5);
      
      setCardDetails(prev => ({ ...prev, expiry: formattedValue }));
      return;
    }
    
    if (name === 'cvc') {
      // Limit CVC to 3-4 digits
      const formattedValue = value.slice(0, 4).replace(/\D/g, '');
      setCardDetails(prev => ({ ...prev, cvc: formattedValue }));
      return;
    }
    
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setPaymentProcessed(true);
    
    // Reset after showing success message
    setTimeout(() => {
      setPaymentProcessed(false);
      setSelectedPlan(null);
      setCardDetails({
        number: '',
        name: '',
        expiry: '',
        cvc: '',
      });
    }, 3000);
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
          <p className="text-gray-600 mt-1">
            Manage your plan, payment methods, and billing history.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex space-x-8">
            <button
              className={`pb-4 px-1 ${
                selectedTab === 'subscription'
                  ? 'border-b-2 border-indigo-500 text-indigo-600 font-medium'
                  : 'text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTab('subscription')}
            >
              Subscription
            </button>
            <button
              className={`pb-4 px-1 ${
                selectedTab === 'payment'
                  ? 'border-b-2 border-indigo-500 text-indigo-600 font-medium'
                  : 'text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTab('payment')}
            >
              Payment Methods
            </button>
            <button
              className={`pb-4 px-1 ${
                selectedTab === 'history'
                  ? 'border-b-2 border-indigo-500 text-indigo-600 font-medium'
                  : 'text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTab('history')}
            >
              Billing History
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        {selectedTab === 'subscription' && (
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Current Plan</h2>
                    <p className="text-gray-600 mt-1">
                      You are currently on the {getCurrentPlan() === 'free' ? 'Free' : getCurrentPlan() === 'pro' ? 'Pro' : 'Business'} plan.
                    </p>
                  </div>
                  <div className="flex items-center bg-indigo-100 px-3 py-1 rounded-full">
                    <Package className="h-4 w-4 text-indigo-600 mr-1" />
                    <span className="text-sm font-medium text-indigo-600">
                      {getCurrentPlan() === 'free' ? 'Free' : getCurrentPlan() === 'pro' ? 'Pro' : 'Business'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Credits</span>
                    <span className="font-medium text-gray-900">{profile?.creditsRemaining || 0} remaining</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600">Renewal Date</span>
                    <span className="font-medium text-gray-900">
                      {getCurrentPlan() === 'free' ? 'N/A' : 'October 20, 2023'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Available Plans</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {planOptions.map((plan) => (
                    <div 
                      key={plan.id}
                      className={`border rounded-lg overflow-hidden ${
                        plan.current 
                          ? 'border-indigo-500 ring-1 ring-indigo-500' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="p-5">
                        <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
                        <p className="text-gray-600 text-sm mt-1">{plan.description}</p>
                        
                        <div className="mt-4 flex items-baseline">
                          <span className="text-2xl font-bold text-gray-900">${plan.price}</span>
                          {plan.price > 0 && (
                            <span className="ml-1 text-gray-600">/{plan.frequency}</span>
                          )}
                        </div>
                        
                        <ul className="mt-4 space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-6">
                          {plan.current ? (
                            <div className="bg-indigo-50 text-indigo-700 py-2 px-4 rounded text-sm font-medium text-center">
                              Current Plan
                            </div>
                          ) : (
                            <Button
                              variant={plan.price === 0 ? 'outline' : 'default'}
                              className="w-full"
                              onClick={() => handlePlanSelect(plan.id)}
                            >
                              {plan.price === 0 ? 'Downgrade to Free' : `Upgrade to ${plan.name}`}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Credit Packs</h3>
                  <p className="text-gray-600 mb-4">
                    Need more credits without changing your plan? Purchase a one-time credit pack.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {creditPacks.map((pack) => (
                      <div key={pack.id} className="border border-gray-200 rounded-lg p-5 hover:border-gray-300">
                        <h4 className="text-lg font-semibold text-gray-900">{pack.amount} Credits</h4>
                        <p className="text-2xl font-bold text-gray-900 mt-2">${pack.price}</p>
                        <p className="text-gray-600 text-sm mt-1">One-time purchase</p>
                        
                        <div className="mt-6">
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handlePlanSelect(`credits-${pack.id}`)}
                          >
                            Buy Credits
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Modal */}
            {selectedPlan && (
              <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg max-w-md w-full">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-gray-900">
                        {selectedPlan.startsWith('credits') 
                          ? 'Purchase Credits' 
                          : `Subscribe to ${
                              selectedPlan === 'free' ? 'Free' : 
                              selectedPlan === 'pro' ? 'Pro' : 'Business'
                            } Plan`
                        }
                      </h3>
                      <button 
                        onClick={() => setSelectedPlan(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {paymentProcessed ? (
                    <div className="p-6 text-center">
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Successful!</h3>
                      <p className="text-gray-600 mb-4">
                        {selectedPlan.startsWith('credits')
                          ? 'Your credits have been added to your account.'
                          : 'Your subscription has been updated successfully.'}
                      </p>
                      <Button
                        onClick={() => {
                          setPaymentProcessed(false);
                          setSelectedPlan(null);
                        }}
                      >
                        Done
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handlePayment} className="p-6">
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <Input
                            id="card-number"
                            name="number"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardDetails.number}
                            onChange={handleCardDetailsChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
                            Cardholder Name
                          </label>
                          <Input
                            id="card-name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={cardDetails.name}
                            onChange={handleCardDetailsChange}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <Input
                              id="card-expiry"
                              name="expiry"
                              type="text"
                              placeholder="MM/YY"
                              value={cardDetails.expiry}
                              onChange={handleCardDetailsChange}
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="card-cvc" className="block text-sm font-medium text-gray-700 mb-1">
                              CVC
                            </label>
                            <Input
                              id="card-cvc"
                              name="cvc"
                              type="text"
                              placeholder="123"
                              value={cardDetails.cvc}
                              onChange={handleCardDetailsChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 bg-gray-50 p-4 rounded border border-gray-200">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">
                            {selectedPlan.startsWith('credits') 
                              ? 'Credit Pack' 
                              : 'Subscription'}
                          </span>
                          <span className="font-medium">
                            {selectedPlan.startsWith('credits') 
                              ? `${
                                  selectedPlan === 'credits-small' ? '500' :
                                  selectedPlan === 'credits-medium' ? '1,000' : '2,500'
                                } Credits` 
                              : `${
                                  selectedPlan === 'free' ? 'Free' :
                                  selectedPlan === 'pro' ? 'Pro' : 'Business'
                                } Plan`
                            }
                          </span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span>
                            ${
                              selectedPlan === 'free' ? '0.00' :
                              selectedPlan === 'pro' ? '19.99' :
                              selectedPlan === 'business' ? '99.99' :
                              selectedPlan === 'credits-small' ? '9.99' :
                              selectedPlan === 'credits-medium' ? '17.99' : '39.99'
                            }
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex flex-col space-y-3">
                        <Button
                          type="submit"
                          isLoading={isProcessing}
                          disabled={isProcessing}
                        >
                          {isProcessing ? 'Processing...' : 'Pay Now'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedPlan(null)}
                          disabled={isProcessing}
                        >
                          Cancel
                        </Button>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
                        <Shield className="h-4 w-4 mr-1" />
                        <span>Payments are secure and encrypted</span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        
        {selectedTab === 'payment' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
              <p className="text-gray-600 mt-1">
                Manage your payment methods and billing address.
              </p>
            </div>
            
            <div className="p-6">
              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-3 rounded">
                    <CreditCard className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-600">Expires 12/25</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Default
                  </span>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Payment Method
                </Button>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="font-medium text-gray-900">John Doe</p>
                  <p className="text-gray-600 mt-1">
                    123 Main Street<br />
                    Apt 4B<br />
                    San Francisco, CA 94103<br />
                    United States
                  </p>
                  
                  <div className="mt-4">
                    <Button variant="outline" size="sm">Edit Address</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {selectedTab === 'history' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Billing History</h2>
              <p className="text-gray-600 mt-1">
                View and download your past invoices.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {transaction.type === 'subscription' 
                          ? 'Monthly subscription' 
                          : 'Credit purchase'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${transaction.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {transactions.length === 0 && (
              <div className="p-6 text-center">
                <p className="text-gray-600">No billing history available.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};