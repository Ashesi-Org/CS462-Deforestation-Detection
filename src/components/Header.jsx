import React from 'react'
import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.div
      initial={{ opacity: 0.5, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl font-bold mb-4 text-black">Landslide Detection</h1>
      <p className="text-black">
        Upload an image to detect potential landslide areas
      </p>
    </motion.div>
  )
}