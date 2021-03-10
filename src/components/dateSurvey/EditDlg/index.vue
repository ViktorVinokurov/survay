<template>
  <v-card>
    <v-card-title>
      <span>{{title}}</span>
    </v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-col md="6" cols="12">Вы любите котиков?</v-col>
        <v-col md="6" cols="12">
          <v-radio-group
              v-model="item.radioGroupAnswer"
              row
              ref="radioGroupAnswer"
              :rules="[
                    ()=> !!item.radioGroupAnswer || 'Параметр обязателен'
                ]"
              :error-messages="errorMessages"
          >
            <v-radio
                label="Да*"
                value="Да"
            ></v-radio>
            <v-radio
                label="Нет*"
                value="Нет"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" cols="12">
          <v-text-field
              outlined
              ref="name"
              v-model="item.name"
              :rules="[
                    ()=> !!item.name || 'Параметр обязателен'
                ]"
              :error-messages="errorMessages"
              placeholder="Введите имя"
              prepend-inner-icon="mdi-account-box-outline"
              label="Введите имя*"
          />
        </v-col>
        <v-col md="6" cols="12">
          <v-text-field
              outlined
              v-model="item.firstName"
              placeholder="Введите фамилию"
              prepend-inner-icon="mdi-account-box-outline"
              label="Введите фамилию"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" cols="12">
          <date-picker
              ref="datePick"
              label="Введите дату рождения"
              @change:date="item.date = $event"
          />
        </v-col>
        <v-col md="6" cols="12">
          <v-text-field
              type="email"
              ref="email"
              v-model="item.email"
              label="Введите E-mail*"
              prepend-inner-icon="mdi-email-outline"
              placeholder="Введите E-mail"
              :rules="[
                    () => !!item.email || 'Параметр обязателен',
                    () => {
            const pattern = regEx
            return pattern.test(item.email) || 'Ошибка e-mail.'
            },
                ]"
              :error-messages="errorMessages"
              outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" cols="12">
          <v-text-field
              type="password"
              ref="password"
              v-model="item.password"
              label="Введите пароль*"
              prepend-inner-icon="mdi-form-textbox-password"
              placeholder="Введите пароль"
              :rules="[
                    () => !!item.password || 'Введите пароль',
                    () => item.password.length >= 8 || 'Пароль должен быть больше 8 символов'
                ]"
              :error-messages="errorMessages"
              outlined
          />
        </v-col>
        <v-col md="6" cols="12">
          <v-file-input
              truncate-length="15"
              outlined
              accept="image/jpeg"
              hide-details
              label="Выберите файл"
              v-model="item.file"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="save">Сохранить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "index",
  props: {
    item: {
      type: Object, default: () => {
        return {
          radioGroupAnswer: null,
          name: '',
          firstName: '',
          date: '',
          email: '',
          password: '',
          file: []
        }
      }
    },
    title: {type:String, default: 'Опрос'}
  },
  computed: {
    form() {
      return {
        radioGroupAnswer: this.item.radioGroupAnswer,
        name: this.item.name,
        password: this.item.password,
        email: this.item.email
      }
    },
  },
  data: () => ({
    errorMessages: '',
    formHasErrors: false,
    regEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }),
  methods: {
    ...mapActions({
      set:'set'
    }),
    save() {
      this.formHasErrors = false
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) {
          this.formHasErrors = true
          this.set({prop: 'snackbar', value: {flag: true, color: 'warning', text: 'Введите все обязательные поля'}})
        }
        this.$refs[f].validate(true)
      })
      if (!this.formHasErrors) {
        this.$emit('click:edit', this.item)
      }
    }
  }
}
</script>

<style scoped>

</style>