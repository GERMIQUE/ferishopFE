<script setup>
import appleImg from '@images/front-pages/landing-page/apple-icon.png'
import googlePlayImg from '@images/front-pages/landing-page/google-play-icon.png'
import footerDarkBg from '@images/front-pages/backgrounds/footer-bg-dark.png'
import footerLightBg from '@images/front-pages/backgrounds/footer-bg-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const footerBg = useGenerateImageVariant(footerLightBg, footerDarkBg)


const pagesList = [
  {
    name: 'Pricing',
    to: { name: 'front-pages-pricing' },
  },
  {
    name: 'Payment',
    to: { name: 'front-pages-payment' },
    isNew: true,
  },
  {
    name: 'Checkout',
    to: { name: 'front-pages-checkout' },
  },
  {
    name: 'Help Center',
    to: { name: 'front-pages-help-center' },
  },
  {
    name: 'Login/Register',
    to: { name: 'pages-authentication-login-v2' },
  },
]


const demoList = [
   
  {
  title: 'Acceso Portal del Lobby',
    to: 'https://www.leylobby.gob.cl/solicitud/audiencia/779',
  },
  {
    title: 'Transparencia Activa',
    to: 'https://www.efe.cl/corporativo/transparencia-activa/',
  },
  {
    title: 'Politicas de Privacidad',
    to: 'https://www.efe.cl/politica-de-privacidad-y-proteccion-de-datos-personales/',
  },
 
]
const demoList2 = [
  {
    title: 'Atención al Cliente',
    to: 'https://www.efe.cl/atencion-a-clientes/oficinas-de-atencion-a-cliente/',
  },
  {
    title: 'Canal de Denuncias',
    to: 'https://www.efe.cl/corporativo/canal-de-denuncias/',
  },
   
 
]
</script>

