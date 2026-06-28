export type Units = 'Lb' | 'Kg';
export type Gender = 'Male' | 'Female';
export type ExperienceLevel = 'Beginner' | 'Intermediate';
export type MainGoal = 'Build Muscle' | 'Lose Fat' | 'Maintain';
export type MeasurementUnits = 'inch' | 'cm';
export type Phase = 'Cut (Calorie Deficit)' | 'Maintain' | 'Lean Bulk (Calorie Surplus)';

export interface BodyFatInputs {
  enabled: boolean;
  measurementUnits: MeasurementUnits;
  height: number | null;
  waist: number | null;
  neck: number | null;
  hip: number | null;
}

export interface Profile {
  units: Units;
  startDate: string;
  startingWeight: number;
  startingBodyFat: number;
  gender: Gender;
  experienceLevel: ExperienceLevel;
  mainGoal: MainGoal;
  bodyFatInputs: BodyFatInputs;
  manualGoalEnabled: boolean;
  manualWeeklyWeightChange: number | null;
}

export interface DailyCheckIn {
  id?: string;
  checkInDate: string;
  weight: number;
  calories: number;
  waist?: number | null;
  neck?: number | null;
  hip?: number | null;
  estimatedBodyFat?: number | null;
  notes?: string;
  syncStatus?: 'synced' | 'pending' | 'failed';
}

export interface Recommendation {
  phase: Phase;
  weeklyWeightChangeGoal: number;
  maintenanceCalories: number;
  targetCalories: number;
  targetCaloriesLow: number;
  targetCaloriesHigh: number;
  proteinGrams: number;
  fatGrams: number;
  carbsGrams: number;
  calculatedBodyFat: number | null;
  messages: string[];
}

export interface DashboardSummary {
  latestRecommendation: Recommendation | null;
  checkIns: DailyCheckIn[];
  weeklyAverageWeight: number | null;
  weeklyAverageCalories: number | null;
  latestTdee: number | null;
}
