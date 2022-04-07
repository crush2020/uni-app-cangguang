<template>
	<view class="cancelBtn">
		<view class="cancelBtn-box">
			{{titile}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			titile: {
				type: String,
				default: "取消"
			}
		}
	}
</script>

<style>
.cancelBtn {
	background-color: #e8e8e8;
	color: #07C160;
	border-radius: 4px;
	width: 120px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.cancelBtn {
	font-size: 17px;
	font-family: sans-serif;
}
</style>
