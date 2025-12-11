import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/new')({
  component: RouteComponent,
})

function RouteComponent() {
  function action(form: FormData) {}

  return (
    <div className="flex min-h-screen items-center justify-center">
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
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                required
                min={8}
                max={128}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full">Create User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
