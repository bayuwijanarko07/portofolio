export const githubAuthHeader = () => {
  const config = useRuntimeConfig()

  if (!config.githubToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'GitHub token not configured',
    })
  }

  return {
    Authorization: `Bearer ${config.githubToken}`,
    'Content-Type': 'application/json',
    'User-Agent': 'Nuxt-Cloudflare-App'
  }
}