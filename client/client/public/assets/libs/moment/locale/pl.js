!function(e,t){"object"==typeof exports&&"undefined"!=typeof module&&"function"==typeof require?t(require("../moment")):"function"==typeof define&&define.amd?define(["../moment"],t):t(e.moment)}(this,function(e){"use strict";function t(e){return e%10<5&&e%10>1&&~~(e/10)%10!==1}function i(e,i,n){var a=e+" ";switch(n){case"m":return i?"minuta":"minutę";case"mm":return a+(t(e)?"minuty":"minut");case"h":return i?"godzina":"godzinę";case"hh":return a+(t(e)?"godziny":"godzin");case"MM":return a+(t(e)?"miesiące":"miesięcy");case"yy":return a+(t(e)?"lata":"lat")}}var n="styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),a="stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"),r=e.defineLocale("pl",{months:function(e,t){return""===t?"("+a[e.month()]+"|"+n[e.month()]+")":/D MMMM/.test(t)?a[e.month()]:n[e.month()]},monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),weekdays:"niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),weekdaysShort:"ndz_pon_wt_śr_czw_pt_sob".split("_"),weekdaysMin:"Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Dziś o] LT",nextDay:"[Jutro o] LT",nextWeek:"[W] dddd [o] LT",lastDay:"[Wczoraj o] LT",lastWeek:function(){switch(this.day()){case 0:return"[W zeszłą niedzielę o] LT";case 3:return"[W zeszłą środę o] LT";case 6:return"[W zeszłą sobotę o] LT";default:return"[W zeszły] dddd [o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",m:i,mm:i,h:i,hh:i,d:"1 dzień",dd:"%d dni",M:"miesiąc",MM:i,y:"rok",yy:i},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return r});