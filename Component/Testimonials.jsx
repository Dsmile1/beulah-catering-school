
import React, { useState } from 'react'

const students = [
  {
    id: 1,
    name: 'Ugwunnaya Blessing',
    gender: 'Female',
    image: '/testi1.jpg',
    text: "I'm honoured to have passed through this great institution. Graduation marks not just the end of a chapter, but the beginning of an exciting new journey. Today , as you celebrate the hard work, dedication and resilence that have brought you to this moment,may the knowledge gained and friendships made light the path ahead , guiding every step towards dreams yet to be achieved. Congratulations to the class of 2026. The future is yours.",
  },
  {
    id: 2,
    name: 'Okebugwu Adanna Precious',
    gender: 'Female',
    image: '/testi2.jpg',
    text: "My journey at Beulah Catering School completely exceeded my expectations! The calm, personal learning environment and intense practical sessions gave me the confidence to step out on my own. My favorite highlight? The cake-making classes where I truly felt my growth! Today, I don’t just cook, I create with instinct, precision, and an entrepreneurial mindset. BCS didn't just teach me recipes; it taught me how to turn skills into successful business ventures. My dream of opening a café is closer than ever thanks to the guidance of my Madam and instructors.Congratulations to the graduating class! The future is yours.",
  },
  {
    id: 3,
    name: 'Chef Favour knowledge',
    gender: 'Female',
    image: '/favor.jpg',
    text: "My time at Beulah Catering School was truly transformative. Beyond cooking, they taught me the art, science, and business of culinary excellence—covering everything from hygiene and multi-continental cuisines to baking and event management. Thanks to the practical, hands-on mentorship of Mummy Beulah, whose patience and dedication to perfection are unmatched, I am proud to today stand as a confident, professional chef. Thank you, Beulah, for shaping my future!",
  },
  {
    id: 4,
    name: 'Chef Mary Ibeto',
    gender: 'Female',
    image: '/mary.jpg',
    text: "Joining Beulah Catering School made my dream of becoming a chef a reality. Over the past few months, I mastered everything from African and continental dishes to baking, event decoration, and business management, while growing in discipline, confidence, and character. My heartfelt thanks to Mr. and Mrs. Revelation for their loving guidance, moral support, and patience, as well as the entire staff and my wonderful classmates. I am proud to be a product of Beulah Catering School. Thank you for shaping my future!",
  },
  {
    id: 5,
    name: 'Chef Aneke Onyinye Precious',
    gender: 'Female',
    image: '/onyinye.jpg',
    text: "When people ask about my journey after secondary school, I tell them it all started at Beulah Catering School. I came in with only a passion for basic home cooking, but Beulah transformed it into true culinary artistry. Through their world class practical training and patient mentorship, guiding us to stay focused and foresighted, I overcame my fear of the oven, evolving into someone who now confidently bakes, crafts delicate pastries, and decorates stunning cakes with ease. Beyond cooking, Beulah built my self reliance, instilled workspace discipline, and taught me how to turn my skills into a thriving business. If you want to turn your passion into a career, Beulah is the place to be!",
  },
  {
    id: 6,
    name: 'Chef Esther Ngozi',
    gender: 'Female',
    image: '/esther.jpg',
    text: 'My journey at Beulah Catering School is an unforgettable one. Before joining, baking was simply something I loved doing at home. I had the passion, but I lacked the knowledge, structure, and confidence to call myself a baker. Beulah Catering School completely changed that for me, Under the expert guidance and mentorship of Mummy Beulah, I received top-notch training in proper techniques, accurate measurements, food hygiene, and professional presentation. More than just teaching me recipes, the school taught me to believe in my own hands and built my confidence from the ground up. Today, I can proudly and confidently take orders, handle customers, and deliver quality cakes and snacks that I am truly proud of. I am deeply grateful to the school management, my distinguished Mummy Beulah, and my supportive parents for their endless patience and guidance. Thank you for giving me a foundation that will carry me through life.',
  },

  {
    id: 7,
    name: 'Chef Hannah Chinecherem Ejere',
    gender: 'Female',
    image: '/hannah.jpg',
    text: 'When I walked into Beulah, I came with passion. I loved to cook and bake, but passion alone doesnt make a chef. Beulah taught me that behind every perfect cake and every tasty meal, there are early mornings, burnt attempts, and the courage to start again, To our instructors, Mummy and Daddy Israel Revelation: thank you for all the corrections, for pushing us, and for never letting us serve mediocrity. You didnt just teach us recipes; you taught us standards. You showed us that cleanliness is a skill, presentation is respect, and taste is a memory. To my classmates: we started as strangers, but we are leaving as family. We have shared flour, tears, and absolute chaos in the kitchen. As we graduate, may we carry the name of Beulah with pride wherever we cook.I came to this school as Hannah Ejere, someone who simply likes to bake. Today, I graduate as Chef Hannah Chinecherem Ejere, certified by Beulah Catering School, ready to feed, create, and build a brand that will make this institution proud. This is not the end of our education, a chef never stops learning. This is only the beginning of our journey. Thank you.',

  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  const currentStudent = students[currentIndex]

  const showPrevious = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? students.length - 1 : previousIndex - 1
    )
    setIsExpanded(false)
  }

  const showNext = () => {
    setCurrentIndex((previousIndex) =>
      (previousIndex + 1) % students.length
    )
    setIsExpanded(false)
  }

  const showStudent = (index) => {
    setCurrentIndex(index)
    setIsExpanded(false)
  }

  const previewLength = 240
  const isLongText = currentStudent.text.length > previewLength
  const displayedText =
    isExpanded || !isLongText
      ? currentStudent.text
      : `${currentStudent.text.slice(0, previewLength).trim()}...`

  return (
    <section
      id="testimonials"
      className="overflow-hidden bg-gray-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 text-center sm:mb-14">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Our Students' Experiences
          </p>

          <h2 className="text-3xl font-extrabold text-gray-800 sm:text-5xl lg:text-6xl">
            Testimonials
          </h2>

          <div className="mx-auto mt-5 h-1 w-32 rounded-full bg-blue-500" />

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Discover how Beulah Catering School has helped our students
            develop their culinary skills, confidence, and professional dreams.
          </p>
        </div>

        {/* Carousel profile */}
        <div
          className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200"
          aria-live="polite"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Student image */}
            <div className="relative h-[280px] bg-gray-200 sm:h-[400px] lg:h-[500px]">
              <img
                key={currentStudent.image}
                src={currentStudent.image}
                alt={currentStudent.name}
                className={`h-full w-full object-cover ${
                currentStudent.name === 'Chef Mary Ibeto' ||
                currentStudent.name === 'Chef Esther Ngozi'||
                currentStudent.name === 'Chef Hannah Chinecherem Ejere'
                ? 'object-[center_15%]'
                : 'object-center'
          }`}
                loading="lazy"
              />

              <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white">
                Student {currentIndex + 1} of {students.length}
              </div>
            </div>

            {/* Student details */}
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
                Student Testimonial
              </p>

              <h3 className="text-2xl font-extrabold leading-tight text-gray-800 sm:text-3xl lg:text-4xl">
                {currentStudent.name}
              </h3>

              <p className="mt-2 text-sm font-semibold text-gray-500">
                {currentStudent.gender}
              </p>

              <div className="my-5 h-1 w-16 rounded-full bg-blue-500" />

              <p className="whitespace-pre-line text-base leading-8 text-gray-600 sm:text-lg">
                {displayedText}
              </p>

              {isLongText && (
                <button
                  type="button"
                  onClick={() => setIsExpanded((expanded) => !expanded)}
                  aria-expanded={isExpanded}
                  className="mt-4 self-start rounded-md font-bold text-blue-600 underline underline-offset-4 transition hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              )}

              {/* Previous and next controls */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="View previous student"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-600 px-5 py-3 font-bold text-blue-700 transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <span aria-hidden="true">&larr;</span>
                  Previous
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  aria-label="View next student"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  Next
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel navigation dots */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {students.map((student, index) => (
            <button
              key={student.id}
              type="button"
              onClick={() => showStudent(index)}
              aria-label={`View testimonial from ${student.name}`}
              aria-current={index === currentIndex ? 'true' : undefined}
              className={`h-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                index === currentIndex
                  ? 'w-9 bg-blue-600'
                  : 'w-3 bg-gray-300 hover:bg-blue-400'
              }`}
            />
          ))}
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Use the arrows or select a dot to meet more of our students.
        </p>
      </div>
    </section>
  )
}
