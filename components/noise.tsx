export function Noise() {
  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>
         <feColorMatrix type='saturate' values='0'/>
       </filter>
       <rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/>
     </svg>`,
  );

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 100,
        opacity: 0.032,
        mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml;utf8,${svg}")`,
        backgroundSize: "180px 180px",
      }}
    />
  );
}
