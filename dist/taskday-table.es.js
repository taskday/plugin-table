const _defineComponent = window["Vue"].defineComponent;
const _createElementVNode = window["Vue"].createElementVNode;
const _unref = window["Vue"].unref;
const _createVNode = window["Vue"].createVNode;
const _withModifiers = window["Vue"].withModifiers;
const _renderList = window["Vue"].renderList;
const _Fragment = window["Vue"].Fragment;
const _openBlock = window["Vue"].openBlock;
const _createElementBlock = window["Vue"].createElementBlock;
const _toDisplayString = window["Vue"].toDisplayString;
const _createTextVNode = window["Vue"].createTextVNode;
const _withCtx = window["Vue"].withCtx;
const _createBlock = window["Vue"].createBlock;
const _hoisted_1 = { class: "w-full" };
const _hoisted_2 = /* @__PURE__ */ _createElementVNode("thead", null, [
  /* @__PURE__ */ _createElementVNode("tr", null, [
    /* @__PURE__ */ _createElementVNode("th", { class: "px-2 py-1 text-left" }, "Title"),
    /* @__PURE__ */ _createElementVNode("th", { class: "px-2 py-1 text-left" })
  ])
], -1);
const _hoisted_3 = { class: "divide-y" };
const _hoisted_4 = { colspan: "99" };
const _hoisted_5 = ["onSubmit"];
const _hoisted_6 = { class: "px-2 py-2" };
const _hoisted_7 = /* @__PURE__ */ _createElementVNode("span", null, null, -1);
const _hoisted_8 = { class: "px-2 py-2" };
const VFormInput = window["Components"].VFormInput;
const VFieldWrapper = window["Components"].VFieldWrapper;
const VCard = window["Components"].VCard;
const VContainer = window["Components"].VContainer;
const VLink = window["Components"].VLink;
const useCardForm = window["Components"].useCardForm;
const _sfc_main = /* @__PURE__ */ _defineComponent({
  props: {
    project: {
      tyoe: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const { form, store } = useCardForm();
    function submit() {
      store(props.project);
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(_unref(VContainer), null, {
        default: _withCtx(() => [
          _createVNode(_unref(VCard), null, {
            default: _withCtx(() => [
              _createElementVNode("table", _hoisted_1, [
                _hoisted_2,
                _createElementVNode("tbody", _hoisted_3, [
                  _createElementVNode("tr", null, [
                    _createElementVNode("td", _hoisted_4, [
                      _createElementVNode("form", {
                        onSubmit: _withModifiers(submit, ["prevent"])
                      }, [
                        _createVNode(_unref(VFormInput), {
                          placeholder: "Create a card...",
                          modelValue: _unref(form).title,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _unref(form).title = $event)
                        }, null, 8, ["modelValue"])
                      ], 40, _hoisted_5)
                    ])
                  ]),
                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.project.cards, (card) => {
                    return _openBlock(), _createElementBlock("tr", {
                      key: __props.project.id + "-" + card.id
                    }, [
                      _createElementVNode("td", _hoisted_6, [
                        _createVNode(_unref(VLink), {
                          href: _ctx.route("cards.show", card)
                        }, {
                          default: _withCtx(() => [
                            _createTextVNode(_toDisplayString(card.title), 1)
                          ]),
                          _: 2
                        }, 1032, ["href"]),
                        _hoisted_7
                      ]),
                      _createElementVNode("td", _hoisted_8, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.project.fields, (field) => {
                          return _openBlock(), _createElementBlock("div", {
                            class: "flex justify-end items-center space-x-2 w-full",
                            key: field.id
                          }, [
                            _createVNode(_unref(VFieldWrapper), {
                              card,
                              field
                            }, null, 8, ["card", "field"])
                          ]);
                        }), 128))
                      ])
                    ]);
                  }), 128))
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
document.addEventListener("taskday:init", () => {
  Taskday.register("table", {
    views: [{ id: "performing-table", name: "Table", component: _sfc_main }]
  });
});
