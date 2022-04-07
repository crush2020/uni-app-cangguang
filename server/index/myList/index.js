import service from "../../server.js"

// 获取清单信息
export function getRequestList(keyWord, busType, status) {
	const options = {}
	options.method = "GET"
	options.url = "/agent/getRequestList"
	options.data = {keyWord, busType, status}
	return service(options)
}

