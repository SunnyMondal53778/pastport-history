import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { ImageUpload } from "@/components/ImageUpload";
import { MonumentResult } from "@/components/MonumentResult";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// Demo data for initial display before backend is connected
const DEMO_MONUMENT = {
  name: "The Colosseum",
  location: "Rome, Italy",
  era: "Ancient Roman Empire • 70-80 AD",
  facts: [
    "The Colosseum could hold between 50,000 to 80,000 spectators at its maximum capacity, making it the largest amphitheater ever built.",
    "There was a complex underground system called the hypogeum with 80 vertical shafts to release wild animals and gladiators into the arena.",
    "Naval battles (naumachiae) were staged in the Colosseum by flooding the arena with water up to 5 feet deep.",
  ],
  dangerRating: 2,
  dangerNotes: "Generally safe for tourists. Watch for pickpockets in crowded areas.",
  funFact: "The Colosseum was covered by a massive retractable awning called the 'velarium' to protect spectators from the sun, operated by 1,000 sailors!",
};

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [monumentData, setMonumentData] = useState<typeof DEMO_MONUMENT | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleImageSelect = async (file: File, preview: string) => {
    setSelectedImage(preview);
    setIsAnalyzing(true);
    setMonumentData(null);

    // Simulate AI analysis (will be replaced with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    setMonumentData(DEMO_MONUMENT);
    setIsAnalyzing(false);
    
    toast({
      title: "Monument Identified!",
      description: `Discovered: ${DEMO_MONUMENT.name}`,
    });
  };

  const handlePlayAudio = async () => {
    if (isPlayingAudio && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlayingAudio(false);
      return;
    }

    // For now, show a toast that audio will be enabled with backend
    toast({
      title: "Audio Guide",
      description: "Audio narration will be available when the backend is connected.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background paper-texture">
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-6">
        <Hero />
        
        <section className="py-8 md:py-12">
          {!monumentData ? (
            <ImageUpload
              onImageSelect={handleImageSelect}
              isLoading={isAnalyzing}
            />
          ) : (
            <MonumentResult
              data={monumentData}
              imageUrl={selectedImage!}
              onPlayAudio={handlePlayAudio}
              isPlayingAudio={isPlayingAudio}
              isLoadingAudio={isLoadingAudio}
            />
          )}
        </section>

        {monumentData && (
          <div className="text-center py-4">
            <button
              onClick={() => {
                setMonumentData(null);
                setSelectedImage(null);
              }}
              className="text-sm text-muted-foreground hover:text-gold transition-colors underline underline-offset-4"
            >
              ← Explore another monument
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
