import TimePicker from '@/components/time-selector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UsersRound } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="max-w-sm mx-auto min-h-screen flex flex-col justify-center items-center">
      <header className="flex flex-col items-center justify-center">
        <Image src="/logo-with-title.webp" alt="PopChoice Logo" width={200} height={200} />
        <h1 className="text-2xl font-bold sr-only">PopChoice</h1>
      </header>
      <form className="mt-4 w-full space-y-4 flex flex-col items-center justify-center">
        <section className="space-y-2">
          <div className="flex items-center space-x-4">
            <UsersRound className="h-5 w-5 text-gray-500" />
            <Label htmlFor="hour-select" className="text-sm font-medium">
              How may people are you?
            </Label>
          </div>

          <Input
            id="numberOfPeople"
            className="rounded w-full"
            type="number"
            min={1}
            max={5}
            placeholder="1"
          />
        </section>
        <TimePicker />
        <Button className="w-full">Start</Button>
      </form>
    </main>
  );
}
