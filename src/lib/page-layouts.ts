// ["stack", "grid", "carousel", "minimal", "immersive"]

import { PageLayout } from "./db/schema";
export function normalizeLayout(layout: string | PageLayout) {
  return layout.toLowerCase();
}
