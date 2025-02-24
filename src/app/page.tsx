import { UsersPreferencesFlowWithContext } from '@/components/user-preferences-flow';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <main className="max-w-sm mx-auto min-h-screen flex flex-col justify-center items-center">
        <header className="flex flex-col items-center justify-center">
          <Link href={'/'}>
            <Image src="/logo-with-title.webp" alt="PopChoice Logo" width={200} height={200} />
          </Link>

          <h1 className="text-2xl font-bold sr-only">PopChoice</h1>
        </header>
        <UsersPreferencesFlowWithContext />
      </main>
    </>
  );
}
