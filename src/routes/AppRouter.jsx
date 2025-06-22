import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WithAuth from '../middleware/WithAuth';
import Welcome from '../Pages/Welcome';
import Login from '../Pages/Login';
import Chatbot from '../Pages/Chatbot';
import Dashboard from '../Pages/Admin/Dashboard';
import ContentChatbot from '../Pages/Admin/ContentChatbot';
import Feedback from '../Pages/Admin/Feedback';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chatbot" element={<Chatbot />} />
        
        {/* Protected Admin Routes */}
        <Route path="/dashboard" element={<WithAuth><Dashboard /></WithAuth>} />
        <Route path="/admin/content-chatbot" element={<WithAuth><ContentChatbot /></WithAuth>} />
        <Route path="/admin/feedback" element={<WithAuth><Feedback /></WithAuth>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;