//  Library
import * as core from '@actions/core'
import * as github from '@actions/github'

//  =======
//  OCTOKIT
//  =======

/** Personal-Access-Token with gist permissions. */
const GIST_TOKEN = process.env.GIST_TOKEN || ''

if (!GIST_TOKEN) {
    core.setFailed('Invalid GIST_TOKEN');
}

//  ------------------------------------------------
export const octokit = github.getOctokit(GIST_TOKEN)
//  ------------------------------------------------
