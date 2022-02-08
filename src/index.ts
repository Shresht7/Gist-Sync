//  Library
import * as core from '@actions/core'
import gistSync from './gistSync'

//  ====
//  MAIN
//  ====

async function run() {
    try {
        await gistSync()
    } catch (err) {
        let error = err as Error
        core.setFailed(error.message)
    }
}

run()