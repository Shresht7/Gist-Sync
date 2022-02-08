//  Library
import * as core from '@actions/core'
import * as github from '@actions/github'

//  =======
//  OCTOKIT
//  =======

const GITHUB_ACCESS_TOKEN = process.env.GITHUB_TOKEN || ''

if (!GITHUB_ACCESS_TOKEN) {
    core.setFailed('Invalid GITHUB_ACCESS_TOKEN');
}

//  ---------------------------------------------------------
export const octokit = github.getOctokit(GITHUB_ACCESS_TOKEN)
//  ---------------------------------------------------------
