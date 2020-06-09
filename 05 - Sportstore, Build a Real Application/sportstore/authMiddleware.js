const jwt = require('jsonwebtoken');

// Constants for hashing algorithm.
const APP_SECRET = 'mysecret';
const USERNAME = 'admin';
const PASSWORD = 'secret';

// Public routes.
const anonOps = [
  { method: 'GET', urls: ['/api/products', '/api/categories'] },
  { method: 'POST', urls: ['/api/orders'] },
];

module.exports = function (req, res, next) {
  // If it's one of the public routes.
  if (
    anonOps.find(
      op =>
        op.method === req.method && op.urls.find(url => req.url.startsWith(url))
    )
  ) {
    // Then go ahead.
    next();
  } else if (req.url === '/login' && req.method === 'POST') {
    // If it's a login route.
    // If it has the same username and password.
    if (req.body.username === USERNAME && req.body.password === PASSWORD) {
      // Authenticate and give client a token for future authentication.
      res.json({
        success: true,
        token: jwt.sign(
          {
            data: USERNAME,
            expiresIn: '1h',
          },
          APP_SECRET
        ),
      });
    } else res.json({ success: false });
    res.end();
  } else {
    // If user visits a protected route, then authenticate based on client-stored web token.
    let token = req.headers['authorization'];
    if (token != null && token.startsWith('Bearer<')) {
      token = token.substring(7, token.length - 1);
      jwt.verify(token, APP_SECRET);
      next();
    } else {
      res.statusCode = 401;
      res.end();
    }
  }
};
