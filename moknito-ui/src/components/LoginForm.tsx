import botDetection from '@/lib/bot-detection'
import { Link } from '@tanstack/react-router'
import { STATUS } from '@/lib/http'
import { use } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useTransition } from 'react'
import Loading from './Loading'
import { CHALLENGE_METHOD } from '@/lib/challenge'

interface Props {
  id: string
  apiRoute: string
  challenge: string
  redirect: string
}

export default function LoginForm(p: Props) {
  use(botDetection)

  const [pending, startTransition] = useTransition()
  const navigate = useNavigate()

  function postForm(form: FormData) {
    startTransition(async () => {
      form.set('challenge', p.challenge)
      form.set('challenge_method', CHALLENGE_METHOD)
      form.set('redirect', p.redirect)

      const res = await fetch(p.apiRoute, {
        method: 'POST',
        body: form,
      })
      if (res.status !== STATUS.OK) {
        throw new Error(`response ${res.status}:${res.statusText}`)
      }

      navigate({ to: '/app/authorize/$id', params: { id: p.id } })
    })
  }

  function Form() {
    return (
      <div className="card w-96 bg-base-200 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl font-bold mb-4">Login</h1>
          <form action={postForm}>
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
                params={{ id: p.id }}
                search={{ challenge: p.challenge, redirect: p.redirect }}
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

  return <>{pending ? <Loading /> : <Form />}</>
}
