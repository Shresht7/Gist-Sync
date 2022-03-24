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

/** Gists Config. Can be a YAML string mapping gistIDs to files. Or a list of files containing such yaml strings */
const gistsInput = core.getMultilineInput(inputs.gists)

/** Temporary variable to track Gists */
let _gists: Gists = {}
try {
    //  Try to parse input as YAML. If it succeeds, the input is the config.
    _gists = yaml.load(gistsInput.join('\n')) as Gists
} catch (err) {
    //  Otherwise, the input is treated as a list of files containing the yaml config
    for (const files of gistsInput) {
        //  Read and parse all files into a single config
        readFile(files)
            .then(contents => {
                const data = yaml.load(contents) as Gists
                _gists = { ..._gists, ...data }
            })
    }
}

export const gists: Gists = _gists