import { ApiErrorConstruction } from 'types/Request'
import { ApiError } from 'utils/apiError'

const defaultErrorMessage = 'Внутренняя ошибка'

export function errorHandle(
	data: ApiErrorConstruction | any,
	errorMessage?: string | unknown
): ApiErrorConstruction {
	if (data instanceof ApiError) {
		return data
	} else {
		if (typeof errorMessage !== 'string') {
			errorMessage = defaultErrorMessage
		}

		return {
			error: {
				message: errorMessage as string
			},
			isHandled: false
		}
	}
}
