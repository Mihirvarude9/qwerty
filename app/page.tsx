'use client'

import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [product, setProduct] = useState('')
  const [background, setBackground] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!product || !background || !name) return
    setLoading(true)
    setImage(null)

    try {
      const res = await axios.post('https://a27ebacc9990.ngrok-free.app/generate', {
        product_description: product,
        background_description: background,
        printed_name: name,
        count: 1
      })

      const base64Image = res.data.images[0]
      setImage(`data:image/png;base64,${base64Image}`)
    } catch (err) {
      console.error('Generation failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (<>
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">🛍️ Product Generator</h1>

      <input
        type="text"
        placeholder="Product description (e.g. black hoodie)"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="border px-4 py-2 w-full max-w-md rounded shadow mb-3"
      />

      <input
        type="text"
        placeholder="Background description (e.g. white background)"
        value={background}
        onChange={(e) => setBackground(e.target.value)}
        className="border px-4 py-2 w-full max-w-md rounded shadow mb-3"
      />

      <input
        type="text"
        placeholder="Printed name (e.g. WildMind)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-4 py-2 w-full max-w-md rounded shadow mb-3"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {image && (
        <div className="mt-6">
          <h2 className="mb-2 text-lg font-medium">Generated Product Image</h2>
          <img src={image} alt="Generated product" className="rounded shadow-md max-w-full h-auto" />
        </div>
      )}
    </main>
    </>
  )
}
