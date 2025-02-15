import { Search, Filter, Download, Mic } from "lucide-react";
import FilterModal from "./FilterModal";
import { useState } from "react";

const FilterBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md mt-4 mx-14">
      <div className="flex items-center space-x-3 flex-1">
        <select className="border-transparent px-3 py-2 rounded-md text-sm bg-white">
          <option>All (selected folder)</option>
        </select>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search within all folders and content, or a specific folder’s content"
            className="px-10 py-2 border-transparent rounded-md text-sm w-4/5 bg-white pr-10" 
          />
          <Search 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
          />
          <Mic 
            size={16} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <select className="border-transparent px-3 py-2 rounded-md text-sm bg-white">
          <option>All Status</option>
          <option>Continuing</option>
          <option>Completed</option>
          <option>Not Started</option>
        </select>
        <button className="p-2 border-transparent rounded-md hover:bg-gray-200 bg-white">
          <Download size={16} />
        </button>
        <button
          className="p-2 border-transparent rounded-md hover:bg-gray-200 bg-white"
          onClick={() => setIsModalOpen(true)}
        >
          <Filter size={16} />
        </button>
      </div>

      {isModalOpen && <FilterModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default FilterBar;