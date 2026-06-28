const { app } = require('@azure/functions');
const { getProfile, saveProfile } = require('../lib/db');
const { badRequest, getUserId, json, readJson } = require('../lib/http');

app.http('profile', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  route: 'profile',
  handler: async (request) => {
    const userId = getUserId(request);
    if (request.method === 'GET') return json({ profile: await getProfile(userId) });
    const body = await readJson(request);
    if (!body.profile) return badRequest('Missing profile payload.');
    await saveProfile(userId, body.profile);
    return json({ ok: true });
  }
});
