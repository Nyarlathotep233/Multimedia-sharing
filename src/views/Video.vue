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
        ></el-input>
      </el-col>
      <el-button
        icon="el-icon-search"
        type="primary"
        @click="searchMovie"
      ></el-button>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col style="margin:0 50px">
        <div class="whiteblock" v-if="searchResult">
          <el-table :data="searchResult" style="width: 100%">
            <el-table-column prop="movieTitle" label="标题"> </el-table-column>
            <el-table-column prop="movieLink" label="链接" width="180">
            </el-table-column>
            <el-table-column prop="movieDetail" label="细节" width="180">
            </el-table-column>
            <el-table-column prop="moviePoster" label="海报地址">
            </el-table-column>
          </el-table>
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

      <!-- <el-col :span="7">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item
            :title="'索引值' + i + '---' + item"
            :name="i"
            v-for="(item, i) in list1"
            :key="item"
            class="rankinglist-video"
          >
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="7">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item
            :title="'索引值' + i + '---' + item"
            :name="i"
            v-for="(item, i) in list1"
            :key="item"
            class="rankinglist-video"
          >
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
        </el-collapse>
      </el-col>-->
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
      searchResult: ""
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
</style>