<template>
  <div class="footer">
    <div
      class="footer-top pt-11"
      :style="{ 'background-image': `url(${footerBg})` }"
    >
      <VContainer>
        <VRow>
          <!-- 👉 Footer  
          <VCol
            cols="12"
            md="5"
          >
            <div
              class="mb-4"
              :class="$vuetify.display.smAndDown ? 'w-100' : 'w-75'"
            >
              <div class="app-logo mb-6">
                <VNodeRenderer :nodes="themeConfig.app.logo" />
                <h1 class="app-logo-title text-white">
                  {{ themeConfig.app.title }}
                </h1>
              </div>

              <div
                class="mb-6"
                :class="$vuetify.theme.current.dark ? 'text-body-1' : 'text-white-variant'"
              >
                Most Powerful & Comprehensive 🤩 Vuejs Admin Template with Elegant Material Design & Unique Layouts.
              </div>
              <VForm class="subscribe-form d-flex align-center">
                <AppTextField
                  label="Subscribe to newsletter"
                  placeholder="john@email.com"
                />
                <VBtn class="align-self-end rounded-s-0">
                  Subscribe
                </VBtn>
              </VForm>
            </div>
          </VCol>
        -->
          <!-- 👉 Demos -->
          <VCol
            md="2"
            sm="4"
            xs="6"
          >
            <div class="footer-links">
              <h6 class="footer-title text-h6 mb-6">
                Sitios de Interes
              </h6>
              <ul style="list-style: none;">
                <li
                  v-for="(item, index) in demoList"
                  :key="index"
                  class="mb-4"
                >
                  <a
                    :href="item.to"
                    target="_blank"
                    rel="noopener noreferrer"
                    :class="$vuetify.theme.current.dark ? 'text-body-1' : 'text-white-variant'"
                  >
                    {{ item.title }}
                  </a>
                </li>
              </ul>
            </div>
          </VCol>
          <VCol
            md="2"
            sm="4"
            xs="6"
          >
            <div class="footer-links">
              <h6 class="footer-title text-h6 mb-6">
                Sitios  Ayuda al Cliente
              </h6>
              <ul style="list-style: none;">
                <li
                  v-for="(item, index) in demoList2"
                  :key="index"
                  class="mb-4"
                >
                  <a
                    :href="item.to"
                    target="_blank"
                    rel="noopener noreferrer"
                    :class="$vuetify.theme.current.dark ? 'text-body-1' : 'text-white-variant'"
                  >
                    {{ item.title }}
                  </a>
                </li>
              </ul>
            </div>
          </VCol>
        <VCol>
        <a href="https://www.efe.cl/">  <img class="img-fluid" src="https://www.efe.cl/wp-content/themes/efe/images/logo-EFE-blanco_v2.svg" alt="EFE"></a>
        </VCol>
          <!-- 👉 Pages   
          <VCol
            md="2"
            sm="4"
            xs="6"
          >
            <div class="footer-links">
              <h6 class="footer-title text-h6 mb-6">
                Pages
              </h6>
              <ul style="list-style: none;">
                <li
                  v-for="(item, index) in pagesList"
                  :key="index"
                  class="mb-4"
                >
                  <RouterLink
                    :class="$vuetify.theme.current.dark ? 'text-body-1' : 'text-white-variant'"
                    class="me-2"
                    :to="item.to"
                  >
                    {{ item.name }}
                  </RouterLink>
                  <template v-if="item.isNew">
                    <VChip
                      color="primary"
                      variant="elevated"
                      label
                      size="small"
                    >
                      New
                    </VChip>
                  </template>
                </li>
              </ul>
            </div>
          </VCol>
        -->
          <!-- 👉 Download App 
          <VCol
            cols="12"
            md="3"
            sm="4"
          >
            <div>
              <h6 class="footer-title text-h6 mb-6">
                Download our app
              </h6>

              <div>
                <VBtn
                  v-for="(item, index) in [
                    { image: appleImg, store: 'App Store' },
                    { image: googlePlayImg, store: 'Google Play' },
                  ]"
                  :key="index"
                  color="#282c3e"
                  height="56"
                  class="mb-4 d-block"
                >
                  <template #default>
                    <div class="d-flex align-center gap-x-8 footer-logo-buttons">
                      <VImg
                        :src="item.image"
                        height="34"
                        width="34"
                      />
                      <div class="d-flex flex-column justify-content-start">
                        <div :class="$vuetify.theme.current.dark ? 'text-body-2' : 'text-white-variant text-body-2'">
                          Download on the
                        </div>
                        <h6
                          class="text-h6 text-start"
                          :class="$vuetify.theme.current.dark ? 'text-body-1' : 'footer-title'"
                        >
                          {{ item.store }}
                        </h6>
                      </div>
                    </div>
                  </template>
                </VBtn>
              </div>
            </div>
          </VCol>
          -->
        </VRow>
      </VContainer>
    </div>

    <!-- 👉 Footer Line -->
    <div class="footer-line w-100">
      <VContainer>
        <div class="d-flex justify-space-between flex-wrap gap-y-5 align-center">
          <div class="text-body-1 text-white-variant text-wrap me-4">
            &copy;

            {{ new Date().getFullYear() }}
            <a
              href="https://pixinvent.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="font-weight-bold ms-1 text-white"
            >EFE</a>,
            Trenes de Chile.
            
          </div>
   <!--
          <div class="d-flex gap-x-6">


            <template
              v-for="(item, index) in [
                { title: 'github', icon: 'tabler-brand-linkedin-filled', href: 'https://www.linkedin.com/company/empresa-de-los-ferrocarriles-del-estado-grupo-efe/mycompany/' },
                { title: 'facebook', icon: 'tabler-brand-facebook-filled', href: 'https://www.facebook.com/pixinvents/' },
                { title: 'twitter', icon: 'tabler-brand-twitter-filled', href: 'https://twitter.com/pixinvents' },
                { title: 'google', icon: 'tabler-brand-youtube-filled', href: 'https://www.youtube.com/channel/UClOcB3o1goJ293ri_Hxpklg' },
              ]"
              :key="index"
            >
              <a
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                <VIcon
                  :icon="item.icon"
                  size="16"
                  color="white"
                />
              </a>
            </template>
          </div>
          -->
        </div>
      </VContainer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-title {
  color: rgba(255, 255, 255, 92%);
}

.footer-top {
  border-radius: 60px 60px 0 0;
  background-size: cover;
  color: #fff;
}

.footer-links {
  .text-white-variant,
  .text-body-1 {
    &:hover {
      color: #fff;
    }
  }
}

.footer-line {
  background: #282c3e;
}
</style>

<style lang="scss">
.subscribe-form {
  .v-label {
    color: rgba(225, 222, 245, 90%) !important;
  }

  .v-field {
    border-end-end-radius: 0;
    border-end-start-radius: 10px;
    border-start-end-radius: 0;
    border-start-start-radius: 10px;

    input.v-field__input::placeholder {
      color: rgba(225, 222, 245, 40%) !important;
    }

    input.v-field__input {
      color: rgba(255, 255, 255, 78%);
    }
  }
}

.footer {
  border-radius: 50%;

  @media (min-width: 600px) and (max-width: 960px) {
    .v-container {
      padding-inline: 2rem !important;
    }

    .footer-logo-buttons {
      gap: 0.75rem;
    }
  }
}
</style>
