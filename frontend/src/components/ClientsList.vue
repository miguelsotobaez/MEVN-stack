<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="4">
      <template>
        <div class="text-center">
          <v-dialog
            v-model="createClientDialog"
            width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="success"
                dark
                v-bind="attrs"
                v-on="on"
                @click="cleanCheckedProviders"
              >
                Add New Client
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Add New Client
              </v-card-title>

              <v-card-text>

                <validation-observer
                  ref="observer"
                  v-slot="{ invalid }"
                >
                <v-form @submit.prevent="submitCreateClient">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Name"
                    rules="required|max:15"
                  >
                    <v-text-field
                      v-model="client.name"
                      :counter="15"
                      :error-messages="errors"
                      label="Name"
                      required
                    ></v-text-field>
                  </validation-provider>

                  <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                  >

                    <v-text-field
                      v-model="client.email"
                      :error-messages="errors"
                      label="Email"
                      required
                    ></v-text-field>
                  </validation-provider>

                  <validation-provider
                    v-slot="{ errors }"
                    name="phoneNumber"
                    :rules="{
                      required: true,
                    }"
                  >

                    <v-text-field
                      v-model="client.phone"
                      :error-messages="errors"
                      label="Phone"
                      required
                    ></v-text-field>
                  </validation-provider>
                  

                  <v-btn
                    small 
                    @click="createProviderDialog=true"
                    color="success"
                    dark
                  >
                    Add New Provider
                  </v-btn>

                  <v-data-table
                    :headers="providerHeaders"
                    :items="providers"
                  >
                    <template v-slot:[`item.status`]="{ item }">
                      <v-checkbox
                        v-model="item.status"
                      ></v-checkbox>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                      
                      <v-icon 
                            slot="activator"
                            small 
                            class="mr-2"
                            @click="editProviderDialog=true, getProviderById(item.id)"
                            >mdi-pencil
                            </v-icon>
                      <v-icon small @click="deleteProvider(item.id)">mdi-delete</v-icon>
                    </template>
                  </v-data-table>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                      color="success" 
                      @click="createClient()"
                      type="submit"
                      :disabled="invalid"
                    >
                        Save
                      </v-btn>
                  </v-card-actions>

                 
                </v-form>
                </validation-observer>

              </v-card-text>

              
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Clients</v-card-title>

        <v-data-table
          :headers="clientHeaders"
          :items="clients"
        >
          <template v-slot:[`item.providers`]="{ item }">
            <p >{{ getProviderNames(item.providers) }}</p>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon 
                  slot="activator"
                  small 
                  class="mr-2"
                  @click="editClientDialog=true, getClientById(item.id)"
                  >mdi-pencil
                  </v-icon>
            <v-icon small @click="deleteClient(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-dialog
            v-model="createProviderDialog"
            width="500"
          >
            
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Add New Provider
              </v-card-title>

              <v-card-text>

                <validation-observer
                  ref="observer"
                  v-slot="{ invalid }"
                >
                <v-form @submit.prevent="submitCreateProvider">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Name"
                    rules="required|max:15"
                  >
                    <v-text-field
                      v-model="provider.name"
                      :counter="15"
                      :error-messages="errors"
                      label="Name"
                      required
                    ></v-text-field>
                  </validation-provider>
                  

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                      color="success" 
                      @click="createProvider()"
                      type="submit"
                      :disabled="invalid"
                    >
                        Save
                      </v-btn>
                  </v-card-actions>

                 
                </v-form>
                </validation-observer>

              </v-card-text>
            </v-card>
          </v-dialog>


          <v-dialog
            v-model="editProviderDialog"
            width="500"
          >
            
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Edit Provider
              </v-card-title>

              <v-card-text>
                
                <validation-observer
                  ref="observer"
                  v-slot="{ invalid }"
                >
                <v-form @submit.prevent="submitEditProvider">
                  <v-text-field
                      v-model="currentProvider._id"
                      v-show=false
                    ></v-text-field>

                  <validation-provider
                    v-slot="{ errors }"
                    name="Name"
                    rules="required|max:15"
                  >
                    <v-text-field
                      v-model="currentProvider.name"
                      :counter="15"
                      :error-messages="errors"
                      label="Name"
                      required
                    ></v-text-field>
                  </validation-provider>
                  

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                      color="success" 
                      @click="updateProvider()"
                      type="submit"
                      :disabled="invalid"
                    >
                        Save
                      </v-btn>
                  </v-card-actions>

                 
                </v-form>
                </validation-observer>

              </v-card-text>

              
            </v-card>
          </v-dialog>

        <v-dialog
              v-model="editClientDialog"
              width="500"
            >

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Edit Client
                </v-card-title>

                <v-card-text>

                  <validation-observer
                    ref="observer"
                    v-slot="{ invalid }"
                  >
                  <v-form @submit.prevent="submitEditClient">
                    <v-text-field
                      v-model="currentClient._id"
                      v-show=false
                    ></v-text-field>

                    <validation-provider
                    v-slot="{ errors }"
                    name="Name"
                    rules="required|max:15"
                  >
                    <v-text-field
                      v-model="currentClient.name"
                      :counter="15"
                      :error-messages="errors"
                      label="Name"
                      required
                    ></v-text-field>
                  </validation-provider>

                  <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                  >

                    <v-text-field
                      v-model="currentClient.email"
                      :error-messages="errors"
                      label="Email"
                      required
                    ></v-text-field>
                  </validation-provider>

                  <validation-provider
                    v-slot="{ errors }"
                    name="phoneNumber"
                    :rules="{
                      required: true,
                    }"
                  >

                    <v-text-field
                      v-model="currentClient.phone"
                      :error-messages="errors"
                      label="Phone"
                      required
                    ></v-text-field>
                  </validation-provider>

                    <v-btn
                    small 
                    @click="createProviderDialog=true"
                    color="success"
                    dark
                  >
                    Add New Provider
                  </v-btn>

                  <v-data-table
                    :headers="providerHeaders"
                    :items="providers"
                  >
                    <template v-slot:[`item.status`]="{ item }">
                      <v-checkbox
                        v-model="item.status"
                      ></v-checkbox>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                      
                      <v-icon 
                            slot="activator"
                            small 
                            class="mr-2"
                            @click="editProviderDialog=true, getProviderById(item.id)"
                            >mdi-pencil
                            </v-icon>
                      <v-icon small @click="deleteProvider(item.id)">mdi-delete</v-icon>
                    </template>
                  </v-data-table>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                      color="success" 
                      @click="updateClient()"
                      type="submit"
                      :disabled="invalid"
                    >
                        Save
                      </v-btn>
                  </v-card-actions>

                  
                  </v-form>
                  </validation-observer>

                </v-card-text>
              </v-card>
            </v-dialog>

      </v-card>
    </v-col>
  </v-row>
  
