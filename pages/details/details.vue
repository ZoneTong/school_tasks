<template>
	<view class="content">
	
		<scroll-view class="scroll" scroll-y>
			<view class="scroll-content">
				<view class="introduce-section">
					<text class="title">{{detailData.title}}</text>
					<view class="introduce uni-flex">
						<text>{{detailData.author}}</text>
						<text>{{detailData.readCount}}阅读</text>
						<text>{{detailData.time}}</text>
					</view>
					
					<rich-text :nodes="detailData.flow"></rich-text>
					
					<view class="actions uni-flex" v-show="loading === false">
						<view class="action-item">
							<faicon type="thumbs-o-up" color="gray" size="20"></faicon>
							<text>75</text>
						</view>
						<view class="action-item">
							<faicon type="thumbs-o-down" color="gray" size="20"></faicon>
							<text>6</text>
						</view>
						<view class="action-item">
							<faicon type="heart" color="red" size="20"></faicon>
							<text>7</text>
						</view>
						<view class="action-item">
							<faicon type="share" color="gray" size="20"></faicon>
							<text>分享</text>
						</view>						
					</view>
				</view>
				
				<view class="container" v-show="loading === false">
					<!-- 推荐 -->
					<!-- <view class="s-header">
						<text class="tit">相关推荐</text>
					</view>
					<view class="rec-section" v-for="item in newsList" :key="item.id">
						<view class="rec-item">
							<view class="left ">
								<text class="title">{{item.title}}</text>
								<view class="bot ">
									<text class="author">{{item.author}}</text>
									<text class="time">{{item.time}}</text>
								</view>
							</view>
							<view class="right" v-if="item.images.length > 0">
								<image class="img" :src="item.images[0]" mode="aspectFill"></image>
							</view>
						</view>
					</view> -->
					
					<!-- 评论 -->
					<view class="s-header">
						<text class="tit">网友评论</text>
					</view>
					<view class="evalution">
						<!-- <view  v-for="(item, index) in evaList" :key="index"
							class="eva-item" >
							<image :src="item.src" mode="aspectFill"></image>
							<view class="eva-right">
								<text>{{item.nickname}}</text>
								<text>{{item.time}}</text>
								<view class="zan-box">
									<faicon type="thumbs-o-up" color="gray"></faicon>
									<text>{{item.zan}}</text>
								</view>
								<text class="content">{{item.content}}</text>
							</view>
						</view> -->
						
						<view v-for="(item,index) in reviewMsgs" :key="index" class="rec-section">
							<view class="rec-item">
								<reviewitem :reviewMsg="item" class="tview" @requestMore="moreChildrenReview"> </reviewitem>
							</view>
						</view>						
						<uni-load-more status="loading"></uni-load-more>
					</view>					
				</view>
				
				<!-- 加载图标 -->
				<mixLoading class="mix-loading" v-if="loading"></mixLoading>
			</view>
		</scroll-view>
		
		<view class="bottom uni-flex">
			<view class="input-box uni-flex">
				<faicon type="pencil" color="gray"></faicon>
				<input class="input" type="text" placeholder-style="color:#adb1b9;"	
					placeholder="点评一下吧..." />
			</view>
			<faicon type="thumbs-o-up" color="gray" size="20"></faicon>
			<faicon type="heart" color="red" size="20"></faicon>
			<faicon type="share" color="gray" size="20"></faicon>
		</view>
	</view>
</template>

