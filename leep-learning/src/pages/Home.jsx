// src/pages/Home.jsx
import HeroSlider from "../components/Homepage/HeroSlider/HeroSlider";
import Programs from "../components/Homepage/Programs/Programs";
import TrustSection from "../components/Homepage/TrustSection/TrustSection";
import MetricsSection from "../components/Homepage/MetricsSection/MetricsSection";
import FAQSection from "../components/Homepage/FAQSection/FAQSection";
import Testimonials from "../components/Homepage/Testimonials/Testimonials";
import CTASection from "../components/Homepage/CTASection/CTASection";

function Home() {
  return (
    <>
      <HeroSlider />
      <Programs />
      <TrustSection />
      <MetricsSection />
      <FAQSection />
      <Testimonials />
      <CTASection />
    </>
  );
}

export default Home;