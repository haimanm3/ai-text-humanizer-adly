import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface HumanizedText {
  id: string;
  title: string | null;
  originalText: string;
  humanizedText: string;
  createdAt: string;
  creditsUsed: number;
}

interface HumanizerState {
  originalText: string;
  humanizedText: string;
  isHumanizing: boolean;
  savedTexts: HumanizedText[];
  error: string | null;
  isLoading: boolean;
  setOriginalText: (text: string) => void;
  humanizeText: () => Promise<void>;
  saveHumanizedText: (title?: string) => Promise<void>;
  fetchSavedTexts: () => Promise<void>;
  clearText: () => void;
}

export const useHumanizerStore = create<HumanizerState>((set, get) => ({
  originalText: '',
  humanizedText: '',
  isHumanizing: false,
  savedTexts: [],
  error: null,
  isLoading: false,
  
  setOriginalText: (text: string) => {
    set({ originalText: text });
  },
  
  humanizeText: async () => {
    const { originalText } = get();
    if (!originalText.trim()) {
      set({ error: 'Please enter some text to humanize' });
      return;
    }
    
    try {
      set({ isHumanizing: true, error: null });
      
      // Mock API call - in a real app, we'd call the Undetectable AI API here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate a humanized version of the text
      const humanized = originalText
        .split('.')
        .map(sentence => {
          // Randomly modify sentence structure slightly
          const words = sentence.trim().split(' ');
          if (words.length > 5) {
            const idx = Math.floor(Math.random() * (words.length - 3)) + 1;
            // Swap two words or add a filler word
            [words[idx], words[idx + 1]] = [words[idx + 1], words[idx]];
          }
          return words.join(' ');
        })
        .join('. ');
        
      set({ humanizedText: humanized });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isHumanizing: false });
    }
  },
  
  saveHumanizedText: async (title?: string) => {
    const { originalText, humanizedText } = get();
    const user = await supabase.auth.getUser();
    
    if (!user.data.user) {
      set({ error: 'You must be logged in to save texts' });
      return;
    }
    
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('humanized_texts')
        .insert({
          user_id: user.data.user.id,
          original_text: originalText,
          humanized_text: humanizedText,
          title: title || null,
          credits_used: Math.max(1, Math.ceil(originalText.length / 500)),
        })
        .select()
        .single();
        
      if (error) throw new Error(error.message);
      
      // Update credit count in profile
      const creditsUsed = Math.max(1, Math.ceil(originalText.length / 500));
      await supabase.rpc('decrement_credits', { credit_amount: creditsUsed });
      
      // Add to saved texts
      set(state => ({
        savedTexts: [
          {
            id: data.id,
            title: data.title,
            originalText: data.original_text,
            humanizedText: data.humanized_text,
            createdAt: data.created_at,
            creditsUsed: data.credits_used,
          },
          ...state.savedTexts,
        ],
      }));
      
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  fetchSavedTexts: async () => {
    const user = await supabase.auth.getUser();
    
    if (!user.data.user) {
      return;
    }
    
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('humanized_texts')
        .select('*')
        .eq('user_id', user.data.user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw new Error(error.message);
      
      set({
        savedTexts: data.map(item => ({
          id: item.id,
          title: item.title,
          originalText: item.original_text,
          humanizedText: item.humanized_text,
          createdAt: item.created_at,
          creditsUsed: item.credits_used,
        })),
      });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  clearText: () => {
    set({ originalText: '', humanizedText: '' });
  },
}));