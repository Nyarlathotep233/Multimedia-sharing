<template>
  <el-row :gutter="12" style="margin-bottom: 0;">
    <transition-group appear name="movieresult">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="8"
        v-for="(item, i) in searchResult"
        :key="'search result' + i"
      >
        <a target="_blank" :href="item['movieLink']">
          <el-card shadow="hover">
            <!-- <div>
                    <img :src="item['moviePoster']" class="image" />
            </div>-->
            <el-row style="height: 178px;">
              <!-- <div
                  class="img-container2"
                  :style="'background-image: url(' + item['moviePoster'] + ');'"
              ></div>-->
              <el-image
                :src="item['moviePoster']"
                fit="cover"
                style="width: 130px; height: 178px;position: absolute;left: 0;top: 0;"
              ></el-image>
              <el-col :xs="24" :sm="24">
                <div style="padding: 14px;text-align:left;margin-left:130px">
                  <div class="movie-score">
                    <!-- <i >9.</i>
                    <i class="fraction">0</i>-->
                    <i class="video-score2">{{ item["movieScore"] }}</i>
                    <i class="video-score2" v-if="!item['movieScore']"
                      >评分暂无</i
                    >
                  </div>
                  <p class="movie-name">{{ item["movieTitle"] }}</p>
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
</template>
<script>
export default {
  props: ["searchResult"]
};
</script>
<style lang="scss" scoped>
.movie-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
  // margin: 8px 0;
}
</style>
