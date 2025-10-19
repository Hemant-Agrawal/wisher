'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Upload, Sparkles, Heart, User, Phone } from 'lucide-react'

const messages = [
  {
    id: 'traditional',
    title: 'Traditional Blessing',
    headline: '[Your Name] wishes you a very Happy Diwali! 🪔✨',
    message: 'May this Diwali bring you happiness, prosperity, and good health. Wishing you and your family a blessed celebration! 🎆🎊',
    cardImage: null,
    recommendedTheme: 'gold-glow'
  },
  {
    id: 'elegant',
    title: 'Elegant Wishes',
    headline: '[Your Name] sends you warm Diwali greetings! 💜✨',
    message: 'As the festival of lights illuminates our hearts, may your life be filled with joy, peace, and prosperity. Happy Diwali! 🕯️🌟',
    cardImage: null,
    recommendedTheme: 'royal-purple'
  },
  {
    id: 'joyful',
    title: 'Joyful Celebration',
    headline: '[Your Name] wishes you a sparkling Diwali! 🎉✨',
    message: 'Let the light of Diwali brighten your path and bring you endless happiness. Wishing you a joyful celebration! 🎆🎊',
    cardImage: null,
    recommendedTheme: 'festive-orange'
  },
  {
    id: 'peaceful',
    title: 'Peaceful Wishes',
    headline: '[Your Name] sends you peaceful Diwali wishes! 🕯️✨',
    message: 'May the divine light of Diwali bring peace, harmony, and prosperity to your home. Have a blessed celebration! 🌙💫',
    cardImage: null,
    recommendedTheme: 'midnight-sky'
  },
  {
    id: 'prosperity',
    title: 'Prosperity Wishes',
    headline: '[Your Name] wishes you prosperity this Diwali! 💰✨',
    message: 'May Goddess Lakshmi bless you with wealth, success, and abundance. Wishing you a prosperous and blessed Diwali! 🪔💎',
    cardImage: null,
    recommendedTheme: 'gold-glow'
  },
  {
    id: 'family',
    title: 'Family Togetherness',
    headline: '[Your Name] wishes your family a wonderful Diwali! 👨‍👩‍👧‍👦✨',
    message: 'May this Diwali strengthen the bonds of love and togetherness in your family. Enjoy the celebration together! 🏠💕',
    cardImage: null,
    recommendedTheme: 'rose-gold'
  },
  {
    id: 'success',
    title: 'Success & Growth',
    headline: '[Your Name] wishes you success this Diwali! 🚀✨',
    message: 'May the light of Diwali illuminate your path to success and bring you new opportunities. Happy Diwali! 💼🌟',
    cardImage: null,
    recommendedTheme: 'emerald-green'
  },
  {
    id: 'health',
    title: 'Health & Wellness',
    headline: '[Your Name] wishes you good health this Diwali! 💚✨',
    message: 'May this Diwali bring you positive energy, inner peace, and excellent health. Have a healthy celebration! 🌿💪',
    cardImage: null,
    recommendedTheme: 'emerald-green'
  },
  {
    id: 'friendship',
    title: 'Friendship & Love',
    headline: '[Your Name] wishes you a Happy Diwali, dear friend! 👫✨',
    message: 'May the festival of lights strengthen our friendship and fill our hearts with love and joy. Happy Diwali! 💕🤝',
    cardImage: null,
    recommendedTheme: 'rose-gold'
  },
  {
    id: 'new-beginnings',
    title: 'New Beginnings',
    headline: '[Your Name] wishes you new beginnings this Diwali! 🌅✨',
    message: 'May this Diwali mark the start of new opportunities, fresh starts, and beautiful memories. Happy Diwali! 🌟🎯',
    cardImage: null,
    recommendedTheme: 'festive-orange'
  },
  {
    id: 'custom',
    title: 'Write Your Own',
    headline: 'Create your own personalized Diwali message ✍️✨',
    message: 'Write your custom message below',
    cardImage: null,
    recommendedTheme: 'gold-glow'
  }
]

