
import React, { useState } from 'react'
import { IoSchool } from 'react-icons/io5'
import { TfiAlarmClock } from 'react-icons/tfi'
import { AiOutlineSafetyCertificate } from 'react-icons/ai'
import { BsBagCheck } from 'react-icons/bs'
import { FaXmark } from 'react-icons/fa6'
import { supabase } from '../src/lib/supabaseClient'

const programName = 'Three-Week Beginner Baking & Patisserie'

const features = [
  {
    id: 1,
    icon: IoSchool,
    title: 'Beginner Level',
    description: 'No previous experience needed.',
  },
  {
    id: 2,
    icon: TfiAlarmClock,
    title: 'Three Weeks Duration',
    description: 'Monday to Friday, 9 AM to 4 PM.',
  },
  {
    id: 3,
    icon: AiOutlineSafetyCertificate,
    title: 'Certification',
    description: 'Certificate of Completion.',
  },
  {
    id: 4,
    icon: BsBagCheck,
    title: 'Practical Training',
    description: 'Hands-on baking and pastry practice.',
  },
]

const galleryImages = [
  '/snacks5.jpg',
  '/snacks6.jpg',
  '/snacks8.jpg',
  '/snacks10.jpg',
  '/image12.jpg',
  '/image9.jpg',
]

