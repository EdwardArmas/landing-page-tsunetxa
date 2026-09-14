type LandBlob = {
  lat: number;
  lon: number;
  rx: number;
  ry: number;
};

const LAND_BLOBS: LandBlob[] = [
  { lat: 60, lon: -110, rx: 32, ry: 16 },
  { lat: 48, lon: -98, rx: 26, ry: 14 },
  { lat: 38, lon: -96, rx: 22, ry: 10 },
  { lat: 28, lon: -102, rx: 16, ry: 8 },
  { lat: 55, lon: -70, rx: 12, ry: 8 },
  { lat: 72, lon: -40, rx: 12, ry: 8 },
  { lat: 8, lon: -74, rx: 8, ry: 10 },
  { lat: -8, lon: -58, rx: 16, ry: 20 },
  { lat: -28, lon: -64, rx: 12, ry: 18 },
  { lat: -42, lon: -68, rx: 8, ry: 10 },
  { lat: 12, lon: 8, rx: 18, ry: 14 },
  { lat: -6, lon: 22, rx: 16, ry: 18 },
  { lat: -22, lon: 26, rx: 12, ry: 14 },
  { lat: 48, lon: 10, rx: 16, ry: 10 },
  { lat: 60, lon: 20, rx: 14, ry: 8 },
  { lat: 58, lon: 80, rx: 30, ry: 12 },
  { lat: 40, lon: 88, rx: 32, ry: 16 },
  { lat: 22, lon: 78, rx: 14, ry: 12 },
  { lat: 28, lon: 112, rx: 16, ry: 12 },
  { lat: 8, lon: 108, rx: 18, ry: 10 },
  { lat: -2, lon: 114, rx: 14, ry: 8 },
  { lat: -24, lon: 134, rx: 16, ry: 10 },
  { lat: -42, lon: 172, rx: 8, ry: 10 },
];

function isLand(lat: number, lon: number) {
  return LAND_BLOBS.some((blob) => {
    const dlat = (lat - blob.lat) / blob.ry;
    const dlon = (lon - blob.lon) / blob.rx;
    return dlat * dlat + dlon * dlon < 1;
  });
}

function wrapLon(value: number) {
  let lon = value;
  while (lon > 180) lon -= 360;
  while (lon < -180) lon += 360;
  return lon;
}

function createEarthDots() {
  const dots: { cx: number; cy: number; r: number; opacity: number }[] = [];
  const radius = 68;
  const centerLon = -58;

  for (let lat = -76; lat <= 76; lat += 2.6) {
    const latRad = (lat * Math.PI) / 180;
    const columns = Math.max(10, Math.round(48 * Math.cos(latRad)));

    for (let i = 0; i < columns; i += 1) {
      const lon = -180 + (360 * i) / columns;
      if (!isLand(lat, lon)) {
        continue;
      }

      const relLon = wrapLon(lon - centerLon);
      if (Math.abs(relLon) > 92) {
        continue;
      }

      const lonRad = (relLon * Math.PI) / 180;
      const depth = Math.cos(lonRad) * Math.cos(latRad);
      if (depth < 0.04) {
        continue;
      }

      dots.push({
        cx: 100 + radius * Math.cos(latRad) * Math.sin(lonRad),
        cy: 100 - radius * Math.sin(latRad),
        r: 0.42 + depth * 0.62,
        opacity: 0.22 + depth * 0.72,
      });
    }
  }

  return dots;
}

const EARTH_DOTS = createEarthDots();

function DigitalGlobe() {
  return (
    <svg viewBox="0 0 200 200" className="h-[210px] w-[210px]" fill="none">
      <defs>
        <radialGradient id="login-globe-fill" cx="34%" cy="30%" r="72%">
          <stop offset="0%" stopColor="rgba(45, 212, 191, 0.18)" />
          <stop offset="42%" stopColor="rgba(8, 36, 40, 0.55)" />
          <stop offset="100%" stopColor="rgba(2, 10, 12, 0.2)" />
        </radialGradient>
        <radialGradient id="login-globe-glow" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="rgba(45, 212, 191, 0)" />
          <stop offset="100%" stopColor="rgba(45, 212, 191, 0.28)" />
        </radialGradient>
        <clipPath id="login-globe-clip">
          <circle cx="100" cy="100" r="70" />
        </clipPath>
      </defs>

      <circle cx="100" cy="100" r="78" fill="url(#login-globe-glow)" />
      <circle
        cx="100"
        cy="100"
        r="70"
        fill="url(#login-globe-fill)"
        stroke="rgba(94, 234, 212, 0.35)"
        strokeWidth="1.2"
      />

      <g clipPath="url(#login-globe-clip)" opacity="0.35">
        <ellipse cx="100" cy="100" rx="70" ry="18" stroke="rgba(45, 212, 191, 0.35)" />
        <ellipse cx="100" cy="100" rx="70" ry="38" stroke="rgba(45, 212, 191, 0.22)" />
        <ellipse cx="100" cy="68" rx="58" ry="12" stroke="rgba(45, 212, 191, 0.18)" />
        <ellipse cx="100" cy="132" rx="58" ry="12" stroke="rgba(45, 212, 191, 0.18)" />
        <ellipse cx="100" cy="100" rx="24" ry="70" stroke="rgba(45, 212, 191, 0.28)" />
        <ellipse cx="100" cy="100" rx="46" ry="70" stroke="rgba(45, 212, 191, 0.18)" />
      </g>

      {EARTH_DOTS.map((dot, index) => (
        <circle
          key={index}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill="rgb(153, 246, 228)"
          opacity={dot.opacity}
        />
      ))}
    </svg>
  );
}

