<template>
	<view class="bindAccount">
		<!-- 		<view @click="goPage(2)">账号申请中</view>
		<view @click="goPage(0)">未申请账号</view> -->
		<view class="load-more" v-if="isBind == 0">
			<view>
				<uni-load-more :status="more" color="#088A29" :contentText="contentText" iconSize="40"
					iconType="circle">
				</uni-load-more>
				<!-- <view @click="goPage(1)">已申请账号</view> -->
			</view>
		</view>
		<view class="applyFor" v-if="isBind == 1">
			<view>您的申请已提交,待管理员审核通过中</view>
		</view>
		<view class="accountApplyFor" v-if="isBind == -1">
			<view style="margin-top: 20px;" class="company">
				<view class="company-img">
					<image style="width: 30px;height: 30px;" src="../../static/personalManagement/company.png"></image>
				</view>
				<view class="company-input">
					<input style="height: 40px;" v-model="company" type="text" placeholder="请输入公司名称" />
				</view>
			</view>
			<view class="company">
				<view class="company-img">
					<image style="width: 30px;height: 30px;" src="../../static/personalManagement/phone.png"></image>
				</view>
				<view class="company-input">
					<input style="height: 40px;" v-model="tel" type="number" placeholder="请输入电话号码" />
				</view>
			</view>
			<view class="company">
				<view class="company-img">
					<image style="width: 30px;height: 30px;" src="../../static/personalManagement/user.png"></image>
				</view>
				<view class="company-input">
					<input style="height: 40px;" v-model="Name" type="text" placeholder="请输入申请人真实姓名" />
				</view>
			</view>
			<view class="upFlie">
				<view style="margin-bottom: 5px;">上传营业执照</view>
				<uni-file-picker file-mediatype="image" mode="grid" file-extname="png,jpg" :limit="1" @delete="Ufdelete"
					@select="select" :auto-upload="false" />
			</view>
			<view class="loseSure">
				<view style="margin-right: 10px;">
					<CancelButton></CancelButton>
				</view>
				<view @click="upload()">
					<Surebutton></Surebutton>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Surebutton from "../../components/global/Surebutton.vue"
	import CancelButton from "../../components/global/CancelButton.vue"
	import {
		loginService,
		registerService
	} from "@/server/bindAccount/index.js"
	import Storage from '@/util/Storage.js'
	import testURL from "@/util/image.js"
	import baseurl from "@/util/baseurl.js"
	export default {
		components: {
			Surebutton,
			CancelButton
		},
		data() {
			return {
				isBind: 0,
				more: 'loading',
				contentText: {
					contentrefresh: "正在登陆中....."
				},
				upFlie: 1,
				Name: '',
				tel: '',
				company: '',
				timer: ''
			}
		},
		onLoad() {
			this.goLogin()
			this.isregisterService()
		},
		onUnload() {
			clearInterval(this.timer)
			this.timer = null
		},
		methods: {
			// 登录
			goLogin() {
				const _this = this
				uni.login({
					provider: 'weixin',
					onlyAuthorize: true,
					success: function(loginRes) {
						loginService(loginRes.code).then(res => {
							_this.isBind = res.status
							if (res.status == 0) {
								Storage.setStorage("token", res.data.token)
								Storage.setStorage("userinfo", res.data)
								uni.switchTab({
									url: '../index/index'
								});
							}
							if (res.status == -1) {
								uni.showToast({
									icon: "error",
									title: '您还未申请账号',
									duration: 1500
								});
							}
						})
					}
				});
			},
			// 申请注册
			goRegisterService(urlfile) {
				const _this = this
				uni.login({
					provider: 'weixin',
					onlyAuthorize: true,
					success: function(loginRes) {
						const data = {}
						data.userName = _this.Name
						data.company = _this.company
						data.tel = _this.tel
						data.wxCode = loginRes.code
						data.picPath = urlfile
						if(data.userName && data.company && data.tel) {
							registerService(data).then(res => {
								if (res.status == 0) {
									_this.isBind = 1
								} else {
									uni.showToast({
										icon: "error",
										title: res.message,
										duration: 3000
									});
								}
							})
						} else {
							uni.showToast({
								icon: "error",
								title: "请填写完整信息",
								duration: 3000
							});
						}
					}
				});

			},
			// 审核界面轮询登录
			isregisterService() {
				this.timer = setInterval(() => {
					this.goLogin()
				},60000)
			},
			goPage(type) {
				if (type == 1) {
					uni.switchTab({
						url: '../index/index'
					});
				}
				this.isBind = type
			},
			// 获取上传状态
			select(upFlie) {
				console.log('选择文件：', upFlie)
				this.upFlie = upFlie
			},
			// 移除图片
			Ufdelete(upFlie) {
				console.log('移除文件：', upFlie)
			},
			// 上传图片
			upload() {
				const _this = this
				// if(this.upFlie == 1) {
				// 	uni.showToast({
				// 		icon: "error",
				// 		title: "没有获取到路径",
				// 		duration: 3000
				// 	});
				// 	return
				// }
				uni.uploadFile({
					url: baseurl + '/file/upload',
					filePath: this.upFlie.tempFilePaths[0],
					name: 'file',
					formData: {
						'user': 'test'
					},
					success: (uploadFileRes) => {
						const urlfile = JSON.parse(uploadFileRes.data).data.file
						_this.goRegisterService(urlfile)
					},
					fail: (err) => {
						uni.showToast({
							icon: "error",
							title: "图片上传失败",
							duration: 3000
						});
					}
				});
			}
		}
	}
</script>

<style scoped>
	.load-more {
		height: 90vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.applyFor {
		color: #ff0606;
		font-weight: 600;
		height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.accountApplyFor {
		height: 80vh;
		margin: 20px 10px;
		padding: 20px 10px;
		display: flex;
		flex-direction: column;
	}

	.company {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		border-bottom: 1px solid #e8e6e6;
	}

	.company-img {
		margin-right: 20px;
	}

	.upFlie {
		padding-bottom: 10px;
		border-bottom: 1px solid #e8e6e6;
	}

	.loseSure {
		margin-top: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
