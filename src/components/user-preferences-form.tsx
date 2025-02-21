'use client';

import { User } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TagRadioGroup, TagRadioGroupItem } from './ui/tag-radio-group';
import { Button } from '@/components/ui/button';
import { useUsersPreferences } from '@/hooks/useUsersPreferences';
import { Mood, PerferenceType } from '@/contexts/UsersPreferencesContext';
import { useState } from 'react';

export function UserPreferencesForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const { step, numberOfPeople, updateStep, usersPreferences, updateUsersPreferences } =
    useUsersPreferences();
  const isLastStep = step === numberOfPeople;
  const currUserPreferences = usersPreferences[step - 1];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currUserPreferences.favoriteMovie) {
      setErrorMessage('Please tell us about your favorite movie 🎬');
      return;
    }

    if (!currUserPreferences.preferenceType) {
      setErrorMessage('Please tell us if you prefer something new or classic 🤔');
      return;
    }

    if (!currUserPreferences.mood) {
      setErrorMessage('Please tell us what you are in the mood for 😊');
      return;
    }

    if (!currUserPreferences.famousFilmPerson) {
      setErrorMessage('Please tell us who you love to be stranded on an island with 🙃');
      return;
    }

    setErrorMessage('');
    if (isLastStep) {
      console.log('submit');
      return;
    }
    updateStep(step + 1);
  };
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
      <div className="flex items-center gap-1 mb-2">
        <User size={32} />
        <span className="text-4xl">{step}</span>
      </div>
      <section className="space-y-2 w-full resize-none">
        <Label>What’s your favorite movie and why?</Label>
        <Textarea
          value={currUserPreferences.favoriteMovie}
          onChange={(e) => {
            const usersPreferencesCopy = [...usersPreferences];
            usersPreferencesCopy[step - 1].favoriteMovie = e.target.value;
            updateUsersPreferences(usersPreferencesCopy);
          }}
          className="resize-none h-28"
          placeholder="The Shawshank Redemption
Because it taught me to never give up hope no matter how hard life gets"
        />
      </section>
      <section className="space-y-2 w-full resize-none">
        <Label>Are you in the mood for something new or a classic?</Label>
        <TagRadioGroup
          value={currUserPreferences.preferenceType}
          onValueChange={(newValue) => {
            const usersPreferencesCopy = [...usersPreferences];
            usersPreferencesCopy[step - 1].preferenceType = newValue as PerferenceType;
            updateUsersPreferences(usersPreferencesCopy);
          }}
        >
          <TagRadioGroupItem value="new">New</TagRadioGroupItem>
          <TagRadioGroupItem value="classic">Classic</TagRadioGroupItem>
        </TagRadioGroup>
      </section>
      <section className="space-y-2 w-full resize-none">
        <Label>What are you in the mood for?</Label>
        <TagRadioGroup
          value={currUserPreferences.mood}
          onValueChange={(newValue) => {
            const usersPreferencesCopy = [...usersPreferences];
            usersPreferencesCopy[step - 1].mood = newValue as Mood;
            updateUsersPreferences(usersPreferencesCopy);
          }}
        >
          <TagRadioGroupItem value="fun">Fun</TagRadioGroupItem>
          <TagRadioGroupItem value="serious">Serious</TagRadioGroupItem>
          <TagRadioGroupItem value="inspiring">Inspiring</TagRadioGroupItem>
          <TagRadioGroupItem value="scary">Scary</TagRadioGroupItem>
        </TagRadioGroup>
      </section>
      <section className="space-y-2 w-full resize-none">
        <Label>
          Which famous film person would you love to be stranded on an island with and why?
        </Label>
        <Textarea
          value={currUserPreferences.famousFilmPerson}
          onChange={(e) => {
            const usersPreferencesCopy = [...usersPreferences];
            usersPreferencesCopy[step - 1].famousFilmPerson = e.target.value;
            updateUsersPreferences(usersPreferencesCopy);
          }}
          className="resize-none h-24"
          placeholder="Tom Hanks because he is really funny and can do the voice of Woody"
        />
      </section>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <Button className="w-full text-lg">{isLastStep ? 'Get Movie' : 'Next Person'}</Button>
    </form>
  );
}
