import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HumanizerTool } from '../components/HumanizerTool';
import { Button } from '../components/ui/Button';
import { 
  Shield, 
  Zap, 
  Check, 
  PenSquare,
  Bot,
  UserCheck,
  BarChart3,
  XCircle
} from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Make AI Text Sound Human
            </motion.h1>
            <motion.p 
              className="max-w-2xl mx-auto text-xl text-indigo-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Instantly transform AI-generated content into natural, human-like text that bypasses AI detection tools.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/signup">
                <Button size="lg" className="font-medium">
                  Try For Free
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-700 font-medium">
                  View Pricing
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Humanizer Tool Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Try Our AI Humanizer</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Paste your AI-generated text below and see the magic happen.
            </p>
          </div>
          
          <HumanizerTool />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose HumanizerAI?</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Our advanced AI humanizer offers several benefits to make your content sound naturally human-written.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-indigo-600 mb-4">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bypass AI Detection</h3>
              <p className="text-gray-600">
                Our humanized text successfully bypasses all major AI detection tools including GPTZero, Turnitin, and Copyleaks.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-indigo-600 mb-4">
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Humanize your text in seconds, not minutes. Our tool works quickly to save you time.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-indigo-600 mb-4">
                <UserCheck className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Natural Human Text</h3>
              <p className="text-gray-600">
                Our advanced algorithms create text that maintains your original meaning while sounding naturally human-written.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Transforming AI text into human-like content is simple with our powerful tool.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <PenSquare className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 1: Paste Your Text</h3>
              <p className="text-gray-600">
                Copy and paste your AI-generated text into our humanizer tool.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 2: Humanize</h3>
              <p className="text-gray-600">
                Click the "Humanize" button and let our advanced AI work its magic.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 3: Use Your Text</h3>
              <p className="text-gray-600">
                Copy your humanized text and use it confidently without fear of AI detection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Text vs. Humanized Text</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              See the difference our humanizer makes in transforming robot-like AI text into natural human writing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <Bot className="h-6 w-6 text-red-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">AI-Generated Text</h3>
              </div>
              <div className="bg-white rounded p-4 border border-gray-200">
                <p className="text-gray-700 italic">
                  "Artificial intelligence is a branch of computer science that aims to create systems capable of performing tasks that would normally require human intelligence. These tasks include visual perception, speech recognition, decision-making, and translation between languages."
                </p>
              </div>
              <div className="mt-4 flex items-center text-red-500">
                <XCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Detected as AI (98% probability)</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <UserCheck className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Humanized Text</h3>
              </div>
              <div className="bg-white rounded p-4 border border-gray-200">
                <p className="text-gray-700">
                  "AI, or artificial intelligence, is an exciting field within computer science. It focuses on building systems that can handle tasks typically requiring human smarts. These include things like seeing and understanding images, recognizing people's speech, making complex decisions, and even translating between different languages."
                </p>
              </div>
              <div className="mt-4 flex items-center text-green-500">
                <Check className="h-5 w-5 mr-2" />
                <span className="font-medium">Passes as Human (96% confidence)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Humanize Your AI Text?</h2>
            <p className="max-w-2xl mx-auto text-indigo-100 text-lg mb-8">
              Sign up today and get 100 free credits to start transforming your AI-generated content.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button className="bg-white text-indigo-600 hover:bg-indigo-50" size="lg">
                  Sign Up Free
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600" size="lg">
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};