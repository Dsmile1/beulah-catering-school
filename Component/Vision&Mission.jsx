import React from 'react'

export default function Vision() {
  return (
    <section className="bg-gray-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Vision */}
        <div className="mb-16 sm:mb-20">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Our Future
            </p>

            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              Our Vision
            </h2>

            <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-blue-500" />
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/image11.png"
                alt="Beulah Catering School vision"
                className="h-[260px] w-full object-cover sm:h-[350px] lg:h-[400px]"
                loading="lazy"
              />
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-md sm:p-9 lg:p-10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-700">
                ✦
              </div>

              <h3 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                Where We Aspire to Be
              </h3>

              <p className="text-base leading-8 text-gray-600 sm:text-lg">
                To be Africa’s premier culinary institute, recognized globally
                for transforming lives through affordable, world class, and
                accessible culinary education and food business
                entrepreneurship.
              </p>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div>
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Our Purpose
            </p>

            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              Our Mission
            </h2>

            <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-blue-500" />
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
            {/* Text first on desktop, image first on mobile */}
            <div className="order-2 rounded-2xl border border-blue-100 bg-white p-6 shadow-md sm:p-9 lg:order-1 lg:p-10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-700">
                ✧
              </div>

              <h3 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                What Drives Us
              </h3>

              <p className="text-base leading-8 text-gray-600 sm:text-lg">
                Our mission is to deliver world class culinary products and
                services while nurturing a new generation of innovative,
                creative chefs. By merging premium culinary arts with robust
                entrepreneurship training, we aim to revolutionize the food
                services industry and establish Africa as a global economic
                powerhouse.
              </p>
            </div>

            <div className="order-1 overflow-hidden rounded-2xl shadow-lg lg:order-2">
              <img
                src="/image12.jpg"
                alt="Culinary education at Beulah Catering School"
                className="h-[260px] w-full object-cover sm:h-[350px] lg:h-[400px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}