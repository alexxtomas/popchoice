import { createContext, useState } from 'react';

export type PerferenceType = 'new' | 'classic';
export type Mood = 'fun' | 'serious' | 'inspiring' | 'scary';

export type UserPreferences = {
  favoriteMovie: string;
  preferenceType: PerferenceType | '';
  mood: Mood | '';
  famousFilmPerson: string;
};

export type TUserPreferencesContext = {
  usersPreferences: UserPreferences[];
  step: number;
  numberOfPeople: number;
  hour: string;
  minute: string;
  updateNumberOfPeople: (numberOfPeople: number) => void;
  updateHour: (hour: string) => void;
  updateMinute: (minute: string) => void;
  updateStep: (step: number) => void;
  updateUsersPreferences: (usersPreferences: UserPreferences[]) => void;
  generateUsersPreferences: (numberOfPeople: number) => UserPreferences[];
};

export const UsersPreferencesContext = createContext<TUserPreferencesContext | null>(null);

export function UsersPreferencesProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [usersPreferences, setUsersPreferences] = useState<UserPreferences[]>([]);
  const [step, setStep] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [hour, setHour] = useState('0');
  const [minute, setMinute] = useState('00');

  const updateNumberOfPeople = (numberOfPeople: number) => {
    setNumberOfPeople(numberOfPeople);
  };

  const updateHour = (hour: string) => {
    setHour(hour);
  };
  const updateMinute = (minute: string) => {
    setMinute(minute);
  };

  const updateStep = (step: number) => {
    setStep(step);
  };

  const updateUsersPreferences = (usersPreferences: UserPreferences[]) => {
    setUsersPreferences(usersPreferences);
  };

  const generateUsersPreferences = (numberOfPeople: number) => {
    const usersPreferences: UserPreferences[] = [];

    for (let i = 0; i < numberOfPeople; i++) {
      usersPreferences.push({
        favoriteMovie: '',
        preferenceType: '',
        mood: '',
        famousFilmPerson: '',
      });
    }

    return usersPreferences;
  };

  return (
    <UsersPreferencesContext.Provider
      value={{
        usersPreferences,
        step,
        numberOfPeople,
        hour,
        minute,
        updateNumberOfPeople,
        updateHour,
        updateMinute,
        updateStep,
        updateUsersPreferences,
        generateUsersPreferences,
      }}
    >
      {children}
    </UsersPreferencesContext.Provider>
  );
}
