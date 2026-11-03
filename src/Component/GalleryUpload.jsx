
import { useState } from 'react'
import { submitGalleryPost } from '../lib/submitGalleryPost'

export default function GalleryUpload() {
  const [authorName, setAuthorName] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    if (!file) {
      setMessage('Please select a food image.')
      return
    }

    setLoading(true)

    try {
      const result = await submitGalleryPost({
        authorName,
        title,
        description,
        file,
      })

      setMessage(result.message)
      setAuthorName('')
      setTitle('')
      setDescription('')
      setFile(null)
      event.target.reset()
    } catch (error) {
      console.error('Gallery submission failed:', error)
      setMessage(
        error.message ||
        'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-2xl mt-32">
        <h2 className="mb-3 text-center text-3xl font-bold text-blue-700 sm:text-4xl">
          Share Your Food Creation
        </h2>

        <p className="mb-8 text-center text-gray-600">
          Show us what you have made! Submit your food picture
          and a short description for review by our team.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white p-6 shadow-lg sm:p-8"
        >
          <div>
            <label
              htmlFor="authorName"
              className="mb-2 block font-semibold"
            >
              Your name
            </label>
            <input
              id="authorName"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              minLength={2}
              maxLength={100}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label
              htmlFor="foodTitle"
              className="mb-2 block font-semibold"
            >
              Food title
            </label>
            <input
              id="foodTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              minLength={2}
              maxLength={150}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="e.g. Homemade Chocolate Cake"
            />
          </div>

          <div>
            <label
              htmlFor="foodDescription"
              className="mb-2 block font-semibold"
            >
              Short description
            </label>
            <textarea
              id="foodDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minLength={2}
              maxLength={2000}
              rows={4}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Tell us about your food creation..."
            />
          </div>

          <div>
            <label
              htmlFor="foodImage"
              className="mb-2 block font-semibold"
            >
              Upload food picture
            </label>
            <input
              id="foodImage"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) =>
                setFile(e.target.files?.[0] || null)
              }
              required
              className="w-full rounded-lg border border-gray-300 p-3"
            />
            <p className="mt-2 text-sm text-gray-500">
              JPG, PNG or WebP. Maximum size: 5 MB.
            </p>
          </div>

          {message && (
            <p
              role="status"
              className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Submitting...' : 'Submit Food Picture'}
          </button>

          <p className="text-center text-sm text-gray-500">
            Your submission will appear in the gallery only
            after it has been approved.
          </p>
        </form>
      </div>
    </section>
  )
}