<template>
	<view class="carApplication">
		<view class="applyBox">

				<view class="car-line" style="padding-top: 10rpx;">
					<view class="left">所用选车辆编号</view>
					<view class="right"><input disabled type="text" v-model="seq" /></view>
				</view>
				<view class="car-line">
					<view class="left">申请时长</view>
					<view class="right"><input type="number" v-model="hour" placeholder="请填写试用小时数(上限50H)" /></view>
				</view>
				<view class="car-line">
					<view class="left">客户名称</view>
					<view class="right"><input type="text" v-model="name" placeholder="请输入客户名称" /></view>
				</view>
				<view class="car-line">
					<view class="left">客户位置</view>
					<view class="right"><input type="text" v-model="tryAddr" placeholder="请输入客户使用位置" /></view>
				</view>

			<view class="btnbox">
				<view class="rightbox"><button type="default" class="cancel" @click="cancel">取消</button></view>
				<view class="leftbox"><button type="default" class="confirm" @click="confirm">确定</button></view>
			</view>
			<uni-popup ref="popupMessage" type="message">
				<uni-popup-message :type="types" :message="messages" :duration="400"></uni-popup-message>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		applyForTempTrial,
		applyForTrial
	} from "@/server/index/carApplication/index.js"
	export default {
		data() {
			return {
				applyName: "中力",
				applyLocation: "杭州",
				items: ["临时申请", "试用申请"],
				seq: '',
				hour: null,
				name: '',
				tryAddr: "",
				messages: "成功",
				types: "success"
			}
		},
		onLoad(option) {
			this.seq = option.seq
		},
		methods: {
			openMessage(type, message) {
				this.types = type
				this.messages = message
				this.$refs.popupMessage.open()
			},
			// 试用
			isApplyForTrial() {
				const _this = this
				let data = {}
				data.seq = this.seq
				data.name = this.name
				data.hour = Number(this.hour)
				data.tryAddr = this.tryAddr
				if(Number(this.hour) != "" && (Number(this.hour) > 0) && (Number(this.hour <= 50)) && (this.name != "") && (this.tryAddr != "" )) {
					applyForTrial(data).then(res => {
						if (res.status == 0) {
							_this.openMessage("success", "试用申请成功，请等待管理员处理申请，可在“申请记录”中查看进度。")
						} else {
							_this.openMessage("error", res.message)
						}
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)
					})
				}else {
					uni.showToast({
						icon:"error",
						title:"请输入正确信息",
						duration: 2000
					})
					this.hour = ""
				}
			},
			confirm() {
				this.isApplyForTrial()
			},
			cancel() {
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped>
	/* 	.carApplication {
		height: 100vh;
		background-color: #eee;
	} */
	.applyBox {
		background-color: #fff;
		padding: 20rpx;
	}

	.car-line {
		background-color: #fff;
		border-bottom: 1px solid #ccc;
		padding: 20rpx 0;
		display: flex;
	}

	.left {
		width: 250rpx;
	}

	.right {
		width: 450rpx;
		text-align: right;
	}

	.btnbox {
		background-color: #fff;
		padding: 50rpx 0;
		display: flex;
		justify-content: center;
	}

	.confirm,
	.cancel {
		width: 200rpx;
	}

	.confirm {
		background-color: #088A29;
		color: #fff;
	}

	.leftbox,
	.rightbox {
		width: 350rpx;
	}

	.scanCode {
		position: absolute;
		bottom: 35%;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
