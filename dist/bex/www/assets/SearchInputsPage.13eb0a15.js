import { _ as _export_sfc, d as defineComponent, r as ref, C as watch, D as useQuasar, z as computed, c as createBlock, w as withCtx, B as QPage, o as openBlock, n as createBaseVNode, b as createVNode, E as QTab, G as QSeparator, H as QTabs, I as QSelect, J as QTabPanel, K as QInput, L as QTooltip, M as QCheckbox, f as createCommentVNode, N as QTabPanels, h as createTextVNode, O as pushScopeId, P as popScopeId } from "./index.0a2dd193.js";
function createQueryString(searchTerm, strictMode, exclusionTerms) {
  let baseQuery = "";
  const termsSplit = searchTerm.split("\n");
  for (let i = 0; i < termsSplit.length - 1; i++) {
    baseQuery += `"${termsSplit[i]}" ${strictMode ? "AND" : "|"} `;
  }
  baseQuery += `"${termsSplit[termsSplit.length - 1]}" `;
  const exclusionTermsSplit = exclusionTerms.split("\n");
  for (let i = 0; i < exclusionTermsSplit.length && exclusionTermsSplit.length > 1; i++) {
    baseQuery += `-"${exclusionTermsSplit[i]}" `;
  }
  return baseQuery;
}
function applyQueryOptions(queryRaw, options) {
  var _a;
  let newQueryString = queryRaw;
  if (options.filetype) {
    newQueryString += `filetype:${options.filetype.value} `;
  }
  if (options.site) {
    newQueryString += `site:${options.site} `;
  }
  if (options.related) {
    newQueryString += `related:${options.related} `;
  }
  if (options.intitle) {
    newQueryString += `intitle:(${options.intitle}) `;
  }
  if (options.inurl) {
    newQueryString += `inurl:(${options.inurl}) `;
  }
  if (options.intext) {
    newQueryString += `intext:(${options.intext}) `;
  }
  if ((_a = options.around) == null ? void 0 : _a.distance) {
    newQueryString += `${options.around.firstPhrase} AROUND(${options.around.distance}) ${options.around.secondPhrase} `;
  }
  if (options.inanchor) {
    newQueryString += `inanchor:(${options.inanchor}) `;
  }
  return newQueryString;
}
function createQueryOptionsString(options) {
  return applyQueryOptions("", options);
}
var SearchInputsPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-a7b6eef8"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "row justify-evenly bg-primary" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "tab column" }, [
  /* @__PURE__ */ createBaseVNode("div", null, "Search"),
  /* @__PURE__ */ createBaseVNode("div", null, "terms")
], -1));
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "tab column" }, [
  /* @__PURE__ */ createBaseVNode("div", null, "Query"),
  /* @__PURE__ */ createBaseVNode("div", null, "options")
], -1));
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "tab column" }, [
  /* @__PURE__ */ createBaseVNode("div", null, "Other"),
  /* @__PURE__ */ createBaseVNode("div", null, "options")
], -1));
const _hoisted_5 = { class: "row" };
const _hoisted_6 = { class: "q-pr-sm" };
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-caption" }, " Each line contains a search term, a term will appear exactly in your search result ", -1));
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-caption" }, " Every term should appear in the search results ", -1));
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-caption" }, " Each line contains a phrase, a phrase can contain multiple words ", -1));
const _hoisted_10 = {
  id: "around",
  class: "col-12 row justify-evenly no-wrap"
};
const _hoisted_11 = /* @__PURE__ */ createTextVNode(" none ");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SearchInputsPage",
  setup(__props) {
    const dataRangeOptions = [
      {
        label: "Anytime",
        value: ""
      },
      {
        label: "In the past hour",
        value: ""
      },
      {
        label: "In the last 24 hours",
        value: ""
      },
      {
        label: "In the past week",
        value: ""
      },
      {
        label: "In the past month",
        value: ""
      },
      {
        label: "Custom range",
        value: ""
      }
    ];
    const fileTypeOptions = [
      {
        label: "None",
        value: false
      },
      {
        label: "Pdf",
        value: "pdf"
      },
      {
        label: "Docx",
        value: "docx"
      },
      {
        label: "Txt",
        value: "txt"
      },
      {
        label: "PowerPoint",
        value: "ppt"
      }
    ];
    const otherOptions = ref({
      dateRange: dataRangeOptions[0]
    });
    watch(
      otherOptions,
      (val) => {
        console.log(val);
      },
      {
        deep: true
      }
    );
    const tab = ref("terms");
    const terms = ref({
      contains: "",
      strictMode: false,
      excludes: ""
    });
    const $q = useQuasar();
    $q.bex.on("reverse", ({ data }) => {
      console.log(data);
      queryStringReceived.value = data.queryRaw;
    });
    const queryStringReceived = ref("");
    const queryStringTermsGenerated = ref("");
    const queryStringGenerated = computed(() => {
      return queryStringTermsGenerated.value + " " + queryStringOptionsGenerated.value;
    });
    watch(
      terms,
      async (val) => {
        queryStringTermsGenerated.value = createQueryString(
          val.contains,
          val.strictMode,
          val.excludes
        );
        await $q.bex.send("update", {
          queryStringGenerated: queryStringGenerated.value
        });
      },
      {
        deep: true
      }
    );
    const queryOptions = ref({
      filetype: false,
      site: "",
      related: "",
      intitle: "",
      inurl: "",
      intext: "",
      around: {
        distance: null,
        firstPhrase: "",
        secondPhrase: ""
      },
      inanchor: ""
    });
    const queryStringOptionsGenerated = ref("");
    watch(
      queryOptions,
      async (val) => {
        queryStringOptionsGenerated.value = createQueryOptionsString(
          val
        );
        console.log(queryStringGenerated.value);
        await $q.bex.send("update", {
          queryStringGenerated: queryStringGenerated.value
        });
      },
      {
        deep: true
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { class: "column" }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createVNode(QTabs, {
              modelValue: tab.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => tab.value = $event),
              "inline-label": "",
              class: "bg-white"
            }, {
              default: withCtx(() => [
                createVNode(QTab, { name: "terms" }, {
                  default: withCtx(() => [
                    _hoisted_2
                  ]),
                  _: 1
                }),
                createVNode(QSeparator, {
                  vertical: "",
                  spaced: ""
                }),
                createVNode(QTab, { name: "query_options" }, {
                  default: withCtx(() => [
                    _hoisted_3
                  ]),
                  _: 1
                }),
                createVNode(QSeparator, {
                  vertical: "",
                  spaced: ""
                }),
                createVNode(QTab, { name: "other_options" }, {
                  default: withCtx(() => [
                    _hoisted_4
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"]),
            createBaseVNode("div", _hoisted_5, [
              createVNode(QSelect, {
                label: "Date",
                modelValue: otherOptions.value.dateRange,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => otherOptions.value.dateRange = $event),
                options: dataRangeOptions
              }, null, 8, ["modelValue"])
            ])
          ]),
          createVNode(QTabPanels, {
            modelValue: tab.value,
            "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => tab.value = $event),
            animated: "",
            class: "shadow-2 rounded-borders"
          }, {
            default: withCtx(() => [
              createVNode(QTabPanel, {
                class: "row no-wrap",
                name: "terms"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_6, [
                    createVNode(QInput, {
                      modelValue: terms.value.contains,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => terms.value.contains = $event),
                      filled: "",
                      type: "textarea",
                      label: "Type terms"
                    }, {
                      default: withCtx(() => [
                        createVNode(QTooltip, null, {
                          default: withCtx(() => [
                            _hoisted_7
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    createBaseVNode("div", null, [
                      createVNode(QCheckbox, {
                        modelValue: terms.value.strictMode,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => terms.value.strictMode = $event)
                      }, {
                        default: withCtx(() => [
                          _hoisted_8
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    createVNode(QInput, {
                      modelValue: terms.value.excludes,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => terms.value.excludes = $event),
                      filled: "",
                      type: "textarea",
                      label: "Type exclusion terms"
                    }, {
                      default: withCtx(() => [
                        createVNode(QTooltip, null, {
                          default: withCtx(() => [
                            _hoisted_9
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ])
                ]),
                _: 1
              }),
              createVNode(QTabPanel, {
                name: "query_options",
                class: "row"
              }, {
                default: withCtx(() => [
                  createVNode(QSelect, {
                    modelValue: queryOptions.value.filetype,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => queryOptions.value.filetype = $event),
                    options: fileTypeOptions,
                    class: "col-6 option",
                    outlined: ""
                  }, null, 8, ["modelValue"]),
                  createVNode(QInput, {
                    modelValue: queryOptions.value.site,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => queryOptions.value.site = $event),
                    label: "Site",
                    class: "col-6 option",
                    filled: ""
                  }, null, 8, ["modelValue"]),
                  createVNode(QInput, {
                    modelValue: queryOptions.value.related,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => queryOptions.value.related = $event),
                    label: "Related",
                    class: "col-6 option",
                    filled: ""
                  }, null, 8, ["modelValue"]),
                  createVNode(QInput, {
                    modelValue: queryOptions.value.intitle,
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => queryOptions.value.intitle = $event),
                    label: "In title",
                    class: "col-6 option",
                    filled: ""
                  }, null, 8, ["modelValue"]),
                  createCommentVNode(" If single word sue inurl "),
                  createVNode(QInput, {
                    modelValue: queryOptions.value.inurl,
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => queryOptions.value.inurl = $event),
                    label: "In url",
                    class: "col-6 option",
                    filled: ""
                  }, null, 8, ["modelValue"]),
                  createVNode(QInput, {
                    modelValue: queryOptions.value.intext,
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => queryOptions.value.intext = $event),
                    label: "In text",
                    class: "col-6 option",
                    filled: ""
                  }, null, 8, ["modelValue"]),
                  createBaseVNode("div", _hoisted_10, [
                    createVNode(QInput, {
                      modelValue: queryOptions.value.around.distance,
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => queryOptions.value.around.distance = $event),
                      label: "Around",
                      class: "option",
                      filled: ""
                    }, null, 8, ["modelValue"]),
                    createVNode(QInput, {
                      modelValue: queryOptions.value.around.firstPhrase,
                      "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => queryOptions.value.around.firstPhrase = $event),
                      label: "Phrase #1",
                      class: "option",
                      filled: ""
                    }, null, 8, ["modelValue"]),
                    createVNode(QInput, {
                      modelValue: queryOptions.value.around.secondPhrase,
                      "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => queryOptions.value.around.secondPhrase = $event),
                      label: "Phrase #2",
                      class: "option",
                      filled: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  createCommentVNode(" If single word sue inanchor "),
                  createVNode(QInput, {
                    modelValue: queryOptions.value.inanchor,
                    "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => queryOptions.value.inanchor = $event),
                    label: "Site",
                    class: "col-6 option",
                    filled: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(QTabPanel, { name: "other_options" }, {
                default: withCtx(() => [
                  _hoisted_11
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      });
    };
  }
});
var SearchInputsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a7b6eef8"], ["__file", "/home/pb/code/search/ui/src/pages/SearchInputsPage.vue"]]);
export { SearchInputsPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoSW5wdXRzUGFnZS4xM2ViMGExNS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9hcGkudHMiLCIuLi8uLi8uLi8uLi9zcmMvcGFnZXMvU2VhcmNoSW5wdXRzUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsidHlwZSBGaWxlVHlwZSA9IHtcbiAgdmFsdWU6ICdwZGYnIHwgJ2RvY3gnIHwgJ3R4dCcgfCAncHB0JyB8IGZhbHNlXG4gIGxhYmVsOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgUXVlcnlPcHRpb25zID0ge1xuICBmaWxldHlwZT86IEZpbGVUeXBlXG4gIHNpdGU/OiBzdHJpbmdcbiAgcmVsYXRlZD86IHN0cmluZ1xuICBpbnRpdGxlPzogc3RyaW5nXG4gIGludXJsPzogc3RyaW5nXG4gIC8vIGFsbGludXJsPzogc3RyaW5nXG4gIGludGV4dD86IHN0cmluZ1xuICAvLyBUd28gcGhyYXNlcyB3aXRoaW4gTlVNQkVSIGFwYXJ0XG4gIC8vIFVzZWZ1bCBpZiBhIHBlcnNvbiBoYXMgbXVsdGlwbGUgbmFtZXMgYnV0IHdlIG9ubHkga25vdyB0d28gb3IgdG8gZmluZCByZWxhdGl2ZXNcbiAgLy8gSGl0IG9yIG1pc3NcbiAgYXJvdW5kPzoge1xuICAgIGZpcnN0UGhyYXNlOiBzdHJpbmdcbiAgICBzZWNvbmRQaHJhc2U6IHN0cmluZ1xuICAgIGRpc3RhbmNlOiBudW1iZXIgfCBudWxsXG4gIH1cbiAgLy8gSGl0IG9yIG1pc3NcbiAgaW5hbmNob3I/OiBzdHJpbmdcbiAgLy8gSGl0IG9yIG1pc3NcbiAgLy8gYWxsaW5hbmNob3I/OiBzdHJpbmdcbn1cblxuLy8gdHlwZSBPcHRpb25zID0ge1xuLy8gICBzdGFydERhdGU/OiBEYXRlLFxuLy8gICBlbmREYXRlPzogRGF0ZSxcbi8vIH1cblxuLy8gdHlwZSBTZWFyY2hUZXJtID0ge1xuLy8gICB0ZXJtOiBzdHJpbmcsXG4vLyAgIGNvbmRpdGlvbjogQ29uZGl0aW9uYWxQYXJhbWV0ZXJzLFxuLy8gfTtcblxuLy8gaW50ZXJmYWNlIEJhc2VRdWVyeSB7XG4vLyAgIHRvU3RyaW5nKCk6IHN0cmluZ1xuLy8gICBvcHRpb25zOiBzdHJpbmdbXVxuLy8gfVxuXG4vLyBpbnRlcmZhY2UgUXVlcnkgZXh0ZW5kcyBCYXNlUXVlcnkge1xuXG4vLyB9XG5cbi8vIC8vIEVhY2ggXG4vLyBlbnVtIENvbmRpdGlvbmFsUGFyYW1ldGVycyB7XG4vLyAgIE9yLFxuLy8gICBBbmQsXG4vLyAgIEV4Y2x1c2lvbixcbi8vICAgV2lsZGNhcmQsXG4vLyB9XG4vKlxuXG4qL1xuXG5mdW5jdGlvbiBjcmVhdGVRdWVyeVN0cmluZyhcbiAgc2VhcmNoVGVybTogc3RyaW5nLFxuICBzdHJpY3RNb2RlOiBib29sZWFuLFxuICBleGNsdXNpb25UZXJtczogc3RyaW5nLFxuKTogc3RyaW5nIHtcbiAgbGV0IGJhc2VRdWVyeSA9ICcnO1xuICBjb25zdCB0ZXJtc1NwbGl0ID0gc2VhcmNoVGVybS5zcGxpdCgnXFxuJyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGVybXNTcGxpdC5sZW5ndGggLSAxOyBpKyspIHtcbiAgICBiYXNlUXVlcnkgKz0gYFwiJHt0ZXJtc1NwbGl0W2ldfVwiICR7c3RyaWN0TW9kZSA/ICdBTkQnIDogJ3wnfSBgXG4gIH1cbiAgYmFzZVF1ZXJ5ICs9IGBcIiR7dGVybXNTcGxpdFt0ZXJtc1NwbGl0Lmxlbmd0aCAtIDFdfVwiIGBcblxuICBjb25zdCBleGNsdXNpb25UZXJtc1NwbGl0ID0gZXhjbHVzaW9uVGVybXMuc3BsaXQoJ1xcbicpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGV4Y2x1c2lvblRlcm1zU3BsaXQubGVuZ3RoICYmIGV4Y2x1c2lvblRlcm1zU3BsaXQubGVuZ3RoID4gMTsgaSsrKSB7XG4gICAgYmFzZVF1ZXJ5ICs9IGAtXCIke2V4Y2x1c2lvblRlcm1zU3BsaXRbaV19XCIgYFxuICB9XG4gIHJldHVybiBiYXNlUXVlcnk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmcocXVlcnk6IHN0cmluZykge1xuICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcgKyBxdWVyeSk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5UXVlcnlPcHRpb25zKHF1ZXJ5UmF3OiBzdHJpbmcsIG9wdGlvbnM6IFF1ZXJ5T3B0aW9ucykge1xuICBsZXQgbmV3UXVlcnlTdHJpbmcgPSBxdWVyeVJhdztcbiAgaWYgKG9wdGlvbnMuZmlsZXR5cGUpIHtcbiAgICBuZXdRdWVyeVN0cmluZyArPSBgZmlsZXR5cGU6JHtvcHRpb25zLmZpbGV0eXBlLnZhbHVlfSBgXG4gIH1cbiAgLy8gVE9ETyBWYWxpZGF0ZSBzaXRlXG4gIGlmIChvcHRpb25zLnNpdGUpIHtcbiAgICBuZXdRdWVyeVN0cmluZyArPSBgc2l0ZToke29wdGlvbnMuc2l0ZX0gYFxuICB9XG4gIC8vIFRPRE8gVmFsaWRhdGUgc2l0ZVxuICBpZiAob3B0aW9ucy5yZWxhdGVkKSB7XG4gICAgbmV3UXVlcnlTdHJpbmcgKz0gYHJlbGF0ZWQ6JHtvcHRpb25zLnJlbGF0ZWR9IGBcbiAgfVxuICBpZiAob3B0aW9ucy5pbnRpdGxlKSB7XG4gICAgbmV3UXVlcnlTdHJpbmcgKz0gYGludGl0bGU6KCR7b3B0aW9ucy5pbnRpdGxlfSkgYFxuICB9XG4gIGlmKG9wdGlvbnMuaW51cmwpIHtcbiAgICBuZXdRdWVyeVN0cmluZyArPSBgaW51cmw6KCR7b3B0aW9ucy5pbnVybH0pIGBcbiAgfVxuICBpZiAob3B0aW9ucy5pbnRleHQpIHtcbiAgICBuZXdRdWVyeVN0cmluZyArPSBgaW50ZXh0Oigke29wdGlvbnMuaW50ZXh0fSkgYFxuICB9XG4gIGlmIChvcHRpb25zLmFyb3VuZD8uZGlzdGFuY2UpIHtcbiAgICBuZXdRdWVyeVN0cmluZyArPSBgJHtvcHRpb25zLmFyb3VuZC5maXJzdFBocmFzZX0gQVJPVU5EKCR7b3B0aW9ucy5hcm91bmQuZGlzdGFuY2V9KSAke29wdGlvbnMuYXJvdW5kLnNlY29uZFBocmFzZX0gYFxuICB9XG4gIGlmIChvcHRpb25zLmluYW5jaG9yKSB7XG4gICAgbmV3UXVlcnlTdHJpbmcgKz0gYGluYW5jaG9yOigke29wdGlvbnMuaW5hbmNob3J9KSBgXG4gIH1cbiAgcmV0dXJuIG5ld1F1ZXJ5U3RyaW5nXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVF1ZXJ5T3B0aW9uc1N0cmluZyhvcHRpb25zOiBRdWVyeU9wdGlvbnMpIHtcbiAgcmV0dXJuIGFwcGx5UXVlcnlPcHRpb25zKCcnLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUXVlcnlTdHJpbmc7XG5leHBvcnQge1xuICBjcmVhdGVRdWVyeVN0cmluZyxcbiAgYXBwbHlRdWVyeU9wdGlvbnMsXG4gIHBhcnNlUXVlcnlTdHJpbmcsXG4gIGNyZWF0ZVF1ZXJ5T3B0aW9uc1N0cmluZyxcbn0iLCJcbjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBjbGFzcz1cImNvbHVtblwiPlxuICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1ldmVubHkgYmctcHJpbWFyeVwiPlxuICAgICAgPHEtdGFicyB2LW1vZGVsPVwidGFiXCIgaW5saW5lLWxhYmVsIGNsYXNzPVwiYmctd2hpdGVcIj5cbiAgICAgICAgPHEtdGFiIG5hbWU9XCJ0ZXJtc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWIgY29sdW1uXCI+XG4gICAgICAgICAgICA8ZGl2PlNlYXJjaDwvZGl2PlxuICAgICAgICAgICAgPGRpdj50ZXJtczwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtdGFiPlxuICAgICAgICA8cS1zZXBhcmF0b3IgdmVydGljYWwgc3BhY2VkPjwvcS1zZXBhcmF0b3I+XG4gICAgICAgIDxxLXRhYiBuYW1lPVwicXVlcnlfb3B0aW9uc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWIgY29sdW1uXCI+XG4gICAgICAgICAgICA8ZGl2PlF1ZXJ5PC9kaXY+XG4gICAgICAgICAgICA8ZGl2Pm9wdGlvbnM8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLXRhYj5cbiAgICAgICAgPHEtc2VwYXJhdG9yIHZlcnRpY2FsIHNwYWNlZD48L3Etc2VwYXJhdG9yPlxuICAgICAgICA8cS10YWIgbmFtZT1cIm90aGVyX29wdGlvbnNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFiIGNvbHVtblwiPlxuICAgICAgICAgICAgPGRpdj5PdGhlcjwvZGl2PlxuICAgICAgICAgICAgPGRpdj5vcHRpb25zPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS10YWI+XG4gICAgICA8L3EtdGFicz5cbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgbGFiZWw9XCJEYXRlXCJcbiAgICAgICAgICB2LW1vZGVsPVwib3RoZXJPcHRpb25zLmRhdGVSYW5nZVwiXG4gICAgICAgICAgOm9wdGlvbnM9XCJkYXRhUmFuZ2VPcHRpb25zXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxxLXRhYi1wYW5lbHMgdi1tb2RlbD1cInRhYlwiIGFuaW1hdGVkIGNsYXNzPVwic2hhZG93LTIgcm91bmRlZC1ib3JkZXJzXCI+XG4gICAgICA8cS10YWItcGFuZWwgY2xhc3M9XCJyb3cgbm8td3JhcFwiIG5hbWU9XCJ0ZXJtc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1wci1zbVwiPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwidGVybXMuY29udGFpbnNcIlxuICAgICAgICAgICAgZmlsbGVkXG4gICAgICAgICAgICB0eXBlPVwidGV4dGFyZWFcIlxuICAgICAgICAgICAgbGFiZWw9XCJUeXBlIHRlcm1zXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cS10b29sdGlwPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgRWFjaCBsaW5lIGNvbnRhaW5zIGEgc2VhcmNoIHRlcm0sIGEgdGVybSB3aWxsIGFwcGVhciBleGFjdGx5IGluIHlvdXIgc2VhcmNoIHJlc3VsdFxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvcS10b29sdGlwPlxuICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHEtY2hlY2tib3ggdi1tb2RlbD1cInRlcm1zLnN0cmljdE1vZGVcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvblwiPlxuICAgICAgICAgICAgICAgIEV2ZXJ5IHRlcm0gc2hvdWxkIGFwcGVhciBpbiB0aGUgc2VhcmNoIHJlc3VsdHNcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3EtY2hlY2tib3g+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwidGVybXMuZXhjbHVkZXNcIlxuICAgICAgICAgICAgZmlsbGVkXG4gICAgICAgICAgICB0eXBlPVwidGV4dGFyZWFcIlxuICAgICAgICAgICAgbGFiZWw9XCJUeXBlIGV4Y2x1c2lvbiB0ZXJtc1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHEtdG9vbHRpcD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvblwiPlxuICAgICAgICAgICAgICAgIEVhY2ggbGluZSBjb250YWlucyBhIHBocmFzZSwgYSBwaHJhc2UgY2FuIGNvbnRhaW4gbXVsdGlwbGUgd29yZHNcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3EtdG9vbHRpcD5cbiAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLXRhYi1wYW5lbD5cblxuICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJxdWVyeV9vcHRpb25zXCIgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgdi1tb2RlbD1cInF1ZXJ5T3B0aW9ucy5maWxldHlwZVwiXG4gICAgICAgICAgOm9wdGlvbnM9XCJmaWxlVHlwZU9wdGlvbnNcIlxuICAgICAgICAgIGNsYXNzPVwiY29sLTYgb3B0aW9uXCJcbiAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICA+PC9xLXNlbGVjdD5cbiAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICB2LW1vZGVsPVwicXVlcnlPcHRpb25zLnNpdGVcIlxuICAgICAgICAgIGxhYmVsPVwiU2l0ZVwiXG4gICAgICAgICAgY2xhc3M9XCJjb2wtNiBvcHRpb25cIlxuICAgICAgICAgIGZpbGxlZFxuICAgICAgICA+PC9xLWlucHV0PlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIHYtbW9kZWw9XCJxdWVyeU9wdGlvbnMucmVsYXRlZFwiXG4gICAgICAgICAgbGFiZWw9XCJSZWxhdGVkXCJcbiAgICAgICAgICBjbGFzcz1cImNvbC02IG9wdGlvblwiXG4gICAgICAgICAgZmlsbGVkXG4gICAgICAgID48L3EtaW5wdXQ+XG4gICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgdi1tb2RlbD1cInF1ZXJ5T3B0aW9ucy5pbnRpdGxlXCJcbiAgICAgICAgICBsYWJlbD1cIkluIHRpdGxlXCJcbiAgICAgICAgICBjbGFzcz1cImNvbC02IG9wdGlvblwiXG4gICAgICAgICAgZmlsbGVkXG4gICAgICAgID48L3EtaW5wdXQ+XG4gICAgICAgIDwhLS0gSWYgc2luZ2xlIHdvcmQgc3VlIGludXJsIC0tPlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIHYtbW9kZWw9XCJxdWVyeU9wdGlvbnMuaW51cmxcIlxuICAgICAgICAgIGxhYmVsPVwiSW4gdXJsXCJcbiAgICAgICAgICBjbGFzcz1cImNvbC02IG9wdGlvblwiXG4gICAgICAgICAgZmlsbGVkXG4gICAgICAgID48L3EtaW5wdXQ+XG4gICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgdi1tb2RlbD1cInF1ZXJ5T3B0aW9ucy5pbnRleHRcIlxuICAgICAgICAgIGxhYmVsPVwiSW4gdGV4dFwiXG4gICAgICAgICAgY2xhc3M9XCJjb2wtNiBvcHRpb25cIlxuICAgICAgICAgIGZpbGxlZFxuICAgICAgICA+PC9xLWlucHV0PlxuICAgICAgICA8ZGl2IGlkPVwiYXJvdW5kXCIgY2xhc3M9XCJjb2wtMTIgcm93IGp1c3RpZnktZXZlbmx5IG5vLXdyYXBcIj5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cInF1ZXJ5T3B0aW9ucy5hcm91bmQuZGlzdGFuY2VcIlxuICAgICAgICAgICAgbGFiZWw9XCJBcm91bmRcIlxuICAgICAgICAgICAgY2xhc3M9XCJvcHRpb25cIlxuICAgICAgICAgICAgZmlsbGVkXG4gICAgICAgICAgPjwvcS1pbnB1dD5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cInF1ZXJ5T3B0aW9ucy5hcm91bmQuZmlyc3RQaHJhc2VcIlxuICAgICAgICAgICAgbGFiZWw9XCJQaHJhc2UgIzFcIlxuICAgICAgICAgICAgY2xhc3M9XCJvcHRpb25cIlxuICAgICAgICAgICAgZmlsbGVkXG4gICAgICAgICAgPjwvcS1pbnB1dD5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cInF1ZXJ5T3B0aW9ucy5hcm91bmQuc2Vjb25kUGhyYXNlXCJcbiAgICAgICAgICAgIGxhYmVsPVwiUGhyYXNlICMyXCJcbiAgICAgICAgICAgIGNsYXNzPVwib3B0aW9uXCJcbiAgICAgICAgICAgIGZpbGxlZFxuICAgICAgICAgID48L3EtaW5wdXQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8IS0tIElmIHNpbmdsZSB3b3JkIHN1ZSBpbmFuY2hvciAtLT5cbiAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICB2LW1vZGVsPVwicXVlcnlPcHRpb25zLmluYW5jaG9yXCJcbiAgICAgICAgICBsYWJlbD1cIlNpdGVcIlxuICAgICAgICAgIGNsYXNzPVwiY29sLTYgb3B0aW9uXCJcbiAgICAgICAgICBmaWxsZWRcbiAgICAgICAgPjwvcS1pbnB1dD5cbiAgICAgIDwvcS10YWItcGFuZWw+XG5cbiAgICAgIDxxLXRhYi1wYW5lbCBuYW1lPVwib3RoZXJfb3B0aW9uc1wiPiBub25lIDwvcS10YWItcGFuZWw+XG4gICAgPC9xLXRhYi1wYW5lbHM+XG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIGxhbmc9XCJzYXNzXCIgc2NvcGVkPlxuLnRhYlxuICBmb250LXNpemU6IHNtYWxsXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZVxuICBtYXgtd2lkdGg6IDUwcHhcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbFxuLm9wdGlvblxuICBwYWRkaW5nOiA1cHhcbjwvc3R5bGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyByZWYsIHdhdGNoLCBjb21wdXRlZCwgUmVmIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IHVzZVF1YXNhciB9IGZyb20gJ3F1YXNhcic7XG5pbXBvcnQge1xuICBjcmVhdGVRdWVyeVN0cmluZyxcbiAgY3JlYXRlUXVlcnlPcHRpb25zU3RyaW5nLFxuICBRdWVyeU9wdGlvbnMsXG59IGZyb20gJy4uL2FwaS9hcGknO1xuXG5jb25zdCBkYXRhUmFuZ2VPcHRpb25zID0gW1xuICB7XG4gICAgbGFiZWw6ICdBbnl0aW1lJyxcbiAgICB2YWx1ZTogJycsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJ0luIHRoZSBwYXN0IGhvdXInLFxuICAgIHZhbHVlOiAnJyxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnSW4gdGhlIGxhc3QgMjQgaG91cnMnLFxuICAgIHZhbHVlOiAnJyxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnSW4gdGhlIHBhc3Qgd2VlaycsXG4gICAgdmFsdWU6ICcnLFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICdJbiB0aGUgcGFzdCBtb250aCcsXG4gICAgdmFsdWU6ICcnLFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICdDdXN0b20gcmFuZ2UnLFxuICAgIHZhbHVlOiAnJyxcbiAgfSxcbl07XG5cbmNvbnN0IGZpbGVUeXBlT3B0aW9ucyA9IFtcbiAge1xuICAgIGxhYmVsOiAnTm9uZScsXG4gICAgdmFsdWU6IGZhbHNlLFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICdQZGYnLFxuICAgIHZhbHVlOiAncGRmJyxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnRG9jeCcsXG4gICAgdmFsdWU6ICdkb2N4JyxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnVHh0JyxcbiAgICB2YWx1ZTogJ3R4dCcsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJ1Bvd2VyUG9pbnQnLFxuICAgIHZhbHVlOiAncHB0JyxcbiAgfSxcbl07XG5cbi8qXG5SZXNvdXJjZXNcbiAgaHR0cHM6Ly9haHJlZnMuY29tL2Jsb2cvZ29vZ2xlLWFkdmFuY2VkLXNlYXJjaC1vcGVyYXRvcnMvXG4gIGh0dHBzOi8vYWhyZWZzLmNvbS9ibG9nL21ldGEtcm9ib3RzL1xuICBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RvY3MvZXh0ZW5zaW9ucy9tdjMvbWFuaWZlc3QvXG4gIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZG9jcy9leHRlbnNpb25zL212My90dXRfZGVidWdnaW5nL1xuICBodHRwczovL3F1YXNhci5kZXYvcXVhc2FyLWNsaS12aXRlL2RldmVsb3BpbmctYnJvd3Nlci1leHRlbnNpb25zL2JleC1jb21tdW5pY2F0aW9uXG4qL1xuXG5jb25zdCBvdGhlck9wdGlvbnMgPSByZWYoe1xuICBkYXRlUmFuZ2U6IGRhdGFSYW5nZU9wdGlvbnNbMF0sXG59KTtcbndhdGNoKFxuICBvdGhlck9wdGlvbnMsXG4gICh2YWwpID0+IHtcbiAgICBjb25zb2xlLmxvZyh2YWwpO1xuICB9LFxuICB7XG4gICAgZGVlcDogdHJ1ZSxcbiAgfVxuKTtcbmNvbnN0IHRhYiA9IHJlZigndGVybXMnKTtcblxuY29uc3QgdGVybXMgPSByZWYoe1xuICBjb250YWluczogJycsXG4gIHN0cmljdE1vZGU6IGZhbHNlLFxuICBleGNsdWRlczogJycsXG59KTtcblxuY29uc3QgJHEgPSB1c2VRdWFzYXIoKTtcbiRxLmJleC5vbigncmV2ZXJzZScsICh7IGRhdGEgfSkgPT4ge1xuICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgcXVlcnlTdHJpbmdSZWNlaXZlZC52YWx1ZSA9IGRhdGEucXVlcnlSYXc7XG59KTtcbmNvbnN0IHF1ZXJ5U3RyaW5nUmVjZWl2ZWQgPSByZWYoJycpO1xuXG5jb25zdCBxdWVyeVN0cmluZ1Rlcm1zR2VuZXJhdGVkID0gcmVmKCcnKTtcbmNvbnN0IHF1ZXJ5U3RyaW5nR2VuZXJhdGVkOiBSZWY8c3RyaW5nPiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIChcbiAgICBxdWVyeVN0cmluZ1Rlcm1zR2VuZXJhdGVkLnZhbHVlICsgJyAnICsgcXVlcnlTdHJpbmdPcHRpb25zR2VuZXJhdGVkLnZhbHVlXG4gICk7XG59KTtcbndhdGNoKFxuICB0ZXJtcyxcbiAgYXN5bmMgKHZhbCkgPT4ge1xuICAgIHF1ZXJ5U3RyaW5nVGVybXNHZW5lcmF0ZWQudmFsdWUgPSBjcmVhdGVRdWVyeVN0cmluZyhcbiAgICAgIHZhbC5jb250YWlucyxcbiAgICAgIHZhbC5zdHJpY3RNb2RlLFxuICAgICAgdmFsLmV4Y2x1ZGVzXG4gICAgKTtcbiAgICBhd2FpdCAkcS5iZXguc2VuZCgndXBkYXRlJywge1xuICAgICAgcXVlcnlTdHJpbmdHZW5lcmF0ZWQ6IHF1ZXJ5U3RyaW5nR2VuZXJhdGVkLnZhbHVlLFxuICAgIH0pO1xuICB9LFxuICB7XG4gICAgZGVlcDogdHJ1ZSxcbiAgfVxuKTtcblxuY29uc3QgcXVlcnlPcHRpb25zID0gcmVmKHtcbiAgZmlsZXR5cGU6IGZhbHNlLFxuICBzaXRlOiAnJyxcbiAgcmVsYXRlZDogJycsXG4gIGludGl0bGU6ICcnLFxuICBpbnVybDogJycsXG4gIGludGV4dDogJycsXG4gIGFyb3VuZDoge1xuICAgIGRpc3RhbmNlOiBudWxsLFxuICAgIGZpcnN0UGhyYXNlOiAnJyxcbiAgICBzZWNvbmRQaHJhc2U6ICcnLFxuICB9LFxuICBpbmFuY2hvcjogJycsXG59KTtcbmNvbnN0IHF1ZXJ5U3RyaW5nT3B0aW9uc0dlbmVyYXRlZCA9IHJlZignJyk7XG53YXRjaChcbiAgcXVlcnlPcHRpb25zLFxuICBhc3luYyAodmFsKSA9PiB7XG4gICAgcXVlcnlTdHJpbmdPcHRpb25zR2VuZXJhdGVkLnZhbHVlID0gY3JlYXRlUXVlcnlPcHRpb25zU3RyaW5nKFxuICAgICAgdmFsIGFzIFF1ZXJ5T3B0aW9uc1xuICAgICk7XG4gICAgY29uc29sZS5sb2cocXVlcnlTdHJpbmdHZW5lcmF0ZWQudmFsdWUpO1xuICAgIGF3YWl0ICRxLmJleC5zZW5kKCd1cGRhdGUnLCB7XG4gICAgICBxdWVyeVN0cmluZ0dlbmVyYXRlZDogcXVlcnlTdHJpbmdHZW5lcmF0ZWQudmFsdWUsXG4gICAgfSk7XG4gIH0sXG4gIHtcbiAgICBkZWVwOiB0cnVlLFxuICB9XG4pO1xuXG4vLyB3YXRjaChcbi8vICAgcXVlcnlTdHJpbmdSZWNlaXZlZCxcbi8vICAgKHZhbCkgPT4ge1xuLy8gICAgIHF1ZXJ5U3RyaW5nR2VuZXJhdGVkLnZhbHVlID0gdmFsO1xuLy8gICB9LFxuLy8gICB7XG4vLyAgICAgaW1tZWRpYXRlOiB0cnVlLFxuLy8gICB9XG4vLyApO1xuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQXlEQSxTQUFTLGtCQUNQLFlBQ0EsWUFDQSxnQkFDUTtBQUNSLE1BQUksWUFBWTtBQUNWLFFBQUEsYUFBYSxXQUFXLE1BQU0sSUFBSTtBQUN4QyxXQUFTLElBQUksR0FBRyxJQUFJLFdBQVcsU0FBUyxHQUFHLEtBQUs7QUFDOUMsaUJBQWEsSUFBSSxXQUFXLE9BQU8sYUFBYSxRQUFRO0FBQUEsRUFDMUQ7QUFDYSxlQUFBLElBQUksV0FBVyxXQUFXLFNBQVM7QUFFMUMsUUFBQSxzQkFBc0IsZUFBZSxNQUFNLElBQUk7QUFDNUMsV0FBQSxJ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
