import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { MockApiProvider } from "@/context/MockApiContext";

export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
      <Toaster />
      <MockApiProvider>{children}</MockApiProvider>
    </ThemeProvider>
  );
};
