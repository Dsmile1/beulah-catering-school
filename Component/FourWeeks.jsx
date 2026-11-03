import React, { useState } from 'react'
import { IoSchool } from 'react-icons/io5'
import { TfiAlarmClock } from 'react-icons/tfi'
import { AiOutlineSafetyCertificate } from 'react-icons/ai'
import { BsBagCheck } from 'react-icons/bs'
import { FaXmark } from 'react-icons/fa6'
import { supabase } from '../src/lib/supabaseClient'

const programName = 'Four-Week Beginners Chefs'

const features = [
  {
    id: 1,
    icon: IoSchool,
    title: 'Beginner Friendly',
    description: 'No prior culinary knowledge is required.',
  },
  {
    id: 2,
    icon: TfiAlarmClock,
    title: 'Four Weeks',
    description: 'Monday to Friday, 9 AM to 4 PM.',
  },
  {
    id: 3,
    icon: AiOutlineSafetyCertificate,
    title: 'Certification',
    description: 'Certificate of completion.',
  },
  {
    id: 4,
    icon: BsBagCheck,
    title: 'Practicum',
    description: 'Practical kitchen experience to build confidence.',
  },
]

const curriculum = [
  {
    week: 'Week 1',
    title: 'Kitchen Fundamentals and Knife Skills',
    topics: [
      'Kitchen orientation, hygiene and food safety.',
      'Safe knife handling, cutting techniques and ingredient preparation.',
      'Understanding ingredients, measurements and basic cooking equipment.',
      'Food storage, workstation organisation and mise en place.',
    ],
  },
  {
    week: 'Week 2',
    title: 'Cooking Methods and Savoury Dishes',
    topics: [
      'Boiling, steaming, frying, grilling and sautéing.',
      'Preparing rice dishes, pasta, potatoes and everyday meals.',
      'Preparing soups, sauces, stews and flavourful dishes.',
      'Seasoning, tasting and balancing flavours.',
    ],
  },
  {
    week: 'Week 3',
    title: 'Proteins, Snacks and Food Presentation',
    topics: [
      'Basic preparation of poultry, fish, meat and other proteins.',
      'Preparing selected snacks, appetisers and finger foods.',
      'Understanding portion control and attractive food presentation.',
      'Kitchen timing, teamwork and consistent food quality.',
    ],
  },
  {
    week: 'Week 4',
    title: 'Menu Planning and Practical Assessment',
    topics: [
      'Planning a simple menu and preparing ingredients efficiently.',
      'Food costing, portioning and basic kitchen inventory.',
      'Introduction to food packaging and small food-business operations.',
      'Preparing a practical meal, presenting dishes and receiving feedback.',
    ],
  },
]

const galleryImages = [
  '/snacks7.jpg',
  '/snacks11.jpg',
  '/snacks01.jpg',
  '/snacks2.jpg',
  '/snacks1.jpg',
  '/image4.jpg',
]

