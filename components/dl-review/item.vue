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
						<faicon type="thumbs-o-up" color="gray" size="12" ></faicon>
						<text > 9999+</text>
					</view>
					<view class="iconBadge">
						<faicon type="thumbs-o-down" color="gray" size="12" ></faicon>
						<text > 9999+</text>
					</view>
					<view class="iconBadge ">
						<!-- <faicon type="reply" color="gray" size="12" ></faicon> -->
						<text > 回复</text>
					</view>
				</view>
				<view class="threeReviewContent" @click="openChildReview(reviewMsg)" v-if="reviewMsg.reviewLess.length">
					<view class="threeReviewVueText" v-for="(reKey, key) in reviewMsg.reviewLess" :key="key">
						{{reKey.userName}}
						<text class="defaultBlack">回复</text>
						{{reKey.targetUserName}}
						<text class="defaultBlack textSendMsg">:{{reKey.sendMsg}}</text>
						
						<view class="viewMb iconRow">
							<!-- <text class="cenHostMsg3 textCenMsg">#{{reviewMsg.floorId}}</text> -->
							<text class="iconBadge cenHostMsg4 textCenMsg">{{reviewMsg.sendTime}}</text>			
							<view class="iconBadge">
								<faicon type="thumbs-o-up" color="gray" size="12" ></faicon>
								<text > 9999+</text>
							</view>
							<view class="iconBadge">
								<faicon type="thumbs-o-down" color="gray" size="12" ></faicon>
								<text > 9999+</text>
							</view>
							<view class="iconBadge ">
								<!-- <faicon type="reply" color="gray" size="12" ></faicon> -->
								<text > 回复</text>
							</view>
						</view>
					</view>
					<view class="reviewNumContent" v-if="reviewMsg.reviewNum > 3">
						<text>共{{reviewMsg.reviewNum}}条回复 </text> <faicon type="angle-right" color="#5090cd" class="faicon"></faicon>
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import faicon from "../fa-icon/fa-icon.vue"
	export default {
		name: 'review',
		props: {
			reviewMsg: [Object],
			childData: [Array]
		},
		components: {
		},
		data() {
			return {
				crControl: false
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
			}
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
		top: 0px;
		background-color: #F9F9F9;
		display: flex;
		flex-direction: column;
	}

	.headImg {
		width: 90px;
		height: 90px;
		border-radius: 90px;
	}

	.textSendMsg {
		font-size: 28px;
		word-wrap: break-word;
	}

	.textSize {
		font-size: 26px;
		color: #808080;
		margin-right: 20px;
	}

	.textCenMsg {
		color: #999999;
		font-size: 24px;
	}

	.defaultBlack {
		color: #000000;
	}

	.viewMb-space-between {
		display: flex;
		justify-content: space-between;
	}

	.viewMb {
		/* margin-bottom: 5px; */
	}

	.followText {
		font-size: 28px;
		color: #fa7298;
		/* margin-right: 16px; */
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
		/* border-bottom: 1px solid #F2F2F2; */
		margin: 10px 0px;
	}

	.cenHostMsgContent {
		width: calc(100% - 100px);
		margin: 0px 0px 0px 10px;
	}

	.cenHeadImgContent {
		height: 100%;		
		/* margin: 20px 0px 0px 30px; */
	}

	.cenHostMsg1 {}

	.cenHostMsg2 {
		background-color: #ff6d00;
		color: #FFFFFF;
		font-size: 20px;
	}

	.cenHostMsg3 {
		color: #999999;
		margin-right: 20px;
	}

	.cenHostMsg4 {
		color: #999999;
	}

	.iconRow {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: baseline;
		/* margin-top: 10px; */
	}
	.iconRow .iconBadge {
		display: flex;
		flex-direction: row;
		/* justify-content: space-around; */
		padding-right: 20px;
		align-items: baseline;
		font-size: 0.8em;
	}
	.iconRow .iconBadge text {
		padding-left: 5px;
		color: gray;
	}
	
	.threeReviewContent {
		background-color: #f1f1f1;
		/* margin-top: 20px; */
		/* margin-bottom: 20px; */
		padding: 16px;
	}

	.threeReviewVueText {
		font-size: 28px;
		color: #5090cd;
		/* margin: 16px; */
	}

	.reviewNumContent {
		color: #5090cd;
		font-size: 24px;
		/* margin-left: 16px; */
		display: flex;
		align-items: center;
		
	}
	.reviewNumContent .faicon{
		padding-left: 10upx;
	}
</style>
