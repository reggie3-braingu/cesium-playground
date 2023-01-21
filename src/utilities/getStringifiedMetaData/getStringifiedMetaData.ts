/**
 *
 *
 * @param {unknown} metaData file metadata
 * @return {*} a stringified version of the metadata
 */
const getStringifiedMetaData = (metaData: unknown) => {
    try {
        return JSON.stringify(metaData) || ''
    } catch (error) {
        return ''
    }
}

export default getStringifiedMetaData
