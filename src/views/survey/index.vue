<template>
  <v-container>
    <v-row>
      <v-col md="6" cols="12">
        <edit-dlg class="elevation-0" @click:edit="save"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'
import EditDlg from '@/components/dateSurvey/EditDlg'
export default {
  name: "index",
  components:{
    EditDlg
  },
  data: () => ({
    dataSurvay:{
      radioGroupAnswer:null,
      name:'',
      firstName:'',
      date:'',
      email:'',
      password:'',
      file:[],
    },
    errorMessages: '',
    formHasErrors: false,
    regEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }),
  computed:{
    form(){
      return {
        radioGroupAnswer: this.dataSurvay.radioGroupAnswer,
        name: this.dataSurvay.name,
        password: this.dataSurvay.password,
        email: this.dataSurvay.email
      }
    }
  },
  methods:{
    ...mapActions({
      setSurvay:'setSurvay',
      set:'set'
    }),
    async save(item){
        await this.setSurvay(item)
    }
  }
}
</script>

<style scoped>

</style>