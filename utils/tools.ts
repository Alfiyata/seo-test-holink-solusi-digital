import data from '~/../data/data.json'

export const tools = data

export function getToolBySlug(slug: string) {
  return tools.find((item: any) => item.slug === slug)
}