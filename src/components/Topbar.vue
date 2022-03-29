<template>
  <v-app-bar app elevate-on-scroll elevation="3" color="deep-purple">

    <v-app-bar-nav-icon @click="$emit('drawerEvent')"></v-app-bar-nav-icon>
     
    <v-spacer />
    <v-spacer />

    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span style="cursor: pointer" v-bind="attrs" v-on="on">
          <v-chip link>
            <span>{{usuarioAtual.nome}}</span>
          </v-chip>
        </span>
      </template>
      <v-list width="250" class="py-0">

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{usuarioAtual.nome}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-divider />

        <div v-for="(menu, i) in usuarios" :key="i">
            <v-list-item link v-if="menu.status === false">
                  <v-list-item-title @click="trocaUsuario(menu.id, i)" >
                    {{ menu.nome }}
                  </v-list-item-title>
            </v-list-item>
        </div>

      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "Topbar",
  data: () => ({
    usuarios: [],
    usuarioAtual: {},
    index: 0
  }),    
  created () {
    this.getUsuario();
  },    
  methods: {
    async getUsuario () {
        const req = await fetch('http://localhost:3000/usuarios');
        const data = await req.json();
        
        this.usuarios = data;
        
        this.usuarios.map((element, index) => {

            if(element.status === true){
              this.usuarioAtual = {
                id: element.id,
                nome: element.nome,
                status: element.status,
                icon: element.icon
              }
              this.index = index;
            }

        });
    },     
    async trocaUsuario (id, index) {
        this.usuarios[this.index].status = false;

        const option = this.usuarios[this.index];
        
        const dataJson = JSON.stringify(option);

        const req = await fetch(`http://localhost:3000/usuarios/${this.usuarios[this.index].id}`, {
          method: "PATCH",
          headers: { "Content-Type" : "application/json" },
          body: dataJson
        });

        await req.json();


        /*Marca usuario atual como não selecionado*/
        this.usuarios[index].status = true;
        const option2 = this.usuarios[index];

        const dataJson2 = JSON.stringify(option2);
 
        const req2 = await fetch(`http://localhost:3000/usuarios/${id}`, {
          method: "PATCH",
          headers: { "Content-Type" : "application/json" },
          body: dataJson2
        });

        await req2.json();

        this.getUsuario();
    },
  }
}
</script>

<style scoped>

  .v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active {
      margin-top: 6px;
      width: 190px;
  }

  i.v-icon.notranslate.mdi.mdi-menu.theme--light {
      color: white;
  }

  span.v-chip.v-chip--clickable.v-chip--link.v-chip--no-color.theme--light.v-size--default {
    background: white;
  }
</style>
