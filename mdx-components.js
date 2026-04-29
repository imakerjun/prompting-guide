import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { OriginalDocLink } from './src/components/OriginalDocLink'
import { Quiz } from './src/components/Quiz'
import { UseCaseCard, ResourceLink } from './src/components/UseCaseCard'
import { LearningPath } from './src/components/LearningPath'
import { SlideOnly, DocOnly } from './src/components/SlideVisibility'
import {
  SlideHero,
  SlideIllustrationWithCard,
  SlideMetric,
  SlidePrinciple,
  SlideSectionTitle,
  SlideSummary,
  SlideTextCenter,
  SlideTitleFollowsBody,
} from './src/components/SlideTemplates'

const docsComponents = getDocsMDXComponents()

export const useMDXComponents = components => ({
  ...docsComponents,
  OriginalDocLink,
  Quiz,
  UseCaseCard,
  ResourceLink,
  LearningPath,
  SlideOnly,
  DocOnly,
  SlideHero,
  SlideMetric,
  SlidePrinciple,
  SlideSummary,
  SlideSectionTitle,
  SlideTextCenter,
  SlideTitleFollowsBody,
  SlideIllustrationWithCard,
  ...components
})
