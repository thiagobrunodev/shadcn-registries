import { getDomain, removePath } from '@/lib/utils'

async function getRegistries() {
    const registriesData: Record<string, string> = await fetch(
        'https://ui.shadcn.com/r/registries.json',
        {
            cache: 'force-cache',
            next: { revalidate: false },
        },
    )
        .then((res) => res.json())
        .catch(() => null)

    if (!registriesData) {
        return null
    }

    for (const [name, url] of Object.entries(registriesData)) {
        registriesData[name] = removePath(url)
    }

    const registries: {
        url: string
        title: string
        description: string
    }[] = []

    await Promise.all(
        Object.entries(registriesData).map(async ([name, url]) => {
            try {
                console.log(`Fetching registry: ${url}`)
                const res = await fetch(url, { method: 'HEAD', cache: 'force-cache' })
                const registry = {
                    title: name,
                    url,
                    description: `Visit the ${name} registry`,
                }

                if (res.status === 404) {
                    const newUrl = getDomain(url)
                    if (newUrl) {
                        console.log(`Trying new registry URL: ${newUrl}`)
                        const newRes = await fetch(newUrl, { method: 'HEAD', cache: 'force-cache' })
                        if (newRes.ok) {
                            registry.url = newUrl
                        } else {
                            console.warn(`Registry not found: ${url} (tried ${newUrl})`)
                            return
                        }
                    }
                }

                registries.push(registry)
            } catch (error) {
                console.warn(`Failed to fetch registry: ${url}`, error)
            }
        }),
    )

    if (registries.length === 0) {
        return null
    }

    return registries.sort((a, b) => a.title.localeCompare(b.title))
}

export const registries = await getRegistries()

export const registriesHash = await (async () => {
    const registriesData: Record<string, string> = await fetch(
        'https://ui.shadcn.com/r/registries.json',
        {
            cache: 'force-cache',
            next: { revalidate: false },
        },
    )
        .then((res) => res.json())
        .catch(() => null)

    if (!registriesData) {
        return null
    }

    const msgUint8 = new TextEncoder().encode(JSON.stringify(registriesData))
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
})()

export const registriesHashDate = new Date().toISOString()
