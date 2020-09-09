(async () => {
  const { readFileSync } = require('fs')
  const { createJwt, getToken, getData } = require('./index')

  try {
    const jwtOptions = {
      cert: readFileSync('./data/cert.crt', 'utf-8'),
      privateKey: readFileSync('./data/private.key', 'utf-8'),
      issuer: 'TFK',
      scope: 'global/kontaktinformasjon.read'
    }

    const tokenOptions = {
      url: 'https://oidc-yt2.difi.eon.no/idporten-oidc-provider/token',
      jwt: createJwt(jwtOptions)
    }

    const getDataOptions = {
      url: 'https://oidc-yt2.difi.eon.no/kontaktinfo-oauth2-server/rest/v1/personer',
      token: await getToken(tokenOptions),
      payload: {
        personidentifikatorer: ['23079422568']
      }
    }

    const data = await getData(getDataOptions)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
})()
