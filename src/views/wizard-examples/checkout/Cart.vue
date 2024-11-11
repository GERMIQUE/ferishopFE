<script setup>
import logo1 from '@images/avatars/avatar-1.png';
import emptyCartImg from '@images/pages/empty-cart.png';

//ShareProjectDialog: typeof import('./src/components/dialogs/ShareProjectDialog.vue')['default']
//import ShareProjectDialog from './src/components/dialogs/ShareProjectDialog.vue'
//import ShareProjectDialog from '../../../../src/components/dialogs/ShareProjectDialog.vue'

import axios from 'axios';


/**Modal POPUP */
const isShareProjectDialogVisible = ref(false)

const isDialogVisible = ref(false)

 //const API_URL = process.env.VITE_API_URL   //  'http://localhost:4444/'
 const API_URL = import.meta.env.VITE_API_URL 

const props = defineProps({
  currentStep: {
    type: Number,
    required: false,
  },
  checkoutData: {
    type: Object,
   // required: true,
  },

  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  matrizCategorias: {
    type: Object,
    required: true,
  },
  isDialogVisibleLoader: {
    type: Boolean,
    required: true,
  },
  tituloRaiz: {
    type: Text,
    required: false,
  },

  glosaUnidad: {
    type: Text,
    required: false,
  },

  
   
})







const emit = defineEmits([
  //'update:currentStep',
  'update:checkout-data',
])

/****************acordion anidado*************** */

const unidad = ref([])
const servicio = ref([])
const categoria = ref([])



/*************************** */
const subCategoriasSteps = ref([
  /*
  {
    id_hijo: '',
    titulo: 'Cart',
    glosa: '',
    titulo_padre:'',
  }*/
])

const subCategoriasStepsNivel2 = ref([])




const membersList = ref([
  /*{
    avatar: logo1,
    titulo: 'Lester Palmer',
    glosa: 'jerrod98@gmail.com',
     
  }*/
])




const tituloCategoria = ref('')
const tituloDetalle = ref('')

//getDetalleSitioXHijo(15,"")

//const checkoutCartDataLocal = ref(props.checkoutData)
const checkoutCartDataLocal = computed(() => {
    return props.checkoutData
})

const matrizCategoriastDataLocal = computed(() => {  
    return props.matrizCategorias
})
const tituloRaizDataLocal = computed(() => {  
    return props.tituloRaiz
})

const glosaUnidadDataLocal = computed(() => {  
    return props.glosaUnidad
})



console.log("cart.vue-  matrizCategorias ", props.matrizCategorias)
console.log("cart.vue-  matrizCategoriastDataLocal ", matrizCategoriastDataLocal)

/*
const subCategoriasStepsLocal = computed(() => {
    return props.subCategoriasSteps
})
*/

const removeItem = item => {
  checkoutCartDataLocal.value.cartItems = checkoutCartDataLocal.value.cartItems.filter(i => i.id !== item.id)
}

const totalCost = computed(() => {
  return checkoutCartDataLocal.value.cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)
})

const updateCartData = () => {
  checkoutCartDataLocal.value.orderAmount = totalCost.value
  emit('update:checkout-data', checkoutCartDataLocal.value)
}

const nextStep = () => {
  updateCartData()
//  emit('update:currentStep', props.currentStep ? props.currentStep + 1 : 1)
}

//watch(() => props.currentStep, updateCartData)









async function getSubCategorias(p_id_padre,p_titulo) {

            const valores =  { "p_id_padre" :  p_id_padre} 
            console.log(  "p_id_padre" ,  p_id_padre)

           
            tituloCategoria.value = p_titulo

            console.log("p_titulo 2 =  ", p_titulo)
            console.log("tituloCategoria.value =  ", tituloCategoria.value)

            const respuesta = await axios.post(API_URL + 'select_sitio_x_padre',valores)

            /* obtengo el valor para mnostrar en html */
            //sitios.value = respuesta.data
              console.log('respuesta.data ', respuesta.data) 

            //checkoutSteps.splice(0) //borra la primera linea
              subCategoriasSteps.value = []
              console.log("Antes de Cargar:" , subCategoriasSteps.value)
            for (let i = 0; i < respuesta.data.length; i++) {
              
              // console.log("respuesta", respuesta.data[i].descripcion);
              
              subCategoriasSteps.value.push({ 
                id_hijo: respuesta.data[i].id_hijo,
                titulo: respuesta.data[i].titulo,
                glosa: respuesta.data[i].glosa,
                titulo_padre:    respuesta.data[i].titulo_padre

              })
            } 
            console.log(subCategoriasSteps.value)
}


