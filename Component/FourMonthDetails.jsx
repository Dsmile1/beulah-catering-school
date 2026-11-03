import React, { useState } from 'react'
import { IoSchool } from 'react-icons/io5'
import { TfiAlarmClock } from 'react-icons/tfi'
import { AiOutlineSafetyCertificate } from 'react-icons/ai'
import { BsBagCheck } from 'react-icons/bs'
import { FaXmark } from 'react-icons/fa6'
import { supabase } from '../src/lib/supabaseClient'

const programName = 'Expert Chefs Diploma (Cuisine)'

const features = [
  {
    id: 1,
    icon: IoSchool,
    title: 'Advanced Chefs',
    description:
      'For learners with culinary experience who want to develop advanced cooking and kitchen leadership skills.',
  },
  {
    id: 2,
    icon: TfiAlarmClock,
    title: 'Four Months',
    description:
      'Monday to Friday, 9 AM to 4 PM, according to the school timetable.',
  },
  {
    id: 3,
    icon: AiOutlineSafetyCertificate,
    title: 'Certification',
    description: 'Certificate of completion, subject to school requirements.',
  },
  {
    id: 4,
    icon: BsBagCheck,
    title: 'Practical Experience',
    description:
      'Develop professional skills through guided practical kitchen training.',
  },
]

const curriculum = [
  {
    month: 'Month 1',
    title: 'African Cuisine and Foundational Patisserie',
    introduction:
      'Strengthen your understanding of African culinary traditions while developing precision in baking and pastry fundamentals.',
    topics: [
      'Explore African ingredients, regional dishes, traditional flavours and spice combinations.',
      'Improve knife skills, ingredient preparation and professional kitchen organisation.',
      'Practise selected African soups, stews, rice dishes and main courses.',
      'Learn the foundations of dough preparation, pastry ingredients and baking measurements.',
      'Understand mixing methods, oven control and baking accuracy.',
      'Develop hygiene, food safety and consistent preparation habits.',
    ],
  },
  {
    month: 'Month 2',
    title: 'Advanced Patisserie and Sugar Craft',
    introduction:
      'Develop your pastry skills through structured practice in baking, dessert preparation and decorative finishing.',
    topics: [
      'Prepare selected cakes, pastries, cookies and enriched dough products.',
      'Explore pastry textures, fillings, creams and dessert components.',
      'Practise cake finishing, piping, decoration and presentation.',
      'Introduction to sugar decoration and appropriate confectionery techniques.',
      'Improve accuracy in measurements, baking temperatures and recipe execution.',
      'Learn product storage, packaging and presentation for customers.',
    ],
  },
  {
    month: 'Month 3',
    title: 'Global and Continental Cuisine',
    introduction:
      'Expand your culinary knowledge by exploring selected dishes and techniques from international food traditions.',
    topics: [
      'Prepare selected European dishes, including examples from French and Italian cuisine.',
      'Explore selected Asian dishes, ingredients and cooking techniques.',
      'Practise selected Mediterranean and other continental recipes.',
      'Prepare complementary sauces, side dishes and main courses.',
      'Develop flavour balance, ingredient substitution and recipe adaptation skills.',
      'Improve plating, portion control and consistency across dishes.',
    ],
  },
  {
    month: 'Month 4',
    title: 'Professional Execution and Kitchen Leadership',
    introduction:
      'Bring your skills together through menu development, practical assessments and an introduction to professional kitchen management.',
    topics: [
      'Develop balanced menus that combine suitable dishes and complementary flavours.',
      'Practise recipe planning, food costing, portion calculation and purchasing basics.',
      'Organise preparation schedules and coordinate multiple dishes efficiently.',
      'Develop skills in kitchen communication, teamwork and task delegation.',
      'Apply food safety, stock management and waste-reduction practices.',
      'Complete a practical culinary project and receive feedback on technique and presentation.',
    ],
  },
]

const learningOutcomes = [
  {
    title: 'African Culinary Arts',
    description:
      'Broaden your knowledge of selected African dishes, traditional ingredients and regional flavours.',
  },
  {
    title: 'Baking and Patisserie',
    description:
      'Develop greater accuracy in baking, pastry preparation, dessert finishing and decoration.',
  },
  {
    title: 'Continental Cuisine',
    description:
      'Explore international recipes and techniques that broaden your culinary range.',
  },
  {
    title: 'Menu Development',
    description:
      'Plan complementary dishes, manage portions and improve food presentation.',
  },
  {
    title: 'Kitchen Organisation',
    description:
      'Practise preparation planning, teamwork, time management and food safety.',
  },
  {
    title: 'Business Awareness',
    description:
      'Build an understanding of food costing, ingredient control and commercial food preparation.',
  },
]

