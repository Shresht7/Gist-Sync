export type File = {
    contents: string
}

export type Gist = {
    gistID: string,
    files: Record<string, File>
}