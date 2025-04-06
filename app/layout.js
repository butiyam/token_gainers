import "./globals.css";
import BottomTopArrow from './components/BottomTopArrow'
import {Web3Provider} from '../app/hooks/WebProvider'
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "Token Gainers",
  description: "Token Gainers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster  autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />
        <Web3Provider>
           {children}
        </Web3Provider>
        <BottomTopArrow/>
      </body>
    </html>
  );
}
