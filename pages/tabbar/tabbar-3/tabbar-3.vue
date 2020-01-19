<template>
	<!-- <scroll-view> -->
	<view class="content" :class="{'active':active}">
		<image class="logo" :class="{'active':active}" src="/static/img/logo.png"  mode="aspectFit"></image>
		<view class="tabbar-box-wrap">
			<view  class="tabbar-box">
			<scroll-view scroll-y="true" class="scroll-box">
				<view class="tabbar-box-list" >
				<view class="tabbar-box-item" @click="goToPage('/pages/tabbar-3-detial/tabbar-3-release/tabbar-3-release')">
					<image class="box-image" src="/static/img/tabbar/newsactive.png" mode="aspectFit"></image>
					<text class="explain">带饭</text>
				</view>
				<view class="tabbar-box-item" @click="goToPage('/pages/tabbar-3-detial/tabbar-3-video/tabbar-3-video')">
					<image class="box-image" src="/static/img/tabbar/guanzhuactive.png" mode="aspectFit"></image>
					<text class="explain">打热水</text>
				</view>
				<view class="tabbar-box-item" @click="goToPage('/pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa')">
					<image class="box-image" src="/static/img/video.png" mode="aspectFit"></image>
					<text class="explain">修电脑</text>
				</view>
				<view class="tabbar-box-item" @click="goToPage('/pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa')">
					<image class="box-image" src="/static/img/qa.png" mode="aspectFit"></image>
					<text class="explain">聊天</text>
				</view>
				<view class="tabbar-box-item" @click="goToPage('/pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa')">
					<image class="box-image" src="/static/img/release.png" mode="aspectFit"></image>
					<text class="explain">快递</text>
				</view>
				<view class="tabbar-box-item" @click="goToPage('/pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa')">
					<image class="box-image" src="/static/img/tabbar/me.png" mode="aspectFit"></image>
					<text class="explain">摄影师</text>
				</view>
				<view class="tabbar-box-item" @click="goToPage('/pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa')">
					<image class="box-image" src="/static/img/tabbar/me.png" mode="aspectFit"></image>
					<text class="explain">路人</text>
				</view>
				<view class="tabbar-box-item" @click="goToPage('/pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa')">
					<image class="box-image" src="/static/img/tabbar/meactive.png" mode="aspectFit"></image>
					<text class="explain">专业演员</text>
				</view>
				<view class="tabbar-box-item" @click="goToPage('/pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa')">
					<image class="box-image" src="/static/img/tabbar/add.png" mode="aspectFit"></image>
					<text class="explain">更多</text>
				</view>
				</view>
			</scroll-view>
			</view>
		</view>
		</view>
	<!-- </scroll-view> -->
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"

export default {
	data() {
		return {
			active: false
		};
	},
	components:{
		uniIcons,
		},
	onLoad() {},
	onShow() {
		// setTimeout(() => {
		this.active = true;
		// }, 500);
	},
	onHide() {
		this.active = false;
	},
	methods: {
		goToPage(url) {
			if (!url) return;
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	/* #ifdef H5 */
	height: calc(100vh - var(--window-bottom) - var(--window-top));
	/* #endif */
	/* #ifndef H5 */
	height: 100vh;
	/* #endif */
	transition: opacity 0.3s;
	background: #999;
	opacity: 0;
	&.active {
		opacity: 1;
	}
	.logo {
		position: relative;
		margin-top: -400upx;
		width: 200upx;
		height: 200upx;
		// z-index: -1;
		opacity: 0;
		transition: opacity 0.3s;
		&.active {
			opacity: 1;
		}
	}
}
.tabbar-box-wrap {
	position: absolute;
	width: 100%;
	padding: 50upx;
	box-sizing: border-box;
	bottom: 0;
	left: 0;
	.scroll-box{
		position: relative;
		z-index: 2;
		min-height: 100upx;
		max-height: calc(100vh - var(--window-bottom) - var(--window-top) - 100upx);
	};	
	.tabbar-box-list{
		// position: relative;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
	}
	.tabbar-box {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		width: 100%;
		background: #fff;
		border-radius: 20upx;
		padding: 15upx 20upx;
		box-sizing: border-box;
		z-index: 2;
		box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1);
		&:after {
			content: '';
			position: absolute;
			bottom: -16upx;
			left: 0;
			right: 0;
			margin: auto;
			width: 50upx;
			height: 50upx;
			transform: rotate(45deg);
			background: #fff;
			z-index: 1;
			box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1);
			border-radius: 2px;
		}
		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: #ffffff;
			border-radius: 20upx;
			z-index: 2;
		}
		.tabbar-box-item {
			position: relative;
			width: 100%;
			width: 180upx;
			z-index: 3;
			margin: 10upx;
			color: $uni-color-subtitle;
			text-align: center;
			font-size: $uni-font-size-base;
			.box-image {
				width: 100%;
				height: $uni-img-size-lg;
			}
		}
	}
}
</style>
