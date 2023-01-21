/* eslint-disable import/no-extraneous-dependencies */
import { NodePlopAPI } from 'plop'
import { pascalCase, paramCase } from 'change-case'
import fs from 'fs'

type Answers = {
    componentName: string
    projectName: string
}

const COMPONENT_PATH = './src/components'

export const getNewComponentGenerator = (plop: NodePlopAPI) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    plop.setActionType('makeComponentDirectory', async (answers, config, _plop) => {
        fs.mkdirSync(`${COMPONENT_PATH}/${pascalCase((answers as Answers).componentName)}`, { recursive: true })

        return ''
    })

    plop.setHelper('formattedComponentName', (componentName) => {
        if (typeof componentName === 'string') return pascalCase(componentName.replace(/[^a-zA-Z\d\s:]/g, ''))

        return pascalCase(componentName.data?.root.componentName?.replace(/[^a-zA-Z\d\s:]/g, ''))
    })

    plop.setHelper('componentPath', (componentName) => {
        const formattedComponentName = pascalCase(componentName)
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s:]/g, '')

        return `${COMPONENT_PATH}/${formattedComponentName}`
    })

    plop.setHelper('formattedComponentTestId', (componentName) => {
        if (typeof componentName === 'string') return paramCase(componentName.replace(/[^a-zA-Z\d\s:]/g, ''))

        return paramCase(componentName.data?.root.componentName?.replace(/[^a-zA-Z\d\s:]/g, ''))
    })

    plop.setGenerator('component', {
        description: 'initialize component',
        prompts: [
            {
                type: 'input',
                name: 'componentName',
                message: 'Component name please (this will be converted to pascal casing)'
            }
        ],
        actions: [
            // @ts-ignore Type 'string' is not assignable to type '"append"'.
            { type: 'makeComponentDirectory' },
            {
                type: 'addMany',
                destination: '{{componentPath componentName}}',
                base: 'plop/templates/NewComponent',
                templateFiles: 'plop/templates/NewComponent/*.hbs'
            }
        ]
    })
}

export default getNewComponentGenerator
