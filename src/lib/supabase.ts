import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

// This is a placeholder type - in a real project, you would generate these types
// from your Supabase database
export interface Database {
  public: {
    Tables: {
      partners: {
        Row: {
          id: string;
          name: string;
          logo: string | null;
          type: string;
          tier: string;
          status: string;
          region: string | null;
          contact_name: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          address: string | null;
          join_date: string;
          last_activity: string;
          sales_ytd: number;
          target_achievement: number;
          certifications: string[] | null;
          created_at: string;
          updated_at: string;
          user_id: string;
        };
      };
      vendors: {
        Row: {
          id: string;
          name: string;
          logo: string | null;
          category: string | null;
          primary_contact_name: string | null;
          primary_contact_email: string | null;
          primary_contact_phone: string | null;
          partner_since: string;
          contract_renewal: string | null;
          status: string;
          created_at: string;
          updated_at: string;
          user_id: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          sku: string | null;
          category: string | null;
          vendor_id: string | null;
          vendor_name: string | null;
          description: string | null;
          price: number;
          msrp: number;
          discount: number;
          stock: number;
          image: string | null;
          status: string;
          features: string[] | null;
          certification_required: boolean;
          created_at: string;
          updated_at: string;
          user_id: string;
        };
      };
      deals: {
        Row: {
          id: string;
          partner_id: string | null;
          partner_name: string | null;
          products: any;
          total_value: number;
          status: string;
          probability: number;
          expected_close_date: string | null;
          actual_close_date: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
          user_id: string;
        };
      };
      marketing_campaigns: {
        Row: {
          id: string;
          name: string;
          type: string;
          status: string;
          start_date: string | null;
          end_date: string | null;
          budget: number;
          target_partners: string[] | null;
          target_products: string[] | null;
          description: string | null;
          metrics: any;
          created_at: string;
          updated_at: string;
          user_id: string;
        };
      };
      training_programs: {
        Row: {
          id: string;
          name: string;
          type: string;
          status: string;
          start_date: string | null;
          end_date: string | null;
          description: string | null;
          target_partners: string[] | null;
          target_products: string[] | null;
          enrolled_partners: string[] | null;
          completed_partners: string[] | null;
          materials: any;
          created_at: string;
          updated_at: string;
          user_id: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          title: string;
          message: string;
          type: string;
          read: boolean;
          date: string;
          link: string | null;
          user_id: string;
          created_at: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          role: string;
          avatar: string | null;
          department: string | null;
          permissions: string[] | null;
          created_at: string;
          updated_at: string;
        };
      };
      // Add the new app_settings table type
      app_settings: {
        Row: {
          id: string;
          app_name: string;
          logo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          app_name?: string;
          logo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          app_name?: string;
          logo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
