import { Toaster } from "@/components/ui/sonner";

import Navigation from "@/sections/Navigation";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";

import About from "@/sections/About";
import Transformations from "@/sections/Transformations";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" richColors />

      <Navigation />

      <main>
        <Hero />
        <Services />

        <About />
        <Transformations />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
