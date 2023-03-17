export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      favourites: {
        Row: {
          chapio_id: string | null
          created_at: string
          id: string
          status: boolean | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          chapio_id?: string | null
          created_at?: string
          id?: string
          status?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          chapio_id?: string | null
          created_at?: string
          id?: string
          status?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
      }
      likes: {
        Row: {
          chapio_id: string | null
          created_at: string
          id: string
          status: boolean | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          chapio_id?: string | null
          created_at?: string
          id?: string
          status?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          chapio_id?: string | null
          created_at?: string
          id?: string
          status?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
      }
      michapio: {
        Row: {
          chapio: string
          created_at: string
          deleted: boolean | null
          description: string | null
          fts: unknown | null
          id: string
          origin: string
          updated_at: string
          user_id: string | null
          views: number
        }
        Insert: {
          chapio: string
          created_at?: string
          deleted?: boolean | null
          description?: string | null
          fts?: unknown | null
          id?: string
          origin: string
          updated_at?: string
          user_id?: string | null
          views?: number
        }
        Update: {
          chapio?: string
          created_at?: string
          deleted?: boolean | null
          description?: string | null
          fts?: unknown | null
          id?: string
          origin?: string
          updated_at?: string
          user_id?: string | null
          views?: number
        }
      }
      users: {
        Row: {
          created_at: string
          deleted: boolean | null
          email: string | null
          id: string
          password: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          email?: string | null
          id: string
          password: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          email?: string | null
          id?: string
          password?: string
          updated_at?: string
          username?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
