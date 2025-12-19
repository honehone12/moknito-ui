import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/redirect/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/redirect/"!</div>
}
