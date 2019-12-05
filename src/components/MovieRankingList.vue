<template>
  <el-tabs type="border-card">
    <el-tab-pane label="电影排名">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(item, i) in list1" :name="i" :key="i" class="rankinglist-video">
          <!-- :title="item['movieTitle']" -->
          <template slot="title">
            <i class="header-icon" style="margin-right: 10px;">{{ i + 1 }}</i>
            {{ item["movieTitle"] }}
          </template>
          <div style="display:flex">
            <a target="_blank" :href="'https://maoyan.com' + item['movieLink']">
              <div
                class="img-container"
                :style="'background-image: url(' + item['moviePoster'] + ');'"
              >
                <!-- <img :src="item['moviePoster']" alt /> -->
              </div>
            </a>

            <div class="movie-info" style="margin-left:20px">
              <div class="movie-score">
                <!-- <i >9.</i>
                <i class="fraction">0</i>-->
                <i class="video-score">{{ item["movieDetail"] }}</i>
                <i class="video-score" v-if="!item['movieDetail']">暂无</i>
              </div>
              <div
                class="movie-title movie-title-padding"
                :title="item['movieTitle']"
              >{{ item["movieTitle"] }}</div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
    <el-tab-pane label="电影排名2">电影排名2</el-tab-pane>
  </el-tabs>
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
      ],
      activeName: 0
    };
  }
};
</script>
<style lang="scss" scoped>
.rankinglist-video {
  margin-bottom: 0;
  // background: #b2dbbf;
  background: rgba(0, 0, 0, 0);
  // border: 0.5px solid #99a9bf;
  min-height: 36px;
  &:last-child {
    margin-bottom: 0;
  }
  .header-icon {
    cursor: pointer;
    display: inline-block;
    font-family: "Microsoft YaHei", Helvetica, Arial, sans-serif;
    font-size: 18px;
    font-style: italic;
    height: 35px;
    line-height: 35px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    text-align: left;
    text-size-adjust: 100%;
    vertical-align: top;
    width: 20px;
    -webkit-font-smoothing: subpixel-antialiased;
  }
  .img-container {
    height: 100px;
    width: 160px;
    border-radius: 4px;
    overflow: hidden;
  }
  .movie-info {
    margin: 0 10px;
  }
  .movie-overlay {
    background-attachment: scroll;
    background-clip: border-box;
    background-color: rgba(0, 0, 0, 0);
    background-origin: padding-box;
    background-position-x: 50%;
    background-position-y: 100%;
    background-size: auto;
    color: rgb(0, 0, 238);
    cursor: pointer;
    display: block;
    font-family: "Microsoft YaHei", Helvetica, Arial, sans-serif;
    height: 220px;
    left: 0px;
    position: absolute;
    text-size-adjust: 100%;
    top: 0px;
    width: 160px;
    -webkit-font-smoothing: subpixel-antialiased;
  }
  .video-score {
    color: rgb(255, 180, 0);
    cursor: pointer;
    display: inline;
    font-family: "Microsoft YaHei", Helvetica, Arial, sans-serif;
    font-size: 22px;
    font-style: italic;
    height: auto;
    text-size-adjust: 100%;
    width: auto;
    -webkit-font-smoothing: subpixel-antialiased;
  }
}
</style>
