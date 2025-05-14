// import Image from "next/image";
import NewsWidget from "./components/NewsWidget"
import StocksWidget from "./components/StocksWidget";
import WeatherWidget from "./components/WeatherWidget";
import Layout from "./components/layout";

export default function Home() {
  return (
     <Layout>
         <div className="grid grid-cols-2 gap-4">
           <div className="col-span-1"><WeatherWidget /></div>
           <div className="col-span-1"><StocksWidget/></div>
           <div className="col-span-2"><NewsWidget/></div>
         </div>
       </Layout>
  );
}