export default function FourWeeks() {
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

    setIsSubmitting(true)
    setFormMessage('')
    setMessageType('')

    const form = e.currentTarget
    const formData = new FormData(form)

    const firstName = formData.get('firstName')?.toString().trim() || ''
    const lastName = formData.get('lastName')?.toString().trim() || ''
    const email = formData.get('email')?.toString().trim() || ''
    const phone = formData.get('phone')?.toString().trim() || ''
    const message = formData.get('message')?.toString().trim() || ''

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

      setMessageType('success')
      setFormMessage(
        'Your application has been submitted successfully! Our admissions team will contact you.'
      )

      form.reset()
    } catch (error) {
      console.error('Application submission error:', error)

      setMessageType('error')
      setFormMessage(
        'We could not submit your application. Please check your connection and try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="overflow-hidden bg-gray-50 pt-20 text-gray-800 sm:pt-24">
      {/* Hero section */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-16 lg:py-16">
        <div>
          <p className="mb-3 font-semibold uppercase tracking-widest text-blue-600">
            Four-Week Culinary Class
          </p>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Beginners Chefs
          </h1>

          <p className="text-base leading-8 text-gray-600 sm:text-lg">
            Start your culinary journey at Beulah Catering School. This
            practical, beginner-friendly programme introduces you to essential
            cooking techniques, kitchen safety, flavour development and food
            presentation. Build the confidence to prepare everyday meals and
            take your first steps towards a culinary career or food business.
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
            src="/snacks01.jpg"
            alt="Culinary dish prepared at Beulah Catering School"
            className="h-[300px] w-full rounded-2xl object-cover shadow-lg sm:h-[400px] lg:h-[500px]"
          />
        </div>
      </div>

      {/* Programme highlights */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 pb-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-16">
        {features.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.id}
              className="rounded-xl bg-white p-6 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Icon
                aria-hidden="true"
                className="mx-auto mb-4 text-4xl text-blue-500"
              />

              <h2 className="mb-2 text-xl font-bold text-gray-800">
                {item.title}
              </h2>

              <p className="leading-7 text-gray-600">{item.description}</p>
            </div>
          )
        })}
      </div>

      {/* Programme overview */}
      <div className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:px-16">
        <div className="mb-10 max-w-3xl">
          <p className="mb-2 font-semibold uppercase tracking-widest text-blue-600">
            Learn by Doing
          </p>

          <h2 className="mb-5 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Programme Curriculum &amp; Structure
          </h2>

          <p className="leading-8 text-gray-600">
            Over four weeks, students are introduced to the fundamentals of
            professional cooking through guided lessons and hands-on practice.
            Each week builds on the previous one, helping learners develop
            kitchen discipline, practical skills and confidence in food
            preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {curriculum.map((item, index) => (
            <article
              key={item.week}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8"
            >
              <span className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
                {item.week}
              </span>

              <h3 className="mb-5 text-xl font-bold text-gray-900 sm:text-2xl">
                {item.title}
              </h3>

              <ul className="space-y-3">
                {item.topics.map((topic) => (
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

      {/* What students gain */}
      <div className="bg-blue-50 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
            What You Will Gain
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Practical Cooking Skills',
                description:
                  'Learn essential techniques for preparing a variety of everyday dishes.',
              },
              {
                title: 'Kitchen Confidence',
                description:
                  'Understand food safety, ingredient preparation and kitchen organisation.',
              },
              {
                title: 'Food Presentation',
                description:
                  'Learn the basics of attractive plating, portioning and serving.',
              },
              {
                title: 'Business Awareness',
                description:
                  'Get introduced to menu planning, food costing and small food-business basics.',
              },
              {
                title: 'Teamwork',
                description:
                  'Develop discipline, timing and communication in a kitchen environment.',
              },
              {
                title: 'Practical Assessment',
                description:
                  'Demonstrate the skills you have developed through guided practical work.',
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="leading-7 text-gray-600">{item.description}</p>
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
          This course is suitable for beginners, aspiring chefs, food
          enthusiasts, homemakers and individuals interested in starting a
          food-related business. No previous professional culinary experience
          is required. A willingness to learn, practise and follow kitchen
          safety procedures is essential.
        </p>

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
        <div className="mb-8">
          <p className="mb-2 font-semibold uppercase tracking-widest text-blue-600">
            A Taste of Our Training
          </p>

          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Explore Our Culinary Gallery
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Beulah Catering School culinary gallery ${index + 1}`}
              loading="lazy"
              className="h-64 w-full rounded-xl object-cover shadow-md transition duration-300 hover:shadow-xl"
            />
          ))}
        </div>
      </div>

      {/* Background overlay */}
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
        {/* Form heading */}
        <div
          className="relative flex min-h-[260px] shrink-0 items-center justify-center bg-cover bg-center px-6 py-10 text-center"
          style={{ backgroundImage: "url('/snacks7.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 text-white">
            <h2
              id="application-title"
              className="text-2xl font-extrabold leading-tight sm:text-3xl"
            >
              Join Our Beginners Chefs Programme
            </h2>

            <p className="mt-4 text-base sm:text-lg">
              Your culinary journey starts here.
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

        {/* Application form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-5 p-5 sm:p-8"
        >
          <p className="leading-7 text-gray-600">
            Complete the form below. Our admissions team will contact you about
            the next steps.
          </p>

          {formMessage && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-lg p-4 text-sm leading-6 ${
                messageType === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {formMessage}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="fourFirstName"
                className="mb-2 block font-semibold text-gray-700"
              >
                First Name *
              </label>

              <input
                id="fourFirstName"
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
                htmlFor="fourLastName"
                className="mb-2 block font-semibold text-gray-700"
              >
                Last Name *
              </label>

              <input
                id="fourLastName"
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
              htmlFor="fourEmail"
              className="mb-2 block font-semibold text-gray-700"
            >
              Email Address *
            </label>

            <input
              id="fourEmail"
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
              htmlFor="fourPhone"
              className="mb-2 block font-semibold text-gray-700"
            >
              Phone Number *
            </label>

            <input
              id="fourPhone"
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
              htmlFor="fourCourse"
              className="mb-2 block font-semibold text-gray-700"
            >
              Selected Programme
            </label>

            <input
              id="fourCourse"
              name="course"
              value={programName}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600"
            />
          </div>

          <div>
            <label
              htmlFor="fourMessage"
              className="mb-2 block font-semibold text-gray-700"
            >
              Message (Optional)
            </label>

            <textarea
              id="fourMessage"
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
            Your application will be sent to our admissions database for
            review.
          </p>
        </form>
      </aside>
    </section>
  )
}