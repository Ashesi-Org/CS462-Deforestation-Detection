import React from 'react'
import { motion } from 'framer-motion'

export function ImageDisplay({ result }) {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 bg-gray-800 rounded-lg p-6"
    >
      <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-gray-400 mb-2">Uploaded Image</h3>
          <img
            src={result.original_image}
            alt="Original"
            className="rounded-lg w-full"
          />
        </div>
        <div>
          <h3 className="text-gray-400 mb-2">Predicted Mask</h3>
          <img
            src={result.mask_image}
            alt="Mask"
            className="rounded-lg w-full"
          />
        </div>
      </div>
    </motion.div>
  )
}