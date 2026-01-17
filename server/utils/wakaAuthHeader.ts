export const wakaAuthHeader = () => {
  const apiKey = process.env.WAKATIME_API_KEY

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'WAKATIME_API_KEY not set',
    })
  }

  return {
    Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
  }
}