const themes = [
  {
    id: 'gold-glow',
    name: 'Gold Glow',
    color: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    hoverColor: 'hover:from-yellow-300 hover:to-orange-400'
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    color: 'bg-gradient-to-br from-purple-600 to-indigo-800',
    hoverColor: 'hover:from-purple-500 hover:to-indigo-700'
  },
  {
    id: 'festive-orange',
    name: 'Festive Orange',
    color: 'bg-gradient-to-br from-orange-500 to-pink-500',
    hoverColor: 'hover:from-orange-400 hover:to-pink-400'
  },
  {
    id: 'midnight-sky',
    name: 'Midnight Sky',
    color: 'bg-gradient-to-br from-gray-900 to-indigo-900',
    hoverColor: 'hover:from-gray-800 hover:to-indigo-800'
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    color: 'bg-gradient-to-br from-rose-400 to-pink-500',
    hoverColor: 'hover:from-rose-300 hover:to-pink-400'
  },
  {
    id: 'emerald-green',
    name: 'Emerald Green',
    color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    hoverColor: 'hover:from-emerald-400 hover:to-teal-500'
  }
]

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    receiverName: '',
    message: '',
    selectedMessage: '',
    selectedTheme: 'gold-glow',
    senderName: '',
    senderNumber: '',
    showSignature: false,
    signatureName: '',
    signatureNumber: '',
    senderImage: null as File | null,
    customImage: null as File | null
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ 
        ...prev, 
        [name]: checked,
        // Pre-fill signature name with sender name when toggle is enabled
        ...(name === 'showSignature' && checked && prev.senderName ? { signatureName: prev.senderName } : {})
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'sender' | 'custom') => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ 
        ...prev, 
        [type === 'sender' ? 'senderImage' : 'customImage']: file 
      }))
    }
  }

  const nextStep = () => {
    if (currentStep === 1 && formData.selectedMessage) {
      // Set recommended theme based on selected message
      const selectedMessageObj = messages.find(msg => msg.id === formData.selectedMessage)
      if (selectedMessageObj?.recommendedTheme) {
        setFormData(prev => ({ ...prev, selectedTheme: selectedMessageObj.recommendedTheme }))
      }
      setCurrentStep(2)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `wish-images/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('wish-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('wish-images')
      .getPublicUrl(filePath)

    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let customImageUrl = null
      let senderImageUrl = null
      
      if (formData.customImage) {
        customImageUrl = await uploadImage(formData.customImage)
      }
      
      if (formData.senderImage) {
        senderImageUrl = await uploadImage(formData.senderImage)
      }

      const selectedMessageObj = messages.find(msg => msg.id === formData.selectedMessage)
      let finalMessage = formData.selectedMessage === 'custom' ? formData.message : (selectedMessageObj?.message || '')
      let finalHeadline = formData.selectedMessage === 'custom' ? '' : (selectedMessageObj?.headline || '')
      
      // Replace [Your Name] with actual sender name if available
      if (formData.senderName && finalHeadline.includes('[Your Name]')) {
        finalHeadline = finalHeadline.replace(/\[Your Name\]/g, formData.senderName)
      }

      const { data, error } = await supabase
        .from('wishes')
        .insert([
          {
            name: formData.receiverName,
            message: finalMessage,
            headline: finalHeadline,
            theme: formData.selectedTheme,
            image_url: customImageUrl,
            sender_name: formData.senderName,
            sender_number: formData.senderNumber,
            sender_image_url: senderImageUrl,
            signature: formData.showSignature ? formData.signatureName : null,
            signature_number: formData.showSignature ? formData.signatureNumber : null,
            message_type: formData.selectedMessage
          }
        ])
        .select()

      if (error) throw error

      if (data && data[0]) {
        router.push(`/wish/${data[0].id}`)
      }
    } catch (error) {
      console.error('Error creating wish:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-amber-200/30 rounded-full blur-xl animate-float-gentle"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl animate-float-gentle" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-yellow-200/25 rounded-full blur-xl animate-float-gentle" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-amber-300/20 rounded-full blur-2xl animate-float-gentle" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center py-12 px-4">
        <div className="animate-fade-in-up">
          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <Sparkles className="w-10 h-10 text-amber-500 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-amber-400/20 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gradient mx-4">
              Diwali Wish Creator
            </h1>
            <div className="relative">
              <Sparkles className="w-10 h-10 text-amber-500 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-amber-400/20 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Create stunning, personalized Diwali wishes that light up hearts ✨<br />
            <span className="text-amber-600 font-semibold">Choose from beautiful themes and share the joy of Diwali</span>
          </p>
        </div>
      </div>

      {/* Multi-Step Form */}
      <div className="max-w-7xl mx-auto px-4 pb-12 relative z-10">
        <div className="card-glass p-6 sm:p-8 lg:p-10 animate-fade-in-scale">
          {/* Progress Indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-center space-x-6">
              {[1, 2].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 ${
                      currentStep >= step
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-glow animate-pulse-glow'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 2 && (
                    <div
                      className={`w-20 h-2 mx-4 rounded-full transition-all duration-500 ${
                        currentStep > step 
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentStep === 1 && '✨ Choose Your Message'}
                  {currentStep === 2 && '🎨 Customize Your Wish'}
                </h3>
                <p className="text-lg text-gray-600">
                  {currentStep === 1 && 'Select a beautiful Diwali message or create your own'}
                  {currentStep === 2 && 'Pick a stunning theme and add your personal details'}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1: Message Selection */}
            {currentStep === 1 && (
              <div className="animate-fade-in-up">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`relative cursor-pointer card hover-lift transition-all duration-300 ${
                        formData.selectedMessage === message.id
                          ? 'ring-4 ring-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-glow'
                          : 'hover:shadow-xl'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, selectedMessage: message.id }))}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="p-6 text-center">
                        <div className="relative mb-4">
                          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Sparkles className="w-8 h-8 text-white animate-pulse" />
                          </div>
                          {formData.selectedMessage === message.id && (
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse-glow">
                              <span className="text-white text-sm font-bold">✓</span>
                            </div>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-3">{message.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom Message Field - Only show if custom message is selected */}
                {formData.selectedMessage === 'custom' && (
                  <div className="mt-8 animate-slide-in-right">
                    <div className="card p-6">
                      <label htmlFor="message" className="block text-lg font-semibold text-gray-800 mb-4">
                        ✍️ Write Your Custom Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="form-textarea"
                        placeholder="Write your own personalized Diwali message..."
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.selectedMessage}
                    className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
                  >
                    Next Step
                    <span className="ml-3 text-xl">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Theme Selection & Details */}
            {currentStep === 2 && (
                <div className="space-y-8 animate-fade-in-up">
                {/* Theme Selection */}
                <div>
                  <label className="block text-2xl font-bold text-gray-800 mb-6 text-center">
                    🎨 Choose Your Theme *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                    {themes.map((theme, index) => (
                      <div
                        key={theme.id}
                        className="relative cursor-pointer group"
                        onClick={() => setFormData(prev => ({ ...prev, selectedTheme: theme.id }))}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="card hover-lift p-4 text-center">
                          <div
                            className={`w-20 h-20 mx-auto rounded-2xl ${theme.color} ${theme.hoverColor} transition-all transform group-hover:scale-110 border-4 ${
                              formData.selectedTheme === theme.id
                                ? 'border-amber-500 ring-4 ring-amber-200 shadow-glow'
                                : 'border-white shadow-lg'
                            }`}
                          ></div>
                          <p className="text-sm font-semibold text-gray-800 mt-3">
                            {theme.name}
                          </p>
                          {formData.selectedTheme === theme.id && (
                            <div className="absolute -top-2 -right-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse-glow">
                                <span className="text-white text-sm font-bold">✓</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Your Name Field */}
                  <div className="animate-slide-in-right">
                    <label htmlFor="senderName" className="block text-lg font-semibold text-gray-800 mb-3">
                      👤 Your Name *
                    </label>
                    <input
                      type="text"
                      id="senderName"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Enter your name (will appear in headline)"
                    />
                  </div>

                  {/* Receiver Name Field */}
                  <div className="animate-slide-in-right" style={{animationDelay: '0.1s'}}>
                    <label htmlFor="receiverName" className="block text-lg font-semibold text-gray-800 mb-3">
                      🎯 Receiver's Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="receiverName"
                      name="receiverName"
                      value={formData.receiverName}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter receiver's name (optional)"
                    />
                  </div>
                </div>

                {/* Signature Toggle */}
                <div className="card-glass p-6 animate-fade-in-up">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 flex items-center mb-2">
                        <User className="w-6 h-6 mr-3 text-amber-600" />
                        Add Signature
                      </h3>
                      <p className="text-gray-600">
                        Add a separate signature (can be company name)
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="showSignature"
                        checked={formData.showSignature}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-amber-500 peer-checked:to-orange-500"></div>
                    </label>
                  </div>
                </div>

                {/* Signature Fields - Only show when toggle is enabled */}
                {formData.showSignature && (
                  <div className="card p-6 animate-fade-in-up">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                      <User className="w-6 h-6 mr-3 text-amber-600" />
                      Signature Details
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="signatureName" className="block text-lg font-semibold text-gray-800 mb-3">
                          📝 Signature Name (Optional)
                        </label>
                        <input
                          type="text"
                          id="signatureName"
                          name="signatureName"
                          value={formData.signatureName}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Enter signature name (can be company name)"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="signatureNumber" className="block text-lg font-semibold text-gray-800 mb-3">
                          📞 Signature Number (Optional)
                        </label>
                        <input
                          type="tel"
                          id="signatureNumber"
                          name="signatureNumber"
                          value={formData.signatureNumber}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    {/* Photo Upload - Only show when signature is enabled */}
                    <div>
                      <label htmlFor="senderImage" className="block text-lg font-semibold text-gray-800 mb-3">
                        📸 Your Photo (Optional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 cursor-pointer">
                        <input
                          type="file"
                          id="senderImage"
                          name="senderImage"
                          onChange={(e) => handleImageChange(e, 'sender')}
                          accept="image/*"
                          className="hidden"
                        />
                        <label htmlFor="senderImage" className="cursor-pointer">
                          <Upload className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                          <p className="text-lg font-medium text-gray-700">
                            {formData.senderImage ? formData.senderImage.name : 'Click to upload your photo'}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-secondary text-lg px-8 py-4 flex items-center justify-center"
                  >
                    <span className="mr-3 text-xl">←</span>
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !formData.senderName || !formData.selectedTheme}
                    className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Creating Your Wish...
                      </>
                    ) : (
                      <>
                        <Heart className="w-6 h-6 mr-3" />
                        Generate My Wish Page
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
