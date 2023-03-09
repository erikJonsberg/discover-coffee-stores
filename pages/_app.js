import '@/styles/globals.css';
import { Inter } from "@next/font/google";
import StoreProvider from '@/store/store.context';

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
  <div className={inter.className}>
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  </div>
  )
}
