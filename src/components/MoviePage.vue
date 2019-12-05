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
      <a target="_blank" :href="'https://maoyan.com' + item['movieLink']">
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
      list1: [
        {
          movieTitle: "冰雪奇缘2",
          moviePoster:
            "https://p0.meituan.net/moviemachine/58ee13be6dc60bf5e636cf915bbbaaa55787785.jpg@160w_220h_1e_1c",
          movieLink: "/films/247949",
          movieDetail: "8.9"
        },
        {
          movieTitle: "两只老虎",
          moviePoster:
            "https://p0.meituan.net/moviemachine/19d48b1fd4f4af5c8c8e1c780a26fa431567220.jpg@160w_220h_1e_1c",
          movieLink: "/films/1277644",
          movieDetail: ""
        },
        {
          movieTitle: "利刃出鞘",
          moviePoster:
            "https://p0.meituan.net/movie/dd488887e8a1c8ab4723eee4026d25aa1973142.jpg@160w_220h_1e_1c",
          movieLink: "/films/1258163",
          movieDetail: ""
        },
        {
          movieTitle: "一生有你2019",
          moviePoster:
            "https://p1.meituan.net/movie/b9abe12e6bd785d29abef9c98518eec62044645.jpg@160w_220h_1e_1c",
          movieLink: "/films/246300",
          movieDetail: ""
        },
        {
          movieTitle: "冰峰暴",
          moviePoster:
            "https://p0.meituan.net/movie/42562ed224f40013d608fc0551bc298c3602695.jpg@160w_220h_1e_1c",
          movieLink: "/films/1216179",
          movieDetail: ""
        },
        {
          movieTitle: "大约在冬季",
          moviePoster:
            "https://p0.meituan.net/movie/06aafa51a56e6e1888095373a1d00c3d1123868.jpg@160w_220h_1e_1c",
          movieLink: "/films/1250662",
          movieDetail: "8.2"
        },
        {
          movieTitle: "海上钢琴师",
          moviePoster:
            "https://p0.meituan.net/movie/609e45bd40346eb8b927381be8fb27a61760914.jpg@160w_220h_1e_1c",
          movieLink: "/films/1292",
          movieDetail: "9.3"
        },
        {
          movieTitle: "南方车站的聚会",
          moviePoster:
            "https://p1.meituan.net/movie/6d1a970c7fefb016006b0af099d8ff38867262.jpg@160w_220h_1e_1c",
          movieLink: "/films/1217041",
          movieDetail: ""
        },
        {
          movieTitle: "一生有你2019",
          moviePoster:
            "https://p1.meituan.net/movie/b9abe12e6bd785d29abef9c98518eec62044645.jpg@160w_220h_1e_1c",
          movieLink: "/films/246300",
          movieDetail: ""
        },
        {
          movieTitle: "两只老虎",
          moviePoster:
            "https://p0.meituan.net/moviemachine/19d48b1fd4f4af5c8c8e1c780a26fa431567220.jpg@160w_220h_1e_1c",
          movieLink: "/films/1277644",
          movieDetail: ""
        }
      ]
    };
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
          padding-top: 65px;
          padding-left: 5px;
          // background: gray;
        }
      }
    }
  }
}
</style>
