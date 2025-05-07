import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
const ServicesHighlights = () => {
  const services = [{
    title: "Reach out to us directly",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor.",
    bgImage: "/lovable-uploads/327266b3-5b53-410c-a2bc-07c8212d93ee.png"
  }, {
    title: "Project briefing form",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor.",
    bgImage: "/lovable-uploads/25052a8d-9aa8-4923-8e7d-e35ff888af78.png"
  }];
  const {
    isVisible: isHeaderVisible,
    elementRef: headerRef
  } = useScrollAnimation();
  const {
    isVisible: isCardsVisible,
    elementRef: cardsRef
  } = useScrollAnimation({
    threshold: 0.2
  });
  return;
};
export default ServicesHighlights;