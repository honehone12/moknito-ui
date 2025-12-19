import { APPLICATION_ID } from '@/lib/application'
import { generateChallenge } from '@/lib/challenge'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

const BASE_URL = 'http://localhost:8080/user/authenticate'

function App() {
  async function onClick() {
    const challenge = await generateChallenge()

    location.href = `${BASE_URL}/${APPLICATION_ID}?challenge=${challenge.hash}`
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
