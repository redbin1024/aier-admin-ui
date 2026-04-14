<template>
  <div class="user-avatar-wrapper">
    <div class="user-info-head" @click="editCropper">
      <a-avatar
        :size="120"
        class="img-circle img-lg"
        :trigger-icon-style="{ display: 'none' }"
      >
        <img
          v-if="options.img"
          :src="options.img"
          title="点击上传头像"
          alt="avatar"
        />
        <icon-user v-else />
        <div class="avatar-mask">
          <icon-camera class="camera-icon" />
        </div>
      </a-avatar>
    </div>

    <a-modal
      v-model:visible="open"
      :title="title"
      width="800px"
      @ok="uploadImg"
      @cancel="closeDialog"
    >
      <a-row :gutter="20">
        <a-col :span="24">
          <a-upload
            list-type="picture-card"
            :show-file-list="false"
            :custom-request="requestUpload"
            accept="image/png, image/jpeg, image/jpg"
            @change="onChange"
          >
            <template #upload-button>
              <div
                v-if="options.img"
                class="arco-upload-list-picture custom-upload-avatar"
              >
                <img :src="options.img" />
                <div class="arco-upload-list-picture-mask">
                  <IconEdit />
                </div>
              </div>
              <div v-else class="arco-upload-picture-card">
                <div class="arco-upload-picture-card-text">
                  <IconPlus />
                  <div style="margin-top: 10px; font-weight: 600">
                    点击上传新头像
                  </div>
                </div>
              </div>
            </template>
          </a-upload>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { uploadAvatar } from '@/api/system/user';
  import { useUserStore } from '@/store';
  import { IconCamera, IconEdit, IconPlus } from '@arco-design/web-vue/es/icon';

  const userStore = useUserStore();

  const open = ref(false);
  const title = ref('修改头像');

  const options = ref({
    img: userStore.avatar || '',
    filename: 'avatar',
  });

  const editCropper = () => {
    options.value.img = userStore.avatar || '';
    open.value = true;
  };

  const closeDialog = () => {
    open.value = false;
  };

  let currentFile: File | null = null;

  const onChange = (_: any, currentFileItem: any) => {
    if (!currentFileItem.file) return;
    const { file } = currentFileItem;
    if (file.type.indexOf('image/') === -1) {
      Message.error('文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      options.value.img = reader.result as string;
      options.value.filename = file.name;
    };
    currentFile = file;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const requestUpload = (_option: any) => {
    return Promise.resolve(); // Fake upload, actual upload is in `uploadImg`
  };

  const uploadImg = async () => {
    if (!currentFile) {
      Message.warning('请先选择一张图片');
      return false; // prevent closing
    }

    try {
      const formData = new FormData();
      formData.append('avatarfile', currentFile, options.value.filename);
      const response: any = await uploadAvatar(formData);

      const imgUrl =
        response.imgUrl || (response.data && response.data.imgUrl) || '';
      const newAvatarUrl = import.meta.env.VITE_API_BASE_URL + imgUrl;
      options.value.img = newAvatarUrl;

      // 更新全局 userStore 中的 avatar
      userStore.setInfo({ avatar: newAvatarUrl });
      Message.success('修改成功');
      open.value = false;
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return false; // prevent closing on error
    }
  };
</script>

<style scoped lang="less">
  .user-avatar-wrapper {
    display: inline-block;
  }

  .user-info-head {
    position: relative;
    display: inline-block;
    cursor: pointer;

    .avatar-mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s ease;

      .camera-icon {
        color: #fff;
        font-size: 32px;
      }
    }

    &:hover {
      .avatar-mask {
        opacity: 1;
      }
    }
  }

  .custom-upload-avatar {
    width: 150px;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  :deep(.arco-upload-picture-card) {
    width: 150px;
    height: 150px;
  }
</style>
