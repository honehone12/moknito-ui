import Loading from '@/components/Loading'
import { fingerprint } from '@/lib/fingerprint'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Suspense, use, useTransition } from 'react'

export const Route = createFileRoute('/user/new')({
  component: RouteComponent,
})

function RouteComponent() {
  function Form() {
    const [pending, startTransition] = useTransition()
    const navigate = useNavigate({ from: '/user/new' })

    const fp = use(fingerprint)

    function action(form: FormData) {
      startTransition(async () => {
        const res = await fetch('/api/user/new', {
          method: 'POST',
          body: form,
        })
        if (res.status === 303) {
          navigate({ to: '/authentication/login' })
        } else {
          throw new Error(`${res.status}: ${res.statusText}`)
        }
      })
    }

    return (
      <div className="card w-96 bg-base-200  shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">
            Create New User
          </h2>
          <form action={action}>
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
                className="btn btn-primary w-full"
                disabled={pending}
              >
                Create User
              </button>
            </div>
            <div className="text-center mt-4">
              {pending ? (
                <Loading />
              ) : (
                <Link to="/authentication/login" className="link link-primary">
                  <span className="text-lg">Already have a account?</span>
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<Loading />}>
        <Form />
      </Suspense>
    </div>
  )
}
