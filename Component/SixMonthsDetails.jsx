import { useState } from 'react'
import { IoSchool } from 'react-icons/io5'
import { TfiAlarmClock } from 'react-icons/tfi'
import { AiOutlineSafetyCertificate } from 'react-icons/ai'
import { BsBagCheck } from 'react-icons/bs'
import { FaXmark } from 'react-icons/fa6'
import { supabase } from '../src/lib/supabaseClient'

const programName =
  'Executive Chef’s Diploma (Advanced Cuisine, Baking & Kitchen Leadership)'

const features = [
  {
    id: 1,
    icon: IoSchool,
    title: 'Executive Chefs',
    description:
      'For experienced culinary professionals ready to master advanced techniques and executive kitchen leadership.',
  },
  {
    id: 2,
    icon: TfiAlarmClock,
    title: 'Six Months Duration',
    description: '35 hours per week, Monday to Friday, 9 AM to 4 PM.',
  },
  {
    id: 3,
    icon: AiOutlineSafetyCertificate,
    title: 'Certified',
    description: 'Certificate of Completion.',
  },
  {
    id: 4,
    icon: BsBagCheck,
    title: 'Internship',
    description: 'Four months of internship, as listed for this program.',
  },
]

const curriculum = [
  {
    month: 'Month 1',
    title: 'Heritage Roots & Contemporary Patisserie Foundations',
    description: (
      <>
        Explore African culinary traditions, indigenous ingredients, and
        contemporary cooking methods. Develop precision in French baking,
        artisanal doughs, and foundational patisserie techniques.
      </>
    ),
  },
  {
    month: 'Month 2',
    title: 'Advanced Patisserie & Sugar Artistry',
    description: (
      <>
        Practise advanced pastry execution, sugar craft, decorative desserts,
        and refined presentation techniques suited to high-end establishments.
      </>
    ),
  },
  {
    month: 'Month 3',
    title: 'Global Continental Cuisine',
    description: (
      <>
        Explore international culinary traditions, including Italian, French,
        Spanish, and other continental dishes. Practise professional cooking
        methods and modern flavour combinations.
      </>
    ),
  },
  {
    month: 'Month 4',
    title: 'Molecular Gastronomy & Modernist Cuisine',
    description: (
      <>
        Study food science, texture modification, gelification, sous-vide
        cooking, and modernist techniques for creating innovative dining
        experiences.
      </>
    ),
  },
  {
    month: 'Month 5',
    title: 'Kitchen Operations & Volume Management',
    description: (
      <>
        Learn high-volume catering, banquet operations, kitchen workflow,
        equipment planning, and methods for maintaining quality during
        large-scale food production.
      </>
    ),
  },
  {
    month: 'Month 6',
    title: 'Executive Leadership & Culinary Business',
    description: (
      <>
        Develop skills in menu planning, food costing, profitability, stock
        management, supplier coordination, team leadership, and professional
        kitchen management.
      </>
    ),
  },
]

const galleryImages = [
  '/snacks3.jpg',
  '/cake.jpeg',
  '/ss.jpg',
  '/fd6.jpg',
  '/ss4.jpg',
  '/image11.png',
]

