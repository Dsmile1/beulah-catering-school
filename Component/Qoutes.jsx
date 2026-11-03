import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../src/lib/supabaseClient'

const states = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo',
  'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
  'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
  'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
  'Federal Capital Territory (FCT)',
]

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100'

const labelClass = 'mb-2 block text-sm font-semibold text-gray-700'

export default function Qoutes() {
  const [searchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category') || ''  
  const [formMessage, setFormMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    setFormMessage('')
    setMessageType('')
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const quoteRequest = {
      first_name: formData.get('first_name').trim(),
      last_name: formData.get('last_name').trim(),
      email: formData.get('email').trim(),
      phone: formData.get('phone').trim(),
      event_date: formData.get('event_date'),
      location: formData.get('location').trim(),
      state: formData.get('state'),
      guest_count: formData.get('guest_count'),
      event_type: formData.get('event_type'),
      catering_category: formData.get('cateringCategory') || '',
      referral_source: formData.get('referral_source'),
      message: formData.get('message').trim(),
    }

    try {
      const { error } = await supabase
        .from('catering_quote_requests')
        .insert([quoteRequest])

      if (error) {
        console.error('Quote submission error:', error)
        throw error
      }

      form.reset()
      setMessageType('success')
      setFormMessage(
        'Your catering quote request has been submitted successfully! Our team will contact you.'
      )
    } catch (error) {
      console.error('Unable to submit quote:', error)
      setMessageType('error')
      setFormMessage(
        'We could not submit your request. Please try again or contact our team directly.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section
        className="relative flex min-h-[300px] items-center justify-center bg-cover bg-center px-5 py-16 text-center sm:min-h-[380px]"
        style={{ backgroundImage: 'url("/ricep.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 mx-auto max-w-4xl text-white">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
            Beulah Exquisite Catering
          </p>

          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Let Us Cater to You
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-100 sm:text-lg">
            Exceptional food and thoughtful service for weddings,
            birthdays, corporate events, and every special occasion.
          </p>
        </div>
      </section>

      {/* Quote form */}
      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="font-bold uppercase tracking-widest text-blue-600">
              Plan Your Event
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Get Your Catering Quote
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              Tell us about your event so we can understand your needs
              and prepare a personalised catering quote.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 sm:p-8 lg:p-10"
          >
            {formMessage && (
              <div
                role="status"
                aria-live="polite"
                className={`mb-6 rounded-lg p-4 text-sm leading-6 ${
                  messageType === 'success'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {formMessage}
              </div>
            )}

            <h3 className="mb-5 text-xl font-bold text-gray-900">
              Your Contact Details
            </h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="first_name" className={labelClass}>
                  First Name *
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Enter your first name"
                  required
                  maxLength={100}
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="last_name" className={labelClass}>
                  Last Name *
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Enter your last name"
                  required
                  maxLength={100}
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  maxLength={254}
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Enter your phone number"
                  required
                  maxLength={30}
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>
            </div>

            <h3 className="mb-5 mt-10 text-xl font-bold text-gray-900">
              Your Event Details
            </h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="event_date" className={labelClass}>
                  Date of Event *
                </label>
                <input
                  id="event_date"
                  name="event_date"
                  type="date"
                  min={new Date().toLocaleDateString('en-CA')}
                  required
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="state" className={labelClass}>
                  State *
                </label>
                <select
                  id="state"
                  name="state"
                  defaultValue=""
                  required
                  disabled={isSubmitting}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select your state
                  </option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="location" className={labelClass}>
                  Event Location / Address *
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  autoComplete="street-address"
                  placeholder="Enter the venue or event address"
                  required
                  maxLength={300}
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="guest_count" className={labelClass}>
                  Estimated Number of Guests *
                </label>
                <select
                  id="guest_count"
                  name="guest_count"
                  defaultValue=""
                  required
                  disabled={isSubmitting}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select guest count
                  </option>
                  <option value="1-50">1–50 guests</option>
                  <option value="51-100">51–100 guests</option>
                  <option value="101-200">101–200 guests</option>
                  <option value="201-500">201–500 guests</option>
                  <option value="501-1000">501–1,000 guests</option>
                  <option value="1000+">More than 1,000 guests</option>
                </select>
              </div>

              <div>
                <label htmlFor="event_type" className={labelClass}>
                  Type of Event *
                </label>
                <select
                  id="event_type"
                  name="event_type"
                  defaultValue=""
                  required
                  disabled={isSubmitting}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select event type
                  </option>
                  <option value="Wedding">Wedding</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Religious Event">Religious Event</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Child Dedication">Child Dedication</option>
                  <option value="Funeral">Funeral</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="cateringCategory"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Catering Menu
                </label>

                <select
                 id="cateringCategory"
                 name="cateringCategory"
                 defaultValue={selectedCategory}
                 className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                <option value="">Select a menu category</option>
                <option value="Nigerian Soups & Swallow">
                  Nigerian Soups & Swallow
                </option>
                <option value="Signature Rice Dishes">
                  Signature Rice Dishes
                </option>
                <option value="Premium Proteins">Premium Proteins</option>
                <option value="Fresh Fruit Salads">Fresh Fruit Salads</option>
                <option value="Curated Accompaniments">
                  Curated Accompaniments
                </option>
                <option value="Continental Cuisine">Continental Cuisine</option>
                <option value="Multiple Menu Categories">
                  Multiple Menu Categories
                </option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="referral_source" className={labelClass}>
                  How Did You Hear About Us? *
                </label>
                <select
                  id="referral_source"
                  name="referral_source"
                  defaultValue=""
                  required
                  disabled={isSubmitting}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="Social Media">Social Media</option>
                  <option value="Website">Website</option>
                  <option value="Recommendation">Recommendation</option>
                  <option value="Previous Customer">Previous Customer</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelClass}>
                  Additional Information (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={3000}
                  placeholder="Tell us about your menu preferences, budget, special requests, or other details..."
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 w-full rounded-lg bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? 'Submitting Request...' : 'Request My Quote'}
            </button>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Submitting this form sends your event details to Beulah
              Exquisite Catering so your team can follow up with you.
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}