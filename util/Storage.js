class Storage {
	// 获取同步storage
	// 一个参数返回string，两个参数返回一个object
	getStorage(key) {
		const argLength = arguments.length
		if(argLength > 1) {
			const getStorage = {}
			const arg = Array.apply(null, arguments)
			arg.forEach((element) => {
				getStorage.element = uni.getStorageSync(element);
			})
			return getStorage
		} else {
			return uni.getStorageSync(key);
		}
	}
	// 异步存储storage
	// 传入一个对象会把对象里的key，value遍历存储
	setStorage(key, datas) {
		const argLength = arguments.length
		if(argLength > 1) {
			uni.setStorage({
				key: key,
				data: datas,
				success: function() {
					console.log('success');
				}
			});
		} else {
			const arg = Array.apply(null, arguments)[0].entries()
			arg.forEach((element) => {
				uni.setStorage({
					key: element[0],
					data: element[1],
					success: function() {
						console.log('success');
					}
				});
			})
		}
	}
	// 异步删除storage
	// 支持多个参数删除
	removeStorage(key) {
		const argLength = arguments.length
		if (argLength > 1) {
			const arg = Array.apply(null, arguments)
			arg.forEach((element) => {
				uni.removeStorage({
				    key: element
				});
			})
		} else {
			uni.removeStorage({
			    key: key
			});
		}
	}
}

export default new Storage
