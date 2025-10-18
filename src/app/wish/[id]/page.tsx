'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { supabase, Wish } from '@/lib/supabase'
import { Share2, Download, MessageCircle, Sparkles, Star, Flame, User, Phone } from 'lucide-react'
import { Fireworks } from 'fireworks-js'
import html2canvas from 'html2canvas'

const themeConfigs = {
  'gold-glow': {
    background: 'gold-glow',
    textColor: 'text-white',
    accentColor: 'text-yellow-200',
    buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
    animation: 'diya',
    cardBg: 'bg-white/90',
    cardText: 'text-gray-900',
    fireworks: {
      hue: { min: 40, max: 60 }, // Gold colors
      particles: 60,
      intensity: 40,
      flickering: 60,
      brightness: { min: 60, max: 90 }
    }
  },
  'royal-purple': {
    background: 'royal-purple',
    textColor: 'text-white',
    accentColor: 'text-purple-200',
    buttonColor: 'bg-purple-500 hover:bg-purple-600',
    animation: 'confetti',
    cardBg: 'bg-white/90',
    cardText: 'text-gray-900',
    fireworks: {
      hue: { min: 250, max: 290 }, // Purple colors
      particles: 80,
      intensity: 50,
      flickering: 70,
      brightness: { min: 50, max: 80 }
    }
  },
  'festive-orange': {
    background: 'festive-orange',
    textColor: 'text-white',
    accentColor: 'text-orange-200',
    buttonColor: 'bg-orange-500 hover:bg-orange-600',
    animation: 'firework',
    cardBg: 'bg-white/90',
    cardText: 'text-gray-900',
    fireworks: {
      hue: { min: 15, max: 45 }, // Orange colors
      particles: 100,
      intensity: 60,
      flickering: 80,
      brightness: { min: 70, max: 100 }
    }
  },
  'midnight-sky': {
    background: 'midnight-sky',
    textColor: 'text-white',
    accentColor: 'text-blue-200',
    buttonColor: 'bg-blue-500 hover:bg-blue-600',
    animation: 'stars',
    cardBg: 'bg-white/90',
    cardText: 'text-gray-900',
    fireworks: {
      hue: { min: 200, max: 240 }, // Blue colors
      particles: 40,
      intensity: 30,
      flickering: 40,
      brightness: { min: 40, max: 70 }
    }
  },
  'rose-gold': {
    background: 'rose-gold',
    textColor: 'text-white',
    accentColor: 'text-pink-200',
    buttonColor: 'bg-rose-500 hover:bg-rose-600',
    animation: 'confetti',
    cardBg: 'bg-white/90',
    cardText: 'text-gray-900',
    fireworks: {
      hue: { min: 320, max: 360 }, // Pink/Rose colors
      particles: 70,
      intensity: 45,
      flickering: 65,
      brightness: { min: 55, max: 85 }
    }
  },
  'emerald-green': {
    background: 'emerald-green',
    textColor: 'text-white',
    accentColor: 'text-green-200',
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
    animation: 'diya',
    cardBg: 'bg-white/90',
    cardText: 'text-gray-900',
    fireworks: {
      hue: { min: 120, max: 160 }, // Green colors
      particles: 50,
      intensity: 35,
      flickering: 50,
      brightness: { min: 45, max: 75 }
    }
  }
}

