(function(s){typeof define=="function"&&define.amd?define(s):s()})(function(){"use strict";const s=window.Vue.defineComponent,e=window.Vue.createElementVNode,t=window.Vue.unref,d=window.Vue.createVNode,V=window.Vue.withModifiers,c=window.Vue.renderList,u=window.Vue.Fragment,o=window.Vue.openBlock,r=window.Vue.createElementBlock,f=window.Vue.toDisplayString,_=window.Vue.createTextVNode,l=window.Vue.withCtx,a=window.Vue.createBlock,h={class:"w-full"},C=e("thead",null,[e("tr",null,[e("th",{class:"px-2 py-1 text-left"},"Title"),e("th",{class:"px-2 py-1 text-left"})])],-1),y={class:"divide-y"},k={colspan:"99"},x=["onSubmit"],b={class:"px-2 py-2"},F=e("span",null,null,-1),j={class:"px-2 py-2"},g={class:"flex justify-end items-center space-x-2 w-full"},B=window.Components.VFormInput,N=window.Components.VFieldWrapper,v=window.Components.VCard,E=window.Components.VContainer,L=window.Components.VLink,T=window.Components.useCardForm,S=s({props:{project:{tyoe:Object,required:!0}},setup(i){const D=i,{form:w,store:I}=T();function M(){I(D.project)}return(W,p)=>(o(),a(t(E),null,{default:l(()=>[d(t(v),null,{default:l(()=>[e("table",h,[C,e("tbody",y,[e("tr",null,[e("td",k,[e("form",{onSubmit:V(M,["prevent"])},[d(t(B),{placeholder:"Create a card...",modelValue:t(w).title,"onUpdate:modelValue":p[0]||(p[0]=n=>t(w).title=n)},null,8,["modelValue"])],40,x)])]),(o(!0),r(u,null,c(i.project.cards,n=>(o(),r("tr",{key:i.project.id+"-"+n.id},[e("td",b,[d(t(L),{href:W.route("cards.show",n)},{default:l(()=>[_(f(n.title),1)]),_:2},1032,["href"]),F]),e("td",j,[e("div",g,[(o(!0),r(u,null,c(i.project.fields,m=>(o(),a(t(N),{key:m.id,card:n,field:m},null,8,["card","field"]))),128))])])]))),128))])])]),_:1})]),_:1}))}});document.addEventListener("taskday:init",()=>{Taskday.register("table",{views:[{id:"performing-table",name:"Table",component:S}]})})});
