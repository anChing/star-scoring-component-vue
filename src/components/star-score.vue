<template name="starScore">
  <div v-if="!error" class="score">
    <div class="star">
      <!-- 点亮的星星 -->
      <div v-for="light in lightNum" :key="light + 'light'" class="iconfont icon-xingxing light-star" :style="light_style"></div>
      <!-- 半星 -->
      <div v-show="half_star" class="iconfont icon-xing3 half-star" :style="light_style "></div>
      <!-- 灰星 -->
      <div v-for="gray in grayNum" :key="gray + 'gray'" class="iconfont icon-xingxing gray-star" :style="gray_style "></div>
    </div>
    <div v-if="show_score" class="score-num" :style="num_style">
      {{score}}
    </div>
  </div>
  <div v-else class="error" @click="errorModle()">
    分数设置不规范，组件失效，请重新设置
  </div>
</template>

<script>
  // 引入弹窗文件
  let modlePack = require('../js/modlePack.js');
	export default {
		// 组件名配置（2/4）
		name: "starScore",
		data() {
			return {
				// 展示星星值
				half_star: false,
				lightNum: 0,
				grayNum: 0,

				// 不规范参数
				error: false,

				// 文字样式
				num_style: `color: ${this.score_color};
						   font-size: ${this.score_size}px;`,
				// 星星样式
				// 点亮部分样式
				light_style: `color: ${this.light_color};
							font-size: ${this.star_size}px`,
				// 灰色部分样式
				gray_style: `color: ${this.gray_color};
							font-size: ${this.star_size}px`,

			}
		},
		props: {
     		//===================接收的属性值，可以自己加
			// 实际分数
			score: {
				type: Number,
				default: 0
			},

			// 属性值
			// 最大分数
			maxScore: {
				type: Number,
				default: 5.0
			},
			// 星星个数
			starAllNum: {
				type: Number,
				default: 5
			},

			// ============星星
			// 是否展示半星
			show_half: {
				type: Boolean,
				default: true
			},
			// 星星大小(单位px)
			star_size: {
				type: Number,
				default: 8
			},
			// 点亮部分的颜色
			light_color: {
				type: String,
				default: '#FFFF00'
			},
			// 灰色部分的颜色
			gray_color: {
				type: String,
				default: '#F5f5f5'
			},


			// ============分值
			// 是否展示分值
			show_score: {
				type: Boolean,
				default: true
			},
			// 分数字体大小（px）
			score_size: {
				type: Number,
				default: 12
			},
			// 分数颜色颜色
			score_color: {
				type: String,
				default: '#F0AD4E'
			},
		},
		methods: {
			// 出错弹窗
			errorModle: function() {
        console.log(modlePack)
				modlePack.errModle("分数设置错误，组件失效，必须重新设置")
					.then(res => {console.log('11')})
					.catch(err => {
						console.log(err)
						this.errorModle();
					});
			}
		},
    // 组件创建的时候触发
		created(e) {
      console.log(this)
			let score = this.score;
			let maxScore = this.maxScore;
			let starAllNum = this.starAllNum;

			if (this.score > this.maxScore || this.score < 0) {
        this.error = true;
				this.$options.methods.errorModle();
			}else if(this.score == this.maxScore){
				// 达到最大值
				this.lightNum = this.starAllNum;
			}else if(this.score == 0 ){
				// 没有分数
				this.grayNum = this.starAllNum;
			}else {
				// 亮星个数 = 实际分数 / (最大分数/星星总数) ==> 然后取整
				// 一颗星几份 = is.maxScore / this.starAllNum
				// 实际占了几分 = this.score /
				let temp = this.score / (this.maxScore / this.starAllNum)
				let lightNum = parseInt(temp);
				this.lightNum = lightNum;

				// 半星个数
				if (this.show_half) {
					// 计算取整被抹去的数值
					let elseNum = temp - lightNum;
					// 计算数值上是否需要出现半星
					this.half_star = Boolean(elseNum >= 0.5);
				}

				// 灰星个数 = 全星 - 亮星 - 半星
				this.grayNum = this.starAllNum - lightNum - (this.half_star ? 1 : 0);
				console.log(this)
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*这里用到了iconfont, 没有导入的话星星显示不出来*/
    @import url("../css/iconfont.css");
  	/* 星星评分 */
  	.score .star {
  		display: inline-block;
  	}

  	.star .icon-xing3,
  	.star .icon-xingxing {
  		display: inline-block;
  		margin-right: 5rpx;
  		font-size: 8px;
  	}

  	.star .light-star {
  		color: #FFFF00;
  	}

  	.star .half-star {
  		color: #FFFF00;
  	}

  	.gray-star {
  		color: #F5f5f5;
  	}

  	.score-num {
  		display: inline-block;
  		font-size: 12px;
  		color: #F0AD4E;
  	}
</style>