const galleryImages = [
  '/snacks1.jpg',
  '/soup.jpg',
  '/ss1.jpg',
  '/snacks2.jpg',
  '/ss2.jpg',
  '/image1.jpg',
]

export default function FourMonthsDetails() {
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
      console.error('Four-month application error:', error)

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
      {/* Hero section */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-16 lg:py-16">
        <div>
          <p className="mb-3 font-semibold uppercase tracking-widest text-blue-600">
            Four-Month Culinary Programme
          </p>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Expert Chefs Diploma (Cuisine)
          </h1>

          <p className="mb-5 text-base leading-8 text-gray-600 sm:text-lg">
            Advance your culinary journey at Beulah Catering School through
            an immersive programme combining African cuisine, international
            cooking, baking and patisserie. Develop greater technical
            precision, creativity and confidence through practical learning
            and guided culinary exercises.
          </p>

          <p className="leading-8 text-gray-600">
            This programme is intended for learners ready to strengthen their
            existing skills, broaden their culinary knowledge and explore
            professional kitchen practices.
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
            src="/soup.jpg"
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

      {/* Curriculum */}
      <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-16">
        <p className="mb-2 font-semibold uppercase tracking-widest text-blue-600">
          Your Four-Month Journey
        </p>

        <h2 className="mb-5 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
          Programme Curriculum &amp; Structure
        </h2>

        <p className="mb-10 max-w-4xl leading-8 text-gray-600">
          The Expert Chefs Diploma combines cuisine and baking in a
          progressive learning experience. Students explore African culinary
          traditions, develop pastry skills, broaden their understanding of
          continental dishes and apply their knowledge to menu planning and
          professional kitchen practice.
        </p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {curriculum.map((month) => (
            <article
              key={month.month}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg sm:p-8"
            >
              <span className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
                {month.month}
              </span>

              <h3 className="mb-4 text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
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
          This programme is suited to aspiring professional chefs, cooks
          seeking to advance their skills, culinary learners interested in
          baking and international cuisine, and food entrepreneurs who want
          to expand their practical knowledge. A willingness to learn,
          practise and follow food safety standards is essential.
        </p>

        <div className="mt-7 rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-bold text-gray-900">
            Practical Training and Internship
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

      {/* Gallery */}
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
              alt={`Culinary training at Beulah Catering School, image ${index + 1}`}
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
        aria-labelledby="fourMonthApplicationTitle"
        aria-hidden={!isFormOpen}
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-xl flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
          isFormOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          className="relative flex min-h-[220px] shrink-0 items-center justify-center bg-cover bg-center px-6 py-10 text-center sm:min-h-[260px]"
          style={{ backgroundImage: "url('/soup.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 text-white">
            <h2
              id="fourMonthApplicationTitle"
              className="text-2xl font-extrabold leading-tight sm:text-3xl"
            >
              EXPERT CHEFS DIPLOMA (CUISINE)
            </h2>

            <p className="mt-4 text-base sm:text-lg">
              Take the next step in your learning journey.
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

        {/* Admission form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-5 p-5 sm:p-8"
        >
          <p className="leading-7 text-gray-600">
            Complete your details below. Our admissions team will contact
            you about the next steps.
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
                htmlFor="fourMonthFirstName"
                className="mb-2 block font-semibold text-gray-700"
              >
                First Name *
              </label>

              <input
                id="fourMonthFirstName"
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
                htmlFor="fourMonthLastName"
                className="mb-2 block font-semibold text-gray-700"
              >
                Last Name *
              </label>

              <input
                id="fourMonthLastName"
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
              htmlFor="fourMonthEmail"
              className="mb-2 block font-semibold text-gray-700"
            >
              Email Address *
            </label>

            <input
              id="fourMonthEmail"
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
              htmlFor="fourMonthPhone"
              className="mb-2 block font-semibold text-gray-700"
            >
              Phone Number *
            </label>

            <input
              id="fourMonthPhone"
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
              htmlFor="fourMonthCourse"
              className="mb-2 block font-semibold text-gray-700"
            >
              Selected Programme
            </label>

            <input
              id="fourMonthCourse"
              name="course"
              value={programName}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600"
            />
          </div>

          <div>
            <label
              htmlFor="fourMonthMessage"
              className="mb-2 block font-semibold text-gray-700"
            >
              Message (Optional)
            </label>

            <textarea
              id="fourMonthMessage"
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