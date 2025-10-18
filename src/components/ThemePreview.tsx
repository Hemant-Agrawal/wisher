'use client'

import { Star, Flame, Sparkles, Zap } from 'lucide-react'

interface ThemePreviewProps {
  theme: string
  isSelected: boolean
  onClick: () => void
}

export default function ThemePreview({ theme, isSelected, onClick }: ThemePreviewProps) {
  const getThemeConfig = (themeId: string) => {
    switch (themeId) {
      case 'gold-glow':
        return {
          name: 'Gold Glow',
          description: 'Warm golden tones with floating diyas',
          gradient: 'from-yellow-400 via-yellow-500 to-orange-500',
          icon: <Flame className="w-6 h-6 text-yellow-400" />
        }
      case 'royal-purple':
        return {
          name: 'Royal Purple',
          description: 'Elegant purple with confetti effects',
          gradient: 'from-purple-600 via-purple-700 to-indigo-800',
          icon: <Sparkles className="w-6 h-6 text-purple-400" />
        }
      case 'festive-orange':
        return {
          name: 'Festive Orange',
          description: 'Vibrant orange with fireworks',
          gradient: 'from-orange-500 via-red-500 to-pink-500',
          icon: <Zap className="w-6 h-6 text-orange-400" />
        }
      case 'midnight-sky':
        return {
          name: 'Midnight Sky',
          description: 'Dark navy with twinkling stars',
          gradient: 'from-gray-900 via-blue-900 to-indigo-900',
          icon: <Star className="w-6 h-6 text-blue-400" />
        }
      default:
        return {
          name: 'Gold Glow',
          description: 'Warm golden tones with floating diyas',
          gradient: 'from-yellow-400 via-yellow-500 to-orange-500',
          icon: <Flame className="w-6 h-6 text-yellow-400" />
        }
    }
  }

  const config = getThemeConfig(theme)

  return (
    <div
      className={`relative cursor-pointer rounded-lg p-4 border-2 transition-all ${
        isSelected
          ? 'border-yellow-500 ring-2 ring-yellow-200'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      <div className={`w-full h-20 rounded-lg mb-3 bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
        {config.icon}
      </div>
      <h3 className="font-medium text-gray-800">{config.name}</h3>
      <p className="text-sm text-gray-600">{config.description}</p>
      {isSelected && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
        </div>
      )}
    </div>
  )
}
