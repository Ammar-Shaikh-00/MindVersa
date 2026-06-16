const ROW1 =
  "Python · TensorFlow · PyTorch · Scikit-learn · LangChain · HuggingFace · OpenAI · FastAPI · Docker · Kubernetes";
const ROW2 =
  "Machine Learning · Deep Learning · Computer Vision · NLP · Data Engineering · MLOps · Predictive Analytics · LLMs · RAG";

export function MarqueeSection() {
  return (
    <section
      aria-label="Capabilities"
      className="marquee-wrapper relative overflow-hidden"
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "24px 0",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 100,
          background: "linear-gradient(to right, var(--bg-surface), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 100,
          background: "linear-gradient(to left, var(--bg-surface), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div className="marquee marquee-left">
        <span
          className="font-display whitespace-nowrap pr-12"
          style={{
            fontWeight: 600,
            fontSize: 16,
            color: "var(--text-muted)",
            letterSpacing: "1px",
          }}
        >
          {ROW1}
          <span className="px-6">·</span>
        </span>
        <span
          className="font-display whitespace-nowrap pr-12"
          aria-hidden
          style={{
            fontWeight: 600,
            fontSize: 16,
            color: "var(--text-muted)",
            letterSpacing: "1px",
          }}
        >
          {ROW1}
          <span className="px-6">·</span>
        </span>
      </div>

      <div className="marquee marquee-right mt-3">
        <span
          className="whitespace-nowrap pr-12"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 500,
            fontSize: 13,
            color: "var(--text-muted)",
          }}
        >
          {ROW2}
          <span className="px-6">·</span>
        </span>
        <span
          className="whitespace-nowrap pr-12"
          aria-hidden
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 500,
            fontSize: 13,
            color: "var(--text-muted)",
          }}
        >
          {ROW2}
          <span className="px-6">·</span>
        </span>
      </div>
    </section>
  );
}
