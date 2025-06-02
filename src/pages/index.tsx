import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { LayoutDashboard } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect to dashboard after a short delay
    const redirectTimer = setTimeout(() => {
      router.push('/dashboard');
    }, 1500);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <>
      <Head>
        <title>NextDash - Beautiful Dashboard</title>
        <meta name="description" content="A beautiful dashboard built with Next.js and Shadcn UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex items-center space-x-3">
            <div className="rounded-md bg-primary p-2">
              <LayoutDashboard className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">NextDash</h1>
          </div>
          <p className="max-w-sm text-muted-foreground">
            A beautiful dashboard built with Next.js and Shadcn UI
          </p>
          <div className="mt-4 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <span className="ml-3">Redirecting to dashboard...</span>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Not redirecting? <a href="/dashboard" className="font-medium text-primary hover:underline">Click here</a></p>
        </div>
      </div>
    </>
  );
}
