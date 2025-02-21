import { createContext, useState } from 'react';

export type TUserPreferencesContext = {
  step: number;
  numberOfPeople: number;
  hour: string;
  minute: string;
  updateNumberOfPeople: (numberOfPeople: number) => void;
  updateHour: (hour: string) => void;
  updateMinute: (minute: string) => void;
  updateStep: (step: number) => void;
};

export const UsersPreferencesContext = createContext<TUserPreferencesContext | null>(null);

export function UsersPreferencesProvider({ children }: Readonly<{ children: React.ReactNode }>) {
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

  return (
    <UsersPreferencesContext.Provider
      value={{
        step,
        numberOfPeople,
        hour,
        minute,
        updateNumberOfPeople,
        updateHour,
        updateMinute,
        updateStep,
      }}
    >
      {children}
    </UsersPreferencesContext.Provider>
  );
}
