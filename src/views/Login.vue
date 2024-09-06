<template>
  <div class="auth-wrapper auth-v1 px-2 bg-white">
    <div class="auth-inner py-2">
      <b-card>
        <a href="#" target="_self" class="brand-logo">
          <h2 class="brand-text text-primary ml-1 mb-0"> DISH! </h2>
        </a>
        <h4 class="card-title text-center mb-1"> Добро пожаловать в систему </h4>

        <b-form class="auth-login-form mt-2" @submit.prevent="login">
          <b-form-group>
            <label for="login">Логин</label>
            <b-form-input
                id="login"
                required
                class="form-control"
                v-model="user.username"
            />
          </b-form-group>

          <b-form-group>
            <label for="password">Пароль</label>

            <b-input-group class="input-group-merge">
              <b-form-input
                  id="password"
                  required
                  class="border__right"
                  :type="eye ? 'password' : ''"
                  v-model="user.password"
              />
              <b-input-group-prepend is-text class="bg-transparent">
                <i
                    :class="eye ? 'ri-eye-line' : 'ri-eye-off-line'"
                    @click="eye = !eye"
                />
              </b-input-group-prepend>
            </b-input-group>
          </b-form-group>

          <b-button
              :disabled="!user.password || !user.username || loading"
              type="submit"
              variant="primary"
              class="w-100 mb-2 text-center"
          >
            <div class="d-flex align-items-center" v-if="loading">
              <b-spinner
                  small
                  variant="white"
              />
              <small class="ml-1 text-white"> Loading...</small>
            </div>

            <span v-else>Войти</span>
          </b-button>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router';
import {useToast} from "vue-toastification";
import '../assets/@core/login/login.css'

const store = useStore()
const toast = useToast()
const router = useRouter()

const eye = ref(true)
let loading = ref(false)
const user = reactive({
  username: "root",
  password: "vesiq1w2$#@"
})

const login = async () => {
  loading.value = true;

  try {
    await store.dispatch("auth/LOGIN", user);
    await router.push('/');
    toast.success('Вход в систему успешно');
  } catch (error) {
    const {message} = error;

    switch (message) {
      case "User not found":
        toast.error('Пользователь не найден');
        break;
      case "Invalid password":
        toast.error('Неверный пароль');
        break;
      default:
        toast.error('Произошла ошибка входа в систему');
        break;
    }
  } finally {
    loading.value = false;
  }
};

</script>
