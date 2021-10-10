import { isExists } from './isExists'

export function safeArrayCheck(supposedArray: any) {
	return isExists(supposedArray) && Array.isArray(supposedArray)
}
