<script setup>
import Footer from '@/views/front-pages/front-page-footer.vue'
import Navbar from '@/views/front-pages/front-page-navbar.vue'
import paypalDark from '@images/icons/payments/img/paypal-dark.png'
import paypalLight from '@images/icons/payments/img/paypal-light.png'
import visaDark from '@images/icons/payments/img/visa-dark.png'
import visaLight from '@images/icons/payments/img/visa-light.png'
import { useConfigStore } from '@core/stores/config'


import { onMounted, reactive, ref } from 'vue'

/* importamos axios**/
import axios from 'axios'

// list
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'

/*** variable dialog popup */
const isDialogVisible = ref(false)
const pedidoId = ref('')
const nroPedido = ref('')



const users = [
  {
    avatar: avatar1,
    name: 'Caroline Black',
    status: 'Online',
    lastVisited: '13 minutes ago',
  },
  {
    avatar: avatar2,
    name: 'Alfred Copeland',
    status: 'Away',
    lastVisited: '11 minutes ago',
  },
  {
    avatar: avatar3,
    name: 'Celia Schneider',
    status: 'Offline',
    lastVisited: '9 minutes ago',
  },
  {
    avatar: avatar4,
    name: 'Max Rogan',
    status: 'In Meeting',
    lastVisited: '28 minutes ago',
  },
]

const resolveStatusColor = {
  'Online': 'success',
  'Away': 'warning',
  'Offline': 'secondary',
  'In Meeting': 'error',
}


/************************************************ */


const visa = useGenerateImageVariant(visaLight, visaDark)
const paypal = useGenerateImageVariant(paypalLight, paypalDark)
const store = useConfigStore()

store.skin = 'default'
definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const radioContent = [
  {
    title: 'Credit Card',
    value: 'credit card',
    images: visa.value,
  },
  {
    title: 'PayPal',
    value: 'paypal',
    images: paypal.value,
  },
]

//const items = ({})
const items = reactive(['']) // arreglo
const itemsProducto = reactive(['']) // 
const itemsPedidos = ref([]) // 

const SelectedNropedido = ref() // 

const arrProductos = ref([]) // arreglo
const producto = ref([]) // arreglo

const comentarios = ref('')
const cantidadPro = ref()


const selectedRadio = ref('credit card')
const selectedCountry = ref('USA')
const isPricingPlanDialogVisible = ref(false)


const API_URL = import.meta.env.VITE_API_URL  

async function getCliente() {

const valores =  { "id" :  1}

 
 const respuesta = await axios.post(  API_URL + 'Listar_Clientes',valores)

 /* obtengo el valor para mnostrar en html */
 //sitios.value = respuesta.data
 // console.log('respuesta.data ', respuesta.data)
 //console.log('respuesta.length ', respuesta.data.recordset.length)

 //items.splice(0) //borra la primera linea
 for (let i = 0; i < respuesta.data.recordset.length; i++) {
  // console.log(" i =",  i  )
   // console.log("respuesta", respuesta.data[i].descripcion);
   items.push({
     id: respuesta.data.recordset[i].id,
     Nombres: respuesta.data.recordset[i].Nombres  
     //icon: customTrending 
   })
   //console.log("---------------------",respuesta.data[i].Nombres)
} 

}

async function getProducto() {

const valores =  { "id" :  1}

 
 const respuesta = await axios.post(  API_URL + 'Listar_Detalle_Productos',valores)

 /* obtengo el valor para mnostrar en html */
 //sitios.value = respuesta.data
  //console.log('respuesta.data ', respuesta.data)
 //console.log('respuesta.length ', respuesta.data.recordset.length)

 //items.splice(0) //borra la primera linea
 for (let i = 0; i < respuesta.data.recordset.length; i++) {
  // console.log(" i =",  i  )
   // console.log("respuesta", respuesta.data[i].descripcion);
   itemsProducto.push({
     id: respuesta.data.recordset[i].id,
     Nombre: respuesta.data.recordset[i].Nombre  
     //icon: customTrending 
   })
   //console.log("---------------------",respuesta.data[i].Nombres)
} 

}



async function getProductos() {
  console.log('getProductos ')
  const valores =  { "id" :  1}
  const respuesta = await axios.post(  API_URL + 'Listar_Detalle_Productos', valores)
  producto.value = respuesta.data.recordset
  console.log('respuesta.data ', respuesta.data)
  //console.log('respProductos',  respProductos)
  // return respProductos
}


