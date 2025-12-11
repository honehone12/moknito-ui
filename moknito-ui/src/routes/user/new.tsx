import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user/new"!</div>
}
