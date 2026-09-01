"use client";

import { useDrawer } from "@/hooks/useDrawer";
import { Drawer, DrawerHeader, DrawerBody } from "@/components/ui/Drawer";

const SIZE_DATA = {
  headers: ["Size", "Chest (in)", "Waist (in)", "Hips (in)", "Shoulder (in)"],
  rows: [
    { label: "XS", chest: "34–36", waist: "28–30", hips: "36–38", shoulder: "16" },
    { label: "S", chest: "36–38", waist: "30–32", hips: "38–40", shoulder: "17" },
    { label: "M", chest: "38–40", waist: "32–34", hips: "40–42", shoulder: "18" },
    { label: "L", chest: "40–42", waist: "34–36", hips: "42–44", shoulder: "19" },
    { label: "XL", chest: "42–44", waist: "36–38", hips: "44–46", shoulder: "20" },
    { label: "XXL", chest: "44–46", waist: "38–40", hips: "46–48", shoulder: "21" },
  ],
};

const TIPS = [
  "Measure over bare skin or a thin layer of undergarments.",
  "Use a flexible tape measure wrapped snugly but not tight.",
  "Chest: measure at the fullest part, keeping the tape level.",
  "Waist: measure at the natural waistline, just above the navel.",
  "Hips: measure at the fullest part of the seat.",
  "When in doubt, size up for a more relaxed fit.",
];

export function SizeGuide() {
  const { drawers, close } = useDrawer();

  return (
    <Drawer isOpen={drawers.sizeGuide} onClose={() => close("sizeGuide")}>
      <DrawerHeader
        title="Size Guide"
        onClose={() => close("sizeGuide")}
      />
      <DrawerBody>
        <div className="flex flex-col gap-8">
          {/* Intro */}
          <div>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Our sizes are designed for a modern, tailored fit. Use the chart below
              to find your ideal size. If you fall between sizes, we recommend sizing
              up for a more relaxed silhouette.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-outline-variant/30">
                  {SIZE_DATA.headers.map((header) => (
                    <th
                      key={header}
                      className="font-label-caps text-[10px] sm:text-label-caps text-on-surface-variant py-2.5 px-1 sm:px-2 whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZE_DATA.rows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors"
                  >
                    <td className="font-body-md text-primary font-medium py-2.5 px-1 sm:px-2">
                      {row.label}
                    </td>
                    <td className="font-body-md text-on-surface-variant py-2.5 px-1 sm:px-2">
                      {row.chest}
                    </td>
                    <td className="font-body-md text-on-surface-variant py-2.5 px-1 sm:px-2">
                      {row.waist}
                    </td>
                    <td className="font-body-md text-on-surface-variant py-2.5 px-1 sm:px-2">
                      {row.hips}
                    </td>
                    <td className="font-body-md text-on-surface-variant py-2.5 px-1 sm:px-2">
                      {row.shoulder}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measurement tips */}
          <div className="bg-surface-container-low rounded-lg p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">
                straighten
              </span>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant">
                MEASUREMENT TIPS
              </h3>
            </div>
            <ul className="flex flex-col gap-2">
              {TIPS.map((tip, i) => (
                <li key={i} className="flex gap-3 font-body-md text-sm text-on-surface-variant">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Help link */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 text-center">
            <p className="font-body-md text-on-surface-variant mb-3">
              Still unsure about your size?
            </p>
            <button
              onClick={() => {
                close("sizeGuide");
              }}
              className="font-label-caps text-label-caps text-primary underline underline-offset-4 hover:text-accent transition-colors"
            >
              Contact our styling concierge
            </button>
          </div>
        </div>
      </DrawerBody>
    </Drawer>
  );
}
