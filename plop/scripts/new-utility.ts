/* eslint-disable import/no-extraneous-dependencies */
import { NodePlopAPI } from 'plop'
import { camelCase } from 'change-case'
import fs from 'fs'

type Answers = {
    utilityName: string
}

const UTILITY_PATH = './src/utilities/'

export const getNewUtilityGenerator = (plop: NodePlopAPI) => {
    plop.setActionType('makeUtilityDirectory', async (answers, config, _plop) => {
        fs.mkdirSync(`${UTILITY_PATH}/${camelCase((answers as Answers).utilityName)}`, { recursive: true })

        return ''
    })

    plop.setHelper('formattedUtilityName', (utilityName) => {
        if (typeof utilityName === 'string') return camelCase(utilityName.replace(/[^a-zA-Z\d\s:]/g, ''))

        return camelCase(utilityName.data.root.utilityName.replace(/[^a-zA-Z\d\s:]/g, ''))
    })

    plop.setHelper('utilityPath', (utilityName) => {
        const formattedUtilityName = camelCase(utilityName)
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s:]/g, '')

        return `${UTILITY_PATH}/${formattedUtilityName}`
    })

    plop.setGenerator('utility', {
        description: 'initialize utility',
        prompts: [
            {
                type: 'input',
                name: 'utilityName',
                message: 'Utility name please (this will be converted to camelCasing)'
            }
        ],
        actions: [
            // @ts-ignore Type 'string' is not assignable to type '"append"'.
            { type: 'makeUtilityDirectory' },
            {
                type: 'addMany',
                destination: '{{utilityPath utilityName}}',
                base: 'plop/templates/newUtility',
                templateFiles: 'plop/templates/newUtility/*.hbs'
            }
        ]
    })
}

export default getNewUtilityGenerator
