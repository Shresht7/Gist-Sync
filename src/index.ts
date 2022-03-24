//  Library
import * as core from '@actions/core'
import action from './action'

//  ====
//  MAIN
//  ====

/** GitHub Action Main Entrypoint */
async function run() {
    try {
        await action()
    } catch (err) {
        const error = err as Error
        core.setFailed(error)
        console.error(error)
    }
}

run()