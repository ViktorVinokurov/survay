<template>
  <v-dialog v-model="ddialog" persistent width="450">
    <v-card>
      <v-toolbar color="primary" dense dark class="mb-2 elevation-0">
        <span>Введите пароль</span>
        <v-spacer></v-spacer>
        <v-icon @click="ddialog = false">mdi-close</v-icon>
      </v-toolbar>
      <v-card-text>
        <v-text-field
            v-model="pass"
            outlined
            type="password"
            label="Введите пароль"
        />
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="primary" @click="send">Применить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "dlgAlert",
  data:()=>({
    pass:''
  }),
  props:{
    dialog:{type:Boolean, default: false}
  },
  computed:{
    ddialog:{
      get(){
        return this.dialog
      },
      set(v){
        this.$emit('click',v)
      }
    }
  },
  model:{
    prop:'dialog',
    event:'click'
  },
  methods:{
    send(){
      this.$emit('click:send',this.pass)
    }
  }
}
</script>

<style scoped>

</style>