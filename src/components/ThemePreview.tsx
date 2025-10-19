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
      className={`relative cursor-pointer card hover-lift transition-all duration-300 ${
        isSelected
          ? 'ring-4 ring-amber-200 shadow-glow bg-gradient-to-br from-amber-50 to-orange-50'
          : 'hover:shadow-xl'
      }`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className={`w-full h-24 rounded-2xl mb-4 bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg relative overflow-hidden`}>
          {config.icon}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{config.name}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{config.description}</p>
        {isSelected && (
          <div className="absolute -top-2 -right-2">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse-glow">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
