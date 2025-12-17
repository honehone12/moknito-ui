import Loading from '@/components/Loading'
import LoginForm from '@/components/LoginForm'

import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/user/join/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<Loading />}>
        <LoginForm id={id} apiRoute="/api/user/join" />
      </Suspense>
    </main>
  )
}
