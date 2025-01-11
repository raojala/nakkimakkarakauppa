(()=>{"use strict";var e,t={235:(e,t,a)=>{var l=a(540),r=a(338),n=a(181);const s=a.p+"2b5215879e8ba106431f.png",m=a.p+"f7a734cc6562d4809617.png",c=a.p+"c392ef40d4ca6012fceb.png",i=a.p+"a6daf7c3f0125501057e.png",o=a.p+"5c45ea617f53009a2dd1.png",d=a.p+"fc3783754b98e87c6ade.png";function p(e=10){return Math.random().toString(36).substring(2,e)}const u=({picture:e,alt:t})=>l.createElement("img",{className:"w-44",src:e,alt:t}),g=[{name:"Elias",title:"Designer / Developer",image:l.createElement(u,{picture:s,alt:"Elias"}),description:"Game design genius, pixel art alchemist and jack-of-all-trades programmer."},{name:"Erika",title:"Artist",image:l.createElement(u,{picture:m,alt:"Erika"}),description:"Art conjurer who can grant any wish related to getting something drawn."},{name:"Miikka",title:"CEO",image:l.createElement(u,{picture:c,alt:"Miikka"}),description:"Industry veteran, frontline tactician and bulwark of the party."},{name:"Rami",title:"Developer",image:l.createElement(u,{picture:i,alt:"Rami"}),description:"Code wizard of the highest level who has fully mastered the dark arts of programming the impossible."},{name:"Santtu",title:"Composer / Marketing",image:l.createElement(u,{picture:o,alt:"Santtu"}),description:"The renowned bard who brings the audience to the stuff we make and do."},{name:"Taru",title:"Developer",image:l.createElement(u,{picture:d,alt:"Taru"}),description:"Experienced code mage with knack for making very complicated things simple."}],b=()=>g.map((e=>l.createElement("div",{key:p(),className:"team-member text mr-auto max-w-44 space-y-1 break-words text-xs"},l.createElement("div",{className:"font-bold uppercase"},e.name),l.createElement("div",null,e.title),e.image,l.createElement("div",null,e.description)))),f=()=>l.createElement("div",{className:""},l.createElement("div",{className:"space-y-2"},l.createElement("h1",{className:"mb-2",id:"About"},"About"),l.createElement("p",null,"We are Pepperbox Studios!"),l.createElement("p",null,"We're a small, passionate indie game studio from Finland dedicated to crafting unique and innovative games for PC and mobile. Our games are designed to inspire and captivate, offering players challenging adventures and creative experiences that leave a lasting impact."),l.createElement("p",null,"Our mission is to push the limits of what a small team can achieve by delivering imaginative, high-quality games that connect with players worldwide. Whether it's an intense challenge or an immersive story, we aim to create experiences that resonate and redefine what indie games can be.")),l.createElement("h2",{className:"my-2 mt-4"},"Team"),l.createElement("div",{className:"grid grid-cols-3 gap-3"},l.createElement(b,null))),h=a.p+"3375c8c40b8e5a256afa.png",E=a.p+"4710f598f038168a2b2e.png",v=a.p+"a553ac462c408c7bbd5b.png",w=a.p+"0f0fb6393b66100b199c.png",y=a.p+"8d3ba975d80b6a219b04.png",x=a.p+"83c632d54b247bc80438.png",N=a.p+"1d308fda80f8b310eb00.png",k=a.p+"4b56efb879a75b53bb5d.png",O=a.p+"4f5c5eeb39ce5a8af082.png",S=a.p+"322abc7fb696c06f71ef.png",C=a.p+"assets/icons/icons.50cde7dc.svg",j=({id:e,width:t=16,height:a=16,scale:r,className:n})=>l.createElement("svg",{className:n,width:t,height:a,style:{transform:`scale(${r})`}},l.createElement("use",{href:`${C}#${e}`})),F=[{src:h,type:"image"},{src:"https://www.youtube.com/embed/N79kb2XGcUE?si=CqFvXgEaXdoyzYvJ&autoplay=1",thumbnailId:"N79kb2XGcUE",type:"video"},{src:"https://www.youtube.com/embed/jJDVy5BhzFI?si=tZvSK8zJj1O8GzGR&autoplay=1",thumbnailId:"jJDVy5BhzFI",type:"video"},{src:E,type:"image"},{src:v,type:"image"},{src:w,type:"image"},{src:y,type:"image"},{src:x,type:"image"},{src:N,type:"image"},{src:k,type:"image"},{src:O,type:"image"},{src:S,type:"image"}],I=()=>{const[e,t]=(0,l.useState)(0);return l.createElement(l.Fragment,null,l.createElement("div",{className:"gallery space-y-2"},l.createElement("div",{className:"view relative"},"video"==F[e].type?l.createElement("div",{className:"m-auto w-full overflow-hidden rounded-lg pb-[56.25%]"},l.createElement("iframe",{className:"absolute left-0 top-0 h-full w-full rounded-lg",src:F[e].src,title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerPolicy:"strict-origin-when-cross-origin",allowFullScreen:!0})):l.createElement("img",{className:"m-auto w-auto rounded-lg",src:F[e].src,alt:"gallery-image"}),l.createElement("button",{className:"text absolute left-1 top-1/2 bg-none p-2",onClick:()=>{let a=e-1;0==e&&(a=F.length-1),t(a)}},l.createElement(j,{id:"caret-left-fill"})),l.createElement("button",{className:"text absolute right-1 top-1/2 bg-none p-2",onClick:()=>{let a=e+1;F.length<=a&&(a=0),t(a)}},l.createElement(j,{id:"caret-right-fill"}))),l.createElement("div",{className:"w-full overflow-x-auto pb-4"},l.createElement("div",{className:"relative flex flex-row gap-2"},F.map(((e,a)=>l.createElement(z,{source:e,setImageIndex:t,index:a})))))),l.createElement("iframe",{className:"w-full",title:"Kaamos",src:"https://store.steampowered.com/widget/3317660/",width:"646",height:"190"}))},z=({source:e,setImageIndex:t,index:a})=>l.createElement("div",{className:"relative h-32 flex-shrink-0 rounded-md"},l.createElement("img",{key:p(),className:"h-32 rounded-md",src:"image"==e.type?e.src:`https://img.youtube.com/vi/${e.thumbnailId}/mqdefault.jpg`,alt:"gallery-image",onClick:()=>t(a)}),"video"==e.type&&l.createElement(j,{className:"absolute left-3 top-3 text-white",id:"film",scale:1.5})),G=()=>l.createElement(l.Fragment,null,l.createElement("h1",{id:"Games"},"Games"),l.createElement(I,null)),P=a.p+"4cc895ba8759d2dd78a0.png",M=()=>l.createElement("div",{className:"header relative"},l.createElement("img",{className:"-ml-7 h-32",src:P,alt:"pepperbox-logo.png"}),l.createElement("h1",{className:"text-4xl"},"Pepperbox Studios"),l.createElement("div",{className:"text absolute right-0 top-8 grid grid-cols-3 content-center"},l.createElement("a",{className:"w-8",href:"https://store.steampowered.com/developer/pepperbox"},l.createElement(j,{id:"steam",scale:1.5})),l.createElement("a",{className:"w-8",href:"https://www.facebook.com/profile.php?id=61568983085540"},l.createElement(j,{id:"facebook",scale:1.5})),l.createElement("a",{className:"w-8",href:"https://www.linkedin.com/company/pepperbox-studios"},l.createElement(j,{id:"linkedin",scale:1.5})))),T=({text:e,icon:t,...a})=>l.createElement("button",{...a,className:"flex items-center justify-center gap-1 break-words rounded-md bg-slate-800 p-2 text-slate-100 hover:bg-slate-700 hover:text-slate-200 active:bg-slate-900 active:text-slate-300 disabled:bg-slate-400"},t&&l.createElement(j,{id:t}),e);var q=a(476);const A=q.z.object({name:q.z.string().min(1,"Name is required").max(50,"Name cannot exceed 50 characters"),email:q.z.string().email("Invalid email address"),message:q.z.string().min(100,"Message is required").max(1024,"Message cannot exceed 500 characters")}),D=()=>{const[e,t]=(0,l.useState)({name:"",email:"",message:""}),[a,r]=(0,l.useState)({}),[n,s]=(0,l.useState)(!1),m=e=>{const{name:a,value:l}=e.target;t((e=>({...e,[a]:l})))};return l.createElement("div",{className:"text"},l.createElement("h1",{id:"Contact Us"},"Contact Us"),n&&l.createElement("p",{className:"mb-4 text-green-500"},"Thank you! Your message has been sent."),l.createElement("form",{onSubmit:a=>{a.preventDefault();const l=A.safeParse(e);if(l.success)r({}),s(!0),t({name:"",email:"",message:""});else{const e=l.error.flatten().fieldErrors;r(Object.entries(e).reduce(((e,[t,a])=>({...e,[t]:a?.[0]||""})),{}))}},className:"space-y-4"},l.createElement("div",null,l.createElement("label",{htmlFor:"name",className:"block text-sm font-medium"},"Name"),l.createElement("input",{id:"name",name:"name",value:e.name,onChange:m,className:`mt-1 w-full border p-2 ${a.name?"border-red-500":"border-gray-300"} rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}),a.name&&l.createElement("p",{className:"mt-1 text-sm text-red-500"},a.name)),l.createElement("div",null,l.createElement("label",{htmlFor:"email",className:"block text-sm font-medium"},"Email"),l.createElement("input",{id:"email",name:"email",value:e.email,onChange:m,className:"mt-1 w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"}),a.email&&l.createElement("p",{className:"mt-1 text-sm text-red-500"},a.email)),l.createElement("div",null,l.createElement("label",{htmlFor:"message",className:"block text-sm font-medium"},"Message"),l.createElement("textarea",{id:"message",name:"message",value:e.message,onChange:m,rows:4,className:"mt-1 w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"}),a.message&&l.createElement("p",{className:"mt-1 text-sm text-red-500"},a.message)),l.createElement("div",{className:"float-right"},l.createElement(T,{className:"align-bottom",text:"Submit"}))))},R=()=>l.createElement("div",{className:"navigation text my-4 space-x-2 uppercase"},l.createElement("a",{href:"#About"},"About")," |",l.createElement("a",{href:"#Games"},"Games")," |",l.createElement("a",{href:"#Contact Us"},"Contact Us")),U=()=>l.createElement("div",{className:"footer text mt-2 pb-2 relative"},l.createElement("ul",null,l.createElement("li",null,"Pepperbox Studios Oy (3477633-3)"),l.createElement("li",null,"FI34776333"),l.createElement("li",null,"Suomi, Finland"),l.createElement("li",null,"pepperbox2024@gmail.com")),l.createElement("div",{className:"absolute right-0 top-0"},"© 2025 Pepperbox Studios Oy. All rights reserved.")),$=()=>l.createElement("div",{className:"flex flex-1 justify-center"},l.createElement("div",{className:"flex flex-col"},l.createElement(M,null),l.createElement(R,null),l.createElement("div",{className:"content mb-6 space-y-6"},l.createElement(f,null),l.createElement("hr",null),l.createElement(G,null),l.createElement("hr",null),l.createElement(D,null)),l.createElement("hr",null),l.createElement(U,null)));r.createRoot(document.body).render(l.createElement(l.StrictMode,null,l.createElement(n.Kd,null,l.createElement((({title:e,description:t})=>l.createElement(n.BV,null,l.createElement(n.qh,{path:"/",element:l.createElement($,null)}))),{title:"Hello, React 19!",description:"This is a TypeScript + React setup."}))))}},a={};function l(e){var r=a[e];if(void 0!==r)return r.exports;var n=a[e]={exports:{}};return t[e](n,n.exports,l),n.exports}l.m=t,e=[],l.O=(t,a,r,n)=>{if(!a){var s=1/0;for(o=0;o<e.length;o++){for(var[a,r,n]=e[o],m=!0,c=0;c<a.length;c++)(!1&n||s>=n)&&Object.keys(l.O).every((e=>l.O[e](a[c])))?a.splice(c--,1):(m=!1,n<s&&(s=n));if(m){e.splice(o--,1);var i=r();void 0!==i&&(t=i)}}return t}n=n||0;for(var o=e.length;o>0&&e[o-1][2]>n;o--)e[o]=e[o-1];e[o]=[a,r,n]},l.d=(e,t)=>{for(var a in t)l.o(t,a)&&!l.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),l.p="/",(()=>{var e={792:0};l.O.j=t=>0===e[t];var t=(t,a)=>{var r,n,[s,m,c]=a,i=0;if(s.some((t=>0!==e[t]))){for(r in m)l.o(m,r)&&(l.m[r]=m[r]);if(c)var o=c(l)}for(t&&t(a);i<s.length;i++)n=s[i],l.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return l.O(o)},a=self.webpackChunk=self.webpackChunk||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var r=l.O(void 0,[957],(()=>l(235)));r=l.O(r)})();