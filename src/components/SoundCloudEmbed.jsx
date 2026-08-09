// components/SoundCloudEmbed.jsx
import { memo } from "react";

function SoundCloudEmbed({
  url,
  height = 520,
  autoPlay = false,
  showArtwork = true,
  hideRelated = false,
  showComments = true,
  color = "000000",
  className = "",
}) {
  const playerSrc = new URL("https://w.soundcloud.com/player/");
  playerSrc.searchParams.set("url", url);
  playerSrc.searchParams.set("color", `#${color}`);
  playerSrc.searchParams.set("auto_play", autoPlay ? "true" : "false");
  playerSrc.searchParams.set("hide_related", hideRelated ? "true" : "false");
  playerSrc.searchParams.set("show_comments", showComments ? "true" : "false");
  playerSrc.searchParams.set("show_user", "true");
  playerSrc.searchParams.set("show_reposts", "false");
  playerSrc.searchParams.set("visual", "true");

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-[var(--site-line)] bg-[var(--site-surface)] shadow-sm ${className}`}
    >
      <iframe
        title="SoundCloud Player"
        width="100%"
        height={height}
        allow="autoplay"
        scrolling="no"
        frameBorder="no"
        loading="lazy"
        src={playerSrc.toString()}
        className="block bg-[var(--site-surface)]"
      />
    </div>
  );
}

export default memo(SoundCloudEmbed);
