<template>
	<view class="pm">
		<view class="pm-imag">
			<view class="image-box">
				<image style="width: 70px;height: 70px;" :src="imgsrc"
					mode="scaleToFill"></image>
			</view>
			<view class="image-text">
				<view>{{userinfo.userName}}</view>
			</view>
		</view>
		<view class="content-box">
			<Content :titile="'个人信息管理'":path="'../../pages/personalManagement/password'"></Content>
			<!-- <Content :titile="'个人信息管理'" :path="'../../pages/personalManagement/information/information'"></Content> -->
		</view>
<!-- 		<view class="pm-close">
			<uni-popup ref="popup" type="center" :mask-click="false">
				<view class="popup-content">
					<button @click="close" style="width: 120px;height: 40px;" type="default">取消</button>
					<button @click="close" style="width: 120px;height: 40px;" type="warn">确定</button>
				</view>
			</uni-popup>
		</view> -->
	</view>
</template>

<script>
	import Content from "../../components/personalManagement/Content.vue"
	import URL from '@/util/image.js'
	export default {
		components: {
			Content
		},
		data() {
			return {
				userinfo: {},
				imgsrc: '../../static/personalManagement/message.png'
			}
		},
		onLoad() {
			this.userinfo = uni.getStorageSync('userinfo');
			// this.imgsrc = URL + this.userinfo.picPath
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>
	.pm {
		background-color: #e8e6e6;
		height: 100vh;
		padding-top: 1px;
	}

	.pm-imag {
		background-color: #ffffff;
		height: 100px;
		display: flex;
		align-items: center;
	}

	.image-box {
		margin-left: 20px;
		margin-right: 30px;
	}

	.image-text {
		font-size: 14px;
	}

	.content-box {
		margin-top: 20px;
	}

	.popup-content {
		background-color: #FFFFFF;
		width: 300px;
		height: 100px;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
	}
</style>
