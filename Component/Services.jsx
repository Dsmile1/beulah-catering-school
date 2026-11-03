
import React from 'react'
import { Link } from 'react-router-dom'
import { SiComma } from 'react-icons/si'

const meal = [
  {
    id: 1,
    image: '/gari.jpg',
    topic: 'Nigerian Soups & Swallow',
    description:
      'Enjoy authentic Nigerian soups, including Afang, Efo-Riro, Egusi, Ogbono, Banga, Owho, Bitterleaf Soup, and Ofe Nsala (White Soup).',
    pair:
      'Pair your soup with freshly prepared Pounded Yam, Eba, Semo, Wheat, or Starch.',
  },
  {
    id: 2,
    image: '/rice2.jpg',
    topic: 'Signature Rice Dishes',
    description:
      'Enjoy our delicious selection of Jollof Rice, Fried Rice, Coconut Rice, Ofada Rice and Sauce, Banga Rice, White Rice and Stew, Rice and Beans, Rice Porridge, and Vegetable Stir-Fry Rice.',
    pair: 'Perfect with refreshing soft drinks or fresh fruit juice.',
  },
  {
    id: 3,
    image: '/meat.jpg',
    topic: 'Premium Proteins',
    description:
      'Enjoy succulent cuts of meat, poultry, and seafood, carefully seasoned and prepared to deliver rich flavours and satisfying meals.',
    pair: 'Available with your choice of complementary sides.',
  },
  {
    id: 4,
    image: '/fruits.jpg',
    topic: 'Fresh Fruit Salads',
    description:
      'Refresh your palate with a colourful selection of seasonal fruits, freshly sliced and beautifully presented.',
    pair: 'A refreshing addition to meals, parties, and special occasions.',
  },
  {
    id: 5,
    image: '/moi.jpeg',
    topic: 'Curated Accompaniments',
    description:
      'Complement your meals with Beulah’s exquisite salad, steamed Moi-Moi, golden fried plantain (Dodo), signature Gizdodo, crunchy coleslaw, classic Nigerian salad, and peppered snails, gizzards, or fish.',
    pair: 'Ideal for buffets, celebrations, and everyday dining.',
  },
  {
    id: 6,
    image: '/cont.jpg',
    topic: 'Continental Cuisine',
    description:
      'Explore international favourites, including Chinese chicken and sweet corn soup, Chinese fried rice with chicken or prawns, Singaporean rice noodles, coconut curry chicken, beef in oyster sauce, sweet chilli chicken with basmati rice, Italian pasta Bolognese, and crispy chicken with chips.',
    pair: 'A delicious choice for private dining, events, and special celebrations.',
  },
]

export default function Services() {
  return (
    <main className="bg-white">
      {/* Hero section */}
      <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14 mt-13">
          <div>
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-blue-600">
              Beulah Exquisite Catering
            </p>

            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Exceptional Catering for Every Occasion
            </h1>

            <div className="mt-5 h-1 w-24 rounded-full bg-blue-500" />

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Premium catering services tailored to your celebrations,
              corporate events, private gatherings, and special occasions.
              We bring delicious food, thoughtful preparation, and beautiful
              presentation to every event.
            </p>

            <h2 className="mt-6 text-xl font-bold text-gray-800">
              Indoor and outdoor catering services
            </h2>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/qoute"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-7 py-3 font-bold text-white transition hover:bg-blue-700"
              >
                Get a Quote
              </Link>

              <a
                href="#our-menu"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-7 py-3 font-bold text-gray-800 transition hover:bg-gray-100"
              >
                Explore Our Menu
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/exq.jpg"
              alt="Professional catering by Beulah Exquisite Catering"
              className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* Introduction quote */}
      <section className="bg-gray-900 px-5 py-12 text-white sm:px-8 sm:py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center">
          <SiComma className="text-4xl text-blue-400" />

          <h2 className="text-2xl font-bold leading-relaxed sm:text-3xl lg:text-4xl">
            We deliver exceptional cuisine through meticulous preparation,
            beautiful presentation, and rich, balanced flavours.
          </h2>

          <p className="max-w-2xl leading-7 text-gray-300">
            From traditional Nigerian favourites to continental dishes,
            we make every meal a memorable part of your occasion.
          </p>
        </div>
      </section>

      {/* Catering menu */}
      <section
        id="our-menu"
        className="bg-gray-50 px-5 py-14 sm:px-8 sm:py-20 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="font-bold uppercase tracking-[0.2em] text-blue-600">
              What We Serve
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Explore Our Catering Menu
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Discover a selection of delicious dishes prepared for your
              events, celebrations, and everyday enjoyment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {meal.map((foods) => (
              <article
                key={foods.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={foods.image}
                  alt={foods.topic}
                  loading="lazy"
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {foods.topic}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {foods.description}
                  </p>

                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="text-sm leading-6 text-gray-500">
                      {foods.pair}
                    </p>
                  </div>

                  <Link
                    to={`/qoute?category=${encodeURIComponent(foods.topic)}`}
                    className="mt-5 inline-flex font-bold text-blue-600 transition hover:text-blue-800"
                  >
                    Enquire About Catering →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-5xl rounded-2xl bg-[#f2e0e0] px-6 py-10 text-center sm:px-12 sm:py-14">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Planning Your Next Event?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-700">
            Let Beulah Exquisite Catering help make your occasion special.
            Contact us to discuss your catering needs and request a quote.
          </p>

          <Link
            to="/contact"
            className="mt-7 inline-flex rounded-lg bg-blue-600 px-7 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </main>
  )
}