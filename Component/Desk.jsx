import React from 'react'

export default function Desk() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-900 mt-32">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bdish.jpg')" }}
        role="img"
        aria-label="Culinary activities at Beulah Catering School"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-black/75" />

      <div className="mx-auto flex min-h-[600px] max-w-7xl items-center justify-center px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28">
        <div className="w-full max-w-4xl text-center text-white">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-blue-300 sm:text-base">
            Our Story
          </p>

          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            From Beulah's Desk
          </h1>

          <div className="mx-auto mb-8 mt-5 h-1 w-24 rounded-full bg-blue-400" />

          <p className="mx-auto max-w-3xl text-left text-base leading-8 text-gray-100 sm:text-lg sm:leading-9">
            Beulah Catering School was established in 2015 in Kaduna State
            with four students in a one-room facility. Founded to promote
            vocational education and self-reliance, the institution has
            remained committed to equipping individuals with practical and
            entrepreneurial skills.

            {' '}In 2016, the school registered with the Federal Government
            of Nigeria and commenced skill acquisition and empowerment
            programmes across various Local Government Areas. The institution
            relocated to Abia State in 2018 and subsequently registered with
            the Abia State Agency for Mass Literacy, Adult and Non-Formal
            Education, expanding its vocational training activities within
            the state.

            {' '}In 2022, Beulah Catering School held its first graduation
            ceremony in Abia State, with 10 graduates. From 2023 to date,
            the institution has continued to train and graduate an increasing
            number of students.

            {' '}Today, Beulah Catering School continues to advance its
            commitment to quality vocational education, skills development,
            entrepreneurship, and human capacity building, contributing
            meaningfully to individual and community empowerment.
          </p>
        </div>
      </div>
    </section>
  )
}