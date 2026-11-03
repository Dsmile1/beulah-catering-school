import React from 'react'

export default function About() {
  return (
    <section
      id="about"
      className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Who We Are
          </p>

          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            About Us
          </h2>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-blue-500" />
        </div>

        {/* Image and text */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/image4.jpg"
              alt="Beulah Catering School culinary training"
              className="h-[280px] w-full object-cover sm:h-[400px] lg:h-[480px]"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="mb-5 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
              Turning Culinary Passion into Professional Skills
            </h3>

            <p className="text-base leading-8 text-gray-600 sm:text-lg">
              Beulah Catering School (BCS) is a premier culinary institute
              dedicated to providing affordable, flexible, and professional
              culinary training. We bridge the gap between passion and
              professionalism by equipping aspiring chefs, food enthusiasts,
              and homemakers with world class culinary techniques.
            </p>

            <p className="mt-5 text-base leading-8 text-gray-600 sm:text-lg">
              Beyond the kitchen, BCS empowers future culinary leaders with
              essential food business entrepreneurship skills, paving the
              way for successful startups. Having successfully trained
              hundreds of graduates, BCS continues to raise the benchmark
              for international culinary standards.
            </p>

            <div className="mt-7 border-l-4 border-blue-500 bg-blue-50 px-5 py-4">
              <p className="font-semibold leading-7 text-gray-800">
                Our commitment is to make quality culinary education
                accessible while preparing students for real opportunities
                in the food industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}