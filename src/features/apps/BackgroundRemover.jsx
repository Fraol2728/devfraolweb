import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, Upload } from "lucide-react";
import { toast } from "@/hooks/useToastStore";

export const BackgroundRemover = ({ endpoints }) => {
  const [sourceImage, setSourceImage] = useState("");
  const [sourceFile, setSourceFile] = useState(null);
  const [resultImage, setResultImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const downloadRef = useRef(null);

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSourceFile(file);
    setSourceImage(imageUrl);
    setResultImage("");
  };

  const handleRemoveBackground = async () => {
    if (!sourceFile) {
      toast({ title: "Upload required", description: "Please upload an image first.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", sourceFile);

      const response = await fetch(endpoints.backgroundRemove, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Background removal failed. Please try another image.");
      }

      const contentType = response.headers.get("content-type") ?? "";
      let processedImage = "";

      if (contentType.includes("application/json")) {
        const data = await response.json();
        processedImage = data.imageUrl || data.url || data.resultUrl || "";
      } else {
        const blob = await response.blob();
        processedImage = URL.createObjectURL(blob);
      }

      if (!processedImage) {
        throw new Error("No output image was returned by the API.");
      }

      setResultImage(processedImage);
      toast({
        title: "Background removed",
        description: "Your processed image is ready for download.",
        variant: "success",
      });
    } catch (error) {
      toast({ title: "Removal failed", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultImage || !downloadRef.current) return;
    downloadRef.current.click();
  };

  return (
    <article className="rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-xl">
      <h3 className="text-xl font-bold text-foreground">Background Remover</h3>
      <p className="mt-2 text-sm text-foreground/70">Upload image → remove background via API → preview → download.</p>

      <label
        htmlFor="bg-upload"
        className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 bg-background/40 px-4 py-4 text-sm text-foreground/75 transition-colors hover:border-[#FF3B30]/70"
      >
        <Upload className="h-4 w-4" /> Upload image
      </label>
      <input id="bg-upload" type="file" accept="image/*" className="sr-only" onChange={handleUpload} />

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <section>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground/65">Original</p>
          <div className="h-44 overflow-hidden rounded-xl border border-border/65 bg-background/25">
            {sourceImage ? <img src={sourceImage} alt="Uploaded file preview" className="h-full w-full object-cover" /> : null}
          </div>
        </section>
        <section>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground/65">Result</p>
          <div className="h-44 overflow-hidden rounded-xl border border-border/65 bg-[linear-gradient(45deg,#111_25%,#222_25%,#222_50%,#111_50%,#111_75%,#222_75%,#222_100%)] bg-[length:20px_20px]">
            {resultImage ? <img src={resultImage} alt="Background removed preview" className="h-full w-full object-cover" /> : null}
          </div>
        </section>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <motion.button
          whileHover={{ y: -1 }}
          type="button"
          onClick={handleRemoveBackground}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-[#FF3B30] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-70"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isLoading ? "Removing..." : "Remove Background"}
        </motion.button>

        <button
          type="button"
          onClick={handleDownload}
          disabled={!resultImage}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground/80 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Download className="h-4 w-4" /> Download
        </button>
        <a ref={downloadRef} href={resultImage} download="background-removed.png" className="hidden" />
      </div>
    </article>
  );
};
