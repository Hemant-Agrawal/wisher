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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Header */}
      <div className="text-center py-8">
        <div className="flex justify-center items-center mb-4">
          <Sparkles className="w-8 h-8 text-yellow-500 mr-2" />
          <h1 className="text-4xl font-bold text-gray-800">Diwali Wish Creator</h1>
          <Sparkles className="w-8 h-8 text-yellow-500 ml-2" />
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create a personalized Diwali wish page that you can share with your loved ones. 
          Choose a beautiful theme and add your own message!
        </p>
      </div>

      {/* Multi-Step Form */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= step
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 2 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        currentStep > step ? 'bg-yellow-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {currentStep === 1 && 'Choose Your Message'}
                  {currentStep === 2 && 'Customize Your Wish'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {currentStep === 1 && 'Select a Diwali message or write your own'}
                  {currentStep === 2 && 'Pick a theme and add your details'}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1: Message Selection */}
            {currentStep === 1 && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all transform hover:scale-105 ${
                        formData.selectedMessage === message.id
                          ? 'border-yellow-500 ring-2 ring-yellow-200 bg-yellow-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, selectedMessage: message.id }))}
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">{message.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{message.message}</p>
                      </div>
                      {formData.selectedMessage === message.id && (
                        <div className="absolute top-2 right-2">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Custom Message Field - Only show if custom message is selected */}
                {formData.selectedMessage === 'custom' && (
                  <div className="mt-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Write Your Custom Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none"
                      placeholder="Write your own personalized Diwali message..."
                    />
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.selectedMessage}
                    className="bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    Next Step
                    <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Theme Selection & Details */}
            {currentStep === 2 && (
                <div className="space-y-4 sm:space-y-6">
                {/* Theme Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Choose Your Theme *
                  </label>
                  <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                    {themes.map((theme) => (
                      <div
                        key={theme.id}
                        className="relative cursor-pointer group"
                        onClick={() => setFormData(prev => ({ ...prev, selectedTheme: theme.id }))}
                      >
                        <div
                          className={`w-16 h-16 rounded-full ${theme.color} ${theme.hoverColor} transition-all transform group-hover:scale-110 border-4 ${
                            formData.selectedTheme === theme.id
                              ? 'border-yellow-500 ring-4 ring-yellow-200'
                              : 'border-white shadow-lg'
                          }`}
                        ></div>
                        <p className="text-xs text-center mt-2 font-medium text-gray-700">
                          {theme.name}
                        </p>
                        {formData.selectedTheme === theme.id && (
                          <div className="absolute -top-1 -right-1">
                            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Your Name Field */}
                <div>
                  <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="senderName"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="Enter your name (will appear in headline)"
                  />
                </div>

                {/* Receiver Name Field */}
                <div>
                  <label htmlFor="receiverName" className="block text-sm font-medium text-gray-700 mb-2">
                    Receiver's Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="receiverName"
                    name="receiverName"
                    value={formData.receiverName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="Enter receiver's name (optional)"
                  />
                </div>

                {/* Signature Toggle */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Add Signature
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
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
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>
                </div>

                {/* Signature Fields - Only show when toggle is enabled */}
                {formData.showSignature && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Signature Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label htmlFor="signatureName" className="block text-sm font-medium text-gray-700 mb-2">
                          Signature Name (Optional)
                        </label>
                        <input
                          type="text"
                          id="signatureName"
                          name="signatureName"
                          value={formData.signatureName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                          placeholder="Enter signature name (can be company name)"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="signatureNumber" className="block text-sm font-medium text-gray-700 mb-2">
                          Signature Number (Optional)
                        </label>
                        <input
                          type="tel"
                          id="signatureNumber"
                          name="signatureNumber"
                          value={formData.signatureNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    {/* Photo Upload - Only show when signature is enabled */}
                    <div>
                      <label htmlFor="senderImage" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Photo (Optional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <input
                          type="file"
                          id="senderImage"
                          name="senderImage"
                          onChange={(e) => handleImageChange(e, 'sender')}
                          accept="image/*"
                          className="hidden"
                        />
                        <label htmlFor="senderImage" className="cursor-pointer">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">
                            {formData.senderImage ? formData.senderImage.name : 'Click to upload your photo'}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition-all flex items-center"
                  >
                    <span className="mr-2">←</span>
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !formData.senderName || !formData.selectedTheme}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Your Wish...
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 mr-2" />
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
