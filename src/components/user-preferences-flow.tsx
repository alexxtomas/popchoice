'use client';
import { UsersPreferencesProvider } from '@/contexts/UsersPreferencesContext';
import { StartForm } from './start-form';
import { useUsersPreferences } from '@/hooks/useUsersPreferences';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { TagRadioGroup, TagRadioGroupItem } from './ui/tag-radio-group';
import { Button } from './ui/button';
import { ChevronLeft, User } from 'lucide-react';

function UsersPreferencesFlow() {
  const { step, numberOfPeople, updateStep } = useUsersPreferences();
  const isLastStep = step === numberOfPeople;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLastStep) {
      console.log('submit');
      return;
    }

    updateStep(step + 1);
  };

  if (step === 0) {
    return <StartForm />;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
      <div className="flex items-center gap-1 mb-2">
        <User size={32} />
        <span className="text-4xl">{step}</span>
      </div>
      <section className="space-y-2 w-full resize-none">
        <Label>What’s your favorite movie and why?</Label>
        <Textarea
          className="resize-none h-28"
          placeholder="The Shawshank Redemption
Because it taught me to never give up hope no matter how hard life gets"
        />
      </section>
      <section className="space-y-2 w-full resize-none">
        <Label>Are you in the mood for something new or a classic?</Label>
        <TagRadioGroup>
          <TagRadioGroupItem value="new">New</TagRadioGroupItem>
          <TagRadioGroupItem value="classic">Classic</TagRadioGroupItem>
        </TagRadioGroup>
      </section>
      <section className="space-y-2 w-full resize-none">
        <Label>What are you in the mood for?</Label>
        <TagRadioGroup>
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
          className="resize-none h-24"
          placeholder="Tom Hanks because he is really funny and can do the voice of Woody"
        />
      </section>
      <Button className="w-full text-lg">{isLastStep ? 'Get Movie' : 'Next Person'}</Button>
    </form>
  );
}

function BaseUsersPreferencesFlow() {
  const { step, updateStep } = useUsersPreferences();
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
