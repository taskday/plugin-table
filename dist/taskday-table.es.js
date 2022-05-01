var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const _defineComponent = window["Vue"].defineComponent;
const _createElementVNode = window["Vue"].createElementVNode;
const _renderList = window["Vue"].renderList;
const _Fragment = window["Vue"].Fragment;
const _openBlock = window["Vue"].openBlock;
const _createElementBlock = window["Vue"].createElementBlock;
const _toDisplayString = window["Vue"].toDisplayString;
const _unref = window["Vue"].unref;
const _createVNode = window["Vue"].createVNode;
const _withModifiers = window["Vue"].withModifiers;
const _createTextVNode = window["Vue"].createTextVNode;
const _resolveComponent = window["Vue"].resolveComponent;
const _withCtx = window["Vue"].withCtx;
const _createBlock = window["Vue"].createBlock;
const _hoisted_1 = { class: "hidden md:block w-full" };
const _hoisted_2 = { class: "w-full" };
const _hoisted_3 = /* @__PURE__ */ _createElementVNode("th", { class: "px-2 py-1 text-left" }, "Title", -1);
const _hoisted_4 = { class: "px-2 py-1 text-left" };
const _hoisted_5 = { class: "divide-y" };
const _hoisted_6 = {
  colspan: "99",
  class: "py-2"
};
const _hoisted_7 = ["onSubmit"];
const _hoisted_8 = { class: "px-2 py-2" };
const _hoisted_9 = /* @__PURE__ */ _createElementVNode("span", null, null, -1);
const _hoisted_10 = { class: "px-2 py-2" };
const _hoisted_11 = { class: "flex justify-start items-center space-x-2 w-full" };
const _hoisted_12 = { class: "flex flex-col gap-2 md:hidden" };
const _hoisted_13 = { class: "flex items-center gap-3 mt-2" };
const VFormInput = window["Components"].VFormInput;
const VFieldWrapper = window["Components"].VFieldWrapper;
const VCard = window["Components"].VCard;
const VContainer = window["Components"].VContainer;
const useCardForm = window["Components"].useCardForm;
const _sfc_main = /* @__PURE__ */ _defineComponent({
  props: {
    project: {
      type: Object,
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
      const _component_Link = _resolveComponent("Link");
      return _openBlock(), _createBlock(_unref(VContainer), null, {
        default: _withCtx(() => [
          _createElementVNode("div", _hoisted_1, [
            _createVNode(_unref(VCard), null, {
              default: _withCtx(() => [
                _createElementVNode("table", _hoisted_2, [
                  _createElementVNode("thead", null, [
                    _createElementVNode("tr", null, [
                      _hoisted_3,
                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.project.fields, (field) => {
                        return _openBlock(), _createElementBlock("th", _hoisted_4, _toDisplayString(field.title), 1);
                      }), 256))
                    ])
                  ]),
                  _createElementVNode("tbody", _hoisted_5, [
                    _createElementVNode("tr", null, [
                      _createElementVNode("td", _hoisted_6, [
                        _createElementVNode("form", {
                          onSubmit: _withModifiers(submit, ["prevent"])
                        }, [
                          _createVNode(_unref(VFormInput), {
                            placeholder: "Create a card...",
                            modelValue: _unref(form).title,
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _unref(form).title = $event)
                          }, null, 8, ["modelValue"])
                        ], 40, _hoisted_7)
                      ])
                    ]),
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.project.cards, (card) => {
                      return _openBlock(), _createElementBlock("tr", {
                        key: __props.project.id + "-" + card.id
                      }, [
                        _createElementVNode("td", _hoisted_8, [
                          _createVNode(_component_Link, {
                            class: "text-base hover:underline",
                            href: _ctx.route("cards.show", card)
                          }, {
                            default: _withCtx(() => [
                              _createTextVNode(_toDisplayString(card.title), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"]),
                          _hoisted_9
                        ]),
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.project.fields, (field) => {
                          return _openBlock(), _createElementBlock("td", _hoisted_10, [
                            _createElementVNode("div", _hoisted_11, [
                              (_openBlock(), _createBlock(_unref(VFieldWrapper), {
                                key: field.id,
                                card,
                                field
                              }, null, 8, ["card", "field"]))
                            ])
                          ]);
                        }), 256))
                      ]);
                    }), 128))
                  ])
                ])
              ]),
              _: 1
            })
          ]),
          _createElementVNode("div", _hoisted_12, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.project.cards, (card) => {
              return _openBlock(), _createBlock(_unref(VCard), null, {
                default: _withCtx(() => [
                  _createVNode(_component_Link, {
                    class: "text-base hover:underline",
                    href: _ctx.route("cards.show", card)
                  }, {
                    default: _withCtx(() => [
                      _createTextVNode(_toDisplayString(card.title), 1)
                    ]),
                    _: 2
                  }, 1032, ["href"]),
                  _createElementVNode("div", _hoisted_13, [
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(card.project.fields, (field) => {
                      return _openBlock(), _createElementBlock("div", {
                        key: card.id + "" + field.handle
                      }, [
                        _createVNode(_unref(VFieldWrapper), {
                          field: __spreadValues(__spreadValues({}, field), card.customFields[field.handle]),
                          card
                        }, null, 8, ["field", "card"])
                      ]);
                    }), 128))
                  ])
                ]),
                _: 2
              }, 1024);
            }), 256))
          ])
        ]),
        _: 1
      });
    };
  }
});
document.addEventListener("taskday:init", () => {
  Taskday.register("table", {
    views: [
      { id: "performing-table", name: "Table", component: _sfc_main }
    ]
  });
});
