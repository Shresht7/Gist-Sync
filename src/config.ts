//  Library
import * as core from '@actions/core'
import * as yaml from 'js-yaml'

//  Helpers
import { inputs } from './metadata'
import { readFile } from './helpers'

//  Type Definitions
import type { Gists } from './types'


if (!process.env.GITHUB_WORKSPACE) {
    throw new Error('Invalid GITHUB_WORKSPACE. You need to checkout this repository using the actions/checkout@v3 github-action for the GITHUB_WORKSPACE environment variable')
}

/** GitHub Workspace */
export const workspace = process.env.GITHUB_WORKSPACE

//  ======
//  CONFIG
//  ======

//  DRY RUN
//  -------

/** Dry-run toggle. No actual changes will be made while this is true. */
export const isDryRun = core.getBooleanInput(inputs.isDryRun)

//  GISTS
//  -----

/** Gists Config. YAML mapping GistIDs to their corresponding files */
const gistsInput = core.getMultilineInput(inputs.gists).join('\n')

export const gists: Gists = yaml.load(gistsInput) as Gists