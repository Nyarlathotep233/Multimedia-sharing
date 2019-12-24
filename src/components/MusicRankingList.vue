<template>
  <el-tabs type="border-card">
    <el-tab-pane label="音乐榜">
      <div v-for="(item,i) in list1" :key="'rankinglist1'+i">
        <a target="_blank" :href="item['itemLink']">
          <el-card shadow="hover" style="text-align:left" :body-style="{padding:'10px'}">
            <div class="rankinglist-music">
              <i class="music-score" style="margin: auto 20px;margin-left: 0;">{{ item["itemNum"] }}</i>

              <el-image
                style="width:90px;margin-right:20px;flex-shrink:0"
                :src="item['itemImg']"
                fit="scale-down"
              ></el-image>
              <div style="width:60%">
                <p class="song-name">{{ item["itemTitle"] }}</p>
                <el-link
                  :underline="false"
                  type="primary"
                  target="_blank"
                  :href="item['itemSingerLink']"
                >
                  <p class="singer">{{ item["itemSinger"] }}</p>
                </el-link>
                <br />
                <i class="el-icon-thirdicon-test19 playCount">{{ ' '+item["itemPlayCount"] }}</i>
              </div>
            </div>
          </el-card>
        </a>
      </div>
    </el-tab-pane>
    <el-tab-pane label="欧美榜">
      <div v-for="(item,i) in list2" :key="'rankinglist2'+i">
        <a target="_blank" :href="item['itemLink']">
          <el-card shadow="hover" style="text-align:left" :body-style="{padding:'10px'}">
            <div class="rankinglist-music">
              <i class="music-score" style="margin: auto 20px;margin-left: 0;">{{ item["itemNum"] }}</i>

              <el-image
                style="width:90px;margin-right:20px;flex-shrink:0"
                :src="item['itemImg']"
                fit="scale-down"
              ></el-image>
              <div style="width:60%">
                <p class="song-name">{{ item["itemTitle"] }}</p>
                <el-link
                  :underline="false"
                  type="primary"
                  target="_blank"
                  :href="item['itemSingerLink']"
                >
                  <p class="singer">{{ item["itemSinger"] }}</p>
                </el-link>
                <br />
                <i class="el-icon-thirdicon-test19 playCount">{{ ' '+item["itemPlayCount"] }}</i>
              </div>
            </div>
          </el-card>
        </a>
      </div>
    </el-tab-pane>
    <el-tab-pane label="影视榜">
      <div v-for="(item,i) in list3" :key="'rankinglist3'+i">
        <a target="_blank" :href="item['itemLink']">
          <el-card shadow="hover" style="text-align:left" :body-style="{padding:'10px'}">
            <div class="rankinglist-music">
              <i class="music-score" style="margin: auto 20px;margin-left: 0;">{{ item["itemNum"] }}</i>

              <el-image
                style="width:90px;margin-right:20px;flex-shrink:0"
                :src="item['itemImg']"
                fit="scale-down"
              ></el-image>
              <div style="width:60%">
                <p class="song-name">{{ item["itemTitle"] }}</p>
                <el-link
                  :underline="false"
                  type="primary"
                  target="_blank"
                  :href="item['itemSingerLink']"
                >
                  <p class="singer">{{ item["itemSinger"] }}</p>
                </el-link>
                <br />
                <i class="el-icon-thirdicon-test19 playCount">{{ ' '+item["itemPlayCount"] }}</i>
              </div>
            </div>
          </el-card>
        </a>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      list1: [],
      list2: [],
      list3: []
    };
  },

  created() {
    this.axios.get("http://127.0.0.1:3000/musicList").then(response => {
      var billboardList = response.data;
      billboardList.forEach(item => {
        if (item.type == "bill1") {
          this.list1.push(item);
        } else if (item.type == "bill2") {
          this.list2.push(item);
        } else if (item.type == "bill3") {
          this.list3.push(item);
        } else {
          // console.log("no such type:", item.type);
        }
      });
    });
  }
};
</script>
<style lang="scss" scoped>
.song-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
  margin: 8px 0;
}
.singer {
  margin: 8px 0;
  color: rgba(0, 0, 0, 0.6);
}
.playCount {
  color: rgba(0, 0, 0, 0.6);
}
.rankinglist-music {
  margin-bottom: 0;
  background: rgba(0, 0, 0, 0);
  height: 110px;
  display: flex;
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
}
.music-score {
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
