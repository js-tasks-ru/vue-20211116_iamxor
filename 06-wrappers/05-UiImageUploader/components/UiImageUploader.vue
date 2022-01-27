<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': state === 'uploading' }"
      :style="{ '--bg-url': backgroundUrl }"
      @click="uploadImageClick">

      <span class="image-uploader__text">{{ uploaderText }}</span>

      <input
        ref="input"
        v-bind="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="changeImage" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {

    preview: {
      type: String,
    },

    uploader: {
      type: Function,
    },

  },
  
  emits: ['select', 'remove', 'upload', 'error'],

  data() {
    return {
      uploadedImage: this.preview,
      needCleanup: false,
      state: this.preview ? 'preview' : 'empty',
    };
  },

  computed: {
    backgroundUrl() {
      if (this.state !== 'preview') return 'var(--default-cover)';
      return this.uploadedImage && `url('${this.uploadedImage}')`;
    },

    uploaderText() {
      switch(this.state){
        case 'empty':
          return 'Загрузить изображение';
        case 'uploading':
          return 'Загрузка...';
        case 'preview':
          return 'Удалить изображение';
      }
    }
  },

   unmounted() {
     this.revoke();
  },

  methods: {

    uploadImageClick($event) {
      
      switch(this.state){
        case 'preview':
          $event.preventDefault();
          this.remove();
          this.$emit('remove');          
          break;
        case 'uploading':
          $event.preventDefault();
          break;
      }

    },

    changeImage($event) {
      this.revoke();
      const file = $event.target.files[0];
      this.$emit('select', file);
      if (this.uploader) {
        this.upload(file);
      } else {
        this.createPreview(file);
      }
    },

    upload(file) {
      this.state = 'uploading';
      this.uploader(file).then(this.uploadSuccess, this.uploadError);
    },

    uploadSuccess(result) {
      this.uploadedImage = result.image;
      this.state = 'preview';
      this.$emit('upload', result);
    },

    uploadError(error) {
      this.remove();
      this.$emit('error', error);
    },

    createPreview(file) {
      this.uploadedImage = URL.createObjectURL(file);
      this.needCleanup = true;
      this.state = 'preview';
    },

    remove() {
      this.state = 'empty';
      this.uploadedImage = null;
      this.$refs.input.value = null;
    },

    revoke() {
      if (this.needCleanup) {
        URL.revokeObjectURL(this.uploadedImage);
        this.needCleanup = false;
      }      
    },

  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
