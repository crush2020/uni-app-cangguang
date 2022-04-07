<template>
	<view class="carMangement">
		<view class="searchs">
			<view class="topbox">
				<uni-search-bar class="unisearch" @clear="clear" @confirm="searchbar" @input="input" placeholder="请输入车辆名称或车身编号" v-model="searchValue" cancelButton="none"></uni-search-bar>
			</view>
			<view class="left-box">
				<uni-section :title="'日期范围用法：' + '[' + range + ']'" type="line"></uni-section>
				<view class="example-body">
					<uni-datetime-picker v-model="range" type="daterange" start="1900-1-1" end="2100-1-1" rangeSeparator="至" @change="change"/>
				</view>
				<!-- <view class="">
					<uni-combox label="所在仓库" @inputINdex="selectware" :candidates="candidates"  placeholder="请选择仓库" emptyTips="无数据"></uni-combox>
				</view> -->
			</view>
		</view>

		<view class="searchCen">
			<view class="productItem-line" v-for="item in searchData" :key="item.seq" @click="setValue(item.seq)">
				<view class="productCon">
					<view class="product-name">
						编号：{{item.seq==null?" ":item.seq}}
					</view>
					<view class="product-name">
						名称：{{item.name==null?"暂无信息":item.name}}
					</view>
					<view class="product-time">
						入库时间：{{item.inTime}}
					</view>
				</view>
				<view class="product-status">
					<view>
						{{item.statusStr}}
					</view>
					<view style="color: red; font-size: 14px;">
						{{item.isOvertime==false?"":"入库超90天"}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="noSearch" v-show="isshow">
			暂无信息
		</view>
	</view>
</template>

<script>
	import {getProducts,getDetails} from "../../../server/index/carMangement/getProducts.js"
	export default {
		data() {
			return {
				searchValue:"",//输入框获取的值
				searchData:[],//搜索的数组
				isSearchValue:false,//文本框是否显示
				range: [],//开始结束日期
				products:[],//接口返回的数组
				seq:"", //接口返回的seq值
				candidates: [],//仓库数组
				keyWord:"",
				startTime:"",
				endTime:"",
				storeName:"",
				storeId:"",
				isshow:false,
				info:[],
			}
		},
		onLoad() {
			this.productsInfo()
			this.getInfo()
		},
		onPullDownRefresh() {
			getProducts(this.keyWord,this.startTime,this.endTime,this.storeId).then(res=>{
				this.searchData = res.data
				if(res.data.length == 0 ) {
					this.isshow = true
				}else {
					this.isshow = false
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
			//获取商品清单信息
			productsInfo() {
				getProducts(this.keyWord,this.startTime,this.endTime,this.storeId).then(res=>{
					this.searchData = res.data
					if(res.data.length == 0 ) {
						this.isshow = true
					}else {
						this.isshow = false
					}
				})
			},
			
			// 获取信息
			getInfo() {
				uni.getStorage({
					key:"content",
					success: (res=>{
						this.info = res.data.detailList
						// console.log(this.info)
						this.candidates.push({"storeName":"全部"})
						this.candidates.push(this.info[0])
						// console.log(this.candidates,"shuzu")
					})
				})
			},
			// 日期选择
			change(e) {
				this.range = e
			},
			//搜索框提示弹框
			searchbar(res) {
				uni.showToast({
					title:res.value
				})
			},
			//清除搜索提示
			clear() {
				this.isshow = false
			},
			//车辆信息模糊搜索
			input(res) {
				this.keyWord = res
				this.productsInfo()
			},
			//仓库选择
			selectware(e) {
				// console.log(e,"e")
				this.storeId = this.candidates[1].storeId
				this.productsInfo()
			},
			//点击跳转详情页
			setValue(seq) {
			//定义需要传的参数数据
				getDetails(seq).then( res => {
					if(res.status == 0) {
						//详情页跳转
						uni.navigateTo({
							url: `./productDetail?seq=${seq}`,
						});
					}
				})
				// //详情页跳转
				// uni.navigateTo({
				// 	url:`./productDetail`
				// })
			},
		},
		watch: {
			range(val) {
				this.startTime = val[0]
				this.endTime = val[1]
				this.productsInfo()
			}
		}
	}
</script>

<style scoped>
.carMangement {
	background-color: #eee;
}
.search {
	font-size: 28rpx;
	line-height: 50rpx;
}
.searchCen {
	background-color: #fff;
	margin-top: 10rpx;
}
.productItem {
	background-color: #fff;
	margin-top: 10rpx;
	padding: 0 20rpx;
}
.productItem-line {
	border-bottom: 1px solid #ccc;
	display: flex;
	align-items: center;
	padding: 20rpx;
	justify-content: space-around;
}
/* .product-img {
	width: 200rpx;
}
.product-img .product-image{
	width: 100rpx;
	height: 100rpx;
	margin-left: 40rpx;
	vertical-align: bottom;
} */
.productCon {
	width: 520rpx;
	padding-left: 40rpx;
}
.product-status {
	width: 180rpx;
	text-align: center;
	color: #000;
}
.noSearch{
	background-color: #fff;
	text-align: center;
}
</style>
