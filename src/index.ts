//  Library
import * as core from '@actions/core'
import * as github from '@actions/github'
import { octokit } from './library/octokit'
import * as path from 'node:path'
import { isDryRun, gists, workspaceURL } from './library/config'

//  ====
//  MAIN
//  ====

async function run() {
    try {
        for (const gist of gists) {

            console.log(gist.id, gist.files)

            //  Check if the gist already exists
            const existingGist = await octokit.rest.gists.get({ gist_id: gist.id }).catch(err => {
                console.warn(err)
                // console.warn(`Gist (ID: ${gist.id}) does not exist. Please provide a valid gist ID.`)
            })
            if (!existingGist) { continue }    //  Skip iteration if it doesn't

            //  Populate files object
            let files: Record<string, { contents: string }> = {}
            gist.files.forEach(pathName => {
                const workspacePathName = path.join(workspaceURL, pathName)
                const fileName = path.parse(workspacePathName).name
                const contents = "Hello " + gist.id
                files[fileName] = { contents }
            })

            console.log(`Updating Gist (ID: ${gist.id})`)

            //  Skip if dry-run
            if (isDryRun) { continue }

            //  Update gist
            await octokit.rest.gists.update({
                gist_id: gist.id,
                files
            })

        }
    } catch (err) {
        let error = err as Error
        core.setFailed(error.message)
    }
}

run()