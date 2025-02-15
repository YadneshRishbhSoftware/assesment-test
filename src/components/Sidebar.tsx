import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  FileText,
  Mail,
  BarChart,
  Calendar,
  Settings,
  Users,
  Folder,
  ChevronDown,
  ChevronRight,
  Plus,
  Info,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";

// Static folder structure
const folderData = [
  { id: 1, name: "Stage 1", children: [] },
  {
    id: 2,
    name: "Stage 2",
    children: [
      { id: 21, name: "2.1 Stage", children: [] },
      { id: 22, name: "2.2 Stage", children: [] },
    ],
  },
  { id: 3, name: "Stage 3", children: [] },
  { id: 4, name: "Stage 4", children: [] },
  { id: 5, name: "Stage 5", children: [] },
  { id: 6, name: "Stage 6", children: [] },
  { id: 7, name: "Stage 7", children: [] },
  { id: 8, name: "Stage 8", children: [] },
  { id: 9, name: "Stage 9", children: [] },
];

const sidebarLinks = [
  { to: "/", icon: <Home size={20} />, label: "Panorama" },
  { to: "/transaction", icon: <FileText size={20} />, label: "Transaction" },
  { to: "/documents", icon: <FileText size={20} />, label: "Documents" },
  { to: "/emails", icon: <Mail size={20} />, label: "E-Mails" },
  { to: "/reports", icon: <BarChart size={20} />, label: "Reports" },
  { to: "/management", icon: <Settings size={20} />, label: "Management Panel" },
  { to: "/calendar", icon: <Calendar size={20} />, label: "Transaction Calendar" },
];

const Sidebar: React.FC = () => {
  const [isTransactionSidebarOpen, setIsTransactionSidebarOpen] = useState(true);
  const toggleTransactionSidebar = () => setIsTransactionSidebarOpen(!isTransactionSidebarOpen);

  return (
    <div className="flex">
      {/* Left Sidebar (Always Open) */}
      <div className="w-20 bg-blue-900 h-screen flex flex-col justify-between items-center py-4 text-white">
        {/* Logo */}
        <div className="mb-6">
          <div className="h-10 w-10 bg-blue-300 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold">M</span> {/* Replace with actual logo */}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col space-y-6 flex-1">
          {sidebarLinks.map((item, index) => (
            <SidebarItem key={index} to={item.to} icon={item.icon} label={item.label} />
          ))}
        </nav>

        {/* User Profile */}
        <div className="mb-4">
          <img
            src="https://via.placeholder.com/40" // Replace with user profile image
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        </div>
      </div>

      {/* Right Sidebar (Transaction Contents) with Open/Close Toggle */}
      <div className={`transition-all duration-300 ${isTransactionSidebarOpen ? "w-80" : "w-12"} bg-white border-l h-screen flex flex-col`}>
        <div className="p-4 border-b flex justify-between items-center">
          {isTransactionSidebarOpen && <h2 className="text-lg font-semibold">Transaction Contents</h2>}
          <button onClick={toggleTransactionSidebar} className="p-1 hover:bg-gray-200 rounded-md">
            {isTransactionSidebarOpen ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
          </button>
        </div>

        {/* Content Section */}
        {isTransactionSidebarOpen && (
          <>
            <div className="flex justify-between text-sm text-gray-600 mt-2 px-4">
              <span className="font-bold text-lg">12 Stages</span>
              <span className="font-bold text-lg">23 Subfolders</span>
              <span className="font-bold text-lg">1235 Documents</span>
            </div>
            <input
              type="text"
              placeholder="Filter by Client/Matter name"
              className="w-full mt-2 px-4 py-2 border rounded-md text-sm"
            />
            <div className="flex-1 overflow-y-auto p-4">
              {folderData.map((item) => (
                <FolderItem key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Sidebar Navigation Item Component
interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarItem = ({ to, icon, label }: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-16 h-16 flex flex-col items-center justify-center text-white transition-all duration-300 ${
          isActive ? "bg-blue-700 rounded-lg" : "hover:bg-blue-800"
        }`
      }
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

// Recursive Folder Item Component
const FolderItem: React.FC<{ item: any }> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="ml-2">
      <div className="flex items-center cursor-pointer py-2 px-2 hover:bg-gray-100 rounded-md" onClick={() => setExpanded(!expanded)}>
        <span className="mr-2">{expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
        <Folder size={18} className="mr-2" />
        <span className="flex-1">{item.name}</span>
        <Info size={14} className="text-gray-400 ml-2" />
        <Plus size={14} className="text-gray-400 ml-2" />
      </div>

      {expanded && item.children && (
        <div className="ml-6 border-l pl-2">
          {item.children.map((child: any) => (
            <FolderItem key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;