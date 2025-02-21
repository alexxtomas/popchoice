'use client';

import { useState } from 'react';
import { Clock } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function TimePicker() {
  const [hour, setHour] = useState('0');
  const [minute, setMinute] = useState('00');

  const hours = Array.from({ length: 4 }, (_, i) => i.toString());
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <section className=" space-y-2">
      <div className="flex items-center space-x-4">
        <Clock className="h-5 w-5 text-gray-500" />
        <Label htmlFor="hour-select" className="text-sm font-medium">
          How much time do you have?
        </Label>
      </div>
      <div className="flex space-x-4 justify-center">
        <div className="flex flex-col space-y-1 items-center">
          <Select value={hour} onValueChange={setHour}>
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
          <Select value={minute} onValueChange={setMinute}>
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
  );
}
