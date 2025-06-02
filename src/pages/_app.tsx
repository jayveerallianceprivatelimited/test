import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NextDash - Beautiful Dashboard</title>
        <meta name="description" content="A beautiful dashboard built with Next.js and Shadcn UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="system" 
        enableSystem 
        disableTransitionOnChange
      >
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </>
  );
}
