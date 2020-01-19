<template>
		<view class="">
		<movable-area class="drag-sort" :style="{height:boxHeight }" id="drag">
			<movable-view v-for="(item, index) in currentList" :key="item.value" :x="item.x" v-if="item.isShow === 1" :data-index="index"
			 @touchstart="touchstart" @touchmove.stop="touchmove" @touchend="touchend"  :y="item.y"
			 :direction="direction" disabled damping="40" :animation="item.animation" class="drag-sort-item"
			 :class="{'active': active == index, }">
				<view class="itembox" :style="{color: styleObject.color, background: styleObject.background}">
					<text class="itemtext">{{item.label}}</text>
					<view class="itemicon" v-if="closable"  >
						<faicon type="close" color="red" @click="close(index)"></faicon>
					</view>
				</view>
			</movable-view>
		</movable-area>
		</view>
</template>

<script>
	import faicon from "@/components/fa-icon/fa-icon.vue"
	// import _ from 'lodash'
	export default {
		name: 'drag-sort',
		mixins: [],
		components: {faicon,},
		data() {
			return {
				styleObject: this.boxStyle,
				direction: "all",
				currentList: [],
				active: -1, // 当前激活的item
				// index: 0, // 当前激活的item的原index
				// topY: 0, // 距离顶部的距离
				// topX: 0, // 距离左侧偏移位置
				// deviationX: 0,
				// deviationY: 0 // 偏移量
				moving: null,
			}
		},
		computed: {
			boxHeight() {
				return Math.ceil((this.list.length ) / 4) * this.height + 'px'
			}
		},
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			boxStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			closable: {
				type: Boolean,
				default: false
			},
			props: {
				type: Object,
				default: () => {
					return {
						label: 'label',
						value: 'value'
					}
				}
			}
		},
		watch: {
			list: {
				handler(value, old) {
					// debugger
					console.log('list:',value, old,);
					this.onUpdateCurrentList(value)
				},
				deep: true
			}
		},
		created() {
			const res = uni.getSystemInfoSync();
			this.windowWidth = res.windowWidth // dragArea width
			this.itemWidth = Math.floor( this.windowWidth / 5); // 20%
			this.itemSpace = Math.ceil( this.windowWidth / 25); // 4%
			this.height = 40; // item行高度
			console.log('list length when created:', this.list.length);
		},
		mounted() {},
		updated() {},
		filters: {},
		methods: {
			calcItemPosX(order){
				// 间隔4% * 5 + 宽20% * 4 = 100%
				let i = order % 4;
				return i * this.itemWidth + (i+1) * this.itemSpace;
			},
			calcItemPosY(order){
				return Math.floor (order / 4) * this.height;
			},
			onUpdateCurrentList(list = []) {
				let arr = []
				for (const k in list) {
					let key = Number(k)
					let x = this.calcItemPosX(key);
					let y = this.calcItemPosY(key);
					arr.push({
						label:list[key][this.props.label],
						value:list[key][this.props.value],
						isShow: 1,
						index: (key),
						SortNumber: (key),
						y,
						x,
						animation: true
					})
				}
				this.currentList = arr
			},
			// 根据排序进行重新计算位置
			moveUpdateCurrentList(activeOrder) {
				for (const i in this.currentList) {
					let key = this.currentList[i].SortNumber
					if (activeOrder == key){ // 移动中位置不固定
						continue
					}

					// debugger
					this.currentList[i].x = this.calcItemPosX(key)
					this.currentList[i].y = this.calcItemPosY(key)
				}
				if (activeOrder < 0) {
					this.$emit('change', this.currentList)
				}
			},
			_touchmove(e ){
				let dragAreaY = e.mp.touches[0].clientY - this.topY // 拖拽区的坐标系
				let dragAreaX = e.mp.touches[0].clientX - this.topX
				let touchY = dragAreaY - 20 // item top
				let touchX = dragAreaX - this.itemWidth / 2 // item left
				this.currentList[this.active].y = touchY
				this.currentList[this.active].x = touchX
				this.currentList[this.active].animation = false
				this.currentList.every((res, index) => {
					if (res.isShow == 0 || this.active == index){
						return true
					}

					// 设置元素定点距离多少进行重排
					let absX = Math.abs(touchX - res.x)
					let absY = Math.abs(touchY - res.y)
					if ( absX < 0 || absX > this.itemSpace || absY < 0 || absY > 15 ) {
						return true
					}

					// debugger
					let temNumber = res.SortNumber
					let move2big = this.currentList[this.active].SortNumber < res.SortNumber;
					this.currentList.forEach((_res, _index) => {
						if (_res.isShow == 0){
							return
						}

						// 判断从大像小移还是从小向大移
						if (move2big) {
							// 移动元素比目标元素所在位置小，之间元素排序--
							if (_res.SortNumber > this.currentList[this.active].SortNumber
							&& _res.SortNumber <= res.SortNumber) {
								_res.SortNumber--;
							}
						} else {
							// 反之++
							if (_res.SortNumber < this.currentList[this.active].SortNumber
							&& _res.SortNumber >= res.SortNumber) {
								_res.SortNumber++
							}
						}
					}, this)
					this.currentList[this.active].SortNumber = temNumber
					this.moveUpdateCurrentList(temNumber)
					return false
				}, this)
			},
			touchstart(e) {
				// 计算 x y 轴点击位置
				var query = uni.createSelectorQuery().in(this)
				query.select('#drag').boundingClientRect()
				query.exec((res) => {
					this.topY = res[0].top
					this.topX = res[0].left
					// let touchY = e.mp.touches[0].clientY - res[0].top
					// let touchX = e.mp.touches[0].clientX - res[0].left
					// this.deviationY = touchY % this.height
					// this.deviationX = touchX % (this.windowWidth * 0.2)
					this.active = Number(e.currentTarget.dataset.index)
					
					// 移动中减少计算频率
					this.moving = setInterval(()=>{
						if (this.movinge){
							this._touchmove(this.movinge)
						}
					},50)
				})
			},
			touchmove(e) {
				if (this.active < 0) return	
				this.movinge = e;
				
			},
			touchend(e) {
				this.movinge = null
				if (this.moving ){
					clearInterval(this.moving);
					this.moving = null;
				}
				
				if (this.currentList[this.active]) {
					this.currentList[this.active].animation = true
				}
				this.moveUpdateCurrentList(-1)
				this.active = -1
				
			},
			// 关闭按钮
			close(index) {
				// debugger
				uni.showToast({
					title: '点击删除'
				})
				console.log("我是删除的index ",index,"的SortNumber",  this.currentList[index].SortNumber, this.currentList[index].label)
				this.currentList.forEach((item, i) => {
					if (this.currentList[i].SortNumber > this.currentList[index].SortNumber) {
						item.SortNumber--
					}
				})

				this.currentList[index].SortNumber=this.currentList.length;
				this.currentList[index].isShow = 0
				this.moveUpdateCurrentList(-1)
			}
		}
	}
</script>

<style lang='less' scoped>

	.drag-sort {
		width: 100%;
	}

	.drag-sort-item {
		position: absolute !important;
		display: flex;
		height: 30px;
		align-items: center;
		width: 20%;
		text-align: center;
		/* background-color: #007aff; */
		/* color: #fff; */
		box-sizing: border-box;

		.itembox {
			position: relative;
			flex: 1;
			/* font-size: 16px; */
			height: 30px;
			flex-direction: row;
			border-radius: 10px;
		}
		.itemtext {
			flex: 1;
			align-self: center;
			font-size: 16px;
		}

		.itemicon {
		}

	}


	.active {
		border-radius: 10px;
		box-shadow: 0 0 20px #55aaff;
		z-index: 99;
	}
</style>
