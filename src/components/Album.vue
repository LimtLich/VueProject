<template>
<div>
  <el-button class="showUpload" @click="showupload = !showupload" type="info">{{head_title}}
    <i :class="head_icon"></i>
  </el-button>
  <transition name="el-zoom-in-top">
    <div v-show="showupload" class="imgupload">
      <el-upload class="uploadDiv" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog v-model="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-button @click="showupload = !showupload" :plain="true" type="info">Commit upload
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </div>
  </transition>
</div>
</template>

<script>
export default {
  data() {
    return {
      fileList2: [],
      showupload: false,
      dialogImageUrl: '',
      dialogVisible: false,
      head_title: 'Picture upload',
      head_icon:'el-icon-upload2 el-icon--right',
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  watch: {
    showupload(val) {
      if(val){
        this.head_title = 'Close'
        this.head_icon = 'el-icon-circle-close el-icon--right'
      }else{
        this.head_title = 'Picture upload'
        this.head_icon = 'el-icon-upload2 el-icon--right'
      }
    }
  },
  created() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
  margin: 0;
  padding: 0;
}

.showUpload {
  width: 100%;
  border-radius: inherit!important;
}

.imgupload {
  border-left: 1px solid #dfdfdf;
  height: 100%;
  border: 1px solid #dfdfdf;
  padding-bottom: 1%;
}

.uploadDiv {
  padding: 1%;
}
</style>
