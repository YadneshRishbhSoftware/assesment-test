import React, { useState } from "react";
import {
  List,
  ClipboardCheck,
  Clock,
  PenTool,
  Bookmark,
  Sliders,
  CalendarDays,
  FileText,
  MoreHorizontal,
  CheckCircle,
  User,
  X,
} from "lucide-react";

const rightToolbarLinks = [
  { id: "transaction", icon: <FileText size={20} />, label: "Transaction" },
  { id: "contents", icon: <List size={20} />, label: "Contents" },
  { id: "tasks", icon: <ClipboardCheck size={20} />, label: "Tasks" },
  { id: "phases", icon: <Clock size={20} />, label: "Phases" },
  { id: "sign-tracking", icon: <PenTool size={20} />, label: "Sign Tracking" },
  { id: "critical-info", icon: <Bookmark size={20} />, label: "Critical Info" },
  { id: "analysis-phases", icon: <Sliders size={20} />, label: "Analysis Phases" },
  { id: "calendars", icon: <CalendarDays size={20} />, label: "Calendars" },
];

const RightSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleToggle = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(tabId === activeTab ? !isOpen : true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setActiveTab(null);
  };

  return (
    <div className="fixed right-5 top-20 z-10 flex">
      {/* Toolbar Buttons */}
      <div
        className="w-16 bg-white h-auto flex flex-col items-center py-4 rounded-lg shadow-md"
        style={{ boxShadow: "0px 0px 12px #101C2414", borderRadius: "6px" }}
      >
        {rightToolbarLinks.map((item) => (
          <button
            key={item.id}
            onClick={() => handleToggle(item.id)}
            className={`w-12 h-12 flex flex-col items-center justify-center rounded-lg transition-all duration-300 ${
              activeTab === item.id && isOpen ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100 hover:text-[#4B99EA]"
            } mb-4 cursor-pointer`}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
        <button className="w-12 h-12 flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#4B99EA] mt-auto cursor-pointer">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Sidebar Panel */}
      {isOpen && (
        <div className="w-4/10 bg-white shadow-lg h-screen fixed right-5 top-20 rounded-lg p-6 overflow-y-auto transition-all duration-300">
          {activeTab === "contents" && <ContentsPanel onClose={handleClose} />}
          {/* Add other components for different tabs if needed */}
        </div>
      )}
    </div>
  );
};

const documentVersions = [
  {
    version: "V.1.4",
    isCurrent: true,
    author: "Fatma Gözde Kardeş",
    lastUpdate: "02.07.2022 / 23:40",
    note: "loaded while loading document",
    size: "95.7 kb",
  },
  {
    version: "V.1.3",
    author: "Fatma Gözde Kardeş",
    lastUpdate: "02.07.2022 / 23:40",
    note: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    size: "95.7 kb",
  },
  {
    version: "V.1.2",
    author: "Ali Sefa Türkmen",
    lastUpdate: "12.05.2022 / 23:40",
    note: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    size: "65.1 kb",
  },
  {
    version: "V.1.1",
    author: "Yiğit Aksoy",
    lastUpdate: "04.05.2022 / 23:40",
    note: "—",
    size: "54.4 kb",
  },
];

const tabs = [
  { label: "Detail", active: false },
  { label: "Versions", active: true }, // Default active
  { label: "Processes", active: false },
  { label: "Notes", active: false },
  { label: "Authorization", active: false },
  { label: "Tasks", active: false },
];

const ContentsPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="w-full h-full bg-white">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <X size={20} />
      </button>
      {/* 🔹 Header Section (Word File Icon + Status) */}
      <div className="flex items-center space-x-3 mb-4">
        <FileText size={28} className="text-blue-600" />
        <h2 className="text-lg font-semibold whitespace-nowrap">Confidentiality Agreement</h2>
        <CheckCircle size={16} className="text-green-500" />
        <span className="text-sm text-gray-600">Completed</span>
      </div>

      {/* 🔹 Tabs Section (Scrollable) */}
      <div className="overflow-x-auto whitespace-nowrap border-b border-gray-300 mb-4">
        <div className="flex space-x-6">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`py-2 px-4 text-sm font-medium ${
                tab.active ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
              } hover:text-blue-500 transition`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 Document Registration Counter */}
      <p className="text-gray-700 text-sm font-medium mb-4">
        {documentVersions.length} Registration
      </p>

      {/* 🔹 Document Versions List */}
      <div className="space-y-4">
        {documentVersions.map((doc, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md flex justify-between items-start relative"
            style={{ boxShadow: "-6px 0px 8px #0A0E1214" }}
          >
            {/* Left Section: Profile & Version Info */}
            <div className="flex items-start space-x-3">
              <User size={28} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">
                  {doc.version} {doc.isCurrent && <span className="text-xs text-blue-500">(Current Version)</span>}
                </p>
                <p className="text-xs text-gray-500">Last Updater: {doc.author}</p>
                <p className="text-xs text-gray-500">Last Update Date: {doc.lastUpdate}</p>
                <p className="text-sm text-gray-700 mt-2">
                  <strong>Note:</strong> {doc.note}
                </p>
              </div>
            </div>

            {/* Right Section: File Size & More Options */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">{doc.size}</span>
              <button className="text-gray-500 hover:bg-gray-200 p-1 rounded-full">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;