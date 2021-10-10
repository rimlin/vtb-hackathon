import { isExists } from './isExists'
import { safeArrayCheck } from './safeArrayCheck'

export function cleanObject<T extends Record<string, any>>(
	obj: T,
	removeEmptyArray?: boolean
): Record<keyof T, any> {
	const cleanedObject: Record<string, any> = {}

	Object.keys(obj).forEach(key => {
		if (removeEmptyArray === true) {
			if (safeArrayCheck(obj[key]) && obj[key].length === 0) {
				return
			}
		}

		if (!isExists(obj[key])) {
			return
		}

		cleanedObject[key] = obj[key]
	})

	return cleanedObject as T
}
