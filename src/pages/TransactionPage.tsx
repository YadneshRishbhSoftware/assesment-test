import FilterBar from "../components/FilterBar";
import Navbar from "../components/Navbar";
// import RightSidebar from "../components/RightSidebar";
import TransactionList from "../components/TransactionList";

const TransactionPage = () => {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <FilterBar />
        <TransactionList />
        {/* <RightSidebar/> */}
      </div>
    );
  };
  
  export default TransactionPage;
  