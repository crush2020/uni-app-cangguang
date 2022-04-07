import service from "../server.js"
// 经销商入库
export function inStoreService(seq) {
	const options = {}
	options.method = "POST"
	options.url = "/agent/inStore"
	options.data = {seq:seq}
	return service(options)
}

//出库
export function applyForSale(seq) {
	const options = {}
	options.method = "POST"
	options.url = "/agent/applyForSale"
	options.data = {seq:seq}
	return service(options)
}