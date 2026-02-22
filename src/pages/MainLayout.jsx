import { Outlet } from "react-router-dom";
import { Navbar } from "@/features/navbar/Navbar";
import { StarBackground } from "@/components/common/Background";
import { Footer } from "@/features/footer/Footer";

export const MainLayout = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <StarBackground />
      <main className="relative z-10 px-2 pb-16 pt-4 md:pt-6">
        <Navbar />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
