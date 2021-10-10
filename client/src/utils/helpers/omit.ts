export const omit = (obj: any, omitKeys: string[]) => {
	const res: { [key: string]: any } = {}

	Object.keys(obj).forEach(key => {
		if (!omitKeys.includes(key)) {
			res[key] = obj[key]
		}
	})

	return res
}
