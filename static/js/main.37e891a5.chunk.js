(this.webpackJsonpfamco=this.webpackJsonpfamco||[]).push([[0],{73:function(e,t,a){},74:function(e,t,a){"use strict";a.r(t);var c=a(10),n=a.n(c),r=a(49),s=a.n(r),i=a(0),o=a.n(i),j=a(3),u=a(12),l=a(34),b=a(16),d=a(50),O=a(33),m=(a(62),a(22)),p=a(51),f=Object(d.a)({apiKey:"AIzaSyBCwHqt6cU2CBAkQIR-hjNlng9JNcxzjCw",authDomain:"famco-873ce.firebaseapp.com",projectId:"famco-873ce",storageBucket:"famco-873ce.appspot.com",messagingSenderId:"916925828504",appId:"1:916925828504:web:5855919e3bbb250d6a2fed"}),h=Object(O.c)(f),x=Object(m.d)(),v=Object(p.a)(),g=a(18),N=a(52),k=a.p+"static/media/FAMCO.79983dba.png",w=a(5),y=function(e){e.userObj;var t=Object(c.useState)(""),a=Object(u.a)(t,2),n=a[0],r=a[1],s=Object(c.useState)(""),i=Object(u.a)(s,2),l=i[0],b=i[1],d=Object(c.useState)(!0),m=Object(u.a)(d,2),p=m[0],f=m[1],x=Object(c.useState)(""),v=Object(u.a)(x,2),y=v[0],S=v[1],F=function(e){var t=e.target,a=t.name,c=t.value;"email"===a?r(c):"password"===a&&b(c)},I=function(){var e=Object(j.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),e.prev=1,!p){e.next=8;break}return e.next=5,Object(O.b)(h,n,l);case 5:e.sent,e.next=11;break;case 8:return e.next=10,Object(O.d)(h,n,l);case 10:e.sent;case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(1),S(e.t0.message);case 16:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t){return e.apply(this,arguments)}}(),C=function(){var e=Object(j.a)(o.a.mark((function e(t){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"google"===t.target.name&&(a=new O.a),e.next=4,Object(O.e)(h,a);case 4:e.sent;case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(w.jsxs)("div",{className:"authContainer",children:[Object(w.jsx)("img",{src:k,className:"authIcon"}),Object(w.jsxs)("form",{onSubmit:I,className:"container",children:[Object(w.jsx)("input",{name:"email",type:"email",placeholder:"Email",value:n,onChange:F,className:"authInput",required:!0}),Object(w.jsx)("input",{name:"password",type:"password",placeholder:"Password",value:l,onChange:F,className:"authInput",required:!0}),Object(w.jsx)("input",{type:"submit",className:"authInput authSubmit",value:p?"Create Account":"Log In"}),y&&Object(w.jsx)("span",{className:"authError",children:y})]}),Object(w.jsx)("span",{onClick:function(){return f((function(e){return!e}))},className:"authSwitch",children:p?"Sign in":"Create Account"}),Object(w.jsx)("div",{className:"authBtns",children:Object(w.jsxs)("button",{onClick:C,name:"google",className:"authBtn",children:[Object(w.jsx)("span",{className:"authBtn__span",children:"Continue with Google"}),Object(w.jsx)(g.a,{icon:N.a,className:"google"})]})})]})},S=(a(15),a(31)),F=a(24),I=a(20),C=a.p+"static/media/heart1.5041d0a0.png",M=a.p+"static/media/heart2.cb2fc326.png",_=function(e){var t=e.FamcoMsgObj,a=e.isOwner,n=e.userObj,r=Object(c.useState)(!1),s=Object(u.a)(r,2),i=s[0],l=s[1],b=Object(c.useState)(t.text),d=Object(u.a)(b,2),O=d[0],p=d[1],f=Object(m.c)(x,"NewFamcoMsg","".concat(t.id)),h=Object(c.useState)(!1),N=Object(u.a)(h,2),k=N[0],y=N[1],S=Object(c.useState)(!1),_=Object(u.a)(S,2),U=_[0],A=_[1],D=Object(c.useState)(!1),E=Object(u.a)(D,2),L=E[0],B=E[1],P=t.likedName.indexOf(n.uid),T=function(){var e=Object(j.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Are you sure you want to delete the famco message?")){e.next=7;break}return e.next=4,Object(m.b)(f);case 4:if(!t.attachmentUrl){e.next=7;break}return e.next=7,Object(F.a)(Object(F.d)(v,t.attachmentUrl));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),V=function(){return l((function(e){return!e}))},q=function(){var e=Object(j.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,Object(m.e)(f,{text:O});case 3:l(!1);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){"ADMIN"===t.name?y(!0):A(!1),L&&(P<=0&&Object(m.e)(f,{likes:t.likes+1,likedName:t.likedName+","+n.uid}),-1!==P&&t.likes>0&&Object(m.e)(f,{likes:t.likes-1,likedName:t.likedName.replace(","+n.uid,"")}))}),[U]);return Object(w.jsx)("div",{className:"famcoMsg",children:i?Object(w.jsxs)(w.Fragment,{children:[Object(w.jsxs)("form",{onSubmit:q,className:"container famcoMsgEdit",children:[Object(w.jsx)("textarea",{type:"text",placeholder:"Edit your Famco message",value:O,required:!0,autoFocus:!0,onChange:function(e){var t=e.target.value;p(t)},className:"famcoMsgInput",maxLength:"120"}),Object(w.jsx)("input",{type:"submit",value:"Update",className:"formBtn"})]}),Object(w.jsx)("span",{onClick:V,className:"formBtn cancelBtn",children:"Cancel"})]}):Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("h5",{className:"FamcoMsgCreatedDate",children:t.uploadedDate}),Object(w.jsx)("h4",{className:"famcoMsgText",children:t.attachmentUrl&&Object(w.jsx)("img",{src:t.attachmentUrl,className:"famcoAttachedImg"})}),t.text,Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),Object(w.jsxs)("div",{className:"FamcoMsgLikes",children:[Object(w.jsx)("img",{src:-1!==P?M:C,onClick:function(){B(!0),A((function(e){return!e}))}}),Object(w.jsx)("span",{children:t.likes})]}),a?Object(w.jsxs)("h5",{className:"famcoOwner",children:[" ",n.displayName]}):Object(w.jsxs)("h5",{className:"famcoOtherOwners",children:[" ",t.name]}),k?Object(w.jsx)(g.a,{icon:I.a,className:"megaphone"}):Object(w.jsx)(w.Fragment,{children:" "}),a&&Object(w.jsxs)("div",{className:"famcoMsg__actions",children:[Object(w.jsx)("span",{onClick:V,children:Object(w.jsx)(g.a,{icon:I.d})}),Object(w.jsx)("span",{onClick:T,children:Object(w.jsx)(g.a,{icon:I.g})})]})]})})},U=a(75),A=a(11),D=function(e){var t=e.userObj,a=Object(c.useState)(""),n=Object(u.a)(a,2),r=n[0],s=n[1],i=Object(c.useState)([]),l=Object(u.a)(i,2),b=l[0],d=l[1],O=Object(c.useState)(""),m=Object(u.a)(O,2),p=m[0],f=m[1],h=Object(c.useState)(!1),N=Object(u.a)(h,2),k=N[0],y=N[1],C=Object(c.useState)(!1),M=Object(u.a)(C,2),D=M[0],E=M[1],L=new Date,B=String(L.getFullYear()),P=String(L.getMonth()+1).padStart(2,"0"),T=String(L.getDate()).padStart(2,"0"),V=String(L.getHours()).padStart(2,"0"),q=String(L.getMinutes()).padStart(2,"0"),J=function(){var e=Object(j.a)(o.a.mark((function e(){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(A.j)(Object(A.b)(x,"UserInfo"),Object(A.l)("creatorId","==",t.uid)),e.next=3,Object(A.f)(a);case 3:e.sent.forEach((function(){E(!0)}));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){J();var e=Object(A.j)(Object(A.b)(x,"NewFamcoMsg"),Object(A.i)("createdAt","desc"));Object(A.h)(e,(function(e){var t=e.docs.map((function(e){return Object(S.a)({id:e.id},e.data())}));d(t)}))}),[]);var H=function(){var e=Object(j.a)(o.a.mark((function e(a){var c,n,i,j;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),c="",""===p){e.next=10;break}return n=Object(F.d)(v,"".concat(t.uid,"/").concat(Object(U.a)())),e.next=6,Object(F.e)(n,p,"data_url");case 6:return i=e.sent,e.next=9,Object(F.b)(i.ref);case 9:c=e.sent;case 10:return j={text:r,createdAt:Date.now(),creatorId:t.uid,name:t.displayName,uploadedDate:B+"/"+P+"/"+T+" At "+V+" : "+q,likes:0,likedName:"",attachmentUrl:c},e.prev=11,e.next=14,Object(A.a)(Object(A.b)(x,"NewFamcoMsg"),j);case 14:e.next=18;break;case 16:e.prev=16,e.t0=e.catch(11);case 18:s(""),f(""),y(!1);case 21:case"end":return e.stop()}}),e,null,[[11,16]])})));return function(t){return e.apply(this,arguments)}}();return Object(w.jsxs)("div",{className:"container",children:[Object(w.jsx)("form",{onSubmit:H,className:"famcoMsgForm",children:Object(w.jsxs)("div",{className:"famcoMsgInput__container",children:[D?Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("textarea",{className:"famcoMsgInput__input",value:r,onChange:function(e){var t=e.target.value;s(t)},type:"text",placeholder:" What's on your mind?",maxLength:"120",required:!0}),Object(w.jsx)("input",{type:"submit",value:"Post",className:"famcoMsgInput__post"}),k?Object(w.jsx)(w.Fragment,{}):Object(w.jsxs)(w.Fragment,{children:[Object(w.jsxs)("label",{htmlFor:"attach-file",className:"famcoMsgInput__label",children:[Object(w.jsx)(g.a,{icon:I.e}),Object(w.jsx)("span",{children:" Add photo"})]}),Object(w.jsx)("input",{className:"famcoMsgInput__labelChild",id:"attach-file",type:"file",accept:"image/*",onChange:function(e){var t=e.target.files[0],a=new FileReader;a.onloadend=function(e){var t=e.currentTarget.result;f(t)},y(!0),a.readAsDataURL(t)}})]})]}):Object(w.jsx)("div",{className:"noUserName",children:"Add infomation on your profile to start"}),p&&Object(w.jsxs)("div",{className:"famcoMsgForm__attachment",children:[Object(w.jsx)("img",{src:p}),Object(w.jsx)("div",{className:"famcoMsgForm__clear",onClick:function(e){y(!1),f("")},children:Object(w.jsx)(g.a,{icon:I.f})})]})]})}),Object(w.jsx)("div",{style:{marginTop:30},children:b.map((function(e){return Object(w.jsx)(_,{FamcoMsgObj:e,isOwner:e.creatorId===t.uid,userObj:t},e.id)}))})]})},E=a.p+"static/media/kokoatalk2.f2884164.PNG",L=a.p+"static/media/checkInvestingScore.52797942.PNG",B=function(){return Object(w.jsx)(w.Fragment,{children:Object(w.jsxs)("div",{className:"container",children:[Object(w.jsxs)("div",{className:"aboutHeader",children:[Object(w.jsx)("span",{children:"Welcome to Famco world! "}),Object(w.jsx)("span",{children:"Share your story to the world. "})]}),Object(w.jsxs)("div",{className:"aboutFamco",children:[Object(w.jsx)(g.a,{icon:I.e}),Object(w.jsx)("span",{children:"Famco is a Mobile-Friendly web application that people can share stories. This web is built on React(hook) and Firebase."})]}),Object(w.jsxs)("div",{className:"aboutMe",children:[Object(w.jsx)(g.a,{icon:I.b}),Object(w.jsx)("span",{children:"Hello, I am Jay."}),Object(w.jsx)("span",{children:"Please check my other web-apps out below."})]}),Object(w.jsxs)("div",{className:"aboutPortfolio",children:[Object(w.jsx)("span",{children:"- Javior( Vanilla JS & CSS & HTML) -"}),Object(w.jsx)("a",{href:"https://jay2009.github.io/chrome_app/index.html",children:Object(w.jsx)("img",{src:L,className:"kokoatalk2"})}),Object(w.jsx)("span",{children:"Check your stock investment score ! "}),Object(w.jsx)("br",{}),Object(w.jsx)("a",{href:"https://jay2009.github.io/chrome_app/index.html",children:"Link "})]}),Object(w.jsxs)("div",{className:"aboutPortfolio",children:[Object(w.jsx)("span",{children:"- Kokoa clone(CSS & HTML) -"}),Object(w.jsx)("a",{href:"https://jay2009.github.io/kokoa-clone-2020/",children:Object(w.jsx)("img",{src:E,className:"kokoatalk2"})}),Object(w.jsx)("span",{children:"Dosen't it look pretty familiar to you? "}),Object(w.jsx)("br",{}),Object(w.jsx)("a",{href:"https://jay2009.github.io/kokoa-clone-2020/",children:"Link "})]}),Object(w.jsxs)("div",{className:"aboutContact",children:[Object(w.jsx)("span",{children:"Check other projects on"}),Object(w.jsxs)("span",{children:["Github : ",Object(w.jsx)("a",{href:"https://github.com/Jay2009",children:"https://github.com/Jay2009 "})]}),Object(w.jsx)("br",{}),Object(w.jsx)("span",{children:"Contact : jaem2009@naver.com "})]})]})})},P=a.p+"static/media/cuteCrown.8d0b09b9.png",T=function(e){var t=e.userObj,a=function(){window.scrollTo(0,0)},n=Object(c.useState)(!1),r=Object(u.a)(n,2),s=r[0],i=r[1],b=function(){var e=Object(j.a)(o.a.mark((function e(){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(A.j)(Object(A.b)(x,"UserInfo"),Object(A.l)("creatorId","==",t.uid)),e.next=3,Object(A.f)(a);case 3:e.sent.forEach(function(){var e=Object(j.a)(o.a.mark((function e(t){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(A.d)(x,"UserInfo","".concat(t.id)),e.next=3,Object(A.e)(a);case 3:"jandc914"===e.sent.data().vip&&i(!0);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){b()}),[]),Object(w.jsx)("nav",{className:"navigation",children:Object(w.jsxs)("div",{className:"navigation__position",children:[Object(w.jsxs)("ul",{className:"navigation__Icons",children:[Object(w.jsx)("li",{className:"navLogo",children:Object(w.jsx)(l.b,{className:"logo",to:"/",onClick:a,children:Object(w.jsx)("img",{src:k})})}),Object(w.jsx)("li",{className:"navUser",children:Object(w.jsx)(l.b,{to:"/profile",onClick:a,children:Object(w.jsx)(g.a,{icon:I.h,color:"#04AAFF",size:"2x"})})}),Object(w.jsx)("li",{className:"navAbout",children:Object(w.jsx)(l.b,{to:"/about",onClick:a,children:Object(w.jsx)(g.a,{icon:I.c,color:"#04AAFF",size:"2x"})})})]}),Object(w.jsx)("div",{className:"navuser__name",children:Object(w.jsx)("span",{className:"displayUserName",children:t.displayName?"".concat(t.displayName):"Profile"})}),s?Object(w.jsx)("li",{className:"navVip",children:Object(w.jsx)(l.b,{to:"/vip",onClick:a,children:Object(w.jsx)("img",{src:P})})}):Object(w.jsx)(w.Fragment,{})]})})},V=a(39),q=function(e){var t=e.refreshUser,a=e.userObj,n=Object(b.e)(),r=Object(c.useState)(a.displayName),s=Object(u.a)(r,2),i=s[0],l=s[1],d=Object(c.useState)([]),O=Object(u.a)(d,2),p=(O[0],O[1]),f=!1,v=!1,g=!1,N=function(){var e=Object(j.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Object(A.j)(Object(A.b)(x,"UserInfo"),Object(A.l)("creatorId","==",a.uid)),e.next=3,Object(A.f)(t);case 3:e.sent.forEach((function(e){v=!0,f=!0}));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(j.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Object(A.j)(Object(A.b)(x,"UserInfo"),Object(A.l)("name","==",i)),e.next=3,Object(A.f)(t);case 3:e.sent.forEach((function(e){g=!0}));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=Object(j.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("google.com"!==h.currentUser.providerData[0].providerId){e.next=21;break}return e.next=4,N();case 4:if(!1!==v){e.next=21;break}return e.next=7,k();case 7:if(!1!==g){e.next=19;break}return t={createdAt:Date.now(),creatorId:a.uid,name:i,whatPostLiked:""},e.prev=9,e.next=12,Object(m.a)(Object(A.b)(x,"UserInfo"),t);case 12:e.sent,e.next=17;break;case 15:e.prev=15,e.t0=e.catch(9);case 17:e.next=21;break;case 19:alert(" nickname is already in use."),l("");case 21:case"end":return e.stop()}}),e,null,[[9,15]])})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){var e=Object(A.j)(Object(A.b)(x,"UserInfo"),Object(A.i)("createdAt","desc"));Object(A.h)(e,(function(e){var t=e.docs.map((function(e){return Object(S.a)({id:e.id},e.data())}));p(t)})),y()}),[]);var F=function(){var e=Object(j.a)(o.a.mark((function e(c){var n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c.preventDefault(),!(i.length>2)){e.next=52;break}return e.next=4,N();case 4:if(n={creatorId:a.uid,name:i,createdAt:Date.now(),whatPostLiked:""},!1!==f){e.next=29;break}return e.next=8,k();case 8:if(!1!==g){e.next=25;break}return e.prev=9,e.next=12,Object(m.a)(Object(A.b)(x,"UserInfo"),n);case 12:e.next=16;break;case 14:e.prev=14,e.t0=e.catch(9);case 16:return e.t1=V.f,e.next=19,h.currentUser;case 19:return e.t2=e.sent,e.t3={displayName:i},e.next=23,(0,e.t1)(e.t2,e.t3);case 23:e.next=27;break;case 25:alert("Nick name is already in use"),l("");case 27:e.next=49;break;case 29:return e.next=31,k();case 31:if(!1!==g){e.next=47;break}return r=Object(A.j)(Object(A.b)(x,"UserInfo"),Object(A.l)("creatorId","==",a.uid)),e.next=35,Object(A.f)(r);case 35:return e.sent.forEach(function(){var e=Object(j.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(m.e)(Object(m.c)(x,"UserInfo","".concat(t.id)),{name:i});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.t4=V.f,e.next=40,h.currentUser;case 40:return e.t5=e.sent,e.t6={displayName:i},e.next=44,(0,e.t4)(e.t5,e.t6);case 44:alert("Update success !"),e.next=49;break;case 47:alert("the user nickname already in use"),l("");case 49:t(i),e.next=53;break;case 52:alert("Name should be more than 2 chracters");case 53:case"end":return e.stop()}}),e,null,[[9,14]])})));return function(t){return e.apply(this,arguments)}}();return Object(w.jsxs)("div",{className:"container",children:[Object(w.jsx)("input",{onChange:function(e){var t=e.target.value;l(t.trim())},type:"text",placeholder:"Write your user name",value:i,maxLength:"12",required:!0,autoFocus:!0,className:"profileFormInput"}),Object(w.jsx)("input",{type:"submit",onClick:F,value:"Update name",className:"profileFormBtn"}),Object(w.jsx)("span",{className:"profileFormBtn cancelBtn logOut",onClick:function(){h.signOut(),n.push("/")},children:"Log Out"}),Object(w.jsx)("span",{className:"formSpace",children:" "})]})},J=function(e){var t=e.FamcoVipObj,a=e.isOwner,n=e.userObj,r=Object(c.useState)(!1),s=Object(u.a)(r,2),i=s[0],l=s[1],b=Object(c.useState)(t.text),d=Object(u.a)(b,2),O=d[0],p=d[1],f=Object(m.c)(x,"NewFamcoVip","".concat(t.id)),h=Object(c.useState)(!1),N=Object(u.a)(h,2),k=N[0],y=N[1],S=Object(c.useState)(!1),_=Object(u.a)(S,2),U=_[0],A=_[1],D=t.likedName.indexOf(n.uid),E=function(){var e=Object(j.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Are you sure you want to delete the famco message?")){e.next=7;break}return e.next=4,Object(m.b)(f);case 4:if(!t.attachmentUrl){e.next=7;break}return e.next=7,Object(F.a)(Object(F.d)(v,t.attachmentUrl));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),L=function(){return l((function(e){return!e}))},B=function(){var e=Object(j.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,Object(m.e)(f,{text:O});case 3:l(!1);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){U&&(D<=0&&Object(m.e)(f,{likes:t.likes+1,likedName:t.likedName+","+n.uid}),-1!==D&&t.likes>0&&Object(m.e)(f,{likes:t.likes-1,likedName:t.likedName.replace(","+n.uid,"")}))}),[k]);return Object(w.jsx)("div",{className:"famcoMsg famcoVip",children:i?Object(w.jsxs)(w.Fragment,{children:[Object(w.jsxs)("form",{onSubmit:B,className:"container famcoMsgEdit",children:[Object(w.jsx)("textarea",{type:"text",placeholder:"Edit your Famco message",value:O,required:!0,autoFocus:!0,onChange:function(e){var t=e.target.value;p(t)},className:"famcoMsgInput",maxLength:"120"}),Object(w.jsx)("input",{type:"submit",value:"Update",className:"formBtn"})]}),Object(w.jsx)("span",{onClick:L,className:"formBtn cancelBtn",children:"Cancel"})]}):Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("img",{src:P,className:"vipTag"}),Object(w.jsx)("h5",{className:"FamcoMsgCreatedDate",children:t.uploadedDate}),Object(w.jsx)("h4",{className:"famcoMsgText",children:t.attachmentUrl&&Object(w.jsx)("img",{src:t.attachmentUrl,className:"famcoAttachedImg"})}),t.text,Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),Object(w.jsxs)("div",{className:"FamcoMsgLikes",children:[Object(w.jsx)("img",{src:-1!==D?M:C,onClick:function(){A(!0),y((function(e){return!e}))}}),Object(w.jsx)("span",{children:t.likes})]}),a?Object(w.jsxs)("h5",{className:"famcoOwner",children:[" ",n.displayName]}):Object(w.jsxs)("h5",{className:"famcoOtherOwners",children:[" ",t.name]}),a&&Object(w.jsxs)("div",{className:"famcoMsg__actions",children:[Object(w.jsx)("span",{onClick:L,children:Object(w.jsx)(g.a,{icon:I.d})}),Object(w.jsx)("span",{onClick:E,children:Object(w.jsx)(g.a,{icon:I.g})})]})]})})},H=function(e){var t=e.userObj,a=Object(c.useState)(""),n=Object(u.a)(a,2),r=n[0],s=n[1],i=Object(c.useState)([]),l=Object(u.a)(i,2),b=l[0],d=l[1],O=Object(c.useState)(""),m=Object(u.a)(O,2),p=m[0],f=m[1],h=Object(c.useState)(!1),N=Object(u.a)(h,2),k=N[0],y=N[1],C=Object(c.useState)(!1),M=Object(u.a)(C,2),_=M[0],D=M[1],E=Object(c.useState)(!1),L=Object(u.a)(E,2),B=L[0],P=L[1],T=new Date,V=String(T.getFullYear()),q=String(T.getMonth()+1).padStart(2,"0"),H=String(T.getDate()).padStart(2,"0"),R=String(T.getHours()).padStart(2,"0"),W=String(T.getMinutes()).padStart(2,"0"),z=function(){var e=Object(j.a)(o.a.mark((function e(){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(A.j)(Object(A.b)(x,"UserInfo"),Object(A.l)("creatorId","==",t.uid)),e.next=3,Object(A.f)(a);case 3:e.sent.forEach(function(){var e=Object(j.a)(o.a.mark((function e(t){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(A.d)(x,"UserInfo","".concat(t.id)),e.next=3,Object(A.e)(a);case 3:"jandc914"===e.sent.data().vip&&P(!0);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),G=function(){var e=Object(j.a)(o.a.mark((function e(){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return z(),a=Object(A.j)(Object(A.b)(x,"UserInfo"),Object(A.l)("creatorId","==",t.uid)),e.next=4,Object(A.f)(a);case 4:e.sent.forEach((function(){D(!0)}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){G();var e=Object(A.j)(Object(A.b)(x,"NewFamcoVip"),Object(A.i)("createdAt","desc"));Object(A.h)(e,(function(e){var t=e.docs.map((function(e){return Object(S.a)({id:e.id},e.data())}));d(t)}))}),[]);var Y=function(){var e=Object(j.a)(o.a.mark((function e(a){var c,n,i,j;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),c="",""===p){e.next=10;break}return n=Object(F.d)(v,"".concat(t.uid,"/").concat(Object(U.a)())),e.next=6,Object(F.e)(n,p,"data_url");case 6:return i=e.sent,e.next=9,Object(F.b)(i.ref);case 9:c=e.sent;case 10:return j={text:r,createdAt:Date.now(),creatorId:t.uid,name:t.displayName,uploadedDate:V+"/"+q+"/"+H+" At "+R+" : "+W,likes:0,likedName:"",attachmentUrl:c},e.prev=11,e.next=14,Object(A.a)(Object(A.b)(x,"NewFamcoVip"),j);case 14:e.next=18;break;case 16:e.prev=16,e.t0=e.catch(11);case 18:s(""),f(""),y(!1);case 21:case"end":return e.stop()}}),e,null,[[11,16]])})));return function(t){return e.apply(this,arguments)}}();return Object(w.jsx)(w.Fragment,{children:B?Object(w.jsxs)("div",{className:"container",children:[Object(w.jsx)("span",{className:"vip__span",children:"Welcome to VIP room!"}),Object(w.jsx)("form",{onSubmit:Y,className:"famcoMsgForm",children:Object(w.jsxs)("div",{className:"famcoMsgInput__container",children:[_?Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("textarea",{className:"famcoMsgInput__input",value:r,onChange:function(e){var t=e.target.value;s(t)},type:"text",placeholder:" What's on your mind?",maxLength:"120",required:!0}),Object(w.jsx)("input",{type:"submit",value:"Post",className:"famcoMsgInput__post"}),k?Object(w.jsx)(w.Fragment,{}):Object(w.jsxs)(w.Fragment,{children:[Object(w.jsxs)("label",{htmlFor:"attach-file",className:"famcoMsgInput__label",children:[Object(w.jsx)(g.a,{icon:I.e}),Object(w.jsx)("span",{children:" Add photo"})]}),Object(w.jsx)("input",{className:"famcoMsgInput__labelChild",id:"attach-file",type:"file",accept:"image/*",onChange:function(e){var t=e.target.files[0],a=new FileReader;a.onloadend=function(e){var t=e.currentTarget.result;f(t)},y(!0),a.readAsDataURL(t)}})]})]}):Object(w.jsx)("div",{className:"noUserName",children:"Add infomation on your profile to start"}),p&&Object(w.jsxs)("div",{className:"famcoMsgForm__attachment",children:[Object(w.jsx)("img",{src:p}),Object(w.jsx)("div",{className:"famcoMsgForm__clear",onClick:function(e){y(!1),f("")},children:Object(w.jsx)(g.a,{icon:I.f})})]})]})}),Object(w.jsx)("div",{style:{marginTop:30},children:b.map((function(e){return Object(w.jsx)(J,{FamcoVipObj:e,isOwner:e.creatorId===t.uid,userObj:t},e.id)}))})]}):Object(w.jsx)("span",{className:"vip__span",children:" You need the access for VIP room."})})},R=function(e){var t=e.refreshUser,a=e.isLoggedIn,c=e.userObj,n=e.NewFamcoMsg;return Object(w.jsxs)(l.a,{children:[Object(w.jsx)("div",{style:{position:"relative"},children:a&&Object(w.jsx)(T,{userObj:c})}),a?Object(w.jsxs)("div",{style:{maxWidth:890,width:"100%",margin:"0 auto",marginTop:100,display:"flex",justifyContent:"center"},children:[Object(w.jsx)(b.a,{exact:!0,path:"/",children:Object(w.jsx)(D,{userObj:c})}),Object(w.jsx)(b.a,{exact:!0,path:"/profile",children:Object(w.jsx)(q,{userObj:c,refreshUser:t,FamcoMsgObj:n})}),Object(w.jsx)(b.a,{exact:!0,path:"/about",children:Object(w.jsx)(B,{userObj:c})}),Object(w.jsx)(b.a,{eact:!0,path:"/vip",children:Object(w.jsx)(H,{userObj:c})})]}):Object(w.jsx)(w.Fragment,{children:Object(w.jsx)(b.a,{exact:!0,path:"/",children:Object(w.jsx)(y,{})})})]})};var W=function(){var e=Object(c.useState)(!1),t=Object(u.a)(e,2),a=t[0],n=t[1],r=Object(c.useState)(null),s=Object(u.a)(r,2),i=s[0],l=s[1];return Object(c.useEffect)((function(){h.onAuthStateChanged(function(){var e=Object(j.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l(t?{displayName:t.displayName,uid:t.uid,vip:"",updateProfile:function(e){return t.updateProfile(e)}}:null),n(!0);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]),Object(w.jsxs)(w.Fragment,{children:[a?Object(w.jsx)(R,{refreshUser:function(){var e=h.currentUser;l({displayName:e.displayName,uid:e.uid,vip:"",updateProfile:function(t){return e.updateProfile(t)}})},isLoggedIn:Boolean(i),userObj:i}):"Initializing...",Object(w.jsxs)("footer",{className:"footer",children:["\xa9 ",(new Date).getFullYear()," Famco"]})]})};a(73);s.a.render(Object(w.jsx)(n.a.StrictMode,{children:Object(w.jsx)(W,{})}),document.getElementById("root"))}},[[74,1,2]]]);
//# sourceMappingURL=main.37e891a5.chunk.js.map