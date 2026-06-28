import { useMemo, useState } from 'react';
import type { DailyCheckIn, Profile } from './types';
import { recommendFromProfile } from './domain/calculations';
import { api } from './lib/api';
import { saveCheckInLocal, saveProfileLocal } from './lib/offlineStore';

const today = () => new Date().toISOString().slice(0, 10);

const initialProfile: Profile = {
  units: 'Lb',
  startDate: today(),
  startingWeight: 180,
  startingBodyFat: 20,
  gender: 'Male',
  experienceLevel: 'Beginner',
  mainGoal: 'Lose Fat',
  bodyFatInputs: { enabled: false, measurementUnits: 'inch', height: null, waist: null, neck: null, hip: null },
  manualGoalEnabled: false,
  manualWeeklyWeightChange: null
};

export default function App() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [weight, setWeight] = useState(180);
  const [calories, setCalories] = useState(2300);
  const [status, setStatus] = useState('Ready');
  const recommendation = useMemo(() => recommendFromProfile(profile), [profile]);

  async function saveProfile() {
    await saveProfileLocal(profile);
    try {
      await api.saveProfile(profile);
      setStatus('Profile saved locally and to Azure.');
    } catch {
      setStatus('Profile saved locally. Azure sync can be retried later.');
    }
  }

  async function saveCheckIn() {
    const checkIn: DailyCheckIn = { checkInDate: today(), weight, calories };
    const local = await saveCheckInLocal(checkIn);
    try {
      await api.saveCheckIn(local);
      setStatus('Check-in saved to Azure.');
    } catch {
      setStatus('Check-in saved offline.');
    }
  }

  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Spreadsheet-to-PWA migration</p>
        <h1>Calorie Craic</h1>
        <p>Azure-hosted calorie, macro, TDEE, and check-in tracker that does not use Google Sheets at runtime.</p>
      </section>

      <section className="grid">
        <div className="card">
          <h2>Profile</h2>
          <label>Units<select value={profile.units} onChange={(event) => setProfile({ ...profile, units: event.target.value as Profile['units'] })}><option>Lb</option><option>Kg</option></select></label>
          <label>Weight<input type="number" value={profile.startingWeight} onChange={(event) => setProfile({ ...profile, startingWeight: Number(event.target.value) })} /></label>
          <label>Body fat %<input type="number" value={profile.startingBodyFat} onChange={(event) => setProfile({ ...profile, startingBodyFat: Number(event.target.value) })} /></label>
          <label>Gender<select value={profile.gender} onChange={(event) => setProfile({ ...profile, gender: event.target.value as Profile['gender'] })}><option>Male</option><option>Female</option></select></label>
          <label>Experience<select value={profile.experienceLevel} onChange={(event) => setProfile({ ...profile, experienceLevel: event.target.value as Profile['experienceLevel'] })}><option>Beginner</option><option>Intermediate</option></select></label>
          <label>Goal<select value={profile.mainGoal} onChange={(event) => setProfile({ ...profile, mainGoal: event.target.value as Profile['mainGoal'] })}><option>Build Muscle</option><option>Lose Fat</option><option>Maintain</option></select></label>
          <button onClick={saveProfile}>Save profile</button>
        </div>

        <div className="card">
          <h2>Recommendation</h2>
          <dl className="metrics">
            <dt>Phase</dt><dd>{recommendation.phase}</dd>
            <dt>Calories</dt><dd>{recommendation.targetCaloriesLow}-{recommendation.targetCaloriesHigh}</dd>
            <dt>Protein</dt><dd>{recommendation.proteinGrams}g</dd>
            <dt>Fat</dt><dd>{recommendation.fatGrams}g</dd>
            <dt>Carbs</dt><dd>{recommendation.carbsGrams}g</dd>
          </dl>
        </div>

        <div className="card">
          <h2>Daily check-in</h2>
          <label>Weight<input type="number" value={weight} onChange={(event) => setWeight(Number(event.target.value))} /></label>
          <label>Calories<input type="number" value={calories} onChange={(event) => setCalories(Number(event.target.value))} /></label>
          <button onClick={saveCheckIn}>Save check-in</button>
          <p className="status">{status}</p>
        </div>
      </section>
    </main>
  );
}
