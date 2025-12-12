import Loading from '@/components/Loading'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useTransition } from 'react'

export const Route = createFileRoute('/authentication/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [pending, startTransition] = useTransition()

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="card w-96 bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">Login</h2>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
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
                type="password"
                placeholder="password"
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
                Login
              </button>
            </div>
            <div className="text-center mt-4">
              {pending ? (
                <Loading />
              ) : (
                <Link to="/user/new" className="link link-primary">
                  <span className="text-lg">Create a new account?</span>
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
