import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import EditorDashboard from './pages/EditorDashboard.jsx';
import PublisherDashboard from './pages/PublisherDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
function App() {
  return (
    <Router>
      <Routes>
        {/* 🔐 Public Route */}
        <Route path="/login" element={<LoginForm />} />

<Route path="/" element={<Home />} />
<Route path="*" element={<NotFound />} />

        {/* 🛡️ Protected Routes by Role */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editor"
          element={
            <ProtectedRoute allowedRoles={['Editor']}>
              <EditorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/publisher"
          element={
            <ProtectedRoute allowedRoles={['Publisher']}>
              <PublisherDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🔄 Default fallback (optional) */}
        <Route path="*" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
<h1 className="text-4xl text-purple-600 font-bold">Tailwind is alive 🔥</h1>
