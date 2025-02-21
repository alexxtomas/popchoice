import {
  TUserPreferencesContext,
  UsersPreferencesContext,
} from '@/contexts/UsersPreferencesContext';
import { useContext } from 'react';

export function useUsersPreferences() {
  const context = useContext(UsersPreferencesContext) as TUserPreferencesContext;

  return context;
}
