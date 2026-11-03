
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const BUCKET_NAME = 'blog-images'

const categories = [
  'Recipes & Cooking Tips',
  'Baking & Pastry',
  'Student Success Stories',
  'Food Business',
  'School News',
]

function makeSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getImageUrl(path) {
  if (!path) return null

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path)

  return data?.publicUrl || null
}

export default function BlogManagement() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  const [editingPost, setEditingPost] = useState(null)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [author, setAuthor] = useState('Beulah Catering School')
  const [imageFile, setImageFile] = useState(null)

  async function loadBlogPosts() {
    setLoading(true)

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Could not load blog posts:', error)
      setMessage(`Could not load blog posts: ${error.message}`)
      setMessageType('error')
    } else {
      setBlogPosts(data || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    loadBlogPosts()
  }, [])

  function resetForm() {
    setEditingPost(null)
    setTitle('')
    setSlug('')
    setSlugTouched(false)
    setExcerpt('')
    setContent('')
    setCategory(categories[0])
    setAuthor('Beulah Catering School')
    setImageFile(null)

    const fileInput = document.getElementById('blog-cover-image')
    if (fileInput) fileInput.value = ''
  }

  function startEditing(post) {
    setEditingPost(post)
    setTitle(post.title || '')
    setSlug(post.slug || '')
    setSlugTouched(true)
    setExcerpt(post.excerpt || '')
    setContent(post.content || '')
    setCategory(post.category || categories[0])
    setAuthor(post.author || 'Beulah Catering School')
    setImageFile(null)
    setMessage('')

    const fileInput = document.getElementById('blog-cover-image')
    if (fileInput) fileInput.value = ''

    document.getElementById('blog-editor')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  async function savePost(nextStatus) {
    setMessage('')

    const cleanTitle = title.trim()
    const cleanSlug = makeSlug(slug || title)
    const cleanExcerpt = excerpt.trim()
    const cleanContent = content.trim()
    const cleanAuthor = author.trim()

    if (!cleanTitle || !cleanSlug || !cleanExcerpt || !cleanContent) {
      setMessage('Please complete the title, URL slug, excerpt, and article content.')
      setMessageType('error')
      return
    }

    if (!cleanAuthor) {
      setMessage('Please enter the author name.')
      setMessageType('error')
      return
    }

    if (imageFile) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

      if (!allowedTypes.includes(imageFile.type)) {
        setMessage('Please select a JPG, PNG, or WebP image.')
        setMessageType('error')
        return
      }

      if (imageFile.size > 5 * 1024 * 1024) {
        setMessage('The cover image must be 5 MB or smaller.')
        setMessageType('error')
        return
      }
    }

    setSaving(true)
    let newlyUploadedPath = null

    try {
      let coverImagePath = editingPost?.cover_image_path || null

      if (imageFile) {
        const safeFileName = imageFile.name
          .toLowerCase()
          .replace(/[^a-z0-9.-]+/g, '-')

        newlyUploadedPath =
          `covers/${crypto.randomUUID()}-${safeFileName}`

        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(newlyUploadedPath, imageFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: imageFile.type,
          })

        if (uploadError) throw uploadError

        coverImagePath = newlyUploadedPath
      }

      const postData = {
        title: cleanTitle,
        slug: cleanSlug,
        excerpt: cleanExcerpt,
        content: cleanContent,
        category,
        author: cleanAuthor,
        cover_image_path: coverImagePath,
        status: nextStatus,
        published_at:
          nextStatus === 'published'
            ? editingPost?.published_at || new Date().toISOString()
            : null,
        updated_at: new Date().toISOString(),
      }

      let saveError

      if (editingPost) {
        const result = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id)

        saveError = result.error
      } else {
        const result = await supabase
          .from('blog_posts')
          .insert([postData])

        saveError = result.error
      }

      if (saveError) throw saveError

      // Remove the previous image only after the article saves successfully.
      if (
        imageFile &&
        editingPost?.cover_image_path &&
        editingPost.cover_image_path !== newlyUploadedPath
      ) {
        const { error: oldImageError } = await supabase.storage
          .from(BUCKET_NAME)
          .remove([editingPost.cover_image_path])

        if (oldImageError) {
          console.warn('The old cover image could not be removed:', oldImageError)
        }
      }

      resetForm()
      await loadBlogPosts()

      setMessage(
        nextStatus === 'published'
          ? 'Article published successfully!'
          : 'Article saved as a draft!'
      )
      setMessageType('success')
    } catch (error) {
      console.error('Could not save blog post:', error)

      // Clean up a newly uploaded image if saving the article failed.
      if (newlyUploadedPath) {
        await supabase.storage
          .from(BUCKET_NAME)
          .remove([newlyUploadedPath])
      }

      setMessage(
        error.message?.includes('blog_posts_slug_key')
          ? 'That URL slug is already in use. Please choose a different slug.'
          : `Could not save the article: ${error.message || 'Unknown error'}`
      )
      setMessageType('error')
    } finally {
      setSaving(false)
    }
  }

  async function deletePost(post) {
    const confirmed = window.confirm(
      `Permanently delete "${post.title}"? This cannot be undone.`
    )

    if (!confirmed) return

    setMessage('')

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', post.id)

    if (error) {
      setMessage(`Could not delete the article: ${error.message}`)
      setMessageType('error')
      return
    }

    if (post.cover_image_path) {
      const { error: imageError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([post.cover_image_path])

      if (imageError) {
        console.warn('The article was deleted, but its image remains:', imageError)
      }
    }

    if (editingPost?.id === post.id) resetForm()

    setBlogPosts((current) =>
      current.filter((item) => item.id !== post.id)
    )

    setMessage('Article deleted successfully.')
    setMessageType('success')
  }

  return (
    <section className="my-10 space-y-8">
      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Content Management
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Blog Management
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Create articles, save drafts, and publish school news and recipes.
            </p>
          </div>

          <button
            type="button"
            onClick={loadBlogPosts}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          >
            {loading ? 'Refreshing...' : 'Refresh articles'}
          </button>
        </div>

        {message && (
          <p
            role="status"
            className={`mb-6 rounded-lg p-4 text-sm ${
              messageType === 'error'
                ? 'bg-red-50 text-red-700'
                : 'bg-green-50 text-green-700'
            }`}
          >
            {message}
          </p>
        )}

        <div id="blog-editor" className="scroll-mt-6">
          <h3 className="mb-5 text-xl font-bold text-gray-800">
            {editingPost ? 'Edit Article' : 'Write a New Article'}
          </h3>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-2 block font-semibold text-gray-700">
                Article Title *
              </span>
              <input
                type="text"
                value={title}
                onChange={(event) => {
                  const value = event.target.value
                  setTitle(value)

                  if (!slugTouched) setSlug(makeSlug(value))
                }}
                maxLength={180}
                required
                placeholder="e.g. 5 Tips for Baking a Perfect Cake"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-2 block font-semibold text-gray-700">
                Article URL Slug *
              </span>
              <input
                type="text"
                value={slug}
                onChange={(event) => {
                  setSlug(makeSlug(event.target.value))
                  setSlugTouched(true)
                }}
                required
                placeholder="perfect-cake-baking-tips"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <span className="mt-1 block text-xs text-gray-500">
                Used to identify the article in its web address. Each article needs a unique slug.
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block font-semibold text-gray-700">
                Category *
              </span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block font-semibold text-gray-700">
                Author *
              </span>
              <input
                type="text"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                required
                maxLength={100}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-2 block font-semibold text-gray-700">
                Short Excerpt *
              </span>
              <textarea
                value={excerpt}
                onChange={(event) => setExcerpt(event.target.value)}
                rows={3}
                maxLength={350}
                required
                placeholder="Write a short introduction that will appear on the blog card."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
              <span className="mt-1 block text-right text-xs text-gray-500">
                {excerpt.length}/350
              </span>
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-2 block font-semibold text-gray-700">
                Full Article *
              </span>
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows={10}
                required
                placeholder="Write your full article here. Use blank lines to separate paragraphs."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 leading-7 outline-none focus:border-blue-500"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-2 block font-semibold text-gray-700">
                Cover Image (optional)
              </span>
              <input
                id="blog-cover-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) =>
                  setImageFile(event.target.files?.[0] || null)
                }
                className="block w-full rounded-lg border border-gray-300 p-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-700"
              />
              <span className="mt-2 block text-xs text-gray-500">
                JPG, PNG, or WebP; maximum 5 MB.
                {editingPost?.cover_image_path && !imageFile
                  ? ' Leave this empty to keep the current cover image.'
                  : ''}
              </span>

              {editingPost?.cover_image_path && !imageFile && (
                <img
                  src={getImageUrl(editingPost.cover_image_path)}
                  alt="Current article cover"
                  className="mt-4 h-40 w-full max-w-sm rounded-lg object-cover"
                />
              )}
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => savePost('draft')}
              disabled={saving}
              className="rounded-lg border border-gray-300 px-5 py-3 font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save as Draft'}
            </button>

            <button
              type="button"
              onClick={() => savePost('published')}
              disabled={saving}
              className="rounded-lg bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {saving
                ? 'Saving...'
                : editingPost?.status === 'published'
                  ? 'Save & Publish Changes'
                  : 'Publish Article'}
            </button>

            {editingPost && (
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="rounded-lg px-5 py-3 font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-60"
              >
                Cancel Editing
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Existing blog articles */}
      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
        <h3 className="mb-5 text-xl font-bold text-gray-900">
          Your Articles ({blogPosts.length})
        </h3>

        {loading ? (
          <p className="py-6 text-gray-500">Loading articles...</p>
        ) : blogPosts.length === 0 ? (
          <p className="rounded-lg bg-gray-50 p-6 text-gray-600">
            No articles yet. Write your first article above.
          </p>
        ) : (
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center"
              >
                {post.cover_image_path ? (
                  <img
                    src={getImageUrl(post.cover_image_path)}
                    alt={post.title}
                    className="h-32 w-full rounded-lg object-cover sm:w-40"
                  />
                ) : (
                  <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400 sm:w-40">
                    No cover image
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>

                    <span className="text-xs text-gray-500">
                      {post.category}
                    </span>
                  </div>

                  <h4 className="break-words text-lg font-bold text-gray-900">
                    {post.title}
                  </h4>

                  <p className="mt-1 text-sm text-gray-600">
                    {post.excerpt}
                  </p>

                  <p className="mt-2 text-xs text-gray-400">
                    Created{' '}
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => startEditing(post)}
                      className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => deletePost(post)}
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
