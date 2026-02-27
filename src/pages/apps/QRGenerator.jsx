import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, RefreshCcw, Upload } from "lucide-react";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const inputTypes = [
  { value: "text", label: "Text" },
  { value: "url", label: "URL" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "wifi", label: "Wi-Fi" },
];

const cornerStyles = [
  { value: "square", label: "Square" },
  { value: "rounded", label: "Rounded" },
  { value: "extra-rounded", label: "Extra Rounded" },
  { value: "classy", label: "Classy" },
  { value: "classy-rounded", label: "Classy Rounded" },
];

const createInitialState = () => ({
  type: "text",
  text: "",
  url: "",
  email: "",
  phone: "",
  wifiSsid: "",
  wifiPassword: "",
  wifiEncryption: "WPA",
  wifiHidden: false,
  size: 300,
  fgColor: "#000000",
  bgColor: "#ffffff",
  gradientStart: "",
  gradientEnd: "",
  cornerStyle: "rounded",
});

const ensureQrCodeStyling = () => new Promise((resolve, reject) => {
  if (window.QRCodeStyling) {
    resolve(window.QRCodeStyling);
    return;
  }

  const scriptId = "qr-code-styling-script";
  const existing = document.getElementById(scriptId);
  if (existing) {
    existing.addEventListener("load", () => resolve(window.QRCodeStyling), { once: true });
    existing.addEventListener("error", () => reject(new Error("Failed to load QR generator engine.")), { once: true });
    return;
  }

  const script = document.createElement("script");
  script.id = scriptId;
  script.src = "https://unpkg.com/qr-code-styling@1.9.2/lib/qr-code-styling.js";
  script.async = true;
  script.onload = () => resolve(window.QRCodeStyling);
  script.onerror = () => reject(new Error("Failed to load QR generator engine."));
  document.body.appendChild(script);
});

