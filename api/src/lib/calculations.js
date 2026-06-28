const round = (value, digits = 0) => Number(value.toFixed(digits));
const toKg = (value, units) => units === 'Kg' ? value : value / 2.2046226218;

function recommendFromProfile(profile) {
  if (!profile) throw new Error('Missing profile.');
  const composition = Number(profile.startingBodyFat);
  const phase = profile.mainGoal === 'Maintain'
    ? 'Maintain'
    : profile.mainGoal === 'Lose Fat'
      ? 'Cut (Calorie Deficit)'
      : composition >= (profile.gender === 'Male' ? 20 : 30)
        ? 'Cut (Calorie Deficit)'
        : 'Lean Bulk (Calorie Surplus)';
  const weeklyWeightChangeGoal = profile.manualGoalEnabled && profile.manualWeeklyWeightChange !== null
    ? Number(profile.manualWeeklyWeightChange)
    : defaultWeeklyGoal(profile.mainGoal, profile.experienceLevel, profile.units);
  const maintenanceCalories = estimateMaintenanceCalories(Number(profile.startingWeight), profile.units, composition);
  const dailyDelta = round((weeklyWeightChangeGoal * (profile.units === 'Lb' ? 3500 : 7700)) / 7);
  const targetCalories = Math.max(1200, round(maintenanceCalories + dailyDelta));
  const pounds = profile.units === 'Lb' ? Number(profile.startingWeight) : Number(profile.startingWeight) * 2.2046226218;
  const proteinGrams = round(pounds * (composition > 25 ? 0.8 : 1));
  const fatGrams = round(Math.max(35, (targetCalories * 0.25) / 9));
  const carbsGrams = round(Math.max(0, (targetCalories - proteinGrams * 4 - fatGrams * 9) / 4));
  return { phase, weeklyWeightChangeGoal, maintenanceCalories, targetCalories, targetCaloriesLow: targetCalories - 100, targetCaloriesHigh: targetCalories + 100, proteinGrams, fatGrams, carbsGrams, calculatedBodyFat: null, messages: [`Recommended phase: ${phase}.`] };
}

function defaultWeeklyGoal(goal, experience, units) {
  const kg = units === 'Kg';
  if (goal === 'Lose Fat') return kg ? -0.4 : -0.8;
  if (goal === 'Build Muscle') return experience === 'Beginner' ? (kg ? 0.25 : 0.5) : (kg ? 0.15 : 0.3);
  return 0;
}

function estimateMaintenanceCalories(weight, units, compositionPercent) {
  const kg = toKg(weight, units);
  const leanMassKg = kg * (1 - compositionPercent / 100);
  return round((370 + 21.6 * leanMassKg) * 1.55);
}

module.exports = { recommendFromProfile };
