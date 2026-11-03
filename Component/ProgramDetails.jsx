import React, { useState } from 'react'
import { IoSchoolOutline } from 'react-icons/io5'
import { TfiTimer } from 'react-icons/tfi'
import { PiCertificateBold } from 'react-icons/pi'
import { SiProgress } from 'react-icons/si'
import { FaXmark } from 'react-icons/fa6'
import { supabase } from '../src/lib/supabaseClient'

const programName = 'Advanced Chefs Diploma (Cuisine)'

const features = [
  {
    id: 1,
    icon: IoSchoolOutline,
    title: 'Advanced Culinary Training',
    description:
      'Develop practical cooking skills and improve your culinary techniques.',
  },
  {
    id: 2,
    icon: TfiTimer,
    title: 'Three Months',
    description:
      'Monday to Friday, 9 AM to 4 PM, according to the school timetable.',
  },
  {
    id: 3,
    icon: PiCertificateBold,
    title: 'Certification',
    description: 'Certificate of completion, subject to school requirements.',
  },
  {
    id: 4,
    icon: SiProgress,
    title: 'Practical Experience',
    description:
      'Build kitchen experience and prepare for professional culinary work.',
  },
]

const curriculum = [
  {
    month: 'Month 1',
    title: 'African Cuisine and Culinary Foundations',
    introduction:
      'Strengthen core culinary techniques while exploring ingredients, flavours and traditional African cooking.',
    topics: [
      'Professional kitchen hygiene, food safety and workstation organisation.',
      'Advanced knife skills, ingredient preparation and mise en place.',
      'Cooking methods, seasoning, spice combinations and flavour balancing.',
      'Preparation of selected Nigerian and other African soups, stews and rice dishes.',
      'Traditional dishes, regional ingredients and cultural food heritage.',
      'Food presentation, portion control and consistency.',
    ],
  },
  {
    month: 'Month 2',
    title: 'Advanced African Cuisine and Menu Development',
    introduction:
      'Build greater precision and creativity when preparing a wider range of African dishes and complete menus.',
    topics: [
      'Preparation of more complex regional dishes and traditional specialities.',
      'Stocks, sauces, marinades and complementary flavour combinations.',
      'Working with poultry, meat, fish and other protein ingredients.',
      'Menu planning, portion calculation and coordinating multiple dishes.',
      'Ingredient selection, food storage and waste reduction.',
      'Practical kitchen teamwork, time management and quality control.',
    ],
  },
  {
    month: 'Month 3',
    title: 'Continental Cuisine and Professional Practice',
    introduction:
      'Explore selected international cooking techniques and apply your skills through practical kitchen assignments.',
    topics: [
      'Introduction to selected European, Asian and American dishes.',
      'Preparation of international sauces, sides and main courses.',
      'Plating techniques, presentation standards and menu consistency.',
      'Adapting recipes, balancing flavours and using ingredients appropriately.',
      'Food costing, purchasing basics and kitchen inventory.',
      'Final practical assessment and preparation for professional kitchen work.',
    ],
  },
]

const learningOutcomes = [
  {
    title: 'Advanced Cooking Techniques',
    description:
      'Improve your handling of ingredients, cooking methods and flavour combinations.',
  },
  {
    title: 'African Culinary Expertise',
    description:
      'Develop a deeper understanding of selected African dishes and regional food traditions.',
  },
  {
    title: 'International Cuisine',
    description:
      'Explore selected continental dishes and broaden your culinary knowledge.',
  },
  {
    title: 'Menu Planning',
    description:
      'Learn to coordinate dishes, manage portions and organise preparation efficiently.',
  },
  {
    title: 'Kitchen Management',
    description:
      'Practise food safety, teamwork, time management and ingredient control.',
  },
  {
    title: 'Professional Readiness',
    description:
      'Build practical experience and confidence for further culinary development.',
  },
]

const galleryImages = [
  '/fd2.jpg',
  '/fd4.jpg',
  '/rice.jpg',
  '/fd5.jpg',
  '/fd1.jpg',
  '/image4.jpg',
]

