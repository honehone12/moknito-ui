import { Link } from '@tanstack/react-router'

interface Props {
  method: string
  action: string
}

export default function LoginForm({ method, action }: Props) {
  return (
    <div className="card w-96 bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold mb-4">Login</h2>
        <form method={method} action={action}>
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
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>
          <div className="text-center mt-4">
            <Link to="/user/register" className="link link-primary">
              <span className="text-lg">Create a new account?</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
