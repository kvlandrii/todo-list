"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[392],{392:(e,t,s)=>{s.r(t),s.d(t,{default:()=>c});var a=s(791),n=s(894),o=s(689),r=s(294),l=s(184);const c=()=>{const[e,t]=(0,a.useState)(!1),[s,c]=(0,a.useState)(!1),[i,d]=(0,a.useState)(!1),[h,g]=(0,a.useState)(!1),[p,u]=(0,a.useState)(!1),m=(0,a.useRef)(),x=(0,o.s0)(),j="https://kvlandriitodos.onrender.com/users",{setId:S,login:_,setLogin:f,password:w,setPassword:v,setIsAuthenticated:b}=(0,a.useContext)(n.O);return(0,l.jsxs)(l.Fragment,{children:[e&&(0,l.jsx)("p",{children:"Wrong length of login or password"}),s&&(0,l.jsx)("p",{children:"Wrong login or password"}),h&&(0,l.jsx)("p",{children:"Sign Up Successful"}),i&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("p",{children:"User with this login already exists"}),(0,l.jsx)("p",{children:"Try to Sign In"})]}),(0,l.jsxs)("div",{className:"form",children:[(0,l.jsx)("input",{type:"text",placeholder:"Login",onChange:e=>{f(e.target.value),localStorage.setItem("login",e.target.value)},value:_,className:"form__input"}),(0,l.jsx)("input",{type:"password",ref:m,placeholder:"Password",onChange:e=>{v(e.target.value),localStorage.setItem("password",e.target.value)},value:w,className:"form__input"}),(0,l.jsxs)("div",{className:"form__checkbox-container",children:[(0,l.jsx)("input",{type:"checkbox",checked:p,onChange:()=>{m.current.type=p?"password":"text",u(!p)},className:"form__input"}),(0,l.jsx)("span",{children:"Show password"})]}),(0,l.jsxs)("div",{className:"form__button-container",children:[(0,l.jsx)("button",{onClick:()=>{t(!1),c(!1),d(!1),g(!1),_.length>3&&w.length>3&&_.length<15&&w.length<15?r.Z.get(j,{params:{login:_,password:w}}).then((e=>{e.data.length?(S(e.data[0].id),localStorage.setItem("id",e.data[0].id),b(!0),localStorage.setItem("isAuthenticated",!0),x("/todo-list/todo")):(t(!1),c(!0))})).catch((e=>{console.error(e)})):(t(!0),c(!1))},className:"form__button",children:"Sign In"}),(0,l.jsx)("button",{onClick:()=>{t(!1),c(!1),d(!1),g(!1),_.length>3&&w.length>3&&_.length<15&&w.length<15?r.Z.get(j,{params:{login:_}}).then((e=>{e.data.length?d(!0):r.Z.post(j,{id:Math.random().toString(36).substr(2,9),login:_,password:w,todos:[]}).then((()=>{g(!0)})).catch((e=>{console.error(e)}))})).catch((e=>{console.error(e)})):t(!0)},className:"form__button",children:"Sign Up"})]})]})]})}}}]);
//# sourceMappingURL=392.523aaeff.chunk.js.map