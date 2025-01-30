import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust according to your file structure
import HomePage from './pages/Home'; // Adjust according to your file structure
import LaborerProfile from './pages/LaborerProfile'; // Adjust according to your file structure
import SettingsPage from './pages/Setting'; // Adjust according to your file structure
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import AvailableJobsPage from './pages/AvailableJobs';
import JobAppPro from './pages/JobAppProc'
import Team from './pages/Team';
import Mission from './pages/MissionVis';
import { AuthProvider } from './context/AuthContext';


const App = () => {
  
  return (
    <AuthProvider>
      <Router>
        {/* Navbar should be rendered on every page */}
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<LaborerProfile />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/available-jobs" element={<AvailableJobsPage />} />
          <Route path="/job-app-pro" element={<JobAppPro />} />
          <Route path="/team" element={<Team />} />
          <Route path="/mission" element={<Mission/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
