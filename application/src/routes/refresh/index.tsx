import Loading from '@/components/Loading'
import { APPLICATION_ID } from '@/lib/application'
import {
  REFRESH_TOKEN_COOKIE_KEY,
  ACCESS_TOKEN_COOKIE_KEY,
  SECURE_COOKIE,
  type Token,
} from '@/lib/token'
import { createFileRoute } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { Suspense, use } from 'react'

export const Route = createFileRoute('/refresh/')({
  component: RouteComponent,
})

let __refreshPromise: Promise<void> | null = null

function RouteComponent() {
  async function refresh(): Promise<void> {
    const cookie = Cookies.get(REFRESH_TOKEN_COOKIE_KEY)
    if (!cookie) {
      throw new Error('could not find refresh auth cookie')
    }

    const form = new FormData()
    form.set('grant', 'refresh')
    form.set('token', cookie)

    const res = await fetch(
      `http://localhost:8080/auth/${APPLICATION_ID}/refresh`,
      {
        method: 'POST',
        body: form,
      },
    )
    if (res.status !== 200) {
      throw new Error(`status ${res.status}:${res.statusText}`)
    }

    const tkn: Token = await res.json()

    Cookies.set(ACCESS_TOKEN_COOKIE_KEY, tkn.access_token, {
      path: '/',
      expires: 1,
      secure: SECURE_COOKIE,
      sameSite: 'Lax',
    })
    Cookies.set(REFRESH_TOKEN_COOKIE_KEY, tkn.refresh_token, {
      path: '/',
      expires: 3,
      secure: SECURE_COOKIE,
      sameSite: 'Lax',
    })
  }

  interface Props {
    promise: Promise<void>
  }

  function Refresher({ promise }: Props) {
    use(promise)

    return (
      <div className="text-center">
        <h1 className="text-2xl">OK</h1>
      </div>
    )
  }

  if (!__refreshPromise) {
    __refreshPromise = refresh()
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<Loading />}>
        <Refresher promise={__refreshPromise} />
      </Suspense>
    </main>
  )
}
