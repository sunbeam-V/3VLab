// app/page.tsx
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import MediaSection from '@/components/sections/MediaSection';
import SubscribeSection from '@/components/sections/SubscribeSection';
import Divider from '@/components/ui/Divider';

export default function Home() {
    return (
        <>
            <HeroSection />
            <Divider />
            <AboutSection />
            <Divider />
            <MediaSection />
            <Divider />
            <SubscribeSection />
        </>
    );
}