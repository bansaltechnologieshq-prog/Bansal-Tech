import type { Metadata } from "next";
import { MarkGlyph } from "@/components/Logo";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Bansal Tech Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-mist/60">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-5 sm:px-8">
          <p className="inline-flex items-center gap-2.5 text-[17px] font-bold tracking-tight text-pine">
            <MarkGlyph className="h-6 w-auto text-brass" />
            Bansal Tech
            <span className="rounded-full bg-mist px-2.5 py-0.5 text-sm font-semibold text-stone">
              Admin
            </span>
          </p>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
