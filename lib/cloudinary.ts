// Cloudinary configuration
// Replace 'your_cloud_name' with actual cloud name

export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your_cloud_name'

export const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'your_upload_preset'

// Base URL for Cloudinary
export const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/image/upload'

// Generate optimized image URL with transformations
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: 'auto' | number
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
    crop?: 'fill' | 'fit' | 'scale' | 'thumb'
  } = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill'
  } = options

  const transformations: string[] = [
    `q_${quality}`,
    `f_${format}`,
    `c_${crop}`
  ]

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)

  return `${CLOUDINARY_BASE_URL}/${transformations.join('/')}/${publicId}`
}

// Pre-defined image sizes for common use cases
export const imagePresets = {
  thumbnail: (publicId: string) => getOptimizedImageUrl(publicId, { width: 400, height: 300 }),
  card: (publicId: string) => getOptimizedImageUrl(publicId, { width: 600, height: 400 }),
  hero: (publicId: string) => getOptimizedImageUrl(publicId, { width: 1200, height: 800 }),
  avatar: (publicId: string) => getOptimizedImageUrl(publicId, { width: 200, height: 200, crop: 'thumb' }),
  certificate: (publicId: string) => getOptimizedImageUrl(publicId, { width: 1200, quality: 90 }),
}
