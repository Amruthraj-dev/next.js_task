const Sidebar = () => (
  <div className="w-55 bg-gray-900 text-white p-4 space-y-2 bg-linear-to-bl from-violet-500 to-fuchsia-500">
    
    <nav className="space-y-2 ">
    
      <a href="#" className="block hover:bg-violet-800 px-5 m-2 p-2 rounded text-lg font-serif">Weather</a>
      <a href="#" className="block hover:bg-violet-800 px-5 m-2 p-2 rounded text-lg font-serif">Stocks</a>
      <a href="#" className="block hover:bg-fuchsia-800 px-5 m-2 p-2 rounded text-lg font-serif">News</a>
    </nav>
  </div>
);

export default Sidebar;
