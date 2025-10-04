require('dotenv').config();

function apiKeyMiddleware(req, res, next) {
  const apiKey = req.get('X-API-Key') || req.get('x-api-key');
  const requireKey = String(process.env.REQUIRE_API_KEY).toLowerCase() === 'true';

  // Logear cabecera y exponerla al resto de middlewares
  if (apiKey) {
    req.apiKey = apiKey;
  }

  // Si se requiere API key y la header no coincide, bloquear
  if (requireKey) {
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).json({ error: 'Invalid or missing X-API-Key' });
    }
  }

  // Añadir cabecera personalizada de respuesta
  res.set('X-API-Version', '1.0');
  next();
}

module.exports = apiKeyMiddleware;