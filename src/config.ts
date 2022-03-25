//  Library
import * as core from '@actions/core'
import * as yaml from 'js-yaml'

//  Helpers
import { inputs } from './metadata'

//  Type Definitions
import type { Gist } from './types'

//  ======
//  CONFIG
//  ======

//  DRY RUN
//  -------

/** Dry-run toggle. No actual changes will be made if this is true */
export const isDryRun = core.getBooleanInput(inputs.isDryRun) || false

//  GISTS
//  -----

/** Gists Config. YAML mapping GistIDs to their corresponding files */
const gistsInput = core.getMultilineInput(inputs.gists, { required: true }).join('\n')

export const gists: Gist[] = yaml.load(gistsInput) as Gist[]

if (!Array.isArray(gists)) {
    throw new Error('Invalid gists input. Failed to parse as an array')
}