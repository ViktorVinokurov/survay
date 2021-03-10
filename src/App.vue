<template>
  <v-app>
    <navigation />

    <v-main>
      <router-view/>
    </v-main>
    <v-overlay :value="get.overlay">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-snackbar
        v-model="get.snackbar.flag"
        right
        top
        :color="get.snackbar.color"
        :timeout="6000"
    >
      {{ get.snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
            dark
            text
            icon
            v-bind="attrs"
            @click="set({prop:'snackbar', value:{flag:false, color:'', text:''}})"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation";
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'App',

  components: {
    Navigation
  },

  computed:{
    ...mapGetters({
      get:'get'
    })
  },
  methods:{
    ...mapActions({
      set:'set'
    })
  },
  data: () => ({
    //
  }),
};
</script>
