<template>
	<view class="sureBtn">
		<view class="sureBtn-box">
			{{titile}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			titile: {
				type: String,
				default: "确认"
			}
		}
	}
</script>

<style>
	.sureBtn {
		background-color: #07C160;
		color: #FFFFFF;
		border-radius: 4px;
		width: 120px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.sureBtn-box {
		font-size: 16px;
		font-family: sans-serif;
	}
</style>
