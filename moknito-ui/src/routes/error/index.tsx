import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/error/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <p className="text-xl">Error</p>
    </div>
  )
}
