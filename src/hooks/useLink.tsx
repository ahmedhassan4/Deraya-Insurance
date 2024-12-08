import { useLocale } from "next-intl";
import Link from "next/link";

interface LocaleLinkProps {
  href: string;
  children: React.ReactNode;
}

const LocaleLink = ({ href, children }: LocaleLinkProps) => {
  const locale = useLocale();

  // Construct the new path with locale
  const localePath = `/${locale}${href.startsWith("/") ? href : `/${href}`}`;

  return <Link href={localePath}>{children}</Link>;
};

export default LocaleLink;
