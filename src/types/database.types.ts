export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      humanized_texts: {
        Row: {
          id: string
          user_id: string
          original_text: string
          humanized_text: string
          created_at: string
          title: string | null
          credits_used: number
        }
        Insert: {
          id?: string
          user_id: string
          original_text: string
          humanized_text: string
          created_at?: string
          title?: string | null
          credits_used?: number
        }
        Update: {
          id?: string
          user_id?: string
          original_text?: string
          humanized_text?: string
          created_at?: string
          title?: string | null
          credits_used?: number
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          credits_remaining: number
          plan_type: string
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          credits_remaining?: number
          plan_type?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          credits_remaining?: number
          plan_type?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}