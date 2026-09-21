import { FaInstagram, FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const ICONS: Record<string, React.ReactNode> = {
  Instagram: <FaInstagram size={18} />,
  GitHub: <FaGithub size={18} />,
  LinkedIn: <FaLinkedin size={18} />,
  WhatsApp: <FaWhatsapp size={18} />,
  Email: <FaEnvelope size={18} />,
};

export function SocialIcon({ label }: { label: string }) {
  return <>{ICONS[label]}</>;
}