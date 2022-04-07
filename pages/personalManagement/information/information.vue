<template>
	<view class="information">
		<view class="information-image">
			<Content :titile="'头像'" :contentstyle="contentstyle"></Content>
			<Content :titile="'地址管理'"></Content>
			<Content :titile="'电话管理'"></Content>
		</view>
	</view>
</template>

<script>
	import Content from "../../../components/personalManagement/Content.vue"
	export default {
		components: {
			Content
		},
		data() {
			return {
				contentstyle: false
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.information {
	background-color: #e8e6e6;
	height: 100vh;
	padding-top: 1px;
}
</style>
