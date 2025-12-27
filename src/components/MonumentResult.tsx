import { useState } from "react";
import { Volume2, VolumeX, MapPin, AlertTriangle, Sparkles, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MonumentData {
  name: string;
  location: string;
  era: string;
  facts: string[];
  dangerRating: number;
  dangerNotes: string;
  funFact: string;
}

interface MonumentResultProps {
  data: MonumentData;
  imageUrl: string;
  onPlayAudio: () => void;
  isPlayingAudio: boolean;
  isLoadingAudio: boolean;
}

export function MonumentResult({
  data,
  imageUrl,
  onPlayAudio,
  isPlayingAudio,
  isLoadingAudio,
}: MonumentResultProps) {
  const [showPostcard, setShowPostcard] = useState(false);

  const getDangerColor = (rating: number) => {
    if (rating <= 2) return "text-explorer-green";
    if (rating <= 4) return "text-gold";
    return "text-stamp-red";
  };

  const getDangerLabel = (rating: number) => {
    if (rating <= 2) return "Safe";
    if (rating <= 4) return "Moderate";
    return "Caution";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-up">
      {/* Main Result Card */}
      <div className="bg-card vintage-border rounded-lg overflow-hidden postcard-shadow">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative">
            <img
              src={imageUrl}
              alt={data.name}
              className="w-full h-64 md:h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 text-parchment/90 text-sm mb-1">
                <MapPin className="w-4 h-4" />
                <span>{data.location}</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-parchment font-semibold">
                {data.name}
              </h2>
              <p className="text-parchment/80 text-sm mt-1">{data.era}</p>
            </div>
            
            {/* Stamp overlay */}
            <div className="absolute top-4 right-4 bg-stamp-red/90 text-parchment px-3 py-1.5 text-xs font-bold uppercase tracking-wider rotate-[-8deg] shadow-stamp animate-stamp">
              Verified
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 bg-parchment paper-texture">
            {/* Audio Button */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Audio Guide</p>
                <Button
                  variant="vintage"
                  size="sm"
                  onClick={onPlayAudio}
                  disabled={isLoadingAudio}
                  className="gap-2"
                >
                  {isLoadingAudio ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : isPlayingAudio ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                  {isLoadingAudio ? "Loading..." : isPlayingAudio ? "Stop" : "Listen"}
                </Button>
              </div>

              {/* Danger Rating */}
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Tourist Safety</p>
                <div className={cn("flex items-center gap-2", getDangerColor(data.dangerRating))}>
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-semibold">{getDangerLabel(data.dangerRating)}</span>
                  <span className="text-sm">({data.dangerRating}/5)</span>
                </div>
              </div>
            </div>

            {/* Historical Facts */}
            <div className="mb-6">
              <h3 className="font-display text-lg text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold" />
                Hidden Stories
              </h3>
              <ul className="space-y-3">
                {data.facts.map((fact, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm text-muted-foreground"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety Note */}
            {data.dangerRating > 2 && (
              <div className="bg-secondary/50 rounded-lg p-3 mb-4">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold">Safety Note:</span> {data.dangerNotes}
                </p>
              </div>
            )}

            {/* Fun Fact Callout */}
            <div className="border-l-4 border-gold bg-gold/10 p-4 rounded-r-lg">
              <p className="text-sm italic text-foreground">
                <span className="font-display text-gold">Did you know?</span>{" "}
                {data.funFact}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          variant="hero"
          size="lg"
          onClick={() => setShowPostcard(!showPostcard)}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          {showPostcard ? "Hide Postcard" : "Generate Postcard"}
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share Discovery
        </Button>
      </div>

      {/* Postcard Preview */}
      {showPostcard && (
        <div className="animate-fade-up">
          <div className="bg-parchment vintage-border rounded-lg p-6 postcard-shadow max-w-lg mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <img
                  src={imageUrl}
                  alt={data.name}
                  className="w-full aspect-[4/3] object-cover rounded border-2 border-sepia"
                />
              </div>
              <div className="flex flex-col justify-between paper-texture p-3 rounded border border-dashed border-sepia">
                <div>
                  <p className="font-display text-sm text-muted-foreground italic mb-2">
                    "Greetings from {data.location}!"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Visited the magnificent {data.name}. {data.funFact}
                  </p>
                </div>
                <div className="text-right">
                  <div className="inline-block bg-stamp-red/90 text-parchment px-2 py-1 text-[10px] font-bold uppercase tracking-wider rotate-[-3deg]">
                    PastPort ✦ 2024
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
