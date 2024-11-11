<script setup>
import check from '@images/svg/Check.svg'
import diamond from '@images/svg/Diamond.svg'
import laptop from '@images/svg/laptop.svg'
import user from '@images/svg/user.svg'

const statData = [
  {
    title: 'Objetivo del Sitio',
    value: 'El catálogo de servicio es una referencia estratégica y técnica dentro de la organización TI, permite la descripción detallada de todos los servicios prestados y los recursos asignados para ello. Sirve de guía para los clientes a la hora de seleccionar un servicio que se adapte a sus necesidades, permitiendo delimitar las funciones y compromisos de la organización TI, además evita malos entendidos entre los diferentes actores implicados en la prestación de servicios',
    color: 'primary',
  },
  {
    value: 'Este documento contiene los servicios de Tecnológicos ofertados por la Gerencia de Tecnología y Transformación Digital y aplica para los usuarios de EFE y Filiales. En algunos casos, los servicios no son prestados a todos los clientes, lo que se detalla en el cuerpo de cada servicio indicando las limitaciones de este.', 
    title: 'Alcance y Vigencia',    
    color: 'primary',
  },
  {
    value : 'El objetivo principal del presente documento es consolidar y sintetizar las características de los servicios TIC que ofrece actualmente la Gerencia de Tecnología y Transformación Digital o GTTS, a sus clientes y usuarios, así como sus alcances y niveles de servicio definidos.',
    title: ' Objetivo del Catálogo de Servicios', 
    color: 'primary',
  },
  
]
</script>

<template>
  <VContainer id="objetivo-del sitio">
  <div :style="{ 'background-color': 'rgb(var(--v-theme-surface))' }">
    <VContainer>
      <div class="py-12">
        <VRow
        v-for="(product, index) in statData"
            :key="index"
            cols="12"
            sm="6"
            lg="3"
        >
          <VCol
           
          >
            <VCard
              flat
              :style="{ border: `1px solid rgba(var(--v-theme-${product.color}))` }"
            >
              <VCardText class="text-center">
                 
                <h3 class="text-h3">
                  {{ product.title }}
                  
                </h3>
                <p class="text-body-1 font-weight-medium mb-0 text-wrap">
                  {{ product.value }}
                </p>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </div>
    </VContainer>
  
  </div>
</VContainer>
</template>
