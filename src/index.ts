//  Library
import * as core from '@actions/core'
import gistMirror from './gistMirror'

//  ====
//  MAIN
//  ====

async function run() {
    try {
        await gistMirror()
    } catch (err) {
        let error = err as Error
        core.setFailed(error.message)
    }
}

run()