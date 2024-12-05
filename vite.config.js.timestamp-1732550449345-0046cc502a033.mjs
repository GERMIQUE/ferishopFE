// vite.config.js
import VueI18nPlugin from "file:///C:/mi%20casa/proyecto%20ferishop/Sistema/FerishopFe/ferishopFE-1/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import vue from "file:///C:/mi%20casa/proyecto%20ferishop/Sistema/FerishopFe/ferishopFE-1/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/mi%20casa/proyecto%20ferishop/Sistema/FerishopFe/ferishopFE-1/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { fileURLToPath } from "node:url";
import AutoImport from "file:///C:/mi%20casa/proyecto%20ferishop/Sistema/FerishopFe/ferishopFE-1/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/mi%20casa/proyecto%20ferishop/Sistema/FerishopFe/ferishopFE-1/node_modules/unplugin-vue-components/dist/vite.js";
import { VueRouterAutoImports, getPascalCaseRouteName } from "file:///C:/mi%20casa/proyecto%20ferishop/Sistema/FerishopFe/ferishopFE-1/node_modules/unplugin-vue-router/dist/index.mjs";
import VueRouter from "file:///C:/mi%20casa/proyecto%20ferishop/Sistema/FerishopFe/ferishopFE-1/node_modules/unplugin-vue-router/dist/vite.mjs";
import { defineConfig } from "file:///C:/mi%20casa/proyecto%20ferishop/Sistema/FerishopFe/ferishopFE-1/node_modules/vite/dist/node/index.js";
import VueDevTools from "file:///C:/mi%20casa/proyecto%20ferishop/Sistema/FerishopFe/ferishopFE-1/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import Layouts from "file:///C:/mi%20casa/proyecto%20ferishop/Sistema/FerishopFe/ferishopFE-1/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import vuetify from "file:///C:/mi%20casa/proyecto%20ferishop/Sistema/FerishopFe/ferishopFE-1/node_modules/vite-plugin-vuetify/dist/index.mjs";
import svgLoader from "file:///C:/mi%20casa/proyecto%20ferishop/Sistema/FerishopFe/ferishopFE-1/node_modules/vite-svg-loader/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/mi%20casa/proyecto%20ferishop/Sistema/FerishopFe/ferishopFE-1/vite.config.js";
var vite_config_default = defineConfig({
  server: {
    host: "0.0.0.0",
    port: 40,
    strictPort: true,
    watch: {
      usePolling: true
      // Importante para Docker en algunos sistemas
    }
  },
  plugins: [
    // Docs: https://github.com/posva/unplugin-vue-router
    // ℹ️ This plugin should be placed before vue plugin
    VueRouter({
      getRouteName: (routeNode) => {
        return getPascalCaseRouteName(routeNode).replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase();
      },
      beforeWriteFiles: (root) => {
        root.insert("/apps/email/:filter", "/src/pages/apps/email/index.vue");
        root.insert("/apps/email/:label", "/src/pages/apps/email/index.vue");
      }
    }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "swiper-container" || tag === "swiper-slide"
        }
      }
    }),
    VueDevTools(),
    vueJsx(),
    // Docs: https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin
    vuetify({
      styles: {
        configFile: "src/assets/styles/variables/_vuetify.scss"
      }
    }),
    // Docs: https://github.com/johncampionjr/vite-plugin-vue-layouts#vite-plugin-vue-layouts
    Layouts({
      layoutsDirs: "./src/layouts/"
    }),
    // Docs: https://github.com/antfu/unplugin-vue-components#unplugin-vue-components
    Components({
      dirs: ["src/@core/components", "src/views/demos", "src/components"],
      dts: true,
      resolvers: [
        (componentName) => {
          if (componentName === "VueApexCharts")
            return { name: "default", from: "vue3-apexcharts", as: "VueApexCharts" };
        }
      ]
    }),
    // Docs: https://github.com/antfu/unplugin-auto-import#unplugin-auto-import
    AutoImport({
      imports: ["vue", VueRouterAutoImports, "@vueuse/core", "@vueuse/math", "vue-i18n", "pinia"],
      dirs: [
        "./src/@core/utils",
        "./src/@core/composable/",
        "./src/composables/",
        "./src/utils/",
        "./src/plugins/*/composables/*"
      ],
      vueTemplate: true,
      // ℹ️ Disabled to avoid confusion & accidental usage
      ignore: ["useCookies", "useStorage"],
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json"
      }
    }),
    // Docs: https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n#intlifyunplugin-vue-i18n
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [
        fileURLToPath(new URL("./src/plugins/i18n/locales/**", __vite_injected_original_import_meta_url))
      ]
    }),
    svgLoader()
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "@themeConfig": fileURLToPath(new URL("./themeConfig.js", __vite_injected_original_import_meta_url)),
      "@core": fileURLToPath(new URL("./src/@core", __vite_injected_original_import_meta_url)),
      "@layouts": fileURLToPath(new URL("./src/@layouts", __vite_injected_original_import_meta_url)),
      "@images": fileURLToPath(new URL("./src/assets/images/", __vite_injected_original_import_meta_url)),
      "@styles": fileURLToPath(new URL("./src/assets/styles/", __vite_injected_original_import_meta_url)),
      "@configured-variables": fileURLToPath(new URL("./src/assets/styles/variables/_template.scss", __vite_injected_original_import_meta_url)),
      "@db": fileURLToPath(new URL("./src/plugins/fake-api/handlers/", __vite_injected_original_import_meta_url)),
      "@api-utils": fileURLToPath(new URL("./src/plugins/fake-api/utils/", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    chunkSizeWarningLimit: 5e3
  },
  optimizeDeps: {
    exclude: ["vuetify"],
    entries: [
      "./src/**/*.vue"
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxtaSBjYXNhXFxcXHByb3llY3RvIGZlcmlzaG9wXFxcXFNpc3RlbWFcXFxcRmVyaXNob3BGZVxcXFxmZXJpc2hvcEZFLTFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXG1pIGNhc2FcXFxccHJveWVjdG8gZmVyaXNob3BcXFxcU2lzdGVtYVxcXFxGZXJpc2hvcEZlXFxcXGZlcmlzaG9wRkUtMVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovbWklMjBjYXNhL3Byb3llY3RvJTIwZmVyaXNob3AvU2lzdGVtYS9GZXJpc2hvcEZlL2ZlcmlzaG9wRkUtMS92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCBWdWVJMThuUGx1Z2luIGZyb20gJ0BpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuL3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCdcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHsgVnVlUm91dGVyQXV0b0ltcG9ydHMsIGdldFBhc2NhbENhc2VSb3V0ZU5hbWUgfSBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyJ1xyXG5pbXBvcnQgVnVlUm91dGVyIGZyb20gJ3VucGx1Z2luLXZ1ZS1yb3V0ZXIvdml0ZSdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnXHJcbmltcG9ydCB2dWV0aWZ5IGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZXRpZnknXHJcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSAndml0ZS1zdmctbG9hZGVyJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6ICcwLjAuMC4wJywgICBcclxuICAgIHBvcnQ6IDQwLCAgICAgICAgIFxyXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSwgXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICB1c2VQb2xsaW5nOiB0cnVlLCAvLyBJbXBvcnRhbnRlIHBhcmEgRG9ja2VyIGVuIGFsZ3Vub3Mgc2lzdGVtYXNcclxuICAgIH0sXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICAvLyBEb2NzOiBodHRwczovL2dpdGh1Yi5jb20vcG9zdmEvdW5wbHVnaW4tdnVlLXJvdXRlclxyXG4gICAgLy8gXHUyMTM5XHVGRTBGIFRoaXMgcGx1Z2luIHNob3VsZCBiZSBwbGFjZWQgYmVmb3JlIHZ1ZSBwbHVnaW5cclxuICAgIFZ1ZVJvdXRlcih7XHJcbiAgICAgIGdldFJvdXRlTmFtZTogcm91dGVOb2RlID0+IHtcclxuICAgICAgICAvLyBDb252ZXJ0IHBhc2NhbCBjYXNlIHRvIGtlYmFiIGNhc2VcclxuICAgICAgICByZXR1cm4gZ2V0UGFzY2FsQ2FzZVJvdXRlTmFtZShyb3V0ZU5vZGUpXHJcbiAgICAgICAgICAucmVwbGFjZSgvKFthLXpcXGRdKShbQS1aXSkvZywgJyQxLSQyJylcclxuICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgIH0sXHJcbiAgICAgIGJlZm9yZVdyaXRlRmlsZXM6IHJvb3QgPT4ge1xyXG4gICAgICAgIHJvb3QuaW5zZXJ0KCcvYXBwcy9lbWFpbC86ZmlsdGVyJywgJy9zcmMvcGFnZXMvYXBwcy9lbWFpbC9pbmRleC52dWUnKVxyXG4gICAgICAgIHJvb3QuaW5zZXJ0KCcvYXBwcy9lbWFpbC86bGFiZWwnLCAnL3NyYy9wYWdlcy9hcHBzL2VtYWlsL2luZGV4LnZ1ZScpXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICAgIHZ1ZSh7XHJcbiAgICAgIHRlbXBsYXRlOiB7XHJcbiAgICAgICAgY29tcGlsZXJPcHRpb25zOiB7XHJcbiAgICAgICAgICBpc0N1c3RvbUVsZW1lbnQ6IHRhZyA9PiB0YWcgPT09ICdzd2lwZXItY29udGFpbmVyJyB8fCB0YWcgPT09ICdzd2lwZXItc2xpZGUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICAgIFZ1ZURldlRvb2xzKCksXHJcbiAgICB2dWVKc3goKSxcclxuXHJcbiAgICAvLyBEb2NzOiBodHRwczovL2dpdGh1Yi5jb20vdnVldGlmeWpzL3Z1ZXRpZnktbG9hZGVyL3RyZWUvbWFzdGVyL3BhY2thZ2VzL3ZpdGUtcGx1Z2luXHJcbiAgICB2dWV0aWZ5KHtcclxuICAgICAgc3R5bGVzOiB7XHJcbiAgICAgICAgY29uZmlnRmlsZTogJ3NyYy9hc3NldHMvc3R5bGVzL3ZhcmlhYmxlcy9fdnVldGlmeS5zY3NzJyxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8vIERvY3M6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb2huY2FtcGlvbmpyL3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzI3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzXHJcbiAgICBMYXlvdXRzKHtcclxuICAgICAgbGF5b3V0c0RpcnM6ICcuL3NyYy9sYXlvdXRzLycsXHJcbiAgICB9KSxcclxuXHJcbiAgICAvLyBEb2NzOiBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tdnVlLWNvbXBvbmVudHMjdW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcclxuICAgIENvbXBvbmVudHMoe1xyXG4gICAgICBkaXJzOiBbJ3NyYy9AY29yZS9jb21wb25lbnRzJywgJ3NyYy92aWV3cy9kZW1vcycsICdzcmMvY29tcG9uZW50cyddLFxyXG4gICAgICBkdHM6IHRydWUsXHJcbiAgICAgIHJlc29sdmVyczogW1xyXG4gICAgICAgIGNvbXBvbmVudE5hbWUgPT4ge1xyXG4gICAgICAgICAgLy8gQXV0byBpbXBvcnQgYFZ1ZUFwZXhDaGFydHNgXHJcbiAgICAgICAgICBpZiAoY29tcG9uZW50TmFtZSA9PT0gJ1Z1ZUFwZXhDaGFydHMnKVxyXG4gICAgICAgICAgICByZXR1cm4geyBuYW1lOiAnZGVmYXVsdCcsIGZyb206ICd2dWUzLWFwZXhjaGFydHMnLCBhczogJ1Z1ZUFwZXhDaGFydHMnIH1cclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSksXHJcblxyXG4gICAgLy8gRG9jczogaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWF1dG8taW1wb3J0I3VucGx1Z2luLWF1dG8taW1wb3J0XHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogWyd2dWUnLCBWdWVSb3V0ZXJBdXRvSW1wb3J0cywgJ0B2dWV1c2UvY29yZScsICdAdnVldXNlL21hdGgnLCAndnVlLWkxOG4nLCAncGluaWEnXSxcclxuICAgICAgZGlyczogW1xyXG4gICAgICAgICcuL3NyYy9AY29yZS91dGlscycsXHJcbiAgICAgICAgJy4vc3JjL0Bjb3JlL2NvbXBvc2FibGUvJyxcclxuICAgICAgICAnLi9zcmMvY29tcG9zYWJsZXMvJyxcclxuICAgICAgICAnLi9zcmMvdXRpbHMvJyxcclxuICAgICAgICAnLi9zcmMvcGx1Z2lucy8qL2NvbXBvc2FibGVzLyonLFxyXG4gICAgICBdLFxyXG4gICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcclxuXHJcbiAgICAgIC8vIFx1MjEzOVx1RkUwRiBEaXNhYmxlZCB0byBhdm9pZCBjb25mdXNpb24gJiBhY2NpZGVudGFsIHVzYWdlXHJcbiAgICAgIGlnbm9yZTogWyd1c2VDb29raWVzJywgJ3VzZVN0b3JhZ2UnXSxcclxuICAgICAgZXNsaW50cmM6IHtcclxuICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIGZpbGVwYXRoOiAnLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbicsXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuXHJcbiAgICAvLyBEb2NzOiBodHRwczovL2dpdGh1Yi5jb20vaW50bGlmeS9idW5kbGUtdG9vbHMvdHJlZS9tYWluL3BhY2thZ2VzL3VucGx1Z2luLXZ1ZS1pMThuI2ludGxpZnl1bnBsdWdpbi12dWUtaTE4blxyXG4gICAgVnVlSTE4blBsdWdpbih7XHJcbiAgICAgIHJ1bnRpbWVPbmx5OiB0cnVlLFxyXG4gICAgICBjb21wb3NpdGlvbk9ubHk6IHRydWUsXHJcbiAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL3BsdWdpbnMvaTE4bi9sb2NhbGVzLyoqJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgIF0sXHJcbiAgICB9KSxcclxuICAgIHN2Z0xvYWRlcigpLFxyXG4gIF0sXHJcbiAgZGVmaW5lOiB7ICdwcm9jZXNzLmVudic6IHt9IH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICdAdGhlbWVDb25maWcnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vdGhlbWVDb25maWcuanMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgJ0Bjb3JlJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9AY29yZScsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAnQGxheW91dHMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL0BsYXlvdXRzJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICdAaW1hZ2VzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9hc3NldHMvaW1hZ2VzLycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAnQHN0eWxlcyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvYXNzZXRzL3N0eWxlcy8nLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgJ0Bjb25maWd1cmVkLXZhcmlhYmxlcyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvYXNzZXRzL3N0eWxlcy92YXJpYWJsZXMvX3RlbXBsYXRlLnNjc3MnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgJ0BkYic6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvcGx1Z2lucy9mYWtlLWFwaS9oYW5kbGVycy8nLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgJ0BhcGktdXRpbHMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL3BsdWdpbnMvZmFrZS1hcGkvdXRpbHMvJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogNTAwMCxcclxuICB9LFxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgZXhjbHVkZTogWyd2dWV0aWZ5J10sXHJcbiAgICBlbnRyaWVzOiBbXHJcbiAgICAgICcuL3NyYy8qKi8qLnZ1ZScsXHJcbiAgICBdLFxyXG4gIH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1gsT0FBTyxtQkFBbUI7QUFDaFosT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixTQUFTLHFCQUFxQjtBQUM5QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLHNCQUFzQiw4QkFBOEI7QUFDN0QsT0FB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
