import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'

function FileUpload({ onFileSelect, loading, previewUrl }) {
  const [error, setError] = useState('')

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setError('Please upload a valid .h5 file')
        return
      }
      if (acceptedFiles.length > 0) {
        setError('')
        const file = acceptedFiles[0]
        onFileSelect(file)
      }
    },
    [onFileSelect]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/octet-stream': ['.h5']
    },
    multiple: false
  })

  return (
    <div className="space-y-4">
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full"
      >
        <div
          {...getRootProps()}
          className={`glass-card border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
            ${isDragActive
              ? 'border-forest-dark bg-forest-dark bg-opacity-5'
              : 'border-forest-medium hover:border-forest-dark'
            }`}
        >
          <input {...getInputProps()} />
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-t-2 border-forest-dark rounded-full animate-spin mb-2"></div>
              <p className="text-forest-dark">Processing model file...</p>
            </div>
          ) : isDragActive ? (
            <p className="text-forest-dark font-medium">Drop the .h5 file here...</p>
          ) : (
            <div>
              <p className="text-lg mb-2 text-forest-dark">
                Drag & drop your model file here, or click to select
              </p>
              <p className="text-sm text-forest-medium">
                Supports .h5 files only
              </p>
            </div>
          )}
        </div>
      </motion.div>
      {error && (
        <p className="text-red-600 text-center font-medium">{error}</p>
      )}
      {previewUrl && (
        <div className="mt-4">
          <h3 className="text-forest-dark font-medium">Uploaded Image Preview:</h3>
          <img src={previewUrl} alt="Uploaded" className="rounded-lg w-full mt-2" />
        </div>
      )}
    </div>
  )
}

export default FileUpload