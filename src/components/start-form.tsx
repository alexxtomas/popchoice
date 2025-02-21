'use client';
import { Clock, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useUsersPreferences } from '@/hooks/useUsersPreferences';

const numberOfPeopleOptions = Array.from({ length: 5 }, (_, i) => (i + 1).toString());
const hours = Array.from({ length: 4 }, (_, i) => i.toString());
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

export function StartForm() {
  const {
    hour,
    minute,
    numberOfPeople,
    updateHour,
    updateMinute,
    updateNumberOfPeople,
    updateStep,
    updateUsersPreferences,
    generateUsersPreferences,
  } = useUsersPreferences();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateStep(1);
    const newUsersPreferences = generateUsersPreferences(numberOfPeople);
    updateUsersPreferences(newUsersPreferences);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 w-full space-y-4 flex flex-col items-center justify-center"
    >
      <section className="space-y-2">
        <div className="flex items-center space-x-4">
          <UsersRound className="h-5 w-5 text-gray-500" />
          <Label htmlFor="hour-select" className="text-sm font-medium">
            How may people are you?
          </Label>
        </div>

        <div className="flex w-full justify-center">
          <Select
            value={numberOfPeople.toString()}
            onValueChange={(newValue: string) => {
              const numberOfPeople = parseInt(newValue);
              updateNumberOfPeople(isNaN(numberOfPeople) ? 1 : numberOfPeople);
            }}
          >
            <SelectTrigger id="number-of-people-select" className="w-[80px]">
              <SelectValue placeholder="Number of people" />
            </SelectTrigger>
            <SelectContent>
              {numberOfPeopleOptions.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>
      <section className=" space-y-2">
        <div className="flex items-center space-x-4">
          <Clock className="h-5 w-5 text-gray-500" />
          <Label htmlFor="hour-select" className="text-sm font-medium">
            How much time do you have?
          </Label>
        </div>
        <div className="flex space-x-4 justify-center">
          <div className="flex flex-col space-y-1 items-center">
            <Select value={hour} onValueChange={updateHour}>
              <SelectTrigger id="hour-select" className="w-[80px]">
                <SelectValue placeholder="Hours" />
              </SelectTrigger>
              <SelectContent>
                {hours.map((h) => (
                  <SelectItem key={h} value={h}>
                    {h}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div>
              <Label htmlFor="hour-select" className="text-sm font-medium">
                Hours:
              </Label>{' '}
              <span>{hour}</span>
            </div>
          </div>
          <div className="flex flex-col space-y-1 items-center">
            <Select value={minute} onValueChange={updateMinute}>
              <SelectTrigger id="minute-select" className="w-[80px]">
                <SelectValue placeholder="Minutes" />
              </SelectTrigger>
              <SelectContent>
                {minutes.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div>
              <Label htmlFor="minute-select" className="text-sm font-medium">
                Minutes:
              </Label>{' '}
              <span>{minute}</span>
            </div>
          </div>
        </div>
      </section>
      <Button className="w-full text-lg">Start</Button>
    </form>
  );
}