async function getSubCategoriasNIvel2(p_id_padre,p_titulo) {

const valores =  { "p_id_padre" :  p_id_padre} 
console.log(  "p_id_padre" ,  p_id_padre)


tituloDetalle.value = p_titulo

console.log("p_titulo 2 =  ", p_titulo)
console.log("tituloCategoria.value =  ", tituloCategoria.value)

const respuesta = await axios.post(API_URL + 'select_sitio_x_padre',valores)

/* obtengo el valor para mnostrar en html */
//sitios.value = respuesta.data
  console.log('respuesta.data ', respuesta.data) 

//checkoutSteps.splice(0) //borra la primera linea
  subCategoriasStepsNivel2.value = []
  console.log("Antes de Cargar:" , subCategoriasStepsNivel2.value)
for (let i = 0; i < respuesta.data.length; i++) {
  
  // console.log("respuesta", respuesta.data[i].descripcion);
  
  subCategoriasStepsNivel2.value.push({ 
    id_hijo: respuesta.data[i].id_hijo,
    titulo: respuesta.data[i].titulo,
    glosa: respuesta.data[i].glosa,
    titulo_padre:    respuesta.data[i].titulo_padre

  })
} 
console.log(subCategoriasStepsNivel2.value)
}




async function getDetalleSitioXHijo(p_id_hijo,p_titulo) {

const valores =  { "p_id_hijo" :  p_id_hijo} 

console.log("Entro a  getDetalleSitioXHijo")
console.log(  "p_id_hijo" ,  p_id_hijo)


tituloDetalle.value = p_titulo

console.log("p_titulo =  ", p_titulo)
console.log("tituloDetalle.value =  ", tituloDetalle.value)

const respuesta = await axios.post(API_URL + 'select_detalle_sitio_x_hijo',valores)

/* obtengo el valor para mnostrar en html */
//sitios.value = respuesta.data
  console.log('respuesta.data ', respuesta.data) 

//checkoutSteps.splice(0) //borra la primera linea
membersList.value = []
for (let i = 0; i < respuesta.data.length; i++) {
  
  // console.log("respuesta", respuesta.data[i].descripcion);
  
  membersList.value.push({  
    avatar: logo1,
    titulo: respuesta.data[i].titulo,
    glosa: respuesta.data[i].glosa, 

  })
} 
console.log("membersList.value = ",membersList.value)
}




</script>

<template>
  <VRow v-if="checkoutCartDataLocal">
    <VCol
      cols="12"
      lg="8"
    >
      <!-- 👉 Offers alert 
      <VAlert
        type="success"
        variant="tonal"
        icon="tabler-percentage"
        title="Available Offer"
        closable
      >
         
      template #text>
          <p class="mb-0">
            - 0% Instant Discount on Bank of America Corp Bank Debit and Credit cards
            <br>
            - 50% Cashback Voucher of up to $60 on first ever PayPal transaction. TCA
          </p>
        </template  
      </VAlert>
    -->
      <!--
      {{ checkoutCartDataLocal }}
       -->
      <h5 class="text-h3 my-4">
        <!-- {{ checkoutCartDataLocal.cartItems[0].titulo_padre }} ({{ checkoutCartDataLocal.cartItems.length }} Categorias) -->
        {{ tituloRaizDataLocal }}  ({{ matrizCategoriastDataLocal.length  + " Unidades de Servicios"}} )
      </h5>

  <VExpansionPanels variant="inset">
    <VExpansionPanel v-for="(item,index) in matrizCategoriastDataLocal"  :key="item.id_hijo"  >
      <VExpansionPanelTitle><VAvatar
                          :image="logo1"
                          size="32"
                        /> <h2> - {{ item.titulo }} </h2>    
                      
                      </VExpansionPanelTitle>               
      <VExpansionPanelText>
        {{ item.glosa }}  
