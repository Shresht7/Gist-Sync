//  Library
import * as core from '@actions/core'
import * as github from '@actions/github'
import { octokit } from './library/octokit'

try {
    console.log(`Hello ${github.context.repo.owner}!`)
} catch (err) {
    let error = err as Error
    core.setFailed(error.message)
}