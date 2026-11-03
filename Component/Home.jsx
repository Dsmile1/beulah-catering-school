import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const images = [
  '/image1.jpg',
  '/image2.jpg',
  '/image3.jpg',
  '/image4.jpg',
  '/image5.jpg',
  '/image6.jpg',
  '/image7.jpg',
  '/image8.jpg',
  '/image9.jpg',
  '/image10.jpg',
  '/current.jpg',
]

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((previous) => (previous + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="overflow-hidden bg-white">
      <header className="grid min-h-[650px] grid-cols-1 items-center gap-10 bg-[#f2e0e0] px-5 py-12 sm:px-8 sm:py-16 lg:min-h-[700px] lg:grid-cols-2 lg:gap-12 lg:px-16">
        {/* Welcome text */}
        <div className="mx-auto w-full max-w-2xl lg:mx-0">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700 sm:text-base">
            Welcome to Beulah Catering School
          </p>

          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Turn Your Passion for Food into a Profession
          </h1>

          <div className="mb-6 mt-5 h-1 w-24 rounded-full bg-blue-500" />

          <p className="mb-8 max-w-xl text-base leading-8 text-gray-700 sm:text-lg sm:leading-9">
            We provide practical culinary training and catering services,
            equipping aspiring chefs, food enthusiasts, and entrepreneurs
            with the skills and knowledge to grow in the food industry.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-7 py-3.5 text-center font-bold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Learn More
            </Link>

            <Link
              to="/program"
              className="inline-flex items-center justify-center rounded-lg border-2 border-blue-600 px-7 py-3.5 text-center font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Explore Our Programs
            </Link>
          </div>
        </div>

        {/* Automatic image slideshow */}
        <div
          className="relative mx-auto h-[320px] w-full max-w-2xl overflow-hidden rounded-2xl bg-gray-200 shadow-xl sm:h-[420px] lg:h-[520px]"
          aria-label="Beulah Catering School culinary gallery"
        >
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Beulah Catering School culinary training ${index + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
          ))}

          {/* Image position indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setCurrentImage(index)}
                aria-label={`Show slideshow image ${index + 1}`}
                aria-current={index === currentImage ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentImage
                    ? 'w-7 bg-white'
                    : 'w-2.5 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </header>
    </section>
  )
}