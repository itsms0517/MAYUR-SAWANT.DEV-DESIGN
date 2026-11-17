"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Image as ImageIcon, Sparkles, Check, X, Upload, ExternalLink, Search } from "lucide-react";
import { toast } from "sonner";

export interface PresetImage {
  id: string;
  title: string;
  category: "dev" | "design" | "saas" | "apps" | "hospitality" | "rental";
  categoryLabel: string;
  url: string;
}

export const PRESET_IMAGES: PresetImage[] = [
  // Full-Stack & Dev
  {
    id: "dev-ide",
    title: "Modern Dark IDE & Code",
    category: "dev",
    categoryLabel: "Full-Stack / Dev",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "dev-workspace",
    title: "Full-Stack Dev Workspace",
    category: "dev",
    categoryLabel: "Full-Stack / Dev",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "dev-terminal",
    title: "Cloud & Terminal Console",
    category: "dev",
    categoryLabel: "Full-Stack / Dev",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "dev-abstract",
    title: "Dark Algorithmic Waves",
    category: "dev",
    categoryLabel: "Full-Stack / Dev",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
  },

  // Dashboards & SaaS
  {
    id: "saas-dark",
    title: "Dark SaaS Analytics Platform",
    category: "saas",
    categoryLabel: "Dashboards & SaaS",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  },
  {
    id: "saas-bento",
    title: "Bento Grid Metrics & Charts",
    category: "saas",
    categoryLabel: "Dashboards & SaaS",
    url: "https://images.unsplash.com/photo-1686061592689-312bbfb5c055?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  },
  {
    id: "saas-finance",
    title: "Financial Intelligence Growth",
    category: "saas",
    categoryLabel: "Dashboards & SaaS",
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
  },

  // UI/UX & Design Systems
  {
    id: "design-editorial",
    title: "Editorial Brand & Typography",
    category: "design",
    categoryLabel: "UI/UX & Design",
    url: "https://images.unsplash.com/photo-1619632973808-4acf8041df42?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  },
  {
    id: "design-tokens",
    title: "Figma Design Tokens & Components",
    category: "design",
    categoryLabel: "UI/UX & Design",
    url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "design-minimal",
    title: "Minimalist Glass & Geometry",
    category: "design",
    categoryLabel: "UI/UX & Design",
    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=80",
  },

  // Web Apps & Mobile
  {
    id: "apps-mobile",
    title: "Modern Mobile Application",
    category: "apps",
    categoryLabel: "Web & Mobile Apps",
    url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "apps-commerce",
    title: "E-Commerce Digital Storefront",
    category: "apps",
    categoryLabel: "Web & Mobile Apps",
    url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1600&q=80",
  },

  // Hospitality & Food
  {
    id: "hosp-cafe",
    title: "Artisanal Café & Espresso Bar",
    category: "hospitality",
    categoryLabel: "Café & Hospitality",
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80",
  },

  // Rental & Real Estate
  {
    id: "rental-room",
    title: "Modern PG & Apartment Living",
    category: "rental",
    categoryLabel: "Rental & Real Estate",
    url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
  },
];

interface CoverImageSelectorProps {
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
}

export default function CoverImageSelector({ value, onChange, required = false }: CoverImageSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewError, setPreviewError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset error whenever value changes
  useEffect(() => {
    setPreviewError(false);
  }, [value]);

  const filteredPresets = PRESET_IMAGES.filter((img) => {
    const matchesCategory = selectedCategory === "all" || img.category === selectedCategory;
    const matchesSearch =
      img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectPreset = (url: string, title: string) => {
    onChange(url);
    setIsModalOpen(false);
    toast.success(`Selected "${title}" as cover image`);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, WebP)");
      return;
    }

    // Size limit: 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file must be under 5MB");
      return;
    }

    setIsUploading(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
      const apiBase = (process.env.NEXT_PUBLIC_API_URL || "https://mayur-sawant-dev-design-1.onrender.com/api").replace(/\/$/, "");

      // Try uploading to backend upload endpoint if token exists
      if (token) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch(`${apiBase}/admin/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (uploadRes.ok) {
          const data = await uploadRes.json();
          if (data.url) {
            onChange(data.url);
            toast.success("Image uploaded and selected successfully!");
            setIsUploading(false);
            return;
          }
        }
      }

      // If backend upload endpoint is not available, read as client-side Data URL for preview
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const resultUrl = uploadEvent.target?.result as string;
        if (resultUrl) {
          // If the data URL is small enough (< 500 chars), we can store it directly,
          // otherwise inform user and recommend presets or external URL
          if (resultUrl.length <= 500) {
            onChange(resultUrl);
            toast.success("Image selected from device!");
          } else {
            toast.info(
              "Local file loaded. For cloud persistence across production builds, use an image URL or choose from our gallery presets below.",
              { duration: 5000 }
            );
            // Pre-fill a high quality matching preset
            onChange(PRESET_IMAGES[0].url);
          }
        }
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error("Could not process local image. Please choose from presets or paste a public URL.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-3">
      {/* Label and Quick Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
          Cover Image URL {required && <span className="text-accent">*</span>}
        </label>
        <div className="flex items-center gap-2">
          {/* Preset Gallery Trigger */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Select from Gallery</span>
          </button>

          {/* Device Upload Trigger */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface-card border border-border text-muted hover:text-ink hover:border-accent transition-all"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{isUploading ? "Uploading..." : "Upload from Device"}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* URL Input Bar */}
      <div className="relative">
        <input
          type="url"
          required={required}
          placeholder="https://images.unsplash.com/..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-surface-card border border-border text-sm text-ink focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
        />
        <ImageIcon className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-ink transition-colors"
            title="Clear URL"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Fast Preset Quick Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] text-muted">
        <span className="font-semibold text-muted/70 flex-shrink-0">Quick picks:</span>
        {PRESET_IMAGES.slice(0, 5).map((preset) => {
          const isSelected = value === preset.url;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset.url, preset.title)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors flex items-center gap-1 flex-shrink-0 ${
                isSelected
                  ? "bg-accent text-background font-bold"
                  : "bg-surface-card border border-border hover:border-accent hover:text-ink"
              }`}
            >
              {isSelected && <Check className="w-3 h-3" />}
              <span>{preset.title.split(" ")[0]}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-2 py-1 text-accent hover:underline font-semibold flex-shrink-0"
        >
          More ({PRESET_IMAGES.length})...
        </button>
      </div>

      {/* Live Preview Card */}
      {value && (
        <div className="relative p-2.5 rounded-xl bg-surface-card border border-border flex items-center gap-3">
          <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-surface flex-shrink-0 border border-border">
            {!previewError ? (
              <Image
                src={value}
                alt="Cover Preview"
                fill
                sizes="80px"
                className="object-cover"
                onError={() => setPreviewError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-red-400 p-1 text-center bg-red-500/10">
                Invalid Image
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Active Cover Image
              </span>
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-muted hover:text-accent inline-flex items-center gap-0.5"
                title="Open in new tab"
              >
                <span>View</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <p className="text-xs text-muted truncate">{value}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface border border-border text-ink hover:border-accent transition-colors flex-shrink-0"
          >
            Change
          </button>
        </div>
      )}

      {/* Preset Image Gallery Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-ink flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span>Curated Cover Image Library</span>
                </h3>
                <p className="text-xs text-muted">
                  Click any high-resolution image to instantly set it as your project cover.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-muted hover:text-ink hover:bg-surface-card transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Bar */}
            <div className="p-4 border-b border-border bg-surface-card/50 flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Category Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {[
                  { id: "all", label: "All" },
                  { id: "dev", label: "Code & Dev" },
                  { id: "saas", label: "Dashboards" },
                  { id: "design", label: "UI/UX & Design" },
                  { id: "apps", label: "Mobile & Apps" },
                  { id: "hospitality", label: "Café & Food" },
                  { id: "rental", label: "Rental / PG" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedCategory === tab.id
                        ? "bg-accent text-background font-bold shadow-sm"
                        : "bg-surface border border-border text-muted hover:text-ink"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-60">
                <input
                  type="text"
                  placeholder="Search presets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-surface border border-border text-xs text-ink placeholder:text-muted/60"
                />
                <Search className="w-3.5 h-3.5 text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Grid of Presets */}
            <div className="p-5 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredPresets.map((preset) => {
                const isSelected = value === preset.url;
                return (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.url, preset.title)}
                    className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                      isSelected
                        ? "border-accent ring-2 ring-accent shadow-lg shadow-accent/15"
                        : "border-border hover:border-accent/60 bg-surface-card"
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden bg-surface">
                      <Image
                        src={preset.url}
                        alt={preset.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />

                      {/* Selection Check Badge */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-accent text-background text-[10px] font-bold flex items-center gap-1 shadow-md">
                          <Check className="w-3 h-3" />
                          <span>Selected</span>
                        </div>
                      )}

                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-medium text-white/90 border border-white/10">
                        {preset.categoryLabel}
                      </span>
                    </div>

                    {/* Metadata & Select Action */}
                    <div className="p-3 flex items-center justify-between gap-2 bg-surface">
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-ink truncate group-hover:text-accent transition-colors">
                          {preset.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-semibold text-accent flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        Select →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border bg-surface-card/30 flex items-center justify-between text-xs text-muted">
              <span>Showing {filteredPresets.length} presets</span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-surface border border-border text-ink hover:border-accent transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
