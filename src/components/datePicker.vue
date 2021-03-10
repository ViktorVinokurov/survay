<template>
  <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          v-model="date"
          :label="label"
          prepend-inner-icon="mdi-calendar"
          readonly
          outlined
          hide-details
          v-bind="attrs"
          v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
        ref="picker"
        v-model="date"
        :max="new Date().toISOString().substr(0, 10)"
        min="1950-01-01"
        locale="ru-ru"
        @change="save"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
name: "datePicker",
  data: () => ({
    date: null,
    menu: false,
  }),
  props:{
    label:{type:String, default:'Выберите дату'}
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
      this.$emit('change:date', date)
    },
  },
}
</script>

<style scoped>

</style>