import service from "../server.js"
//用户信息修改
export function loginService(userName,tel) {
	const options = {}
	options.method = "POST"
	options.url = "/agent/login"
	options.data = {userName, tel}
	return service(options)
}