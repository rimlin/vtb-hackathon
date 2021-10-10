/**
 * Слияние двух массивов по заданному ключу
 * Если в базовом массиве не найден элемент источника, то он добавляется в конец
 */
export function mergeArray<T, Key extends keyof T>(
	base: T[],
	source: T[],
	prop: Key
): T[] {
	const processed = new Set()
	const dest = base.map(item => {
		const foundSource = source.find(found => found[prop] === item[prop])

		if (foundSource) {
			processed.add(item[prop])
			return {
				...item,
				...foundSource
			}
		} else {
			return item
		}
	})

	source.forEach(item => {
		if (!processed.has(item[prop])) {
			dest.push(item)
		}
	})

	return dest
}
