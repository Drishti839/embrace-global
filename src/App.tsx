import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import ChatbotPage from "./pages/ChatbotPage";
import DonatePage from "./pages/DonatePage";
import StaffDashboard from "./pages/StaffDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import ImpactPage from "./pages/ImpactPage";
import AboutPage from "./pages/AboutPage";
import ProgramPage from "./pages/ProgramPage";
import ProgramsListPage from "./pages/ProgramsListPage";
import VolunteerPage from "./pages/VolunteerPage";
import CareersPage from "./pages/CareersPage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/staff/dashboard" element={<StaffDashboard />} />
              <Route path="/donor/dashboard" element={<DonorDashboard />} />
              <Route path="/impact" element={<ImpactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/programs" element={<ProgramsListPage />} />
              <Route path="/programs/:programId" element={<ProgramPage />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
