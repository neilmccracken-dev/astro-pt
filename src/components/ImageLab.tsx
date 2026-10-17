import { useEffect, useState } from "react";

type LabImage = { name: string; src: string };
type Props = { images?: LabImage[] };
type Settings = {
  imageWidth: number;
  positionX: number;
  positionY: number;
  heroHeight: number;
  gradientMiddle: number;
  gradientEnd: number;
  gradientOpacity: number;
  gradientDirection: "right" | "bottom" | "left";
  edgeFadeEnabled: boolean;
  edgeFadeWidth: number;
  edgeFadeOffset: number;
  edgeFadeOpacity: number;
  edgeFadeMiddle: number;
};
type Device = "mobile" | "tablet" | "desktop" | "xl";

const viewports: Record<Device, number> = {
  mobile: 440,
  tablet: 768,
  desktop: 1280,
  xl: 1600,
};
const defaults: Record<Device, Settings> = {
  mobile: {
    imageWidth: 100,
    positionX: 50,
    positionY: 50,
    heroHeight: 480,
    gradientMiddle: 40,
    gradientEnd: 90,
    gradientOpacity: 90,
    gradientDirection: "right",
    edgeFadeEnabled: false,
    edgeFadeWidth: 224,
    edgeFadeOffset: 0,
    edgeFadeOpacity: 90,
    edgeFadeMiddle: 50,
  },
  tablet: {
    imageWidth: 75,
    positionX: 50,
    positionY: 50,
    heroHeight: 600,
    gradientMiddle: 35,
    gradientEnd: 80,
    gradientOpacity: 90,
    gradientDirection: "right",
    edgeFadeEnabled: false,
    edgeFadeWidth: 224,
    edgeFadeOffset: 0,
    edgeFadeOpacity: 90,
    edgeFadeMiddle: 50,
  },
  desktop: {
    imageWidth: 70,
    positionX: 50,
    positionY: 50,
    heroHeight: 720,
    gradientMiddle: 30,
    gradientEnd: 75,
    gradientOpacity: 90,
    gradientDirection: "right",
    edgeFadeEnabled: false,
    edgeFadeWidth: 224,
    edgeFadeOffset: 0,
    edgeFadeOpacity: 90,
    edgeFadeMiddle: 50,
  },
  xl: {
    imageWidth: 70,
    positionX: 50,
    positionY: 50,
    heroHeight: 800,
    gradientMiddle: 25,
    gradientEnd: 70,
    gradientOpacity: 85,
    gradientDirection: "right",
    edgeFadeEnabled: true,
    edgeFadeWidth: 224,
    edgeFadeOffset: 0,
    edgeFadeOpacity: 90,
    edgeFadeMiddle: 50,
  },
};

function RangeControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "%",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block space-y-1">
      <span className="flex justify-between gap-4 text-sm">
        <span>{label}</span>
        <output className="font-mono">
          {value}
          {unit}
        </output>
      </span>
      <input
        className="w-full accent-teal-700"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

