import { Outlet } from "react-router-dom";
import { Navbar } from "@/features/navbar/Navbar";
import { StarBackground } from "@/components/common/Background";
import { Footer } from "@/features/footer/Footer";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <StarBackground />
      <main className="relative z-10 pb-28">
        <Outlet />
      </main>
      <Footer />
      <Navbar />
    </div>
  );
};
