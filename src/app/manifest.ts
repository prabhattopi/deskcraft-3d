import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DeskCraft 3D — Interactive Cozy Workspace Configurator",
    short_name: "DeskCraft 3D",
    description:
      "Design, customize, light, and share your dream 3D developer & creative desk setup right in your browser.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0d12",
    theme_color: "#0b0d12",
    orientation: "any",
    categories: ["design", "productivity", "utilities"],
    icons: [
      {
        src: "/pwa-icon/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}