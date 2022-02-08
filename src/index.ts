//  Library
import * as core from '@actions/core'
import * as github from '@actions/github'
import { octokit } from './library/octokit'
import * as config from './library/config'

try {
    console.log(`Hello ${github.context.repo.owner}!`)
    console.log(config)
} catch (err) {
    let error = err as Error
    core.setFailed(error.message)
}