export default function FourMonthsDetails() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState({
    type: '',
    text: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)
    setFormMessage({ type: '', text: '' })

    const form = e.currentTarget
    const formData = new FormData(form)

    const firstName = formData.get('firstName')?.toString().trim()
    const lastName = formData.get('lastName')?.toString().trim()
    const email = formData.get('email')?.toString().trim()
    const phone = formData.get('phone')?.toString().trim()
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
            message,
          },
        ])

      if (error) {
        throw error
      }

      setFormMessage({
        type: 'success',
        text: 'Your application has been submitted successfully! Our admissions team will contact you.',
      })

      form.reset()
    } catch (error) {
      console.error('Application submission error:', error)

      setFormMessage({
        type: 'error',
        text: 'We could not submit your application. Please check your connection and try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setFormMessage({ type: '', text: '' })
  }

  return (
    <section className="bg-gray-50">
      {/* Hero section */}
      <div className="mx-auto mt-32 grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-16">
        <div>
          <p className="mb-3 font-semibold uppercase tracking-widest text-blue-600">
            Six Months Culinary Class
          </p>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {programName}
          </h1>

          <p className="leading-8 text-gray-700">
            This elite, six-month immersive masterclass challenges you to
            explore, cook, and present diverse culinary traditions and artisanal
            pastries from across Africa, Europe, Asia, and the Mediterranean.
            Designed for experienced culinary professionals, the curriculum
            combines advanced technical execution with the strategic business
            skills required to lead professional kitchen operations.
          </p>

          <button
            type="button"
            onClick={() => {
              setFormMessage({ type: '', text: '' })
              setIsFormOpen(true)
            }}
            className="mt-10 rounded-lg bg-blue-500 px-8 py-4 font-bold text-white shadow-md transition hover:bg-blue-600"
          >
            Apply Now
          </button>
        </div>

        <div>
          <img
            src="/rice1.jpg"
            alt="Culinary meal prepared by Beulah Catering School"
            className="h-[300px] w-full rounded-2xl object-cover shadow-lg sm:h-[400px] lg:h-[500px]"
          />
        </div>
      </div>

      {/* Program highlights */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 pb-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-16">
        {features.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.id}
              className="rounded-xl bg-white p-6 text-center shadow-md"
            >
              <Icon className="mx-auto mb-4 text-4xl text-blue-400" />

              <h2 className="mb-2 text-xl font-bold text-gray-800">
                {item.title}
              </h2>

              <p className="leading-7 text-gray-600">{item.description}</p>
            </div>
          )
        })}
      </div>

      {/* Curriculum */}
      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-16">
        <h2 className="mb-5 text-2xl font-bold text-gray-900 sm:text-3xl">
          Program Curriculum &amp; Structure
        </h2>

        <p className="mb-8 text-lg leading-8 text-gray-700">
          Designed for experienced culinarians ready to progress towards senior
          kitchen and executive leadership roles, this program develops
          technical mastery, international culinary knowledge, and professional
          management skills.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {curriculum.map((item, index) => (
            <article
              key={item.month}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <p className="mb-2 font-bold text-blue-600">{item.month}</p>

              <h3 className="mb-3 text-xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="leading-7 text-gray-600">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-xl bg-blue-50 p-6 sm:p-8">
          <h3 className="mb-3 text-xl font-bold text-gray-900">
            What You Can Expect to Learn
          </h3>

          <ul className="list-inside list-disc space-y-2 leading-7 text-gray-700">
            <li>Advanced African and continental cooking techniques.</li>
            <li>Professional baking, patisserie, and dessert presentation.</li>
            <li>Modernist cooking methods and food science fundamentals.</li>
            <li>Menu development, food costing, and stock management.</li>
            <li>Kitchen operations, team supervision, and leadership.</li>
            <li>High-volume catering and professional food presentation.</li>
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="mb-3 text-xl font-bold text-gray-900">
            Who Should Apply?
          </h3>

          <p className="leading-8 text-gray-700">
            This program is suitable for experienced cooks, professional chefs,
            culinary entrepreneurs, and food service professionals who want to
            advance their practical skills and develop stronger kitchen
            management capabilities.
          </p>
        </div>
      </div>

      {/* Food gallery */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 pb-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-16">
        {galleryImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Beulah Catering School culinary training ${index + 1}`}
            loading="lazy"
            className="h-64 w-full rounded-xl object-cover shadow-md"
          />
        ))}
      </div>

      {/* Dark overlay */}
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
        {/* Sidebar header */}
        <div
          className="relative flex min-h-[260px] shrink-0 items-center justify-center bg-cover bg-center px-6 py-10 text-center"
          style={{ backgroundImage: "url('/rice1.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 text-white">
            <h2
              id="application-title"
              className="text-2xl font-extrabold leading-tight sm:text-3xl"
            >
              {programName}
            </h2>

            <p className="mt-4 text-base sm:text-lg">
              Take the next step in your culinary journey.
            </p>
          </div>

          <button
            type="button"
            onClick={closeForm}
            aria-label="Close application form"
            className="absolute right-4 top-4 z-20 rounded-full bg-white/20 p-3 text-white transition hover:bg-white/40"
          >
            <FaXmark className="text-xl" />
          </button>
        </div>

        {/* Application form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-5 p-5 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block font-semibold text-gray-700"
              >
                First Name *
              </label>

              <input
                id="firstName"
                name="firstName"
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
                htmlFor="lastName"
                className="mb-2 block font-semibold text-gray-700"
              >
                Last Name *
              </label>

              <input
                id="lastName"
                name="lastName"
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
              name="email"
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
              name="phone"
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
              htmlFor="applicationProgram"
              className="mb-2 block font-semibold text-gray-700"
            >
              Program
            </label>

            <input
              id="applicationProgram"
              name="program"
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

          {/* Submission feedback */}
          {formMessage.text && (
            <p
              role="status"
              aria-live="polite"
              className={`rounded-lg p-4 text-sm leading-6 ${
                formMessage.type === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {formMessage.text}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-auto w-full rounded-lg bg-blue-500 px-6 py-4 font-bold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Send Application'}
          </button>

          <p className="text-center text-sm text-gray-500">
            Our admissions team will assist you with the next steps.
          </p>
        </form>
      </aside>
    </section>
  )
}