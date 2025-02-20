import Image from 'next/image';

export default function Home() {
  return (
    <main className="max-w-sm mx-auto min-h-screen">
      <Image src="/logo.webp" alt="PopChoice Logo" width={200} height={200} />
    </main>
  );
}
