<template>
	<view class="content">
		<view v-if="contentstyle" class="trueContent" :style="contentstyle" @click="goPages">
			<view class="content-title">
					{{titile}}
			</view>
		</view>
		<view v-else class="falseContent" :style="contentstyle" @click="goPages">
			<view class="content-title">
				<view class="">
					{{titile}}
				</view>
				<view class="">
					<image style="width: 60px;height: 60px;" src="../../static/personalManagement/头像@1x.png"
						mode="scaleToFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			titile: {
				type:String,
				default: "账号解绑"
			},
			contentstyle: {
				type: Boolean,
				default: true
			},
			path: {
				type:String,
				default:'../../pages/personalManagement/index'
			}
		},
		methods: {
			goPages() {
				uni.navigateTo({
				    url: this.path
				});
			}
		}
	}
</script>

<style scoped>
.trueContent {
	background-image: url(../../static/personalManagement/content-image.png);
	height: 56px;
	display: flex;
	align-items: center;
	margin-bottom: 2px;
}
.falseContent {
	background-image: url(../../static/personalManagement/content-image.png);
	display: flex;
	align-items: center;
	background-size: 100% 100%;
	height: 80px;
	margin-bottom: 2px;
}
.content-title {
	width: 75%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-left: 20px;
}
</style>
