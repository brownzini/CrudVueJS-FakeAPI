<template>
    <div class="dashboard">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h1>Pagina principal</h1>
        </v-subheader>
        <br>
        <v-divider></v-divider>
        <br>
        <br>
        <v-row>
            <v-col lg="12" cols="12" >
                <v-row>
                    <v-col lg="5" cols="1" v-for="(item,index) in activityLog" :key="index">

                        <div v-if="item.title === 'Produtos Novos Cadastrados'">
                            <v-card elevation="2" style="padding:6px;" class="rounded-lg">
                                <v-card-text class="d-flex justify-space-between align-center">
                                    <div>
                                        <strong style="font-weight:700">{{ item.title }}</strong> <br>
                                        <span>Neste horario</span>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </div>

                        <div v-else >
                            <v-card-text 
                                    style="border-radius: 2px;
                                        background: rgb(123 168 223);
                                        box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
                                        " 
                                    class="d-flex justify-space-between align-center"
                                >
                                <div>
                                    <strong style="color:white;">{{ item.title }}</strong> <br>
                                    <span style="font-weight: 500;color:white;"> R$30.00 </span>
                                </div>

                                <v-avatar size="60" :color="item.color" style="border: 3px solid #444">
                                    <svg style="color: rgb(26 67 118);width:40px;height:40px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M3,10H6V7H3V10M5,5H8V2H5V5M8,10H11V7H8V10M17,1L12,6H15V10H19V6H22L17,1M7.5,22C6.72,22 6.04,21.55 5.71,20.9V20.9L3.1,13.44L3,13A1,1 0 0,1 4,12H20A1,1 0 0,1 21,13L20.96,13.29L18.29,20.9C17.96,21.55 17.28,22 16.5,22H7.5M7.61,20H16.39L18.57,14H5.42L7.61,20Z" />
                                    </svg>
                                </v-avatar>
                            </v-card-text>                 
                        </div>
                      
                    </v-col>
                </v-row>
            </v-col>
    
            <v-col>
                <v-card width="100%">
                    <v-data-table
                        :headers="headers"
                        :items="dados"
                        :items-per-page="8"
                        class="elevation-2">
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "Dashboard",
        data() {
            return {
                activityLog: [
                    {title: 'Produtos Novos Cadastrados', amount: 50, icon: 'mdi-account', color: 'cyan lighten-3'},
                    {title: 'Vendas Realizadas', amount: 3433, icon: 'mdi-account-group-outline', color: 'white darken-1'},
                ],
                headers: [
                    {
                        text: 'Nome do Produto', value: 'nome',
                        align: 'start',
                        sortable: false,
                    },
                    {text: 'Categoria', value: 'categoria',sortable: false},
                    {text: 'Fornecedor', value: 'fornecedor', sortable: false},
                    {text: 'Valor', value: 'valor', sortable: false}
                ],
                dados: [
                        
                ],
            }
        },
        created () {
            this.getProdutos();
        },
        methods: {
            async getProdutos () {
                console.clear();
                const req = await fetch('http://localhost:3000/produtos')

                const data = await req.json();
                this.dados = data;
            },
        }
    }
</script>

<style scoped>

    .col {
        margin: 0;
        margin-left: 0%;
    }

    .overlap-icon {
        position: absolute;
        top: -33px;
        text-align: center;
        padding-top: 12px;
    }

    .col-lg-12.col-12 {
        margin: 0;
        margin-left: 11%;
     
    }

    strong {
        font-weight: 700;
        font-size: 20px;
        color: #666666;
    }

</style>