import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { Inter as FontSans } from "next/font/google";
import { dark } from "@clerk/themes";
import "./globals.css";

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });


// export const metadata: Metadata = {
//   title: "LiveDocs",
//   description: "LiveDocs is a go-to collaborative docs editor for teams.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider
//       appearance={{
//         baseTheme: dark,
//         variables: { colorPrimary: "#3371FF", fontSize: "16px" },
//       }}
//     >
//       <html lang="en" suppressHydrationWarning>
//         <body
//           className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         >
//           {children}
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "LiveDocs",
  description: "LiveDocs is a go-to collaborative docs editor for teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#3371FF", fontSize: "16px" },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
