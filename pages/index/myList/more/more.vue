<template>
	<view class="more">
		<view class="more-item" v-for="(value,key) in list" :key='value'>
			<view class="item-title">
				{{ key | capitalize }}
			</view>
			<view class="item-conent">
				{{value == null?"":value}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: {}
			}
		},
		onLoad(options) {
			this.list = JSON.parse(options.listitem)
		},
		filters: {
			capitalize: function(value) {
				if(value == "busTypeStr") {
					return "申请类型"
				}
				if(value == "createTime") {
					return "申请时间"
				}
				if(value == "handleRemark") {
					return "备注"
				}
				if(value == "msg") {
					return "申请内容"
				}
				if(value == "statusStr") {
					return "状态"
				}
				if(value == "truckSeq") {
					return "车辆序列号"
				}
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.more {
		padding: 10px;
		padding-top: 0;
	}

	.more-item {
		padding: 10px;
		border-bottom: #d6d6d6 1px solid;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.item-conent {
		margin-left: 20px;
		width: 70%;
	}
</style>
