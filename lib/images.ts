import { imagePresets, getOptimizedImageUrl } from './cloudinary'

// Helper to check if URL is from Cloudinary
export function isCloudinaryUrl(url: string): boolean {
  return url.includes('cloudinary.com')
}

// Helper to get optimized version of any image URL
export function getOptimizedUrl(url: string, options?: Parameters<typeof getOptimizedImageUrl>[1]): string {
  if (!isCloudinaryUrl(url)) {
    return url // Return original if not Cloudinary
  }
  
  // Extract public ID from Cloudinary URL
  const publicId = extractPublicIdFromUrl(url)
  if (!publicId) return url
  
  return getOptimizedImageUrl(publicId, options)
}

// Extract public ID from Cloudinary URL
function extractPublicIdFromUrl(url: string): string | null {
  // Pattern: https://res.cloudinary.com/{cloud}/image/upload/{transformations}/{public_id}
  const match = url.match(/\/image\/upload\/.+\/(.+)$/)
  return match ? match[1] : null
}
