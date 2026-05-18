import SiteLayout from "../components/SiteLayout";

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
