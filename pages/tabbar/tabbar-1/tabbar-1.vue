<template>
	<view class="container uni-flex uni-column">
		<!-- <view class="uni-center">任务大厅</view> -->
		<uni-search-bar placeholder="搜索感兴趣的任务" @confirm="search" @input="intput" />
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" >
			<swiper-item v-for="(task, index) in adtasks" :key="task.id">
				<view class="swiper-item">
					<image :src="task.icon" mode="aspectFit" class="swiper-icon"></image>
				</view>
			</swiper-item>
		</swiper>
		
		<scroll-view scroll-y="true" class="uni-list-cell" hover-class="uni-list-cell-hover" >
			<view class="uni-media-list" v-for="(task,index) in tasks"
		 :key="task.id">
				<view class="uni-media-list-logo">
					<image :src="task.icon" mode=""></image>
				</view>
				<view class="uni-media-list-body">
					<view class="uni-media-list-text-top"> <uni-icons :type="task.event_icon" color="pink"></uni-icons>{{task.title}} </view>
					<view class="uni-media-list-text-bottom uni-ellipsis flex-row-between">
					{{task.author}}
					<view class=""> {{task.created}}</view> </view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				title: 'Hello',
				adtasks: [{
					id: 1,
					icon: '/static/shuijiao.jpg',
				},{
					id: 2,
					icon: '/static/nav.png',
				}],
				tasks: [{
					id: 1,
					icon: '/static/shuijiao.jpg',
					event_icon: 'camera',
					title: '拍照（限女生）',
					detail: '请到A110寝室',
					author: '李子柒',
					created: '202001061626',
					updated: '202001061637',
					finished: '202001062233',
				},{
					id: 2,
					icon: '/static/uni.png',
					event_icon: 'weibo',
					title: '打热水（限女生）',
					detail: '送到A110寝室',
					author: '宋婵',
					created: '202001061626',
					updated: '202001061637',
					finished: '202001062233',
				},{
					id: 3,
					icon: '/static/nav.png',
					event_icon: 'location',
					title: '提行李',
					detail: '送到A110寝室',
					author: '王珺',
					created: '202001061626',
					updated: '202001061637',
					finished: '202001062233',
				}]
			};
		},
		components: {
			uniSearchBar,
			uniIcons,
		},
		onLoad() {},
		methods: {
			intput: function(el) {
				console.log('input', el.value);
				return el;
			},
			search: function(el) {
				console.log('search', el.value);
				return el;
			}
		}
	};
</script>

<style>
	.content {
		text-align: center;
		/* ali */
		height: 400upx;
		margin-top: 200upx;
	}
	.uni-media-list{
		padding: 16rpx;
	}
	swiper {
		padding: 0rpx 16rpx;
	}
	.swiper-item .swiper-icon {
		 /* padding: 20upx 20upx; */
		width: 100%;
		/* justify-content: center; */
	}
	
	.flex-row-between{
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: baseline;
	}
</style>
