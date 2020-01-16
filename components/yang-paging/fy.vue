<template>
		<view style="width: 100%;">
			<view class="fy">
				<span @click="qy(-1)" :style="{background:background,color:color}">
					首页
				</span>
				<span v-for="(item,index) in page" :key="index" @click="qy(index)" :style="{background:HN_back(index),color:HN_color(index)}">
					{{item}}
				</span>
				<span @click="qy(-2)" :style="{background:background,color:color}">
					尾页
				</span>
			</view>
			<view class="btn-view" v-if="footer">
				<view>
					当前页：{{ current1 }}，数据总量：{{ total }}条，每页数据：{{ pageSize }}
				</view>
			</view>
		</view>
</template>
<script>
	export default {
		name: 'paging',
		props: {
			total: {
				type: Number,
				default: 0
			},
			pageSize: {
				type: Number,
				default: 0
			},
			footer: {
				type: Boolean,
				default: false
			},
			current: {
				type: Number,
				default: 1
			},
			background: {
				type: String,
				// default: "white"
			},
			color: {
				type: String,
				default: "black"
			},
			activebackground: {
				type: String,
				// default: "white"
			},
			activecolor: {
				type: String,
				default: "silver"
			}
		},
		data() {
			return {
				page: [],
				zpage: 0,
				current1: this.current
			}
		},
		created() {
			this.jx()
		},
		watch: {
			total() {
				this.jx();
			},
			pageSize() {
				this.jx()
			}
		},
		methods: {
			jx() {
				let that = this
				let total = parseInt(that.total)
				let pageSize = parseInt(that.pageSize)
				let zpage = parseInt(total / pageSize)
				if (total / pageSize > zpage) {
					zpage++
				}
				that.zpage = zpage
				let arr = []
				if (zpage < 5) {
					for (let i = 1; i <= zpage; i++) {
						arr.push(i)
					}
				} else {
					arr = [1, 2, 3, 4, 5]
				}
				that.page = arr
			},
			HN_back: function(e) {
				let a = this.current1 == this.page[e] ? this.activebackground : this.background;
				return a;
			},
			HN_color: function(e) {
				let a = this.current1 == this.page[e] ? this.activecolor : this.color;
				return a;
			},
			qy: function(e) {
				let that = this
				switch (e) {
					case -1:
						e = 1;
						break;
					case -2:
						e = that.zpage;
						break;
					default:
						e = that.page[e];
				}
				that.current1 = e;
				that.$emit("changes", e);
				let total = parseInt(that.total)
				let pageSize = parseInt(that.pageSize)
				let zpage = parseInt(total / pageSize)
				console.log(zpage)
				if (total / pageSize > zpage) {
					zpage++
				}
				let arr = []
				if (zpage < 5) {
					return
				}
				if (e >= zpage - 2) {
					arr = [zpage - 4, zpage - 3, zpage - 2, zpage - 1, zpage]
					that.page = arr
					return
				}
				if (zpage > 5 && e < 4) {
					arr = [1, 2, 3, 4, 5]
					that.page = arr
					return
				}
				if (zpage > 5 && e > 3) {
					arr = [e - 2, e - 1, e, e + 1, e + 2]
					that.page = arr
					return
				}
			}
		},
		onLoad() {

		}
	}
</script>
<style>
	@charset "UTF-8";

	.fy {
		display: flex;
		flex-direction: row;
		margin: auto;
		width: 100%;
		/* margin-top: 50upx; */
		/* text-align: center; */
		justify-content: space-around;
	}

	.fy span {
		/* display: inline-block;
		width: 80upx;
		height: 80upx;
		line-height: 80upx;
		border-radius: 50%;
		margin-left: 20upx;	
		font-size: 26upx;	 */
		padding: 5upx;
		font-size: 0.8em;
	}

	.btn-view {
		margin-top: 20px;
	}
</style>
