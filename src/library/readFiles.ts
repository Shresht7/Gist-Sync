//  Library
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as core from '@actions/core'
import { workspace } from '../config'

/** Maps fileNames to fileContents */
type Files = Record<string, { content: string }>

//  ===============
//  READ REPO FILES
//  ===============

/**
 * Reads the files specified in the gist config and returns an octokit compatible object
 * @returns files object required for octokit.rest.gists.update()
 */
export function readFiles(filePaths: string[]): Files {
    let files: Files = {}

    filePaths.forEach(filePath => {
        //  Determine paths
        const workspacePathName = path.join(workspace, filePath)
        const fileName = path.basename(workspacePathName)

        //  Read files contents
        let content: string
        try {
            content = fs.readFileSync(workspacePathName, 'utf-8')
        } catch (_) {
            core.error(`Failed to read: ${filePath}`)
            return  //  Return from forEach if no file was found
        }

        //  Add to files object
        files[fileName] = { content }
    })

    return files
}