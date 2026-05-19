import SiteLayout from "../components/SiteLayout";

export default function LoginPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
