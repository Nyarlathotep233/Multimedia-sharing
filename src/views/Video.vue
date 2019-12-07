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
      <el-col :span="20" style="margin:0 50px">
        <div
          class="whiteblock"
          :style="'padding: 10px;min-height:'+minHeight+'px;'"
          v-loading="loading"
          element-loading-text="搜索中"
        >
          <h2 class="search-collection" v-if="!first">搜索结果</h2>
          <div v-if="!maoyanSearchResult &&!bilibiliSearchResult&&!first&&!loading">
            <p>无结果</p>
          </div>
          <div v-if="maoyanSearchResult&&!loading">
            <h3 class="search-collection">猫眼</h3>
          </div>
          <searchResultArea :searchResult="maoyanSearchResult"></searchResultArea>
          <div v-if="bilibiliSearchResult&&!loading">
            <h3 class="search-collection">BILIBILI</h3>
          </div>
          <searchResultArea :searchResult="bilibiliSearchResult"></searchResultArea>
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
import searchResultArea from "../components/searchResultArea";
export default {
  data() {
    return {
      search: "",
      maoyanSearchResult: null,
      bilibiliSearchResult: null,
      first: true,
      loading: false,
      minHeight: 0
    };
  },
  components: {
    MovieRankingList,
    MoviePage,
    searchResultArea
  },
  created() {},
  methods: {
    searchMovie() {
      if (!this.search == "") {
        this.maoyanSearchResult = null;
        this.bilibiliSearchResult = null;
        this.loading = true;
        this.minHeight = 100;
        this.axios
          .get("http://127.0.0.1:3000/search?searchContent=" + this.search)
          .then(response => {
            this.first = false;
            this.loading = false;
            this.minHeight = 0;
            console.log(response);
            this.maoyanSearchResult = response.data.maoyan;
            this.bilibiliSearchResult = response.data.bilibili;
            if (this.maoyanSearchResult.length <= 0) {
              this.maoyanSearchResult = null;
            }
            if (this.bilibiliSearchResult.length <= 0) {
              this.bilibiliSearchResult = null;
            }
          });
      }
    }
  }
};
</script>

<style lang="scss">
.search-collection {
  text-align: left;
  padding-left: 10px;
  margin-left: 20px;
  border-left: 5px solid red;
}
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
  height: 220px;
  width: 160px;
  border-radius: 4px;
  overflow: hidden;
  background-size: cover;
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