async function getNroPedido(idCliente) {
  console.log('idCliente = ', idCliente)
  const valores =  { "idCliente" :  idCliente}
  SelectedNropedido.value =""

  const respuesta = await axios.post(  API_URL + 'Listar_Cabecerapedido', valores)
 
  itemsPedidos.value = respuesta.data.recordset
   
  itemsPedidos.value.push({
  Pagado : "Seleccione Pedido",
  id:"0"

  }) 
  console.log('respuesta.data ', respuesta.data)
   console.log('itemsPedidos.value',  itemsPedidos.value)
  // return respProductos
}




const addProductos = () => {
  //console.log(selectedCli.value)
  console.log('selected.value ', SelectedPro.value)
  console.log('selected.split ', SelectedPro.value.split('|')[0]) /
    arrProductos.value.push({
      idCliente: SelectedCli.value,
      id: SelectedPro.value.split('|')[0],
      idProducto: SelectedPro.value.split('|')[0],
      Nombre: SelectedPro.value.split('|')[1],
      Precio: SelectedPro.value.split('|')[2],
      idMedida: SelectedPro.value.split('|')[3],
      Comentario: comentarios.value,
      Cantidad: cantidadPro.value,
      subTotal: parseInt(cantidadPro.value) * parseInt(SelectedPro.value.split('|')[2]),
      idPedido: SelectedNropedido.value
    })
  // arrProductos.value.push({ name: 'Banana', amount: 4 })
  //nuevProducto.value = ''
}
async function getPedidos ()   {

  const valores =  { "nropedid" :  SelectedNropedido.value}
  const respuesta = await axios.post(  API_URL + 'Listar_detallePedido', valores)
  
  arrProductos.value.splice(0)
  for (let i = 0; i < respuesta.data.recordset.length; i++) {
   
   arrProductos.value.push({
      idCliente: respuesta.data.recordset[i].idCliente,
      id: respuesta.data.recordset[i].IDPRODUCTO,
      idProducto: respuesta.data.recordset[i].IDPRODUCTO,
      Nombre: respuesta.data.recordset[i].NombreProducto,
      Precio: respuesta.data.recordset[i].PRECIO,
      idMedida: respuesta.data.recordset[i].PRECIO,
      Comentario: respuesta.data.recordset[i].comentario,
      Cantidad: respuesta.data.recordset[i].CANTIDAD,
      subTotal: respuesta.data.recordset[i].TOTAL,
      idPedido: respuesta.data.recordset[i].idCabecera
    })



   
  }
   
}





const borrarProductos = (index) => {
  arrProductos.value.splice(index, 1) // se elimia 1 solo elemento
}


async function ActualizarPedido() {
  console.log(arrProductos)
  console.log(arrProductos.value)
  
  const respuesta = await axios.post(API_URL + 'Actualizar_CabeceraPedido', arrProductos.value)
  pedidoId.value = respuesta.data
  nroPedido.value = respuesta.data
  console.log('respuesta.data.recordset : ', respuesta.data)

  isDialogVisible.value = true
  
  //console.log('respProductos',  respProductos)
  // return respProductos
}

async function InsertarPedido() {
  console.log(arrProductos)
  console.log(arrProductos.value)
  
  const respuesta = await axios.post(API_URL + 'Insertar_CabeceraPedido', arrProductos.value)
  pedidoId.value = respuesta.data
  nroPedido.value = respuesta.data
  console.log('respuesta.data.recordset : ', respuesta.data)

  isDialogVisible.value = true
  
  //console.log('respProductos',  respProductos)
  // return respProductos
}


async function addPedido() {


if((SelectedNropedido.value == "0") || (SelectedNropedido.value == "") ){
 // console.log("InsertarPedido")
  InsertarPedido() 
}
else{
  console.log("ActualizarPedido")
  ActualizarPedido() 

}

/*
console.log(arrProductos)
console.log(arrProductos.value)

const respuesta = await axios.post(API_URL + 'Insertar_CabeceraPedido', arrProductos.value)
pedidoId.value = respuesta.data
nroPedido.value = respuesta.data
console.log('respuesta.data.recordset : ', respuesta.data)

isDialogVisible.value = true
*/
//console.log('respProductos',  respProductos)
// return respProductos
}



let SelectedPro = ref(producto.value[0])
let SelectedCli = ref(items[0])

