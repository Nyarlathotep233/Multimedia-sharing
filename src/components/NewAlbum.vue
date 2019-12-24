<template>
  <div class="whiteblock" :style="'padding: 10px;min-height:' + minHeight + 'px;'">
    <h2 class="red-border-head">{{ Title }}</h2>
    <el-carousel trigger="click" indicator-position="outside" height="280px">
      <el-carousel-item v-for="(item, i) in NewAlbum" :key="'NewAlbum' + i">
        <el-row :gutter="12" style="margin:0 40px">
          <el-col :span="6" v-for="(items,j) in item" :key="'NewAlbumItems'+j">
            <el-tooltip effect="dark" :content="items['albumTitle']" placement="right-start">
              <a :href="items['albumLink']" target="_blank">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                  <img :src="items['albumImg']" class="image" />
                  <div style="padding: 14px;text-align:left">
                    <p class="album-name">{{ items["albumTitle"] }}</p>
                    <el-link
                      :underline="false"
                      type="primary"
                      target="_blank"
                      :href="items['albumSingerLink']"
                    >
                      <p class="singer">{{ items["albumSinger"] }}</p>
                    </el-link>
                    <br />
                    <i class="el-icon-thirdicon-test5 date">
                      {{
                      " " + items["albumDate"]
                      }}
                    </i>
                  </div>
                </el-card>
              </a>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  props: ["NewAlbum", "Title"]
};
</script>
<style lang="scss" scoped>
.album-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
  margin: 5px 0;
}
.singer {
  font-size: 90%;
  color: rgba(0, 0, 0, 0.6);
}

.date {
  font-size: 90%;
  color: rgba(0, 0, 0, 0.6);
}
.el-carousel__item {
  // background: rgba($color: #000000, $alpha: 0.5);
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
