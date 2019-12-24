<template>
  <!-- <el-row :gutter="0">
    <el-col :span="6" v-for="(item) in list1" :key="item">
      <div class="movie">
        <a href="http://www.baidu.com">
          <div class="img-container" :style="'background-image: url('+item['moviePoster']+');'">
            <div style class="gray">
              <div class="info">{{item['movieTitle']}}</div>
            </div>
          </div>
        </a>
      </div>
  </el-col>
  </el-row>-->
  <div class="root">
    <div v-for="(item, i) in list1" :key="i" class="movie">
      <a target="_blank" :href="item['movieLink']">
        <div class="img-container" :style="'background-image: url(' + item['moviePoster'] + ');'">
          <!-- <img :src="item['moviePoster']" alt /> -->
          <div style class="gray">
            <div class="info">{{ item["movieTitle"] }}</div>
          </div>
        </div>
      </a>
    </div>
    <div
      class="movie"
      v-for="(n, j) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15]"
      :key="'-' + j"
      style="margin:0 20px"
    >
      <a href>
        <div class="img-container" style="height:0px">
          <div style class="gray"></div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list1: []
    };
  },
  created() {
    this.axios.get("http://127.0.0.1:3000/movielist").then(response => {
      // console.log(response);
      this.list1 = response.data;
    });
  }
};
</script>
<style lang="scss" scoped>
// .movie {
//   margin: 20px 0px;
//   a {
//     position: relative;
//     // img {
//     //   width: 130px;
//     //   border-radius: 4px;
//     // }
//     .img-container {
//       margin: auto;
//       height: 178.75px;
//       width: 130px;
//       border-radius: 4px;
//       background-size: 100% 100%;
//       .gray {
//         position: relative;
//         height: 50%;
//         top: 50%;
//         height: 50%;
//         background: linear-gradient(#00000000, #000000b0);
//         .info {
//           font-size: 14.5px;
//           text-align: left;
//           color: #fff;
//           padding-top: 65px;
//           padding-left: 5px;
//           // background: gray;
//         }
//       }
//     }
//   }
// }
.root {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.movie {
  margin: 20px 20px;
  flex-grow: 1; /* default 0 */
  a {
    position: relative;
    // img {
    //   width: 130px;
    //   border-radius: 4px;
    // }
    .img-container {
      margin: auto;
      height: 178.75px;
      width: 130px;
      border-radius: 4px;
      background-size: 100% 100%;
      .gray {
        position: relative;
        height: 50%;
        top: 50%;
        height: 50%;
        background: linear-gradient(#00000000, #000000b0);
        .info {
          font-size: 14.5px;
          text-align: left;
          color: #fff;
          position: absolute;
          padding-left: 5px;
          left: 0;
          bottom: 0;
          // padding-top: 65px;
          // background: gray;
        }
      }
    }
  }
}
</style>
