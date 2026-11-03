
import { supabase } from './supabaseClient'

export async function submitGalleryPost({
  authorName,
  title,
  description,
  file,
}) {
  if (!file) {
    throw new Error('Please select a food image.')
  }

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ]

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Please upload a JPG, PNG, or WebP image.')
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Your image must be 5 MB or smaller.')
  }

  const extensionByType = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  }

  const filePath =
    `pending/${crypto.randomUUID()}.` +
    extensionByType[file.type]

  // Upload the image into the private bucket.
  const { error: uploadError } = await supabase.storage
    .from('gallery-photos')
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    })

  if (uploadError) {
    throw uploadError
  }

  // Save the post for administrator approval.
  const { error: postError } = await supabase
    .from('gallery_posts')
    .insert({
      author_name: authorName.trim(),
      title: title.trim(),
      description: description.trim(),
      image_url: filePath,
      approved: false,
    })

  if (postError) {
    throw postError
  }

  return {
    success: true,
    message: 'Your food picture was submitted for approval!',
  }
}