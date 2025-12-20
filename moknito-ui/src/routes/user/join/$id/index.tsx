import Loading from '@/components/Loading'
import LoginForm from '@/components/LoginForm'
import { CHALLENGE_SCHEMA } from '@/lib/challenge'

import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/user/join/$id/')({
  component: RouteComponent,
  validateSearch: CHALLENGE_SCHEMA,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { challenge, redirect } = Route.useSearch()

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<Loading />}>
        <LoginForm
          id={id}
          apiRoute={`/api/user/${id}/join`}
          challenge={challenge}
          redirect={redirect}
        />
      </Suspense>
    </main>
  )
}
