//  Library
import * as github from '@actions/github'

//  =======
//  OCTOKIT
//  =======

/** Personal-Access-Token with gist permissions. */
const GIST_TOKEN = process.env.GIST_TOKEN || ''

if (!GIST_TOKEN) {
    throw new Error('Invalid GIST_TOKEN. You need to provide a personal-access-token with gist permissions for the Gist-Mirror action')
}

//  ------------------------------------------------
export const octokit = github.getOctokit(GIST_TOKEN)
//  ------------------------------------------------
