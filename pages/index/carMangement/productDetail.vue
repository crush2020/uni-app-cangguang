<template>
	<view class="productDetail">
		<view class="listData">
			<label class="detailLine">
				<view class="product-line">车辆编号</view>
				<view class="product-con">{{detailData.seq==null?" ":detailData.seq}}</view>
			</label>
			<label class="detailLine">
				<view class="product-line">车辆名称</view>
				<view class="product-con">{{detailData.name==null?" ":detailData.name}}</view>
			</label>
<!-- 			<label class="detailLine">
				<view class="product-line">车辆图片</view>
				<view class="product-con"><image :src="detailData.picPath" mode=""></image></view>
			</label> -->
			<label class="detailLine">
				<view class="product-line">型号规格</view>
				<view class="product-con">{{detailData.sku==null?" ":detailData.sku}}</view>
			</label>
			<label class="detailLine">
				<view class="product-line">经销商价格</view>
				<view class="product-con">{{detailData.agentPrice==0 ?"-":detailData.agentPrice}}</view>
			</label>
			<label class="detailLine">
				<view class="product-line">建议售价</view>
				<view class="product-con">{{detailData.salePrice==0 ?"-":detailData.salePrice }}</view>
			</label>
			<label class="detailLine">
				<view class="product-line">入库时间</view>
				<view class="product-con">{{detailData.inTime==null?" ":detailData.inTime}}</view>
			</label>
			<label class="detailLine">
				<view class="product-line">在库时长</view>
				<view class="product-con">{{detailData.storeHour==null ?" ": detailData.storeHour+"h"}}</view>
			</label>
			<label class="detailLine">
				<view class="product-line">车辆状态</view>
				<view class="product-con">{{detailData.statusStr==null? " ":detailData.statusStr}}</view>
			</label>
			<label class="detailLine">
				<view class="product-line">试用状态</view>
				<view class="product-con">{{detailData.type==null?" ":detailData.type }}</view>
			</label>
			<label class="detailLine">
				<view class="product-line">申请时长</view>
				<view class="product-con">{{detailData.tryHour==null?" ": (detailData.tryHour+"h")}}</view>
			</label>
			<label class="detailLine">
				<view class="product-line">剩余时长</view>
				<view class="product-con">{{detailData.surplusHour==null?" ":detailData.surplusHour+"h" }}</view>
			</label>
			<label class="detailLine">
				<view class="product-line">试用位置</view>
				<view class="product-con">{{detailData.tryAddr==null?" ":detailData.tryAddr }}</view>
			</label>
			<label class="detailMessage">
				<view class="detailMessage-top">详细信息</view>
				<view class="detailMessage-bottom">{{detailData.info==null?" ":detailData.info}}</view>
			</label>
		</view>
		<view class="btnBox">
			<view class="boxbtn">
				<button type="default" class="btn" @click="openDialog">销售出库</button>
				<button type="default" class="btn" @click="tryApply(0)">临时申请</button>
				<button type="default" class="btn" @click="tryApply(1)">试用申请</button>
			</view>
		</view>
		<uni-popup ref="popupMessage" type="message">
			<uni-popup-message :type="types" :message="messages" :duration="4000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="popupDialog" type="dialog">
			<uni-popup-dialog mode="input" title="销售出库" message="成功消息" :duration="2000" :before-close="true" @close="closeDialog"
				@confirm="confirm">
				<slot name="default">
					<view class="warningBox" style="display: flex;flex-direction: column;">
						<view >出库车辆序列号：{{seq}}</view>
						<view >是否确认提交申请？</view>
					</view>
				</slot>
				</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import { applyForSale } from "@/server/index/index.js"
	import {
		getDetails
	} from "@/server/index/carMangement/getProducts.js"
	export default {
		data() {
			return {
				detailData:"",//商品信息
				seq:"",
				current: 1,
				messages: "成功",
				types: "success",
			}
		},
		//获取传入的商品信息
		onLoad(options) {
			this.getlist(options.seq)
		},
		methods: {
			getlist(seq) {
				// console.log(seq)
				getDetails(seq).then(res => {
					if(res.status == 0) {
						this.detailData = res.data
						this.seq = res.data.seq
					}
				})
			},
			//点击车辆临时申请试用
			tryApply(type) {
				if(type == 0) {
					uni.navigateTo({
						url: `../carApplication/index?seq=${this.seq}`
					})
				} else {
					uni.navigateTo({
						url: `../tryout/tryout?seq=${this.seq}`
					})
				}
			},
			openMessage(type, message) {
				this.types = type
				this.messages = message
				this.$refs.popupMessage.open()
			},
			openDialog() {
				this.$refs.popupDialog.open()
			},
			closeDialog() {
				this.$refs.popupDialog.close()
			},
			confirm(value) {
				const _this = this
				applyForSale(this.seq).then(res => {
					if (res.status == 0) {
						_this.$refs.popupDialog.close()
						_this.openMessage("success", "销售出库申请成功，请等待管理员处理申请，可在“申请记录”中查看进度。")
					} else {
						_this.openMessage("error", res.message)
					}
				})
			}
		}
	}
</script>

<style scoped>
.productDetail {
	position: relative;
	/* background-color: #eee; */
	height: 100vh;
}
.listData {
	padding: 20rpx;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	height: calc(100vh - 200rpx);
	overflow-y: auto;
}
.detailLine {
	display: flex;
	border-bottom: 1px solid #ccc;
	padding: 20rpx;
}
.detailMessage {
	padding: 20rpx;
}
.detailMessage-bottom {
	padding-top: 20rpx;
}
.product-line {
	width: 300rpx;
	text-align: left;
}
.product-con {
	width: 450rpx;
	text-align: right;
}
.btnBox {
	position: absolute;
	bottom: 0;
	background-color: #eee;
	width: 100%;
}
.boxbtn {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 50rpx 0 40rpx 0;
	width: 100%;
}
.btn {
	background-color:  #088A29;
	color: #fff;
	width: 220rpx;
}
</style>
