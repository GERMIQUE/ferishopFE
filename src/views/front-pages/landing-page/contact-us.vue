<script setup>
import ConnectImg from '@images/front-pages/landing-page/contact-customer-service.png'

const name = ref('')
const email = ref('')
const message = ref('')
</script>

<template>
  <VContainer id="sobre-nosotros">
    <!-- 👉 Headers  -->
    <div class="contact-us-section">
      <div class="headers d-flex justify-center flex-column align-center pb-16">
        <!--
        <VChip
          label
          color="primary"
          class="mb-4"
          size="small"
        >
          Contact Us
        </VChip>
        -->
        <h4 class="d-flex align-center text-h4 mb-1 flex-wrap justify-center">
          <div class="position-relative me-2">
            <div class="section-title">
              Sobre Nosotros
            </div>
          </div>
           
        </h4>
        <p class="text-body-1 mb-0">
          Quienes Somos
        </p>
      </div>

      <div class="mb-15">
        <VRow class="match-height">
          <VCol
            cols="12"
            md="5"
          >
            <div >
              <VCard
                variant="outlined"
                border
                class="pa-2"
                :style="{ borderRadius: '3.75rem 0.375rem 0.375rem 0.375rem' }"
              >
                <VImg
                  :src="ConnectImg"
                  :style="{ borderRadius: '3.75rem 0.375rem 0.375rem 0.375rem' }"
                />
                <VCardText class="pa-4 pb-1">
                  <!--
                  <div class="d-flex justify-space-between flex-wrap gap-y-4">
                    <div
                      v-for="(item, index) in [
                        { title: 'Email', icon: 'tabler-mail', color: 'primary', value: 'example@gmail.com' },
                        { title: 'Phone', icon: 'tabler-phone-call', color: 'success', value: '+1234 568 963' },
                      ]"
                      :key="index"
                      class="d-flex gap-x-3 align-center"
                    >
                      <div>
                        <VAvatar
                          size="36"
                          :color="item.color"
                          variant="tonal"
                          class="rounded-sm"
                        >
                          <VIcon
                            :icon="item.icon"
                            size="24"
                          />
                        </VAvatar>
                      </div>

                      <div>
                        <div class="text-body-1">
                          {{ item .title }}
                        </div>
                        <h6 class="text-h6">
                          {{ item.value }}
                        </h6>
                      </div>
                    </div>
                  </div>
                  -->
                </VCardText>
              </VCard>
            </div>
          </VCol>

          <VCol
            cols="12"
            md="7"
          >
            <VCard>
              <VCardItem class="pb-0">
                <h4 class="text-h4 mb-1">
                  Propósito ¿Para qué?
                </h4>
              </VCardItem>

              <VCardText>
                 
                  Establecer la innovación y la transformación como pilares estratégicos en EFE mediante el aprovechamiento de la tecnología
               
              </VCardText>  
                <VCardItem class="pb-0">
                <h4 class="text-h4 mb-1">
                  Misión ¿Cómo lo hacemos?
                </h4>
              </VCardItem>
              <VCardText>
                 
                  Desempeñar un papel fundamental como socio estratégico de la organización, liderando la adopción de tecnologías innovadoras que se alineen con los objetivos del negocio. Nuestro compromiso es garantizar la continuidad de los servicios tecnológicos con un enfoque en la eficiencia, calidad, disciplina y gestión de riesgos

               
              </VCardText>  
               
                <VCardItem class="pb-0">
                <h4 class="text-h4 mb-1">
                  Visión ¿Qué queremos conseguir? 
                </h4>
              </VCardItem>
              <VCardText>
                 
                  Ser lideres en tecnología disruptiva a través de investigación y desarrollo (I+D), priorizando la innovación, agilidad, disciplina y efectividad en todas las áreas de la organización
                 
              </VCardText>  
              
              <!--
                <VForm @submit.prevent="() => {}">
                  <VRow>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppTextField
                        v-model="name"
                        placeholder="John Doe"
                        label="Full Name"
                      />
                    </VCol>

                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppTextField
                        v-model="email"
                        placeholder="johndoe@gmail.com"
                        label="Email address"
                      />
                    </VCol>

                    <VCol cols="12">
                      <AppTextarea
                        v-model="message"
                        placeholder="Write a message"
                        rows="3"
                        label="Message"
                      />
                    </VCol>

                    <VCol>
                      <VBtn type="submit">
                        Send Inquiry
                      </VBtn>
                    </VCol>
                  </VRow>
                </VForm>
                -->
              
            </VCard>
          </VCol>
        </VRow>
      </div>
    </div>
  </VContainer>
</template>

<style lang="scss" scoped>
.contact-us-section {
  margin-block: 5.25rem;
}

.section-title {
  font-size: 24px;
  font-weight: 800;
  line-height: 36px;
}

.section-title::after {
  position: absolute;
  background: url("../../../assets/images/front-pages/icons/section-title-icon.png") no-repeat left bottom;
  background-size: contain;
  block-size: 100%;
  content: "";
  font-weight: 800;
  inline-size: 120%;
  inset-block-end: 12%;
  inset-inline-start: -12%;
}

.contact-card {
  position: relative;
}

.contact-card::before {
  position: absolute;
  content: url("@images/front-pages/icons/contact-border.png");
  inset-block-start: -2.5rem;
  inset-inline-start: -2.5rem;
}

@media screen and (max-width: 999px) {
  .contact-card::before {
    display: none;
  }
}
</style>
