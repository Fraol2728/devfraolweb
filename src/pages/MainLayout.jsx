import { Outlet } from "react-router-dom";
import { Navbar } from "@/features/navbar/Navbar";
import { StarBackground } from "@/components/common/Background";
import { Footer } from "@/features/footer/Footer";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <StarBackground />
      <Navbar />
      <main className="relative z-10 pt-28 pb-20 md:pt-30">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
