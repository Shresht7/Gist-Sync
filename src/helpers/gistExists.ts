//  Library
import { octokit } from '../library/octokit'
import * as core from '@actions/core'

//  ===========
//  GIST EXISTS
//  ===========

/**
 * Returns a boolean indicating whether the gist with the given ID already exists
 * @param gist_id Gist ID
 */
export async function gistExists(gist_id: string): Promise<boolean> {
    const existingGist = await octokit.rest.gists
        .get({ gist_id })
        .catch(_ => {
            core.warning(`Gist (ID: ${gist_id}) does not exist. Please provide a valid gist ID.`)
        })

    return !!existingGist
}