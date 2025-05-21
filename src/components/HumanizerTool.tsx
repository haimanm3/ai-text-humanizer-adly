import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from './ui/Button';
import { Copy, Check, Save, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useHumanizerStore } from '../store/humanizerStore';
import { useAuthStore } from '../store/authStore';

export const HumanizerTool: React.FC = () => {
  const { originalText, humanizedText, isHumanizing, setOriginalText, humanizeText, clearText } = useHumanizerStore();
  const { user, profile } = useAuthStore();
  const [isCopied, setIsCopied] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveTitle, setSaveTitle] = useState('');

  const handleCopy = async () => {
    if (!humanizedText) return;
    
    await navigator.clipboard.writeText(humanizedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!user) {
      // TODO: Redirect to login or show login modal
      return;
    }
    
    if (humanizedText) {
      setShowSaveDialog(true);
    }
  };
  
  const confirmSave = async () => {
    await useHumanizerStore.getState().saveHumanizedText(saveTitle || undefined);
    setShowSaveDialog(false);
    setSaveTitle('');
  };

  const creditCost = Math.max(1, Math.ceil(originalText.length / 500));

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 flex-1">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">Original Text</h3>
              <div className="text-xs text-gray-500">
                {originalText.length} characters
                {user && (
                  <span className="ml-2">
                    Cost: {creditCost} credit{creditCost !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
            <TextareaAutosize
              className="w-full min-h-[300px] resize-none border-0 focus:ring-0 text-gray-800 placeholder-gray-400 bg-transparent p-0"
              placeholder="Paste your AI-generated text here..."
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-between">
            <Button
              variant="outline"
              onClick={clearText}
              disabled={!originalText || isHumanizing}
            >
              Clear
            </Button>
            
            <Button
              onClick={humanizeText}
              disabled={!originalText || isHumanizing}
              isLoading={isHumanizing}
            >
              {isHumanizing ? 'Humanizing...' : 'Humanize Text'}
            </Button>
          </div>
        </div>
        
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 flex-1">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">Humanized Text</h3>
              <div className="text-xs text-gray-500">
                {humanizedText.length} characters
              </div>
            </div>
            <TextareaAutosize
              className="w-full min-h-[300px] resize-none border-0 focus:ring-0 text-gray-800 placeholder-gray-400 bg-transparent p-0"
              placeholder="Your humanized text will appear here..."
              value={humanizedText}
              readOnly
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={handleCopy}
              disabled={!humanizedText}
            >
              {isCopied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {isCopied ? 'Copied!' : 'Copy'}
            </Button>
            
            {user && (
              <Button 
                onClick={handleSave}
                disabled={!humanizedText}
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Save Humanized Text</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title (optional)
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter a title for this text"
                value={saveTitle}
                onChange={(e) => setSaveTitle(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowSaveDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={confirmSave}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};