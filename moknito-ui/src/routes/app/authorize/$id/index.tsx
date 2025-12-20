import Loading from '@/components/Loading'
import botDetection from '@/lib/bot-detection'
import { STATUS } from '@/lib/http'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense, use, useTransition } from 'react'

export const Route = createFileRoute('/app/authorize/$id/')({
  component: RouteComponent,
})

interface AppInfo {
  name: string
  domain: string
}

let __appInfoPromise: Promise<AppInfo> | null = null

function RouteComponent() {
  const { id } = Route.useParams()

  async function init(): Promise<AppInfo> {
    await botDetection

    const res = await fetch(`/info/${id}`)
    if (res.status !== STATUS.OK) {
      throw new Error(`status ${res.status}:${res.statusText}`)
    }

    const info: AppInfo = await res.json()
    return info
  }

  interface Props {
    promise: Promise<AppInfo>
  }

  function Authorize({ promise }: Props) {
    const [pending, startTransition] = useTransition()
    const appInfo = use(promise)

    function onClick() {
      startTransition(async () => {
        {
          const res = await fetch(`/api/app/${id}/allow`, { method: 'POST' })

          if (res.status !== STATUS.OK) {
            throw new Error(`response ${res.status}:${res.statusText}`)
          }
        }
        {
          const res = await fetch(`/api/app/${id}/authorize`, {
            method: 'POST',
          })

          if (!res.redirected) {
            throw new Error('response was not redirected')
          }

          location.href = res.url
        }
      })
    }

    function Form() {
      return (
        <div>
          <div className="text-center">
            <h1 className="text-2xl text-primary">Authorize App</h1>
            <div className="mt-5">
              <p className="text-lg">Name: {appInfo.name}</p>
              <p className="text-lg">Domain: {appInfo.domain}</p>
            </div>
            <div className="mt-10">
              <p className="text-xl">
                Are you sure you allow "{appInfo.name}" ??
              </p>
            </div>
          </div>
          <div className="text-center mt-10">
            <button
              className="btn btn-primary w-30"
              type="button"
              onClick={onClick}
              disabled={pending}
            >
              Ok
            </button>
          </div>
        </div>
      )
    }

    return <>{pending ? <Loading /> : <Form />}</>
  }

  if (!__appInfoPromise) {
    __appInfoPromise = init()
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<Loading />}>
        <Authorize promise={__appInfoPromise} />
      </Suspense>
    </main>
  )
}
