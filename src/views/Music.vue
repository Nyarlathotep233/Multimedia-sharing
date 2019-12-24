<template>
  <div>
    <h1>Music</h1>
    <el-row type="flex" justify="center">
      <el-col :span="11">
        <el-input
          v-model="search"
          placeholder="请输入内容"
          type="primary"
          @keyup.enter.native="searchMusic"
        ></el-input>
      </el-col>
      <el-button icon="el-icon-search" type="primary" @click="searchMusic"></el-button>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <el-row type="flex" justify="center">
          <el-col>
            <div
              class="whiteblock"
              :style="'padding: 10px;min-height:' + minHeight + 'px;'"
              v-loading="loading"
              element-loading-text="搜索中"
            >
              <h2 class="red-border-head" v-if="!first">搜索结果</h2>
              <div v-if="!first && !loading && !miguSearchResult">
                <p>无结果</p>
              </div>
              <div v-if="miguSearchResult ">
                <el-table :data="miguSearchResult" style="width: 100%">
                  <el-table-column prop="musicTitle" label="歌曲" width="340">
                    <template slot-scope="scope">
                      <a
                        :href="scope.row.musicLink"
                        target="_blank"
                        class="music-search-result-link"
                      >{{ scope.row.musicTitle }}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="singer" label="歌手" width="180">
                    <template slot-scope="scope">
                      <a
                        :href="scope.row.musicLink"
                        target="_blank"
                        class="music-search-result-link"
                      >{{ scope.row.musicTitle }}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="album" label="专辑">
                    <template slot-scope="scope">
                      <a
                        :href="scope.row.musicLink"
                        target="_blank"
                        class="music-search-result-link"
                      >{{ scope.row.musicTitle }}</a>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>

            <MusicRecommend :Recommend="Recommend" :Title="'推荐歌单'"></MusicRecommend>
            <MusicNewAlbum :NewAlbum="NewAlbum" :Title="'新碟上架'"></MusicNewAlbum>
            <MusicNewSong :NewSong="NewSong" :Title="'新歌速递'"></MusicNewSong>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row type="flex" justify="center">
          <el-col :span="24" style>
            <div class="whiteblock" :style="'padding: 10px;'">
              <MusicRankingList />
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.music-search-result-link {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
  color: rgba(0, 0, 0, 0.6);
  // color: rgba($color: #909399, $alpha: 0.6);
}
.music-search-result-link:hover {
  color: rgba($color: #f52a2a, $alpha: 0.6);
}
</style>

<script>
import MusicRankingList from "../components/MusicRankingList";
import MusicRecommend from "../components/MusicRecommend";
import MusicNewAlbum from "../components/NewAlbum";
import MusicNewSong from "../components/NewSong";
export default {
  data() {
    return {
      search: "",
      first: true,
      loading: false,
      miguSearchResult: null,
      minHeight: 0,
      NewAlbum: [],
      NewSong: [],
      Recommend: []
    };
  },
  methods: {
    searchMusic() {
      if (!this.search == "") {
        this.loading = true;
        this.minHeight = 100;
        this.axios
          .get("http://127.0.0.1:3000/searchMusic?searchContent=" + this.search)
          .then(response => {
            this.first = false;
            this.loading = false;
            this.minHeight = 0;
            // console.log(response);
            this.miguSearchResult = response.data.migu;
            if (this.miguSearchResult.length <= 0) {
              this.miguSearchResult = null;
            }
          });
      }
    }
  },
  components: {
    MusicRankingList,
    MusicRecommend,
    MusicNewAlbum,
    MusicNewSong
  },
  created() {
    this.axios.get("http://127.0.0.1:3000/musicNewAlbum").then(response => {
      var newAlbum = response.data;
      // console.log(newAlbum);
      for (var i = 0; i < newAlbum.length; i += 4) {
        if (i + 3 < newAlbum.length) {
          this.NewAlbum.push([
            newAlbum[i],
            newAlbum[i + 1],
            newAlbum[i + 2],
            newAlbum[i + 3]
          ]);
        }
      }
      // console.log(this.NewAlbum);
    });
    this.axios.get("http://127.0.0.1:3000/musicNewSong").then(response => {
      var newSong = response.data;
      // console.log(NewSong);
      for (var i = 0; i < newSong.length; i += 4) {
        if (i + 3 < newSong.length) {
          this.NewSong.push([
            newSong[i],
            newSong[i + 1],
            newSong[i + 2],
            newSong[i + 3]
          ]);
        }
      }
      // console.log(this.NewSong);
    });
    this.axios.get("http://127.0.0.1:3000/musicRecommend").then(response => {
      var recommend = response.data;
      // console.log(recommend);
      for (var i = 0; i < recommend.length; i += 4) {
        if (i + 3 < recommend.length) {
          this.Recommend.push([
            recommend[i],
            recommend[i + 1],
            recommend[i + 2],
            recommend[i + 3]
          ]);
        }
      }
      console.log(this.Recommend);
    });
  }
};
</script>