export default function WishPage() {
  const params = useParams()
  const [wish, setWish] = useState<Wish | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const wishRef = useRef<HTMLDivElement>(null)
  const fireworksRef = useRef<Fireworks | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchWish(params.id as string)
    }
  }, [params.id])

  useEffect(() => {
    if (wish) {
      triggerAnimations()
    }
  }, [wish])

  // Cleanup fireworks on unmount
  useEffect(() => {
    return () => {
      if (fireworksRef.current) {
        fireworksRef.current.stop(true) // Dispose the fireworks instance
        fireworksRef.current = null
      }
      
      // Clean up event listeners
      const container = document.getElementById('fireworks-container')
      if (container) {
        if ((container as any)._fireworksClickHandler) {
          container.removeEventListener('click', (container as any)._fireworksClickHandler)
          delete (container as any)._fireworksClickHandler
        }
        if ((container as any)._fireworksDoubleClickHandler) {
          container.removeEventListener('dblclick', (container as any)._fireworksDoubleClickHandler)
          delete (container as any)._fireworksDoubleClickHandler
        }
      }
    }
  }, [])

  const fetchWish = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setWish(data)
    } catch (err) {
      console.error('Error fetching wish:', err)
      setError('Wish not found')
    } finally {
      setLoading(false)
    }
  }

  const triggerAnimations = () => {
    if (!wish) return

    const config = themeConfigs[wish.theme as keyof typeof themeConfigs]
    
    setTimeout(() => {
      const container = document.getElementById('fireworks-container')
      if (container) {
        // Stop existing fireworks if any
        if (fireworksRef.current) {
          fireworksRef.current.stop(true) // Dispose existing instance
          fireworksRef.current = null
        }
        
        // Clean up any existing click handlers
        if ((container as any)._fireworksClickHandler) {
          container.removeEventListener('click', (container as any)._fireworksClickHandler)
          delete (container as any)._fireworksClickHandler
        }
        if ((container as any)._fireworksDoubleClickHandler) {
          container.removeEventListener('dblclick', (container as any)._fireworksDoubleClickHandler)
          delete (container as any)._fireworksDoubleClickHandler
        }
        
        const fireworks = new Fireworks(container, {
          autoresize: true,
          opacity: 0.6,
          acceleration: 1.05,
          friction: 0.97,
          gravity: 1.5,
          particles: config.fireworks.particles,
          traceLength: 3,
          traceSpeed: 10,
          explosion: 5,
          intensity: config.fireworks.intensity,
          flickering: config.fireworks.flickering,
          lineStyle: 'round',
          hue: config.fireworks.hue,
          delay: { min: 20, max: 40 }, // Faster continuous fireworks
          rocketsPoint: { min: 30, max: 70 },
          lineWidth: { 
            explosion: { min: 1, max: 3 }, 
            trace: { min: 1, max: 2 } 
          },
          brightness: config.fireworks.brightness,
          decay: { min: 0.015, max: 0.03 },
          mouse: { 
            click: true, 
            move: false, 
            max: 1 
          },
          sound: {
            enabled: true,
            files: [
              'https://fireworks.js.org/sounds/explosion0.mp3',
              'https://fireworks.js.org/sounds/explosion1.mp3',
              'https://fireworks.js.org/sounds/explosion2.mp3'
            ],
            volume: {
              min: 0.1,
              max: 0.3
            }
          }
        })
        
        fireworksRef.current = fireworks
        fireworks.start()
        
        // Add click handler for additional fireworks
        const handleClick = () => {
          if (fireworksRef.current) {
            fireworksRef.current.launch(3) // Launch 3 additional fireworks on click
          }
        }
        
        // Add double-click handler to pause/resume
        const handleDoubleClick = () => {
          if (fireworksRef.current) {
            fireworksRef.current.pause() // Toggle pause/resume
          }
        }
        
        container.addEventListener('click', handleClick)
        container.addEventListener('dblclick', handleDoubleClick)
        
        // Store handlers for cleanup
        ;(container as any)._fireworksClickHandler = handleClick
        ;(container as any)._fireworksDoubleClickHandler = handleDoubleClick
      }
    }, 500)
  }

  const shareOnWhatsApp = () => {
    const url = window.location.href
    const headline = wish?.headline || ''
    const message = wish?.message || ''
    const text = `🪔 *${headline}* 🪔\n\n${message}\n\n✨ Check out my Diwali Wish: ${url} ✨`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, '_blank')
  }

  const downloadAsImage = async () => {
    if (!wishRef.current) return

    try {
      const canvas = await html2canvas(wishRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true
      })
      
      const link = document.createElement('a')
      link.download = `diwali-wish-${wish?.name}.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      link.click()
    } catch (error) {
      console.error('Error downloading image:', error)
      alert('Failed to download image. Please try again.')
    }
  }

  const shareImage = async () => {
    if (!wishRef.current) return

    try {
      const canvas = await html2canvas(wishRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true
      })
      
      const dataUrl = canvas.toDataURL('image/png', 1.0)
      
      if (navigator.share && navigator.canShare) {
        const blob = await fetch(dataUrl).then(r => r.blob())
        const file = new File([blob], `diwali-wish-${wish?.name}.png`, { type: 'image/png' })
        
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Diwali Wish for ${wish?.name}`,
            text: `Check out this beautiful Diwali wish! 🪔✨`,
            files: [file]
          })
        } else {
          // Fallback to WhatsApp sharing
          const text = `🪔 *${wish?.headline}* 🪔\n\n${wish?.message}\n\n✨ Check out my Diwali Wish: ${window.location.href} ✨`
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
          window.open(whatsappUrl, '_blank')
        }
      } else {
        // Fallback to WhatsApp sharing
        const text = `🪔 *${wish?.headline}* 🪔\n\n${wish?.message}\n\n✨ Check out my Diwali Wish: ${window.location.href} ✨`
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
        window.open(whatsappUrl, '_blank')
      }
    } catch (error) {
      console.error('Error sharing image:', error)
      alert('Failed to share image. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  if (error || !wish) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Wish Not Found</h1>
          <p className="text-gray-600">The Diwali wish you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const config = themeConfigs[wish.theme as keyof typeof themeConfigs]

  return (
    <div className={`min-h-screen ${config.background} relative overflow-hidden`}>
      {/* Fireworks Container */}
      <div id="fireworks-container" className="absolute inset-0 pointer-events-none"></div>
      
      {/* Background Animations */}
      {wish.theme === 'gold-glow' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute diya-flicker"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <Flame className="w-8 h-8 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      {wish.theme === 'midnight-sky' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute star-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              <Star className="w-2 h-2 text-white" />
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div ref={wishRef} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold ${config.textColor} mb-4`}>
              Happy Diwali
            </h1>
            {wish.name && (
              <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold ${config.accentColor} mb-2`}>
                {wish.name} ✨
              </h2>
            )}
            <div className="flex justify-center items-center">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
          </div>

          {/* Headline */}
          {wish.headline && (
            <div className={`${config.cardBg} backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg`}>
              <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed font-bold text-center ${config.cardText}`}>
                {wish.headline}
              </p>
            </div>
          )}

          {/* Message */}
          <div className={`${config.cardBg} backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg`}>
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-medium ${config.cardText}`}>
              {wish.message}
            </p>
          </div>

          {/* Custom Image */}
          {wish.image_url && (
            <div className="mb-8">
              <img
                src={wish.image_url}
                alt="Diwali wish"
                className="max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>
          )}

          {/* Sender Signature */}
          {wish.sender_name && (
            <div className={`${config.cardBg} backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg`}>
              <div className="flex items-center justify-center space-x-4">
                {wish.sender_image_url && !wish.signature && (
                  <img
                    src={wish.sender_image_url}
                    alt="Sender"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                  />
                )}
                <div className="text-center">
                  <h3 className={`text-xl font-semibold mb-1 ${config.cardText}`}>
                    {wish.signature || wish.sender_name}
                  </h3>
                  {wish.signature_number && (
                    <p className={`text-sm opacity-80 flex items-center justify-center ${config.cardText}`}>
                      <Phone className="w-4 h-4 mr-1" />
                      {wish.signature_number}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={shareOnWhatsApp}
              className={`${config.buttonColor} text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center`}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Share on WhatsApp
            </button>
            
            <button
              onClick={downloadAsImage}
              className={`${config.buttonColor} text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center`}
            >
              <Download className="w-5 h-5 mr-2" />
              Download as Image
            </button>

            <button
              onClick={shareImage}
              className={`${config.buttonColor} text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center`}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Image
            </button>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className={`text-sm ${config.accentColor} opacity-80`}>
              Created with ❤️ using Diwali Wish Creator
            </p>
            
          </div>
        </div>
      </div>
    </div>
  )
}
