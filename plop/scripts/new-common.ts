/* eslint-disable import/no-extraneous-dependencies */
import { NodePlopAPI } from 'plop'
import { pascalCase } from 'change-case'
import fs from 'fs'

type Answers = {
    componentName: string
}

const COMMON_PATH = './src/components/common'
export const getNewCommonGenerator = (plop: NodePlopAPI) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    plop.setActionType('makeCommonDirectory', async (answers, config, _plop) => {
        fs.mkdirSync(`${COMMON_PATH}/${pascalCase((answers as Answers).componentName)}`)

        return ''
    })

    plop.setHelper('formattedComponentName', (componentName) => {
        if (typeof componentName === 'string') return pascalCase(componentName.replace(/[^a-zA-Z\d\s:]/g, ''))

        return pascalCase(componentName.data?.root.componentName?.replace(/[^a-zA-Z\d\s:]/g, ''))
    })

    plop.setHelper('commonPath', (componentName) => {
        const formattedComponentName = pascalCase(componentName)
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s:]/g, '')

        return `${COMMON_PATH}/${formattedComponentName}`
    })

    plop.setGenerator('common', {
        description: 'initialize common component',
        prompts: [
            {
                type: 'input',
                name: 'componentName',
                message: 'Component name please (this will be converted to pascal casing)'
            }
        ],
        actions: [
            // @ts-ignore Type 'string' is not assignable to type '"append"'.
            { type: 'makeCommonDirectory' },
            {
                type: 'addMany',
                destination: '{{commonPath componentName}}',
                base: 'plop/templates/NewComponent',
                templateFiles: 'plop/templates/NewComponent/*.hbs'
            }
        ]
    })
}

export default getNewCommonGenerator
