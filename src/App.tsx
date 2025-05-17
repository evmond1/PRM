import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import AuthProtectedContent from './components/AuthProtectedContent'; // Import the new component

function App() {
  return (
    <Router>
      <AuthProvider>
        <SettingsProvider>
          {/* Render the new component that contains AuthStatusWaiter and AppRoutes */}
          <AuthProtectedContent />
        </SettingsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
