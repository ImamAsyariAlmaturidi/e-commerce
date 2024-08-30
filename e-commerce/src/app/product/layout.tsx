import { NavbarComponent } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavbarComponent visible={true} />
      {children}
      <Toaster />
    </section>
  );
}
