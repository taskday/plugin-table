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
const _createTextVNode = window["Vue"].createTextVNode;
const _resolveComponent = window["Vue"].resolveComponent;
const _withCtx = window["Vue"].withCtx;
const _createVNode = window["Vue"].createVNode;
const _createBlock = window["Vue"].createBlock;
const _withModifiers = window["Vue"].withModifiers;
const _hoisted_1 = { class: "hidden md:block w-full px-6" };
const _hoisted_2 = { class: "w-full" };
const _hoisted_3 = { class: "" };
const _hoisted_4 = /* @__PURE__ */ _createElementVNode("th", { class: "px-4 py-2 text-left" }, "Title", -1);
const _hoisted_5 = ["onClick"];
const _hoisted_6 = { class: "flex items-center justify-between cursor-pointer" };
const _hoisted_7 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 ml-2",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
};
const _hoisted_8 = /* @__PURE__ */ _createElementVNode("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
}, null, -1);
const _hoisted_9 = [
  _hoisted_8
];
const _hoisted_10 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 ml-2",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
};
const _hoisted_11 = /* @__PURE__ */ _createElementVNode("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
}, null, -1);
const _hoisted_12 = [
  _hoisted_11
];
const _hoisted_13 = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 ml-2",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
};
const _hoisted_14 = /* @__PURE__ */ _createElementVNode("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8 9l4-4 4 4m0 6l-4 4-4-4"
}, null, -1);
const _hoisted_15 = [
  _hoisted_14
];
const _hoisted_16 = { class: "" };
const _hoisted_17 = { class: "px-4 py-2" };
const _hoisted_18 = /* @__PURE__ */ _createElementVNode("span", null, null, -1);
const _hoisted_19 = { class: "px-4 py-2" };
const _hoisted_20 = { class: "flex justify-start items-center space-x-2 w-full" };
const _hoisted_21 = { class: "flex justify-end items-center space-x-2" };
const _hoisted_22 = /* @__PURE__ */ _createElementVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ _createElementVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
  })
], -1);
const _hoisted_23 = /* @__PURE__ */ _createElementVNode("p", null, "Delete", -1);
const _hoisted_24 = { class: "border-t border-b" };
const _hoisted_25 = {
  class: "",
  colspan: "99"
};
const _hoisted_26 = ["onSubmit"];
const _hoisted_27 = { class: "flex flex-col gap-4 md:hidden px-6" };
const _hoisted_28 = ["onSubmit"];
const _hoisted_29 = { class: "flex items-center gap-3 mt-2" };
const VFormInput = window["Components"].VFormInput;
const VFieldWrapper = window["Components"].VFieldWrapper;
const VCard = window["Components"].VCard;
const useCardForm = window["Components"].useCardForm;
const useSorter = window["Components"].useSorter;
const VDropdown = window["Components"].VDropdown;
const VDropdownButton = window["Components"].VDropdownButton;
const VDropdownItems = window["Components"].VDropdownItems;
const VDropdownItem = window["Components"].VDropdownItem;
const _sfc_main = /* @__PURE__ */ _defineComponent({
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const { form, store, destroy } = useCardForm();
    const { sortBy, isDesc, isCurrent } = useSorter();
    function submit() {
      if (!form.processing) {
        store(props.project);
      }
    }
    function remove(card) {
      confirm(`Are you sure to delete "${card.title}"?`) && destroy(card);
    }
    return (_ctx, _cache) => {
      const _component_Link = _resolveComponent("Link");
      return _openBlock(), _createElementBlock(_Fragment, null, [
        _createElementVNode("div", _hoisted_1, [
          _createVNode(_unref(VCard), { style: { "padding": "0" } }, {
            default: _withCtx(() => [
              _createElementVNode("table", _hoisted_2, [
                _createElementVNode("thead", null, [
                  _createElementVNode("tr", _hoisted_3, [
                    _hoisted_4,
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.project.fields, (field) => {
                      return _openBlock(), _createElementBlock("th", {
                        class: "px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 border-l",
                        onClick: ($event) => _unref(sortBy)(field)
                      }, [
                        _createElementVNode("div", _hoisted_6, [
                          _createElementVNode("span", null, _toDisplayString(field.title), 1),
                          _unref(isCurrent)(field) && !_unref(isDesc)(field) ? (_openBlock(), _createElementBlock("svg", _hoisted_7, _hoisted_9)) : _unref(isCurrent)(field) && _unref(isDesc)(field) ? (_openBlock(), _createElementBlock("svg", _hoisted_10, _hoisted_12)) : (_openBlock(), _createElementBlock("svg", _hoisted_13, _hoisted_15))
                        ])
                      ], 8, _hoisted_5);
                    }), 256))
                  ])
                ]),
                _createElementVNode("tbody", _hoisted_16, [
                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.project.cards, (card) => {
                    return _openBlock(), _createElementBlock("tr", {
                      key: __props.project.id + "-" + card.id,
                      class: "border-t last:border-b"
                    }, [
                      _createElementVNode("td", _hoisted_17, [
                        _createVNode(_component_Link, {
                          class: "text-base hover:underline",
                          href: _ctx.route("cards.show", card)
                        }, {
                          default: _withCtx(() => [
                            _createTextVNode(_toDisplayString(card.title), 1)
                          ]),
                          _: 2
                        }, 1032, ["href"]),
                        _hoisted_18
                      ]),
                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.project.fields, (field) => {
                        return _openBlock(), _createElementBlock("td", _hoisted_19, [
                          _createElementVNode("div", _hoisted_20, [
                            (_openBlock(), _createBlock(_unref(VFieldWrapper), {
                              key: field.id,
                              card,
                              field
                            }, null, 8, ["card", "field"]))
                          ])
                        ]);
                      }), 256)),
                      _createElementVNode("td", null, [
                        _createElementVNode("div", _hoisted_21, [
                          _createVNode(_unref(VDropdown), null, {
                            default: _withCtx(() => [
                              _createVNode(_unref(VDropdownButton), null, {
                                default: _withCtx(() => [
                                  _hoisted_22
                                ]),
                                _: 1
                              }),
                              _createVNode(_unref(VDropdownItems), null, {
                                default: _withCtx(() => [
                                  _createVNode(_unref(VDropdownItem), {
                                    onClick: ($event) => remove(card),
                                    class: "hover:text-red-600"
                                  }, {
                                    default: _withCtx(() => [
                                      _hoisted_23
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ])
                      ])
                    ]);
                  }), 128)),
                  _createElementVNode("tr", _hoisted_24, [
                    _createElementVNode("td", _hoisted_25, [
                      _createElementVNode("form", {
                        onSubmit: _withModifiers(submit, ["prevent"])
                      }, [
                        _createVNode(_unref(VFormInput), {
                          placeholder: "Create a card...",
                          modelValue: _unref(form).title,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _unref(form).title = $event),
                          class: "w-full border-none focus:ring-0 shadow-none"
                        }, null, 8, ["modelValue"])
                      ], 40, _hoisted_26)
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _createElementVNode("div", _hoisted_27, [
          _createElementVNode("form", {
            onSubmit: _withModifiers(submit, ["prevent"])
          }, [
            _createVNode(_unref(VFormInput), {
              placeholder: "Create a card...",
              modelValue: _unref(form).title,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _unref(form).title = $event)
            }, null, 8, ["modelValue"])
          ], 40, _hoisted_28),
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
                _createElementVNode("div", _hoisted_29, [
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
      ], 64);
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
