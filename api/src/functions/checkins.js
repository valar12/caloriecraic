const { app } = require('@azure/functions');
const { listCheckIns, saveCheckIn } = require('../lib/db');
const { badRequest, getUserId, json, readJson } = require('../lib/http');

app.http('check-ins', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  route: 'check-ins',
  handler: async (request) => {
    const userId = getUserId(request);
    if (request.method === 'GET') return json({ checkIns: await listCheckIns(userId) });
    const body = await readJson(request);
    if (!body.checkIn) return badRequest('Missing checkIn payload.');
    return json(await saveCheckIn(userId, body.checkIn), 201);
  }
});
