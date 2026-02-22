import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import WelcomeScreen from "@/components/common/WelcomeScreen";
import { Analytics } from "@vercel/analytics/react";
import { AppProviders } from "@/app/providers";

function App() {
  const [welcomeComplete, setWelcomeComplete] = useState(false);

  return (
    <AppProviders>
      {!welcomeComplete ? (
        <WelcomeScreen onWelcomeComplete={() => setWelcomeComplete(true)} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Analytics />
        </BrowserRouter>
      )}
    </AppProviders>
  );
}

export default App;
