/* eslint-disable import/no-extraneous-dependencies */
import { NodePlopAPI } from 'plop'
import { camelCase } from 'change-case'
import fs from 'fs'

type Answers = {
    hookName: string
}

const HOOK_PATH = './src/hooks/'

export const getNewHookGenerator = (plop: NodePlopAPI) => {
    plop.setActionType('makeHookDirectory', async (answers, config, _plop) => {
        fs.mkdirSync(`${HOOK_PATH}/${camelCase((answers as Answers).hookName)}`, { recursive: true })

        return ''
    })

    plop.setHelper('formattedHookName', (hookName) => {
        if (typeof hookName === 'string') return camelCase(hookName.replace(/[^a-zA-Z\d\s:]/g, ''))

        return camelCase(hookName.data.root.hookName.replace(/[^a-zA-Z\d\s:]/g, ''))
    })

    plop.setHelper('hookPath', (hookName) => {
        const formattedHookName = camelCase(hookName)
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s:]/g, '')

        return `${HOOK_PATH}/${formattedHookName}`
    })

    plop.setGenerator('hook', {
        description: 'initialize hook',
        prompts: [
            {
                type: 'input',
                name: 'hookName',
                message: 'Hook name please (this will be converted to camelCasing)'
            }
        ],
        actions: [
            // @ts-ignore Type 'string' is not assignable to type '"append"'.
            { type: 'makeHookDirectory' },
            {
                type: 'addMany',
                destination: '{{hookPath hookName}}',
                base: 'plop/templates/newHook',
                templateFiles: 'plop/templates/newHook/*.hbs'
            }
        ]
    })
}

export default getNewHookGenerator
