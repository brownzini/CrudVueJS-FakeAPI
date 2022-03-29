<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item v-for="[icon, text, url] in links" :key="icon" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <router-link :to="url">
        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
        </router-link>

      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      links: [
        ["mdi-microsoft-windows", "Pagina Principal", "/"],
        ["mdi-file", "Produtos Estoque", "/Produto"],
        ["mdi-clipboard-list-outline", "Documentacao", "/Documentacao"],
        ["mdi-card-account-details-outline", "Vendas", "#"],  
        ["mdi-cog", "Configurações", "#"],
      ],
    };
  },
};
</script>

<style scoped>
  .v-image.v-responsive.theme--light {
      height: 200px;
  }
.v-list-item__title {
  color:gray;
}
  a {
      text-decoration: none;
  }
</style>
