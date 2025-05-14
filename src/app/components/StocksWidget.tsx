'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface StockData {
  date: string
  open: number
  high: number
  low: number
  close: number
}

const StocksWidget = () => {
  const [stockData, setStockData] = useState<StockData[]>([])
  const [symbol, setSymbol] = useState<string>('AAPL')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStockData = async (symbol: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: 'TIME_SERIES_DAILY',
          symbol: symbol,
          apikey: '9WS7KJF9D2JC0T9A',
        }
      })


      const data = response.data['Time Series (Daily)']
      if (data) {
        const formattedData = Object.entries(data).map(([date, values]: any) => ({
          date,
          open: parseFloat(values['1. open']),
          high: parseFloat(values['2. high']),
          low: parseFloat(values['3. low']),
          close: parseFloat(values['4. close']),
        }))

        setStockData(formattedData.slice(0, 30)) 
      } else {
        setError('No data available for this symbol.')
      }
    } catch (error) {
      console.error('Error fetching stock data:', error)
      setError('Failed to fetch stock data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStockData(symbol)
  }, [symbol])

  const handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSymbol(e.target.value)
  }

  return (
    <div className="p-4 bg-white rounded shadow-md w-full h-full hover:scale-[1.02] transition-all duration-250 ease-in">
      <h2 className="text-xl font-bold mb-4">Stock Data for {symbol}</h2>

      <select
        value={symbol}
        onChange={handleSymbolChange}
        className="mb-4 p-2 border"
      >
        <option value="AAPL">Apple (AAPL)</option>
        <option value="GOOG">Google (GOOG)</option>
        <option value="MSFT">Microsoft (MSFT)</option>
        <option value="AMZN">Amazon (AMZN)</option>
        <option value="TSLA">Tesla (TSLA)</option>
      </select>

      {loading && <div>Loading stock data...</div>}
      {error && <div className="text-red-500">{error}</div>}
      
      {stockData.length > 0 && !loading && !error && (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={stockData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#8884d8"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default StocksWidget
