'use client';
import { UsersPreferencesProvider } from '@/contexts/UsersPreferencesContext';
import { StartForm } from './start-form';
import { useUsersPreferences } from '@/hooks/useUsersPreferences';
import { Button } from './ui/button';
import { ChevronLeft, User } from 'lucide-react';
import { UserPreferencesForm } from './user-preferences-form';

function UsersPreferencesFlow() {
  const { step } = useUsersPreferences();

  if (step === 0) {
    return <StartForm />;
  }

  return <UserPreferencesForm />;
}

function BaseUsersPreferencesFlow() {
  const { step, updateStep, moviesSuggestions } = useUsersPreferences();

  if(moviesSuggestions.length ) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>
          {moviesSuggestions[0].title}
        </h1>
        <p>
          {moviesSuggestions[0].whyThisMovie}
        </p>
      </div>
    )
  }
  return (
    <>
      {step > 0 && (
        <Button
          onClick={() => {
            updateStep(step - 1);
          }}
          className="absolute top-4 left-4 "
        >
          <ChevronLeft />
        </Button>
      )}

      <UsersPreferencesFlow />
    </>
  );
}

export function UsersPreferencesFlowWithContext() {
  return (
    <UsersPreferencesProvider>
      <BaseUsersPreferencesFlow />
    </UsersPreferencesProvider>
  );
}
