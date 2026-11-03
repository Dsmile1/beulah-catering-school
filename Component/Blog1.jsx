
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../src/lib/supabaseClient'

function getImageUrl(path) {
  if (!path) return null

  return supabase.storage
    .from('blog-images')
    .getPublicUrl(path).data.publicUrl
}

export default function Blog1() {
  const [posts, setPosts] = useState([])
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      setError('')

      const { data, error } = await supabase
        .from('blog_posts')
        .select(
          'id, title, slug, excerpt, category, author, cover_image_path, published_at, created_at'
        )
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (error) {
        console.error('Error loading blog:', error)
        setError('We could not load articles right now. Please try again.')
      } else {
        setPosts(data || [])
      }

      setLoading(false)
    }

    fetchPosts()
  }, [])

  const categories = [
    'All',
    ...new Set(posts.map((post) => post.category).filter(Boolean)),
  ]

  const filteredPosts = posts.filter((post) => {
  const matchesCategory =
    category === 'All' || post.category === category

  const searchableText = [
    post.title,
    post.excerpt,
    post.category,
    post.author,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  const matchesSearch = searchableText.includes(
    searchTerm.trim().toLowerCase()
  )

  return matchesCategory && matchesSearch
})

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Blog hero */}
      <section className="bg-[#f2e0e0] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 mt-25">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            Beulah Catering School
          </p>

          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Our Culinary Blog
          </h1>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-blue-500" />

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-700 sm:text-lg">
            Explore delicious recipes, professional cooking tips, student
            success stories, food business advice, and the latest news
            from Beulah Catering School.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="px-5 py-14 sm:px-8 sm:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
            <div className="mb-8">
         <label
            htmlFor="blog-search"
            className="mb-2 block font-semibold text-gray-700"
         >
            Search articles
         </label>

         <div className="relative max-w-2xl">
         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
         🔍
         </span>

         <input
            id="blog-search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes, cooking tips, school news..."
            className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-4 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
         />
         </div>
         </div>
          {!loading && posts.length > 0 && (
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="font-semibold text-gray-700">
                Explore:
              </span>

              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    category === item
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-blue-50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="py-20 text-center text-gray-600">
              Loading articles...
            </div>
          ) : error ? (
            <div className="rounded-xl bg-red-50 p-6 text-center text-red-700">
              {error}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800">
                {searchTerm.trim()
                ? 'No matching articles found.'
                : posts.length === 0
                ? 'Our blog is getting ready!'
                : 'No articles in this category yet.'}
              </h2>

              <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
                {searchTerm.trim()
                 ? 'Try another search term or clear your search to see more articles.'
                 : posts.length === 0
                 ? 'Our recipes, culinary tips, student stories, and school news will appear here when published.'
                 : 'Choose another category to explore our articles.'}
              </p>

              {category !== 'All' && (
                <button
                  type="button"
                  onClick={() => setCategory('All')}
                  className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
                >
                  View All Articles
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => {
                const imageUrl = getImageUrl(post.cover_image_path)

                return (
                  <article
                    key={post.id}
                    className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={post.title}
                        loading="lazy"
                        className="h-56 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-56 items-center justify-center bg-blue-50 text-blue-700">
                        <span className="text-5xl" aria-hidden="true">
                          🍲
                        </span>
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                          {post.category}
                        </span>

                        <span className="text-xs text-gray-500">
                          {new Date(
                            post.published_at || post.created_at
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold leading-snug text-gray-900">
                        {post.title}
                      </h2>

                      <p className="mt-3 flex-1 leading-7 text-gray-600">
                        {post.excerpt}
                      </p>

                      <p className="mt-4 text-sm text-gray-500">
                        By {post.author}
                      </p>

                      <Link
                        to={`/blog/${encodeURIComponent(post.slug)}`}
                        className="mt-5 inline-flex items-center gap-2 self-start font-bold text-blue-600 hover:text-blue-800"
                      >
                        Read More <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}