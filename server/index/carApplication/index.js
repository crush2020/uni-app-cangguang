import service from "../../server.js"
// 临时申请
export function applyForTempTrial(seq, hour) {
	const options = {}
	options.method = "POST"
	options.url = "/agent/applyForTempTrial"
	options.data = {
		seq,
		hour
	}
	return service(options)
}

// 试用申请
export function applyForTrial(data) {
	const options = {}
	options.method = "POST"
	options.url = "/agent/applyForTrial"
	options.data = data
	return service(options)
}
