<template>
   <div class="Tabela">

      <v-row justify="space-around">
          
       <v-card width="800" max-height="500" style="margin-top:12px">
          <v-img
            height="10px"
            style="background-image: linear-gradient(to right, rgb(127, 94, 185) 20%, rgb(165 139 213), rgb(149 125 191), rgb(138, 99, 209));"
          >
          </v-img>

          <v-data-table
            height="53.1vh"
            fixed-header
            :headers="headers"
            :items="desserts"
            :items-per-page="8"
            class="elevation-2"
            style="width:50vw;"
          >

          <template v-resize="onResize" v-slot:top>
            <v-toolbar
              flat
            >
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
              <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="mx-7"
                        height="38px"
                        width="40px"
                        fab
                        dark
                        color="#9932CC"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon dark>
                          mdi-plus
                        </v-icon>
                      </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="editedItem.nome"
                                  label="Nome do produto"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="editedItem.categoria"
                                  label="Categoria"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="editedItem.fornecedor"
                                  label="Fornecedor"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="editedItem.valor"
                                  label="Valor"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="close"
                          >
                            Cancelar
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="save"
                          >
                            Salvar
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                      <v-card>
                        <v-card-title class="text-h5">Você tem certeza que deseja remover esse produto ?</v-card-title>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
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

                <template v-slot:no-data>
                  <v-btn
                    color="primary"
                    @click="initialize"
                  >
                    Reset
                  </v-btn>
                </template>
              </v-data-table>
      </v-card>

      </v-row>

    </div>
</template>

<script>
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
      desserts: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        nome: '',
        categoria: '',
        fornecedor: '',
        valor: 0,
      },
      defaultItem: {
        nome: '',
        categoria: '',
        fornecedor: '',
        valor: 0,
      },
      posicao: 0,
      usuarioAtual: null
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Prouto' : 'Editar Produto'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.getUsuario();
      this.getProdutos();
    },

    methods: {
      async getProdutos () {
        console.clear();
        const req = await fetch('http://localhost:3000/produtos')

        const data = await req.json()
        this.desserts = data

        this.getAlteracoes();
      },
       async getAlteracoes () {
        const req = await fetch('http://localhost:3000/historicoAlteracoes/6')
        const data = await req.json();
        this.posicao = data.posicao;
      },
      async getUsuario () {
        const req = await fetch('http://localhost:3000/usuarios');
        const data = await req.json();
        
        data.map((element) => {
            if(element.status === true){
              this.usuarioAtual = element.nome;
            }
        });
      },
      async setAlteracoes (msg = "padrao") {
          /* Atualiza Posição do comentário
              para aplicar o efeito de movimentação
          */
          let dataJson2 = '';

          if (this.posicao >= 0) {
            dataJson2 = JSON.stringify({posicao: this.posicao-1});
          } else {
            dataJson2 = JSON.stringify({posicao: 0});
          }

          const req2 = await fetch(`http://localhost:3000/historicoAlteracoes/6`, {
            method: "PATCH",
            headers: { "Content-Type" : "application/json" },
            body: dataJson2
          });


          /*Adiciona Comentário*/
          await req2.json();

          const dado = {
            id: this.posicao,
            from: this.usuarioAtual,
            message: msg,
            time: new Date(),
            color: "deep-purple lighten-1"
          }

          const dataJson = JSON.stringify(dado);

          const req = await fetch(`http://localhost:3000/historicoAlteracoes/${this.posicao}`, {
            method: "PATCH",
            headers: { "Content-Type" : "application/json" },
            body: dataJson
          });
        
          await req.json();

      },      
      async editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        const req = await fetch(`http://localhost:3000/produtos/${this.desserts[this.editedIndex].id}`, {
          method: "DELETE"
        });

        await req.json()

        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
        this.setAlteracoes('Produto removido');
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          /* Editar produto */
          Object.assign(this.desserts[this.editedIndex], this.editedItem)

          const dataJson = JSON.stringify(this.desserts[this.editedIndex]);

          const req = await fetch(`http://localhost:3000/produtos/${this.desserts[this.editedIndex].id}`, {
            method: "PATCH",
            headers: { "Content-Type" : "application/json" },
            body: dataJson
          });

          await req.json();

          this.setAlteracoes('Produto editado');
        } else {
          /* Salvar Novo Produto */
          let atual = new Date();
          let hora = atual.getHours()

          const data = {
            nome: this.editedItem.nome,
            categoria: this.editedItem.categoria,
            fornecedor: this.editedItem.fornecedor,
            valor: 'R$'+this.editedItem.valor,
            data: hora
          }

          const dataJson = JSON.stringify(data)    

          const req = await fetch("http://localhost:3000/produtos", {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: dataJson
          });

          const data2 = await req.json();
          console.log(data2)
          this.desserts.push(this.editedItem);
          this.setAlteracoes('Produto criado');
        }
        
        this.close();
      },
    },
  }
</script>

<style scoped>

</style>