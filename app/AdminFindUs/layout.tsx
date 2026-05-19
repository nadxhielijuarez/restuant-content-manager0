import SiteLayout from "../components/SiteLayout";

export default function FindUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
