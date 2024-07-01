import { Hit } from 'meilisearch'

/**
 * Highlights hits in a search response from Meilisearch using the given delimiters.
 *
 * In order for this to work you must supply `showMatchesPosition: true` to the search request:
 *
 * ```js
 * const myIndex = await client.getIndex('my-index')
 * const results = await myIndex.search('my-query', {
 *   showMatchesPosition: true,
 * })
 * ```
 *
 * @param hit A single hit from a SearchResponse.
 * @param delimiterStart The delimiter to use for starting a highlight.
 * @param delimiterEnd The delimiter to use for ending a hightlight.
 * @returns The original hit with highlighted (modified) attribute values.
 */
export default function hightlightHit(hit: Hit, delimiterStart: string = '{', delimiterEnd: string = '}'): Hit {
    const { _matchesPosition } = hit
    if (!_matchesPosition) {
        return hit
    }

    const hightlightOffset = delimiterStart.length + delimiterEnd.length

    const clone = { ...hit }

    for (const key in _matchesPosition) {
        if (Object.prototype.hasOwnProperty.call(_matchesPosition, key)) {
            const matchesArray = _matchesPosition[key]

            let value = clone[key]
            let offset = 0

            matchesArray?.forEach(({ start, length }) => {
                const adjustedStart = start + offset
                const adjustedEnd = adjustedStart + length

                value = value.slice(0, adjustedStart) + delimiterStart + value.slice(adjustedStart, adjustedEnd) + delimiterEnd + value.slice(adjustedEnd)
                offset += hightlightOffset
            })

            clone[key] = value
        }
    }

    return clone
}
