import { REDIRECT_URL } from '@/lib/application'
import { restoreChallenge } from '@/lib/challenge'
import { CODE_SCHEMA } from '@/lib/code'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/redirect/')({
  component: RouteComponent,
  validateSearch: CODE_SCHEMA,
})

function RouteComponent() {
  const { code } = Route.useSearch()

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

    const res = await fetch('http://localhost:8080/auth/token', {
      method: 'POST',
      body: form,
    })

    if (res.status !== 200) {
      throw new Error(`status ${res.status}:${res.statusText}`)
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <p>It should be redirected soon...</p>
    </div>
  )
}
