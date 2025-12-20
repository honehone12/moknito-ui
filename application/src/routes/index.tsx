import { APPLICATION_ID, REDIRECT_URL } from '@/lib/application'
import { generateChallenge } from '@/lib/challenge'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  async function onClick() {
    const challenge = await generateChallenge()
    const q = new URLSearchParams()
    q.set('challenge', challenge.hash)
    q.set('redirect', REDIRECT_URL)

    const url = `http://localhost:8080/user/authenticate/${APPLICATION_ID}?${q.toString()}`
    location.href = url
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
        <button type="button" className="btn btn-accent" onClick={onClick}>
          Login with Moknito
        </button>
      </div>
    </main>
  )
}
