//  Library
import { isURL } from '../src/helpers/isURL'

//  Testing Framework
import { test } from '.'
import * as assert from 'node:assert'


test('isURL should return true for a URL', () => {
    const url = 'https://www.github.com/Shresht7/Gist-Mirror'
    assert.equal(isURL(url), true)
})

test('isURL should return false otherwise', () => {
    const str = 'this is not a url'
    assert.equal(isURL(str), false)
})
