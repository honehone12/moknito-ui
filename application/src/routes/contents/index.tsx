import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contents/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl">Welcome !!</h1>
      </div>
    </main>
  )
}
