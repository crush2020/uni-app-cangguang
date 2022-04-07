<template>
	<view class="password">
		<view style="background-color: #FFFFFF;height: 200px;padding-top: 10px;">
			<view class="old-password">
				<view class="titile">
					姓名：
					<!-- <image style="width: 20px;height: 20px;" src="../../static/personalManagement/user.png"></image> -->
				</view>
				<view class="title-input">
					<input disabled v-model="userinfo.userName" placeholder="请输入真实姓名" />
				</view>
			</view>
			<view class="old-password">
				<view class="titile">
					电话：
					<!-- <image style="width: 20px;height: 20px;" src="../../static/personalManagement/user.png"></image> -->
				</view>
				<view class="title-input">
					<input disabled v-model="userinfo.tel" type='text' placeholder="请输入电话号码" />
				</view>
			</view>
			<view class="old-password">
				<view class="titile">
					公司：
					<!-- <image style="width: 20px;height: 20px;" src="../../static/personalManagement/user.png"></image> -->
				</view>
				<view class="title-input">
					<input disabled v-model="userinfo.company" placeholder="所属公司" />
				</view>
			</view>
			<view class="old-password">
				<view class="titile">
					门店：
					<!-- <image style="width: 20px;height: 20px;" src="../../static/personalManagement/password.png"></image> -->
				</view>
				<view class="title-input">
					<input disabled v-model="userinfo.company" placeholder="所属门店" />
				</view>
			</view>
			<view class="old-password">
				<view class="titile">
					门店信息：
				</view>
				<view class="title-input">
					<image style="width: 200px;height: 200px;" :src="imgSrc"></image>
				</view>
			</view>
<!-- 			<view class="pass-select">
				<view style="margin-right: 10px;">
					<CancelButton></CancelButton>
				</view>
				<view>
					<Surebutton></Surebutton>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import Surebutton from "../../components/global/Surebutton.vue"
	import CancelButton from "../../components/global/CancelButton.vue"
	import formalURL from "../../util/image.js"
	export default {
		components: {
			Surebutton,
			CancelButton
		},
		data() {
			return {
				userinfo: {},
				userName: '',
				tel: null,
				imgSrc: ""
			}
		},
		onLoad() {
			this.userinfo = uni.getStorageSync('userinfo');
			this.imgSrc = formalURL + this.userinfo.picPath
		},
		methods: {

		}
	}
</script>

<style>
	.password {
		height: 100vh;
		padding-top: 1px;
	}

	.old-password {
		display: flex;
		align-items: center;
		padding: 10px 20px;
		border-bottom: 1px solid #e8e6e6;
		margin: 0 10px;
		margin-bottom: 30px;
	}

	.title-input {
		width: 70%;
	}

	.select {
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pass-select {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
