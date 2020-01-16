<template>
	<view class="icontent">
		<view class="cenHost">
			<view class="cenHeadImgContent">
				<image class="headImg" :src="reviewMsg.headImgSrc"></image>
			</view>
			<view class="cenHostMsgContent">
				<view class="viewMb viewMb-space-between">
					<view>
						<text class="textSize">{{reviewMsg.userName}}</text>
						<text class="textCenMsg cenHostMsg2">LV{{reviewMsg.userLevel}}</text>
					</view>
					<view>
						<text class="followText">+ 关注</text>
					</view>
				</view>
				<view class="cenHostReview viewMb">
					<text class="textSendMsg">{{reviewMsg.sendMsg}}</text>
				</view>
				<view class="viewMb iconRow">
					<!-- <text class="cenHostMsg3 textCenMsg">#{{reviewMsg.floorId}}</text> -->
					<text class="iconBadge cenHostMsg4 textCenMsg">{{reviewMsg.sendTime}}</text>
					<view class="iconBadge">
						<faicon type="thumbs-o-up" color="gray" size="12"></faicon>
						<text class="badgeText"> 9999+</text>
					</view>
					<view class="iconBadge">
						<faicon type="thumbs-o-down" color="gray" size="12"></faicon>
						<text class="badgeText"> 9999+</text>
					</view>
					<view class="iconBadge ">
						<!-- <faicon type="reply" color="gray" size="12" ></faicon> -->
						<text class="badgeText"> 回复</text>
					</view>
				</view>
				<view class="threeReviewContent" @click="openChildReview(reviewMsg)" v-if="reviewMsg.reviewLess.length">
					<view v-show="reviewMsg.loadxx">
						<faicon type="spinner" size="12" class="center1" spin></faicon>
					</view>
					<template >
						<view class="threeReviewVueText" v-for="(reKey, key) in reviewMsg.reviewLess" :key="key">
							{{reKey.userName}}
							<text class="defaultBlack">回复</text>
							{{reKey.targetUserName}}
							<text class="defaultBlack textSendMsg">:{{reKey.sendMsg}}</text>
							<view class="viewMb iconRow">
								<!-- <text class="cenHostMsg3 textCenMsg">#{{reviewMsg.floorId}}</text> -->
								<text class="iconBadge cenHostMsg4 textCenMsg">{{reKey.sendTime}}</text>
								<view class="iconBadge">
									<faicon type="thumbs-o-up" color="gray" size="12"></faicon>
									<text> 9999+</text>
								</view>
								<view class="iconBadge">
									<faicon type="thumbs-o-down" color="gray" size="12"></faicon>
									<text> 9999+</text>
								</view>
								<view class="iconBadge ">
									<faicon type="comments-o" color="gray" size="12"></faicon>
									<text> 查看对话</text>
								</view>
								<view class="iconBadge ">
									<!-- <faicon type="reply" color="gray" size="12" ></faicon> -->
									<text> 回复</text>
								</view>
							</view>
						</view>
					</template>
					<template v-if="reviewMsg.reviewNum > 3">
						<view v-if="!showPages" class="reviewNumContent" @click="getMore">
							<text>共{{reviewMsg.reviewNum}}条回复 </text>
							<faicon type="angle-right" color="#5090cd" class="icon-more"></faicon>
						</view>
						<view v-else class="paging-border">
							<paging color="gray" :total="reviewMsg.reviewNum" :pageSize='pageSize' :current="1" @changes="switchPage"></paging>
						</view>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import faicon from "../fa-icon/fa-icon.vue"
	import paging from '@/components/yang-paging/fy.vue'

	export default {
		name: 'reviewitem',
		props: {
			reviewMsg: [Object],
		},
		components: {
			faicon,
			paging,
		},
		data() {
			return {
				crControl: false,
				showPages: false,
				pageSize: 10,
			}
		},
		onLoad() {

		},
		methods: {
			openChildReview(item) {
				this.crControl = true;
				this.$emit('childReview', item);
			},
			closeCr() {
				this.crControl = false;
			},
			getMore() {
				this.showPages = true;
				this.switchPage(1);
			},
			switchPage(index) {
				this.$emit('requestMore', this.reviewMsg.id, this.pageSize * (index - 1), this.pageSize * index);
				this.$nextTick(function() {	
					console.log(this.reviewMsg.loadxx);
				})
			},
		}
	}
</script>

<style>
	.cenHost-Content {
		position: relative;
		width: 100%;
	}

	.childReview {
		position: absolute;
		margin: auto;
		width: 100%;
		height: 100%;
		top: 0rpx;
		background-color: #F9F9F9;
		display: flex;
		flex-direction: column;
	}

	.headImg {
		width: 90rpx;
		height: 90rpx;
		border-radius: 90rpx;
	}

	.textSendMsg {
		font-size: 28rpx;
		word-wrap: break-word;
	}

	.textSize {
		font-size: 26rpx;
		color: #808080;
		margin-right: 20rpx;
	}

	.textCenMsg {
		color: #999999;
		font-size: 24rpx;
	}

	.defaultBlack {
		color: #000000;
	}

	.viewMb-space-between {
		display: flex;
		justify-content: space-between;
	}

	.viewMb {
		/* margin-bottom: 5rpx; */
	}

	.followText {
		font-size: 28rpx;
		color: #fa7298;
		/* margin-right: 16rpx; */
	}

	.icontent {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* background-color: #F9F9F9; */
	}

	.cenHost {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		/* border-bottom: 1rpx solid #F2F2F2; */
		margin: 10rpx 0rpx;
	}

	.cenHostMsgContent {
		width: calc(100% - 100rpx);
		margin: 0rpx 0rpx 0rpx 10rpx;
	}

	.cenHeadImgContent {
		height: 100%;
		/* margin: 20rpx 0rpx 0rpx 30rpx; */
	}

	.cenHostMsg1 {}

	.cenHostMsg2 {
		background-color: #ff6d00;
		color: #FFFFFF;
		font-size: 20rpx;
	}

	.cenHostMsg3 {
		color: #999999;
		margin-right: 20rpx;
	}

	.cenHostMsg4 {
		color: #999999;
	}

	.iconRow {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: baseline;
		/* margin-top: 10rpx; */
	}

	.iconRow .iconBadge {
		display: flex;
		flex-direction: row;
		/* justify-content: space-around; */
		padding-right: 20rpx;
		align-items: baseline;
		font-size: 0.7em;
		color: gray;
	}

	.iconRow .iconBadge .badgeText {
		padding-left: 5rpx;
	}

	.threeReviewContent {
		background-color: #f1f1f1;
		/* margin-top: 20rpx; */
		/* margin-bottom: 20rpx; */
		padding: 16rpx;
	}

	.threeReviewVueText {
		font-size: 28rpx;
		color: #5090cd;
		/* margin: 16rpx; */
	}

	.reviewNumContent {
		color: #5090cd;
		font-size: 24rpx;
		/* margin-left: 16rpx; */
		display: flex;
		align-items: center;

	}

	.reviewNumContent .icon-more {
		padding-left: 10urpx;
	}

	.paging-border {
		border-top: 1px solid silver;
		margin: 0 -16rpx
	}

	.center1 {
		/*文字‘|’居中*/
		display: flex;
		justify-content: center;
	}
</style>
