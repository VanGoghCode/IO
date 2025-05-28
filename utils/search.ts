import type { SearchResult, MenuData } from "@/types"
import { CATEGORY_NAMES } from "@/constants/menu-data"

export const calculateLevenshteinDistance = (str1: string, str2: string): number => {
  const matrix = []

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
      }
    }
  }

  return matrix[str2.length][str1.length]
}

export const searchMenuItems = (query: string, menuData: MenuData): SearchResult[] => {
  if (!query.trim()) return []

  const searchTerm = query.toLowerCase().trim()
  const allItems: SearchResult[] = []

  // Collect all items from all categories
  Object.entries(menuData).forEach(([categoryKey, items]) => {
    items.forEach((item) => {
      allItems.push({
        item,
        category: categoryKey,
        categoryName: CATEGORY_NAMES[categoryKey] || categoryKey,
      })
    })
  })

  // Search with different matching strategies
  const exactMatches: SearchResult[] = []
  const partialMatches: SearchResult[] = []
  const fuzzyMatches: SearchResult[] = []

  allItems.forEach(({ item, category, categoryName }) => {
    const itemName = item.name.toLowerCase()

    // Exact match
    if (itemName === searchTerm) {
      exactMatches.push({ item, category, categoryName })
    }
    // Partial match (contains the search term)
    else if (itemName.includes(searchTerm)) {
      partialMatches.push({ item, category, categoryName })
    }
    // Fuzzy match (handle typos)
    else {
      const distance = calculateLevenshteinDistance(searchTerm, itemName)
      const maxDistance = Math.max(2, Math.floor(searchTerm.length * 0.4)) // Allow up to 40% character differences

      if (distance <= maxDistance) {
        fuzzyMatches.push({ item, category, categoryName })
      }
    }
  })

  // Return results in order of relevance
  return [...exactMatches, ...partialMatches, ...fuzzyMatches].slice(0, 10) // Limit to 10 results
}
