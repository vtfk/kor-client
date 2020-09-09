const axios = require('axios').default

module.exports = async options => {
  if (!options) {
    throw Error('Missing required input: options')
  }
  if (!options.url) {
    throw Error('Missing required input: options.url')
  }
  if (!options.token) {
    throw Error('Missing required input: options.token')
  }
  if (!options.payload) {
    throw Error('Missing required input: options.payload')
  }

  const httpOptions = {
    url: 'https://oidc-yt2.difi.eon.no/kontaktinfo-oauth2-server/rest/v1/personer',
    method: 'post',
    data: options.payload,
    headers: {
      Authorization: `Bearer ${options.token}`
    }
  }

  const { data } = await axios(httpOptions)
  return data
}