<!---------------------nivel 2----------------------->
  <VExpansionPanels variant="inset2">
    <VExpansionPanel v-for="(item2,index2) in matrizCategoriastDataLocal[index].rama"  :key="item2.id_hijo"  >
      <VExpansionPanelTitle> 
        <VIcon
              icon="tabler-circle-filled"
              :color="blue-grey"
              class="me-2"
              size="12"></VIcon>
        {{ item2.titulo }}  </VExpansionPanelTitle>
      <VExpansionPanelText>
        {{ item2.glosa }} 
              <!---------------------nivel 3----------------------->
                <VExpansionPanels variant="inset2">
                  <VExpansionPanel v-for="(item3) in matrizCategoriastDataLocal[index].rama[index2].rama"  :key="item3.id_hijo"  >
                    <VExpansionPanelTitle @click="isDialogVisible = true; getDetalleSitioXHijo(item3.id_hijo,item3.titulo)" >
                      <VIcon
              icon="tabler-album"
              :color="green"
              class="me-3"
              size="12"></VIcon>  
                    {{ item3.titulo }} 
                    </VExpansionPanelTitle>
                    <VExpansionPanelText>
                      {{ item3.glosa }} 
                    </VExpansionPanelText> 
                  </VExpansionPanel>
                </VExpansionPanels>
      <!-----------------------termino nivel 3-------------------------->
      </VExpansionPanelText> 
    </VExpansionPanel>
  </VExpansionPanels>
<!-----------------------termino nivel 2-------------------------->



      </VExpansionPanelText> 
    </VExpansionPanel>
  </VExpansionPanels>

      <!-- 👉 Cart items -->
     

      <!-- 👉 Add more from wishlist 
      <div
        class="d-flex align-center justify-space-between rounded py-2 px-5 text-base mt-4"
        style="border: 1px solid rgb(var(--v-theme-primary));"
      >
        <a
          href="#"
          class="font-weight-medium"
        >Add more products from wishlist</a>
        <VIcon
          icon="tabler-arrow-right"
          size="16"
          class="flip-in-rtl text-primary"
        />
      </div>
      -->
    </VCol>

    <VCol
      cols="12"
      lg="4"
    >
      <VCard
        flat
        variant="outlined"
      >
      <VCardText>
        <div> 
                        <h3> {{ tituloRaiz }}</h3>
                        <p></p>
                        <h4 class="text-disabled">
                <p>{{ glosaUnidad }}</p>  
            </h4>
          </div>
      </VCardText> 
      <!-- 👉 payment offer -->
        <VCardText   v-for="n in subCategoriasSteps.length" :key="n" >
          
<!--
          <div class="d-flex align-center gap-4 flex-wrap">
            <AppTextField
              v-model="checkoutCartDataLocal.promoCode"
              placeholder="Enter Promo Code"
              style="min-inline-size: 200px;"
            />

            <VBtn
              variant="tonal"
              @click="updateCartData"
            >
              Apply
            </VBtn>
          </div>
-->
          <!-- 👉 Gift wrap banner -->
          <div class="bg-var-theme-background rounded pa-6 mt-4">
            
            <h6 class="text-h6 mb-2">
              <VIcon
              icon="tabler-circle-filled"
              :color="blue-grey"
              class="me-2"
              size="12"
            />
            
              {{ subCategoriasSteps[n].titulo }}  
              
            </h6>
            
            <p class="mb-5">
              {{ subCategoriasSteps[n].glosa }}
            </p>

            <h6 class="text-h6">
              <!--<a href="#">Ver Detalle {{ subCategoriasSteps.length}}</a>-->
              <VBtn class="text-capitalize" @click="isDialogVisible = true; getSubCategoriasNIvel2(subCategoriasSteps[n].id_hijo,subCategoriasSteps[n].titulo)">
                Detalle
              </VBtn>
              <!--
                <VBtn @click="isDialogVisible = true">
            Mostrar
          </VBtn>
        -->
            </h6>
          </div>
        </VCardText>
        
        <VDivider />
        <!--ShareProjectDialog v-model:isDialogVisible="isShareProjectDialogVisible" /-->
        <!-- 👉 Price details 
        <VCardText>
          <h6 class="text-h6 mb-4">
            Price Details
          </h6>

          <div class="text-high-emphasis">
            <div class="d-flex justify-space-between mb-2">
              <span>Bag Total</span>
              <span class="text-medium-emphasis">${{ totalCost }}.00</span>
            </div>

            <div class="d-flex justify-space-between mb-2">
              <span>Coupon Discount</span>
              <a href="#">Apply Coupon</a>
            </div>

            <div class="d-flex justify-space-between mb-2">
              <span>Order Total</span>
              <span class="text-medium-emphasis">${{ totalCost }}.00</span>
            </div>

            <div class="d-flex justify-space-between">
              <span>Delivery Charges</span>

              <div class="d-flex align-center">
                <div class="text-decoration-line-through text-disabled me-2">
                  $5.00
                </div>
                <VChip
                  size="small"
                  color="success"
                >
                  FREE
                </VChip>
              </div>
            </div>
          </div>
        </VCardText>
