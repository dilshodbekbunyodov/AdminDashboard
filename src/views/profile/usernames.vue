<template>
  <div>
    <b-card>
      <div class="media d-flex align-items-center">
        <div class="media-aside align-self-start">
          <b-img
              :src="user_photo_new ? user_photo_new : '/src/assets/images/avatar.png'"
              height="80"
              width="80"
              class="rounded"
          />
        </div>

        <div class="ml-1">
          <label class="file-input__label" for="file-input">
            <span class="btn btn-primary btn-sm">
             Загрузить
            </span>
          </label>

          <input
              type="file"
              id="file-input"
              class="d-none"
              @change="previewImage"
          />
          <b-button
              class="ml-05"
              variant="outline-danger"
              size="sm"
              @click="deletePhoto"
          >
            <i class="ri-delete-bin-line"></i>
          </b-button>
          <p class="card-text mt-2">Разрешены JPG, GIF или PNG. Максимальный размер 800 КБ.</p>
        </div>
      </div>

      <form class="mt-3">
        <b-row>
          <b-col md="6">
            <b-form-group>
              <label class="d-block" for="username">
                Имя пользователя
              </label>

              <b-form-input id="username" v-model="data.username"/>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group>
              <label for="name">
                Имя
              </label>
              <b-form-input id="name" v-model="data.first_name"/>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group>
              <label for="email">Электронная почта</label>
              <b-form-input id="email" v-model="data.email"/>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group>
              <label for="last_name">
                Фамилия
              </label>
              <b-form-input id="last_name" v-model="data.last_name"/>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group>
              <label for="language">
                Язык
              </label>
              <VSelect
                  label="title"
                  v-model="data.language"
                  :reduce="p => p.value"
                  :options="LANGUAGE"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group>
              <label for="role">
                Роль
              </label>
              <VSelect
                  multiple
                  label="title"
                  v-model="data.role"
                  :reduce="p => p.value"
                  :options="ROLE"
              />
            </b-form-group>
          </b-col>

          <b-col md="12">
            <b-button
                variant="primary"
                class="mt-2 mr-1"
                @click="updateProfile"
            >
              Сохранить
            </b-button>
            <b-button
                variant="outline-secondary"
                class="mt-2"
                @click="refresh"
            >
              Перезагрузить
            </b-button>
          </b-col>
        </b-row>
      </form>
    </b-card>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import store from "@/store/index.js";
import {UserData} from "@/@core/jwt/index.js";
import VSelect from 'vue-select'
import {useToast} from "vue-toastification";
import users from "@/store/users/index.js";

const toast = useToast()

let user_photo_new = ref(null)
let data = ref({
  username: null,
  first_name: null,
  last_name: null,
  language: null,
  email: null,
  photo: null,
  phone_number: null,
  role: [],
})

const LANGUAGE = computed(() => {
  return store.state.users.language
})

const ROLE = computed(() => {
  return store.state.users.role
})

onMounted(() => {
  refresh()
})

const refresh = async () => {
  try {
    await store.dispatch('users/FETCH_USERS_DATA', UserData().id)
    const {
      username,
      first_name,
      last_name,
      language,
      email,
      photo,
      role
    } = store.state.users.usersList;
    data.value = {
      username, first_name, last_name, language, email, photo, role
    }
    user_photo_new.value = photo
  } catch (e) {
    await toast.error('Ошибка')
  }
}

const previewImage = (event) => {
  user_photo_new.value = null
  const input = event.target;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      user_photo_new.value = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
  }
}

const updateProfile = () => {
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];

  const formData = new FormData()
  formData.append('username', data.value.username)
  formData.append('first_name', data.value.first_name)
  formData.append('last_name', data.value.last_name)
  formData.append('language', data.value.language)
  formData.append('email', data.value.email)
  user_photo_new.value && file && formData.append('photo', file)

  if (Array.isArray(data.value.role)) {
    for (let i = 0; i < data.value.role.length; i++) {
      const key = `role`;
      const value = data.value.role[i];
      if (typeof value !== 'undefined') {
        formData.append(key, value);
      }
    }
  }
  store.dispatch('users/UPDATE_USERS_DATA', {
    id: UserData().id,
    data: formData
  })
      .then(() => toast.success('Успешно'))
      .catch((e) => toast.error(e.message))
}

const deletePhoto = () => {
  const formData = new FormData()
  formData.append('photo', "")

  store.dispatch('users/UPDATE_USERS_DATA', {
    id: UserData().id,
    data: formData
  })
      .then(() => {
        refresh()
        toast.success('Успешно')
      })
      .catch((e) => toast.error(e.message))
}

</script>
