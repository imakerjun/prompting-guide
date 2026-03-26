import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { OriginalDocLink } from './src/components/OriginalDocLink'
import { Quiz } from './src/components/Quiz'
import { UseCaseCard, ResourceLink } from './src/components/UseCaseCard'
import { LearningPath } from './src/components/LearningPath'

const docsComponents = getDocsMDXComponents()

export const useMDXComponents = components => ({
  ...docsComponents,
  OriginalDocLink,
  Quiz,
  UseCaseCard,
  ResourceLink,
  LearningPath,
  ...components
})
