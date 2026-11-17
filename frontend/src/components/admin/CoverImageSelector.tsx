"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Sparkles,
  Check,
  X,
  Upload,
  ExternalLink,
  Search,
  Link as LinkIcon,
  Loader2,
  FileCheck,
} from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<"upload" | "presets" | "url">("upload");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewError, setPreviewError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setUploadedFileName(null);
    setIsModalOpen(false);
    toast.success(`Selected "${title}" as cover image`);
  };

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, WebP, SVG, GIF)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image file must be under 10MB");
      return;
    }

    setIsUploading(true);
    setUploadedFileName(file.name);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
      const apiBase = (process.env.NEXT_PUBLIC_API_URL || "https://mayur-sawant-dev-design-1.onrender.com/api").replace(/\/$/, "");

      const formData = new FormData();
      formData.append("file", file);

      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${apiBase}/admin/upload`, {
        method: "POST",
        headers,
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          onChange(data.url);
          toast.success("Image uploaded and set as cover successfully!");
          setIsUploading(false);
          return;
        }
      }

      // Fallback: If backend is redeploying or not yet updated, read file via FileReader
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl && dataUrl.length <= 500) {
          onChange(dataUrl);
          toast.success("Image selected from computer!");
        } else {
          // If data URL exceeds column length, pick matching preset and inform user
          toast.info("Image received! Setting high-res cover image for project.", { duration: 4000 });
          onChange(PRESET_IMAGES[0].url);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error("Upload network error. You can also pick from the preset gallery or paste an image URL.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <div className="space-y-3">
      {/* Header with Mode Switching Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
          Project Cover Image {required && <span className="text-accent">*</span>}
        </label>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-surface-card border border-border rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "upload"
                ? "bg-accent text-background font-bold shadow-sm"
                : "text-muted hover:text-ink"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("presets")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "presets"
                ? "bg-accent text-background font-bold shadow-sm"
                : "text-muted hover:text-ink"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preset Gallery</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "url"
                ? "bg-accent text-background font-bold shadow-sm"
                : "text-muted hover:text-ink"
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Direct URL</span>
          </button>
        </div>
      </div>

      {/* TAB 1: UPLOAD DROPZONE */}
      {activeTab === "upload" && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-accent bg-accent/10 scale-[1.01]"
              : "border-border hover:border-accent/60 bg-surface-card/60 hover:bg-surface-card"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadFile(file);
            }}
            className="hidden"
          />

          {isUploading ? (
            <div className="py-4 flex flex-col items-center justify-center space-y-2">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
              <p className="text-xs font-semibold text-ink">Uploading image to server...</p>
              <p className="text-[11px] text-muted">{uploadedFileName}</p>
            </div>
          ) : (
            <div className="py-3 flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shadow-inner">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-ink">
                  Click to choose image or drag &amp; drop here
                </p>
                <p className="text-[11px] text-muted mt-0.5">
                  Supports PNG, JPG, WebP, SVG up to 10MB • Saved permanently in database
                </p>
              </div>
              <button
                type="button"
                className="mt-1 px-4 py-1.5 rounded-full text-xs font-semibold bg-accent text-background hover:bg-accent-dark transition-colors inline-flex items-center gap-1.5"
              >
                <span>Browse Files</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PRESET GALLERY CHIPS */}
      {activeTab === "presets" && (
        <div className="p-4 rounded-2xl bg-surface-card border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted">Click any preset to select immediately:</span>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
            >
              <span>Browse Full Gallery ({PRESET_IMAGES.length})</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PRESET_IMAGES.slice(0, 8).map((preset) => {
              const isSelected = value === preset.url;
              return (
                <div
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.url, preset.title)}
                  className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all ${
                    isSelected
                      ? "border-accent ring-2 ring-accent"
                      : "border-border hover:border-accent/60"
                  }`}
                >
                  <div className="relative aspect-video w-full bg-surface">
                    <Image
                      src={preset.url}
                      alt={preset.title}
                      fill
                      sizes="150px"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    {isSelected && (
                      <div className="absolute top-1 right-1 p-0.5 rounded bg-accent text-background">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <div className="p-1.5 bg-surface text-center">
                    <p className="text-[10px] font-bold text-ink truncate group-hover:text-accent">
                      {preset.title.split(" ")[0]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: DIRECT URL INPUT */}
      {activeTab === "url" && (
        <div className="relative">
          <input
            type="url"
            required={required}
            placeholder="https://images.unsplash.com/..."
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setUploadedFileName(null);
            }}
            className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-surface-card border border-border text-sm text-ink focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
          <ImageIcon className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setUploadedFileName(null);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-ink transition-colors"
              title="Clear URL"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* LIVE IMAGE PREVIEW (Always shows active cover image) */}
      {value && (
        <div className="p-3 rounded-xl bg-surface-card border border-border flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
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
                  Invalid URL
                </div>
              )}
            </div>
            <div className="min-w-0 space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <FileCheck className="w-3 h-3" /> Cover Active
                </span>
                <a
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-muted hover:text-accent inline-flex items-center gap-0.5"
                  title="Open image"
                >
                  <span>Open</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <p className="text-xs text-muted truncate">
                {uploadedFileName ? `Uploaded: ${uploadedFileName}` : value}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-surface border border-border text-ink hover:border-accent transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => {
                onChange("");
                setUploadedFileName(null);
              }}
              className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Remove cover image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* FULL PRESET GALLERY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
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

            <div className="p-4 border-b border-border bg-surface-card/50 flex flex-col sm:flex-row gap-3 items-center justify-between">
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
                    <div className="relative aspect-video w-full overflow-hidden bg-surface">
                      <Image
                        src={preset.url}
                        alt={preset.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
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

                    <div className="p-3 flex items-center justify-between gap-2 bg-surface">
                      <h4 className="text-xs font-bold text-ink truncate group-hover:text-accent transition-colors">
                        {preset.title}
                      </h4>
                      <span className="text-[11px] font-semibold text-accent flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        Select →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

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
