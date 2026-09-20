import type { IconType } from "react-icons";
import { FaCode, FaLanguage, FaPalette, FaServer, FaTools, FaUsers } from "react-icons/fa";

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const INTERESTS = ["Design", "Front-End", "UI/UX", "Illustration"];

export const BADGE_COLORS = ["bg-pink/40", "bg-sky/60"];

export const PROJECT_CATEGORIES = [
  { value: "DEVELOPMENT", label: "Development" },
  { value: "UIUX", label: "UI/UX" },
  { value: "DESIGN", label: "Design Graphic" },
  { value: "OTHERS", label: "Others" },
];

export const SKILL_CATEGORY_LABELS: Record<string, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  DESIGN: "Design",
  TOOLS: "Tools",
  SOFT_SKILLS: "Soft Skills",
  LANGUAGES: "Languages",
};

export const SKILL_CATEGORY_ICONS: Record<string, IconType> = {
  FRONTEND: FaCode,
  BACKEND: FaServer,
  DESIGN: FaPalette,
  TOOLS: FaTools,
  SOFT_SKILLS: FaUsers,
  LANGUAGES: FaLanguage,
};