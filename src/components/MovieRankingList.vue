<template>
  <el-tabs type="border-card">
    <el-tab-pane label="电影推荐">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(item, i) in list1" :name="i" :key="i" class="rankinglist-video">
          <!-- :title="item['movieTitle']" -->
          <template slot="title">
            <i class="header-icon" style="margin-right: 10px;">{{ i + 1 }}</i>
            {{ item["movieTitle"] }}
          </template>
          <div style="display:flex">
            <a target="_blank" :href="item['movieLink']">
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
    <el-tab-pane label="今日票房">
      <el-row v-for="(item,i) in list2" :key="'rankinglist2'+i" class="rankinglist-video">
        <!-- <el-col :span="3">
          <div class="grid-content bg-purple">
            <i class="video-score">{{i}}</i>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>-->
        <a target="_blank" :href="item['movieLink']">
          <el-card shadow="hover" style="text-align: left;">
            <i class="video-score" style="margin-right: 10px;">{{ item["movieRank"] }}</i>
            {{ item["movieTitle"] }}
          </el-card>
        </a>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="最受期待">
      <el-row v-for="(item,i) in list3" :key="'rankinglist3'+i" class="rankinglist-video">
        <a target="_blank" :href="item['movieLink']">
          <el-card shadow="hover" style="text-align: left;">
            <i class="video-score" style="margin-right: 10px;">{{ item["movieRank"] }}</i>
            {{ item["movieTitle"] }}
          </el-card>
        </a>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="TOP 10">
      <el-row v-for="(item,i) in list4" :key="'rankinglist4'+i" class="rankinglist-video">
        <a target="_blank" :href="item['movieLink']">
          <el-card shadow="hover" style="text-align: left;">
            <i class="video-score" style="margin-right: 10px;">{{ item["movieRank"] }}</i>
            {{ item["movieTitle"] }}
          </el-card>
        </a>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      activeName: 0
    };
  },

  created() {
    this.axios.get("http://127.0.0.1:3000/movierecommend").then(response => {
      // console.log(response);
      this.list1 = response.data;
    });
    this.axios
      .get("http://127.0.0.1:3000/movieListRankingBox")
      .then(response => {
        // console.log(response);
        this.list2 = response.data;
      });
    this.axios
      .get("http://127.0.0.1:3000/movieListMostExcept")
      .then(response => {
        // console.log(response);
        this.list3 = response.data;
      });
    this.axios.get("http://127.0.0.1:3000/movieListTop100").then(response => {
      // console.log(response);
      this.list4 = response.data;
    });
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
    height: 220px;
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
</style>
