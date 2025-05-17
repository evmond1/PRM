import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
// SettingsProvider is now imported and used inside AuthProtectedContent
import AuthProtectedContent from './components/AuthProtectedContent'; // Import the new component

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* SettingsProvider is now rendered inside AuthProtectedContent */}
        <AuthProtectedContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
