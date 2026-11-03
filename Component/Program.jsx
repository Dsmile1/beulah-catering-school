import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaUtensils } from 'react-icons/fa6'

const dishes = [
  {
    id: 1,
    image: '/snacks5.jpg',
    description: 'Three Weeks Culinary Class',
    subtitle: 'Beginner Baking & Patisserie',
    text: 'Explore party favourites, assorted cookies, jam doughnuts, fish rolls, spring rolls, and more beginner-friendly culinary creations.',
    packages: '7+ specialized culinary packages',
    programLink: '/program/three-weeks',
  },
  {
    id: 2,
    image: '/snacks01.jpg',
    description: 'Four Weeks Culinary Class',
    subtitle: 'Beginners Chefs',
    text: 'Learn to prepare classic sausage rolls, vegetable pies, piping biscuits, citrus-infused orange biscuits, and other delicious dishes.',
    packages: '10+ specialized culinary packages',
    programLink: '/program/four-weeks',
  },
  {
    id: 3,
    image: '/rice.jpg',
    description: 'Three Months Culinary Class',
    subtitle: 'Advanced Chefs Diploma',
    text: 'Build your culinary expertise with samosas, Scotch eggs, peanut candy, rich potato stew, and a wide variety of practical dishes.',
    packages: '36+ specialized culinary packages',
    programLink: '/program/three-months',
  },
  {
    id: 4,
    image: '/soup.jpg',
    description: 'Four Months Culinary Class',
    subtitle: 'Expert Chefs Diploma',
    text: 'Advance your skills with burgers, cookies, chocolate doughnuts, sausage rolls, Spanish soup, and other professional recipes.',
    packages: '55+ specialized culinary packages',
    programLink: '/program/four-months',
  },
  {
    id: 5,
    image: '/rice1.jpg',
    description: 'Six Months Culinary Class',
    subtitle: 'Executive Chef’s Diploma',
    text: 'Develop advanced skills in cuisine, baking, food presentation, and kitchen leadership, with an extensive range of culinary training.',
    packages: '144+ specialized culinary packages',
    programLink: '/program/six-months',
  },
]

export default function Program() {
  return (
    <main className="overflow-hidden bg-white">
      {/* Hero banner */}
      <section className="px-4 pt-6 sm:px-6 lg:px-10">
        <div
          className="relative flex min-h-[320px] items-end overflow-hidden rounded-2xl bg-cover bg-center shadow-lg sm:min-h-[420px] lg:min-h-[520px]"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

          <div className="relative z-10 max-w-4xl px-6 pb-10 sm:px-10 sm:pb-14 lg:px-16 lg:pb-16">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              <FaUtensils />
              BEULAH CATERING SCHOOL
            </p>

            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Discover Your Passion for Culinary Excellence
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-100 sm:text-lg sm:leading-8">
              From your first recipe to advanced professional cuisine, find a
              training program that helps turn your passion for food into
              practical skills.
            </p>

            <a
              href="#available-programs"
              className="mt-7 inline-flex items-center gap-3 rounded-lg bg-blue-500 px-6 py-3 font-bold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Explore Our Programs
              <FaArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-2xl bg-gray-800 px-6 py-10 text-center shadow-lg sm:px-10 sm:py-14">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
              Learn • Practise • Create
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Mastering International Cuisines and Modern Culinary Trends
            </h2>

            <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-blue-400" />
          </div>

          <div>
            <h2 className="mb-5 text-2xl font-bold text-gray-900 sm:text-3xl">
              Your Culinary Journey Starts Here
            </h2>

            <p className="text-base leading-8 text-gray-600 sm:text-lg">
              Your background doesn't define your future. Our culinary
              programs help bridge the gap between passion and professional
              excellence, equipping you with practical cooking skills,
              creativity, and the confidence to grow in the food industry.
            </p>

            <p className="mt-4 text-base leading-8 text-gray-600 sm:text-lg">
              Whether you're a beginner, an aspiring chef, or an experienced
              culinary professional, you can find a program designed to help
              you take the next step.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                Practical Training
              </span>
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                Professional Skills
              </span>
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                Culinary Creativity
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Program cards */}
      <section
        id="available-programs"
        className="scroll-mt-24 bg-gray-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Find Your Path
            </p>

            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              Our Culinary Programs
            </h2>

            <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-blue-500" />

            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              Choose the training duration that matches your goals and explore
              the skills you'll develop at Beulah Catering School.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {dishes.map((dish) => (
              <article
                key={dish.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Card image */}
                <div className="relative overflow-hidden">
                  <img
                    src={dish.image}
                    alt={`${dish.subtitle} at Beulah Catering School`}
                    loading="lazy"
                    className="h-60 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-64"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-70" />

                  <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow">
                    {dish.description}
                  </span>
                </div>

                {/* Card content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-extrabold leading-snug text-gray-900 sm:text-2xl">
                    {dish.subtitle}
                  </h3>

                  <p className="mt-3 flex-1 text-base leading-7 text-gray-600">
                    {dish.text}
                  </p>

                  <p className="mt-5 border-t border-gray-100 pt-4 text-sm font-semibold text-blue-700">
                    {dish.packages}
                  </p>

                  {/* Action buttons */}
                  <div className="mt-5 flex flex-col gap-3">
                    <Link
                      to={dish.programLink}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-3 text-center font-bold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                    >
                      View Program &amp; Apply
                      <FaArrowRight />
                    </Link>

                    <Link
                      to="/contact"
                      className="inline-flex min-h-12 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-center font-bold text-gray-700 transition hover:border-gray-800 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Closing call to action */}
          <div className="mt-14 rounded-2xl bg-blue-600 px-6 py-10 text-center shadow-lg sm:px-10 sm:py-12">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to Begin Your Culinary Journey?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-50">
              Explore a course, discover what's included, and take the next
              step towards your culinary goals.
            </p>

            <Link
              to="/contact"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Talk to Our Team
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}