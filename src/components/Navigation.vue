<template>
  <div>
    <v-app-bar
        class="horizontal-header"
        app
        clipped-left
        clipped-right
        color="primary"
        dark
    >
      <v-app-bar-nav-icon @click="Sidevar_drawer = !Sidevar_drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Test quest</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
        :mini-variant.sync="Sidevar_drawer"
        mobile-breakpoint="960"
        clipped
        mini-variant-width="70"
        app
        id="main-sidebar"
        bar
    >

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in navigationList"
            :key="item.title"
            link
            @click="goLink(item.path)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>

</template>

<script>
import routes from "@/router/router";

export default {
  name: "Navigation",
  computed: {
    navigationList() {
      return routes
    }
  },
  data() {
    return {
      mini: true,
      right: null,
      Sidevar_drawer: false
    }
  },
  methods: {
    goLink(path){
      if(this.$route.path !== path){
        this.$router.push(path)
      }
    }
  }
}
</script>

<style scoped>

</style>