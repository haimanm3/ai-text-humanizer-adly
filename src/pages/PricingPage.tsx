import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Check } from 'lucide-react';

interface PricingTier {
  name: string;
  description: string;
  price: number;
  frequency: string;
  credits: number;
  features: string[];
  highlight?: boolean;
  buttonText: string;
}

export const PricingPage: React.FC = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: 'Free',
      description: 'For occasional use',
      price: 0,
      frequency: 'forever',
      credits: 100,
      features: [
        '100 free credits',
        'Humanize up to 50,000 characters',
        'Standard humanization quality',
        'Basic support',
      ],
      buttonText: 'Get Started',
    },
    {
      name: 'Pro',
      description: 'For regular content creators',
      price: 19.99,
      frequency: 'per month',
      credits: 1000,
      features: [
        '1,000 credits monthly',
        'Humanize up to 500,000 characters',
        'Advanced humanization quality',
        'Priority email support',
        'Save humanized texts',
        'Download in multiple formats',
      ],
      highlight: true,
      buttonText: 'Get Pro',
    },
    {
      name: 'Business',
      description: 'For teams and agencies',
      price: 99.99,
      frequency: 'per month',
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
      buttonText: 'Contact Sales',
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p 
            className="max-w-2xl mx-auto text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose the plan that's right for you and start humanizing your AI text today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`bg-white rounded-lg shadow-sm overflow-hidden border ${
                tier.highlight 
                  ? 'border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50' 
                  : 'border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {tier.highlight && (
                <div className="bg-indigo-500 text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                <p className="text-gray-600 mt-1">{tier.description}</p>
                
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">${tier.price}</span>
                  <span className="ml-1 text-xl font-medium text-gray-500">/{tier.frequency}</span>
                </div>
                
                <p className="mt-2 text-sm text-gray-500">
                  <span className="font-medium text-gray-900">{tier.credits.toLocaleString()}</span> credits included
                </p>
                
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <Link to={tier.name === 'Free' ? '/signup' : '/contact'}>
                    <Button
                      className={`w-full ${
                        tier.highlight 
                          ? 'bg-indigo-600 hover:bg-indigo-700' 
                          : ''
                      }`}
                      variant={tier.highlight ? 'default' : 'outline'}
                    >
                      {tier.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            <div>
              <h3 className="text-lg font-medium text-gray-900">What are credits?</h3>
              <p className="mt-2 text-gray-600">
                Credits are used to humanize text. One credit typically allows you to humanize approximately 500 characters of text.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Do unused credits roll over?</h3>
              <p className="mt-2 text-gray-600">
                For paid plans, unused credits roll over for one month. Free plan credits expire after 30 days.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Can I upgrade or downgrade anytime?</h3>
              <p className="mt-2 text-gray-600">
                Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades apply at the end of your billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Is there a limit to how much text I can humanize?</h3>
              <p className="mt-2 text-gray-600">
                The limit depends on your plan and available credits. Free and Pro plans have character limits per month, while Business plans offer unlimited characters.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Do you offer team or enterprise plans?</h3>
              <p className="mt-2 text-gray-600">
                Yes, our Business plan is designed for teams. For enterprise needs, please contact us for a custom solution.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">How accurate is the humanization?</h3>
              <p className="mt-2 text-gray-600">
                Our humanization technology has a 95%+ success rate at bypassing AI detection tools. Higher tier plans offer more advanced humanization algorithms.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a custom plan?</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-6">
            We offer custom solutions for enterprise clients with specialized needs. Let's discuss your requirements.
          </p>
          <Link to="/contact">
            <Button size="lg">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};