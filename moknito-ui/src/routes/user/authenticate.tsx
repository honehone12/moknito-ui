import Loading from '@/components/Loading'
import LoginForm from '@/components/LoginForm'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/user/authenticate')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<Loading />}>
        <LoginForm method="POST" action="/api/user/authenticate" />
      </Suspense>
    </main>
  )
}
