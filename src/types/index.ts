export interface Profile {
  id: string; // Supabase user ID (uuid)
  name: string;
  email: string;
  // Add other profile properties here, e.g., avatar_url, role
  avatar_url?: string | null;
  role?: 'user' | 'admin'; // Example role
}

// Add other shared types here
