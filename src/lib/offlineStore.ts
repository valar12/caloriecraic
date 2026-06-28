import type { DailyCheckIn, Profile } from '../types';

const PROFILE_KEY = 'caloriecraic-profile';
const CHECKINS_KEY = 'caloriecraic-checkins';

export async function saveProfileLocal(profile: Profile): Promise<void> {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export async function loadProfileLocal(): Promise<Profile | null> {
  const value = localStorage.getItem(PROFILE_KEY);
  return value ? JSON.parse(value) as Profile : null;
}

export async function saveCheckInLocal(checkIn: DailyCheckIn): Promise<DailyCheckIn> {
  const record: DailyCheckIn = {
    ...checkIn,
    id: checkIn.id ?? crypto.randomUUID(),
    syncStatus: checkIn.syncStatus ?? 'pending'
  };
  const records = await listCheckInsLocal();
  const next = records.filter((item) => item.id !== record.id).concat(record);
  localStorage.setItem(CHECKINS_KEY, JSON.stringify(next));
  return record;
}

export async function listCheckInsLocal(): Promise<DailyCheckIn[]> {
  const value = localStorage.getItem(CHECKINS_KEY);
  const records = value ? JSON.parse(value) as DailyCheckIn[] : [];
  return records.sort((a, b) => a.checkInDate.localeCompare(b.checkInDate));
}

export async function pendingCheckIns(): Promise<DailyCheckIn[]> {
  return (await listCheckInsLocal()).filter((item) => item.syncStatus !== 'synced');
}
