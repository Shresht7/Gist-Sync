//  Library
import * as core from '@actions/core'
import { octokit, readFiles } from './library'
import { isDryRun, gists } from './config'
import { gistExists } from './helpers'

//  ===========
//  GIST MIRROR
//  ===========

/** Gist-Mirror Action */
async function action() {
    for (const [id, filePaths] of Object.entries(gists)) {

        //  Check if the gist already exists...
        const exists = await gistExists(id)
        if (!exists) { continue }    //  ...Skip this gist if it doesn't

        //  Populate files object
        const files = readFiles(filePaths)

        core.info(`Updating Gist (ID: ${id})`)

        //  Exit out of the loop early if dry-run is enabled
        if (isDryRun) { core.warning('Note: This is a dry-run'); continue }

        //  Update gist
        await octokit.rest.gists.update({
            gist_id: id,
            files
        })

    }
}

//  -----------------
export default action
//  -----------------
