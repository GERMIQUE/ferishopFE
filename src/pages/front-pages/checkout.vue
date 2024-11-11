<script setup>
import Footer from '@/views/front-pages/front-page-footer.vue'
import Navbar from '@/views/front-pages/front-page-navbar-cat-serv.vue'
import CartContent from '@/views/wizard-examples/checkout/Cart.vue'
import { useConfigStore } from '@core/stores/config'


import { onMounted, reactive, ref } from 'vue'

/* importamos axios**/
import axios from 'axios'


const currentStep = ref(0)
const contador =   reactive(0)

/*raiz de axios de donde obtentgo la informacion* */
const sitios = ref([]) // arreglo

const checkoutSteps = reactive(['']) // arreglo
const tituloRaiz = ref('')
const glosaUnidad = ref('')
//const p_id_padre = ref('')
//const titulo = ref('')

/*********************************** */
//const cartItemsNew = reactive(['']) 
//const ItemData = reactive(['']) // arreglo
//const checkoutData = ref([]) // arreglo



const matrizCategorias = ref({}) // arreglo
const checkoutData = ref({
  cartItems: [
    {
      id: 1,
      name: 'Google - Google Home - White',
      seller: 'Google'
      /*,
      inStock: true,
      rating: 4,
      price: 299,
      discountPrice: 359,
      image: googleHome,
      quantity: 1,
      estimatedDelivery: '18th Nov 2021',*/
    }
     /*
    ,
    {
      id: 2,
      name: 'Apple iPhone 11 (64GB, Black)',
      seller: 'Apple',
      inStock: true,
      rating: 4,
      price: 899,
      discountPrice: 999,
      image: iphone11,
      quantity: 1,
      estimatedDelivery: '20th Nov 2021',
    },
     */
  ]
    /*
  ,
  
  promoCode: '',
  orderAmount: 1198,
  deliveryAddress: 'home',
  deliverySpeed: 'free',
  deliveryCharges: 0,
  addresses: [
    {
      title: 'John Doe (Default)',
      desc: '4135 Parkway Street, Los Angeles, CA, 90017',
      subtitle: '1234567890',
      value: 'home',
    },
    {
      title: 'ACME Inc.',
      desc: '87 Hoffman Avenue, New York, NY, 10016',
      subtitle: '1234567890',
      value: 'office',
    },
  ], 
  */
})


/*******************loader****************************** */

let isDialogVisibleLoader = ref(false)

watch(isDialogVisibleLoader, value => {
  if (!value)
    return
  setTimeout(() => {
    isDialogVisibleLoader.value = false
  }, 4000)
})



/************************************ */
 //const API_URL = 'http://localhost:4444/'

 const API_URL = import.meta.env.VITE_API_URL  
 


watch(currentStep, async new0 => {
  console.log("currentStep = ", currentStep)
  getSitiosHijos(p_id_padre, titulo)
  //getSubCategorias(p_id_padre)
})


async function getSitios() {

 const valores =  { "p_id_padre" :  0, "p_activo" : 1 , "p_con_hijos" : 1  }



 
//console.log (valores)
//console.log (valores.value)

  const respuesta = await axios.post(API_URL + 'getSitios',valores)

  /* obtengo el valor para mnostrar en html */
  sitios.value = respuesta.data
   console.log('respuesta.data ', respuesta.data)
  //console.log('respuesta.length ', respuesta.data.length)

  checkoutSteps.splice(0) //borra la primera linea
  for (let i = 0; i < respuesta.data.length; i++) {
   // console.log(" i =",  i  )
    // console.log("respuesta", respuesta.data[i].descripcion);
     checkoutSteps.push({
      title: respuesta.data[i].titulo,
      id_padre: respuesta.data[i].id_padre,
      glosa: respuesta.data[i].glosa,      
      //icon: customTrending 
    })
    console.log("---------------------",respuesta.data[i].glosa)
} 

}


async function getSitiosHijos(p_id_padre, titulo) {


  //console.log("ssssssssss",p_id_padre )
const valores =  { "p_id_padre" : p_id_padre }
tituloRaiz.value = titulo

console.log('p_id_padre = ', p_id_padre)
console.log('Titulo = ', titulo)

 console.log("valores =", valores)
 const respuesta = await axios.post(API_URL + 'select_sitio_x_padre',valores)

 /* obtengo el valor para mnostrar en html */
 
      console.log('respuesta.data ', respuesta.data)
      

      //ItemData
      
      //checkoutData.splice(0) //borra la primera linea
      //cartItems.splice(0)

      //console.log("SSSSSSSSSSSSS")
      const cartItems = []
      for (let i = 0; i < respuesta.data.length; i++) { 
            cartItems.push({
                id: respuesta.data[i].id_hijo,
              name: respuesta.data[i].titulo,
              seller: respuesta.data[i].glosa, 
              titulo_padre: respuesta.data[i].titulo_padre 
            })
       //     console.log("descripcion_padre = :", respuesta.data[i].descripcion_padre  )
        } 

  
           checkoutData.value = {'cartItems':cartItems}
   

   
}

