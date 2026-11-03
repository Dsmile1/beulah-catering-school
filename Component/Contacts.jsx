import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MdEmail, MdAddIcCall, MdOutlineLocationOn } from 'react-icons/md'
import { BsWhatsapp } from 'react-icons/bs'
import { toast } from 'sonner'


// Validation schema
const Schema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be at most 50 characters long'),

  email: z
    .string()
    .email('Invalid email address'),

  feedback: z
    .string()
    .min(10, 'Feedback must be at least 10 characters long'),

  phone: z
    .string()
    .optional(),
})


// Contact information
const details = [
  {
    id: 1,
    icon: MdOutlineLocationOn,
    title: 'Visit Us',
    description:
      '125 New Umuahia Road, Umuokahia, Aba, Abia State, Nigeria.',
  },
  {
    id: 2,
    icon: MdAddIcCall,
    title: 'Call Us',
    description: '+2347085034895 & 08065293808',
  },
  {
    id: 3,
    icon: MdEmail,
    title: 'Email Us',
    description: 'pleasantjoy4rev@gmail.com',
  },
]


export default function Contacts() {

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  })


  const Submitfn = (data) => {
    console.log(data)

    toast.success('Message sent successfully!', {
      description: `Thank you for reaching out to us, ${data.name}. We will get back to you shortly.`,
    })

    reset()
  }


  return (
    <section
      id="contact"
      className="bg-white py-16 sm:py-20"
    >

      {/* ================= HEADER ================= */}
      {/* Contact Header */}
<div
  className="relative bg-cover bg-center bg-no-repeat py-16 sm:py-20"
  style={{ backgroundImage: "url('/image3.jpg')" }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 max-w-4xl mx-auto text-center px-5">

    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
      GET IN TOUCH
    </h1>

    <div className="w-20 h-1 bg-white mx-auto mt-4 mb-6 rounded-full"></div>

    <p className="text-white text-base sm:text-lg leading-7">
      Contact us today, and a member of our team will get back to you
      shortly. For a faster response, please message us on WhatsApp.
    </p>

  </div>
</div>


      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mt-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">


          {/* ================= CONTACT INFORMATION ================= */}
          <div className="w-full">

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
              Contact Information
            </h2>


            {/* Contact details */}
            <div className="space-y-6">

              {details.map((detail) => {

                const Icon = detail.icon

                return (
                  <div
                    key={detail.id}
                    className="flex items-start gap-4"
                  >

                    <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-3 rounded-full">
                      <Icon className="text-2xl" />
                    </div>

                    <div>

                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                        {detail.title}
                      </h3>

                      <p className="text-gray-600 mt-1 text-sm sm:text-base leading-6">
                        {detail.description}
                      </p>

                    </div>

                  </div>
                )
              })}

            </div>


            {/* ================= WHATSAPP ================= */}
            <div className="mt-10 bg-green-50 rounded-xl p-6">

              <div className="flex items-center gap-3 mb-3">

                <BsWhatsapp className="text-green-600 text-3xl" />

                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Chat with us on WhatsApp
                </h2>

              </div>

              <p className="text-gray-600 mb-5">
                Skip the wait, click below to message our team directly.
              </p>


              <a
                href="https://wa.me/2348065293808"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-md transition w-full sm:w-auto"
              >
                <BsWhatsapp />
                Contact Us.
              </a>

            </div>

          </div>


          {/* ================= CONTACT FORM ================= */}
          <div className="w-full">

            <form
              onSubmit={handleSubmit(Submitfn)}
              className="bg-gray-100 rounded-xl shadow-md p-5 sm:p-8 space-y-5"
            >

              <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800">
                Send Us A Message.
              </h2>

              <p className="text-center text-gray-600 text-sm sm:text-base leading-6">
                Fill out this form, and we will get in touch with you within
                24 hours.
              </p>


              {/* Name */}
              <div>

                <label
                  htmlFor="name"
                  className="block font-semibold text-gray-700 mb-2"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  {...register('name')}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}

              </div>


              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="block font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}

              </div>


              {/* Phone */}
              <div>

                <label
                  htmlFor="phone"
                  className="block font-semibold text-gray-700 mb-2"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="+234"
                  {...register('phone')}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                />

              </div>


              {/* Message */}
              <div>

                <label
                  htmlFor="feedback"
                  className="block font-semibold text-gray-700 mb-2"
                >
                  Leave a Message
                </label>

                <textarea
                  id="feedback"
                  placeholder="Write your message here..."
                  rows={6}
                  {...register('feedback')}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-400"
                />

                {errors.feedback && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.feedback.message}
                  </p>
                )}

              </div>


              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  )
}