export function LoginBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[#020b0c]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_14%_28%,rgba(20,184,166,0.16),transparent_46%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_82%_48%,rgba(45,212,191,0.1),transparent_34%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(1,6,7,0.72)_100%)]" />

      <div className="absolute inset-0 opacity-80 [background-image:linear-gradient(rgba(45,212,191,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.04)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_78%)]" />

      <div className="absolute -left-[38%] -top-[34%] hidden aspect-square w-[640px] md:block lg:-left-[22%] lg:-top-[24%] lg:w-[780px] xl:-left-[16%] xl:-top-[20%] xl:w-[900px]">
        <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_28%_34%,#1a5553_0%,#07191b_38%,#020b0c_64%,transparent_72%)]" />
        <div className="absolute inset-[6%] rounded-full border border-accent-bright/25 shadow-[inset_-28px_0_90px_rgba(45,212,191,0.28),inset_-3px_0_0_rgba(94,234,212,0.55)]" />
        <div className="login-glow-breathe absolute right-[5%] top-[18%] h-[62%] w-[22%] rounded-full bg-[radial-gradient(circle_at_center,rgba(94,234,212,0.62),transparent_68%)] blur-[1px]" />
      </div>

      <div className="absolute left-[11%] top-[40%] hidden h-[4.75rem] w-[4.75rem] rounded-full bg-[radial-gradient(circle_at_30%_28%,#3f8f8a,#041314_74%)] shadow-[inset_-10px_-8px_18px_rgba(45,212,191,0.3),0_0_28px_rgba(45,212,191,0.16)] md:block lg:left-[13%] lg:h-20 lg:w-20 xl:left-[15%] xl:top-[42%]" />

      <div className="absolute left-[4%] top-[-12%] hidden h-[680px] w-[680px] -rotate-[16deg] md:block xl:left-[10%] xl:h-[880px] xl:w-[880px]">
        <div className="absolute inset-0 rounded-full border border-accent-bright/25" />
        <div className="absolute inset-[11%] rounded-full border border-accent-bright/15" />
        <div className="absolute inset-[-10%] rounded-full border border-accent-bright/10" />
        <div className="login-dot-pulse absolute right-[9%] top-[14%] h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_14px_rgba(45,212,191,0.95)]" />
        <div className="login-dot-pulse-delayed absolute bottom-[26%] left-[12%] h-1 w-1 rounded-full bg-accent-bright shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
      </div>

      <div className="absolute right-[-16%] top-[2%] hidden h-[640px] w-[980px] rotate-[12deg] md:block">
        <div className="absolute inset-x-[12%] inset-y-[18%] rounded-full border border-accent-bright/15" />
        <div className="login-dot-pulse absolute right-[20%] top-[22%] h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_16px_rgba(45,212,191,1)]" />
        <div className="login-dot-pulse-delayed absolute right-[30%] top-[14%] h-1 w-1 rounded-full bg-accent-bright/90 shadow-[0_0_10px_rgba(45,212,191,0.75)]" />
      </div>

      <div className="absolute top-[18%] left-[calc(50%+168px)] hidden h-[430px] w-[360px] lg:block xl:left-[calc(50%+176px)] xl:top-[16%]">
        <div
          className="absolute left-[92px] top-10 h-[340px] w-[220px] rounded-[24px] border border-accent-bright/20 bg-[rgba(8,32,34,0.18)] backdrop-blur-[2px]"
          style={{ transform: "perspective(1100px) rotateY(-22deg)" }}
        />
        <div
          className="absolute left-[48px] top-5 h-[360px] w-[228px] rounded-[24px] border border-accent-bright/28 bg-[rgba(8,32,34,0.28)] backdrop-blur-sm"
          style={{ transform: "perspective(1100px) rotateY(-16deg)" }}
        />
        <div
          className="absolute left-0 top-0 flex h-[380px] w-[250px] items-center justify-center overflow-hidden rounded-[24px] border border-accent-bright/40 bg-[rgba(6,28,30,0.5)] backdrop-blur-md"
          style={{ transform: "perspective(1100px) rotateY(-11deg)" }}
        >
          <DigitalGlobe />
        </div>

        <div className="absolute right-2 top-[46%] max-w-[5.8rem] text-[10px] font-medium uppercase leading-5 tracking-[0.28em] text-foreground-subtle">
          Ideas
          <br />
          People
          <br />
          Technology
          <br />
          Real impact
          <span className="mt-4 block h-px w-8 bg-accent" />
        </div>
      </div>
    </div>
  );
}
