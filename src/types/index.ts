//  ================
//  TYPE DEFINITIONS
//  ================

/** Gist config object containing gistID and an array of fileNames to sync with the gist */
export type Gist = {
    id: string,
    files: string[]
}