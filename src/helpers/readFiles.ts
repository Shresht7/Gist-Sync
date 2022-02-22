//  Library
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as core from '@actions/core'
import { workspaceURL } from '../library/config'

//  Type Definitions
import { Gist } from '../types'

/** Maps fileNames to fileContents */
type Files = Record<string, { content: string }>

//  ===============
//  READ REPO FILES
//  ===============

/**
 * Reads the files specified in the gist config and returns an octokit compatible object
 * @param gist Gist object containing gistID and an array of files
 * @returns files object required for octokit.rest.gists.update()
 */
export function readFiles(gist: Gist): Files {
    let files: Files = {}

    gist.files.forEach(pathName => {
        //  Determine paths
        const workspacePathName = path.join(workspaceURL, pathName)
        const fileName = path.basename(workspacePathName)

        //  Read files contents
        let content: string
        try {
            content = fs.readFileSync(workspacePathName, 'utf-8')
        } catch (_) {
            core.error(`Failed to read: ${pathName}`)
            return  //  Return from forEach if no file was found
        }

        //  Add to files object
        files[fileName] = { content }
    })

    return files
}