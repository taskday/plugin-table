/**
 * vue-table
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
const $e = window.Vue.h, Fe = window.Vue.ref, Ve = window.Vue.watchEffect;
/**
 * table-core
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function b(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function _(e, n) {
  return (t) => {
    n.setState((o) => ({
      ...o,
      [e]: b(t, o[e])
    }));
  };
}
function B(e) {
  return e instanceof Function;
}
function Me(e, n) {
  const t = [], o = (r) => {
    r.forEach((l) => {
      t.push(l);
      const i = n(l);
      i != null && i.length && o(i);
    });
  };
  return o(e), t;
}
function m(e, n, t) {
  let o = [], r;
  return () => {
    let l;
    t.key && t.debug && (l = Date.now());
    const i = e();
    if (!(i.length !== o.length || i.some((p, u) => o[u] !== p)))
      return r;
    o = i;
    let g;
    if (t.key && t.debug && (g = Date.now()), r = n(...i), t == null || t.onChange == null || t.onChange(r), t.key && t.debug && t != null && t.debug()) {
      const p = Math.round((Date.now() - l) * 100) / 100, u = Math.round((Date.now() - g) * 100) / 100, d = u / 16, c = (a, f) => {
        for (a = String(a); a.length < f; )
          a = " " + a;
        return a;
      };
      console.info("%c\u23F1 " + c(u, 5) + " /" + c(p, 5) + " ms", `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(` + Math.max(0, Math.min(120 - 120 * d, 120)) + "deg 100% 31%);", t == null ? void 0 : t.key);
    }
    return r;
  };
}
function be(e, n, t, o) {
  var r, l;
  const s = {
    ...e._getDefaultColumnDef(),
    ...n
  }, g = s.accessorKey;
  let p = (r = (l = s.id) != null ? l : g ? g.replace(".", "_") : void 0) != null ? r : typeof s.header == "string" ? s.header : void 0, u;
  if (s.accessorFn ? u = s.accessorFn : g && (g.includes(".") ? u = (c) => {
    let a = c;
    for (const f of g.split("."))
      a = a[f];
    return a;
  } : u = (c) => c[s.accessorKey]), !p)
    throw new Error();
  let d = {
    id: "" + String(p),
    accessorFn: u,
    parent: o,
    depth: t,
    columnDef: s,
    columns: [],
    getFlatColumns: m(() => [!0], () => {
      var c;
      return [d, ...(c = d.columns) == null ? void 0 : c.flatMap((a) => a.getFlatColumns())];
    }, {
      key: "column.getFlatColumns",
      debug: () => {
        var c;
        return (c = e.options.debugAll) != null ? c : e.options.debugColumns;
      }
    }),
    getLeafColumns: m(() => [e._getOrderColumnsFn()], (c) => {
      var a;
      if ((a = d.columns) != null && a.length) {
        let f = d.columns.flatMap((C) => C.getLeafColumns());
        return c(f);
      }
      return [d];
    }, {
      key: "column.getLeafColumns",
      debug: () => {
        var c;
        return (c = e.options.debugAll) != null ? c : e.options.debugColumns;
      }
    })
  };
  return d = e._features.reduce((c, a) => Object.assign(c, a.createColumn == null ? void 0 : a.createColumn(d, e)), d), d;
}
function ie(e, n, t) {
  var o;
  let l = {
    id: (o = t.id) != null ? o : n.id,
    column: n,
    index: t.index,
    isPlaceholder: !!t.isPlaceholder,
    placeholderId: t.placeholderId,
    depth: t.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const i = [], s = (g) => {
        g.subHeaders && g.subHeaders.length && g.subHeaders.map(s), i.push(g);
      };
      return s(l), i;
    },
    getContext: () => ({
      table: e,
      header: l,
      column: n
    })
  };
  return e._features.forEach((i) => {
    Object.assign(l, i.createHeader == null ? void 0 : i.createHeader(l, e));
  }), l;
}
const ye = {
  createTable: (e) => ({
    getHeaderGroups: m(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (n, t, o, r) => {
      var l, i;
      const s = (l = o == null ? void 0 : o.map((d) => t.find((c) => c.id === d)).filter(Boolean)) != null ? l : [], g = (i = r == null ? void 0 : r.map((d) => t.find((c) => c.id === d)).filter(Boolean)) != null ? i : [], p = t.filter((d) => !(o != null && o.includes(d.id)) && !(r != null && r.includes(d.id)));
      return G(n, [...s, ...p, ...g], e);
    }, {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugHeaders;
      }
    }),
    getCenterHeaderGroups: m(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (n, t, o, r) => (t = t.filter((l) => !(o != null && o.includes(l.id)) && !(r != null && r.includes(l.id))), G(n, t, e, "center")), {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugHeaders;
      }
    }),
    getLeftHeaderGroups: m(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (n, t, o) => {
      var r;
      const l = (r = o == null ? void 0 : o.map((i) => t.find((s) => s.id === i)).filter(Boolean)) != null ? r : [];
      return G(n, l, e, "left");
    }, {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugHeaders;
      }
    }),
    getRightHeaderGroups: m(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (n, t, o) => {
      var r;
      const l = (r = o == null ? void 0 : o.map((i) => t.find((s) => s.id === i)).filter(Boolean)) != null ? r : [];
      return G(n, l, e, "right");
    }, {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugHeaders;
      }
    }),
    getFooterGroups: m(() => [e.getHeaderGroups()], (n) => [...n].reverse(), {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugHeaders;
      }
    }),
    getLeftFooterGroups: m(() => [e.getLeftHeaderGroups()], (n) => [...n].reverse(), {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugHeaders;
      }
    }),
    getCenterFooterGroups: m(() => [e.getCenterHeaderGroups()], (n) => [...n].reverse(), {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugHeaders;
      }
    }),
    getRightFooterGroups: m(() => [e.getRightHeaderGroups()], (n) => [...n].reverse(), {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugHeaders;
      }
    }),
    getFlatHeaders: m(() => [e.getHeaderGroups()], (n) => n.map((t) => t.headers).flat(), {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugHeaders;
      }
    }),
    getLeftFlatHeaders: m(() => [e.getLeftHeaderGroups()], (n) => n.map((t) => t.headers).flat(), {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugHeaders;
      }
    }),
    getCenterFlatHeaders: m(() => [e.getCenterHeaderGroups()], (n) => n.map((t) => t.headers).flat(), {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugHeaders;
      }
    }),
    getRightFlatHeaders: m(() => [e.getRightHeaderGroups()], (n) => n.map((t) => t.headers).flat(), {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugHeaders;
      }
    }),
    getCenterLeafHeaders: m(() => [e.getCenterFlatHeaders()], (n) => n.filter((t) => {
      var o;
      return !((o = t.subHeaders) != null && o.length);
    }), {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugHeaders;
      }
    }),
    getLeftLeafHeaders: m(() => [e.getLeftFlatHeaders()], (n) => n.filter((t) => {
      var o;
      return !((o = t.subHeaders) != null && o.length);
    }), {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugHeaders;
      }
    }),
    getRightLeafHeaders: m(() => [e.getRightFlatHeaders()], (n) => n.filter((t) => {
      var o;
      return !((o = t.subHeaders) != null && o.length);
    }), {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugHeaders;
      }
    }),
    getLeafHeaders: m(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (n, t, o) => {
      var r, l, i, s, g, p;
      return [...(r = (l = n[0]) == null ? void 0 : l.headers) != null ? r : [], ...(i = (s = t[0]) == null ? void 0 : s.headers) != null ? i : [], ...(g = (p = o[0]) == null ? void 0 : p.headers) != null ? g : []].map((u) => u.getLeafHeaders()).flat();
    }, {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugHeaders;
      }
    })
  })
};
function G(e, n, t, o) {
  var r, l;
  let i = 0;
  const s = function(c, a) {
    a === void 0 && (a = 1), i = Math.max(i, a), c.filter((f) => f.getIsVisible()).forEach((f) => {
      var C;
      (C = f.columns) != null && C.length && s(f.columns, a + 1);
    }, 0);
  };
  s(e);
  let g = [];
  const p = (c, a) => {
    const f = {
      depth: a,
      id: [o, "" + a].filter(Boolean).join("_"),
      headers: []
    }, C = [];
    c.forEach((S) => {
      const h = [...C].reverse()[0], I = S.column.depth === f.depth;
      let R, M = !1;
      if (I && S.column.parent ? R = S.column.parent : (R = S.column, M = !0), h && (h == null ? void 0 : h.column) === R)
        h.subHeaders.push(S);
      else {
        const P = ie(t, R, {
          id: [o, a, R.id, S == null ? void 0 : S.id].filter(Boolean).join("_"),
          isPlaceholder: M,
          placeholderId: M ? "" + C.filter((T) => T.column === R).length : void 0,
          depth: a,
          index: C.length
        });
        P.subHeaders.push(S), C.push(P);
      }
      f.headers.push(S), S.headerGroup = f;
    }), g.push(f), a > 0 && p(C, a - 1);
  }, u = n.map((c, a) => ie(t, c, {
    depth: i,
    index: a
  }));
  p(u, i - 1), g.reverse();
  const d = (c) => c.filter((f) => f.column.getIsVisible()).map((f) => {
    let C = 0, S = 0, h = [0];
    f.subHeaders && f.subHeaders.length ? (h = [], d(f.subHeaders).forEach((R) => {
      let {
        colSpan: M,
        rowSpan: P
      } = R;
      C += M, h.push(P);
    })) : C = 1;
    const I = Math.min(...h);
    return S = S + I, f.colSpan = C, f.rowSpan = S, {
      colSpan: C,
      rowSpan: S
    };
  });
  return d((r = (l = g[0]) == null ? void 0 : l.headers) != null ? r : []), g;
}
const D = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, j = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), xe = {
  getDefaultColumnDef: () => D,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: j(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    onColumnSizingChange: _("columnSizing", e),
    onColumnSizingInfoChange: _("columnSizingInfo", e)
  }),
  createColumn: (e, n) => ({
    getSize: () => {
      var t, o, r;
      const l = n.getState().columnSizing[e.id];
      return Math.min(Math.max((t = e.columnDef.minSize) != null ? t : D.minSize, (o = l != null ? l : e.columnDef.size) != null ? o : D.size), (r = e.columnDef.maxSize) != null ? r : D.maxSize);
    },
    getStart: (t) => {
      const o = t ? t === "left" ? n.getLeftVisibleLeafColumns() : n.getRightVisibleLeafColumns() : n.getVisibleLeafColumns(), r = o.findIndex((l) => l.id === e.id);
      if (r > 0) {
        const l = o[r - 1];
        return l.getStart(t) + l.getSize();
      }
      return 0;
    },
    resetSize: () => {
      n.setColumnSizing((t) => {
        let {
          [e.id]: o,
          ...r
        } = t;
        return r;
      });
    },
    getCanResize: () => {
      var t, o;
      return ((t = e.columnDef.enableResizing) != null ? t : !0) && ((o = n.options.enableColumnResizing) != null ? o : !0);
    },
    getIsResizing: () => n.getState().columnSizingInfo.isResizingColumn === e.id
  }),
  createHeader: (e, n) => ({
    getSize: () => {
      let t = 0;
      const o = (r) => {
        if (r.subHeaders.length)
          r.subHeaders.forEach(o);
        else {
          var l;
          t += (l = r.column.getSize()) != null ? l : 0;
        }
      };
      return o(e), t;
    },
    getStart: () => {
      if (e.index > 0) {
        const t = e.headerGroup.headers[e.index - 1];
        return t.getStart() + t.getSize();
      }
      return 0;
    },
    getResizeHandler: () => {
      const t = n.getColumn(e.column.id), o = t.getCanResize();
      return (r) => {
        if (!o || (r.persist == null || r.persist(), N(r) && r.touches && r.touches.length > 1))
          return;
        const l = e.getSize(), i = e ? e.getLeafHeaders().map((a) => [a.column.id, a.column.getSize()]) : [[t.id, t.getSize()]], s = N(r) ? Math.round(r.touches[0].clientX) : r.clientX, g = (a, f) => {
          if (typeof f != "number")
            return;
          let C = {};
          n.setColumnSizingInfo((S) => {
            var h, I;
            const R = f - ((h = S == null ? void 0 : S.startOffset) != null ? h : 0), M = Math.max(R / ((I = S == null ? void 0 : S.startSize) != null ? I : 0), -0.999999);
            return S.columnSizingStart.forEach((P) => {
              let [T, le] = P;
              C[T] = Math.round(Math.max(le + le * M, 0) * 100) / 100;
            }), {
              ...S,
              deltaOffset: R,
              deltaPercentage: M
            };
          }), (n.options.columnResizeMode === "onChange" || a === "end") && n.setColumnSizing((S) => ({
            ...S,
            ...C
          }));
        }, p = (a) => g("move", a), u = (a) => {
          g("end", a), n.setColumnSizingInfo((f) => ({
            ...f,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, d = {
          moveHandler: (a) => p(a.clientX),
          upHandler: (a) => {
            document.removeEventListener("mousemove", d.moveHandler), document.removeEventListener("mouseup", d.upHandler), u(a.clientX);
          }
        }, c = Ae() ? {
          passive: !1
        } : !1;
        N(r) || (document.addEventListener("mousemove", d.moveHandler, c), document.addEventListener("mouseup", d.upHandler, c)), n.setColumnSizingInfo((a) => ({
          ...a,
          startOffset: s,
          startSize: l,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart: i,
          isResizingColumn: t.id
        }));
      };
    }
  }),
  createTable: (e) => ({
    setColumnSizing: (n) => e.options.onColumnSizingChange == null ? void 0 : e.options.onColumnSizingChange(n),
    setColumnSizingInfo: (n) => e.options.onColumnSizingInfoChange == null ? void 0 : e.options.onColumnSizingInfoChange(n),
    resetColumnSizing: (n) => {
      var t;
      e.setColumnSizing(n ? {} : (t = e.initialState.columnSizing) != null ? t : {});
    },
    resetHeaderSizeInfo: (n) => {
      var t;
      e.setColumnSizingInfo(n ? j() : (t = e.initialState.columnSizingInfo) != null ? t : j());
    },
    getTotalSize: () => {
      var n, t;
      return (n = (t = e.getHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((o, r) => o + r.getSize(), 0)) != null ? n : 0;
    },
    getLeftTotalSize: () => {
      var n, t;
      return (n = (t = e.getLeftHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((o, r) => o + r.getSize(), 0)) != null ? n : 0;
    },
    getCenterTotalSize: () => {
      var n, t;
      return (n = (t = e.getCenterHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((o, r) => o + r.getSize(), 0)) != null ? n : 0;
    },
    getRightTotalSize: () => {
      var n, t;
      return (n = (t = e.getRightHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((o, r) => o + r.getSize(), 0)) != null ? n : 0;
    }
  })
};
let L = null;
function Ae() {
  if (typeof L == "boolean")
    return L;
  let e = !1;
  try {
    const n = {
      get passive() {
        return e = !0, !1;
      }
    }, t = () => {
    };
    window.addEventListener("test", t, n), window.removeEventListener("test", t);
  } catch {
    e = !1;
  }
  return L = e, L;
}
function N(e) {
  return e.type === "touchstart";
}
const Ie = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: _("expanded", e),
    paginateExpandedRows: !0
  }),
  createTable: (e) => {
    let n = !1, t = !1;
    return {
      _autoResetExpanded: () => {
        var o, r;
        if (!n) {
          e._queue(() => {
            n = !0;
          });
          return;
        }
        if ((o = (r = e.options.autoResetAll) != null ? r : e.options.autoResetExpanded) != null ? o : !e.options.manualExpanding) {
          if (t)
            return;
          t = !0, e._queue(() => {
            e.resetExpanded(), t = !1;
          });
        }
      },
      setExpanded: (o) => e.options.onExpandedChange == null ? void 0 : e.options.onExpandedChange(o),
      toggleAllRowsExpanded: (o) => {
        (o != null ? o : !e.getIsAllRowsExpanded()) ? e.setExpanded(!0) : e.setExpanded({});
      },
      resetExpanded: (o) => {
        var r, l;
        e.setExpanded(o ? {} : (r = (l = e.initialState) == null ? void 0 : l.expanded) != null ? r : {});
      },
      getCanSomeRowsExpand: () => e.getRowModel().flatRows.some((o) => o.getCanExpand()),
      getToggleAllRowsExpandedHandler: () => (o) => {
        o.persist == null || o.persist(), e.toggleAllRowsExpanded();
      },
      getIsSomeRowsExpanded: () => {
        const o = e.getState().expanded;
        return o === !0 || Object.values(o).some(Boolean);
      },
      getIsAllRowsExpanded: () => {
        const o = e.getState().expanded;
        return typeof o == "boolean" ? o === !0 : !(!Object.keys(o).length || e.getRowModel().flatRows.some((r) => r.getIsExpanded()));
      },
      getExpandedDepth: () => {
        let o = 0;
        return (e.getState().expanded === !0 ? Object.keys(e.getRowModel().rowsById) : Object.keys(e.getState().expanded)).forEach((l) => {
          const i = l.split(".");
          o = Math.max(o, i.length);
        }), o;
      },
      getPreExpandedRowModel: () => e.getSortedRowModel(),
      getExpandedRowModel: () => (!e._getExpandedRowModel && e.options.getExpandedRowModel && (e._getExpandedRowModel = e.options.getExpandedRowModel(e)), e.options.manualExpanding || !e._getExpandedRowModel ? e.getPreExpandedRowModel() : e._getExpandedRowModel())
    };
  },
  createRow: (e, n) => ({
    toggleExpanded: (t) => {
      n.setExpanded((o) => {
        var r;
        const l = o === !0 ? !0 : !!(o != null && o[e.id]);
        let i = {};
        if (o === !0 ? Object.keys(n.getRowModel().rowsById).forEach((s) => {
          i[s] = !0;
        }) : i = o, t = (r = t) != null ? r : !l, !l && t)
          return {
            ...i,
            [e.id]: !0
          };
        if (l && !t) {
          const {
            [e.id]: s,
            ...g
          } = i;
          return g;
        }
        return o;
      });
    },
    getIsExpanded: () => {
      var t;
      const o = n.getState().expanded;
      return !!((t = n.options.getIsRowExpanded == null ? void 0 : n.options.getIsRowExpanded(e)) != null ? t : o === !0 || (o == null ? void 0 : o[e.id]));
    },
    getCanExpand: () => {
      var t, o, r;
      return (t = n.options.getRowCanExpand == null ? void 0 : n.options.getRowCanExpand(e)) != null ? t : ((o = n.options.enableExpanding) != null ? o : !0) && !!((r = e.subRows) != null && r.length);
    },
    getToggleExpandedHandler: () => {
      const t = e.getCanExpand();
      return () => {
        !t || e.toggleExpanded();
      };
    }
  })
}, fe = (e, n, t) => {
  var o;
  const r = t.toLowerCase();
  return (o = e.getValue(n)) == null ? void 0 : o.toLowerCase().includes(r);
};
fe.autoRemove = (e) => $(e);
const me = (e, n, t) => {
  var o;
  return (o = e.getValue(n)) == null ? void 0 : o.includes(t);
};
me.autoRemove = (e) => $(e);
const Se = (e, n, t) => {
  var o;
  return ((o = e.getValue(n)) == null ? void 0 : o.toLowerCase()) === t.toLowerCase();
};
Se.autoRemove = (e) => $(e);
const Ce = (e, n, t) => {
  var o;
  return (o = e.getValue(n)) == null ? void 0 : o.includes(t);
};
Ce.autoRemove = (e) => $(e) || !(e != null && e.length);
const we = (e, n, t) => !t.some((o) => {
  var r;
  return !((r = e.getValue(n)) != null && r.includes(o));
});
we.autoRemove = (e) => $(e) || !(e != null && e.length);
const ve = (e, n, t) => t.some((o) => {
  var r;
  return (r = e.getValue(n)) == null ? void 0 : r.includes(o);
});
ve.autoRemove = (e) => $(e) || !(e != null && e.length);
const _e = (e, n, t) => e.getValue(n) === t;
_e.autoRemove = (e) => $(e);
const he = (e, n, t) => e.getValue(n) == t;
he.autoRemove = (e) => $(e);
const ne = (e, n, t) => {
  let [o, r] = t;
  const l = e.getValue(n);
  return l >= o && l <= r;
};
ne.resolveFilterValue = (e) => {
  let [n, t] = e, o = typeof n != "number" ? parseFloat(n) : n, r = typeof t != "number" ? parseFloat(t) : t, l = n === null || Number.isNaN(o) ? -1 / 0 : o, i = t === null || Number.isNaN(r) ? 1 / 0 : r;
  if (l > i) {
    const s = l;
    l = i, i = s;
  }
  return [l, i];
};
ne.autoRemove = (e) => $(e) || $(e[0]) && $(e[1]);
const F = {
  includesString: fe,
  includesStringSensitive: me,
  equalsString: Se,
  arrIncludes: Ce,
  arrIncludesAll: we,
  arrIncludesSome: ve,
  equals: _e,
  weakEquals: he,
  inNumberRange: ne
};
function $(e) {
  return e == null || e === "";
}
const Pe = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: _("columnFilters", e),
    onGlobalFilterChange: _("globalFilter", e),
    filterFromLeafRows: !1,
    globalFilterFn: "auto",
    getColumnCanGlobalFilter: (n) => {
      var t, o;
      const r = (t = e.getCoreRowModel().flatRows[0]) == null || (o = t._getAllCellsByColumnId()[n.id]) == null ? void 0 : o.getValue();
      return typeof r == "string" || typeof r == "number";
    }
  }),
  createColumn: (e, n) => ({
    getAutoFilterFn: () => {
      const t = n.getCoreRowModel().flatRows[0], o = t == null ? void 0 : t.getValue(e.id);
      return typeof o == "string" ? F.includesString : typeof o == "number" ? F.inNumberRange : typeof o == "boolean" || o !== null && typeof o == "object" ? F.equals : Array.isArray(o) ? F.arrIncludes : F.weakEquals;
    },
    getFilterFn: () => B(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : F[e.columnDef.filterFn],
    getCanFilter: () => {
      var t, o, r;
      return ((t = e.columnDef.enableColumnFilter) != null ? t : !0) && ((o = n.options.enableColumnFilters) != null ? o : !0) && ((r = n.options.enableFilters) != null ? r : !0) && !!e.accessorFn;
    },
    getCanGlobalFilter: () => {
      var t, o, r, l;
      return ((t = e.columnDef.enableGlobalFilter) != null ? t : !0) && ((o = n.options.enableGlobalFilter) != null ? o : !0) && ((r = n.options.enableFilters) != null ? r : !0) && ((l = n.options.getColumnCanGlobalFilter == null ? void 0 : n.options.getColumnCanGlobalFilter(e)) != null ? l : !0) && !!e.accessorFn;
    },
    getIsFiltered: () => e.getFilterIndex() > -1,
    getFilterValue: () => {
      var t, o;
      return (t = n.getState().columnFilters) == null || (o = t.find((r) => r.id === e.id)) == null ? void 0 : o.value;
    },
    getFilterIndex: () => {
      var t, o;
      return (t = (o = n.getState().columnFilters) == null ? void 0 : o.findIndex((r) => r.id === e.id)) != null ? t : -1;
    },
    setFilterValue: (t) => {
      n.setColumnFilters((o) => {
        const r = e.getFilterFn(), l = o == null ? void 0 : o.find((u) => u.id === e.id), i = b(t, l ? l.value : void 0);
        if (ue(r, i, e)) {
          var s;
          return (s = o == null ? void 0 : o.filter((u) => u.id !== e.id)) != null ? s : [];
        }
        const g = {
          id: e.id,
          value: i
        };
        if (l) {
          var p;
          return (p = o == null ? void 0 : o.map((u) => u.id === e.id ? g : u)) != null ? p : [];
        }
        return o != null && o.length ? [...o, g] : [g];
      });
    },
    _getFacetedRowModel: n.options.getFacetedRowModel && n.options.getFacetedRowModel(n, e.id),
    getFacetedRowModel: () => e._getFacetedRowModel ? e._getFacetedRowModel() : n.getPreFilteredRowModel(),
    _getFacetedUniqueValues: n.options.getFacetedUniqueValues && n.options.getFacetedUniqueValues(n, e.id),
    getFacetedUniqueValues: () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(),
    _getFacetedMinMaxValues: n.options.getFacetedMinMaxValues && n.options.getFacetedMinMaxValues(n, e.id),
    getFacetedMinMaxValues: () => {
      if (!!e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    }
  }),
  createRow: (e, n) => ({
    columnFilters: {},
    columnFiltersMeta: {}
  }),
  createTable: (e) => ({
    getGlobalAutoFilterFn: () => F.includesString,
    getGlobalFilterFn: () => {
      const {
        globalFilterFn: n
      } = e.options;
      return B(n) ? n : n === "auto" ? e.getGlobalAutoFilterFn() : F[n];
    },
    setColumnFilters: (n) => {
      const t = e.getAllLeafColumns(), o = (r) => {
        var l;
        return (l = b(n, r)) == null ? void 0 : l.filter((i) => {
          const s = t.find((g) => g.id === i.id);
          if (s) {
            const g = s.getFilterFn();
            if (ue(g, i.value, s))
              return !1;
          }
          return !0;
        });
      };
      e.options.onColumnFiltersChange == null || e.options.onColumnFiltersChange(o);
    },
    setGlobalFilter: (n) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(n);
    },
    resetGlobalFilter: (n) => {
      e.setGlobalFilter(n ? void 0 : e.initialState.globalFilter);
    },
    resetColumnFilters: (n) => {
      var t, o;
      e.setColumnFilters(n ? [] : (t = (o = e.initialState) == null ? void 0 : o.columnFilters) != null ? t : []);
    },
    getPreFilteredRowModel: () => e.getCoreRowModel(),
    _getFilteredRowModel: e.options.getFilteredRowModel && e.options.getFilteredRowModel(e),
    getFilteredRowModel: () => e.options.manualFiltering || !e._getFilteredRowModel ? e.getPreFilteredRowModel() : e._getFilteredRowModel(),
    _getGlobalFacetedRowModel: e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"),
    getGlobalFacetedRowModel: () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(),
    _getGlobalFacetedUniqueValues: e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"),
    getGlobalFacetedUniqueValues: () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(),
    _getGlobalFacetedMinMaxValues: e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"),
    getGlobalFacetedMinMaxValues: () => {
      if (!!e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    }
  })
};
function ue(e, n, t) {
  return (e && e.autoRemove ? e.autoRemove(n, t) : !1) || typeof n > "u" || typeof n == "string" && !n;
}
const He = (e, n, t) => t.reduce((o, r) => {
  const l = r.getValue(e);
  return o + (typeof l == "number" ? l : 0);
}, 0), Ee = (e, n, t) => {
  let o;
  return t.forEach((r) => {
    const l = r.getValue(e);
    l != null && (o > l || o === void 0 && l >= l) && (o = l);
  }), o;
}, Ge = (e, n, t) => {
  let o;
  return t.forEach((r) => {
    const l = r.getValue(e);
    l != null && (o < l || o === void 0 && l >= l) && (o = l);
  }), o;
}, De = (e, n, t) => {
  let o, r;
  return t.forEach((l) => {
    const i = l.getValue(e);
    i != null && (o === void 0 ? i >= i && (o = r = i) : (o > i && (o = i), r < i && (r = i)));
  }), [o, r];
}, Le = (e, n) => {
  let t = 0, o = 0;
  if (n.forEach((r) => {
    let l = r.getValue(e);
    l != null && (l = +l) >= l && (++t, o += l);
  }), t)
    return o / t;
}, ze = (e, n) => {
  if (!n.length)
    return;
  let t = 0, o = 0;
  return n.forEach((r) => {
    let l = r.getValue(e);
    typeof l == "number" && (t = Math.min(t, l), o = Math.max(o, l));
  }), (t + o) / 2;
}, ke = (e, n) => Array.from(new Set(n.map((t) => t.getValue(e))).values()), Oe = (e, n) => new Set(n.map((t) => t.getValue(e))).size, Be = (e, n) => n.length, q = {
  sum: He,
  min: Ee,
  max: Ge,
  extent: De,
  mean: Le,
  median: ze,
  unique: ke,
  uniqueCount: Oe,
  count: Be
}, Te = {
  getDefaultColumnDef: () => ({
    aggregatedCell: (e) => {
      var n, t;
      return (n = (t = e.getValue()) == null || t.toString == null ? void 0 : t.toString()) != null ? n : null;
    },
    aggregationFn: "auto"
  }),
  getInitialState: (e) => ({
    grouping: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGroupingChange: _("grouping", e),
    groupedColumnMode: "reorder"
  }),
  createColumn: (e, n) => ({
    toggleGrouping: () => {
      n.setGrouping((t) => t != null && t.includes(e.id) ? t.filter((o) => o !== e.id) : [...t != null ? t : [], e.id]);
    },
    getCanGroup: () => {
      var t, o, r, l;
      return (t = (o = (r = (l = e.columnDef.enableGrouping) != null ? l : !0) != null ? r : n.options.enableGrouping) != null ? o : !0) != null ? t : !!e.accessorFn;
    },
    getIsGrouped: () => {
      var t;
      return (t = n.getState().grouping) == null ? void 0 : t.includes(e.id);
    },
    getGroupedIndex: () => {
      var t;
      return (t = n.getState().grouping) == null ? void 0 : t.indexOf(e.id);
    },
    getToggleGroupingHandler: () => {
      const t = e.getCanGroup();
      return () => {
        !t || e.toggleGrouping();
      };
    },
    getAutoAggregationFn: () => {
      const t = n.getCoreRowModel().flatRows[0], o = t == null ? void 0 : t.getValue(e.id);
      if (typeof o == "number")
        return q.sum;
      if (Object.prototype.toString.call(o) === "[object Date]")
        return q.extent;
    },
    getAggregationFn: () => {
      if (!e)
        throw new Error();
      return B(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : q[e.columnDef.aggregationFn];
    }
  }),
  createTable: (e) => ({
    setGrouping: (n) => e.options.onGroupingChange == null ? void 0 : e.options.onGroupingChange(n),
    resetGrouping: (n) => {
      var t, o;
      e.setGrouping(n ? [] : (t = (o = e.initialState) == null ? void 0 : o.grouping) != null ? t : []);
    },
    getPreGroupedRowModel: () => e.getFilteredRowModel(),
    getGroupedRowModel: () => (!e._getGroupedRowModel && e.options.getGroupedRowModel && (e._getGroupedRowModel = e.options.getGroupedRowModel(e)), e.options.manualGrouping || !e._getGroupedRowModel ? e.getPreGroupedRowModel() : e._getGroupedRowModel())
  }),
  createRow: (e) => ({
    getIsGrouped: () => !!e.groupingColumnId,
    _groupingValuesCache: {}
  }),
  createCell: (e, n, t, o) => ({
    getIsGrouped: () => n.getIsGrouped() && n.id === t.groupingColumnId,
    getIsPlaceholder: () => !e.getIsGrouped() && n.getIsGrouped(),
    getIsAggregated: () => {
      var r;
      return !e.getIsGrouped() && !e.getIsPlaceholder() && !!((r = t.subRows) != null && r.length);
    }
  })
};
function je(e, n, t) {
  if (!(n != null && n.length) || !t)
    return e;
  const o = e.filter((l) => !n.includes(l.id));
  return t === "remove" ? o : [...n.map((l) => e.find((i) => i.id === l)).filter(Boolean), ...o];
}
const Ne = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: _("columnOrder", e)
  }),
  createTable: (e) => ({
    setColumnOrder: (n) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(n),
    resetColumnOrder: (n) => {
      var t;
      e.setColumnOrder(n ? [] : (t = e.initialState.columnOrder) != null ? t : []);
    },
    _getOrderColumnsFn: m(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (n, t, o) => (r) => {
      let l = [];
      if (!(n != null && n.length))
        l = r;
      else {
        const i = [...n], s = [...r];
        for (; s.length && i.length; ) {
          const g = i.shift(), p = s.findIndex((u) => u.id === g);
          p > -1 && l.push(s.splice(p, 1)[0]);
        }
        l = [...l, ...s];
      }
      return je(l, t, o);
    }, {
      key: !1
    })
  })
}, Q = 0, Z = 10, U = () => ({
  pageIndex: Q,
  pageSize: Z
}), qe = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...U(),
      ...e == null ? void 0 : e.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: _("pagination", e)
  }),
  createTable: (e) => {
    let n = !1, t = !1;
    return {
      _autoResetPageIndex: () => {
        var o, r;
        if (!n) {
          e._queue(() => {
            n = !0;
          });
          return;
        }
        if ((o = (r = e.options.autoResetAll) != null ? r : e.options.autoResetPageIndex) != null ? o : !e.options.manualPagination) {
          if (t)
            return;
          t = !0, e._queue(() => {
            e.resetPageIndex(), t = !1;
          });
        }
      },
      setPagination: (o) => {
        const r = (l) => b(o, l);
        return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(r);
      },
      resetPagination: (o) => {
        var r;
        e.setPagination(o ? U() : (r = e.initialState.pagination) != null ? r : U());
      },
      setPageIndex: (o) => {
        e.setPagination((r) => {
          let l = b(o, r.pageIndex);
          const i = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
          return l = Math.min(Math.max(0, l), i), {
            ...r,
            pageIndex: l
          };
        });
      },
      resetPageIndex: (o) => {
        var r, l, i;
        e.setPageIndex(o ? Q : (r = (l = e.initialState) == null || (i = l.pagination) == null ? void 0 : i.pageIndex) != null ? r : Q);
      },
      resetPageSize: (o) => {
        var r, l, i;
        e.setPageSize(o ? Z : (r = (l = e.initialState) == null || (i = l.pagination) == null ? void 0 : i.pageSize) != null ? r : Z);
      },
      setPageSize: (o) => {
        e.setPagination((r) => {
          const l = Math.max(1, b(o, r.pageSize)), i = r.pageSize * r.pageIndex, s = Math.floor(i / l);
          return {
            ...r,
            pageIndex: s,
            pageSize: l
          };
        });
      },
      setPageCount: (o) => e.setPagination((r) => {
        var l;
        let i = b(o, (l = e.options.pageCount) != null ? l : -1);
        return typeof i == "number" && (i = Math.max(-1, i)), {
          ...r,
          pageCount: i
        };
      }),
      getPageOptions: m(() => [e.getPageCount()], (o) => {
        let r = [];
        return o && o > 0 && (r = [...new Array(o)].fill(null).map((l, i) => i)), r;
      }, {
        key: !1,
        debug: () => {
          var o;
          return (o = e.options.debugAll) != null ? o : e.options.debugTable;
        }
      }),
      getCanPreviousPage: () => e.getState().pagination.pageIndex > 0,
      getCanNextPage: () => {
        const {
          pageIndex: o
        } = e.getState().pagination, r = e.getPageCount();
        return r === -1 ? !0 : r === 0 ? !1 : o < r - 1;
      },
      previousPage: () => e.setPageIndex((o) => o - 1),
      nextPage: () => e.setPageIndex((o) => o + 1),
      getPrePaginationRowModel: () => e.getExpandedRowModel(),
      getPaginationRowModel: () => (!e._getPaginationRowModel && e.options.getPaginationRowModel && (e._getPaginationRowModel = e.options.getPaginationRowModel(e)), e.options.manualPagination || !e._getPaginationRowModel ? e.getPrePaginationRowModel() : e._getPaginationRowModel()),
      getPageCount: () => {
        var o;
        return (o = e.options.pageCount) != null ? o : Math.ceil(e.getPrePaginationRowModel().rows.length / e.getState().pagination.pageSize);
      }
    };
  }
}, X = () => ({
  left: [],
  right: []
}), Ue = {
  getInitialState: (e) => ({
    columnPinning: X(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: _("columnPinning", e)
  }),
  createColumn: (e, n) => ({
    pin: (t) => {
      const o = e.getLeafColumns().map((r) => r.id).filter(Boolean);
      n.setColumnPinning((r) => {
        var l, i;
        if (t === "right") {
          var s, g;
          return {
            left: ((s = r == null ? void 0 : r.left) != null ? s : []).filter((d) => !(o != null && o.includes(d))),
            right: [...((g = r == null ? void 0 : r.right) != null ? g : []).filter((d) => !(o != null && o.includes(d))), ...o]
          };
        }
        if (t === "left") {
          var p, u;
          return {
            left: [...((p = r == null ? void 0 : r.left) != null ? p : []).filter((d) => !(o != null && o.includes(d))), ...o],
            right: ((u = r == null ? void 0 : r.right) != null ? u : []).filter((d) => !(o != null && o.includes(d)))
          };
        }
        return {
          left: ((l = r == null ? void 0 : r.left) != null ? l : []).filter((d) => !(o != null && o.includes(d))),
          right: ((i = r == null ? void 0 : r.right) != null ? i : []).filter((d) => !(o != null && o.includes(d)))
        };
      });
    },
    getCanPin: () => e.getLeafColumns().some((o) => {
      var r, l;
      return ((r = o.columnDef.enablePinning) != null ? r : !0) && ((l = n.options.enablePinning) != null ? l : !0);
    }),
    getIsPinned: () => {
      const t = e.getLeafColumns().map((s) => s.id), {
        left: o,
        right: r
      } = n.getState().columnPinning, l = t.some((s) => o == null ? void 0 : o.includes(s)), i = t.some((s) => r == null ? void 0 : r.includes(s));
      return l ? "left" : i ? "right" : !1;
    },
    getPinnedIndex: () => {
      var t, o, r;
      const l = e.getIsPinned();
      return l ? (t = (o = n.getState().columnPinning) == null || (r = o[l]) == null ? void 0 : r.indexOf(e.id)) != null ? t : -1 : 0;
    }
  }),
  createRow: (e, n) => ({
    getCenterVisibleCells: m(() => [e._getAllVisibleCells(), n.getState().columnPinning.left, n.getState().columnPinning.right], (t, o, r) => {
      const l = [...o != null ? o : [], ...r != null ? r : []];
      return t.filter((i) => !l.includes(i.column.id));
    }, {
      key: "row.getCenterVisibleCells",
      debug: () => {
        var t;
        return (t = n.options.debugAll) != null ? t : n.options.debugRows;
      }
    }),
    getLeftVisibleCells: m(() => [e._getAllVisibleCells(), n.getState().columnPinning.left, ,], (t, o) => (o != null ? o : []).map((l) => t.find((i) => i.column.id === l)).filter(Boolean).map((l) => ({
      ...l,
      position: "left"
    })), {
      key: "row.getLeftVisibleCells",
      debug: () => {
        var t;
        return (t = n.options.debugAll) != null ? t : n.options.debugRows;
      }
    }),
    getRightVisibleCells: m(() => [e._getAllVisibleCells(), n.getState().columnPinning.right], (t, o) => (o != null ? o : []).map((l) => t.find((i) => i.column.id === l)).filter(Boolean).map((l) => ({
      ...l,
      position: "left"
    })), {
      key: "row.getRightVisibleCells",
      debug: () => {
        var t;
        return (t = n.options.debugAll) != null ? t : n.options.debugRows;
      }
    })
  }),
  createTable: (e) => ({
    setColumnPinning: (n) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(n),
    resetColumnPinning: (n) => {
      var t, o;
      return e.setColumnPinning(n ? X() : (t = (o = e.initialState) == null ? void 0 : o.columnPinning) != null ? t : X());
    },
    getIsSomeColumnsPinned: (n) => {
      var t;
      const o = e.getState().columnPinning;
      if (!n) {
        var r, l;
        return Boolean(((r = o.left) == null ? void 0 : r.length) || ((l = o.right) == null ? void 0 : l.length));
      }
      return Boolean((t = o[n]) == null ? void 0 : t.length);
    },
    getLeftLeafColumns: m(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (n, t) => (t != null ? t : []).map((o) => n.find((r) => r.id === o)).filter(Boolean), {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugColumns;
      }
    }),
    getRightLeafColumns: m(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (n, t) => (t != null ? t : []).map((o) => n.find((r) => r.id === o)).filter(Boolean), {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugColumns;
      }
    }),
    getCenterLeafColumns: m(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (n, t, o) => {
      const r = [...t != null ? t : [], ...o != null ? o : []];
      return n.filter((l) => !r.includes(l.id));
    }, {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugColumns;
      }
    })
  })
}, Xe = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: _("rowSelection", e),
    enableRowSelection: !0,
    enableMultiRowSelection: !0,
    enableSubRowSelection: !0
  }),
  createTable: (e) => ({
    setRowSelection: (n) => e.options.onRowSelectionChange == null ? void 0 : e.options.onRowSelectionChange(n),
    resetRowSelection: (n) => {
      var t;
      return e.setRowSelection(n ? {} : (t = e.initialState.rowSelection) != null ? t : {});
    },
    toggleAllRowsSelected: (n) => {
      e.setRowSelection((t) => {
        n = typeof n < "u" ? n : !e.getIsAllRowsSelected();
        const o = {
          ...t
        }, r = e.getPreGroupedRowModel().flatRows;
        return n ? r.forEach((l) => {
          !l.getCanSelect() || (o[l.id] = !0);
        }) : r.forEach((l) => {
          delete o[l.id];
        }), o;
      });
    },
    toggleAllPageRowsSelected: (n) => e.setRowSelection((t) => {
      const o = typeof n < "u" ? n : !e.getIsAllPageRowsSelected(), r = {
        ...t
      };
      return e.getRowModel().rows.forEach((l) => {
        ee(r, l.id, o, e);
      }), r;
    }),
    getPreSelectedRowModel: () => e.getCoreRowModel(),
    getSelectedRowModel: m(() => [e.getState().rowSelection, e.getCoreRowModel()], (n, t) => Object.keys(n).length ? K(e, t) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, {
      key: !1,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugTable;
      }
    }),
    getFilteredSelectedRowModel: m(() => [e.getState().rowSelection, e.getFilteredRowModel()], (n, t) => Object.keys(n).length ? K(e, t) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, {
      key: "getFilteredSelectedRowModel",
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugTable;
      }
    }),
    getGroupedSelectedRowModel: m(() => [e.getState().rowSelection, e.getSortedRowModel()], (n, t) => Object.keys(n).length ? K(e, t) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, {
      key: "getGroupedSelectedRowModel",
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugTable;
      }
    }),
    getIsAllRowsSelected: () => {
      const n = e.getPreFilteredRowModel().flatRows, {
        rowSelection: t
      } = e.getState();
      let o = Boolean(n.length && Object.keys(t).length);
      return o && n.some((r) => r.getCanSelect() && !t[r.id]) && (o = !1), o;
    },
    getIsAllPageRowsSelected: () => {
      const n = e.getPaginationRowModel().flatRows, {
        rowSelection: t
      } = e.getState();
      let o = !!n.length;
      return o && n.some((r) => !t[r.id]) && (o = !1), o;
    },
    getIsSomeRowsSelected: () => {
      var n;
      return Object.keys((n = e.getState().rowSelection) != null ? n : {}).length < e.getCoreRowModel().flatRows.length;
    },
    getIsSomePageRowsSelected: () => {
      const n = e.getPaginationRowModel().flatRows;
      return e.getIsAllPageRowsSelected() ? !1 : n.some((t) => t.getIsSelected() || t.getIsSomeSelected());
    },
    getToggleAllRowsSelectedHandler: () => (n) => {
      e.toggleAllRowsSelected(n.target.checked);
    },
    getToggleAllPageRowsSelectedHandler: () => (n) => {
      e.toggleAllPageRowsSelected(n.target.checked);
    }
  }),
  createRow: (e, n) => ({
    toggleSelected: (t) => {
      const o = e.getIsSelected();
      n.setRowSelection((r) => {
        if (t = typeof t < "u" ? t : !o, o === t)
          return r;
        const l = {
          ...r
        };
        return ee(l, e.id, t, n), l;
      });
    },
    getIsSelected: () => {
      const {
        rowSelection: t
      } = n.getState();
      return oe(e, t);
    },
    getIsSomeSelected: () => {
      const {
        rowSelection: t
      } = n.getState();
      return se(e, t) === "some";
    },
    getIsAllSubRowsSelected: () => {
      const {
        rowSelection: t
      } = n.getState();
      return se(e, t) === "all";
    },
    getCanSelect: () => {
      var t;
      return typeof n.options.enableRowSelection == "function" ? n.options.enableRowSelection(e) : (t = n.options.enableRowSelection) != null ? t : !0;
    },
    getCanSelectSubRows: () => {
      var t;
      return typeof n.options.enableSubRowSelection == "function" ? n.options.enableSubRowSelection(e) : (t = n.options.enableSubRowSelection) != null ? t : !0;
    },
    getCanMultiSelect: () => {
      var t;
      return typeof n.options.enableMultiRowSelection == "function" ? n.options.enableMultiRowSelection(e) : (t = n.options.enableMultiRowSelection) != null ? t : !0;
    },
    getToggleSelectedHandler: () => {
      const t = e.getCanSelect();
      return (o) => {
        var r;
        !t || e.toggleSelected((r = o.target) == null ? void 0 : r.checked);
      };
    }
  })
}, ee = (e, n, t, o) => {
  var r;
  const l = o.getRow(n);
  t ? (l.getCanMultiSelect() || Object.keys(e).forEach((i) => delete e[i]), l.getCanSelect() && (e[n] = !0)) : delete e[n], (r = l.subRows) != null && r.length && l.getCanSelectSubRows() && l.subRows.forEach((i) => ee(e, i.id, t, o));
};
function K(e, n) {
  const t = e.getState().rowSelection, o = [], r = {}, l = function(i, s) {
    return i.map((g) => {
      var p;
      const u = oe(g, t);
      if (u && (o.push(g), r[g.id] = g), (p = g.subRows) != null && p.length && (g = {
        ...g,
        subRows: l(g.subRows)
      }), u)
        return g;
    }).filter(Boolean);
  };
  return {
    rows: l(n.rows),
    flatRows: o,
    rowsById: r
  };
}
function oe(e, n) {
  var t;
  return (t = n[e.id]) != null ? t : !1;
}
function se(e, n, t) {
  if (e.subRows && e.subRows.length) {
    let o = !0, r = !1;
    return e.subRows.forEach((l) => {
      r && !o || (oe(l, n) ? r = !0 : o = !1);
    }), o ? "all" : r ? "some" : !1;
  }
  return !1;
}
const te = /([0-9]+)/gm, Ke = (e, n, t) => Re(y(e.getValue(t)).toLowerCase(), y(n.getValue(t)).toLowerCase()), We = (e, n, t) => Re(y(e.getValue(t)), y(n.getValue(t))), Ye = (e, n, t) => re(y(e.getValue(t)).toLowerCase(), y(n.getValue(t)).toLowerCase()), Je = (e, n, t) => re(y(e.getValue(t)), y(n.getValue(t))), Qe = (e, n, t) => {
  const o = e.getValue(t), r = n.getValue(t);
  return o > r ? 1 : o < r ? -1 : 0;
}, Ze = (e, n, t) => re(e.getValue(t), n.getValue(t));
function re(e, n) {
  return e === n ? 0 : e > n ? 1 : -1;
}
function y(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Re(e, n) {
  const t = e.split(te).filter(Boolean), o = n.split(te).filter(Boolean);
  for (; t.length && o.length; ) {
    const r = t.shift(), l = o.shift(), i = parseInt(r, 10), s = parseInt(l, 10), g = [i, s].sort();
    if (isNaN(g[0])) {
      if (r > l)
        return 1;
      if (l > r)
        return -1;
      continue;
    }
    if (isNaN(g[1]))
      return isNaN(i) ? -1 : 1;
    if (i > s)
      return 1;
    if (s > i)
      return -1;
  }
  return t.length - o.length;
}
const E = {
  alphanumeric: Ke,
  alphanumericCaseSensitive: We,
  text: Ye,
  textCaseSensitive: Je,
  datetime: Qe,
  basic: Ze
}, et = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto"
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: _("sorting", e),
    isMultiSortEvent: (n) => n.shiftKey
  }),
  createColumn: (e, n) => ({
    getAutoSortingFn: () => {
      const t = n.getFilteredRowModel().flatRows.slice(10);
      let o = !1;
      for (const r of t) {
        const l = r == null ? void 0 : r.getValue(e.id);
        if (Object.prototype.toString.call(l) === "[object Date]")
          return E.datetime;
        if (typeof l == "string" && (o = !0, l.split(te).length > 1))
          return E.alphanumeric;
      }
      return o ? E.text : E.basic;
    },
    getAutoSortDir: () => {
      const t = n.getFilteredRowModel().flatRows[0];
      return typeof (t == null ? void 0 : t.getValue(e.id)) == "string" ? "asc" : "desc";
    },
    getSortingFn: () => {
      if (!e)
        throw new Error();
      return B(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : E[e.columnDef.sortingFn];
    },
    toggleSorting: (t, o) => {
      const r = e.getNextSortingOrder(), l = typeof t < "u" && t !== null;
      n.setSorting((i) => {
        const s = i == null ? void 0 : i.find((a) => a.id === e.id), g = i == null ? void 0 : i.findIndex((a) => a.id === e.id);
        let p = [], u, d = l ? t : r === "desc";
        if (i != null && i.length && e.getCanMultiSort() && o ? s ? u = "toggle" : u = "add" : i != null && i.length && g !== i.length - 1 ? u = "replace" : s ? u = "toggle" : u = "replace", u === "toggle" && (l || r || (u = "remove")), u === "add") {
          var c;
          p = [...i, {
            id: e.id,
            desc: d
          }], p.splice(0, p.length - ((c = n.options.maxMultiSortColCount) != null ? c : Number.MAX_SAFE_INTEGER));
        } else
          u === "toggle" ? p = i.map((a) => a.id === e.id ? {
            ...a,
            desc: d
          } : a) : u === "remove" ? p = i.filter((a) => a.id !== e.id) : p = [{
            id: e.id,
            desc: d
          }];
        return p;
      });
    },
    getFirstSortDir: () => {
      var t, o;
      return ((t = (o = e.columnDef.sortDescFirst) != null ? o : n.options.sortDescFirst) != null ? t : e.getAutoSortDir() === "desc") ? "desc" : "asc";
    },
    getNextSortingOrder: (t) => {
      var o, r;
      const l = e.getFirstSortDir(), i = e.getIsSorted();
      return i ? i !== l && ((o = n.options.enableSortingRemoval) != null ? o : !0) && (t && (r = n.options.enableMultiRemove) != null ? r : !0) ? !1 : i === "desc" ? "asc" : "desc" : l;
    },
    getCanSort: () => {
      var t, o;
      return ((t = e.columnDef.enableSorting) != null ? t : !0) && ((o = n.options.enableSorting) != null ? o : !0) && !!e.accessorFn;
    },
    getCanMultiSort: () => {
      var t, o;
      return (t = (o = e.columnDef.enableMultiSort) != null ? o : n.options.enableMultiSort) != null ? t : !!e.accessorFn;
    },
    getIsSorted: () => {
      var t;
      const o = (t = n.getState().sorting) == null ? void 0 : t.find((r) => r.id === e.id);
      return o ? o.desc ? "desc" : "asc" : !1;
    },
    getSortIndex: () => {
      var t, o;
      return (t = (o = n.getState().sorting) == null ? void 0 : o.findIndex((r) => r.id === e.id)) != null ? t : -1;
    },
    clearSorting: () => {
      n.setSorting((t) => t != null && t.length ? t.filter((o) => o.id !== e.id) : []);
    },
    getToggleSortingHandler: () => {
      const t = e.getCanSort();
      return (o) => {
        !t || (o.persist == null || o.persist(), e.toggleSorting == null || e.toggleSorting(void 0, e.getCanMultiSort() ? n.options.isMultiSortEvent == null ? void 0 : n.options.isMultiSortEvent(o) : !1));
      };
    }
  }),
  createTable: (e) => ({
    setSorting: (n) => e.options.onSortingChange == null ? void 0 : e.options.onSortingChange(n),
    resetSorting: (n) => {
      var t, o;
      e.setSorting(n ? [] : (t = (o = e.initialState) == null ? void 0 : o.sorting) != null ? t : []);
    },
    getPreSortedRowModel: () => e.getGroupedRowModel(),
    getSortedRowModel: () => (!e._getSortedRowModel && e.options.getSortedRowModel && (e._getSortedRowModel = e.options.getSortedRowModel(e)), e.options.manualSorting || !e._getSortedRowModel ? e.getPreSortedRowModel() : e._getSortedRowModel())
  })
}, tt = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: _("columnVisibility", e)
  }),
  createColumn: (e, n) => ({
    toggleVisibility: (t) => {
      e.getCanHide() && n.setColumnVisibility((o) => ({
        ...o,
        [e.id]: t != null ? t : !e.getIsVisible()
      }));
    },
    getIsVisible: () => {
      var t, o;
      return (t = (o = n.getState().columnVisibility) == null ? void 0 : o[e.id]) != null ? t : !0;
    },
    getCanHide: () => {
      var t, o;
      return ((t = e.columnDef.enableHiding) != null ? t : !0) && ((o = n.options.enableHiding) != null ? o : !0);
    },
    getToggleVisibilityHandler: () => (t) => {
      e.toggleVisibility == null || e.toggleVisibility(t.target.checked);
    }
  }),
  createRow: (e, n) => ({
    _getAllVisibleCells: m(() => [e.getAllCells(), n.getState().columnVisibility], (t) => t.filter((o) => o.column.getIsVisible()), {
      key: "row._getAllVisibleCells",
      debug: () => {
        var t;
        return (t = n.options.debugAll) != null ? t : n.options.debugRows;
      }
    }),
    getVisibleCells: m(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (t, o, r) => [...t, ...o, ...r], {
      key: !1,
      debug: () => {
        var t;
        return (t = n.options.debugAll) != null ? t : n.options.debugRows;
      }
    })
  }),
  createTable: (e) => {
    const n = (t, o) => m(() => [o(), o().filter((r) => r.getIsVisible()).map((r) => r.id).join("_")], (r) => r.filter((l) => l.getIsVisible == null ? void 0 : l.getIsVisible()), {
      key: t,
      debug: () => {
        var r;
        return (r = e.options.debugAll) != null ? r : e.options.debugColumns;
      }
    });
    return {
      getVisibleFlatColumns: n("getVisibleFlatColumns", () => e.getAllFlatColumns()),
      getVisibleLeafColumns: n("getVisibleLeafColumns", () => e.getAllLeafColumns()),
      getLeftVisibleLeafColumns: n("getLeftVisibleLeafColumns", () => e.getLeftLeafColumns()),
      getRightVisibleLeafColumns: n("getRightVisibleLeafColumns", () => e.getRightLeafColumns()),
      getCenterVisibleLeafColumns: n("getCenterVisibleLeafColumns", () => e.getCenterLeafColumns()),
      setColumnVisibility: (t) => e.options.onColumnVisibilityChange == null ? void 0 : e.options.onColumnVisibilityChange(t),
      resetColumnVisibility: (t) => {
        var o;
        e.setColumnVisibility(t ? {} : (o = e.initialState.columnVisibility) != null ? o : {});
      },
      toggleAllColumnsVisible: (t) => {
        var o;
        t = (o = t) != null ? o : !e.getIsAllColumnsVisible(), e.setColumnVisibility(e.getAllLeafColumns().reduce((r, l) => ({
          ...r,
          [l.id]: t || !(l.getCanHide != null && l.getCanHide())
        }), {}));
      },
      getIsAllColumnsVisible: () => !e.getAllLeafColumns().some((t) => !(t.getIsVisible != null && t.getIsVisible())),
      getIsSomeColumnsVisible: () => e.getAllLeafColumns().some((t) => t.getIsVisible == null ? void 0 : t.getIsVisible()),
      getToggleAllColumnsVisibilityHandler: () => (t) => {
        var o;
        e.toggleAllColumnsVisible((o = t.target) == null ? void 0 : o.checked);
      }
    };
  }
}, ae = [ye, tt, Ne, Ue, Pe, et, Te, Ie, qe, Xe, xe];
function nt(e) {
  var n;
  (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  let t = {
    _features: ae
  };
  const o = t._features.reduce((u, d) => Object.assign(u, d.getDefaultOptions == null ? void 0 : d.getDefaultOptions(t)), {}), r = (u) => t.options.mergeOptions ? t.options.mergeOptions(o, u) : {
    ...o,
    ...u
  };
  let i = {
    ...{},
    ...(n = e.initialState) != null ? n : {}
  };
  t._features.forEach((u) => {
    var d;
    i = (d = u.getInitialState == null ? void 0 : u.getInitialState(i)) != null ? d : i;
  });
  const s = [];
  let g = !1;
  const p = {
    _features: ae,
    options: {
      ...o,
      ...e
    },
    initialState: i,
    _queue: (u) => {
      s.push(u), g || (g = !0, Promise.resolve().then(() => {
        for (; s.length; )
          s.shift()();
        g = !1;
      }).catch((d) => setTimeout(() => {
        throw d;
      })));
    },
    reset: () => {
      t.setState(t.initialState);
    },
    setOptions: (u) => {
      const d = b(u, t.options);
      t.options = r(d);
    },
    getState: () => t.options.state,
    setState: (u) => {
      t.options.onStateChange == null || t.options.onStateChange(u);
    },
    _getRowId: (u, d, c) => {
      var a;
      return (a = t.options.getRowId == null ? void 0 : t.options.getRowId(u, d, c)) != null ? a : "" + (c ? [c.id, d].join(".") : d);
    },
    getCoreRowModel: () => (t._getCoreRowModel || (t._getCoreRowModel = t.options.getCoreRowModel(t)), t._getCoreRowModel()),
    getRowModel: () => t.getPaginationRowModel(),
    getRow: (u) => {
      const d = t.getRowModel().rowsById[u];
      if (!d)
        throw new Error();
      return d;
    },
    _getDefaultColumnDef: m(() => [t.options.defaultColumn], (u) => {
      var d;
      return u = (d = u) != null ? d : {}, {
        header: (c) => c.header.column.id,
        footer: (c) => c.header.column.id,
        cell: (c) => {
          var a, f;
          return (a = (f = c.renderValue()) == null || f.toString == null ? void 0 : f.toString()) != null ? a : null;
        },
        ...t._features.reduce((c, a) => Object.assign(c, a.getDefaultColumnDef == null ? void 0 : a.getDefaultColumnDef()), {}),
        ...u
      };
    }, {
      debug: () => {
        var u;
        return (u = t.options.debugAll) != null ? u : t.options.debugColumns;
      },
      key: !1
    }),
    _getColumnDefs: () => t.options.columns,
    getAllColumns: m(() => [t._getColumnDefs()], (u) => {
      const d = function(c, a, f) {
        return f === void 0 && (f = 0), c.map((C) => {
          const S = be(t, C, f, a);
          return S.columns = C.columns ? d(C.columns, S, f + 1) : [], S;
        });
      };
      return d(u);
    }, {
      key: !1,
      debug: () => {
        var u;
        return (u = t.options.debugAll) != null ? u : t.options.debugColumns;
      }
    }),
    getAllFlatColumns: m(() => [t.getAllColumns()], (u) => u.flatMap((d) => d.getFlatColumns()), {
      key: !1,
      debug: () => {
        var u;
        return (u = t.options.debugAll) != null ? u : t.options.debugColumns;
      }
    }),
    _getAllFlatColumnsById: m(() => [t.getAllFlatColumns()], (u) => u.reduce((d, c) => (d[c.id] = c, d), {}), {
      key: !1,
      debug: () => {
        var u;
        return (u = t.options.debugAll) != null ? u : t.options.debugColumns;
      }
    }),
    getAllLeafColumns: m(() => [t.getAllColumns(), t._getOrderColumnsFn()], (u, d) => {
      let c = u.flatMap((a) => a.getLeafColumns());
      return d(c);
    }, {
      key: !1,
      debug: () => {
        var u;
        return (u = t.options.debugAll) != null ? u : t.options.debugColumns;
      }
    }),
    getColumn: (u) => {
      const d = t._getAllFlatColumnsById()[u];
      if (!d)
        throw new Error();
      return d;
    }
  };
  return Object.assign(t, p), t._features.forEach((u) => Object.assign(t, u.createTable == null ? void 0 : u.createTable(t))), t;
}
function ot(e, n, t, o) {
  const r = () => {
    var i;
    return (i = l.getValue()) != null ? i : e.options.renderFallbackValue;
  }, l = {
    id: n.id + "_" + t.id,
    row: n,
    column: t,
    getValue: () => n.getValue(o),
    renderValue: r,
    getContext: () => ({
      table: e,
      column: t,
      row: n,
      cell: l,
      getValue: l.getValue,
      renderValue: l.renderValue
    })
  };
  return e._features.forEach((i) => {
    Object.assign(l, i.createCell == null ? void 0 : i.createCell(l, t, n, e));
  }, {}), l;
}
const rt = (e, n, t, o, r, l) => {
  let i = {
    id: n,
    index: o,
    original: t,
    depth: r,
    _valuesCache: {},
    getValue: (s) => {
      if (i._valuesCache.hasOwnProperty(s))
        return i._valuesCache[s];
      const g = e.getColumn(s);
      if (!!g.accessorFn)
        return i._valuesCache[s] = g.accessorFn(i.original, o), i._valuesCache[s];
    },
    renderValue: (s) => {
      var g;
      return (g = i.getValue(s)) != null ? g : e.options.renderFallbackValue;
    },
    subRows: l != null ? l : [],
    getLeafRows: () => Me(i.subRows, (s) => s.subRows),
    getAllCells: m(() => [e.getAllLeafColumns()], (s) => s.map((g) => ot(e, i, g, g.id)), {
      key: !1,
      debug: () => {
        var s;
        return (s = e.options.debugAll) != null ? s : e.options.debugRows;
      }
    }),
    _getAllCellsByColumnId: m(() => [i.getAllCells()], (s) => s.reduce((g, p) => (g[p.column.id] = p, g), {}), {
      key: "row.getAllCellsByColumnId",
      debug: () => {
        var s;
        return (s = e.options.debugAll) != null ? s : e.options.debugRows;
      }
    })
  };
  for (let s = 0; s < e._features.length; s++) {
    const g = e._features[s];
    Object.assign(i, g == null || g.createRow == null ? void 0 : g.createRow(i, e));
  }
  return i;
};
function lt() {
  return (e) => m(() => [e.options.data], (n) => {
    const t = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, o = function(r, l, i) {
      l === void 0 && (l = 0);
      const s = [];
      for (let p = 0; p < r.length; p++) {
        const u = rt(e, e._getRowId(r[p], p, i), r[p], p, l);
        if (t.flatRows.push(u), t.rowsById[u.id] = u, s.push(u), e.options.getSubRows) {
          var g;
          u.originalSubRows = e.options.getSubRows(r[p], p), (g = u.originalSubRows) != null && g.length && (u.subRows = o(u.originalSubRows, l + 1, u));
        }
      }
      return s;
    };
    return t.rows = o(n), t;
  }, {
    key: !1,
    debug: () => {
      var n;
      return (n = e.options.debugAll) != null ? n : e.options.debugTable;
    },
    onChange: () => {
      e._autoResetPageIndex();
    }
  });
}
function z() {
  return !0;
}
const it = Symbol("merge-proxy"), ut = {
  get(e, n, t) {
    return n === it ? t : e.get(n);
  },
  has(e, n) {
    return e.has(n);
  },
  set: z,
  deleteProperty: z,
  getOwnPropertyDescriptor(e, n) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(n);
      },
      set: z,
      deleteProperty: z
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function W(e) {
  return "value" in e ? e.value : e;
}
function k() {
  for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++)
    n[t] = arguments[t];
  return new Proxy({
    get(o) {
      for (let r = n.length - 1; r >= 0; r--) {
        const l = W(n[r])[o];
        if (l !== void 0)
          return l;
      }
    },
    has(o) {
      for (let r = n.length - 1; r >= 0; r--)
        if (o in W(n[r]))
          return !0;
      return !1;
    },
    keys() {
      const o = [];
      for (let r = 0; r < n.length; r++)
        o.push(...Object.keys(W(n[r])));
      return [...new Set(o)];
    }
  }, ut);
}
function st(e, n) {
  return e ? typeof e == "function" ? $e(e, n) : e : null;
}
function at(e) {
  const n = k({
    state: {},
    onStateChange: () => {
    },
    renderFallbackValue: null,
    mergeOptions(r, l) {
      return k(r, l);
    }
  }, e), t = nt(n), o = Fe(t.initialState);
  return Ve(() => {
    t.setOptions((r) => {
      var l;
      const i = new Proxy({}, {
        get: (s, g) => o.value[g]
      });
      return k(r, e, {
        state: k(i, (l = e.state) != null ? l : {}),
        onStateChange: (s) => {
          s instanceof Function ? o.value = s(o.value) : o.value = s, e.onStateChange == null || e.onStateChange(s);
        }
      });
    });
  }), t;
}
const ge = window.Vue.createVNode, gt = window.Components.VFieldWrapper, dt = window.Components.VLink, ct = (e) => [{
  id: "title",
  header: () => "Title",
  accessorFn: (n) => ge(dt, {
    href: route("cards.show", n)
  }, {
    default: () => [n.title]
  })
}, ...e.project.fields.map((n) => ({
  id: n.handle,
  header: () => n.title,
  accessorFn: (t) => ge(gt, {
    card: t,
    field: n
  }, null)
}))], pt = window.Vue.defineComponent, V = window.Vue.unref, H = window.Vue.renderList, x = window.Vue.Fragment, w = window.Vue.openBlock, v = window.Vue.createElementBlock, de = window.Vue.resolveDynamicComponent, Y = window.Vue.createBlock, ft = window.Vue.createCommentVNode, A = window.Vue.createElementVNode, J = window.Vue.withCtx, O = window.Vue.createVNode, mt = window.Vue.withModifiers, St = window.Vue.toDisplayString, Ct = window.Vue.createTextVNode, wt = window.Vue.resolveComponent, vt = { class: "hidden md:block w-full px-6" }, _t = { class: "w-full" }, ht = ["colSpan"], Rt = { class: "" }, $t = { class: "flex flex-col gap-4 md:hidden px-6" }, Ft = ["onSubmit"], Vt = { class: "flex items-center gap-3 mt-2" }, Mt = window.Components.VFormInput, bt = window.Components.VFieldWrapper, ce = window.Components.VCard, yt = window.Components.useCardForm, xt = window.Components.useSorter, pe = window.Vue.ref, At = /* @__PURE__ */ pt({
  __name: "Component",
  props: {
    project: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const n = e, t = ct(n), o = pe({}), r = pe([]), l = at({
      get data() {
        return n.project.cards;
      },
      columns: t,
      state: {
        get columnVisibility() {
          return o.value;
        },
        get columnOrder() {
          return r.value;
        }
      },
      onColumnOrderChange: (u) => {
        r.value = u;
      },
      onColumnVisibilityChange: (u) => {
        o.value = u;
      },
      getCoreRowModel: lt()
    }), { form: i, store: s, destroy: g } = yt();
    xt();
    function p() {
      i.processing || s(n.project);
    }
    return (u, d) => {
      const c = wt("Link");
      return w(), v(x, null, [
        A("div", vt, [
          O(V(ce), { class: "[&>div]:p-[0!important]" }, {
            default: J(() => [
              A("table", _t, [
                A("thead", null, [
                  (w(!0), v(x, null, H(V(l).getHeaderGroups(), (a) => (w(), v("tr", {
                    key: a.id
                  }, [
                    (w(!0), v(x, null, H(a.headers, (f) => (w(), v("th", {
                      class: "px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800",
                      key: f.id,
                      colSpan: f.colSpan
                    }, [
                      f.isPlaceholder ? ft("", !0) : (w(), Y(de(V(st)(f.column.columnDef.header, f.getContext())), { key: 0 }))
                    ], 8, ht))), 128))
                  ]))), 128))
                ]),
                A("tbody", Rt, [
                  (w(!0), v(x, null, H(V(l).getRowModel().rows, (a) => (w(), v("tr", {
                    class: "border-t last:border-b",
                    key: a.id
                  }, [
                    (w(!0), v(x, null, H(a.getVisibleCells(), (f) => (w(), v("td", {
                      class: "px-4 py-2",
                      key: f.id
                    }, [
                      (w(), Y(de(f.renderValue)))
                    ]))), 128))
                  ]))), 128))
                ])
              ])
            ]),
            _: 1
          })
        ]),
        A("div", $t, [
          A("form", {
            onSubmit: mt(p, ["prevent"])
          }, [
            O(V(Mt), {
              placeholder: "Create a card...",
              modelValue: V(i).title,
              "onUpdate:modelValue": d[0] || (d[0] = (a) => V(i).title = a)
            }, null, 8, ["modelValue"])
          ], 40, Ft),
          (w(!0), v(x, null, H(e.project.cards, (a) => (w(), Y(V(ce), null, {
            default: J(() => [
              O(c, {
                class: "text-base hover:underline",
                href: u.route("cards.show", a)
              }, {
                default: J(() => [
                  Ct(St(a.title), 1)
                ]),
                _: 2
              }, 1032, ["href"]),
              A("div", Vt, [
                (w(!0), v(x, null, H(a.project.fields, (f) => (w(), v("div", {
                  key: a.id + "" + f.handle
                }, [
                  O(V(bt), {
                    field: { ...f, ...a.customFields[f.handle] },
                    card: a
                  }, null, 8, ["field", "card"])
                ]))), 128))
              ])
            ]),
            _: 2
          }, 1024))), 256))
        ])
      ], 64);
    };
  }
});
document.addEventListener("taskday:init", () => {
  Taskday.register("table", {
    views: [
      { id: "performing-table", name: "Table", component: At }
    ]
  });
});
