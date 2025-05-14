import Layout from '../components/layout'
import WeatherWidget from '../components/WeatherWidget'
import StocksWidget from '../components/StocksWidget'
import NewsWidget from '../components/NewsWidget'

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col gap-4 w-full h-full">
       
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[50%]">
            <WeatherWidget />
          </div>
          <div className="flex-1 min-w-[50%]">
            <StocksWidget />
          </div>
        </div>

       
        <div className="w-full">
          <NewsWidget />
        </div>
      </div>
    </Layout>
  )
}

