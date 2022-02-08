//  Library
import * as core from '@actions/core'
import * as path from 'node:path'
import * as yaml from 'js-yaml'

//  ======
//  CONFIG
//  ======

const workspaceURL = process.env.GITHUB_WORKSPACE || ''


export const isDryRun = core.getBooleanInput('dryrun') ?? false

const fileName = core.getInput('gists')
const fileContents = path.join(workspaceURL, '.github', fileName)

export const gists = yaml.load(fileContents)