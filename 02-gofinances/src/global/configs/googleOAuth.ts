export const googleOAuth = {
  AUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
  USER_INFO_URL: 'https://www.googleapis.com/oauth2/v1/userinfo',
  CLIENT_ID: process.env.GOOGLE_APP_CLIENT_ID,
  REDIRECT_URI: process.env.GOOGLE_APP_REDIRECT_URI,
  RESPONSE_TYPE: 'token',
  SCOPE: encodeURI('profile email'),
}