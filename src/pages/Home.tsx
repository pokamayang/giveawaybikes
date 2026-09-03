import Hero from "../components/Hero";
import GiveawaySection from "../components/GiveawaySection";
import BikeSection from "../components/BikeSection";
import HowItWorks from "../components/HowItWorks";
import CommunitySection from "../components/CommunitySection";
import WinnersSection from "../components/WinnersSection";
import ReviewsSection from "../components/ReviewsSection";
import SubmitReview from "../components/SubmitReview";
import FAQSection from "../components/FAQSection";

export default function Home() {
  return (
    <>
      <Hero />
      <GiveawaySection />
      <BikeSection />
      <HowItWorks />
      <CommunitySection />
      <WinnersSection />
      <ReviewsSection />
      <SubmitReview />
      <FAQSection />
    </>
  );
}