/**************************************************************************************************** */

async function getArmaArbolCategoria(p_id_padre,p_titulo,p_glosa) {
  tituloRaiz.value = p_titulo
  glosaUnidad.value = p_glosa

  matrizCategorias.value = []
  matrizCategorias.value =   await getArbolCategoria(p_id_padre,p_titulo)

  console.log("matrizCategorias.value =  " , matrizCategorias.value)
 
  isDialogVisibleLoader = false;
}

/**************************************************************************************************** */

async function getArbolCategoria(p_id_padre,p_titulo) {

console.log("p_id_padre" )
   
const valores =  { "p_id_padre" :  p_id_padre}  
const respuesta = await axios.post(API_URL + 'select_sitio_x_padre',valores)

 
const arbol =  [] 
for (let i = 0; i < respuesta.data.length; i++) { 
  
  arbol.push({ 
    id_hijo: respuesta.data[i].id_hijo,
    titulo: respuesta.data[i].titulo,
    glosa: respuesta.data[i].glosa,
    titulo_padre:    respuesta.data[i].titulo_padre,
    id_padre:    respuesta.data[i].id_padre,
     'rama' : await getArbolCategoria(respuesta.data[i].id_hijo,respuesta.data[i].titulo)
  })
   
} 
 
return arbol
}





definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const store = useConfigStore()

store.skin = 'default'

/*
 
const checkoutSteps = [
  {
    title: 'Cart',
    icon: customCart,
  },
  {
    title: 'Address',
    icon: customAddress,
  },
  {
    title: 'Payment',
    icon: customPayment,
  },
  {
    title: 'Confirmation',
    icon: customTrending,
  },
]
 */

 //const checkoutData = ref({ getSitiosHijos})
  

onMounted (async ()=> {
   getSitios()
   getSitiosHijos(2,"")
  //console.log("toatl arbol" , getArbolCategoria(2,""))
  matrizCategorias.value = await getArbolCategoria(2,"")
  //console.log("matrizCategorias = ", matrizCategorias.value)
  //console.log("largo de matrizCategorias = ", matrizCategorias.value.length)

})

 
 //console.log("checkoutDatann = ",checkoutDatann)
 

</script>

<template>
  <div class="checkout-page">
    <Navbar />
    <VContainer>
      <div class="checkout-card">
        <VCard>
          <VCardText>
            <!-- 👉 Stepper -->
             
            <AppStepper
              v-model:current-step="currentStep"
              class="checkout-stepper"
              :items="checkoutSteps"
              :direction="$vuetify.display.mdAndUp ? 'horizontal' : 'vertical'"
              align="center"               
              :@click=" getArmaArbolCategoria(checkoutSteps[currentStep].id_padre,checkoutSteps[currentStep].title,checkoutSteps[currentStep].glosa)"
            />
            <!--VBtn @click="getSitiosHijos(checkoutSteps[currentStep].id_padre,checkoutSteps[currentStep].title)">siguiente</VBtn-->
            
        
          </VCardText>
          <VDivider />
          <VCardText>
            <!-- 👉 stepper content -->
           
            <VWindow
              v-model="currentStep"
              class="disable-tab-transition"
              :touch="false"
            >
            <!--{{checkoutSteps.length}}-->
              <VWindowItem v-for="n in checkoutSteps.length" :key="n">
                <CartContent
                  v-model:current-step="currentStep"
                  v-model:matriz-categorias="matrizCategorias"
                  v-model:checkout-data="checkoutData"
                  v-model:titulo-raiz="tituloRaiz"
                  v-model:glosa-unidad="glosaUnidad"
                  
                  
                />
              </VWindowItem>
              <!--
              <VWindowItem>
                <AddressContent
                  v-model:current-step="currentStep"
                  v-model:checkout-data="checkoutData"
                />
              </VWindowItem>
              <VWindowItem>
                <PaymentContent
                  v-model:current-step="currentStep"
                  v-model:checkout-data="checkoutData"
                />
               
              </VWindowItem>
               -->
              <!--
              <VWindowItem>
                <ConfirmationContent v-model:checkout-data="checkoutData" />
              </VWindowItem>
              -->
            </VWindow>
          </VCardText>
        </VCard>
      </div>
    </VContainer>
    <Footer />
  </div>

  <VDialog
    v-model="isDialogVisibleLoader"
    width="300"
  >
    <VCard
      color="primary"
      width="300"
    >
      <VCardText class="pt-3">
        Espere por favor....
        <VProgressLinear
          indeterminate
          bg-color="rgba(var(--v-theme-surface), 0.1)"
          :height="8"
          class="mb-0 mt-4"
        />
      </VCardText>
    </VCard>
  </VDialog>



</template>

<style lang="scss">
.checkout-card {
  /*margin-block: 10.5rem 5.25rem;*/
  margin-block: 4.5rem 5.25rem;
}

@media (max-width: 960px) and (min-width: 600px) {
  .checkout-page {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}

@media (max-width: 600px) {
  .checkout-card {
    margin-block-start: 6rem;
  }
}
</style>
