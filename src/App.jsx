import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ArticlesProvider } from './context/ArticlesContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Home from './pages/Home';
import SavedArticles from './pages/SavedArticles';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <ArticlesProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/saved" 
              element={<ProtectedRoute><SavedArticles /></ProtectedRoute>} 
            />
            <Route 
              path="/admin" 
              element={<ProtectedRoute><AdminPage /></ProtectedRoute>} 
            />
          </Routes>
        </Router>
      </ArticlesProvider>
    </AuthProvider>
  );
}