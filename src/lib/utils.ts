import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function removePath(url: string) {
    try {
        const { origin } = new URL(url)
        return origin
    } catch {
        return url
    }
}

export function getDomain(url: string) {
    try {
        const { hostname } = new URL(url)
        const parts = hostname.split('.')
        if (parts.length <= 2) {
            return hostname
        }
        const tld = parts.pop()
        const sld = parts.pop()
        const domain = parts.pop()
        if (sld && sld.length <= 3) {
            return `${domain}.${sld}.${tld}`
        }
        return `https://${sld}.${tld}`
    } catch {
        return null
    }
}
