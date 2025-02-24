'use client';
import { UsersPreferencesProvider } from '@/contexts/UsersPreferencesContext';
import { StartForm } from './start-form';
import { useUsersPreferences } from '@/hooks/useUsersPreferences';
import { Button } from './ui/button';
import { ChevronLeft } from 'lucide-react';
import { UserPreferencesForm } from './user-preferences-form';
import { MoviesSuggestions } from './movies-suggestions';

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
      <MoviesSuggestions />
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
