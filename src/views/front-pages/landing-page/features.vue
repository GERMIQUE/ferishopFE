<script setup>
import check from '@images/svg/Check.svg';
import laptop from '@images/svg/laptop.svg';
import paper from '@images/svg/paper-send.svg';
import rocket from '@images/svg/rocket.svg';

const featuresData = [
  {
    title: 'Desarrollo Tecnológico',
    desc: 'Establecer la estrategia de digitalización incorporando la gobernanza de la información y desarrollo para optimizar los proceso de negocios y soluciones digitales.',
    icon: laptop,
  },
  {
    title: 'Sistemas de Información',
    desc: 'Administración y gestión de los sistemas transaccionales y operacionales de la empresa, velando por su continuidad y mejoramiento.',
    icon: rocket,
  },
  {
    title: 'Continuidad y Transición Operacional',
    desc: 'Garantizar la Continuidad Operacional de los Servicios Tecnológicos comprometidos en el Catálogo de Servicios y La Transición a la Operación de Nuevos Servicios Tecnológicos',
    icon: paper,
  },
  {
    title: ' ',
    desc: ' ', 
  },
  {
    title: 'Tecnologías y Comunicaciones',
    desc: 'Apoyar corporativamente a EFE en la continuidad operacional de la infraestructura tecnológica que permita facilitar u optimizar sus proceso diarios.',
    icon: check,
  },
  /*
  {
    title: 'Excellent Support',
    desc: 'An easy-to-follow doc with lots of references and code examples.',
    icon: user,
  },
  {
    title: 'Well Documented',
    desc: 'An easy-to-follow doc with lots of references and code examples.',
    icon: keyboard,
  },*/
]
</script>

<template>
  <VContainer id="ejes-estratégicos">
    <div class="feature-cards">
      <div class="headers d-flex justify-center flex-column align-center mb-12">
        <!--
        <VChip
          label
          color="primary"
          class="mb-4"
          size="small"
        >
          Useful Features
        </VChip>
        -->
        <div class="d-flex text-h4 mb-1 align-center flex-wrap justify-center">
          <div class="position-relative me-2">
            <div class="section-title">
              Nuestros Ejes Estratégicos
            </div>
          </div>
          para los exitos de los proyectos
        </div>
        <p class="text-body-1 mb-0">
          El catálogo de servicio es una referencia estratégica y técnica dentro de la organización TI, permite la descripción detallada de todos los servicios prestados y los recursos asignados para ello. Sirve de guía para los clientes a la hora de seleccionar un servicio que se adapte a sus necesidades, permitiendo delimitar las funciones y compromisos de la organización TI, además evita malos entendidos entre los diferentes actores implicados en la prestación de servicios.
        </p>
      </div>
      <VRow>
        <VCol
          v-for="(data, index) in featuresData"
          :key="index"
          cols="12"
          md="4"
          sm="6"
        >
          <div class="d-flex flex-column align-center justify-center gap-4 mx-auto">
            <VIcon
              :icon="data.icon"
              size="64"
              color="primary"
            />
            <div class="text-center">
              <h5 class="text-h5 mb-2">
                {{ data.title }}
              </h5>
              <p
                class="text-body-1 mb-6"
                style="max-inline-size: 310px;"
              >
                {{ data.desc }}
              </p>
            </div>
          </div>
        </VCol>
      </VRow>
    </div>
  </VContainer>
</template>

<style lang="scss" scoped>
.feature-cards {
  margin-block: 3.75rem;
}

.section-title::after {
  position: absolute;
  background: url("../../../assets/images/front-pages/icons/section-title-icon.png") no-repeat left bottom;
  background-size: contain;
  block-size: 100%;
  content: "";
  inline-size: 120%;
  inset-block-end: 0;
  inset-inline-start: -12%;
}

.section-title {
  font-size: 24px;
  font-weight: 800;
  line-height: 36px;
}

.feature {
  .v-avatar {
    &.v-avatar--variant-outlined {
      border: 2px solid rgba(var(--v-theme-primary), 0.32);

      &:hover {
        background: rgba(var(--v-theme-primary), 0.16);
        cursor: pointer;
      }
    }
  }
}
</style>
