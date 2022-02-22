//  Library
import { octokit, isDryRun, gists } from './library'
import * as core from '@actions/core'

//  Helpers
import { gistExists, readFiles } from './helpers'

//  ===========
//  GIST MIRROR
//  ===========

/** Gist-Mirror Action */
async function gistSync() {
    for (const gist of gists) {

        //  Check if the gist already exists
        if (await !gistExists(gist.id)) { continue }    //  Skip this gist if it doesn't

        //  Populate files object
        const files = readFiles(gist)

        core.info(`Updating Gist (ID: ${gist.id})`)

        //  Exit out of the loop early if dry-run is enabled
        if (isDryRun) { core.warning('NOTE: This is a dry-run'); continue }

        //  Update gist
        await octokit.rest.gists.update({
            gist_id: gist.id,
            files
        })

    }
}

//  -------------------
export default gistSync
//  -------------------
