function json(body, status = 200) {
  return { status, jsonBody: body, headers: { 'Content-Type': 'application/json' } };
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function getUserId(request) {
  return request.headers.get('x-ms-client-principal-name') || 'local-dev-user';
}

function badRequest(message) {
  return json({ error: message }, 400);
}

module.exports = { badRequest, getUserId, json, readJson };
