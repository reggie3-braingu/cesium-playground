/* eslint-disable import/no-extraneous-dependencies */
import { NodePlopAPI } from 'plop'
import { paramCase } from 'change-case'

const replace = require('replace-in-file')

type Config = {
    path: string
}

type Answers = {
    packageName: string
}

export const getInitGenerator = (plop: NodePlopAPI) => {
    plop.setActionType('replacePackageName', async (answers, config) => {
        const options = {
            files: (config as unknown as Config).path,
            from: 'bgtemplate',
            to: paramCase((answers as Answers).packageName.toLowerCase().replace(/[^a-zA-Z\d\s:]/g, ''))
        }

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const _results = await replace(options)
        } catch (error) {
            console.error('Error occurred:', error)
        }

        return ''
    })

    plop.setGenerator('init', {
        description: 'initialize component',
        prompts: [
            {
                type: 'input',
                name: 'packageName',
                message: 'Package name please (this will be converted to param-casing)'
            }
        ],
        actions: [
            // @ts-ignore Type 'string' is not assignable to type '"append"'.
            { type: 'replacePackageName', path: './package.json' }
        ]
    })
}

export default getInitGenerator
