//  Library
import * as core from '@actions/core'
import * as github from '@actions/github'
import { octokit } from './library/octokit'
import { isDryRun, gists } from './library/config'


async function run() {
    try {
        for (const gist of gists) {
            const existingGist = await octokit.rest.gists.get({
                gist_id: gist.gistID,
            })
            if (existingGist) {
                octokit.rest.gists.update({
                    gist_id: gist.gistID,
                    files: gist.files
                })
            } else {
                console.warn("Gist does not exist")
            }
        }
    } catch (err) {
        let error = err as Error
        core.setFailed(error.message)
    }
}

run()