import CallToActionSection from '@/components/call-to-action';
import FaqSection from '@/components/faqs';
import FeaturesSection from '@/components/features-3';
import HeroSection from '@/components/hero-section';
import IntegrationsSection from '@/components/integrations-1';
import ContentLayout from '@/components/layouts/content-layout';
import PricingSection from '@/components/pricing2';
import StatsSection from '@/components/stats-2';
import TestimonialsSection from '@/components/testimonials';

export const metadata = {
  title:
    'ScratchStarter | From brilliant idea to deployed product in one afternoon. Less setup, maximum creativity.',
  description:
    'From brilliant idea to deployed product in one afternoon. Less setup, maximum creativity.',
};

export default function Home() {
  return (
    <ContentLayout>
      <HeroSection />
      <FeaturesSection />
      <IntegrationsSection />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CallToActionSection />
    </ContentLayout>
  );
}
