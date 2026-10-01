process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default async function handler(req, res) {
  const path = req.url.replace('/api/proxy', '') || '/';
  const targetUrl = "https://platform-api2.max.ru" + path;

  const options = {
    method: req.method,
    headers: {
      "Authorization": req.headers["authorization"] || "",
      "Content-Type": "application/json"
    }
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
  }

  try {
    const response = await fetch(targetUrl, options);
    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
