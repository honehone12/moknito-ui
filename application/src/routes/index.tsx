import { APPLICATION_ID } from '@/lib/application-id'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
        <a href={`http://localhost:8080/user/authenticate/${APPLICATION_ID}`}>
          <button className="btn btn-accent">Login with Moknito</button>
        </a>
      </div>
    </main>
  )
}
