import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User, Subscription } from '@supabase/supabase-js';
import { Profile } from '../types'; // Import the Profile type

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null; // Use the Profile type
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ data: { user: User | null } | null; error: any }>;
  signOut: () => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null); // Use Profile type
  const [loading, setLoading] = useState(true);

  // Use a ref to track if the initial auth state has been processed
  const isInitialLoadHandled = useRef(false);

  console.log('AuthContext: Initializing, loading:', loading);

  useEffect(() => {
    console.log('AuthContext: useEffect running');

    // Flag to track if the component is mounted
    let isMounted = true;

    // Set up auth state change listener
    console.log('AuthContext: Setting up auth state change listener');
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log('AuthContext: onAuthStateChange fired, event:', _event, 'session:', session);

        if (!isMounted) {
          console.log('AuthContext: onAuthStateChange fired, but component unmounted. Aborting state updates.');
          return; // Don't update state if component unmounted
        }

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          console.log('AuthContext: User found in auth state change, fetching profile...');
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (!isMounted) {
            console.log('AuthContext: Profile fetch from auth state change finished, but component unmounted. Aborting state updates.');
            return; // Don't update state if component unmounted
          }

          if (!error) {
            console.log('AuthContext: Profile fetched from auth state change:', data);
            setProfile(data as Profile);
          } else {
            console.error('AuthContext: Error fetching profile from auth state change:', error);
            setProfile(null);
          }
        } else {
          console.log('AuthContext: No user in auth state change.');
          setProfile(null);
        }

        // Set loading to false only after the first auth state change event
        if (!isInitialLoadHandled.current) {
          console.log('AuthContext: First auth state change processed, setting loading to false.');
          setLoading(false);
          isInitialLoadHandled.current = true;
        } else {
           console.log('AuthContext: Subsequent auth state change processed.');
           // For subsequent changes (login/logout), we might want to set loading true temporarily
           // or handle it differently depending on desired UX. For now, keep it simple.
           // If the event is SIGN_IN or SIGN_OUT, you might want to set loading true
           // until the profile fetch/state update is complete.
           if (_event === 'SIGNED_IN' || _event === 'SIGNED_OUT') {
             // You could add logic here to set loading true briefly
             // and then false after state updates, but be careful with race conditions.
             // The current logic relies on the initial load handling.
           }
        }

        console.log('AuthContext: onAuthStateChange finished.');
      }
    );

    // If the listener fires immediately (which it should), loading will be set to false.
    // However, as a fallback for potential edge cases or if the listener is delayed,
    // we can add a timeout to ensure loading is eventually set to false.
    // This is less ideal than relying on the listener, but adds robustness.
    // Let's omit the timeout for now and rely on the listener's immediate fire.
    // If issues persist, a timeout could be considered as a last resort fallback.

    return () => {
      console.log('AuthContext: Cleaning up auth state change listener and setting isMounted to false');
      isMounted = false; // Set flag to false on cleanup
      subscription?.unsubscribe();
    };
  }, []); // Empty dependency array means this runs once on mount

  const signIn = async (email: string, password: string) => {
    console.log('AuthContext: signIn starting, setting loading to true');
    setLoading(true); // Set loading to true when signing in
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('AuthContext: signIn error:', error);
      setLoading(false); // Set loading to false if there's an immediate error
    } else {
      console.log('AuthContext: signIn successful, waiting for onAuthStateChange');
      // onAuthStateChange listener will handle setting loading to false on success
    }
    return { error };
  };

  const signUp = async (email: string, password: string, name: string) => {
    console.log('AuthContext: signUp starting, setting loading to true');
    setLoading(true); // Set loading to true when signing up
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error('AuthContext: signUp error:', error);
      setLoading(false); // Set loading to false if there's an error
      return { data: null, error };
    }

    console.log('AuthContext: signUp successful, user data:', data);

    if (data.user) {
      console.log('AuthContext: Creating profile for new user:', data.user.id);
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: data.user.id, name: name, email: email }]);

      if (profileError) {
        console.error('AuthContext: Error creating profile:', profileError);
        // Decide if you want to set loading to false here or wait for auth state change
        // For now, let's wait for auth state change as it might still fire
      } else {
        console.log('AuthContext: Profile created successfully');
      }
    }

    // Don't set loading to false here as the auth state change will handle it on success
    console.log('AuthContext: signUp finished, waiting for onAuthStateChange');
    return { data, error };
  };

  const signOut = async () => {
    console.log('AuthContext: signOut starting, setting loading to true');
    setLoading(true); // Set loading to true when signing out
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('AuthContext: signOut error:', error);
      setLoading(false); // Set loading to false if there's an immediate error
    } else {
      console.log('AuthContext: signOut successful, waiting for onAuthStateChange');
      // onAuthStateChange listener will handle setting loading to false on success
    }
    return { error };
  };

  const signInWithGoogle = async () => {
    console.log('AuthContext: signInWithGoogle starting, setting loading to true');
    setLoading(true); // Set loading to true when signing in with Google
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard',
      },
    });
    if (error) {
      console.error('AuthContext: signInWithGoogle error:', error);
      setLoading(false); // Set loading to false if there's an immediate error
    } else {
      console.log('AuthContext: signInWithGoogle successful, waiting for redirect and onAuthStateChange');
      // onAuthStateChange listener will handle setting loading to false on success after redirect
    }
    return { error };
  };

  console.log('AuthContext: Rendering provider, current loading state:', loading);

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, signIn, signUp, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
