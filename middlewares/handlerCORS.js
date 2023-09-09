const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://filmspb.nomoredomainsicu.ru',
  'https://filmspb.nomoredomainsicu.ru',
];

const handlerCORS = (request, response, next) => {
  const { origin } = request.headers;
  const { method } = request;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = request.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    response.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    response.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    response.header('Access-Control-Allow-Headers', requestHeaders);
    return response.end();
  }

  return next();
};

module.exports = handlerCORS;