<script>
	import json from '@/json';
	import mixLoading from '@/components/mix-loading/mix-loading';
	import faicon from '@/components/fa-icon/fa-icon.vue'
	import reviewitem from '@/components/dl-review/item.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
			UniLoadMore,
			mixLoading,
			faicon,
			reviewitem,
		},
		data() {
			return {
				loading: true,
				detailData: {},
				newsList: [],
				evaList: [],
				reviewMsgs: [],
			}
		},
		onLoad(options){
			// this.detailData = JSON.parse(options.data);
			this.detailData = {"id":4612,"title":"别再玩手机了，赶紧学前端，晚一年能少掉5根头发","author":"爱考过","time":"30分钟前","readCount": 50}
			this.loadNewsList();
			this.loadEvaList();
		},
		methods: {
			//获取推荐列表
			async loadNewsList(){
				let list = await json.newsList;
				setTimeout(()=>{
					list.sort((a,b)=>{
						return Math.random() > .5 ? -1 : 1; //静态数据打乱顺序
					})
					list.length = 5;
					list.forEach(item=>{
						this.newsList.push(item);
					})
					
					// this.detailData.flow = json.pageContent;
					this.loading = false;
				}, 800)
			},
			//获取评论列表
			async loadEvaList(){
				// this.evaList = await json.evaList;
				let arr = await json.reviewList;
				this.reviewMsgs = arr.map(item => {
					item.loadxx = false; return item
					});
			},			
			async moreChildrenReview(id, start, end){
				console.log(this, id, start, end)				
				this.reviewMsgs[id].loadxx = true;
				this.reviewMsgs[id].reviewLess = this.reviewMsgs[id].reviewLess.slice(start, end)
				this.reviewMsgs[id].loadxx = false;
			},
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.content{
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #fff;
	}
	.video-wrapper{
		height: 422upx;
		
		.video{
			width: 100%;
			height: 100%;
		}
	}
	.scroll{
		flex: 1;
		position: relative;
		background-color: #f8f8f8;
		height: 0;
	}
	.scroll-content{
		display: flex;
		flex-direction: column;
	}
	/* 简介 */
	.introduce-section{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		line-height: 1.5;
		
		.title{
			font-size: 36upx;
			color: #303133;
			margin-bottom: 16upx;
		}
		.introduce{
			display: flex;
			font-size: 26upx;
			color: #909399;
			text{
				margin-right: 16upx;
			}
		}
	}
	/* 点赞等操作 */
	.actions{
		display: flex;
		justify-content: space-around;
		align-items: center;
		line-height: 1.3;
		padding: 10upx 40upx 20upx;
	
		.action-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 24upx;
			color: #999;
		}
		.yticon{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 52upx;
			
			&.reverse{
				position: relative;
				top: 6upx;
				transform: scaleY(-1);
			}
			&.active{
				color: #ec706b;
			}
		}
		.icon-fenxiang2{
			font-weight: bold;
			font-size: 36upx;
		}
		.icon-shoucang{
			font-size: 44upx;
		}
	}

	.s-header{
		padding: 20upx 30upx;
		font-size: 30upx;
		color: #303133;
		background: #fff;
		margin-top: 16upx;
		
		&:before{
			content: '';
			width: 0;
			height: 40upx;
			margin-right: 24upx;
			border-left: 6upx solid #ec706b;
		}
	}
	/* 推荐列表 */
	.rec-section{
		background-color: #fff;
		.rec-item{
			display: flex;
			padding: 20upx 30upx;
			position: relative;
			&:after{
				content: '';
				position: absolute;
				left: 30upx;
				right: 0;
				bottom: 0;
				height: 0;
				// border-bottom: 1px solid #eee;
				transform: scaleY(50%);
			}
			.tview {
				width: 100% ;
			}
		}
		.left{
			flex: 1;
			padding-right: 10upx;
			overflow: hidden;
			position: relative;
			padding-bottom: 52upx;
			.title{
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				font-size: 32upx;
				color: #303133;
				line-height: 44upx;
			}
			.bot{
				position: absolute;
				left: 0;
				bottom: 4upx;
				font-size: 26upx;
				color: #909399;
			}
			.time{
				margin-left: 20upx;
			}
		}
		.right{
			width: 220upx;
			height: 140upx;
			flex-shrink: 0;
			position: relative;
			.img{
				width: 100%;
				height: 100%;
			}
			
		}
	}
	/* 评论 */
	.evalution{
		display:flex;
		flex-direction:column;
		background: #fff;
		padding: 20upx 0;
	}
	
	.eva-item{
		display:flex;
		padding: 20upx 30upx;
		position: relative;
		image{
			width: 60upx;
			height: 60upx;
			border-radius: 50px;
			flex-shrink: 0;
			margin-right: 24upx;
		}
		&:after{
			content: '';
			position: absolute;
			left: 30upx;
			bottom: 0;
			right: 0;
			height: 0;
			border-bottom: 1px solid #eee;
			transform: translateY(50%);
		}
		&:last-child:after{
			border: 0;
		}
	}
	.eva-right{
		display:flex;
		flex-direction:column;
		flex: 1;
		font-size: 26upx;
		color: #909399;
		position:relative;
		.zan-box{
			display:flex;
			align-items:base-line;
			position:absolute;
			top: 10upx;
			right: 10upx;
			text{
				margin-left: 8upx; 
			}
		}
		.content{
			font-size: 28upx;
			color: #333;
			padding-top:20upx;
		}
	}
	
	/* 底部 */
	.bottom{
		flex-shrink: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90upx;
		padding: 0 30upx;
		box-shadow: 0 -1px 3px rgba(0,0,0,.04); 
		position: relative;
		z-index: 1;
		
		.input-box{
			display: flex;
			align-items: center;
			// flex: 1;
			height: 60upx;
			background: #f2f3f3;
			border-radius: 100px;
			padding-left: 30upx;
			
			.icon-huifu{
				font-size: 28upx;
				color: #909399;
			}
			.input{
				padding: 0 20upx;
				font-size: 28upx;
				color: #303133;
			}
		}
		.confirm-btn{
			font-size: 30upx;
			padding-left: 20upx;
			color: #0d9fff;
		}
	}
</style>
