
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function GalleryComments({ postId }) {
  const [comments, setComments] = useState([])
  const [authorName, setAuthorName] = useState('')
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let cancelled = false

    async function fetchComments() {
      if (!postId) {
        setComments([])
        setLoading(false)
        return
      }

      setLoading(true)

      const { data, error } = await supabase
        .from('gallery_comments')
        .select('id, author_name, comment, created_at')
        .eq('post_id', postId)
        .eq('approved', true)
        .order('created_at', { ascending: false })

      if (cancelled) return

      if (error) {
        console.error('Could not load comments:', error)
        setMessage('Comments could not be loaded. Please try again later.')
      } else {
        setComments(data || [])
      }

      setLoading(false)
    }

    fetchComments()

    return () => {
      cancelled = true
    }
  }, [postId])

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    if (!postId) {
      setMessage('This food post could not be identified. Please refresh.')
      return
    }

    const name = authorName.trim()
    const text = comment.trim()

    if (name.length < 2 || text.length < 1) {
      setMessage('Please enter your name and a comment.')
      return
    }

    setSubmitting(true)

    try {
      const { error } = await supabase
        .from('gallery_comments')
        .insert({
          post_id: postId,
          author_name: name,
          comment: text,
          approved: false,
        })

      if (error) throw error

      setAuthorName('')
      setComment('')
      setMessage('Thank you! Your comment has been submitted for approval.')
    } catch (error) {
      console.error('Comment submission failed:', error)
      setMessage('Your comment could not be submitted. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mt-5 border-t border-gray-200 pt-4">
      <h4 className="text-lg font-bold text-gray-800">
        Comments ({comments.length})
      </h4>

      {loading ? (
        <p className="mt-3 text-sm text-gray-500">Loading comments...</p>
      ) : (
        <>
          {comments.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500">
              No approved comments yet. Be the first to comment!
            </p>
          ) : (
            <div className="mt-3 space-y-3">
              {comments.map((item) => (
                <div key={item.id} className="rounded-lg bg-gray-50 p-3">
                  <p className="font-semibold text-gray-800">
                    {item.author_name}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm text-gray-600">
                    {item.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <h5 className="font-semibold text-gray-800">Leave a comment</h5>

        <input
          type="text"
          value={authorName}
          onChange={(event) => setAuthorName(event.target.value)}
          placeholder="Your name"
          minLength={2}
          maxLength={100}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />

        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Write your comment..."
          minLength={1}
          maxLength={1000}
          rows={3}
          required
          className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />

        {message && (
          <p role="status" className="text-sm text-blue-700">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || !postId}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Submitting...' : 'Post Comment'}
        </button>

        <p className="text-xs text-gray-500">
          Comments will appear after approval by our team.
        </p>
      </form>
    </section>
  )
}