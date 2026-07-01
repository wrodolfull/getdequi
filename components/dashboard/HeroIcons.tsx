import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>;
}

export function HomeIcon(props: IconProps) { return <Icon {...props}><path d="m2.25 12 8.95-8.55a1.2 1.2 0 0 1 1.6 0L21.75 12" /><path d="M4.5 10.5v9.75h5.25V15h4.5v5.25h5.25V10.5" /></Icon>; }
export function SquaresIcon(props: IconProps) { return <Icon {...props}><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" /></Icon>; }
export function PresentationIcon(props: IconProps) { return <Icon {...props}><path d="M3 4.5h18M5 4.5v9.75A1.75 1.75 0 0 0 6.75 16h10.5A1.75 1.75 0 0 0 19 14.25V4.5" /><path d="m9 20 3-4 3 4" /></Icon>; }
export function TemplateIcon(props: IconProps) { return <Icon {...props}><path d="M4.5 6.75A2.25 2.25 0 0 1 6.75 4.5h10.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25z" /><path d="M8 8h8M8 12h5M8 16h8" /></Icon>; }
export function ShareIcon(props: IconProps) { return <Icon {...props}><path d="M7.5 12 16.5 6M7.5 12l9 6" /><circle cx="5.5" cy="12" r="2" /><circle cx="18.5" cy="5" r="2" /><circle cx="18.5" cy="19" r="2" /></Icon>; }
export function ChartIcon(props: IconProps) { return <Icon {...props}><path d="M4 19.5V4.5" /><path d="M8 17v-6M12 17V7M16 17v-3M20 19.5H4" /></Icon>; }
export function PuzzleIcon(props: IconProps) { return <Icon {...props}><path d="M9 4.5h3.75a2.25 2.25 0 0 1 2.25 2.25V9h2.25a2.25 2.25 0 1 1 0 4.5H15v3.75a2.25 2.25 0 0 1-2.25 2.25H9v-2.25a2.25 2.25 0 1 0-4.5 0v2.25H3.75A2.25 2.25 0 0 1 1.5 17.25V13.5h2.25a2.25 2.25 0 1 0 0-4.5H1.5V6.75A2.25 2.25 0 0 1 3.75 4.5H6" /></Icon>; }
export function CogIcon(props: IconProps) { return <Icon {...props}><path d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" /><path d="M19.4 15a8 8 0 0 0 .05-5.9l-2.15.3a7 7 0 0 0-1.4-1.4l.3-2.15a8 8 0 0 0-5.9 0l.3 2.15a7 7 0 0 0-1.4 1.4l-2.15-.3a8 8 0 0 0 0 5.9l2.15-.3a7 7 0 0 0 1.4 1.4l-.3 2.15a8 8 0 0 0 5.9 0l-.3-2.15a7 7 0 0 0 1.4-1.4z" /></Icon>; }
export function SearchIcon(props: IconProps) { return <Icon {...props}><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></Icon>; }
export function FunnelIcon(props: IconProps) { return <Icon {...props}><path d="M4 5h16l-6 7v5l-4 2v-7z" /></Icon>; }
export function PlusIcon(props: IconProps) { return <Icon {...props}><path d="M12 5v14M5 12h14" /></Icon>; }
export function ChevronDownIcon(props: IconProps) { return <Icon {...props}><path d="m6 9 6 6 6-6" /></Icon>; }
export function FolderIcon(props: IconProps) { return <Icon {...props}><path d="M3.75 6.75h6l1.5 2h9v8.5a2 2 0 0 1-2 2H5.75a2 2 0 0 1-2-2z" /></Icon>; }
export function PencilIcon(props: IconProps) { return <Icon {...props}><path d="m16.9 4.6 2.5 2.5M4.5 19.5l4.8-1 9.1-9.1a1.8 1.8 0 0 0-2.5-2.5l-9.1 9.1z" /></Icon>; }
export function TrashIcon(props: IconProps) { return <Icon {...props}><path d="M5 7h14M9 7V5h6v2M8 10v9M12 10v9M16 10v9" /></Icon>; }
export function StarIcon(props: IconProps) { return <Icon {...props} fill="currentColor" strokeWidth={1.2}><path d="m12 3.75 2.35 4.76 5.25.76-3.8 3.7.9 5.23L12 15.73 7.3 18.2l.9-5.23-3.8-3.7 5.25-.76z" /></Icon>; }
export function EyeIcon(props: IconProps) { return <Icon {...props}><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></Icon>; }
export function ChatBubbleIcon(props: IconProps) { return <Icon {...props}><path d="M5 5.5h14v10H8l-3 3z" /></Icon>; }
export function XMarkIcon(props: IconProps) { return <Icon {...props}><path d="M6 6l12 12M18 6 6 18" /></Icon>; }
export function BarsIcon(props: IconProps) { return <Icon {...props}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>; }
export function GridIcon(props: IconProps) { return <Icon {...props}><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /></Icon>; }
export function UserCircleIcon(props: IconProps) { return <Icon {...props}><circle cx="12" cy="8" r="3" /><path d="M5 20a7 7 0 0 1 14 0" /></Icon>; }
export function LinkIcon(props: IconProps) { return <Icon {...props}><path d="M9.5 14.5 14.5 9.5" /><path d="M10.5 6.5 12 5a4 4 0 0 1 5.7 5.7l-1.5 1.5" /><path d="M13.5 17.5 12 19a4 4 0 0 1-5.7-5.7l1.5-1.5" /></Icon>; }
export function ArrowDownTrayIcon(props: IconProps) { return <Icon {...props}><path d="M12 3v11" /><path d="m8 10 4 4 4-4" /><path d="M5 17v2h14v-2" /></Icon>; }
export function QrCodeIcon(props: IconProps) { return <Icon {...props}><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" /><path d="M14 14h2v2h-2zM18 14h2v6h-6v-2h4zM14 18h2v2h-2z" /></Icon>; }
