const jwt = require('jsonwebtoken')
const uuid = require('uuid/v1')
const cleanCert = cert => cert.replace(/(-----(BEGIN|END) (CERTIFICATE|PRIVATE KEY)-----|\n)/g, '')

module.exports = options => {
  if (!options) {
    throw Error('Missing required input: options')
  }
  if (!options.cert) {
    throw Error('Missing required input: options.cert')
  }
  if (!options.privateKey) {
    throw Error('Missing required input: options.privateKey')
  }

  const jwtOptions = {
    audience: options.audience || 'https://eid-vag-opensso.difi.local/idporten-oidc-provider/',
    algorithm: 'RS256',
    issuer: options.issuer || 'test',
    expiresIn: 120,
    header: {
      x5c: cleanCert(options.cert)
    }
  }

  const payload = {
    scope: options.scope || 'global/kontaktinformasjon.read',
    jti: uuid()
  }

  try {
    const token = jwt.sign(payload, options.privateKey, jwtOptions)
    /* Uncomment to debug jwt
      console.log(jwt.decode(token, {complete: true}))
    */
    return token
  } catch (error) {
    throw error
  }
}
