import LoginForm from '@/components/LoginForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/authentication')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <LoginForm method="POST" action="/api/user/authentication" />
    </main>
  )
}
