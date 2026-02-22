import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <Toaster />
      {children}
    </ThemeProvider>
  );
};
