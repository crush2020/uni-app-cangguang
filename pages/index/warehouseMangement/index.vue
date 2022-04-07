<template>
	<view class="warehouseMangement">
		<view class="wareLine" v-if="wareList.length" v-for="item in wareList" :key="item.id">
			<view class="ware-name">{{item.name}}</view>
			<view class="more">...</view>
		</view>
		<button class="addStore" @click="open">新建仓库</button>
		<uni-popup ref="popup" type="center">
			<view class="popup-window">
				<view class="warename">
					<input class="wareValue" value="" type="text" placeholder="请输入仓库名" v-model="wareName"/>
				</view>
				<view class="btnBox">
					<button class="cancel" @click="close">取消</button>
					<button class="confirm" @click="confirm">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wareList: [
					{id:1,name:"仓库1号"},
					{id:2,name:"仓库2号"}, 
					{id:3,name:"仓库3号"},
				], //仓库数据
				wareName: "" ,//输入的仓库名
			}
		},
		onReady() {},
		methods: {
			//打开弹出层
			open() {
				this.wareName = ""
				this.$refs.popup.open('center')
			},
			//关闭弹出层
			close() {
				this.wareName == ""
				this.$refs.popup.close()
			},
			//输入正确的仓库名并确认
			confirm() {
				if(this.wareName == "") {
					uni.showToast({
						title:"输入的内容不能为空",
						icon:"none"
					})
				} else {
					this.wareList.push({
						name: this.wareName
					})
				};
				this.$refs.popup.close()
				this.wareName = ""
			}
		}
	}
</script>

<style scoped>
.warehouseMangement {
	padding: 0 20rpx;
}
.wareLine {
	display: flex;
	padding: 20rpx;
	border-bottom: 1px solid #C0C0C0
}
.ware-name {
	width: 620rpx;
}
.more {
	width: 50rpx;
}
.addStore {
	margin-top: 100rpx;
	width: 500rpx;
	background-color: red;
	color: #fff;
}
.popup-window {
	width: 450rpx;
	height: 400rpx;
	border-radius: 40rpx;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.warename {
	margin-top: 120rpx;
}
.wareValue {
	width: 360rpx;
	border:1px solid #ccc;
	padding: 10rpx 0;
	border-radius: 10rpx;
}
.btnBox {
	width: 420rpx;
	display: flex;
	justify-content: space-between;
	margin-top: 60rpx;
}
.confirm {
	width: 150rpx;
	color: #fff;
	background-color: red;
}
.cancel {
	width: 150rpx;
	background-color: #fff;
}
</style>