export default function Threeweeks() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionMessage, setSubmissionMessage] = useState('')
  const [submissionError, setSubmissionError] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (isSubmitting) return

    setSubmissionMessage('')
    setSubmissionError(false)
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const firstName =
      formData.get('FirstName')?.toString().trim() || ''
    const lastName =
      formData.get('LastName')?.toString().trim() || ''
    const email =
      formData.get('Email')?.toString().trim() || ''
    const phone =
      formData.get('Phone')?.toString().trim() || ''
    const message =
      formData.get('message')?.toString().trim() || ''

    try {
      const { error } = await supabase
        .from('admission_applications')
        .insert({
          full_name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          program: programName,
          message,
        })

      if (error) throw error

      form.reset()
      setSubmissionMessage(
        'Your application has been submitted successfully! Our admissions team will review it.'
      )
      setSubmissionError(false)
    } catch (error) {
      console.error('Application submission failed:', error)

      setSubmissionMessage(
        'We could not submit your application. Please check your connection and try again.'
      )
      setSubmissionError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  function openApplicationForm() {
    setSubmissionMessage('')
    setSubmissionError(false)
    setIsFormOpen(true)
  }

  function closeApplicationForm() {
    if (isSubmitting) return
    setIsFormOpen(false)
  }

  return (
    <section className="overflow-hidden bg-gray-50">
      {/* Program introduction */}
      <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 lg:mt-24 lg:grid-cols-2 lg:px-16">
        <div>
          <p className="mb-3 font-semibold uppercase tracking-widest text-blue-600">
            Three-Week Culinary Class
          </p>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Beginner Baking &amp; Patisserie
          </h1>

          <p className="text-lg leading-8 text-gray-600">
            Start your baking journey with practical, beginner-friendly
            training. Learn essential baking techniques, prepare delicious
            treats, understand kitchen safety, and build confidence in
            presenting your creations.
          </p>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-bold text-blue-600">✓</span>
              Learn essential baking techniques from the beginning.
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-blue-600">✓</span>
              Practise making cakes, cookies, biscuits, and pastries.
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-blue-600">✓</span>
              Develop presentation, finishing, and packaging skills.
            </li>
          </ul>

          <button
            type="button"
            onClick={openApplicationForm}
            className="mt-10 rounded-lg bg-blue-600 px-8 py-4 font-bold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Apply Now
          </button>
        </div>

        <div>
          <img
            src="/snacks5.jpg"
            alt="Baked treats prepared during culinary training"
            className="h-[300px] w-full rounded-2xl object-cover shadow-lg sm:h-[400px] lg:h-[500px]"
          />
        </div>
      </div>

      {/* Program highlights */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 pb-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-16">
        {features.map((item) => {
          const Icon = item.icon

          return (
            <article
              key={item.id}
              className="rounded-xl bg-white p-6 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Icon className="mx-auto mb-4 text-4xl text-blue-500" />

              <h2 className="mb-2 text-xl font-bold text-gray-800">
                {item.title}
              </h2>

              <p className="leading-7 text-gray-600">
                {item.description}
              </p>
            </article>
          )
        })}
      </div>

      {/* Curriculum */}
      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-16">
        <p className="mb-2 font-semibold uppercase tracking-widest text-blue-600">
          What You Will Learn
        </p>

        <h2 className="mb-5 text-2xl font-bold text-gray-900 sm:text-3xl">
          Program Curriculum &amp; Structure
        </h2>

        <p className="mb-8 max-w-4xl leading-8 text-gray-600">
          Designed for aspiring bakers and absolute beginners, this course
          introduces essential baking methods, pastry fundamentals, kitchen
          safety, and attractive food presentation through practical learning.
        </p>

        <div className="space-y-6">
          <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-bold text-blue-800">
              Week 1: Foundations of Baking
            </h3>
            <p className="leading-8 text-gray-600">
              Understand baking ingredients and their functions, flour types,
              accurate measuring and scaling, mixing methods, oven safety,
              hygiene, and the importance of following recipes correctly.
            </p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-bold text-blue-800">
              Week 2: Essential Bakes &amp; Sweet Treats
            </h3>
            <p className="leading-8 text-gray-600">
              Practise preparing everyday bakery favourites such as cakes,
              cookies, biscuits, and sweet snacks. Learn how to mix batters,
              handle ingredients, monitor baking times, and identify common
              baking mistakes.
            </p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-bold text-blue-800">
              Week 3: Pastry, Finishing &amp; Presentation
            </h3>
            <p className="leading-8 text-gray-600">
              Explore introductory pastry and dough techniques, simple
              fillings, finishing methods, attractive presentation, and
              packaging. Consolidate your skills through practical work and
              prepare to continue learning or explore small-scale baking
              opportunities.
            </p>
          </article>
        </div>

        <div className="mt-10 rounded-xl bg-blue-50 p-6 sm:p-8">
          <h3 className="mb-4 text-xl font-bold text-gray-900">
            Who Should Enrol?
          </h3>

          <ul className="list-inside list-disc space-y-2 leading-7 text-gray-700">
            <li>Absolute beginners interested in baking.</li>
            <li>Food enthusiasts who want to develop practical skills.</li>
            <li>Aspiring home bakers and small baking business owners.</li>
            <li>Anyone seeking a foundation for further pastry training.</li>
          </ul>
        </div>
      </div>

      {/* Food gallery */}
      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-16">
        <div className="mb-8 text-center">
          <p className="mb-2 font-semibold uppercase tracking-widest text-blue-600">
            Learn Through Practice
          </p>

          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Baking &amp; Culinary Gallery
          </h2>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-600">
            Explore examples of the delicious creations and practical
            experiences that inspire our students.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Baking and culinary training example ${index + 1}`}
              loading="lazy"
              className="h-64 w-full rounded-xl object-cover shadow-md transition duration-300 hover:scale-[1.02]"
            />
          ))}
        </div>
      </div>

      {/* Application overlay */}
      <div
        onClick={closeApplicationForm}
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
          className="relative flex min-h-[260px] shrink-0 items-center justify-center bg-cover bg-center px-6 py-10 text-center"
          style={{ backgroundImage: "url('/snacks5.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest">
              Admissions
            </p>

            <h2
              id="application-title"
              className="text-2xl font-extrabold leading-tight sm:text-3xl"
            >
              Beginner Level
            </h2>

            <p className="mt-4 text-base sm:text-lg">
              {programName}
            </p>
          </div>

          <button
            type="button"
            onClick={closeApplicationForm}
            disabled={isSubmitting}
            aria-label="Close application form"
            className="absolute right-4 top-4 z-20 rounded-full bg-white/20 p-3 text-white transition hover:bg-white/40 disabled:opacity-50"
          >
            <FaXmark className="text-xl" />
          </button>
        </div>

        {/* Application form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-5 p-5 sm:p-8"
        >
          <p className="leading-7 text-gray-600">
            Complete the form below to apply. Our admissions team will
            review your application and assist you with the next steps.
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="FirstName"
                className="mb-2 block font-semibold text-gray-700"
              >
                First Name *
              </label>

              <input
                id="FirstName"
                name="FirstName"
                type="text"
                autoComplete="given-name"
                placeholder="Enter first name"
                required
                disabled={isSubmitting}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="LastName"
                className="mb-2 block font-semibold text-gray-700"
              >
                Last Name *
              </label>

              <input
                id="LastName"
                name="LastName"
                type="text"
                autoComplete="family-name"
                placeholder="Enter last name"
                required
                disabled={isSubmitting}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="applicationEmail"
              className="mb-2 block font-semibold text-gray-700"
            >
              Email Address *
            </label>

            <input
              id="applicationEmail"
              name="Email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="applicationPhone"
              className="mb-2 block font-semibold text-gray-700"
            >
              Phone Number *
            </label>

            <input
              id="applicationPhone"
              name="Phone"
              type="tel"
              autoComplete="tel"
              placeholder="Enter your phone number"
              required
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="Course"
              className="mb-2 block font-semibold text-gray-700"
            >
              Program
            </label>

            <input
              id="Course"
              name="Course"
              value={programName}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-semibold text-gray-700"
            >
              Message (Optional)
            </label>

            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us anything you would like us to know..."
              disabled={isSubmitting}
              className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {submissionMessage && (
            <p
              role="status"
              aria-live="polite"
              className={`rounded-lg p-4 text-sm ${
                submissionError
                  ? 'bg-red-50 text-red-700'
                  : 'bg-green-50 text-green-700'
              }`}
            >
              {submissionMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-auto w-full rounded-lg bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Send Application'}
          </button>

          <p className="text-center text-sm text-gray-500">
            Your application will be sent to our admissions system for review.
          </p>
        </form>
      </aside>
    </section>
  )
}
