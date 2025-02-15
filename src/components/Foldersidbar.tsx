import React, { useState } from "react";
import { Folder, FileText, ChevronDown, ChevronRight, Download } from "lucide-react";

type FolderItem = {
  id: number;
  name: string;
  type: "folder" | "file";
  children?: FolderItem[];
  fileUrl?: string; // For PDF downloads
};

const folderData: FolderItem[] = [
  { id: 1, name: "Stage 1", type: "folder" },
  {
    id: 2,
    name: "Stage 2",
    type: "folder",
    children: [
      { id: 21, name: "2.1 Stage", type: "folder" },
      {
        id: 22,
        name: "2.2 Stage",
        type: "folder",
        children: [
          {
            id: 221,
            name: "Document.pdf",
            type: "file",
            fileUrl: "/static/sample.pdf", // Sample PDF
          },
        ],
      },
    ],
  },
  { id: 3, name: "Stage 3", type: "folder" },
  { id: 4, name: "Stage 4", type: "folder" },
  { id: 5, name: "Stage 5", type: "folder" },
  { id: 6, name: "Stage 6", type: "folder" },
  { id: 7, name: "Stage 7", type: "folder" },
  { id: 8, name: "Stage 8", type: "folder" },
  { id: 9, name: "Stage 9", type: "folder" },
];

const Foldersibar: React.FC = () => {
  return (
    <div className="w-80 bg-white border-r h-screen flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Transaction Contents</h2>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>12 Stages</span>
          <span>23 Subfolder</span>
          <span>1235 Document</span>
        </div>
        <input
          type="text"
          placeholder="Filter by Client/Matter name"
          className="w-full mt-2 px-2 py-1 border rounded-md text-sm"
        />
      </div>

      {/* Folder Structure */}
      <div className="flex-1 overflow-y-auto p-2">
        {folderData.map((item) => (
          <FolderItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// Recursive Folder Item Component
type FolderItemProps = {
  item: FolderItem;
};

const FolderItem: React.FC<FolderItemProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="ml-2">
      <div
        className="flex items-center cursor-pointer py-2 px-2 hover:bg-gray-100 rounded-md"
        onClick={() => setExpanded(!expanded)}
      >
        {item.type === "folder" ? (
          <>
            <span className="mr-2">{expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
            <Folder size={18} className="mr-2" />
            <span>{item.name}</span>
          </>
        ) : (
          <>
            <FileText size={18} className="mr-2 text-blue-500" />
            <span className="flex-1">{item.name}</span>
            {item.fileUrl && (
              <a href={item.fileUrl} download className="text-blue-500">
                <Download size={14} />
              </a>
            )}
          </>
        )}
      </div>

      {expanded && item.children && (
        <div className="ml-6 border-l pl-2">
          {item.children.map((child) => (
            <FolderItem key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Foldersibar;
