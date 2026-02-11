"use client";

interface SkeletonCardProps {
  index?: number;
}

export default function SkeletonCard({ index = 0 }: SkeletonCardProps) {
  return (
    <article
      className="animate-fade-slide-up"
      style={{
        animationDelay: `${index * 0.08}s`,
        background: "var(--surface)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Image skeleton */}
      <div
        className="relative w-full skeleton"
        style={{
          height: "clamp(180px, 30vw, 240px)",
        }}
      >
        {/* Platform badge skeleton */}
        <div
          className="absolute top-3 left-3 skeleton"
          style={{
            width: "80px",
            height: "28px",
            borderRadius: "var(--radius-input)",
            zIndex: 1,
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center" style={{ padding: "16px 20px 20px 20px" }}>
        {/* Location + Price Row */}
        <div className="flex items-start justify-between gap-3 mb-2 w-full">
          <div className="flex-1 min-w-0 space-y-2">
            {/* Title skeleton */}
            <div
              className="skeleton"
              style={{
                width: "85%",
                height: "20px",
                borderRadius: "4px",
              }}
            />
            {/* Location skeleton */}
            <div
              className="skeleton"
              style={{
                width: "60%",
                height: "16px",
                borderRadius: "4px",
              }}
            />
          </div>

          {/* Price skeleton */}
          <div className="shrink-0 text-right space-y-1" style={{ maxWidth: "45%" }}>
            <div
              className="skeleton"
              style={{
                width: "70px",
                height: "20px",
                borderRadius: "4px",
              }}
            />
            <div
              className="skeleton"
              style={{
                width: "50px",
                height: "14px",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        {/* Rating skeleton */}
        <div className="flex items-center gap-1.5 mb-3 w-full">
          <div
            className="skeleton"
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
            }}
          />
          <div
            className="skeleton"
            style={{
              width: "30px",
              height: "16px",
              borderRadius: "4px",
            }}
          />
          <div
            className="skeleton"
            style={{
              width: "60px",
              height: "14px",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Description skeleton */}
        <div className="w-full mb-3 space-y-2">
          <div
            className="skeleton"
            style={{
              width: "100%",
              height: "14px",
              borderRadius: "4px",
            }}
          />
          <div
            className="skeleton"
            style={{
              width: "95%",
              height: "14px",
              borderRadius: "4px",
            }}
          />
          <div
            className="skeleton"
            style={{
              width: "80%",
              height: "14px",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Highlights skeleton */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-4 w-full">
          {[45, 55, 50, 60].map((width, i) => (
            <div
              key={i}
              className="skeleton"
              style={{
                width: `${width}px`,
                height: "28px",
                borderRadius: "6px",
              }}
            />
          ))}
        </div>

        {/* Button skeleton */}
        <div
          className="skeleton"
          style={{
            width: "160px",
            height: "40px",
            borderRadius: "var(--radius-full)",
            marginTop: "8px",
          }}
        />
      </div>
    </article>
  );
}
