import { getStringifiedMetaData } from '.'

describe('getStringifiedMetaData Test', () => {
    it('should not break if given bad data', () => {
        expect(getStringifiedMetaData(undefined)).toEqual('')
    })
    it('should properly stringify an array', () => {
        // eslint-disable-next-line quotes
        expect(getStringifiedMetaData(['cat', 'dog'])).toMatchInlineSnapshot(`"[\\"cat\\",\\"dog\\"]"`)
    })
})