export const QRGenerator = () => {
  const [form, setForm] = useState(createInitialState);
  const [logo, setLogo] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(true);
  const [error, setError] = useState("");
  const [libraryReady, setLibraryReady] = useState(false);

  const qrRef = useRef(null);
  const qrCodeRef = useRef(null);

  useSeoMeta({
    title: "QR Code Generator | Dev Fraol Academy",
    description: "Generate custom QR codes with live preview, color and style controls, logo upload, and PNG/SVG download.",
  });

  const qrData = useMemo(() => {
    switch (form.type) {
      case "url":
        return form.url.trim();
      case "email":
        return form.email.trim() ? `mailto:${form.email.trim()}` : "";
      case "phone":
        return form.phone.trim() ? `tel:${form.phone.trim()}` : "";
      case "wifi": {
        if (!form.wifiSsid.trim()) return "";
        const hidden = form.wifiHidden ? "true" : "false";
        return `WIFI:T:${form.wifiEncryption};S:${form.wifiSsid};P:${form.wifiPassword};H:${hidden};;`;
      }
      case "text":
      default:
        return form.text;
    }
  }, [form]);

  useEffect(() => {
    let mounted = true;
    ensureQrCodeStyling()
      .then((QRCodeStylingCtor) => {
        if (!mounted || !qrRef.current || qrCodeRef.current) return;
        qrCodeRef.current = new QRCodeStylingCtor({
          width: form.size,
          height: form.size,
          data: "Type something to generate your QR code",
          margin: 8,
          imageOptions: { crossOrigin: "anonymous", margin: 8 },
          dotsOptions: { type: form.cornerStyle, color: form.fgColor },
          backgroundOptions: { color: form.bgColor },
          cornersSquareOptions: { type: form.cornerStyle, color: form.fgColor },
          cornersDotOptions: { type: form.cornerStyle, color: form.fgColor },
        });
        qrCodeRef.current.append(qrRef.current);
        setLibraryReady(true);
      })
      .catch((loadError) => {
        if (!mounted) return;
        setError(loadError.message);
      });

    return () => {
      mounted = false;
    };
  }, [form.bgColor, form.cornerStyle, form.fgColor, form.size]);

  useEffect(() => {
    if (!qrCodeRef.current) return;

    const hasGradient = form.gradientStart && form.gradientEnd;
    const dotOptions = hasGradient
      ? {
          type: form.cornerStyle,
          gradient: {
            type: "linear",
            rotation: 0,
            colorStops: [
              { offset: 0, color: form.gradientStart },
              { offset: 1, color: form.gradientEnd },
            ],
          },
        }
      : { type: form.cornerStyle, color: form.fgColor };

    qrCodeRef.current.update({
      width: Number(form.size) || 300,
      height: Number(form.size) || 300,
      data: qrData || "Type something to generate your QR code",
      image: logoUrl || undefined,
      dotsOptions: dotOptions,
      cornersSquareOptions: { type: form.cornerStyle, color: form.fgColor },
      cornersDotOptions: { type: form.cornerStyle, color: form.fgColor },
      backgroundOptions: { color: form.bgColor },
    });

    if (qrData) {
      setError("");
    }
  }, [form, logoUrl, qrData]);

  useEffect(() => () => {
    if (logoUrl) URL.revokeObjectURL(logoUrl);
  }, [logoUrl]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (file) => {
    if (!file) return;
    if (logoUrl) URL.revokeObjectURL(logoUrl);
    setLogo(file);
    setLogoUrl(URL.createObjectURL(file));
  };

  const handleGenerate = () => {
    if (!qrData.trim()) {
      setError("Please fill in the selected input type before generating.");
      return;
    }
    setError("");
  };

  const handleClear = () => {
    if (logoUrl) URL.revokeObjectURL(logoUrl);
    setLogo(null);
    setLogoUrl("");
    setError("");
    setForm(createInitialState());
  };

  const downloadQRCode = (extension) => {
    if (!qrCodeRef.current) return;
    if (!qrData.trim()) {
      setError("Please add content before downloading your QR code.");
      return;
    }
    qrCodeRef.current.download({ name: "devfraol-qr-code", extension });
  };

  const renderTypeFields = () => {
    switch (form.type) {
      case "url":
        return <input aria-label="URL input" value={form.url} onChange={(event) => updateField("url", event.target.value)} type="url" placeholder="https://example.com" className="w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2.5 text-sm outline-none focus:border-[#FF3B30]/70 focus:ring-2 focus:ring-[#FF3B30]/30" />;
      case "email":
        return <input aria-label="Email input" value={form.email} onChange={(event) => updateField("email", event.target.value)} type="email" placeholder="name@example.com" className="w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2.5 text-sm outline-none focus:border-[#FF3B30]/70 focus:ring-2 focus:ring-[#FF3B30]/30" />;
      case "phone":
        return <input aria-label="Phone input" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} type="tel" placeholder="+1 555 123 4567" className="w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2.5 text-sm outline-none focus:border-[#FF3B30]/70 focus:ring-2 focus:ring-[#FF3B30]/30" />;
      case "wifi":
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            <input aria-label="Wi-Fi SSID" value={form.wifiSsid} onChange={(event) => updateField("wifiSsid", event.target.value)} type="text" placeholder="Network name (SSID)" className="rounded-xl border border-white/15 bg-black/25 px-3 py-2.5 text-sm outline-none focus:border-[#FF3B30]/70 focus:ring-2 focus:ring-[#FF3B30]/30" />
            <input aria-label="Wi-Fi password" value={form.wifiPassword} onChange={(event) => updateField("wifiPassword", event.target.value)} type="text" placeholder="Wi-Fi password" className="rounded-xl border border-white/15 bg-black/25 px-3 py-2.5 text-sm outline-none focus:border-[#FF3B30]/70 focus:ring-2 focus:ring-[#FF3B30]/30" />
            <select aria-label="Wi-Fi encryption" value={form.wifiEncryption} onChange={(event) => updateField("wifiEncryption", event.target.value)} className="rounded-xl border border-white/15 bg-black/25 px-3 py-2.5 text-sm outline-none focus:border-[#FF3B30]/70 focus:ring-2 focus:ring-[#FF3B30]/30">
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None</option>
            </select>
            <label className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2.5 text-sm focus-within:ring-2 focus-within:ring-[#FF3B30]/30">
              <input aria-label="Wi-Fi hidden network" type="checkbox" checked={form.wifiHidden} onChange={(event) => updateField("wifiHidden", event.target.checked)} />
              Hidden network
            </label>
          </div>
        );
      case "text":
      default:
        return <textarea aria-label="Text input" rows={4} value={form.text} onChange={(event) => updateField("text", event.target.value)} placeholder="Type your text here..." className="w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2.5 text-sm outline-none focus:border-[#FF3B30]/70 focus:ring-2 focus:ring-[#FF3B30]/30" />;
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="mb-7">
        <h1 className="text-3xl font-bold sm:text-4xl">QR Code Generator</h1>
        <p className="mt-2 text-foreground/75">Create custom QR codes with live preview, color controls, logo upload, and quick PNG/SVG download.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <label htmlFor="qr-type" className="mb-2 block text-sm font-medium">Input Type</label>
          <select id="qr-type" aria-label="QR input type" value={form.type} onChange={(event) => updateField("type", event.target.value)} className="w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2.5 text-sm outline-none focus:border-[#FF3B30]/70 focus:ring-2 focus:ring-[#FF3B30]/30">
            {inputTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">Input</label>
            {renderTypeFields()}
          </div>

          <button
            type="button"
            aria-label="Toggle advanced options"
            className="mt-5 text-sm font-semibold text-[#FF3B30] underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/40"
            onClick={() => setIsAdvancedOpen((prev) => !prev)}
          >
            {isAdvancedOpen ? "Hide advanced options" : "Show advanced options"}
          </button>

          {isAdvancedOpen ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 block font-medium">Size (px)</span>
                <input aria-label="QR size" type="number" min={120} max={1200} value={form.size} onChange={(event) => updateField("size", Number(event.target.value))} className="w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2.5 outline-none focus:border-[#FF3B30]/70 focus:ring-2 focus:ring-[#FF3B30]/30" />
              </label>

              <label className="text-sm">
                <span className="mb-1 block font-medium">Corner style</span>
                <select aria-label="Corner style" value={form.cornerStyle} onChange={(event) => updateField("cornerStyle", event.target.value)} className="w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2.5 outline-none focus:border-[#FF3B30]/70 focus:ring-2 focus:ring-[#FF3B30]/30">
                  {cornerStyles.map((style) => <option key={style.value} value={style.value}>{style.label}</option>)}
                </select>
              </label>

              <label className="text-sm">
                <span className="mb-1 block font-medium">Foreground</span>
                <input aria-label="Foreground color" type="color" value={form.fgColor} onChange={(event) => updateField("fgColor", event.target.value)} className="h-11 w-full rounded-xl border border-white/15 bg-black/25 p-1" />
              </label>

              <label className="text-sm">
                <span className="mb-1 block font-medium">Background</span>
                <input aria-label="Background color" type="color" value={form.bgColor} onChange={(event) => updateField("bgColor", event.target.value)} className="h-11 w-full rounded-xl border border-white/15 bg-black/25 p-1" />
              </label>

              <label className="text-sm">
                <span className="mb-1 block font-medium">Gradient start</span>
                <input aria-label="Gradient start color" type="color" value={form.gradientStart || "#ff3b30"} onChange={(event) => updateField("gradientStart", event.target.value)} className="h-11 w-full rounded-xl border border-white/15 bg-black/25 p-1" />
              </label>

              <label className="text-sm">
                <span className="mb-1 block font-medium">Gradient end</span>
                <input aria-label="Gradient end color" type="color" value={form.gradientEnd || "#8b5cf6"} onChange={(event) => updateField("gradientEnd", event.target.value)} className="h-11 w-full rounded-xl border border-white/15 bg-black/25 p-1" />
              </label>

              <label
                htmlFor="logo-upload"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  handleLogoChange(event.dataTransfer.files?.[0]);
                }}
                className="sm:col-span-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/25 bg-black/20 px-3 py-3 text-sm text-foreground/80 hover:border-[#FF3B30]/70"
              >
                <Upload className="h-4 w-4" />
                {logo ? `Logo selected: ${logo.name}` : "Drag & drop logo or click to upload"}
              </label>
              <input id="logo-upload" aria-label="Logo upload" type="file" accept="image/*" className="sr-only" onChange={(event) => handleLogoChange(event.target.files?.[0])} />
            </div>
          ) : null}

          {error ? <p className="mt-4 text-sm text-[#FF3B30]" role="alert">{error}</p> : null}

          <div className="mt-5 flex flex-wrap gap-2">
            <motion.button whileHover={{ y: -1 }} type="button" onClick={handleGenerate} className="rounded-xl bg-[#FF3B30] px-4 py-2.5 text-sm font-semibold text-white">Generate QR</motion.button>
            <button type="button" onClick={handleClear} className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/30">
              <RefreshCcw className="h-4 w-4" />
              Clear
            </button>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h2 className="text-lg font-semibold">Live Preview</h2>
          <p className="mt-1 text-sm text-foreground/75">Your QR updates automatically as you type or change options.</p>

          <div className="mt-4 flex min-h-[320px] items-center justify-center rounded-2xl border border-white/10 bg-white p-4">
            {libraryReady ? <div ref={qrRef} aria-label="QR preview" /> : <p className="text-sm text-slate-700">Loading QR engine...</p>}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" aria-label="Download QR as PNG" onClick={() => downloadQRCode("png")} className="inline-flex items-center gap-2 rounded-xl bg-[#FF3B30] px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/30">
              <Download className="h-4 w-4" />
              Download PNG
            </button>
            <button type="button" aria-label="Download QR as SVG" onClick={() => downloadQRCode("svg")} className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/30">
              <Download className="h-4 w-4" />
              Download SVG
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};
