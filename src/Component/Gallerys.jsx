
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import GalleryComments from './GalleryComments'


export default function Gallerys() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function fetchGalleryPosts() {
      setLoading(true)
      setErrorMessage('')

      try {
        const { data, error } = await supabase
          .from('gallery_posts')
          .select('id, author_name, title, description, image_url, created_at')
          .eq('approved', true)
          .order('created_at', { ascending: false })

        if (error) {
          throw error
        }

        const postsWithImages = await Promise.all(
          (data || []).map(async (post) => {
            const { data: imageData, error: imageError } =
              await supabase.storage
                .from('gallery-photos')
                .createSignedUrl(post.image_url, 3600)

            if (imageError) {
              console.error(
                'Could not load image for:',
                post.title,
                imageError
              )

              return { ...post, displayImage: null }
            }

            return {
              ...post,
              displayImage: imageData.signedUrl,
            }
          })
        )

        setPosts(postsWithImages)
      } catch (error) {
        console.error('Could not load gallery:', error)
        setErrorMessage(
          'We could not load the gallery. Please try again later.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryPosts()
  }, [])

  return (
    <main>
      {/* Gallery heading */}
      <section className="bg-[#5F99D8] px-4 py-16 text-center text-white sm:py-20">
        <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl mt-20 ">
          Our Food Gallery
        </h1>

        <div className="mx-auto mt-4 h-1 w-28 rounded bg-white" />

        <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg">
          Explore delicious creations, celebrate our students' skills,
          and get inspired by the art of cooking at Beulah Catering School.
        </p>
      </section>

      {/* Approved food pictures */}
      <section className="bg-white px-4 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-3 text-center text-3xl font-bold text-gray-800 sm:text-4xl">
            Delicious Creations
          </h2>

          <p className="mb-10 text-center text-gray-600">
            Food pictures and stories shared by our community.
          </p>

          {loading && (
            <p className="py-10 text-center text-gray-600">
              Loading delicious creations...
            </p>
          )}

          {!loading && errorMessage && (
            <p role="alert" className="py-10 text-center text-red-600">
              {errorMessage}
            </p>
          )}

          {!loading && !errorMessage && posts.length === 0 && (
            <div className="rounded-xl bg-gray-50 px-5 py-12 text-center">
              <p className="text-lg font-semibold text-gray-700">
                No food pictures have been published yet.
              </p>
              <p className="mt-2 text-gray-500">
                Be the first to share a creation with our community!
              </p>
            </div>
          )}

          {!loading && !errorMessage && posts.length > 0 && (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {post.displayImage ? (
                    <img
                      src={post.displayImage}
                      alt={post.title}
                      loading="lazy"
                      className="h-64 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-64 items-center justify-center bg-gray-100 text-gray-500">
                      Image unavailable
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800">
                      {post.title}
                    </h3>

                    <p className="mt-3 whitespace-pre-wrap break-words text-gray-600">
                      {post.description}
                    </p>

                    <p className="mt-5 border-t border-gray-100 pt-4 text-sm font-semibold text-blue-700">
                      Shared by {post.author_name}
                    </p>
                    <GalleryComments postId={post.id} />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Visitor upload form */}
      
    </main>
  )
}