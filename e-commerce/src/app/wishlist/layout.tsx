import ServerProtectedComponents from "@/components/ServerProtectComponent";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServerProtectedComponents>{children}</ServerProtectedComponents>;
}
