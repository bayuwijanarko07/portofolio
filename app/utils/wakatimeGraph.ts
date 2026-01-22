import * as d3 from 'd3'

export function buildLanguageGraph(languages: any[]) {
  const nodes: Record<string, any> = {
    root: { name: 'Wakatime' },
  }

  const edges: Record<string, any> = {}

  const scale = d3
    .scaleLinear()
    .domain([0, d3.max(languages, l => l.total_seconds) ?? 1])
    .range([50, 300])

  languages.forEach((lang, i) => {
    nodes[lang.name] = {
      name: lang.name,
      size: scale(lang.total_seconds),
    }

    edges[`e${i}`] = {
      source: 'root',
      target: lang.name,
      label: lang.text,
    }
  })

  return { nodes, edges }
}
