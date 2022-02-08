//  Library
import * as core from '@actions/core'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as yaml from 'js-yaml'

//  Type Definitions
import { Gist } from '../types'

//  ======
//  CONFIG
//  ======

//  Dry-Run Toggle

export const isDryRun = core.getBooleanInput('dryrun') ?? false

//  Read gists.yaml

const workspaceURL = process.env.GITHUB_WORKSPACE || ''

const fileName = core.getInput('gists')
let fileContents
try {
    fileContents = fs.readFileSync(path.join(workspaceURL, '.github', fileName), 'utf-8')
} catch (_) {
    fileContents = ''
}

export const gists: Gist[] = yaml.load(fileContents) as Gist[]