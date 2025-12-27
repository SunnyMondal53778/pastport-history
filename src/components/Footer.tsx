import { Compass, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 mt-auto border-t border-border">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Compass className="w-4 h-4 text-gold" />
            <span className="font-display text-sm">PastPort</span>
            <span className="text-xs">© 2024</span>
          </div>
          
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-stamp-red fill-stamp-red" /> for history lovers
          </p>
          
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-gold transition-colors">About</a>
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
