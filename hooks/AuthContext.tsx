"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of our authentication context
// This ensures TypeScript knows what properties are available
type AuthContextType = {
  publicUser: any;                              // User data from our backend database
  setPublicUser: (user: any) => void;          // Function to update backend user data
  user: any;                                   // Firebase user object
  setUser: (user: any) => void;               // Function to update Firebase user
  loading: boolean;                            // Loading state for auth operations
  setLoading: (loading: boolean) => void;     // Function to update loading state
};

// Create default values for the context to prevent null errors
const defaultValue: AuthContextType = {
  publicUser: null,
  setPublicUser: () => {},                    // Empty function as placeholder
  user: null,
  setUser: () => {},                          // Empty function as placeholder
  loading: true,
  setLoading: () => {},                       // Empty function as placeholder
};

// Create the React Context with proper TypeScript typing
export const AuthContext = createContext<AuthContextType>(defaultValue);

// AuthProvider component that wraps the entire app
// This makes the authentication state available to all child components
export function AuthProvider({ children }: { children: ReactNode }) {
  // Global state that will be shared across all components
  const [publicUser, setPublicUser] = useState<any>(null);    // Backend user data
  const [user, setUser] = useState<any>(null);               // Firebase user data
  const [loading, setLoading] = useState(true);              // Loading state

  return (
    // Provide the state and setter functions to all child components
    <AuthContext.Provider value={{ publicUser, setPublicUser, user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
// This simplifies accessing the context in components
export const useAuthContext = () => useContext(AuthContext);
