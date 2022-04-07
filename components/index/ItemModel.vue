<template>
	<view class="itemModel">
		<view v-if="titile" class="itemModel-titile">
			<view>
				{{ titile }}
			</view>
		</view>
		<uni-row class="demo-uni-row">
			<uni-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" v-for="item in content" :key="item.url">
				<view class="itemModel-content" @click="gopage(item)">
					<view class="content-image">
						<image style="width: 55px;height: 55px;" :src="item.image" mode="scaleToFill"></image>
					</view>
					<view class="content-font">
						<view>
							{{ item.imageFount }}
						</view>
					</view>
				</view>
			</uni-col>
		</uni-row>
<!-- 		<view @click="openDialog()">xiaxi</vw> -->
		<uni-popup ref="popupMessage" type="message">
			<uni-popup-message :type="types" :message="messages" :duration="4000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="popupDialog" type="dialog">
			<uni-popup-dialog mode="input" title="销售出库" message="成功消息" :duration="2000" :before-close="true" @close="closeDialog"
				@confirm="confirm">
					<view class="warningBox" style="display: flex;flex-direction: column;">
						<view >出库车辆序列号：{{req}}</view>
						<view >是否确认提交申请？</view>
					</view>
				</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import scanCode from '@/util/QRcodeRulest.js'
	import {
		inStoreService,
		applyForSale
	} from "@/server/index/index.js"
	import {
		getDetails
	} from "@/server/index/carMangement/getProducts.js"
	import Storage from "@/util/Storage.js"
	export default {
		name: "index",
		props: {
			titile: {
				type: String
			},
			content: {
				type: Array,
				default () {
					return [{
							image: '../../static/index/itemModel/car.png',
							url: '../index/carMangement/index',
							imageFount: '查询车辆'
						},
						{
							image: '../../static/index/itemModel/enter.png',
							url: '../carMangement/index',
							imageFount: '扫码入库'
						},
						{
							image: '../../static/index/itemModel/out.png',
							url: '../index/outbound/index',
							imageFount: '销售出库'
						},
						{
							image: '../../static/index/itemModel/tOut.png',
							url: '../index/carApplication/index',
							imageFount: '用时申请'
						},
						{
							image: '../../static/index/itemModel/usecar.png',
							url: '../index/tryout/tryout',
							imageFount: '试用申请'
						},
						{
							image: '../../static/index/itemModel/list.png',
							url: '../index/myList/index',
							imageFount: '申请记录'
						},
					]
				}
			}
		},
		data() {
			return {
				messages: "成功",
				types: "success",
				req: "",
				staus: []
			}
		},
		methods: {
			openMessage(type, message) {
				this.types = type
				this.messages = message
				this.$refs.popupMessage.open()
			},
			openDialog(res) {
				this.staus = res
				this.$refs.popupDialog.open()
			},
			closeDialog() {
				this.$refs.popupDialog.close()
			},
			confirm(value) {
				const _this = this
				const res = this.staus
				applyForSale(res[1]).then(res => {
					if (res.status == 0) {
						_this.$refs.popupDialog.close()
						_this.openMessage("success", "销售出库申请成功，请等待管理员处理申请，可在“申请记录”中查看进度。")
					} else {
						_this.openMessage("error", res.message)
					}
				})
			},
			gopage(item) {
				const _this = this
				if (item.imageFount == "扫码入库") {
					scanCode().then(res => {
						if (res[0]) {
							inStoreService(res[1]).then(res => {
								if (res.status == 0) {
									_this.openMessage("success", "入库成功，可访问在库车辆信息查看入库车辆详情")
									setTimeout(() => {
										_this.$getTruckStatistics().then(res => {
											Storage.setStorage("content", res.data)
											// 改变主页面总台数
											_this.$emit('getlist')
										})
									}, 1000)
								} else {
									_this.openMessage("error", res.message)
								}
							})
						} else {
							uni.showToast({
								icon: "error",
								title: "车辆序列号错误",
								duration: 3000
							});
						}
					})
				} else if (item.imageFount == "销售出库") {
					scanCode().then(res => {
						_this.req = res[1]
						if (res[0]) {
							// 弹出框确认
							_this.openDialog(res)
						} else {
							uni.showToast({
								icon: "error",
								title: "车辆序列号错误",
								duration: 3000
							});
						}
					})
				} else if (item.imageFount == "用时申请") {
					scanCode().then(res => {
						if (res[0]) {
							uni.navigateTo({
								url: `${item.url}?seq=${res[1]}`
							});
						} else {
							uni.showToast({
								icon: "error",
								title: "车辆序列号错误",
								duration: 3000
							});
						}
					})
				} else if (item.imageFount == "试用申请") {
					scanCode().then(res => {
						if (res[0]) {
							uni.navigateTo({
								url: `${item.url}?seq=${res[1]}`
							});
						} else {
							uni.showToast({
								icon: "error",
								title: "车辆序列号错误",
								duration: 3000
							});
						}
					})
				} else if (item.imageFount == "查询车辆") {
					scanCode().then(res => {
						if (res[0]) {
							const seq = res[1]
							getDetails(res[1]).then(res => {
								if(res.status == 0) {
									//详情页跳转
									uni.navigateTo({
										url: `../../pages/index/carMangement/productDetail?seq=${seq}`,
									});
								} else {
									_this.openMessage("error", res.message)
								}
							})
						} else {
							uni.showToast({
								icon: "error",
								title: "车辆序列号错误",
								duration: 3000
							});
						}
					})
				} else {
					uni.navigateTo({
						url: item.url
					});
				}
			}
		}
	}
</script>

<style>
	.itemModel {
		background-color: #FFFFFF;
		padding: 12px;
		border-radius: 5px;
		margin-bottom: 15px;
	}

	.ontent-box {
		display: flex;
		align-items: center;
	}

	.itemModel-titile {
		font-size: 21px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 600;
		color: #088A29;
		margin-bottom: 10px;
	}

	.itemModel-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 10px 0;
	}

	.content-font {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		color: #000000;
	}
</style>
