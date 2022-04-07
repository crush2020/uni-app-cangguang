import service from "../../server.js"

// 获取商品清单信息
export function getProducts(keyWord,startTime,endTime,storeId) {
	const options = {}
	options.method = "GET"
	options.url = "/agent/getTruckList"
	options.data = {
		keyWord,
		startTime,
		endTime,
		storeId
	}
	return service(options)
}

// 获取商品详情
export function getDetails(seq) {
	const options = {}
	options.method = "GET"
	options.url = "/agent/getTruckInfo"
	options.data = {seq:seq}
	return service(options)
}
