import service from "../server.js"
//用户登录
export function loginService(Code) {
	// let options = {
	// 	url: "/agent/login",
	// 	data: {
	// 		wxCode
	// 	},
	// 	methods: "POST"
	// }
	const options = {}
	options.method = "POST"
	options.url = "/agent/login"
	options.data = { wxCode:Code }
	return service(options)
}

// 用户注册
export function registerService(data) {
	const options = {}
	options.method = "POST"
	options.url = "/agent/register"
	options.data = data
	return service(options)
}

// 获取展示信息
export function getTruckStatistics(data) {
	const options = {}
	options.method = "GET"
	options.url = "/agent/getTruckStatistics"
	return service(options)
}