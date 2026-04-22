// PublicPageView.tsx

import PageContainer from "./PageContainer";
import ProfileSection from "./ProfileSections";
import LinksSection from "./LinksSection";
import BrandingBadge from "./BrandingBadge";
import type { DbLink, DbPage, DbSocialLink, DbUser } from "@/lib/db/schema";
import SocialIconsSection from "./SocialIconSection";

interface Props {
  data: {
    user: DbUser;
    page: DbPage;
    links: DbLink[];
    socials: DbSocialLink[];
  };
  preview: boolean;
}

export default function PublicPageView({ data, preview }: Props) {
  return (
    <PageContainer page={data.page} preview={preview}>
      <ProfileSection page={data.page} />
      <SocialIconsSection socials={data.socials} page={data.page} />
      <LinksSection links={data.links} page={data.page} />
      {!preview && <BrandingBadge />}
    </PageContainer>
  );
}
