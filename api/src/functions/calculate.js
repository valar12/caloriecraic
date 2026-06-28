const { app } = require('@azure/functions');
const { recommendFromProfile } = require('../lib/calculations');
const { badRequest, json, readJson } = require('../lib/http');

app.http('calculate', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'calculate',
  handler: async (request, context) => {
    const body = await readJson(request);
    if (!body.profile) return badRequest('Missing profile payload.');
    try {
      return json(recommendFromProfile(body.profile));
    } catch (error) {
      context.error(error);
      return badRequest(error.message || 'Calculation failed.');
    }
  }
});
