import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { ImageUpload } from "@/components/ImageUpload";
import { MonumentResult } from "@/components/MonumentResult";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface MonumentData {
  name: string;
  location: string;
  era: string;
  facts: string[];
  dangerRating: number;
  dangerNotes: string;
  funFact: string;
}

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [monumentData, setMonumentData] = useState<MonumentData | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleImageSelect = async (file: File, preview: string) => {
    setSelectedImage(preview);
    setIsAnalyzing(true);
    setMonumentData(null);

    try {
      // Call the AI analysis edge function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-monument`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ imageBase64: preview }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Analysis failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.monument) {
        setMonumentData(data.monument);
        toast({
          title: "Monument Identified!",
          description: `Discovered: ${data.monument.name}`,
        });
      } else {
        throw new Error("No monument data returned");
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Could not analyze the image. Please try again.",
        variant: "destructive",
      });
      setSelectedImage(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePlayAudio = async () => {
    if (isPlayingAudio && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlayingAudio(false);
      return;
    }

    // For now, show a toast that audio will be enabled with ElevenLabs
    toast({
      title: "Audio Guide",
      description: "Audio narration coming soon! Stay tuned.",
    });
  };

  const handleReset = () => {
    setMonumentData(null);
    setSelectedImage(null);
    setIsPlayingAudio(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
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
              onClick={handleReset}
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
