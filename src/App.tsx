import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import  TransactionPage  from "./pages/TransactionPage";
// import Navbar from "./components/Navbar";

const Dashboard = () => <h1 className="text-white">Panorama</h1>;
const Documents = () => <h1 className="text-white">Documents</h1>;
const Emails = () => <h1 className="text-white">EPostalar</h1>;
const Reports = () => <h1 className="text-white">Reports</h1>;
const Management = () => <h1 className="text-white">Management Panel</h1>;
const Calendar = () => <h1 className="text-white">Transaction Calendar</h1>;

const App: React.FC = () => {
  return (
    <Router>
      
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transaction" element={<TransactionPage />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/emails" element={<Emails />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/management" element={<Management />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