</template>


<script>
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import ClientDataService from "../services/ClientDataService";
import ProviderDataService from "../services/ProviderDataService";

setInteractionMode('eager')

extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

extend('email', {
    ...email,
    message: 'Email must be valid',
  })

extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })

export default {
  components: {
      ValidationProvider,
      ValidationObserver,
    },
  name: "clients-list",
  data() {
    return {
      valid: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      checkbox: false,
      clients: [],
      providers: [],
      client: {
        id: null,
        name: "",
        email: "",
        phone: "",
        providers: [],
      },
      provider: {
        id: null,
        status: false,
        name: "",
      },
      name: "",
      currentClient: {_id: "", name: "", email: "", phone: "", providers: []},
      currentProvider: {_id: "", status: false, name: ""},
      message: "",
      createClientDialog: false,
      editClientDialog: false,
      createProviderDialog: false,
      editProviderDialog: false,
      clientHeaders: [
        { text: "Name", align: "start", sortable: true, value: "name" },
        { text: "Email", value: "email", sortable: true },
        { text: "Phone", value: "phone", sortable: true },
        { text: "Providers", value: "providers", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      providerHeaders: [
        { text: "Status", align: "start", sortable: false, value: "status" },
        { text: "Name", sortable: true, value: "name" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    async retrieveClients() {
      await ClientDataService.getAllClients()
        .then((response) => {
          this.clients = response.data.map(this.getDisplayClient);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async retrieveProviders() {
        await ProviderDataService.getAllProviders()
        .then((response) => {
          this.providers = response.data.map(this.getDisplayProvider);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteClient(id) {
      ClientDataService.deleteClient(id)
      .then(() => {
        this.retrieveClients();
        console.log(this.currentClient._id);
      })
      .catch((e) => {
        console.log(e);
      });
    },

    deleteProvider(id) {
      ProviderDataService.deleteProvider(id)
      .then(() => {
        this.getClientById(this.currentClient._id)
        console.log(this.providers);
      })
      .catch((e) => {
        console.log(e);
      });
    },

    getDisplayClient(client) {
      return {
        id: client._id,
        name: client.name.length > 30 ? client.name.substr(0, 30) + "..." : client.name,
        email: client.email.length > 30 ? client.email.substr(0, 30) + "..." : client.email,
        phone: client.phone.length > 30 ? client.phone.substr(0, 30) + "..." : client.phone,
        providers: client.providers,
      };
    },

    getDisplayProvider(provider) {
      return {
        id: provider._id,
        name: provider.name.length > 30 ? provider.name.substr(0, 30) + "..." : provider.name,
      };
    },

    async getClientById(id) {
      await this.retrieveClients();
      await this.retrieveProviders(); //to avoid mutation of this.providers
      await ClientDataService.getClient(id)
        .then((response) => {
          this.currentClient = response.data[0];
          if(Object.prototype.hasOwnProperty.call(this.currentClient, 'providers')){
            this.currentClient.providers.forEach(element => {
              for (let index = 0; index < this.providers.length; index++) {
                if(element == this.providers[index].id){
                  Object.assign( this.providers[index], {status: true});
                }
              }
            });
          }
          
        })
        .catch((e) => {
          console.log(e);
        });
    },

    cleanCheckedProviders(){
      this.retrieveProviders();

    },

    getProviderById(id) {
      ProviderDataService.getProvider(id)
        .then((response) => {
          this.currentProvider = response.data[0];
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateClient() {
      let thecheckedProviders = [];

      this.providers.forEach(element => {
        if(Object.prototype.hasOwnProperty.call(element, 'status')){
          if(element.status === true){
            thecheckedProviders.push(element.id);
          }
        }
      });


      var clientData = {
          client: {
            id: this.currentClient._id,
            name: this.currentClient.name,
            email: this.currentClient.email,
            phone: this.currentClient.phone,
            providers: thecheckedProviders,
          }
      };


      ClientDataService.updateClient(clientData)
        .then((response) => {
          console.log(response.data);
          this.message = "The client was updated successfully!";
          this.retrieveClients();
          this.editClientDialog = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateProvider() {
      
      var data = {
          provider: {
            id: this.currentProvider._id,
            name: this.currentProvider.name,
          }
      };
      ProviderDataService.updateProvider(data)
        .then((response) => {
          console.log(response.data);
          this.message = "The provider was updated successfully!";
          if(this.currentClient._id != undefined){
            this.getClientById(this.currentClient._id)
          }
          console.log(this.providers);
          this.editProviderDialog = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    createClient() {
      let thecheckedProviders = [];

      this.providers.forEach(element => {
        if(Object.prototype.hasOwnProperty.call(element, 'status')){
          if(element.status === true){
            thecheckedProviders.push(element.id);
          }
        }
      });


      var clientData = {
          client: {
            name: this.client.name,
            email: this.client.email,
            phone: this.client.phone,
            providers: thecheckedProviders,
          }
      };

      ClientDataService.createClient(clientData)
        .then((response) => {
          this.client.id = response.data._id;
          console.log(response.data);
          this.retrieveClients();
          this.createClientDialog = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    createProvider() {
      var data = {
          provider: {
            name: this.provider.name,
          }
      };

      ProviderDataService.createProvider(data)
        .then((response) => {
          
            this.provider.id = response.data._id;
            if(this.currentClient._id != undefined){
              this.getClientById(this.currentClient._id)
            }

            this.createProviderDialog = false;
          
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getProviderNames(data) {
      let providerName = "";
      if(data.length > 0){
        this.providers.forEach(element => {
          data.forEach(value => {
            if(element.id == value){
              providerName += element.name + ", ";
            }
          });
        });
        providerName = providerName.slice(0, -2); 
      }
      return providerName;
    },

    getProviderName(id) {
      let providerName = "";
      this.providers.forEach(element => {
        if(element.id == id){
          providerName += element.name;
        }
      });
      return providerName;
    },

    submitCreateClient () {
      this.$refs.observer.validate()
      this.client.name = "";
      this.client.email = "";
      this.client.phone = "";
      this.$refs.observer.reset();
    },

    submitEditClient () {
      this.$refs.observer.validate()
    },

    submitCreateProvider () {
      this.$refs.observer.validate()
      this.provider.name = "";
      this.$refs.observer.reset();
    },

    submitEditProvider () {
      this.$refs.observer.validate()
    },

    
  },
  mounted() {
    this.retrieveClients();
    this.retrieveProviders();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
