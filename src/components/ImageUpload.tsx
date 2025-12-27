import { useState, useRef } from "react";
import { Upload, Camera, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageSelect: (file: File, preview: string) => void;
  isLoading?: boolean;
}

export function ImageUpload({ onImageSelect, isLoading }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageSelect(file, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
      />

      {preview ? (
        <div className="relative animate-fade-in">
          <div className="vintage-border rounded-lg overflow-hidden bg-parchment p-2">
            <div className="relative aspect-[4/3] rounded overflow-hidden">
              <img
                src={preview}
                alt="Selected monument"
                className="w-full h-full object-cover"
              />
              {!isLoading && (
                <button
                  onClick={clearPreview}
                  className="absolute top-3 right-3 bg-ink/80 hover:bg-ink text-parchment p-2 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              {isLoading && (
                <div className="absolute inset-0 bg-ink/50 flex items-center justify-center">
                  <div className="text-parchment text-center">
                    <div className="w-8 h-8 border-2 border-parchment border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="font-display text-sm">Discovering history...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="absolute -bottom-3 -right-3 bg-stamp-red text-primary-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider rotate-[-5deg] shadow-stamp">
            Uploaded
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "vintage-border rounded-lg p-8 md:p-12 text-center transition-all duration-300 cursor-pointer paper-texture",
            isDragging
              ? "bg-gold/20 border-gold scale-[1.02]"
              : "bg-parchment hover:bg-sepia/30"
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-sepia/50 flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">
                Upload Your Discovery
              </h3>
              <p className="text-muted-foreground text-sm md:text-base max-w-xs mx-auto">
                Drag a photo of any monument, statue, or historic site
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button variant="hero" size="lg" className="gap-2">
                <Upload className="w-4 h-4" />
                Choose Photo
              </Button>
              <Button variant="vintage" size="lg" className="gap-2">
                <Camera className="w-4 h-4" />
                Take Photo
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
