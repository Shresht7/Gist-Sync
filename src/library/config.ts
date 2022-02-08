//  Library
import * as core from '@actions/core'

//  ======
//  CONFIG
//  ======

export const isDryRun = core.getBooleanInput('dryrun') ?? false

export const gists = core.getInput('gists')