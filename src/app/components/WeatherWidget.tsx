'use client'
import { useState, useEffect, ChangeEvent } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface CitySuggestion {
  id: string
  city: string
  country: string
  latitude: number
  longitude: number
}

interface WeatherData {
  date: string
  temp: number
  weatherIcon: string
}

const WeatherWidget = () => {
  const [query, setQuery] = useState<string>('')
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([])
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [loadingWeather, setLoadingWeather] = useState(false)

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    const fetchSuggestions = async () => {
      setLoadingSuggestions(true)
      try {
        const res = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
          params: { namePrefix: query, limit: 10 },
          headers: {
            'X-RapidAPI-Key': '26211b7e35msh0cc0d2c03ab654cp182774jsn1d51c028d66b',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
          }
        })
        setSuggestions(res.data.data)
      } catch (error) {
        console.error('Error fetching city suggestions:', error)
      } finally {
        setLoadingSuggestions(false)
      }
    }

    const timeoutId = setTimeout(fetchSuggestions, 500)
    return () => clearTimeout(timeoutId)
  }, [query])

  const fetchWeather = async (city: string) => {
    setLoadingWeather(true)
    try {
      const res = await axios.get('https://weather-api167.p.rapidapi.com/api/weather/forecast', {
        params: {
          place: city,
          cnt: 40,
          units: 'standard',
          type: 'three_hour',
          mode: 'json',
          lang: 'en',
        },
        headers: {
          'X-RapidAPI-Key': 'ad06266b88msh5a848fd0f10a2a3p191b9cjsn2ff3d493b0ef',
          'X-RapidAPI-Host': 'weather-api167.p.rapidapi.com',
        }
      })

      const data = res.data.list.map((item: any) => ({
        date: new Date(item.dt * 1000).toLocaleString(),
        temp: item.main.temp - 273.15,
        weatherIcon: item.weather[0].icon 
      }))
      setWeatherData(data)
    } catch (error) {
      console.error('Error fetching weather data:', error)
    } finally {
      setLoadingWeather(false)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleCitySelect = (city: string) => {
    fetchWeather(city)
    setSuggestions([]) 
  }

  const getWeatherIcon = (iconCode: string) => {
    
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  return (
    <div className="p-4 bg-white rounded shadow-md w-full h-full hover:scale-[1.02] transition-all duration-250 ease-in">
      <div className='font-bold text-xl mb-4'>Weather</div>

      <div className='mb-4'>
        <input
          type="text"
          value={query}
          placeholder="Search city..."
          onChange={handleInputChange}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      {loadingSuggestions && <div>Loading suggestions...</div>}
      
     
      <motion.div
        className="bg-gray-100 rounded p-2 mb-4 max-h-60 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: suggestions.length > 0 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {suggestions.map((city) => (
          <div
            key={city.id}
            onClick={() => handleCitySelect(`${city.city}, ${city.country}`)}
            className="cursor-pointer hover:bg-gray-300 p-2 rounded"
          >
            {city.city}, {city.country}
          </div>
        ))}
      </motion.div>

      {loadingWeather && <div>Loading weather data...</div>}
      
      {/* Weather Data */}
      {weatherData.length > 0 && (
        <div>
          <motion.div
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* <div>
              <Image
                src={getWeatherIcon(weatherData[0].weatherIcon)}
                alt="weather icon"
                className="w-12 h-12"
                width={40}
                height={40}
              />
            </div> */}
            <div className="text-xl font-semibold">
              {weatherData[0].temp.toFixed(1)} °C
            </div>
          </motion.div>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weatherData}>
              <XAxis dataKey="date" />
              <YAxis unit="°C" />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default WeatherWidget
