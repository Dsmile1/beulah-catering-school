import React from 'react'

const meet = [
  {
    id: 1,
    image: '/madam.jpg',
    name: 'Chef Joy Revelation',
    title: 'Head Chef & Culinary Director',
    description:
      'A visionary leader and master culinarian, she oversees the curriculum and strategic direction of our professional programs. With decades of executive experience, she specializes in advanced kitchen workflow optimization, modern culinary techniques, and professional kitchen management.',
  },
  {
    id: 2,
    image: '/man.jpg',
    name: 'Chef Samuel Yakubu',
    title: 'Executive Chef, Culinary Director',
    description:
      'An expert in African culinary arts with decades of elite kitchen experience, he brings an unparalleled global perspective and a deep seated passion for sharing the richness of African cuisine.',
  },
  {
    id: 3,
    image: '/onyinye.jpg',
    name: 'Chef Onyiyechi Precious',
    title: 'Assistant Pastry Instructor',
    description:
      'A master of precision and artisan craft, this instructor works alongside our lead chefs to guide students through global baking and pastry arts, bringing extensive experience in high-end patisserie.',
  },
  {
    id: 4,
    image: '/sir.jpg',
    name: 'Mr Revelation Israel',
    title: 'School Administrator',
    description:
      'The operational backbone of our academy, ensuring that each student’s educational journey runs seamlessly from enrollment to graduation.',
  },
]

export default function Team() {
  return (
    <section className="bg-gray-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            The People Behind Our School
          </p>

          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Meet Our Team
          </h1>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-blue-500" />

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Meet the dedicated professionals committed to developing your
            culinary skills, sharing their expertise, and helping you succeed.
          </p>
        </div>

        {/* Team profile cards */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-8">
          {meet.map((member) => (
            <article
              key={member.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:flex-row"
            >
              {/* Profile image */}
              <div className="relative h-72 w-full shrink-0 overflow-hidden bg-blue-50 sm:h-auto sm:min-h-[320px] sm:w-2/5">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                    event.currentTarget.nextElementSibling.style.display = 'flex'
                  }}
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                />

                {/* Fallback if the image is missing */}
                <div className="absolute inset-0 hidden items-center justify-center bg-blue-50 text-6xl text-blue-400">
                  👨‍🍳
                </div>
              </div>

              {/* Profile details */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <span className="mb-3 inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                  Team Member
                </span>

                <h2 className="text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
                  {member.name}
                </h2>

                <p className="mt-3 text-sm font-semibold leading-6 text-blue-600 sm:text-base">
                  {member.title}
                </p>

                <div className="my-4 h-1 w-12 rounded-full bg-blue-500" />

                <p className="text-sm leading-7 text-gray-600 sm:text-base">
                  {member.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}