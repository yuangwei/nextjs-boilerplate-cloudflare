import ContentLayout from '@/components/layouts/content-layout';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContentLayout>{children}</ContentLayout>;
}
