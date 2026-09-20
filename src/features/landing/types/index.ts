export type SocialLink = {
  label: string;
  href: string;
};

export type TimelineItem = {
  id: string;
  title: string;
  subtitle: string;
  dateLabel: string;
  bullets: string[];
};

export type SkillItem = {
  id: string;
  name: string;
  category: string;
};

export type CertificationItem = {
  id: string;
  title: string;
  imageUrl: string | null;
};

export type ProjectItem = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  link: string | null;
  linkLabel: string | null;
  secondaryLink: string | null;
  secondaryLabel: string | null;
  category: string;
  subcategory: string | null;
};