-->
        <VDivider />
<!--
        <VCardText class="d-flex justify-space-between pa-6">
          <h6 class="text-h6">
            Total
          </h6>
          <h6 class="text-h6">
            ${{ totalCost }}.00
          </h6>
        </VCardText>
      -->
      </VCard>
    <!--
      <VBtn
        block
        class="mt-4"
        @click="nextStep"
      >
        Place Order
      </VBtn>
      -->
    </VCol>
  </VRow>
<!--------------------------dialogo-------------------------------------------->

<!--VDialog
    :model-value="props.isDialogVisible"
    :width="$vuetify.display.smAndDown ? 'auto' : 900"
    @update:model-value="dialogVisibleUpdate"
-->

<VDialog
    v-model="isDialogVisible"
    class="v-dialog-xl" 
>
    <!-- Dialog Activator -->
     <!--
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Open Dialog
      </VBtn>
    </template>
    -->
     
 
       
    <VBtn  color='#002854'
            class="text-capitalize" @click="isDialogVisible=false"
          >
            Salir Caracteristicas
      </VBtn>
         
    <!-- 👉 Dialog close btn 
    <DialogCloseBtn @click=" isDialogVisible=false" />
-->
    <VCard  >
      <VCardText>
        <h3 class="text-h4 text-center mb-2">
         {{tituloDetalle}}
        </h3>
        <!--
        <p class="text-body-1 text-center mb-6">
          Share project with a team members
        </p>
-->
        <!--
        <AppAutocomplete
          label="Add Members"
          :items="membersList"
          item-title="name"
          item-value="name"
          placeholder="Add project members..."
        >
        
          <template #item="{ props: listItemProp, item }">
            <VListItem v-bind="listItemProp">
              <template #prepend>
                <VAvatar
                  :image="item.raw.avatar"
                  size="30"
                />
              </template>
            </VListItem>
          </template>
        </AppAutocomplete>
-->
        <h3 class="text-h5 mb-4 mt-6">
          {{ membersList.length  }} Caracteristicas
        </h3>

        <VList class="card-list">
          <VListItem
            v-for="member in membersList"
            :key="member.titulo"
          >
             

            <VListItemTitle>
              <h5 class="text-h4 mb-4 mt-6"> 
              {{ member.titulo }}
            </h5>
            </VListItemTitle>
            <VListItem>
              <span v-html="member.glosa" />
            </VListItem>
    <!--
            <template #append>
              <VBtn
                variant="text"
                color="secondary"
                :icon="$vuetify.display.xs"
              >
                <span class="d-none d-sm-block me-1">{{ member.permission }}</span>
                <VIcon icon="tabler-chevron-down" />

                <VMenu activator="parent">
                  <VList :selected="[member.permission]">
                    <VListItem
                      v-for="(item, index) in ['Owner', 'Can Edit', 'Can Comment', 'Can View']"
                      :key="index"
                      :value="item"
                    >
                      <VListItemTitle>{{ item }}</VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>

              </VBtn>
            </template>
          -->
          </VListItem>
        </VList>

        <div class="d-flex align-center justify-center justify-sm-space-between flex-wrap gap-3 mt-6">
          <h6 class="text-h6 font-weight-medium d-flex align-start">
            <!--
            <VIcon
              icon="tabler-users"
              class="me-2"
              size="20"
            />
           -->
          </h6>

          <VBtn color='#002854'
            class="text-capitalize" @click="isDialogVisible=false"
          >
            Salir
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
 



  <!-----------------------termino dialogo---------------------------------------------------->
</template>

<style lang="scss" scoped>
.checkout-item-remove-btn {
  position: absolute;
  inset-block-start: 14px;
  inset-inline-end: 14px;
}

.pricing-dialog {
  .pricing-title {
    font-size: 1.5rem !important;
  }
}

 
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}

.subtituloArbol {
  font-size: 0.9375rem ;
  line-height: 1.375rem ;
  font-weight: 400
}
  
</style>
 