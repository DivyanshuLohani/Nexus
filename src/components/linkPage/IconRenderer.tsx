export default function IconRenderer({
  platform,
  style,
}: {
  platform: string;
  style: "colored" | "filled" | "mono";
}) {
  const src = `/icons/social/${style}/${platform}.svg`;

  // 🎨 STYLE SWITCH
  if (style == "mono") {
    return (
      <div
        className="w-5 h-5"
        style={{
          backgroundColor: "currentColor",
          WebkitMask: `url(${src}) no-repeat center / contain`,
          mask: `url(${src}) no-repeat center / contain`,
        }}
      />
    );
  }

  return <img src={src} className="w-5 h-5 object-contain" />;
}
