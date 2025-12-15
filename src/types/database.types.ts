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
      qr_codes: {
        Row: {
          id: string
          user_id: string | null
          content_type: string
          content: string
          qr_color: string
          bg_color: string
          size: number
          logo_url: string | null
          error_correction: string
          corner_style: string
          template_name: string | null
          qr_data_url: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          content_type?: string
          content: string
          qr_color?: string
          bg_color?: string
          size?: number
          logo_url?: string | null
          error_correction?: string
          corner_style?: string
          template_name?: string | null
          qr_data_url: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          content_type?: string
          content?: string
          qr_color?: string
          bg_color?: string
          size?: number
          logo_url?: string | null
          error_correction?: string
          corner_style?: string
          template_name?: string | null
          qr_data_url?: string
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
