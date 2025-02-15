import React, { useState } from "react";
import { ChevronRight, FileText, Filter, Download } from "lucide-react";
import RightSidebar from "./RightSidebar"; // Import Right Sidebar

interface Transaction {
  id: number;
  phase: string;
  subPhase: string;
  status: "continuing" | "completed" | "not-started" | "undefined";
  document: string;
  responsibleParty: string;
  updateDate: string;
}

const transactions: Transaction[] = [
  { id: 1, phase: "İŞLEM DOSYALARI / TRANSACTION", subPhase: "4 Sub Phase", status: "continuing", document: "V6", responsibleParty: "Goksu Safi Isik Avukatlik", updateDate: "11.12.2022" },
  { id: 2, phase: "Aşama / Phase", subPhase: "2 Sub Phase", status: "completed", document: "", responsibleParty: "Goksu Safi Isik Avukatlik", updateDate: "11.12.2022" },
  { id: 3, phase: "Aşama / Phase", subPhase: "5 Sub Phase", status: "not-started", document: "V6", responsibleParty: "Goksu Safi Isik Avukatlik", updateDate: "11.12.2022" },
  { id: 4, phase: "Aşama / Phase", subPhase: "4 Sub Phase", status: "not-started", document: "", responsibleParty: "Goksu Safi Isik Avukatlik", updateDate: "11.12.2022" },
  { id: 5, phase: "Aşama / Phase", subPhase: "2 Sub Phase", status: "completed", document: "", responsibleParty: "Goksu Safi Isik Avukatlik", updateDate: "11.12.2022" },
  { id: 6, phase: "Aşama / Phase", subPhase: "5 Sub Phase", status: "not-started", document: "V6", responsibleParty: "Goksu Safi Isik Avukatlik", updateDate: "11.12.2022" },
  { id: 7, phase: "Aşama / Phase", subPhase: "4 Sub Phase", status: "not-started", document: "", responsibleParty: "Goksu Safi Isik Avukatlik", updateDate: "11.12.2022" },
  { id: 8, phase: "Aşama / Phase", subPhase: "2 Sub Phase", status: "completed", document: "", responsibleParty: "Goksu Safi Isik Avukatlik", updateDate: "11.12.2022" },
];

const StatusBadge = ({ status }: { status: Transaction["status"] }) => {
  const statusConfig = {
    continuing: { label: "Continuing", className: "bg-yellow-500 text-white px-2 py-1 rounded-md text-xs" },
    completed: { label: "Completed", className: "bg-green-500 text-white px-2 py-1 rounded-md text-xs" },
    "not-started": { label: "Not Started", className: "bg-red-500 text-white px-2 py-1 rounded-md text-xs" },
    undefined: { label: "Undefined", className: "bg-gray-500 text-white px-2 py-1 rounded-md text-xs" }
  };

  const config = statusConfig[status];

  return <span className={config.className}>{config.label}</span>;
};

const TransactionList = () => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const handleToggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex w-full">
      {/* Transaction List Container */}
      <div className="flex-1 bg-white rounded-lg shadow-sm p-6 mx-6 mt-4">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-4 py-3 bg-gray-50 border-b text-sm font-medium text-gray-600">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Phase</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Document</div>
          <div className="col-span-2">Responsible Party</div>
          <div className="col-span-2">Update Date</div>
        </div>

        {/* Transaction List */}
        <div className="divide-y">
          {transactions.map((transaction) => (
            <React.Fragment key={transaction.id}>
              <div
                className="grid grid-cols-12 px-4 py-3 items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="col-span-1 flex items-center space-x-2">
                  <button
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    onClick={() => handleToggleRow(transaction.id)}
                  >
                    <ChevronRight size={16} className={expandedRows.includes(transaction.id) ? "transform rotate-90" : ""} />
                  </button>
                  <span>{transaction.id}</span>
                </div>
                <div className="col-span-3">
                  <div className="font-medium text-gray-900">{transaction.phase}</div>
                  <div className="text-sm text-gray-500">{transaction.subPhase}</div>
                </div>
                <div className="col-span-2">
                  <StatusBadge status={transaction.status} />
                </div>
                <div className="col-span-2">
                  {transaction.document && (
                    <div className="flex items-center space-x-1 text-blue-600">
                      <FileText size={16} />
                      <span>{transaction.document}</span>
                    </div>
                  )}
                </div>
                <div className="col-span-2 text-sm text-gray-600 bg-[#F0F4F9] rounded-md opacity-100 w-42">
                  {transaction.responsibleParty}
                </div>
                <div className="col-span-2 text-sm text-gray-600">{transaction.updateDate}</div>
              </div>
              {expandedRows.includes(transaction.id) && (
                <div className="grid grid-cols-12 px-4 py-3 bg-gray-50">
                  <div className="col-span-12">
                    <p className="text-sm text-gray-600">Additional details for transaction {transaction.id}</p>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="w-[40px] flex-shrink-0">
        <RightSidebar />
      </div>
    </div>
  );
};

export default TransactionList;