onMounted (async ()=> {

getCliente() 
getProductos()




})



 






</script>

<template>
  <!-- eslint-disable vue/attribute-hyphenation -->

  <!-----------comienzo formulario----------------------------->
  <div class="payment-page">
<VContainer>
  <div class="d-flex justify-center align-center payment-card"> 
  <VCard width="100%">
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <AppAutocomplete
        v-model="SelectedCli"
    label="Clientes"
    :items="items"
    placeholder="Seleccione Cliente"
    item-title="Nombres" 
    item-value="id"
    @click="getNroPedido( SelectedCli )"
     
     
     

     
     
    
  />
      </VCol>
      <VCol cols="12">
        <AppAutocomplete
        v-model="SelectedNropedido"
    label="Nro Pedido"
    :items="itemsPedidos"
    placeholder="Seleccione Pedido"
    item-title="Pagado"
    item-value="id"
  />
  <VBtn 
         
        @click="getPedidos()">
        Consultar Pedido
        </VBtn>
      </VCol>
      <VCol cols="12">
        <AppAutocomplete
        v-model="SelectedPro"
    label="Producto"
    :items="producto"
    item-title="Nombre"
    item-value="Contenido"    
    placeholder="Seleccione Producto"
  />
  
      </VCol>
 

      <VCol cols="12">
        <AppTextField
          v-model="cantidadPro"
          label="Cantidad"
          placeholder="1"
          type="number"
        />
      </VCol>
      <VCol cols="12">
        <AppTextField
          v-model="comentarios"
          label="Comentario"
          placeholder="Comentario"
          type="text"
        />
      </VCol>


      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn 
         
        @click="addProductos">
        Agregar 
        </VBtn>

        <VBtn   @click="addPedido"
        >
        Guardar 
        </VBtn>
        <!-- Activator
     
      <VBtn v-bind="props" @click="isDialogVisible = true">
        Click Me
      </VBtn>
       -->
      </VCol>
    </VRow>
  </VForm>

  </VCard>
</div>

<!-------------termino fomrulario ------------------------->

<!---------------List------------------------------------------>
<VList
    lines="three"
    border
  >
    <template
      v-for="(prod, index) of arrProductos"
      :key="index"
    >
      <VListItem>
         
        <VListItemTitle>
          {{ prod.Nombre  }}  
        </VListItemTitle>
        <VListItemSubtitle class="mt-1">
          <span class="text-xs ">Cantidad: {{ prod.Cantidad}}</span> 
          {{ ' - ' }}  
          <span class="text-xs ">Valor:  {{ Number(prod.Precio).toLocaleString('en-US') }}</span>
          {{ ' - ' }}  
          <span class="text-xs ">Total: {{ Number(prod.subTotal).toLocaleString('en-US') }}</span>
           <br>
          <span class="text-xs ">Comentario: {{  prod.Comentario }}</span>
        </VListItemSubtitle>

        <template #append>
          <VBtn size="small" @click="borrarProductos(index)">
            X
          </VBtn>
        </template>
      </VListItem>
      <VDivider v-if="index !== users.length - 1" />
    </template>
  </VList>
  
</VContainer>
</div>
<!------------------------------------------------------->





  <div class="payment-page">
    <!-- 👉 Navbar -->
    <Navbar />

    

    <!-- 👉 Footer 
    <Footer />
    -->
<!--
    <PricingPlanDialog v-model:is-dialog-visible="isPricingPlanDialogVisible" />
    -->
  </div>


<!---------------------------------------------------->
<VDialog
    v-model="isDialogVisible"
    width="500"
  >
    
     

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Creación de Pedido">
      <VCardText>
        Nuevo Nro de pedido es : {{ pedidoId }}
      </VCardText>

      <VCardText class="d-flex justify-end">
        <VBtn @click="isDialogVisible = false">
          Cerrar
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>



<!------------------------------------------------------>

</template>

<style lang="scss" scoped>
.footer {
  position: static !important;
  inline-size: 100%;
  inset-block-end: 0;
}

.payment-card {
  margin-block: 10.5rem 5.25rem;
}

.payment-page {
  @media (min-width: 600px) and (max-width: 960px) {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}
</style>

<style lang="scss">
.payment-card {
  .custom-radio {
    .v-radio {
      margin-block-start: 0 !important;
    }
  }
}
</style>
