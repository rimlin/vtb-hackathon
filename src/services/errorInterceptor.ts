import axios from 'axios'

import history from 'utils/helpers/history'

const redirectTimeout = 10000

export const ErrorInterceptor = (error: any, needRequestOnError = false) => {
	if (axios.isCancel(error)) {
		return Promise.reject(error).catch()
	}

	if (error?.response?.status === 500 && needRequestOnError) {
		setTimeout(() => {
			return axios.request(error.config)
		}, redirectTimeout)
	}

	if (error?.response?.status === 403) {
		history.push('/forbidden')
	}

	return Promise.reject(error).catch()
}
