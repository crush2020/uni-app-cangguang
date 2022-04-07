// 扫描二维码公共方法
async function scanCode(title = ["入库成功", "不是正确的车辆二维码"], duration = [2000, 2000]) {
	return new Promise((resolved, rejected) => {
		// 只允许通过相机扫码
		uni.scanCode({
			onlyFromCamera: true,
			success: function(res) {
				console.log(res)
				if (QRcodeRulest(res.result)) {
					// uni.showToast({
					// 	title: title[0],
					// 	duration: duration[0]
					// });
					return resolved([true, res.result])
				} else {
					// uni.showToast({
					// 	icon: "error",
					// 	title: title[1],
					// 	duration: duration[1]
					// });
					return resolved([false, res.result])
				}
			},
			fail() {
				return resolved([false, []])
			}
		});
	})
}

// 二维码结果校验
function QRcodeRulest(result) {
	const L = result.length
	const scope = [
		"1",
		"2",
		"3",
		"4",
		"5",
		"7",
		"9",
		"B",
		"E",
		"H",
		"J",
		"L",
		"M",
		"P",
		"S",
		"T",
		"Y",
		"Z",
	]
	if (L >= 9 && L <= 11) {
		if (scope.includes(result[0])) {
			const a = Number(result[1] + result[2])
			if (isscopeNaN(a, [10, 99])) {
				const b = Number(result[3] + result[4])
				if (isscopeNaN(b, [10, 21])) {
					return true
				}
			}
		}
	}
	return false
}

// 数字校验
function isscopeNaN(data, scope) {
	if (!isNaN(data)) {
		if (data >= scope[0] && data <= scope[1]) {
			return true
		}
	}
	return false
}

export default scanCode
