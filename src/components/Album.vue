<template>
<div>
  <transition name="el-zoom-in-top">
    <div class="imgupload">
      <el-upload action="/service/public/upload/file" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-success="handleSuccess" :on-remove="handleRemove" :file-list="allImages" :before-upload="beforeUpload">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog v-model="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </transition>
</div>
</template>

<script>
import uploadAPI from '../api/upload'
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      allImages: [],
    }
  },
  methods: {
    beforeUpload(file) {
      if (this.allImages.filter(e => e.name == file.name).length > 0) {
        return false
      }
    },
    handleSuccess(response, file, fileList) {
      response.url = '/service/public/upload/getAttachment?hash=' + response.file_hash
      this.allImages.push(response)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  watch: {},
  created() {
    uploadAPI.getAllAttachment().then((result) => {
      result.map((e) => {
        e.url = '/service/public/upload/getAttachment?hash=' + e.hash
      })
      this.allImages = result
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
  margin: 0;
  padding: 0;
}

.imgupload {}
</style>
