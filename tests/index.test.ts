//  Library
import { expect, test } from '@jest/globals'
import * as process from 'node:process'
import * as childProcess from 'node:child_process'
import * as path from 'node:path'

test('It should run', () => {
    const filePath = path.join(__dirname, "..", "lib", "index.js")
    const options: childProcess.ExecFileSyncOptions = { env: process.env }
    childProcess.execFileSync(process.execPath, [filePath], options)
})