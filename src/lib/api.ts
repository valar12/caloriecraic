import type { DailyCheckIn, DashboardSummary, Profile, Recommendation } from '../types';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json() as Promise<T>;
}

export const api = {
  calculate(profile: Profile) {
    return request<Recommendation>('calculate', { method: 'POST', body: JSON.stringify({ profile }) });
  },
  saveProfile(profile: Profile) {
    return request<{ ok: true }>('profile', { method: 'POST', body: JSON.stringify({ profile }) });
  },
  saveCheckIn(checkIn: DailyCheckIn) {
    return request<DailyCheckIn>('check-ins', { method: 'POST', body: JSON.stringify({ checkIn }) });
  },
  dashboard() {
    return request<DashboardSummary>('dashboard');
  }
};
