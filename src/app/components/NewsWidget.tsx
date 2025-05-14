'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

interface Article {
  title: string
  url: string
  description: string
}

const categories = [
  { key: 'technology', label: 'Technology', color: 'bg-blue-500' },
  { key: 'business', label: 'Business', color: 'bg-green-500' },
  { key: 'entertainment', label: 'Movies', color: 'bg-purple-500' },
  { key: 'fashion', label: 'Fashion', color: 'bg-pink-500' },
  { key: 'sports', label: 'Sports', color: 'bg-yellow-500' },
]

const NewsWidget = () => {
  const [activeCategory, setActiveCategory] = useState<string>('technology')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)

  const fetchNews = async (category: string) => {
    setLoading(true)
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
          category,
          country: 'us',
          apiKey: '256e206774c04d6786a610c68f2dcc06'
        }
      })
      setArticles(response.data.articles)
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews(activeCategory)
  }, [activeCategory])

  return (
    <div className="p-4 bg-white rounded-md shadow-md w-full hover:scale-102 transition-all duration-250 ease-in">
      <h2 className="text-xl font-bold mb-4">News Headlines</h2>

      <div className="flex gap-2 mb-4 flex-wrap">
        {categories.map((cat) => (
          <motion.button
            key={cat.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded text-white ${cat.color} ${activeCategory === cat.key ? 'ring-2 ring-offset-2 ring-black' : ''}`}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {loading ? (
        <div>Loading news...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.slice(0, 6).map((article, index) => (
            <motion.a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="block bg-gray-100 rounded p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
              {article.description && <p className="text-sm text-gray-600">{article.description}</p>}
            </motion.a>
          ))}
        </div>
      )}
    </div>
  )
}

export default NewsWidget
