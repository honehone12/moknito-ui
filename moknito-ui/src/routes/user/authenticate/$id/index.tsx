import Loading from '@/components/Loading'
import LoginForm from '@/components/LoginForm'
import { CHALLENGE_SCHEMA } from '@/lib/challenge'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/user/authenticate/$id/')({
  component: RouteComponent,
  validateSearch: CHALLENGE_SCHEMA,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { challenge } = Route.useSearch()

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<Loading />}>
        <LoginForm
          id={id}
          apiRoute={`/api/user/${id}/authenticate`}
          challenge={challenge}
        />
      </Suspense>
    </main>
  )
}