export default function ImageLab({ images = [] }: Props) {
  const [device, setDevice] = useState<Device>("mobile");
  const [settingsByDevice, setSettingsByDevice] = useState<
    Record<Device, Settings>
  >(
    () =>
      Object.fromEntries(
        Object.entries(defaults).map(([key, value]) => [key, { ...value }]),
      ) as Record<Device, Settings>,
  );
  const [selectedSrc, setSelectedSrc] = useState(images[0]?.src ?? "");
  const [uploadedSrc, setUploadedSrc] = useState("");
  const [showText, setShowText] = useState(true);
  const [showGradient, setShowGradient] = useState(true);
  const [copyMessage, setCopyMessage] = useState("");
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [showImageBoundary, setShowImageBoundary] = useState(false);
  const settings = settingsByDevice[device];

  useEffect(() => {
    return () => {
      if (uploadedSrc) URL.revokeObjectURL(uploadedSrc);
    };
  }, [uploadedSrc]);

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettingsByDevice((current) => ({
      ...current,
      [device]: { ...current[device], [key]: value },
    }));
  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setUploadedSrc(url);
    setSelectedSrc(url);
    setImageDimensions({ width: 0, height: 0 });
  }

  const imageLeft = 100 - settings.imageWidth;
  const edgeGradient = `linear-gradient(to right, #f3f4f6 0%, rgb(243 244 246 / ${settings.edgeFadeOpacity}%) ${settings.edgeFadeMiddle}%, transparent 100%)`;
  const originalRatio = imageDimensions.height
    ? imageDimensions.width / imageDimensions.height
    : 0;
  const displayWidth = (viewports[device] * settings.imageWidth) / 100;
  const displayRatio = displayWidth / settings.heroHeight;
  const croppedPercent = originalRatio
    ? (1 -
        Math.min(
          originalRatio / displayRatio,
          displayRatio / originalRatio,
          1,
        )) *
      100
    : 0;
  const gradient = `linear-gradient(to ${settings.gradientDirection}, #f3f4f6 0%, rgb(243 244 246 / ${settings.gradientOpacity}%) ${settings.gradientMiddle}%, transparent ${settings.gradientEnd}%)`;
  const css = `/* ${device} — viewport ${viewports[device]}px */\n.hero-image {\n  width: ${settings.imageWidth}%;\n  height: 100%;\n  object-fit: cover;\n  object-position: ${settings.positionX}% ${settings.positionY}%;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n.hero-container {\n  position: relative;\n  overflow: hidden;\n  height: ${settings.heroHeight}px;\n}\n.hero-gradient {\n  position: absolute;\n  inset: 0;\n  background: ${gradient};\n}\n/* Image-edge fade follows the image's left boundary. */\n.hero-edge-gradient {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: calc(${imageLeft}% + ${settings.edgeFadeOffset}px);\n  width: ${settings.edgeFadeWidth}px;\n  transform: translateX(-50%);\n  pointer-events: none;\n  background: ${edgeGradient};\n  display: ${settings.edgeFadeEnabled ? "block" : "none"};\n}`;

  async function copyCSS() {
    try {
      await navigator.clipboard.writeText(css);
      setCopyMessage("CSS copied");
    } catch {
      setCopyMessage("Copy unavailable; select the CSS below.");
    }
  }

  return (
    <main className="mx-auto w-[90%] space-y-6 p-5 font-sans text-slate-900">
      <header>
        <h1 className="text-3xl font-semibold">Image Lab</h1>
        <p className="mt-1 text-sm text-slate-600">
          Experiment with hero images and gradients before copying values to
          your Astro pages.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[310px_minmax(0,1fr)]">
        <aside className="space-y-5 rounded-xl border border-slate-200 bg-white p-4">
          <section className="space-y-2">
            <h2 className="font-semibold">Photo</h2>
            <select
              aria-label="Select image"
              className="w-full rounded border border-slate-300 p-2"
              value={selectedSrc}
              onChange={(event) => {
                setSelectedSrc(event.target.value);
                setImageDimensions({ width: 0, height: 0 });
              }}
            >
              {!selectedSrc && <option value="">Select an image</option>}
              {images.map((image) => (
                <option key={image.src} value={image.src}>
                  {image.name}
                </option>
              ))}
              {uploadedSrc && (
                <option value={uploadedSrc}>Uploaded photo</option>
              )}
            </select>
            <input
              aria-label="Upload image"
              className="block w-full text-sm"
              type="file"
              accept="image/*"
              onChange={handleUpload}
            />
          </section>

          <section className="space-y-3 border-t pt-4">
            <h2 className="font-semibold">Image and container</h2>
            <RangeControl
              label="Image width"
              min={30}
              max={100}
              value={settings.imageWidth}
              onChange={(v) => update("imageWidth", v)}
            />
            <RangeControl
              label="Horizontal position"
              min={0}
              max={100}
              value={settings.positionX}
              onChange={(v) => update("positionX", v)}
            />
            <RangeControl
              label="Vertical position"
              min={0}
              max={100}
              value={settings.positionY}
              onChange={(v) => update("positionY", v)}
            />
            <RangeControl
              label="Hero height"
              min={250}
              max={1100}
              step={10}
              unit="px"
              value={settings.heroHeight}
              onChange={(v) => update("heroHeight", v)}
            />
          </section>

          <section className="space-y-3 border-t pt-4">
            <h2 className="font-semibold">Main gradient (full hero)</h2>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showGradient}
                onChange={(e) => setShowGradient(e.target.checked)}
              />{" "}
              Show gradient
            </label>
            <label className="block text-sm">
              Direction
              <select
                className="mt-1 w-full rounded border border-slate-300 p-2"
                value={settings.gradientDirection}
                onChange={(e) =>
                  update(
                    "gradientDirection",
                    e.target.value as Settings["gradientDirection"],
                  )
                }
              >
                <option value="right">Left to right</option>
                <option value="left">Right to left</option>
                <option value="bottom">Top to bottom</option>
              </select>
            </label>
            <RangeControl
              label="Middle stop"
              min={0}
              max={settings.gradientEnd}
              value={settings.gradientMiddle}
              onChange={(v) => update("gradientMiddle", v)}
            />
            <RangeControl
              label="Fade ends"
              min={settings.gradientMiddle}
              max={100}
              value={settings.gradientEnd}
              onChange={(v) => update("gradientEnd", v)}
            />
            <RangeControl
              label="Middle opacity"
              min={0}
              max={100}
              value={settings.gradientOpacity}
              onChange={(v) => update("gradientOpacity", v)}
            />
          </section>
          <section className="space-y-3 border-t pt-4">
            <h2 className="font-semibold">Image-edge transition</h2>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.edgeFadeEnabled}
                onChange={(e) => update("edgeFadeEnabled", e.target.checked)}
              />{" "}
              Enable edge fade
            </label>
            <p className="text-xs text-slate-600">
              A separate gradient centered on the image’s left boundary (like
              your XL hero). It moves automatically as image width changes.
            </p>
            <RangeControl
              label="Fade width"
              min={40}
              max={600}
              step={4}
              unit="px"
              value={settings.edgeFadeWidth}
              onChange={(v) => update("edgeFadeWidth", v)}
            />
            <RangeControl
              label="Fade offset"
              min={-250}
              max={250}
              step={5}
              unit="px"
              value={settings.edgeFadeOffset}
              onChange={(v) => update("edgeFadeOffset", v)}
            />
            <RangeControl
              label="Middle stop"
              min={0}
              max={100}
              value={settings.edgeFadeMiddle}
              onChange={(v) => update("edgeFadeMiddle", v)}
            />
            <RangeControl
              label="Middle opacity"
              min={0}
              max={100}
              value={settings.edgeFadeOpacity}
              onChange={(v) => update("edgeFadeOpacity", v)}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showImageBoundary}
                onChange={(e) => setShowImageBoundary(e.target.checked)}
              />{" "}
              Show image boundary
            </label>
          </section>
          <button
            className="w-full rounded bg-slate-800 px-3 py-2 text-white hover:bg-slate-700"
            onClick={() => updateAllToDefault()}
          >
            Reset current viewport
          </button>
        </aside>

        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {(Object.keys(viewports) as Device[]).map((item) => (
              <button
                key={item}
                onClick={() => setDevice(item)}
                className={`rounded px-3 py-2 text-sm capitalize ${device === item ? "bg-teal-800 text-white" : "bg-slate-100 hover:bg-slate-200"}`}
              >
                {item} ({viewports[item]}px)
              </button>
            ))}
            <label className="ml-auto flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showText}
                onChange={(e) => setShowText(e.target.checked)}
              />{" "}
              Show sample text
            </label>
          </div>

          <div className="overflow-x-auto rounded-xl border bg-slate-100 p-3">
            <div
              className="mx-auto relative bg-gray-100"
              style={{
                width: `${viewports[device]}px`,
                height: `${settings.heroHeight}px`,
                maxWidth: "none",
              }}
            >
              {selectedSrc ? (
                <img
                  src={selectedSrc}
                  alt="Selected hero preview"
                  onLoad={(event) =>
                    setImageDimensions({
                      width: event.currentTarget.naturalWidth,
                      height: event.currentTarget.naturalHeight,
                    })
                  }
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: `${settings.imageWidth}%`,
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: `${settings.positionX}% ${settings.positionY}%`,
                  }}
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-slate-500">
                  Select or upload a photo
                </div>
              )}
              {settings.edgeFadeEnabled && selectedSrc && (
                <div
                  className="pointer-events-none absolute inset-y-0"
                  style={{
                    left: `calc(${imageLeft}% + ${settings.edgeFadeOffset}px)`,
                    width: `${settings.edgeFadeWidth}px`,
                    transform: "translateX(-50%)",
                    background: edgeGradient,
                  }}
                />
              )}
              {showGradient && (
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: gradient }}
                />
              )}
              {showImageBoundary && (
                <div
                  className="pointer-events-none absolute inset-y-0 border-l-2 border-dashed border-red-600"
                  style={{ left: `${imageLeft}%` }}
                />
              )}
              {showText && (
                <div className="pointer-events-none absolute inset-0 flex items-center px-6 md:px-16">
                  <div className="max-w-md">
                    <h2 className="font-serif text-3xl text-slate-900 md:text-5xl">
                      Mobile care
                      <br />
                      for modern life.
                    </h2>
                    <div className="mt-4 h-px w-12 bg-teal-700" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-slate-600">
            The preview uses the selected viewport's actual CSS pixel width.
            Scroll horizontally on smaller screens to inspect it without
            scaling.
          </p>

          <section className="space-y-2 rounded-xl border p-4 text-sm">
            <h2 className="font-semibold">Aspect ratio comparison</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-500">Original photo</p>
                <p className="font-semibold">
                  {originalRatio ? `${originalRatio.toFixed(2)}:1` : "—"}
                </p>
                <p>
                  {imageDimensions.width} × {imageDimensions.height}px
                </p>
              </div>
              <div>
                <p className="text-slate-500">Image display box</p>
                <p className="font-semibold">{displayRatio.toFixed(2)}:1</p>
                <p>
                  {Math.round(displayWidth)} × {settings.heroHeight}px
                </p>
              </div>
            </div>
            <p className="text-slate-600">
              Estimated original area cropped by object-cover:{" "}
              <strong>
                {originalRatio ? `${croppedPercent.toFixed(1)}%` : "—"}
              </strong>
            </p>
          </section>

          <section className="space-y-2 rounded-xl border p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold">CSS for {device}</h2>
              <button
                onClick={copyCSS}
                className="rounded bg-teal-800 px-3 py-2 text-sm text-white"
              >
                Copy CSS
              </button>
            </div>
            {copyMessage && (
              <p role="status" className="text-sm text-slate-600">
                {copyMessage}
              </p>
            )}
            <textarea
              aria-label="Generated CSS"
              readOnly
              value={css}
              className="h-64 w-full rounded border bg-slate-50 p-3 font-mono text-xs"
            />
          </section>
        </div>
      </div>
    </main>
  );

  function updateAllToDefault() {
    setSettingsByDevice((current) => ({
      ...current,
      [device]: { ...defaults[device] },
    }));
  }
}
