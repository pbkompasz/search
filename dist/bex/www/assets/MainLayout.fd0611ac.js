import { d as defineComponent, c as createBlock, w as withCtx, Q as QItem, o as openBlock, a as QItemSection, b as createVNode, e as QIcon, f as createCommentVNode, g as QItemLabel, h as createTextVNode, t as toDisplayString, _ as _export_sfc, r as ref, i as resolveComponent, j as QLayout, k as QToolbar, l as QBtn, m as QToolbarTitle, n as createBaseVNode, p as QHeader, q as QList, s as createElementBlock, u as renderList, F as Fragment, v as QDrawer, x as QPageContainer, y as mergeProps } from "./index.0a2dd193.js";
const _sfc_main$1 = defineComponent({
  __name: "EssentialLink",
  props: {
    title: { type: String, required: true },
    caption: { type: String, required: false, default: "" },
    link: { type: String, required: false, default: "#" },
    icon: { type: String, required: false, default: "" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QItem, {
        clickable: "",
        tag: "a",
        target: "_blank",
        href: __props.link
      }, {
        default: withCtx(() => [
          __props.icon ? (openBlock(), createBlock(QItemSection, {
            key: 0,
            avatar: ""
          }, {
            default: withCtx(() => [
              createVNode(QIcon, { name: __props.icon }, null, 8, ["name"])
            ]),
            _: 1
          })) : createCommentVNode("v-if", true),
          createVNode(QItemSection, null, {
            default: withCtx(() => [
              createVNode(QItemLabel, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.title), 1)
                ]),
                _: 1
              }),
              createVNode(QItemLabel, { caption: "" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.caption), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["href"]);
    };
  }
});
var EssentialLink = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/pb/code/search/ui/src/components/EssentialLink.vue"]]);
const _hoisted_1 = /* @__PURE__ */ createTextVNode(" Quasar App ");
const _hoisted_2 = /* @__PURE__ */ createTextVNode(" Essential Links ");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MainLayout",
  setup(__props) {
    const essentialLinks = [
      {
        title: "Docssad",
        caption: "quasar.dev",
        icon: "school",
        link: "https://quasar.dev"
      },
      {
        title: "Github",
        caption: "github.com/quasarframework",
        icon: "code",
        link: "https://github.com/quasarframework"
      },
      {
        title: "Discord Chat Channel",
        caption: "chat.quasar.dev",
        icon: "chat",
        link: "https://chat.quasar.dev"
      },
      {
        title: "Forum",
        caption: "forum.quasar.dev",
        icon: "record_voice_over",
        link: "https://forum.quasar.dev"
      },
      {
        title: "Twitter",
        caption: "@quasarframework",
        icon: "rss_feed",
        link: "https://twitter.quasar.dev"
      },
      {
        title: "Facebook",
        caption: "@QuasarFramework",
        icon: "public",
        link: "https://facebook.quasar.dev"
      },
      {
        title: "Quasar Awesome",
        caption: "Community Quasar projects",
        icon: "favorite",
        link: "https://awesome.quasar.dev"
      }
    ];
    const leftDrawerOpen = ref(false);
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createBlock(QLayout, { view: "lHh Lpr lFf" }, {
        default: withCtx(() => [
          createVNode(QHeader, { elevated: "" }, {
            default: withCtx(() => [
              createVNode(QToolbar, null, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    flat: "",
                    dense: "",
                    round: "",
                    icon: "menu",
                    "aria-label": "Menu",
                    onClick: toggleLeftDrawer
                  }),
                  createVNode(QToolbarTitle, null, {
                    default: withCtx(() => [
                      _hoisted_1
                    ]),
                    _: 1
                  }),
                  createBaseVNode("div", null, "Quasar v" + toDisplayString(_ctx.$q.version), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QDrawer, {
            modelValue: leftDrawerOpen.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => leftDrawerOpen.value = $event),
            "show-if-above": "",
            bordered: ""
          }, {
            default: withCtx(() => [
              createVNode(QList, null, {
                default: withCtx(() => [
                  createVNode(QItemLabel, { header: "" }, {
                    default: withCtx(() => [
                      _hoisted_2
                    ]),
                    _: 1
                  }),
                  (openBlock(), createElementBlock(Fragment, null, renderList(essentialLinks, (link) => {
                    return createVNode(EssentialLink, mergeProps({
                      key: link.title
                    }, link), null, 16);
                  }), 64))
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"]),
          createVNode(QPageContainer, null, {
            default: withCtx(() => [
              createVNode(_component_router_view)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
var MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/pb/code/search/ui/src/layouts/MainLayout.vue"]]);
export { MainLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkxheW91dC5mZDA2MTFhYy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xheW91dHMvTWFpbkxheW91dC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1sYXlvdXQgdmlldz1cImxIaCBMcHIgbEZmXCI+XG4gICAgPHEtaGVhZGVyIGVsZXZhdGVkPlxuICAgICAgPHEtdG9vbGJhcj5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgcm91bmRcbiAgICAgICAgICBpY29uPVwibWVudVwiXG4gICAgICAgICAgYXJpYS1sYWJlbD1cIk1lbnVcIlxuICAgICAgICAgIEBjbGljaz1cInRvZ2dsZUxlZnREcmF3ZXJcIlxuICAgICAgICAvPlxuXG4gICAgICAgIDxxLXRvb2xiYXItdGl0bGU+XG4gICAgICAgICAgUXVhc2FyIEFwcFxuICAgICAgICA8L3EtdG9vbGJhci10aXRsZT5cblxuICAgICAgICA8ZGl2PlF1YXNhciB2e3sgJHEudmVyc2lvbiB9fTwvZGl2PlxuICAgICAgPC9xLXRvb2xiYXI+XG4gICAgPC9xLWhlYWRlcj5cblxuICAgIDxxLWRyYXdlclxuICAgICAgdi1tb2RlbD1cImxlZnREcmF3ZXJPcGVuXCJcbiAgICAgIHNob3ctaWYtYWJvdmVcbiAgICAgIGJvcmRlcmVkXG4gICAgPlxuICAgICAgPHEtbGlzdD5cbiAgICAgICAgPHEtaXRlbS1sYWJlbFxuICAgICAgICAgIGhlYWRlclxuICAgICAgICA+XG4gICAgICAgICAgRXNzZW50aWFsIExpbmtzXG4gICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuXG4gICAgICAgIDxFc3NlbnRpYWxMaW5rXG4gICAgICAgICAgdi1mb3I9XCJsaW5rIGluIGVzc2VudGlhbExpbmtzXCJcbiAgICAgICAgICA6a2V5PVwibGluay50aXRsZVwiXG4gICAgICAgICAgdi1iaW5kPVwibGlua1wiXG4gICAgICAgIC8+XG4gICAgICA8L3EtbGlzdD5cbiAgICA8L3EtZHJhd2VyPlxuXG4gICAgPHEtcGFnZS1jb250YWluZXI+XG4gICAgICA8cm91dGVyLXZpZXcgLz5cbiAgICA8L3EtcGFnZS1jb250YWluZXI+XG4gIDwvcS1sYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJztcbmltcG9ydCBFc3NlbnRpYWxMaW5rLCB7IEVzc2VudGlhbExpbmtQcm9wcyB9IGZyb20gJ2NvbXBvbmVudHMvRXNzZW50aWFsTGluay52dWUnO1xuXG5jb25zdCBlc3NlbnRpYWxMaW5rczogRXNzZW50aWFsTGlua1Byb3BzW10gPSBbXG4gIHtcbiAgICB0aXRsZTogJ0RvY3NzYWQnLFxuICAgIGNhcHRpb246ICdxdWFzYXIuZGV2JyxcbiAgICBpY29uOiAnc2Nob29sJyxcbiAgICBsaW5rOiAnaHR0cHM6Ly9xdWFzYXIuZGV2J1xuICB9LFxuICB7XG4gICAgdGl0bGU6ICdHaXRodWInLFxuICAgIGNhcHRpb246ICdnaXRodWIuY29tL3F1YXNhcmZyYW1ld29yaycsXG4gICAgaWNvbjogJ2NvZGUnLFxuICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vcXVhc2FyZnJhbWV3b3JrJ1xuICB9LFxuICB7XG4gICAgdGl0bGU6ICdEaXNjb3JkIENoYXQgQ2hhbm5lbCcsXG4gICAgY2FwdGlvbjogJ2NoYXQucXVhc2FyLmRldicsXG4gICAgaWNvbjogJ2NoYXQnLFxuICAgIGxpbms6ICdodHRwczovL2NoYXQucXVhc2FyLmRldidcbiAgfSxcbiAge1xuICAgIHRpdGxlOiAnRm9ydW0nLFxuICAgIGNhcHRpb246ICdmb3J1bS5xdWFzYXIuZGV2JyxcbiAgICBpY29uOiAncmVjb3JkX3ZvaWNlX292ZXInLFxuICAgIGxpbms6ICdodHRwczovL2ZvcnVtLnF1YXNhci5kZXYnXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogJ1R3aXR0ZXInLFxuICAgIGNhcHRpb246ICdAcXVhc2FyZnJhbWV3b3JrJyxcbiAgICBpY29uOiAncnNzX2ZlZWQnLFxuICAgIGxpbms6ICdodHRwczovL3R3aXR0ZXIucXVhc2FyLmRldidcbiAgfSxcbiAge1xuICAgIHRpdGxlOiAnRmFjZWJvb2snLFxuICAgIGNhcHRpb246ICdAUXVhc2FyRnJhbWV3b3JrJyxcbiAgICBpY29uOiAncHVibGljJyxcbiAgICBsaW5rOiAnaHR0cHM6Ly9mYWNlYm9vay5xdWFzYXIuZGV2J1xuICB9LFxuICB7XG4gICAgdGl0bGU6ICdRdWFzYXIgQXdlc29tZScsXG4gICAgY2FwdGlvbjogJ0NvbW11bml0eSBRdWFzYXIgcHJvamVjdHMnLFxuICAgIGljb246ICdmYXZvcml0ZScsXG4gICAgbGluazogJ2h0dHBzOi8vYXdlc29tZS5xdWFzYXIuZGV2J1xuICB9XG5dO1xuXG5jb25zdCBsZWZ0RHJhd2VyT3BlbiA9IHJlZihmYWxzZSlcblxuZnVuY3Rpb24gdG9nZ2xlTGVmdERyYXdlcigpIHtcbiAgbGVmdERyYXdlck9wZW4udmFsdWUgPSAhbGVmdERyYXdlck9wZW4udmFsdWVcbn1cbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbURBLFVBQU0saUJBQXVDO0FBQUEsTUFDM0M7QUFBQSxRQUNFLE9BQU87QUFBQSxRQUNQLFNBQVM7QUFBQSxRQUNULE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLFFBQ1QsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsUUFDVCxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE9BQU87QUFBQSxRQUNQLFNBQVM7QUFBQSxRQUNULE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLFFBQ1QsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsUUFDVCxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE9BQU87QUFBQSxRQUNQLFNBQVM7QUFBQSxRQUNULE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFBQTtBQUdJLFVBQUEsaUJBQWlCLElBQUksS0FBSztBQUVoQyxhQUFTLG1CQUFtQjtBQUNYLHFCQUFBLFFBQVEsQ0FBQyxlQUFlO0FBQUEsSUFDekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
