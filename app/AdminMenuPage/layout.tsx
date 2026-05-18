import SiteLayout from "../components/SiteLayout";

export default function AdminMenuPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
