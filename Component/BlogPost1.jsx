
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../src/lib/supabaseClient'

export default function BlogPost1() {
  const { slug } = useParams()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    async function fetchPost() {
      setLoading(true)
      setError('')
      setPost(null)

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle()

      if (error) {
        console.error('Error loading article:', error)
        setError('We could not load this article. Please try again.')
      } else if (!data) {
        setError('This article does not exist or is no longer published.')
      } else {
        setPost(data)
      }

      setLoading(false)
    }

    fetchPost()
  }, [slug])

  useEffect(() => {
  async function fetchRelatedPosts() {
    if (!post?.category || !post?.id) return

    const { data, error } = await supabase
      .from('blog_posts')
      .select(
        'id, title, slug, excerpt, category, cover_image_path, published_at, created_at'
      )
      .eq('status', 'published')
      .eq('category', post.category)
      .neq('id', post.id)
      .order('published_at', { ascending: false })
      .limit(3)

    if (error) {
      console.error('Error loading related articles:', error)
      return
    }

    setRelatedPosts(data || [])
   }

      fetchRelatedPosts()
   }, [post])

  if (loading) {
    return (
      <main className="px-5 py-20 text-center text-gray-600">
        Loading article...
      </main>
    )
  }

  if (error || !post) {
    return (
      <main className="px-5 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Article unavailable
        </h1>

        <p className="mt-3 text-gray-600">
          {error || 'This article could not be found.'}
        </p>

        <Link
          to="/blog"
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
        >
          Back to Blog
        </Link>
      </main>
    )
  }

  const imageUrl = post.cover_image_path
    ? supabase.storage
        .from('blog-images')
        .getPublicUrl(post.cover_image_path).data.publicUrl
    : null

  const paragraphs = post.content.split(/\n\s*\n/)

  return (
    <main className="min-h-screen bg-white px-5 py-12 sm:px-8 sm:py-16">
      <article className="mx-auto max-w-4xl">
        <Link
          to="/blog"
          className="font-semibold text-blue-600 hover:text-blue-800"
        >
          ← Back to Blog
        </Link>

        <div className="mt-8">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
            {post.category}
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
            <span>By {post.author}</span>
            <span>
              {new Date(
                post.published_at || post.created_at
              ).toLocaleDateString()}
            </span>
          </div>
        </div>

        {imageUrl && (
          <img
            src={imageUrl}
            alt={post.title}
            className="mt-8 max-h-[520px] w-full rounded-2xl object-cover"
          />
        )}

        {post.excerpt && (
          <p className="mt-8 border-l-4 border-blue-500 pl-5 text-lg font-medium leading-8 text-gray-700 sm:text-xl">
            {post.excerpt}
          </p>
        )}

        <div className="mt-8 space-y-5 text-base leading-8 text-gray-700 sm:text-lg sm:leading-9">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Share this article
          </h2>

        <div className="flex flex-wrap gap-3">
            {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
            `${post.title} - ${window.location.href}`
         )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
        >
            WhatsApp
          </a>

            {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            window.location.href
          )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Facebook
          </a>

           {/* Copy Link */}
          <button
            type="button"
            onClick={async () => {
            try {
            await navigator.clipboard.writeText(window.location.href)
            alert('Article link copied successfully!')
            } catch {
            alert('Unable to copy the link. Please copy it from your browser address bar.')
            }
          }}
           className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-800 transition hover:bg-gray-100"
          >
           Copy Link
          </button>
          </div>

         <Link
           to="/blog"
           className="mt-8 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
         >
          Explore More Articles
         </Link>
        </div>

        
{relatedPosts.length > 0 && (
  <section className="mt-16 border-t border-gray-200 pt-10">
    <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
      Related Articles
    </h2>

    <p className="mt-2 text-gray-600">
      Explore more articles from Beulah Catering School.
    </p>

    <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {relatedPosts.map((related) => {
        const imageUrl = related.cover_image_path
          ? supabase.storage
              .from('blog-images')
              .getPublicUrl(related.cover_image_path).data.publicUrl
          : null

        return (
          <article
            key={related.id}
            className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-lg"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={related.title}
                loading="lazy"
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="flex h-48 items-center justify-center bg-blue-50 text-4xl">
                🍲
              </div>
            )}

            <div className="p-5">
              <p className="text-sm font-semibold text-blue-600">
                {related.category}
              </p>

              <h3 className="mt-2 text-lg font-bold text-gray-900">
                {related.title}
              </h3>

              <p className="mt-2 line-clamp-3 leading-6 text-gray-600">
                {related.excerpt}
              </p>

              <Link
                to={`/blog/${encodeURIComponent(related.slug)}`}
                className="mt-4 inline-flex font-bold text-blue-600 hover:text-blue-800"
              >
                Read More →
              </Link>
            </div>
          </article>
        )
      })}
    </div>
      </section>
     )}

     
     <section className="mt-16 overflow-hidden rounded-2xl bg-[#f2e0e0] px-6 py-10 text-center sm:px-10 sm:py-12">
         <p className="text-sm font-bold uppercase tracking-widest text-blue-700">
           Beulah Catering School
         </p>

         <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl">
           Ready to Turn Your Passion for Cooking into a Career?
         </h2>

         <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-700">
           Develop your culinary skills through practical training with
           Beulah Catering School. Explore our programs and take the next
           step toward your future in the food industry.
         </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
           to="/program"
           className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
          >
           Explore Our Programs
          </Link>

          <Link
            to="/contact"
            className="rounded-lg border border-gray-400 bg-white px-6 py-3 font-bold text-gray-800 transition hover:bg-gray-100"
          >
            Contact Us
          </Link>
        </div>
    </section>


      </article>
    </main>
  )
}