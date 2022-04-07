<template>
	<view class="myList">
		<view class="myList-search-bar">
			<uni-search-bar @input="input" placeholder="查询车辆记录" v-model="searchValue" ></uni-search-bar>
		</view>
		<view class="myList-combox-box">
			<view class="myList-combox">
				<uni-combox label="申请类型" @inputINdex="selectware" :candidates="candidates"  placeholder="请选择" emptyTips="无数据"></uni-combox>
			</view>
			<view class="myList-combox">
				<uni-combox label="申请状态" @inputINdex="selectware1" :candidates="candidates1"  placeholder="请选择" emptyTips="无数据"></uni-combox>
			</view>
		</view>
		<view class="myList-content" v-for="(item, index) in list" :key='index' @click="gomore(item)">
			<view class="myList-box">
				<view class="myList-content-box">
					<view class="myList-busTypeStr">
						申请类型：{{item.busTypeStr}}
					</view>
					<view class="myList-statusStr">
						{{item.statusStr}}
					</view>
				</view>
				<view class="myList-content-conent">
					申请内容：{{item.msg}}
				</view>
				<view class="myList-createTime">
					申请时间：{{item.createTime}}
				</view>
<!-- 				<view class="myList-more" @click="gomore(item)">
					<view>点击查看详情</view>
				</view> -->
			</view>
		</view>
		<view v-if="iszero" class="list-zero">
			<view>没有申请记录</view>
		</view>
	</view>
</template>

<script>
	import { getRequestList } from '../../../server/index/myList/index.js'
	export default {
		data() {
			return {
				searchValue:"",//输入框获取的值
				list: [],
				iszero: false,
				candidates: {
					"全部": "",
					"申请试用": 2,
					"销售出库": 3,
					"用时申请": 5
				},
				candidates1: {
					"全部": "",
					"待处理": 1,
					"拒绝": 2,
					"处理中": 3,
					"已通过": 4
				},
				busType: "",
				status: ""
			}
		},
		onLoad() {
			this.getlist()
		},
		onPullDownRefresh() {
			getRequestList(this.searchValue, this.busType, this.status).then(res => {
				this.list = res.data;
				if(res.data.length == 0) {
					this.iszero = true
				} else {
					this.iszero = false
				}
				uni.showToast({
					icon: "success",
					title: "刷新成功",
					duration: 3000
				});
				uni.stopPullDownRefresh();
			})
		},
		methods: {
			getlist() {
				getRequestList(this.searchValue, this.busType, this.status).then(res => {
					this.list = res.data;
					uni.stopPullDownRefresh();
					if(res.data.length == 0) {
						this.iszero = true
					} else {
						this.iszero = false
					}
				})
			},
			//车辆信息模糊搜索
			input(res) {
				this.getlist()
			},
			// 申请类型
			selectware(index) {
				this.busType = this.candidates[index]
				this.getlist()
			},
			// 申请状态
			selectware1(index) {
				console.log(index)
				this.status = this.candidates1[index]
				this.getlist()
			},
			gomore(data) {
				delete data.busType
				delete data.status
				const listitem = JSON.stringify(data)
				uni.navigateTo({
					url: './more/more?listitem=' + listitem
				});
			}
		}
	}
</script>

<style scoped>
	.myList {
		background-color: #e8e6e6;
		min-height: 100vh;
		padding-bottom: 20px;
	}
	.myList-combox-box {
		display: flex;
		justify-content: space-between;
		margin: 0 12px;
	}
	.myList-combox {
		background-color: #FFFFFF;
		border-radius: 5px;
	}
	.myList-content {
		background-color: #FFFFFF;
		margin: 12px;
		padding: 12px;
		border-radius: 5px;
		margin-bottom: 15px;
	}
	.myList-content-box {
		display: flex;
		justify-content: space-between;
	}
	.myList-content-conent {
		margin-top: 10px;
	}
	.myList-busTypeStr {
		color: #088A29;
	}
	.myList-statusStr {
		color: #ff0303;
	}
	.myList-createTime {
		margin-top: 10px;
	}
	.myList-more {
		display: flex;
		margin-top: 10px;
		justify-content: center;
		align-items: center;
		color: #088A29;
	}
	.list-zero {
		background-color: #FFFFFF;
		margin: 12px;
		padding: 12px;
		border-radius: 5px;
		margin-bottom: 15px;
		display: flex;
		justify-content: center;
	}
</style>
