import React, { useState } from 'react'
import FileUpload from './components/FileUpload'
import { motion } from 'framer-motion'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileSelect = (file) => {
    const allowedExtensions = ['h5', 'png', 'jpg', 'jpeg']
    const fileExtension = file.name.split('.').pop().toLowerCase()

    if (!allowedExtensions.includes(fileExtension)) {
      setErrorMessage(`Invalid file type. Please upload a file with one of the following extensions: ${allowedExtensions.join(', ')}`)
      return
    }

    setSelectedFile(file)
    setErrorMessage('') // Clear any previous error message

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleDetection = async () => {
    if (!selectedFile) return

    setLoading(true)
    setErrorMessage('') // Clear any previous errors
    setResult(null) // Clear previous results

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`)
      }

      const data = await response.json()

      if (!data.mask) {
        throw new Error('No mask image returned from the server.')
      }

      setResult({ 
        original_image: URL.createObjectURL(selectedFile), 
        mask_image: data.mask 
      })
    } catch (error) {
      setErrorMessage(`Error processing model: ${error.message}`)
      console.error('Error processing model:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen landslide-bg">
      <div className="container mx-auto px-4 py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-forest-dark">
            Landslide Detection
          </h1>
          <p className="text-xl text-forest-medium">
            Upload your image or .h5 file to analyze landslide-prone areas
          </p>
        </motion.div>

        {errorMessage && (
          <div className="mb-6 bg-red-100 text-red-800 p-4 rounded-md">
            <p>{errorMessage}</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <FileUpload 
            onFileSelect={handleFileSelect} 
            loading={loading} 
            disabled={loading} 
          />

          {previewUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 glass-card rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-forest-dark">Selected Model File</h2>
              <p className="text-forest-medium mb-4">{selectedFile?.name}</p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDetection}
                disabled={loading}
                className="w-full py-4 px-6 bg-forest-dark text-forest-light rounded-lg font-semibold shadow-lg 
                  hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Detect Landslides'}
              </motion.button>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 glass-card rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-forest-dark">Analysis Result</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-forest-medium font-medium">Original Image</h3>
                  <img
                    src={result.original_image}
                    alt="Original"
                    className="rounded-lg w-full shadow-lg"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-forest-medium font-medium">Detected Areas</h3>
                  <img
                    src={result.mask_image}
                    alt="Mask"
                    className="rounded-lg w-full shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default App
