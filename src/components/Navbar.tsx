const Navbar = () => {
  return (
    <div className="flex items-center text-gray-500 text-sm space-x-2 px-6 py-3 bg-white">
      <span>Client</span>
      <span className="text-gray-400"> &gt; </span>
      <span>Matter</span>
      <span className="text-gray-400"> &gt; </span>
      <span>Transaction Detail Page</span>
      <span className="text-gray-400"> &gt; </span>
      <span className="font-semibold text-gray-900">Transaction Contents</span>
    </div>
  );
};
export default Navbar;