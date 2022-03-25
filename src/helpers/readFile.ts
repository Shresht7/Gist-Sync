//  Library
import * as fs from 'node:fs'
import { isURL } from './isURL'

/** Read file from the given path or url */
export async function readFile(src: string) {
    return isURL(src)
        ? readFromURL(src)
        : readFromFile(src)
}

/** Read from the given URL */
function readFromURL(url: string): Promise<string> {
    return fetch(url)
        .then(res => {
            if (res.ok) {
                return res.text()
            } else {
                throw new Error(`Failed to read from ${url}`)
            }
        })
}

/** Read from the given path */
function readFromFile(src: string): Promise<string> {
    return fs.promises.readFile(src, { encoding: 'utf-8' })
}