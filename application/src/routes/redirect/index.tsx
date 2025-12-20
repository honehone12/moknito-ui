import Loading from '@/components/Loading'
import { APPLICATION_ID, REDIRECT_URL } from '@/lib/application'
import { restoreChallenge } from '@/lib/challenge'
import { CODE_SCHEMA } from '@/lib/code'
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
  type Token,
} from '@/lib/token'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Suspense, use } from 'react'
import Cookies from 'js-cookie'

export const Route = createFileRoute('/redirect/')({
  component: RouteComponent,
  validateSearch: CODE_SCHEMA,
})

let __tokenExchangePromise: Promise<void> | null = null

function RouteComponent() {
  const { code } = Route.useSearch()
  const navigate = useNavigate()

  async function init() {
    const stored = restoreChallenge()
    if (!stored) {
      throw new Error('could not find stored challenge')
    }

    const form = new FormData()
    form.set('grant', 'code')
    form.set('code', code)
    form.set('verifier', stored.raw)
    form.set('redirect', REDIRECT_URL)

    const res = await fetch(
      `http://localhost:8080/auth/${APPLICATION_ID}/token`,
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
      secure: false,
      sameSite: 'Lax',
    })
    if (tkn.refresh_token) {
      Cookies.set(REFRESH_TOKEN_COOKIE_KEY, tkn.refresh_token, {
        path: '/',
        expires: 1,
        secure: false,
        sameSite: 'Lax',
      })
    }

    navigate({ to: '/contents' })
  }

  interface Props {
    promise: Promise<void>
  }

  function Exchange({ promise }: Props) {
    use(promise)

    return (
      <div>
        <p>Exchange has done.</p>
      </div>
    )
  }

  if (!__tokenExchangePromise) {
    __tokenExchangePromise = init()
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<Loading />}>
        <Exchange promise={__tokenExchangePromise} />
      </Suspense>
    </main>
  )
}
