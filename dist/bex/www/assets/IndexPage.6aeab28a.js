import { _ as _export_sfc, d as defineComponent, r as ref, z as computed, o as openBlock, s as createElementBlock, n as createBaseVNode, t as toDisplayString, F as Fragment, u as renderList, A as unref, c as createBlock, w as withCtx, B as QPage, b as createVNode } from "./index.dc560431.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ExampleComponent",
  props: {
    title: { type: String, required: true },
    todos: { type: Array, required: false, default: () => [] },
    meta: { type: null, required: true },
    active: { type: Boolean, required: true }
  },
  setup(__props) {
    const props = __props;
    const clickCount = ref(0);
    function increment() {
      clickCount.value += 1;
      return clickCount.value;
    }
    const todoCount = computed(() => props.todos.length);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("p", null, toDisplayString(__props.title), 1),
        createBaseVNode("ul", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.todos, (todo) => {
            return openBlock(), createElementBlock("li", {
              key: todo.id,
              onClick: increment
            }, toDisplayString(todo.id) + " - " + toDisplayString(todo.content), 1);
          }), 128))
        ]),
        createBaseVNode("p", null, "Count: " + toDisplayString(unref(todoCount)) + " / " + toDisplayString(__props.meta.totalCount), 1),
        createBaseVNode("p", null, "Active: " + toDisplayString(__props.active ? "yes" : "no"), 1),
        createBaseVNode("p", null, "Clicks on todos: " + toDisplayString(clickCount.value), 1)
      ]);
    };
  }
});
var ExampleComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/pb/code/search/ui/src/components/ExampleComponent.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "IndexPage",
  setup(__props) {
    const todos = ref([
      {
        id: 1,
        content: "ct1"
      },
      {
        id: 2,
        content: "ct2"
      },
      {
        id: 3,
        content: "ct3"
      },
      {
        id: 4,
        content: "ct4"
      },
      {
        id: 5,
        content: "ct5"
      }
    ]);
    const meta = ref({
      totalCount: 1200
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { class: "row items-center justify-evenly" }, {
        default: withCtx(() => [
          createVNode(ExampleComponent, {
            title: "Example component",
            active: "",
            todos: todos.value,
            meta: meta.value
          }, null, 8, ["todos", "meta"])
        ]),
        _: 1
      });
    };
  }
});
var IndexPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/pb/code/search/ui/src/pages/IndexPage.vue"]]);
export { IndexPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXhQYWdlLjZhZWFiMjhhLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlQ29tcG9uZW50LnZ1ZSIsIi4uLy4uLy4uLy4uL3NyYy9wYWdlcy9JbmRleFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8cD57eyB0aXRsZSB9fTwvcD5cbiAgICA8dWw+XG4gICAgICA8bGkgdi1mb3I9XCJ0b2RvIGluIHRvZG9zXCIgOmtleT1cInRvZG8uaWRcIiBAY2xpY2s9XCJpbmNyZW1lbnRcIj5cbiAgICAgICAge3sgdG9kby5pZCB9fSAtIHt7IHRvZG8uY29udGVudCB9fVxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICAgIDxwPkNvdW50OiB7eyB0b2RvQ291bnQgfX0gLyB7eyBtZXRhLnRvdGFsQ291bnQgfX08L3A+XG4gICAgPHA+QWN0aXZlOiB7eyBhY3RpdmUgPyAneWVzJyA6ICdubycgfX08L3A+XG4gICAgPHA+Q2xpY2tzIG9uIHRvZG9zOiB7eyBjbGlja0NvdW50IH19PC9wPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBjb21wdXRlZCwgcmVmIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IFRvZG8sIE1ldGEgfSBmcm9tICcuL21vZGVscyc7XG5cbmludGVyZmFjZSBQcm9wcyB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHRvZG9zPzogVG9kb1tdO1xuICBtZXRhOiBNZXRhO1xuICBhY3RpdmU6IGJvb2xlYW47XG59XG5jb25zdCBwcm9wcyA9IHdpdGhEZWZhdWx0cyhkZWZpbmVQcm9wczxQcm9wcz4oKSwge1xuICB0b2RvczogKCkgPT4gW10sXG59KTtcblxuY29uc3QgY2xpY2tDb3VudCA9IHJlZigwKTtcbmZ1bmN0aW9uIGluY3JlbWVudCgpIHtcbiAgY2xpY2tDb3VudC52YWx1ZSArPSAxO1xuICByZXR1cm4gY2xpY2tDb3VudC52YWx1ZTtcbn1cblxuY29uc3QgdG9kb0NvdW50ID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMudG9kb3MubGVuZ3RoKTtcblxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktZXZlbmx5XCI+XG4gICAgPGV4YW1wbGUtY29tcG9uZW50XG4gICAgICB0aXRsZT1cIkV4YW1wbGUgY29tcG9uZW50XCJcbiAgICAgIGFjdGl2ZVxuICAgICAgOnRvZG9zPVwidG9kb3NcIlxuICAgICAgOm1ldGE9XCJtZXRhXCJcbiAgICA+PC9leGFtcGxlLWNvbXBvbmVudD5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgVG9kbywgTWV0YSB9IGZyb20gJ2NvbXBvbmVudHMvbW9kZWxzJztcbmltcG9ydCBFeGFtcGxlQ29tcG9uZW50IGZyb20gJ2NvbXBvbmVudHMvRXhhbXBsZUNvbXBvbmVudC52dWUnO1xuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJztcblxuY29uc3QgdG9kb3MgPSByZWY8VG9kb1tdPihbXG4gIHtcbiAgICBpZDogMSxcbiAgICBjb250ZW50OiAnY3QxJ1xuICB9LFxuICB7XG4gICAgaWQ6IDIsXG4gICAgY29udGVudDogJ2N0MidcbiAgfSxcbiAge1xuICAgIGlkOiAzLFxuICAgIGNvbnRlbnQ6ICdjdDMnXG4gIH0sXG4gIHtcbiAgICBpZDogNCxcbiAgICBjb250ZW50OiAnY3Q0J1xuICB9LFxuICB7XG4gICAgaWQ6IDUsXG4gICAgY29udGVudDogJ2N0NSdcbiAgfVxuXSk7XG5jb25zdCBtZXRhID0gcmVmPE1ldGE+KHtcbiAgdG90YWxDb3VudDogMTIwMFxufSk7XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQTRCTSxVQUFBLGFBQWEsSUFBSSxDQUFDO0FBQ3hCLGFBQVMsWUFBWTtBQUNuQixpQkFBVyxTQUFTO0FBQ3BCLGFBQU8sV0FBVztBQUFBLElBQ3BCO0FBRUEsVUFBTSxZQUFZLFNBQVMsTUFBTSxNQUFNLE1BQU0sTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQm5ELFVBQU0sUUFBUSxJQUFZO0FBQUEsTUFDeEI7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUFBLENBQ0Q7QUFDRCxVQUFNLE9BQU8sSUFBVTtBQUFBLE1BQ3JCLFlBQVk7QUFBQSxJQUFBLENBQ2I7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
