<template>
  <div class="pa-4">
    <div class="d-flex">
      <span class="title"></span>
      <v-spacer></v-spacer>
      <v-text-field
          ref="search"
          v-model="search"
          label="Поиск"
          append-icon="mdi-magnify"
          single-line
      ></v-text-field>
    </div>
    <v-data-table
        :headers="headers"
        :items="survayData"
        :items-per-page="5"
        :search="search"
        class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog
        v-model="dialog"
        max-width="500px"
    >
      <edit-dlg v-if="dialog" :item="editedItem" @click:edit="save" @click:cls="dialog = false" title="Изменение результатов"/>
    </v-dialog>
    <dlg-alert v-model="dialogPass" @click:send="writePass" ></dlg-alert>
  </div>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import EditDlg from '@/components/dateSurvey/EditDlg'
import dlgAlert from "@/components/dlgAlert";
export default {
  name: "index",
  components:{
    EditDlg,
    dlgAlert
  },
  data: () => ({
    headers: [
      {text: 'Имя', value: 'name'},
      {text: 'Фамилия', value: 'firstName'},
      {text: 'Результат', value: 'radioGroupAnswer'},
      {text: '', value: 'actions'},
    ],
    search: '',
    dialog: false,
    editedIndex: 0,
    flagEditDel:false,
    editedItem: {},
    dialogPass:false,
  }),
  computed: {
    ...mapGetters({
      survay: 'survay'
    }),
    survayData(){
      return this.survay
    }
  },
  watch:{
    survayData(){
      return this.survay
    }
  },
  methods: {
    ...mapActions({
      edit:'editSurvay',
      del:'delSurvay',
      set:'set'
    }),
    editItem(item) {
      this.editedIndex = this.survay.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogPass = true
      this.flagEditDel = false
    },
    deleteItem(item) {
      this.editedIndex = this.survay.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogPass = true
      this.flagEditDel = true
    },
    save(item){
      this.edit({index:this.editedIndex, item:item})
      this.dialog = false;
    },
    writePass(pass){
      if(pass === this.editedItem.password){
        if(this.flagEditDel){
          this.del({index:this.editedIndex, item:this.editedItem})
        }else {
          this.dialog = true
        }
        this.dialogPass = false
      }else {
        this.set({prop: 'snackbar', value: {flag: true, color: 'warning', text: 'Пароль неверен'}})
      }
    }
  }
}
</script>

<style scoped>

</style>