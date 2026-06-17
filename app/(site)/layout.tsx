import Header from "../components/Header";
import Footer from "../components/Footer";
import { ChatProvider } from '../context/ChatContext'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <ChatProvider>
      <Header />
      {children}
      <Footer />
    </ChatProvider>
    </>
  );
}