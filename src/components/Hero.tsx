import { Compass } from "lucide-react";

export function Hero() {
  return (
    <header className="text-center py-8 md:py-12">
      <div className="inline-flex items-center justify-center gap-2 mb-4 animate-fade-up">
        <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
          <Compass className="w-6 h-6 text-gold animate-float" />
        </div>
      </div>
      
      <h1 
        className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 animate-fade-up"
        style={{ animationDelay: "0.1s" }}
      >
        Past<span className="text-gold">Port</span>
      </h1>
      
      <p 
        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 animate-fade-up"
        style={{ animationDelay: "0.2s" }}
      >
        Your digital passport to history. Upload a photo of any monument and uncover its hidden stories.
      </p>

      <div 
        className="flex justify-center gap-8 mt-8 animate-fade-up"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="text-center">
          <p className="font-display text-2xl md:text-3xl text-gold font-semibold">AI</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Powered</p>
        </div>
        <div className="w-px bg-border" />
        <div className="text-center">
          <p className="font-display text-2xl md:text-3xl text-gold font-semibold">Audio</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Guides</p>
        </div>
        <div className="w-px bg-border" />
        <div className="text-center">
          <p className="font-display text-2xl md:text-3xl text-gold font-semibold">∞</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Stories</p>
        </div>
      </div>
    </header>
  );
}
