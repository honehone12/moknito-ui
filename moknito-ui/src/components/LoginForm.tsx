import botDetection from '@/lib/bot-detection'
import { Link } from '@tanstack/react-router'
import { use } from 'react'

interface Props {
  id: string
  action: (form: FormData) => void | Promise<void>
  pending: boolean
}

export default function LoginForm({ id, action, pending }: Props) {
  use(botDetection)

  return (
    <div className="card w-96 bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold mb-4">Login</h2>
        <form action={action}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
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
              name="password"
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
              disabled={pending}
              className="btn btn-primary w-full"
            >
              Login
            </button>
          </div>
          <div className="text-center mt-4">
            <Link
              to="/user/register/$id"
              params={{ id }}
              className="link link-primary"
              disabled={pending}
            >
              <span className="text-lg">Create a new account?</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
