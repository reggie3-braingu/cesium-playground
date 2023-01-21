/**
 *getReadableBytes
 *
 * @param {number} bytes the number of bytes
 * @return {*}  {string} human friendly string
 */
const getReadableBytes = (bytes: number): string => {
    if (bytes >= 1048576) {
        // Using "Number" to get rid of trailing decimal zeros
        return `${Number((bytes / 1048576).toFixed(2))} MB`
    }
    if (bytes >= 1024) {
        return `${Number((bytes / 1024).toFixed(2))} KB`
    }
    if (bytes > 1) {
        return `${bytes} bytes`
    }
    if (bytes === 1) {
        return `${bytes} byte`
    }
    return '0 bytes'
}

export default getReadableBytes
