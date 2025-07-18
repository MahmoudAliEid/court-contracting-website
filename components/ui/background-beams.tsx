"use client"
import { motion } from "framer-motion"

export function BackgroundBeams({ className }: { className?: string }) {
  const beams = Array.from({ length: 6 }, (_, i) => i)

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {beams.map((beam) => (
        <motion.div
          key={beam}
          className="absolute h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${200 + Math.random() * 300}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
