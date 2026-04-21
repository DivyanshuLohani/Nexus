// PublicPageView.tsx

import PageContainer from "./PageContainer";
import ProfileSection from "./ProfileSections";
import LinksSection from "./LinksSection";
import BrandingBadge from "./BrandingBadge";
import type { DbLink, DbPage, DbUser } from "@/lib/db/schema";

interface Props {
  data: {
    user: DbUser;
    page: DbPage;
    links: DbLink[];
  };
  preview: boolean;
}

export default function PublicPageView({ data, preview }: Props) {
  return (
    <PageContainer page={data.page} preview={preview}>
      <ProfileSection page={data.page} />
      <LinksSection links={data.links} page={data.page} />
      {!preview && <BrandingBadge />}
    </PageContainer>
  );
}
