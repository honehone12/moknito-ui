import Loading from '@/components/Loading'
import botDetection from '@/lib/bot-detection'
import { STATUS } from '@/lib/http'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Suspense, use, useTransition } from 'react'

export const Route = createFileRoute('/user/register/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  function RegistrationForm() {
    use(botDetection)

    const [pending, startTransition] = useTransition()
    const navigate = useNavigate()

    async function postForm(form: FormData) {
      startTransition(async () => {
        try {
          const res = await fetch('/api/user/register', {
            method: 'POST',
            body: form,
          })
          if (res.status !== STATUS.OK) {
            throw new Error(`response ${res.status}:${res.statusText}`)
          }

          navigate({ to: '/user/authenticate/$id', params: { id } })
        } catch {
          navigate({ to: '/error' })
        }
      })
    }

    function Form() {
      return (
        <div className="card w-96 bg-base-200  shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mb-4">
              Create New User
            </h2>
            <form action={postForm}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  required
                  min={1}
                  max={256}
                  disabled={pending}
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  required
                  max={128}
                  disabled={pending}
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                  required
                  min={8}
                  max={128}
                  disabled={pending}
                />
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={pending}
                  className="btn btn-primary w-full"
                >
                  Create User
                </button>
              </div>
              <div className="text-center mt-4">
                <Link
                  to="/user/authenticate/$id"
                  params={{ id }}
                  className="link link-primary"
                  disabled={pending}
                >
                  <span className="text-lg">Already have a account?</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      )
    }

    return <>{pending ? <Loading /> : <Form />}</>
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<Loading />}>
        <RegistrationForm />
      </Suspense>
    </main>
  )
}
