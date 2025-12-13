import Loading from '@/components/Loading'
import { botDetection } from '@/lib/bot-detection'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Suspense, use } from 'react'

export const Route = createFileRoute('/user/register')({
  component: RouteComponent,
})

function RouteComponent() {
  function Form() {
    use(botDetection)

    return (
      <div className="card w-96 bg-base-200  shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">
            Create New User
          </h2>
          <form method="POST" action="/api/user/new">
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
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Create User
              </button>
            </div>
            <div className="text-center mt-4">
              <Link to="/authentication/login" className="link link-primary">
                <span className="text-lg">Already have a account?</span>
              </Link>
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