export default function ProgramDetails() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const openForm = () => {
    setFormMessage('')
    setMessageType('')
    setIsFormOpen(true)
  }

  const closeForm = () => {
    if (!isSubmitting) {
      setIsFormOpen(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isSubmitting) return

    const form = e.currentTarget
    const formData = new FormData(form)

    const firstName = String(formData.get('firstName') || '').trim()
    const lastName = String(formData.get('lastName') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const message = String(formData.get('message') || '').trim()

    if (!firstName || !lastName || !email || !phone) {
      setFormMessage('Please complete all required fields.')
      setMessageType('error')
      return
    }

    setIsSubmitting(true)
    setFormMessage('')
    setMessageType('')

    try {
      const { error } = await supabase
        .from('admission_applications')
        .insert([
          {
            full_name: `${firstName} ${lastName}`.trim(),
            email,
            phone,
            program: programName,
            message: message || null,
          },
        ])

      if (error) throw error

      form.reset()
      setMessageType('success')
      setFormMessage(
        'Your application has been submitted successfully! Our admissions team will contact you.'
      )
    } catch (error) {
      console.error('Advanced Chefs application error:', error)

      setMessageType('error')
      setFormMessage(
        'We could not submit your application. Please try again. If the problem continues, contact the school.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="overflow-hidden bg-gray-50 pt-20 text-gray-800 sm:pt-24">
      {/* Hero */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-16 lg:py-16">
        <div>
          <p className="mb-3 font-semibold uppercase tracking-widest text-blue-600">
            Three-Month Culinary Programme
          </p>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Advanced Chefs Diploma (Cuisine)
          </h1>

          <p className="mb-5 text-base leading-8 text-gray-600 sm:text-lg">
            Take your culinary skills to the next level at Beulah Catering
            School. This intensive programme explores African cuisine,
            selected international dishes, advanced cooking techniques and
            professional kitchen practices through guided learning and
            hands-on training.
          </p>

          <p className="leading-8 text-gray-600">
            It is suited to learners with some culinary knowledge who want to
            strengthen their practical ability, improve their presentation
            skills and prepare for greater responsibility in the kitchen.
          </p>

          <button
            type="button"
            onClick={openForm}
            className="mt-8 rounded-lg bg-blue-500 px-8 py-4 font-bold text-white shadow-md transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Apply Now
          </button>
        </div>

        <div>
          <img
            src="/rice.jpg"
            alt="Culinary dish prepared by Beulah Catering School"
            className="h-[300px] w-full rounded-2xl object-cover shadow-lg sm:h-[400px] lg:h-[500px]"
          />
        </div>
      </div>

      {/* Programme highlights */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 pb-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-16">
        {features.map((item) => {
          const Icon = item.icon

          return (
            <article
              key={item.id}
              className="rounded-xl bg-white p-6 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Icon
                aria-hidden="true"
                className="mx-auto mb-4 text-4xl text-blue-500"
              />

              <h2 className="mb-3 text-xl font-bold text-gray-900">
                {item.title}
              </h2>

              <p className="leading-7 text-gray-600">{item.description}</p>
            </article>
          )
        })}
      </div>

      {/* Programme overview */}
      <div className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:px-16">
        <p className="mb-2 font-semibold uppercase tracking-widest text-blue-600">
          Your Learning Journey
        </p>

        <h2 className="mb-5 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
          Programme Curriculum &amp; Structure
        </h2>

        <p className="mb-10 max-w-4xl leading-8 text-gray-600">
          The three-month programme is structured to develop culinary
          proficiency progressively. Students strengthen their cooking
          foundations, explore more complex African dishes, and gain exposure
          to selected international cuisines. Practical exercises reinforce
          technique, creativity, food presentation and professional kitchen
          discipline.
        </p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {curriculum.map((month) => (
            <article
              key={month.month}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg sm:p-7"
            >
              <span className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
                {month.month}
              </span>

              <h3 className="mb-4 text-xl font-bold leading-snug text-gray-900">
                {month.title}
              </h3>

              <p className="mb-5 leading-7 text-gray-600">
                {month.introduction}
              </p>

              <ul className="space-y-3">
                {month.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-3 leading-7 text-gray-600"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500"
                    />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      {/* Learning outcomes */}
      <div className="bg-blue-50 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 font-semibold uppercase tracking-widest text-blue-600">
            Skills for Your Future
          </p>

          <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
            What You Will Learn
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {learningOutcomes.map((outcome) => (
              <article
                key={outcome.title}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <h3 className="mb-3 text-lg font-bold text-gray-900">
                  {outcome.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {outcome.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Who should enrol */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-16">
        <h2 className="mb-5 text-2xl font-bold text-gray-900 sm:text-3xl">
          Who Should Enrol?
        </h2>

        <p className="max-w-4xl leading-8 text-gray-600">
          This programme is intended for aspiring professional chefs, cooks
          with basic experience, culinary graduates seeking further practice,
          and food entrepreneurs who want to improve their cooking skills.
          Students should be willing to participate in practical kitchen
          sessions, follow food safety standards and learn collaboratively.
        </p>

        <div className="mt-7 rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-bold text-gray-900">
            Practical Experience
          </h3>

          <p className="leading-8 text-gray-600">
            Practical training is an important part of the learning journey.
          </p>
        </div>

        <button
          type="button"
          onClick={openForm}
          className="mt-7 rounded-lg bg-blue-500 px-7 py-3 font-bold text-white transition hover:bg-blue-600"
        >
          Start Your Application
        </button>
      </div>

      {/* Training gallery */}
      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-16">
        <p className="mb-2 font-semibold uppercase tracking-widest text-blue-600">
          Life at Beulah
        </p>

        <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
          Explore Our Culinary Gallery
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Advanced culinary training at Beulah Catering School, image ${index + 1}`}
              loading="lazy"
              className="h-64 w-full rounded-xl object-cover shadow-md transition duration-300 hover:shadow-xl"
            />
          ))}
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={closeForm}
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 ${
          isFormOpen
            ? 'visible opacity-100'
            : 'invisible pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Application sidebar */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-title"
        aria-hidden={!isFormOpen}
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-xl flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
          isFormOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          className="relative flex min-h-[220px] shrink-0 items-center justify-center bg-cover bg-center px-6 py-10 text-center sm:min-h-[260px]"
          style={{ backgroundImage: "url('/rice.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 text-white">
            <h2
              id="application-title"
              className="text-2xl font-extrabold leading-tight sm:text-3xl"
            >
              ADVANCED CHEFS DIPLOMA (CUISINE)
            </h2>

            <p className="mt-4 text-base sm:text-lg">
              Take the next step in your culinary journey.
            </p>
          </div>

          <button
            type="button"
            onClick={closeForm}
            disabled={isSubmitting}
            aria-label="Close application form"
            className="absolute right-4 top-4 z-20 rounded-full bg-white/20 p-3 text-white transition hover:bg-white/40 disabled:opacity-50"
          >
            <FaXmark className="text-xl" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-5 p-5 sm:p-8"
        >
          <p className="leading-7 text-gray-600">
            Complete your details below. Our admissions team will contact you
            about the next steps.
          </p>

          {formMessage && (
            <p
              role="status"
              aria-live="polite"
              className={`rounded-lg p-4 text-sm leading-6 ${
                messageType === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              {formMessage}
            </p>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="advancedFirstName"
                className="mb-2 block font-semibold text-gray-700"
              >
                First Name *
              </label>

              <input
                id="advancedFirstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="Enter first name"
                required
                disabled={isSubmitting}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="advancedLastName"
                className="mb-2 block font-semibold text-gray-700"
              >
                Last Name *
              </label>

              <input
                id="advancedLastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Enter last name"
                required
                disabled={isSubmitting}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="advancedEmail"
              className="mb-2 block font-semibold text-gray-700"
            >
              Email Address *
            </label>

            <input
              id="advancedEmail"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="advancedPhone"
              className="mb-2 block font-semibold text-gray-700"
            >
              Phone Number *
            </label>

            <input
              id="advancedPhone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Enter your phone number"
              required
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="advancedCourse"
              className="mb-2 block font-semibold text-gray-700"
            >
              Selected Programme
            </label>

            <input
              id="advancedCourse"
              name="course"
              value={programName}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600"
            />
          </div>

          <div>
            <label
              htmlFor="advancedMessage"
              className="mb-2 block font-semibold text-gray-700"
            >
              Message (Optional)
            </label>

            <textarea
              id="advancedMessage"
              name="message"
              rows={4}
              placeholder="Tell us anything you would like us to know..."
              disabled={isSubmitting}
              className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-lg bg-blue-500 px-6 py-4 font-bold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting Application...' : 'Send Application'}
          </button>

          <p className="text-center text-sm leading-6 text-gray-500">
            Our admissions team will assist you with the next steps.
          </p>
        </form>
      </aside>
    </section>
  )
}