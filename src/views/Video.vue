<template>
  <!-- <div style="width:80%;background:#0000ff57;margin:0 auto"> -->
  <div>
    <h1>Video</h1>
    <!-- <i class="el-icon-thirdicon-test43"></i> -->
    <el-row type="flex" justify="center">
      <el-col :span="11">
        <el-input
          v-model="search"
          placeholder="请输入内容"
          type="primary"
          @keyup.enter.native="searchMovie"
        ></el-input>
      </el-col>
      <el-button icon="el-icon-search" type="primary" @click="searchMovie"></el-button>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="22" style="margin:0 50px">
        <div class="whiteblock" style="padding: 10px;">
          <div v-if="(!searchResult)&&(!first)">
            <p>无结果</p>
          </div>

          <el-row :gutter="12">
            <transition-group appear name="movieresult">
              <el-col :span="12" v-for="(item,i) in searchResult" :key="'search result'+i">
                <a target="_blank" :href="'https://maoyan.com' +item['movieLink']">
                  <el-card shadow="hover">
                    <!-- <div>
                    <img :src="item['moviePoster']" class="image" />
                    </div>-->
                    <el-row style="min-height: 120px;">
                      <el-col style="position: absolute;">
                        <div
                          class="img-container2"
                          :style="'background-image: url(' + item['moviePoster'] + ');'"
                        ></div>
                      </el-col>
                      <el-col :xs="24" :sm="24">
                        <div style="padding: 14px;text-align:left;margin-left:160px">
                          <div class="movie-score">
                            <!-- <i >9.</i>
                            <i class="fraction">0</i>-->
                            <i class="video-score2">{{ item["movieDetail"] }}</i>
                            <i class="video-score2" v-if="!item['movieDetail']">暂无</i>
                          </div>
                          <span>{{item["movieTitle"]}}</span>
                          <div class="bottom clearfix">
                            <!-- <time class="time">{{ currentDate }}</time> -->
                            <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-card>
                </a>
              </el-col>
            </transition-group>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="15" style="min-width:600px;">
        <div class="whiteblock">
          <MoviePage />
        </div>
      </el-col>
      <el-col :span="7">
        <div class="whiteblock" style="min-width:150px;">
          <MovieRankingList />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MovieRankingList from "../components/MovieRankingList";
import MoviePage from "../components/MoviePage";
export default {
  data() {
    return {
      search: "",
      searchResult: "",
      first: true
    };
  },
  components: {
    MovieRankingList,
    MoviePage
  },
  created() {},
  methods: {
    searchMovie() {
      if (!this.search == "") {
        this.axios
          .get("http://127.0.0.1:3000/search?searchContent=" + this.search)
          .then(response => {
            this.first = false;
            console.log(response);
            this.searchResult = response.data;
            if (!this.searchResult) {
              console.log("无结果");
            }
          });
      }
    }
  }
};
</script>

<style lang="scss">
.video-score2 {
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
.img-container2 {
  height: 120px;
  width: 160px;
  border-radius: 4px;
  overflow: hidden;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.whiteblock {
  // padding: 10px;
  margin: 0 15px;
  border-radius: 10px;
  box-shadow: 0.5px 0.5px 3px 0px #247ba061; //rgba(0, 0, 255, 0.2);
  background: white;
}

.movieresult-enter,
.movieresult-leave-to {
  opacity: 0;
  transform: translateX(80px);
}

.movieresult-enter-active {
  transition: all 0.4s ease;
}

.movieresult-leave-active {
  transition: all 0.6s ease;
  // position: absolute;
}

/* 元素位移时的设置 补位时其他元素的动作*/
.movieresult-move {
  transition: all 0.6s ease;
}
</style>
