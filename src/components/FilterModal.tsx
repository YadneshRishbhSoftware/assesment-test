import React, { useState, useRef } from "react";
import { X, Filter, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [stageStatus, setStageStatus] = useState("");
  const [responsibleParty, setResponsibleParty] = useState("");
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
  const datePickerRef = useRef<DatePicker>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setSelectedDates(dates);
  };

  const handlePresetClick = (preset: string) => {
    const today = new Date();
    let startDate: Date | null = null;
    let endDate: Date | null = today;

    switch (preset) {
      case "Today":
        startDate = today;
        break;
      case "Yesterday":
        startDate = new Date(today.setDate(today.getDate() - 1));
        endDate = startDate;
        break;
      case "Last 1 Week":
        startDate = new Date(today.setDate(today.getDate() - 7));
        break;
      case "Last 1 Month":
        startDate = new Date(today.setMonth(today.getMonth() - 1));
        break;
      case "Last 6 Months":
        startDate = new Date(today.setMonth(today.getMonth() - 6));
        break;
      case "All Time":
        startDate = null;
        endDate = null;
        break;
      default:
        break;
    }

    setSelectedDates([startDate, endDate]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-white w-[600px] rounded-lg shadow-lg">
        {/* 🔹 Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-700" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* 🔹 Body */}
        <div className="p-6">
          <div className="flex space-x-4">
            {/* Stage Status Dropdown */}
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700">Stage Status</label>
              <select
                value={stageStatus}
                onChange={(e) => setStageStatus(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
                <option value="continuing">Continuing</option>
              </select>
            </div>

            {/* Responsible Party Dropdown */}
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700">Responsible Party</label>
              <select
                value={responsibleParty}
                onChange={(e) => setResponsibleParty(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose</option>
                <option value="john-doe">John Doe</option>
                <option value="jane-smith">Jane Smith</option>
              </select>
            </div>
          </div>

          {/* Date Picker */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <div className="relative">
              <DatePicker
                ref={datePickerRef}
                selected={selectedDates[0]}
                onChange={handleDateChange}
                startDate={selectedDates[0]}
                endDate={selectedDates[1]}
                selectsRange
                inline
                monthsShown={2}
                className="w-full border rounded-md px-3 py-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Calendar
                size={16}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                onClick={() => datePickerRef.current?.setOpen(true)}
              />
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="mb-4 flex space-x-2">
            {["Today", "Yesterday", "Last 1 Week", "Last 1 Month", "Last 6 Months", "All Time"].map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetClick(preset)}
                className="px-3 py-1 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* 🔹 Footer */}
        <div className="flex items-center justify-between border-t p-4">
          <button className="text-blue-600 text-sm hover:underline">Clear Filters</button>
          <div className="space-x-3">
            <button onClick={onClose} className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;