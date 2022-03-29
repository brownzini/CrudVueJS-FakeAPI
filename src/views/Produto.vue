<template>
   <div class="Produto">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h1>Produto</h1>
        </v-subheader>

        <br>
        
        <v-divider></v-divider>

        <br><br>

      <v-row justify="space-around">
      <Tabela />     
      <v-card width="450" height="570" max-height="570">
        <v-img
          height="10px"
          style="background-image: linear-gradient(to right, rgb(127, 94, 185) 20%, rgb(165 139 213), rgb(149 125 191), rgb(138, 99, 209));"
        >
        </v-img>

        <v-card-text style="margin-top:30px">
          <div style="max-height:400" class="font-weight-bold ml-8 mb-2">
            <h2>Histórico de alterações</h2>
          </div>

          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :color="message.color"
              small
            >

            <div v-if="message.from === nomeUsuario"> 
              <div>
                <div class="font-weight-normal">
                  <strong> Você </strong> @{{ message.time }}
                </div>
                <div>{{ message.message }} </div>
              </div>

            </div>

            <div v-else>
              <div>
                <div class="font-weight-normal">
                  <strong>{{ message.from }}</strong> @{{ message.time }}
                </div>
                <div>{{ message.message }}</div>
              </div>
            </div>

            </v-timeline-item>
          </v-timeline>

        </v-card-text>
      </v-card>
      </v-row>

    </div>
</template>

<script>
  import Tabela from '../components/Tabela.vue';

  export default {
    name: 'Produto',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Nome do Produto',
          align: 'start',
          sortable: false,
          value: 'nome',
        },
        { text: 'Categoria', value: 'categoria' },
        { text: 'Fornecedor', value: 'fornecedor' },
        { text: 'Valor', value: 'valor' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      messages: [
      ],
      nomeUsuario: '',
      posicao: 0
    }),
  
    created () {
      this.getUsuario();
      this.getAlteracoes();
    },

    methods: {
      async getUsuario () {
        const req = await fetch('http://localhost:3000/usuarios');
        const data = await req.json();
        
        this.usuarios = data;
        
        this.usuarios.map((element) => {
            if(element.status === true){
              this.nomeUsuario = element.nome;
            }
        });
      },

      async getAlteracoes () {
        const req = await fetch('http://localhost:3000/historicoAlteracoes')
        const data = await req.json();
        this.messages = data;
      },
    },
    components: {
      Tabela
    }
  }
</script>

<style scoped>
  .v-timeline-item.theme--light:nth-child(7) {
      display: none;
  }
</style>