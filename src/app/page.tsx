import { ChevronRightIcon, ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { registries } from '@/lib/registries'

export default async function Home() {
    if (!registries) {
        return (
            <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                <h1 className="text-2xl font-bold">No registries found</h1>
                <p className="text-center text-muted-foreground max-w-sm">
                    It seems there are no registries available at the moment. Please check back
                    later.
                </p>
            </div>
        )
    }

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <h1 className="text-2xl font-bold">Shadcn Registries</h1>
            <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
                {registries.map((registry) => (
                    <Link
                        key={registry.title}
                        href={registry.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:bg-accent/50 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-2 rounded-lg border border-border bg-card p-4 transition-colors"
                        aria-label={`Visit the ${registry.title} registry`}
                    >
                        <Item>
                            <ItemContent>
                                <ItemTitle>{registry.title}</ItemTitle>
                                <ItemDescription>
                                    Visit the <code className="font-mono">{registry.title}</code>{' '}
                                    registry
                                </ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <ExternalLinkIcon className="h-4 w-4" />
                                <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
                            </ItemActions>
                        </Item>
                    </Link>
                ))}
            </div>
        </div>
    )
}
