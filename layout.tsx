import "./globals.css";

export const metadata = {
  title: "RP World",
  description: "Custom character AI roleplay",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
