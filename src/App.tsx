import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ProfilePage from "@/pages/ProfilePage";
import SubscribePage from "@/pages/SubscribePage";
import NFLOddsPage from "@/pages/NFLOddsPage";
import PositiveEVPage from "@/pages/PositiveEVPage";
import ArbitragePage from "@/pages/ArbitragePage";
import NBAOddsPage from "@/pages/NBAOddsPage";
import PromoConverterPage from "@/pages/PromoConverterPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <div className="min-h-screen bg-oj-bg-black">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/subscribe" element={<SubscribePage />} />
              <Route path="/nfl/odds" element={<NFLOddsPage />} />
              <Route path="/nba/odds" element={<NBAOddsPage />} />
              <Route path="/betting-tools/positive-ev" element={<PositiveEVPage />} />
              <Route path="/betting-tools/arbitrage" element={<ArbitragePage />} />
              <Route path="/betting-tools/promo-converter" element={<PromoConverterPage />} />
              {/* More routes will be added here */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;