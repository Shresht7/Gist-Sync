export type File = {
    content: string
}

export type Gist = {
    gistID: string,
    files: Record<string, File>
}