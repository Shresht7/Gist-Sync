//  Library
import * as core from '@actions/core'
import * as github from '@actions/github'
import { octokit } from './library/octokit'
import { isDryRun, gists } from './library/config'

try {
    for (const gist of gists) {
        console.log(gist)
        console.log({
            gist_id: gist.gistID,
            files: gist.files
        })
        // octokit.rest.gists.get({
        //     gist_id: gist.gistID,
        // })
        //     .then((res) => console.log(res.data.description))
        //     .catch(err => console.error(err))
        // octokit.rest.gists.update({
        //     gist_id: gist.gistID,
        //     files: gist.files
        // })
    }
} catch (err) {
    let error = err as Error
    core.setFailed(error.message)
}