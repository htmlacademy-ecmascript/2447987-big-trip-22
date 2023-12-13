(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",s="second",i="minute",r="hour",a="day",o="week",l="month",u="quarter",c="year",d="date",f="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var s=String(t);return!s||s.length>=e?t:""+Array(e+1-s.length).join(n)+t},_={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),s=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(s,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var s=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(s,l),r=n-i<0,a=e.clone().add(s+(r?-1:1),l);return+(-(s+(n-i)/(r?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:c,w:o,d:a,D:d,h:r,m:i,s,ms:n,Q:u}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$="en",y={};y[$]=v;var b="$isDayjsObject",g=function(t){return t instanceof w||!(!t||!t[b])},M=function t(e,n,s){var i;if(!e)return $;if("string"==typeof e){var r=e.toLowerCase();y[r]&&(i=r),n&&(y[r]=n,i=r);var a=e.split("-");if(!i&&a.length>1)return t(a[0])}else{var o=e.name;y[o]=e,i=o}return!s&&i&&($=i),i||!s&&$},D=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new w(n)},S=_;S.l=M,S.i=g,S.w=function(t,e){return D(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var w=function(){function v(t){this.$L=M(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[b]=!0}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(S.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var s=e.match(h);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(e)}(t),this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return S},m.isValid=function(){return!(this.$d.toString()===f)},m.isSame=function(t,e){var n=D(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return D(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<D(t)},m.$g=function(t,e,n){return S.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,u=!!S.u(e)||e,f=S.p(t),h=function(t,e){var s=S.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return u?s:s.endOf(a)},p=function(t,e){return S.w(n.toDate()[t].apply(n.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,_=this.$D,$="set"+(this.$u?"UTC":"");switch(f){case c:return u?h(1,0):h(31,11);case l:return u?h(1,m):h(0,m+1);case o:var y=this.$locale().weekStart||0,b=(v<y?v+7:v)-y;return h(u?_-b:_+(6-b),m);case a:case d:return p($+"Hours",0);case r:return p($+"Minutes",1);case i:return p($+"Seconds",2);case s:return p($+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var o,u=S.p(t),f="set"+(this.$u?"UTC":""),h=(o={},o[a]=f+"Date",o[d]=f+"Date",o[l]=f+"Month",o[c]=f+"FullYear",o[r]=f+"Hours",o[i]=f+"Minutes",o[s]=f+"Seconds",o[n]=f+"Milliseconds",o)[u],p=u===a?this.$D+(e-this.$W):e;if(u===l||u===c){var v=this.clone().set(d,1);v.$d[h](p),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else h&&this.$d[h](p);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[S.p(t)]()},m.add=function(n,u){var d,f=this;n=Number(n);var h=S.p(u),p=function(t){var e=D(f);return S.w(e.date(e.date()+Math.round(t*n)),f)};if(h===l)return this.set(l,this.$M+n);if(h===c)return this.set(c,this.$y+n);if(h===a)return p(1);if(h===o)return p(7);var v=(d={},d[i]=t,d[r]=e,d[s]=1e3,d)[h]||1,m=this.$d.getTime()+n*v;return S.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var s=t||"YYYY-MM-DDTHH:mm:ssZ",i=S.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,u=n.months,c=n.meridiem,d=function(t,n,i,r){return t&&(t[n]||t(e,s))||i[n].slice(0,r)},h=function(t){return S.s(r%12||12,t,"0")},v=c||function(t,e,n){var s=t<12?"AM":"PM";return n?s.toLowerCase():s};return s.replace(p,(function(t,s){return s||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return S.s(e.$y,4,"0");case"M":return o+1;case"MM":return S.s(o+1,2,"0");case"MMM":return d(n.monthsShort,o,u,3);case"MMMM":return d(u,o);case"D":return e.$D;case"DD":return S.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return d(n.weekdaysMin,e.$W,l,2);case"ddd":return d(n.weekdaysShort,e.$W,l,3);case"dddd":return l[e.$W];case"H":return String(r);case"HH":return S.s(r,2,"0");case"h":return h(1);case"hh":return h(2);case"a":return v(r,a,!0);case"A":return v(r,a,!1);case"m":return String(a);case"mm":return S.s(a,2,"0");case"s":return String(e.$s);case"ss":return S.s(e.$s,2,"0");case"SSS":return S.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,f){var h,p=this,v=S.p(d),m=D(n),_=(m.utcOffset()-this.utcOffset())*t,$=this-m,y=function(){return S.m(p,m)};switch(v){case c:h=y()/12;break;case l:h=y();break;case u:h=y()/3;break;case o:h=($-_)/6048e5;break;case a:h=($-_)/864e5;break;case r:h=$/e;break;case i:h=$/t;break;case s:h=$/1e3;break;default:h=$}return f?h:S.a(h)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return y[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),s=M(t,e,!0);return s&&(n.$L=s),n},m.clone=function(){return S.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),O=w.prototype;return D.prototype=O,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",a],["$M",l],["$y",c],["$D",d]].forEach((function(t){O[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),D.extend=function(t,e){return t.$i||(t(e,w,D),t.$i=!0),D},D.locale=M,D.isDayjs=g,D.unix=function(t){return D(1e3*t)},D.en=y[$],D.Ls=y,D.p={},D}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,s=6e4,i=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,o=31536e6,l=2628e6,u=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,c={years:o,months:l,days:r,hours:i,minutes:s,seconds:n,milliseconds:1,weeks:6048e5},d=function(t){return t instanceof $},f=function(t,e,n){return new $(t,n,e.$l)},h=function(t){return e.p(t)+"s"},p=function(t){return t<0},v=function(t){return p(t)?Math.ceil(t):Math.floor(t)},m=function(t){return Math.abs(t)},_=function(t,e){return t?p(t)?{negative:!0,format:""+m(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},$=function(){function p(t,e,n){var s=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return f(t*c[h(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){s.$d[h(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var i=t.match(u);if(i){var r=i.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var m=p.prototype;return m.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*c[n]}),0)},m.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=v(t/o),t%=o,this.$d.months=v(t/l),t%=l,this.$d.days=v(t/r),t%=r,this.$d.hours=v(t/i),t%=i,this.$d.minutes=v(t/s),t%=s,this.$d.seconds=v(t/n),t%=n,this.$d.milliseconds=t},m.toISOString=function(){var t=_(this.$d.years,"Y"),e=_(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var s=_(n,"D"),i=_(this.$d.hours,"H"),r=_(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3,a=Math.round(1e3*a)/1e3);var o=_(a,"S"),l=t.negative||e.negative||s.negative||i.negative||r.negative||o.negative,u=i.format||r.format||o.format?"T":"",c=(l?"-":"")+"P"+t.format+e.format+s.format+u+i.format+r.format+o.format;return"P"===c||"-P"===c?"P0D":c},m.toJSON=function(){return this.toISOString()},m.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",s={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(a,(function(t,e){return e||String(s[t])}))},m.as=function(t){return this.$ms/c[h(t)]},m.get=function(t){var e=this.$ms,n=h(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?v(e/c[n]):this.$d[n],e||0},m.add=function(t,e,n){var s;return s=e?t*c[h(e)]:d(t)?t.$ms:f(t,this).$ms,f(this.$ms+s*(n?-1:1),this)},m.subtract=function(t,e){return this.add(t,e,!0)},m.locale=function(t){var e=this.clone();return e.$l=t,e},m.clone=function(){return f(this.$ms,this)},m.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},m.valueOf=function(){return this.asMilliseconds()},m.milliseconds=function(){return this.get("milliseconds")},m.asMilliseconds=function(){return this.as("milliseconds")},m.seconds=function(){return this.get("seconds")},m.asSeconds=function(){return this.as("seconds")},m.minutes=function(){return this.get("minutes")},m.asMinutes=function(){return this.as("minutes")},m.hours=function(){return this.get("hours")},m.asHours=function(){return this.as("hours")},m.days=function(){return this.get("days")},m.asDays=function(){return this.as("days")},m.weeks=function(){return this.get("weeks")},m.asWeeks=function(){return this.as("weeks")},m.months=function(){return this.get("months")},m.asMonths=function(){return this.as("months")},m.years=function(){return this.get("years")},m.asYears=function(){return this.as("years")},p}(),y=function(t,e,n){return t.add(e.years()*n,"y").add(e.months()*n,"M").add(e.days()*n,"d").add(e.hours()*n,"h").add(e.minutes()*n,"m").add(e.seconds()*n,"s").add(e.milliseconds()*n,"ms")};return function(n,s,i){t=i,e=i().$utils(),i.duration=function(t,e){var n=i.locale();return f(t,{$l:n},e)},i.isDuration=d;var r=s.prototype.add,a=s.prototype.subtract;s.prototype.add=function(t,e){return d(t)?y(this,t,1):r.bind(this)(t,e)},s.prototype.subtract=function(t,e){return d(t)?y(this,t,-1):a.bind(this)(t,e)}}}()}},e={};function n(s){var i=e[s];if(void 0!==i)return i.exports;var r=e[s]={exports:{}};return t[s].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function e(t,e,n="beforeend"){e.insertAdjacentElement(n,t.getElement())}class s{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      <div class="trip-sort__item  trip-sort__item--day">\n        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n        <label class="trip-sort__btn" for="sort-day">Day</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--event">\n        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n        <label class="trip-sort__btn" for="sort-event">Event</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--time">\n        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n        <label class="trip-sort__btn" for="sort-time">Time</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--price">\n        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n        <label class="trip-sort__btn" for="sort-price">Price</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--offer">\n        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n        <label class="trip-sort__btn" for="sort-offer">Offers</label>\n      </div>\n    </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const i=["Taxi","Bus","Train","Ship","Drive","Flight","Check-in","Sightseeing","Restaurant"],r=["Dubai","Ottawa","Berlin","London","Luxembourg","Seoul","Limassol","Rome"],a=["Add luggage","Upgrade to a business class","Add meal","Choose seats","Travel by train","Order Uber"],o="hh:mm",l="YY/MM/DD";var u=n(484),c=n.n(u);const d=t=>t[Math.floor(Math.random()*t.length)],f=(t,e)=>t?c()(t).format(e):"";class h{constructor({point:t}){this.point=t}getTemplate(){return function(t){const{base_price:e,date_from:n,date_to:s,destination:{name:r,description:a},offers:{offers:u}}=t;return`<form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-1">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n              ${i.map((t=>`\n                <div class="event__type-item">\n                  <input\n                    id="event-type-${d(t)}-1"\n                    class="event__type-input\n                    visually-hidden"\n                    type="radio"\n                    name="event-type"\n                    value="${d(t)}"\n                  >\n                  <label\n                    class="event__type-label\n                    event__type-label--${d(t)}"\n                    for="event-type-${d(t)}-1"\n                  >${d(t)}</label>\n                </div>`)).join("")}\n            </fieldset>\n          </div>\n        </div>\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-1">\n            Flight\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${r}" list="destination-list-1">\n          <datalist id="destination-list-1">\n            <option value="Amsterdam"></option>\n            <option value="Geneva"></option>\n            <option value="Chamonix"></option>\n          </datalist>\n        </div>\n\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-1">From</label>\n          <input\n            class="event__input\n            event__input--time"\n            id="event-start-time-1"\n            type="text"\n            name="event-start-time"\n            value="${f(n,l)} ${f(n,o)}"\n          >\n          &mdash;\n          <label class="visually-hidden" for="event-end-time-1">To</label>\n          <input\n            class="event__input\n            event__input--time"\n            id="event-end-time-1"\n            type="text"\n            name="event-end-time"\n            value="${f(s,l)} ${f(s,o)}"\n          >\n        </div>\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-1">\n            <span class="visually-hidden">Price</span>\n            &euro;\n          </label>\n          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${e}">\n        </div>\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">Delete</button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </header>\n      <section class="event__details">\n        <section class="event__section  event__section--offers">\n          <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n          <div class="event__available-offers">\n            ${u.map((({price:t,title:e})=>`\n              <div class="event__offer-selector">\n                <input\n                  class="event__offer-checkbox\n                  visually-hidden"\n                  id="event-offer-luggage-1"\n                  type="checkbox"\n                  name="event-offer-luggage"\n                  ${t>100?"checked":""}\n                >\n                <label class="event__offer-label" for="event-offer-luggage-1">\n                  <span class="event__offer-title">${e}</span>\n                  &plus;&euro;&nbsp;\n                  <span class="event__offer-price">${t}</span>\n                </label>\n              </div>`)).join("")}\n          </div>\n        </section>\n\n        <section class="event__section  event__section--destination">\n          <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n          <p class="event__destination-description">${a}</p>\n        </section>\n      </section>\n    </form>`}(this.point)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}var p=n(646),v=n.n(p);c().extend(v());class m{constructor({point:t}){this.point=t}getTemplate(){return function(t){const{base_price:e,date_from:n,date_to:s,destination:{name:i},offers:{offers:[{price:r,title:a}]},is_favorite:l}=t,u=f(n,"D MMMM"),d=f(n,o),h=f(s,o),p=c().duration(c()(s).diff(c()(n)));return`<div class="event">\n      <time class="event__date" datetime=${u}>${u}</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">Drive ${i}</h3>\n      <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime=${n}>${d}</time>\n          &mdash;\n          <time class="event__end-time" datetime=${n}>${h}</time>\n        </p>\n        <p class="event__duration">${p.days()>1?`${p.days()}D`:""} ${p.hours()}H ${p.minutes()}M</p>\n      </div>\n      <p class="event__price">\n        &euro;&nbsp;<span class="event__price-value">${e}</span>\n      </p>\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n        <li class="event__offer">\n          <span class="event__offer-title">${a}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${r}</span>\n        </li>\n      </ul>\n      <button class="event__favorite-btn  ${l?"event__favorite-btn--active":""}" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n        </svg>\n      </button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>`}(this.point)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class _{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n      <div class="trip-filters__filter">\n        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n        <label class="trip-filters__filter-label" for="filter-future">Future</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n        <label class="trip-filters__filter-label" for="filter-present">Present</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n        <label class="trip-filters__filter-label" for="filter-past">Past</label>\n      </div>\n\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const $=[{id:"1",name:d(r),description:"Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.",pictures:[{src:"https://loremflickr.com/248/152?random=22",description:d(r)}]},{id:"2",name:d(r),description:"Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.",pictures:[{src:"https://loremflickr.com/248/152?random=4",description:d(r)}]},{id:"3",name:d(r),description:"Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.",pictures:[{src:"https://loremflickr.com/248/152?random=2",description:"City"},{src:"https://loremflickr.com/248/152?random=27",description:d(r)}]}],y=[{type:d(i),offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa31",title:d(a),price:120},{id:"b4c3e4e6-9053-42ce-b747-e281314baa32",title:d(a),price:40},{id:"b4c3e4e6-9053-42ce-b747-e281314baa33",title:d(a),price:15}]},{type:d(i),offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa31",title:d(a),price:120}]},{type:d(i),offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa34",title:d(a),price:100},{id:"b4c3e4e6-9053-42ce-b747-e281314baa33",title:d(a),price:15}]}],b=[{id:"1",base_price:1100,date_from:"2019-07-11T11:22:13.375Z",date_to:"2019-07-12T17:50:13.375Z",is_favorite:!1,type:d(i),destination:d($),offers:d(y)},{id:"2",base_price:5600,date_from:"2023-05-30T03:42:13.375Z",date_to:"2023-05-31T17:18:13.375Z",is_favorite:!0,type:d(i),destination:d($),offers:d(y)},{id:"3",base_price:700,date_from:"2024-04-12T09:58:13.375Z",date_to:"2024-04-14T18:01:13.375Z",is_favorite:!0,type:d(i),destination:d($),offers:d(y)}];function g(){return d(b)}const M=document.querySelector(".trip-events"),D=new class{points=Array.from({length:3},g);getPoints(){return this.points}},S=new class{constructor({boardContainer:t,pointsModel:e}){this.boardContainer=t,this.pointsModel=e}init(){this.boardPoints=[...this.pointsModel.getPoints()],e(new _,document.querySelector(".trip-controls__filters")),e(new s,this.boardContainer),e(new h({point:this.boardPoints[0]}),this.boardContainer);for(let t=0;t<this.boardPoints.length;t++)e(new m({point:this.boardPoints[t]}),this.boardContainer)}}({boardContainer:M,pointsModel:D});S.init()})()})();
//# sourceMappingURL=bundle.4e17de563986623ae1dd.js.map