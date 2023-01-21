/* eslint-disable quotes */
import { getQueryString } from '.'

describe('getQueryStringParams tests', () => {
    it('should return a properly formatted query string', () => {
        expect(getQueryString()).toMatchInlineSnapshot(`""`)
        expect(getQueryString({ key1: 'one', key2: 'two' })).toMatchInlineSnapshot(`"key1=one&key2=two"`)
    })
})
