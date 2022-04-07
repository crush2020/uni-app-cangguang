<template>
	<view class="index">
		<view class="index-icon">
			<image style="width: 100%;" src="../../static/index/indexIcon.png" mode="widthFix"></image>
		</view>
		<view class="content">
			<view class="content-data" @click="gopage">
					<view class="content-title">
						<view>
							{{content.company}}
						</view>
					</view>
					<view class="content-item">
						<view class="">
							<view class="">
								仓库车辆总数
							</view>
							<view class="citem-amount">
								<view class="">
									{{content.total}}台
								</view>
							</view>
						</view>
						<view class="">
							<view class="citem-amount-item">
								本月入库{{content.inTotal}}台
							</view>
							<view class="citem-amount-item">
								本月出库{{content.outTotal}}台
							</view>
						</view>
					</view>
					<view class="content-more">
						<view>
							查看所有库存车辆
						</view>
					</view>
			</view>
			<view class="index-box">
				<ItemModel :titile="'工作台'" @getlist="getlist"></ItemModel>
			</view>
		</view>
	</view>
</template>

<script>
	import ItemModel from '../../components/index/ItemModel.vue'
	import { getTruckStatistics } from "@/server/bindAccount/index.js"
	import Storage from '@/util/Storage.js'
	export default {
		data() {
			return {
				city: '一号仓库',
				candidates: ['一号仓库', '二号仓库', '三号仓库'],
				content: {},
				time: null
			}
		},
		components: {
			ItemModel
		},
		onLoad() {
			this.getTruckS()
			// this.content = uni.getStorageSync('ontent');
			this.time = setTimeout(() => {
				this.getTruckS()
			}, 500000)
		},
		methods: {
			getTruckS() {
				getTruckStatistics().then(res => {
					if(res.status == 0) {
						this.content = res.data
						Storage.setStorage("content", res.data)
					}
				})
			},
			boxInput(value) {
				console.log(value)
			},
			// 改变状态
			getlist() {
				this.content = uni.getStorageSync('content');
			},
			gopage() {
				uni.switchTab({
					url: "../index/carMangement/index"
				});
			}
		}
	}
</script>

<style>
	.index {
		background-color: #e8e6e6;
		height: 100vh;
		padding: 0 10px;
		padding-top: 10px;
	}

	.content {
		display: flex;
		flex-direction: column;
	}

	.content-data {
		background-color: #FFFFFF;
		padding: 12px;
		border-radius: 5px;
		margin-bottom: 15px;
	}

	.content-title {
		display: flex;
		justify-content: center;
		color: #088A29;
		font-size: 21px;
		font-weight: 600;
		margin-bottom: 25px;
	}

	.content-item {
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: #000000;
		font-size: 16px;
	}

	.citem-amount {
		color: #fa1f06;
		font-size: 30px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 5px 0;
	}

	.citem-amount-item {
		margin: 10px 0;
	}

	.content-more {
		margin-top: 20px;
		margin-bottom: 10px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: #000000;
		font-size: 16px;
	}
</style>
