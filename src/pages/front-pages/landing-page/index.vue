<script setup>
import Footer from '@/views/front-pages/front-page-footer.vue'
import Navbar from '@/views/front-pages/front-page-navbar.vue'
import Banner from '@/views/front-pages/landing-page/banner.vue'
import ContactUs from '@/views/front-pages/landing-page/contact-us.vue'
import Features from '@/views/front-pages/landing-page/features.vue'
import HeroSection from '@/views/front-pages/landing-page/hero-section.vue'
import ProductStats from '@/views/front-pages/landing-page/product-stats.vue'
import { useConfigStore } from '@core/stores/config'

const store = useConfigStore()

store.skin = 'default'
definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const activeSectionId = ref()
const refHome = ref()
const refFeatures = ref()
const refTeam = ref()
const refContact = ref()
const refFaq = ref()

useIntersectionObserver([
  refHome,
  refFeatures,
  refTeam,
  refContact,
  refFaq,
], ([{ isIntersecting, target }]) => {
  if (isIntersecting)
    activeSectionId.value = target.id
}, { threshold: 0.25 })
</script>

<template>
  <div class="landing-page-wrapper">
    <Navbar :active-id="activeSectionId" />

    <!-- 👉 Hero Section  -->
    <HeroSection ref="refHome" />
<!-- 👉 Product stats   Objetivo del sitio -->
     <ProductStats/>

     <!-- 👉 Useful features Ejes estrategicos  -->
    <div :style="{ 'background-color': 'rgb(var(--v-theme-surface))' }">
      <Features ref="refFeatures" />
    </div>


     <!-- 👉 Contact Us sOBRE NOSOTROS -->
     <ContactUs ref="refContact" />

      <!-- 👉 Banner  -->
    <Banner />
    <!-- 👉 Customer Review  Nuestros Valores
    <div :style="{ 'background-color': 'rgb(var(--v-theme-surface))' }">
      <CustomersReview />
    </div>
-->
    
       
 

    
    

    <!-- 👉 Our Team 
    <div :style="{ 'background-color': 'rgb(var(--v-theme-surface))' }">
      <OurTeam ref="refTeam" />
    </div>
-->
    <!-- 👉 Pricing Plans 
    <div :style="{ 'background-color': 'rgb(var(--v-theme-surface))' }">
      <PricingPlans />
    </div>
-->
   

    <!-- 👉 FAQ Section 
    <div :style="{ 'background-color': 'rgb(var(--v-theme-surface))' }">
      <FaqSection ref="refFaq" />
    </div>
-->
   

    

    <!-- 👉 Footer -->
    <Footer />
  </div>
</template>

<style lang="scss">
@media (max-width: 960px) and (min-width: 600px) {
  .landing-page-wrapper {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}
</style>
