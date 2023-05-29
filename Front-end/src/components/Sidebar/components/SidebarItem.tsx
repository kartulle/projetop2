import { Link } from "react-router-dom"

interface Props {
  href: string
  title: string
  active?: boolean
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

export function SidebarItem({href, title, active, onClick, ...rest}: Props) {
  return (
    <Link {...rest}
      to={href} 
      className={`block border-t-2 last:border-b border-gray-400 text-gray-700 hover:bg-indigo-200 p-3 text-lg ${active ? 'bg-indigo-400 text-white hover:bg-indigo-500' : ''}`}
      onClick={onClick}
    >
      {title}
    </Link>
  )
}