import Loading from '@/components/Loading'
import LoginForm from '@/components/LoginForm'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense, useTransition } from 'react'

export const Route = createFileRoute('/user/join/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const [pending, startTransition] = useTransition()

  async function postForm(form: FormData) {
    '/api/user/join'
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<Loading />}>
        <LoginForm action={postForm} id={id} pending={pending} />
      </Suspense>
    </main>
  )
}
