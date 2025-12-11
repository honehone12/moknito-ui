import { Link } from '@tanstack/react-router'

interface Props {
  to: string
  onClick: () => void
  label: string
}

export default function HeaderLink(props: Props) {
  return (
    <Link
      to={props.to}
      onClick={props.onClick}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
      activeProps={{
        className:
          'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
      }}
    >
      <span className="font-medium">{props.label}</span>
    </Link>
  )
}
