import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  creditsRemaining: number;
  planType: string;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  isLoading: false,
  error: null,
  
  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw new Error(error.message);
      
      // Set user immediately after successful sign in
      set({ user: data.user });
      
      // Fetch user profile
      if (data.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) throw new Error(profileError.message);
        
        set({
          profile: {
            id: profileData.id,
            email: profileData.email,
            fullName: profileData.full_name,
            avatarUrl: profileData.avatar_url,
            creditsRemaining: profileData.credits_remaining,
            planType: profileData.plan_type,
          },
        });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  signUp: async (email: string, password: string, fullName: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      
      if (error) throw new Error(error.message);
      if (!data.user) throw new Error('Signup failed');
      
      // Set user immediately
      set({ user: data.user });
      
      // Create profile in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email,
          full_name: fullName,
          credits_remaining: 100, // Default free credits
          plan_type: 'free',
        });
      
      if (profileError) throw new Error(profileError.message);
      
      // Fetch the created profile
      const { data: profileData, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (fetchError) throw new Error(fetchError.message);
      
      set({
        profile: {
          id: profileData.id,
          email: profileData.email,
          fullName: profileData.full_name,
          avatarUrl: profileData.avatar_url,
          creditsRemaining: profileData.credits_remaining,
          planType: profileData.plan_type,
        },
      });
    } catch (error) {
      set({ error: (error as Error).message });
      // Clean up on error
      set({ user: null, profile: null });
    } finally {
      set({ isLoading: false });
    }
  },
  
  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
      set({ user: null, profile: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  fetchProfile: async () => {
    const { user } = get();
    if (!user) return;
    
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) throw new Error(error.message);
      
      set({
        profile: {
          id: data.id,
          email: data.email,
          fullName: data.full_name,
          avatarUrl: data.avatar_url,
          creditsRemaining: data.credits_remaining,
          planType: data.plan_type,
        },
      });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));