import Link from "next/link";

const Sidebar = () => (
  <div className="w-55 bg-gray-900 text-white p-4 space-y-2 bg-linear-to-bl from-violet-500 to-fuchsia-500">
    
    <nav className="space-y-2 ">
    
      <Link href="/components/weather" className="block hover:bg-violet-800 px-5 m-2 p-2 rounded text-lg font-serif">Weather</Link>
      <Link href="/components/stocks" className="block hover:bg-violet-800 px-5 m-2 p-2 rounded text-lg font-serif">Stocks</Link>
      <Link href="/components/news" className="block hover:bg-fuchsia-800 px-5 m-2 p-2 rounded text-lg font-serif">News</Link>
    </nav>
  </div>
);

export default Sidebar;
