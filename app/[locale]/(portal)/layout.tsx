import { PortalHeader } from "@/components/layouts/portal-header/portal-header";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PortalHeader />
      <main className="relative flex-1">{children}</main>
    </div>
  );
}
