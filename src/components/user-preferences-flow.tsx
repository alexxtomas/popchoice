'use client';
import { UsersPreferencesProvider } from '@/contexts/UsersPreferencesContext';
import { StartForm } from './start-form';
import { useUsersPreferences } from '@/hooks/useUsersPreferences';

function UsersPreferencesFlow() {
  const { step } = useUsersPreferences();

  if (step === 0) {
    return <StartForm />;
  }

  return <div>Step {step}</div>;
}

export function UsersPreferencesFlowWithContext() {
  return (
    <UsersPreferencesProvider>
      <UsersPreferencesFlow />
    </UsersPreferencesProvider>
  );
}
