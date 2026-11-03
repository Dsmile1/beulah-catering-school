import React, { useState } from 'react'
import { FaRegSquarePlus, FaRegSquareMinus } from 'react-icons/fa6'

const faqs = [
  {
    id: 1,
    question: 'How much is the tuition?',
    answer:
      'Tuition fees vary depending on the duration and type of program you choose. Contact our admissions team for current fees and a personalized breakdown.',
    contact: true,
  },
  {
    id: 2,
    question: 'How long is each culinary program?',
    answer:
      'Our programs range from short courses to longer professional diploma programs. Explore the Programs page to compare course durations and details.',
    contact: false,
  },
  {
    id: 3,
    question: 'Do I need previous cooking experience?',
    answer:
      'No previous cooking experience is required for our beginner courses. We welcome aspiring chefs and food enthusiasts and provide guidance to help students develop their culinary skills.',
    contact: false,
  },
  {
    id: 4,
    question: 'Do you provide practical training?',
    answer:
      'Yes. Our culinary programs emphasize hands-on learning, allowing students to practise cooking techniques and develop practical skills in a training environment.',
    contact: false,
  },
  {
    id: 5,
    question: 'What certificate will I receive?',
    answer:
      'Students who successfully complete their program receive a certificate recognizing their achievement. Contact the school to confirm the certificate awarded for your chosen course.',
    contact: true,
  },
  {
    id: 6,
    question: 'Can I pay in installments?',
    answer:
      'Flexible payment options may be available depending on the program. Contact our admissions team to confirm the current payment arrangements.',
    contact: true,
  },
  {
    id: 7,
    question: 'Where is Beulah Catering School located?',
    answer:
      'We are located at 125 New Umuahia Road, Umuokahia, Aba, Abia State, Nigeria.',
    contact: false,
  },
  {
    id: 8,
    question: 'When does the next class start?',
    answer:
      'Class start dates may vary by program. Contact our admissions team to find out the next available start date for your preferred course.',
    contact: true,
  },
  {
    id: 9,
    question: 'How do I register?',
    answer:
      'Choose the program you are interested in and submit the application form on its details page. You can also contact our admissions team for assistance with registration.',
    contact: true,
  },
]

const whatsappLink = 'https://wa.me/2348065293808'

export default function FAQs() {
  const [openId, setOpenId] = useState(null)

  const toggleFAQ = (id) => {
    setOpenId((currentId) => (currentId === id ? null : id))
  }

  return (
    <section
      id="faq"
      className="bg-gray-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-14">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            We Are Here to Help
          </p>

          <h2 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-blue-500" />

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Find answers to common questions about our culinary programs,
            tuition, practical training, and admission process.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id
            const panelId = `faq-answer-${faq.id}`
            const Icon = isOpen ? FaRegSquareMinus : FaRegSquarePlus

            return (
              <article
                key={faq.id}
                className={`overflow-hidden rounded-xl border bg-white transition ${
                  isOpen
                    ? 'border-blue-200 shadow-md'
                    : 'border-gray-200 shadow-sm hover:border-blue-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 sm:p-6"
                >
                  <span className="text-base font-semibold leading-7 text-gray-800 sm:text-lg">
                    {faq.question}
                  </span>

                  <Icon
                    aria-hidden="true"
                    className={`shrink-0 text-xl sm:text-2xl ${
                      isOpen ? 'text-blue-700' : 'text-blue-500'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    className="border-t border-gray-100 px-5 pb-6 pt-4 sm:px-6"
                  >
                    <p className="text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                      {faq.answer}
                    </p>

                    {faq.contact && (
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:text-base"
                      >
                        Contact Admissions on WhatsApp
                      </a>
                    )}
                  </div>
                )}
              </article>
            )
          })}
        </div>

        {/* Closing contact prompt */}
        <div className="mt-10 rounded-2xl bg-blue-50 px-5 py-7 text-center sm:px-8">
          <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Still have questions?
          </h3>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
            Our team is happy to help you choose a program and understand
            the admission process.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Chat with Us
          </a>
        </div>
      </div>
    </section>
  )
}