import { _ as _export_sfc, d as defineComponent, r as ref, C as watch, D as useQuasar, z as computed, c as createBlock, w as withCtx, B as QPage, o as openBlock, n as createBaseVNode, b as createVNode, E as QTab, G as QSeparator, H as QTabs, I as QSelect, J as QTabPanel, K as QInput, L as QTooltip, M as QCheckbox, f as createCommentVNode, N as QTabPanels, h as createTextVNode, O as pushScopeId, P as popScopeId } from "./index.dc560431.js";
function createQueryString(searchTerm, strictMode, exclusionTerms) {
  let baseQuery = "";
  const termsSplit = searchTerm.split("\n");
  for (let i = 0; i < termsSplit.length - 1; i++) {
    baseQuery += `(${termsSplit[i]}) ${strictMode ? "AND" : "|"} `;
  }
  baseQuery += `(${termsSplit[termsSplit.length - 1]}) `;
  const exclusionTermsSplit = exclusionTerms.split("\n");
  for (let i = 0; i < exclusionTermsSplit.length && exclusionTermsSplit.length > 1; i++) {
    baseQuery += `~(${exclusionTermsSplit[i]}) `;
  }
  return baseQuery;
}
function applyQueryOptions(queryRaw, options) {
  var _a;
  let newQueryString = queryRaw;
  if (options.filetype) {
    newQueryString += `filetype: ${options.filetype} `;
  }
  if (options.site) {
    newQueryString += `site: ${options.site} `;
  }
  if (options.related) {
    newQueryString += `related: ${options.related} `;
  }
  if (options.intitle) {
    newQueryString += `intitle: (${options.intitle}) `;
  }
  if (options.inurl) {
    newQueryString += `inurl: (${options.inurl}) `;
  }
  if (options.intext) {
    newQueryString += `intext: (${options.intext}) `;
  }
  if ((_a = options.around) == null ? void 0 : _a.distance) {
    newQueryString += `${options.around.firstPhrase} AROUND(${options.around.distance}) ${options.around.secondPhrase} `;
  }
  if (options.inanchor) {
    newQueryString += `inanchor: (${options.inanchor}) `;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoSW5wdXRzUGFnZS5kNWM2Y2I2Yi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9hcGkudHMiLCIuLi8uLi8uLi8uLi9zcmMvcGFnZXMvU2VhcmNoSW5wdXRzUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsidHlwZSBGaWxlVHlwZSA9ICdwZGYnIHwgJ2RvY3gnIHwgJ3R4dCcgfCAncHB0JyB8IGZhbHNlXG5cbmV4cG9ydCB0eXBlIFF1ZXJ5T3B0aW9ucyA9IHtcbiAgZmlsZXR5cGU/OiBGaWxlVHlwZVxuICBzaXRlPzogc3RyaW5nXG4gIHJlbGF0ZWQ/OiBzdHJpbmdcbiAgaW50aXRsZT86IHN0cmluZ1xuICBpbnVybD86IHN0cmluZ1xuICAvLyBhbGxpbnVybD86IHN0cmluZ1xuICBpbnRleHQ/OiBzdHJpbmdcbiAgLy8gVHdvIHBocmFzZXMgd2l0aGluIE5VTUJFUiBhcGFydFxuICAvLyBVc2VmdWwgaWYgYSBwZXJzb24gaGFzIG11bHRpcGxlIG5hbWVzIGJ1dCB3ZSBvbmx5IGtub3cgdHdvIG9yIHRvIGZpbmQgcmVsYXRpdmVzXG4gIC8vIEhpdCBvciBtaXNzXG4gIGFyb3VuZD86IHtcbiAgICBmaXJzdFBocmFzZTogc3RyaW5nXG4gICAgc2Vjb25kUGhyYXNlOiBzdHJpbmdcbiAgICBkaXN0YW5jZTogbnVtYmVyIHwgbnVsbFxuICB9XG4gIC8vIEhpdCBvciBtaXNzXG4gIGluYW5jaG9yPzogc3RyaW5nXG4gIC8vIEhpdCBvciBtaXNzXG4gIC8vIGFsbGluYW5jaG9yPzogc3RyaW5nXG59XG5cbi8vIHR5cGUgT3B0aW9ucyA9IHtcbi8vICAgc3RhcnREYXRlPzogRGF0ZSxcbi8vICAgZW5kRGF0ZT86IERhdGUsXG4vLyB9XG5cbi8vIHR5cGUgU2VhcmNoVGVybSA9IHtcbi8vICAgdGVybTogc3RyaW5nLFxuLy8gICBjb25kaXRpb246IENvbmRpdGlvbmFsUGFyYW1ldGVycyxcbi8vIH07XG5cbi8vIGludGVyZmFjZSBCYXNlUXVlcnkge1xuLy8gICB0b1N0cmluZygpOiBzdHJpbmdcbi8vICAgb3B0aW9uczogc3RyaW5nW11cbi8vIH1cblxuLy8gaW50ZXJmYWNlIFF1ZXJ5IGV4dGVuZHMgQmFzZVF1ZXJ5IHtcblxuLy8gfVxuXG4vLyAvLyBFYWNoIFxuLy8gZW51bSBDb25kaXRpb25hbFBhcmFtZXRlcnMge1xuLy8gICBPcixcbi8vICAgQW5kLFxuLy8gICBFeGNsdXNpb24sXG4vLyAgIFdpbGRjYXJkLFxuLy8gfVxuLypcblxuKi9cblxuZnVuY3Rpb24gY3JlYXRlUXVlcnlTdHJpbmcoXG4gIHNlYXJjaFRlcm06IHN0cmluZyxcbiAgc3RyaWN0TW9kZTogYm9vbGVhbixcbiAgZXhjbHVzaW9uVGVybXM6IHN0cmluZyxcbik6IHN0cmluZyB7XG4gIGxldCBiYXNlUXVlcnkgPSAnJztcbiAgY29uc3QgdGVybXNTcGxpdCA9IHNlYXJjaFRlcm0uc3BsaXQoJ1xcbicpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRlcm1zU3BsaXQubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgYmFzZVF1ZXJ5ICs9IGAoJHt0ZXJtc1NwbGl0W2ldfSkgJHtzdHJpY3RNb2RlID8gJ0FORCcgOiAnfCd9IGBcbiAgfVxuICBiYXNlUXVlcnkgKz0gYCgke3Rlcm1zU3BsaXRbdGVybXNTcGxpdC5sZW5ndGggLSAxXX0pIGBcblxuICBjb25zdCBleGNsdXNpb25UZXJtc1NwbGl0ID0gZXhjbHVzaW9uVGVybXMuc3BsaXQoJ1xcbicpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGV4Y2x1c2lvblRlcm1zU3BsaXQubGVuZ3RoICYmIGV4Y2x1c2lvblRlcm1zU3BsaXQubGVuZ3RoID4gMTsgaSsrKSB7XG4gICAgYmFzZVF1ZXJ5ICs9IGB+KCR7ZXhjbHVzaW9uVGVybXNTcGxpdFtpXX0pIGBcbiAgfVxuICByZXR1cm4gYmFzZVF1ZXJ5O1xufVxuXG5mdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5OiBzdHJpbmcpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnICsgcXVlcnkpO1xufVxuXG5mdW5jdGlvbiBhcHBseVF1ZXJ5T3B0aW9ucyhxdWVyeVJhdzogc3RyaW5nLCBvcHRpb25zOiBRdWVyeU9wdGlvbnMpIHtcbiAgbGV0IG5ld1F1ZXJ5U3RyaW5nID0gcXVlcnlSYXc7XG4gIGlmIChvcHRpb25zLmZpbGV0eXBlKSB7XG4gICAgbmV3UXVlcnlTdHJpbmcgKz0gYGZpbGV0eXBlOiAke29wdGlvbnMuZmlsZXR5cGV9IGBcbiAgfVxuICAvLyBUT0RPIFZhbGlkYXRlIHNpdGVcbiAgaWYgKG9wdGlvbnMuc2l0ZSkge1xuICAgIG5ld1F1ZXJ5U3RyaW5nICs9IGBzaXRlOiAke29wdGlvbnMuc2l0ZX0gYFxuICB9XG4gIC8vIFRPRE8gVmFsaWRhdGUgc2l0ZVxuICBpZiAob3B0aW9ucy5yZWxhdGVkKSB7XG4gICAgbmV3UXVlcnlTdHJpbmcgKz0gYHJlbGF0ZWQ6ICR7b3B0aW9ucy5yZWxhdGVkfSBgXG4gIH1cbiAgaWYgKG9wdGlvbnMuaW50aXRsZSkge1xuICAgIG5ld1F1ZXJ5U3RyaW5nICs9IGBpbnRpdGxlOiAoJHtvcHRpb25zLmludGl0bGV9KSBgXG4gIH1cbiAgaWYob3B0aW9ucy5pbnVybCkge1xuICAgIG5ld1F1ZXJ5U3RyaW5nICs9IGBpbnVybDogKCR7b3B0aW9ucy5pbnVybH0pIGBcbiAgfVxuICBpZiAob3B0aW9ucy5pbnRleHQpIHtcbiAgICBuZXdRdWVyeVN0cmluZyArPSBgaW50ZXh0OiAoJHtvcHRpb25zLmludGV4dH0pIGBcbiAgfVxuICBpZiAob3B0aW9ucy5hcm91bmQ/LmRpc3RhbmNlKSB7XG4gICAgbmV3UXVlcnlTdHJpbmcgKz0gYCR7b3B0aW9ucy5hcm91bmQuZmlyc3RQaHJhc2V9IEFST1VORCgke29wdGlvbnMuYXJvdW5kLmRpc3RhbmNlfSkgJHtvcHRpb25zLmFyb3VuZC5zZWNvbmRQaHJhc2V9IGBcbiAgfVxuICBpZiAob3B0aW9ucy5pbmFuY2hvcikge1xuICAgIG5ld1F1ZXJ5U3RyaW5nICs9IGBpbmFuY2hvcjogKCR7b3B0aW9ucy5pbmFuY2hvcn0pIGBcbiAgfVxuICByZXR1cm4gbmV3UXVlcnlTdHJpbmdcbn1cblxuZnVuY3Rpb24gY3JlYXRlUXVlcnlPcHRpb25zU3RyaW5nKG9wdGlvbnM6IFF1ZXJ5T3B0aW9ucykge1xuICByZXR1cm4gYXBwbHlRdWVyeU9wdGlvbnMoJycsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVRdWVyeVN0cmluZztcbmV4cG9ydCB7XG4gIGNyZWF0ZVF1ZXJ5U3RyaW5nLFxuICBhcHBseVF1ZXJ5T3B0aW9ucyxcbiAgcGFyc2VRdWVyeVN0cmluZyxcbiAgY3JlYXRlUXVlcnlPcHRpb25zU3RyaW5nLFxufSIsIlxuPHRlbXBsYXRlPlxuICA8cS1wYWdlIGNsYXNzPVwiY29sdW1uXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWV2ZW5seSBiZy1wcmltYXJ5XCI+XG4gICAgICA8cS10YWJzIHYtbW9kZWw9XCJ0YWJcIiBpbmxpbmUtbGFiZWwgY2xhc3M9XCJiZy13aGl0ZVwiPlxuICAgICAgICA8cS10YWIgbmFtZT1cInRlcm1zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhYiBjb2x1bW5cIj5cbiAgICAgICAgICAgIDxkaXY+U2VhcmNoPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PnRlcm1zPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS10YWI+XG4gICAgICAgIDxxLXNlcGFyYXRvciB2ZXJ0aWNhbCBzcGFjZWQ+PC9xLXNlcGFyYXRvcj5cbiAgICAgICAgPHEtdGFiIG5hbWU9XCJxdWVyeV9vcHRpb25zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhYiBjb2x1bW5cIj5cbiAgICAgICAgICAgIDxkaXY+UXVlcnk8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+b3B0aW9uczwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtdGFiPlxuICAgICAgICA8cS1zZXBhcmF0b3IgdmVydGljYWwgc3BhY2VkPjwvcS1zZXBhcmF0b3I+XG4gICAgICAgIDxxLXRhYiBuYW1lPVwib3RoZXJfb3B0aW9uc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWIgY29sdW1uXCI+XG4gICAgICAgICAgICA8ZGl2Pk90aGVyPC9kaXY+XG4gICAgICAgICAgICA8ZGl2Pm9wdGlvbnM8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLXRhYj5cbiAgICAgIDwvcS10YWJzPlxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICBsYWJlbD1cIkRhdGVcIlxuICAgICAgICAgIHYtbW9kZWw9XCJvdGhlck9wdGlvbnMuZGF0ZVJhbmdlXCJcbiAgICAgICAgICA6b3B0aW9ucz1cImRhdGFSYW5nZU9wdGlvbnNcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPHEtdGFiLXBhbmVscyB2LW1vZGVsPVwidGFiXCIgYW5pbWF0ZWQgY2xhc3M9XCJzaGFkb3ctMiByb3VuZGVkLWJvcmRlcnNcIj5cbiAgICAgIDxxLXRhYi1wYW5lbCBjbGFzcz1cInJvdyBuby13cmFwXCIgbmFtZT1cInRlcm1zXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLXByLXNtXCI+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJ0ZXJtcy5jb250YWluc1wiXG4gICAgICAgICAgICBmaWxsZWRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0YXJlYVwiXG4gICAgICAgICAgICBsYWJlbD1cIlR5cGUgdGVybXNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxxLXRvb2x0aXA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNhcHRpb25cIj5cbiAgICAgICAgICAgICAgICBFYWNoIGxpbmUgY29udGFpbnMgYSBzZWFyY2ggdGVybSwgYSB0ZXJtIHdpbGwgYXBwZWFyIGV4YWN0bHkgaW4geW91ciBzZWFyY2ggcmVzdWx0XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9xLXRvb2x0aXA+XG4gICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cS1jaGVja2JveCB2LW1vZGVsPVwidGVybXMuc3RyaWN0TW9kZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgRXZlcnkgdGVybSBzaG91bGQgYXBwZWFyIGluIHRoZSBzZWFyY2ggcmVzdWx0c1xuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvcS1jaGVja2JveD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJ0ZXJtcy5leGNsdWRlc1wiXG4gICAgICAgICAgICBmaWxsZWRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0YXJlYVwiXG4gICAgICAgICAgICBsYWJlbD1cIlR5cGUgZXhjbHVzaW9uIHRlcm1zXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cS10b29sdGlwPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgRWFjaCBsaW5lIGNvbnRhaW5zIGEgcGhyYXNlLCBhIHBocmFzZSBjYW4gY29udGFpbiBtdWx0aXBsZSB3b3Jkc1xuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvcS10b29sdGlwPlxuICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtdGFiLXBhbmVsPlxuXG4gICAgICA8cS10YWItcGFuZWwgbmFtZT1cInF1ZXJ5X29wdGlvbnNcIiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICB2LW1vZGVsPVwicXVlcnlPcHRpb25zLmZpbGV0eXBlXCJcbiAgICAgICAgICA6b3B0aW9ucz1cImZpbGVUeXBlT3B0aW9uc1wiXG4gICAgICAgICAgY2xhc3M9XCJjb2wtNiBvcHRpb25cIlxuICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgID48L3Etc2VsZWN0PlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIHYtbW9kZWw9XCJxdWVyeU9wdGlvbnMuc2l0ZVwiXG4gICAgICAgICAgbGFiZWw9XCJTaXRlXCJcbiAgICAgICAgICBjbGFzcz1cImNvbC02IG9wdGlvblwiXG4gICAgICAgICAgZmlsbGVkXG4gICAgICAgID48L3EtaW5wdXQ+XG4gICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgdi1tb2RlbD1cInF1ZXJ5T3B0aW9ucy5yZWxhdGVkXCJcbiAgICAgICAgICBsYWJlbD1cIlJlbGF0ZWRcIlxuICAgICAgICAgIGNsYXNzPVwiY29sLTYgb3B0aW9uXCJcbiAgICAgICAgICBmaWxsZWRcbiAgICAgICAgPjwvcS1pbnB1dD5cbiAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICB2LW1vZGVsPVwicXVlcnlPcHRpb25zLmludGl0bGVcIlxuICAgICAgICAgIGxhYmVsPVwiSW4gdGl0bGVcIlxuICAgICAgICAgIGNsYXNzPVwiY29sLTYgb3B0aW9uXCJcbiAgICAgICAgICBmaWxsZWRcbiAgICAgICAgPjwvcS1pbnB1dD5cbiAgICAgICAgPCEtLSBJZiBzaW5nbGUgd29yZCBzdWUgaW51cmwgLS0+XG4gICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgdi1tb2RlbD1cInF1ZXJ5T3B0aW9ucy5pbnVybFwiXG4gICAgICAgICAgbGFiZWw9XCJJbiB1cmxcIlxuICAgICAgICAgIGNsYXNzPVwiY29sLTYgb3B0aW9uXCJcbiAgICAgICAgICBmaWxsZWRcbiAgICAgICAgPjwvcS1pbnB1dD5cbiAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICB2LW1vZGVsPVwicXVlcnlPcHRpb25zLmludGV4dFwiXG4gICAgICAgICAgbGFiZWw9XCJJbiB0ZXh0XCJcbiAgICAgICAgICBjbGFzcz1cImNvbC02IG9wdGlvblwiXG4gICAgICAgICAgZmlsbGVkXG4gICAgICAgID48L3EtaW5wdXQ+XG4gICAgICAgIDxkaXYgaWQ9XCJhcm91bmRcIiBjbGFzcz1cImNvbC0xMiByb3cganVzdGlmeS1ldmVubHkgbm8td3JhcFwiPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwicXVlcnlPcHRpb25zLmFyb3VuZC5kaXN0YW5jZVwiXG4gICAgICAgICAgICBsYWJlbD1cIkFyb3VuZFwiXG4gICAgICAgICAgICBjbGFzcz1cIm9wdGlvblwiXG4gICAgICAgICAgICBmaWxsZWRcbiAgICAgICAgICA+PC9xLWlucHV0PlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwicXVlcnlPcHRpb25zLmFyb3VuZC5maXJzdFBocmFzZVwiXG4gICAgICAgICAgICBsYWJlbD1cIlBocmFzZSAjMVwiXG4gICAgICAgICAgICBjbGFzcz1cIm9wdGlvblwiXG4gICAgICAgICAgICBmaWxsZWRcbiAgICAgICAgICA+PC9xLWlucHV0PlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwicXVlcnlPcHRpb25zLmFyb3VuZC5zZWNvbmRQaHJhc2VcIlxuICAgICAgICAgICAgbGFiZWw9XCJQaHJhc2UgIzJcIlxuICAgICAgICAgICAgY2xhc3M9XCJvcHRpb25cIlxuICAgICAgICAgICAgZmlsbGVkXG4gICAgICAgICAgPjwvcS1pbnB1dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS0gSWYgc2luZ2xlIHdvcmQgc3VlIGluYW5jaG9yIC0tPlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIHYtbW9kZWw9XCJxdWVyeU9wdGlvbnMuaW5hbmNob3JcIlxuICAgICAgICAgIGxhYmVsPVwiU2l0ZVwiXG4gICAgICAgICAgY2xhc3M9XCJjb2wtNiBvcHRpb25cIlxuICAgICAgICAgIGZpbGxlZFxuICAgICAgICA+PC9xLWlucHV0PlxuICAgICAgPC9xLXRhYi1wYW5lbD5cblxuICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJvdGhlcl9vcHRpb25zXCI+IG5vbmUgPC9xLXRhYi1wYW5lbD5cbiAgICA8L3EtdGFiLXBhbmVscz5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgbGFuZz1cInNhc3NcIiBzY29wZWQ+XG4udGFiXG4gIGZvbnQtc2l6ZTogc21hbGxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lXG4gIG1heC13aWR0aDogNTBweFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsXG4ub3B0aW9uXG4gIHBhZGRpbmc6IDVweFxuPC9zdHlsZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHJlZiwgd2F0Y2gsIGNvbXB1dGVkLCBSZWYgfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgdXNlUXVhc2FyIH0gZnJvbSAncXVhc2FyJztcbmltcG9ydCB7XG4gIGNyZWF0ZVF1ZXJ5U3RyaW5nLFxuICBjcmVhdGVRdWVyeU9wdGlvbnNTdHJpbmcsXG4gIFF1ZXJ5T3B0aW9ucyxcbn0gZnJvbSAnLi4vYXBpL2FwaSc7XG5cbmNvbnN0IGRhdGFSYW5nZU9wdGlvbnMgPSBbXG4gIHtcbiAgICBsYWJlbDogJ0FueXRpbWUnLFxuICAgIHZhbHVlOiAnJyxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnSW4gdGhlIHBhc3QgaG91cicsXG4gICAgdmFsdWU6ICcnLFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICdJbiB0aGUgbGFzdCAyNCBob3VycycsXG4gICAgdmFsdWU6ICcnLFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICdJbiB0aGUgcGFzdCB3ZWVrJyxcbiAgICB2YWx1ZTogJycsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJ0luIHRoZSBwYXN0IG1vbnRoJyxcbiAgICB2YWx1ZTogJycsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJ0N1c3RvbSByYW5nZScsXG4gICAgdmFsdWU6ICcnLFxuICB9LFxuXTtcblxuY29uc3QgZmlsZVR5cGVPcHRpb25zID0gW1xuICB7XG4gICAgbGFiZWw6ICdOb25lJyxcbiAgICB2YWx1ZTogZmFsc2UsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJ1BkZicsXG4gICAgdmFsdWU6ICdwZGYnLFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICdEb2N4JyxcbiAgICB2YWx1ZTogJ2RvY3gnLFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICdUeHQnLFxuICAgIHZhbHVlOiAndHh0JyxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnUG93ZXJQb2ludCcsXG4gICAgdmFsdWU6ICdwcHQnLFxuICB9LFxuXTtcblxuLypcblJlc291cmNlc1xuICBodHRwczovL2FocmVmcy5jb20vYmxvZy9nb29nbGUtYWR2YW5jZWQtc2VhcmNoLW9wZXJhdG9ycy9cbiAgaHR0cHM6Ly9haHJlZnMuY29tL2Jsb2cvbWV0YS1yb2JvdHMvXG4gIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZG9jcy9leHRlbnNpb25zL212My9tYW5pZmVzdC9cbiAgaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kb2NzL2V4dGVuc2lvbnMvbXYzL3R1dF9kZWJ1Z2dpbmcvXG4gIGh0dHBzOi8vcXVhc2FyLmRldi9xdWFzYXItY2xpLXZpdGUvZGV2ZWxvcGluZy1icm93c2VyLWV4dGVuc2lvbnMvYmV4LWNvbW11bmljYXRpb25cbiovXG5cbmNvbnN0IG90aGVyT3B0aW9ucyA9IHJlZih7XG4gIGRhdGVSYW5nZTogZGF0YVJhbmdlT3B0aW9uc1swXSxcbn0pO1xud2F0Y2goXG4gIG90aGVyT3B0aW9ucyxcbiAgKHZhbCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHZhbCk7XG4gIH0sXG4gIHtcbiAgICBkZWVwOiB0cnVlLFxuICB9XG4pO1xuY29uc3QgdGFiID0gcmVmKCd0ZXJtcycpO1xuXG5jb25zdCB0ZXJtcyA9IHJlZih7XG4gIGNvbnRhaW5zOiAnJyxcbiAgc3RyaWN0TW9kZTogZmFsc2UsXG4gIGV4Y2x1ZGVzOiAnJyxcbn0pO1xuXG5jb25zdCAkcSA9IHVzZVF1YXNhcigpO1xuJHEuYmV4Lm9uKCdyZXZlcnNlJywgKHsgZGF0YSB9KSA9PiB7XG4gIGNvbnNvbGUubG9nKGRhdGEpO1xuICBxdWVyeVN0cmluZ1JlY2VpdmVkLnZhbHVlID0gZGF0YS5xdWVyeVJhdztcbn0pO1xuY29uc3QgcXVlcnlTdHJpbmdSZWNlaXZlZCA9IHJlZignJyk7XG5cbmNvbnN0IHF1ZXJ5U3RyaW5nVGVybXNHZW5lcmF0ZWQgPSByZWYoJycpO1xuY29uc3QgcXVlcnlTdHJpbmdHZW5lcmF0ZWQ6IFJlZjxzdHJpbmc+ID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIHF1ZXJ5U3RyaW5nVGVybXNHZW5lcmF0ZWQudmFsdWUgKyAnICcgKyBxdWVyeVN0cmluZ09wdGlvbnNHZW5lcmF0ZWQudmFsdWVcbiAgKTtcbn0pO1xud2F0Y2goXG4gIHRlcm1zLFxuICBhc3luYyAodmFsKSA9PiB7XG4gICAgcXVlcnlTdHJpbmdUZXJtc0dlbmVyYXRlZC52YWx1ZSA9IGNyZWF0ZVF1ZXJ5U3RyaW5nKFxuICAgICAgdmFsLmNvbnRhaW5zLFxuICAgICAgdmFsLnN0cmljdE1vZGUsXG4gICAgICB2YWwuZXhjbHVkZXNcbiAgICApO1xuICAgIGF3YWl0ICRxLmJleC5zZW5kKCd1cGRhdGUnLCB7XG4gICAgICBxdWVyeVN0cmluZ0dlbmVyYXRlZDogcXVlcnlTdHJpbmdHZW5lcmF0ZWQudmFsdWUsXG4gICAgfSk7XG4gIH0sXG4gIHtcbiAgICBkZWVwOiB0cnVlLFxuICB9XG4pO1xuXG5jb25zdCBxdWVyeU9wdGlvbnMgPSByZWYoe1xuICBmaWxldHlwZTogZmFsc2UsXG4gIHNpdGU6ICcnLFxuICByZWxhdGVkOiAnJyxcbiAgaW50aXRsZTogJycsXG4gIGludXJsOiAnJyxcbiAgaW50ZXh0OiAnJyxcbiAgYXJvdW5kOiB7XG4gICAgZGlzdGFuY2U6IG51bGwsXG4gICAgZmlyc3RQaHJhc2U6ICcnLFxuICAgIHNlY29uZFBocmFzZTogJycsXG4gIH0sXG4gIGluYW5jaG9yOiAnJyxcbn0pO1xuY29uc3QgcXVlcnlTdHJpbmdPcHRpb25zR2VuZXJhdGVkID0gcmVmKCcnKTtcbndhdGNoKFxuICBxdWVyeU9wdGlvbnMsXG4gIGFzeW5jICh2YWwpID0+IHtcbiAgICBxdWVyeVN0cmluZ09wdGlvbnNHZW5lcmF0ZWQudmFsdWUgPSBjcmVhdGVRdWVyeU9wdGlvbnNTdHJpbmcoXG4gICAgICB2YWwgYXMgUXVlcnlPcHRpb25zXG4gICAgKTtcbiAgICBjb25zb2xlLmxvZyhxdWVyeVN0cmluZ0dlbmVyYXRlZC52YWx1ZSk7XG4gICAgYXdhaXQgJHEuYmV4LnNlbmQoJ3VwZGF0ZScsIHtcbiAgICAgIHF1ZXJ5U3RyaW5nR2VuZXJhdGVkOiBxdWVyeVN0cmluZ0dlbmVyYXRlZC52YWx1ZSxcbiAgICB9KTtcbiAgfSxcbiAge1xuICAgIGRlZXA6IHRydWUsXG4gIH1cbik7XG5cbi8vIHdhdGNoKFxuLy8gICBxdWVyeVN0cmluZ1JlY2VpdmVkLFxuLy8gICAodmFsKSA9PiB7XG4vLyAgICAgcXVlcnlTdHJpbmdHZW5lcmF0ZWQudmFsdWUgPSB2YWw7XG4vLyAgIH0sXG4vLyAgIHtcbi8vICAgICBpbW1lZGlhdGU6IHRydWUsXG4vLyAgIH1cbi8vICk7XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBc0RBLFNBQVMsa0JBQ1AsWUFDQSxZQUNBLGdCQUNRO0FBQ1IsTUFBSSxZQUFZO0FBQ1YsUUFBQSxhQUFhLFdBQVcsTUFBTSxJQUFJO0FBQ3hDLFdBQVMsSUFBSSxHQUFHLElBQUksV0FBVyxTQUFTLEdBQUcsS0FBSztBQUM5QyxpQkFBYSxJQUFJLFdBQVcsT0FBTyxhQUFhLFFBQVE7QUFBQSxFQUMxRDtBQUNhLGVBQUEsSUFBSSxXQUFXLFdBQVcsU0FBUztBQUUxQyxRQUFBLHNCQUFzQixlQUFlLE1BQU0sSUFBSTtBQUM1QyxXQUFBLElBQUksR0FBRyxJQUFJLG9CQUFvQixVQUFVLG9CQUFvQixTQUFT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
