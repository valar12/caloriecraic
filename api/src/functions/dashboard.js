const { app } = require('@azure/functions');
const { getProfile, listCheckIns } = require('../lib/db');
const { recommendFromProfile } = require('../lib/calculations');
const { getUserId, json } = require('../lib/http');

app.http('dashboard', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'dashboard',
  handler: async (request) => {
    const userId = getUserId(request);
    const profile = await getProfile(userId);
    const checkIns = await listCheckIns(userId);
    const lastSeven = checkIns.slice(-7);
    const recommendation = profile ? recommendFromProfile(profile) : null;
    return json({
      latestRecommendation: recommendation,
      checkIns,
      weeklyAverageWeight: average(lastSeven.map((item) => item.weight)),
      weeklyAverageCalories: average(lastSeven.map((item) => item.calories)),
      latestTdee: recommendation ? recommendation.maintenanceCalories : null
    });
  }
});

function average(values) {
  const clean = values.map(Number).filter(Number.isFinite);
  return clean.length ? clean.reduce((sum, value) => sum + value, 0) / clean.length : null;
}
