import baseurl from "@/util/baseurl.js"

export default function service(options) {
	const path = options.url
	options.url = baseurl + options.url
	const https = new Promise((resolved, rejected) => {
		// 同步获取userInfo
		const token = uni.getStorageSync('token');
		if(token && token.length != 0) {
			options.header = { Authorization: token }
		}
		// 发送真正请求
		uni.showLoading({
			title: '加载中'
		});
		uni.request(options)
			.then(data => {
				const [err, res] = data
				uni.hideLoading();
				resolved(res.data);
			})
			.catch(data => {
				const [err, res] = data
				uni.hideLoading();
				rejected(err);
			})
	});
	return https
}