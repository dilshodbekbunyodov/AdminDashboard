<template>
  <b-card>
    <form>
      <b-row>
        <b-col md="6">
          <b-form-group>
            <label for="old">
              Старый пароль
            </label>

            <b-input-group class="input-group-merge">
              <b-form-input
                  id="old"
                  class="border__right"
                  :type="eye ? 'password' : ''"
                  v-model="password.old"
              />
              <b-input-group-prepend is-text class="bg-transparent">
                <i
                    :class="eye ? 'ri-eye-line' : 'ri-eye-off-line'"
                    @click="eye = !eye"
                />
              </b-input-group-prepend>
            </b-input-group>
            <small v-for="error in validate.old.$errors"
                   :key="error.$uid"
                   class="whitespace-nowrap text-danger text-sm"
            >
              {{ $t(error.$message) }}
            </small>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group>
            <label for="new">
              Новый пароль
            </label>
            <b-input-group class="input-group-merge">
              <b-form-input
                  id="new"
                  class="border__right"
                  :type="eye ? 'password' : ''"
                  v-model="password.new"
              />
              <b-input-group-prepend is-text class="bg-transparent">
                <i
                    :class="eye ? 'ri-eye-line' : 'ri-eye-off-line'"
                    @click="eye = !eye"
                />
              </b-input-group-prepend>
            </b-input-group>
            <small v-for="error in validate.new.$errors"
                   :key="error.$uid"
                   class="whitespace-nowrap text-danger text-sm"
            >
              {{ $t(error.$message) }}
            </small>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group>
            <label for="retype">
              Введите повторно новый пароль
            </label>
            <b-input-group class="input-group-merge">
              <b-form-input
                  id="retype"
                  class="border__right"
                  :type="eye ? 'password' : ''"
                  v-model="password.newPass"
              />
              <b-input-group-prepend is-text class="bg-transparent">
                <i
                    :class="eye ? 'ri-eye-line' : 'ri-eye-off-line'"
                    @click="eye = !eye"
                />
              </b-input-group-prepend>
            </b-input-group>
            <small v-for="error in validate.newPass.$errors"
                   :key="error.$uid"
                   class="whitespace-nowrap text-danger text-sm"
            >
              {{ $t(error.$message) }}
            </small>
          </b-form-group>
        </b-col>

        <b-col md="12">
          <b-button
              variant="primary"
              class="mt-2 mr-1"
              @click="onSubmit"
          >
            Сохранить
          </b-button>
          <b-button
              variant="outline-secondary"
              class="mt-2"
              @click="resetPassword"
          >
            Перезагрузить
          </b-button>
        </b-col>
      </b-row>
    </form>
  </b-card>
</template>

<script setup>
import {computed, ref} from "vue";
import {UserData} from "@/@core/jwt/index.js";
import store from "@/store/index.js";
import {useToast} from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import {required, helpers} from "@vuelidate/validators";

const toast = useToast()
const eye = ref(true)
const password = ref({
  old: null,
  new: null,
  newPass: null
})

const rulesReq = computed(() => {
  return {
    old: {
      required: helpers.withMessage('Поле старый пароль обязательно для заполнения', required),
    },
    new: {
      required: helpers.withMessage('Поле новый пароль обязательно для заполнения', required),
    },
    newPass: {
      required: helpers.withMessage('Поле повторно новый пароль обязательно для заполнения', required),
    },
  };
});
const validate = useVuelidate(rulesReq, password);

const resetPassword = () => {
  password.value = {}
}

const onSubmit = async () => {
  const success = await validate.value.$validate();
  if (!success) return;

  try {
    await store.dispatch('users/UPDATE_USERS_DATA', {
      id: UserData().id,
      data: {
        password: password.value.newPass
      }
    })
    toast.success('Успешно')
  } catch (e) {
    await toast.error('Ошибка')
  }
}

</script>

<style>
.border__right {
  border-right: 0
}

.input-group-merge i {
  cursor: pointer;
}

.dark .input-group-merge i {
  color: #fff;
}
</style>
