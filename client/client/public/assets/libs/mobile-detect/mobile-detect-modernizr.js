!function(e,t){"use strict";var o=new MobileDetect(navigator.userAgent),i=o.mobileGrade();t.addTest({mobile:!!o.mobile(),phone:!!o.phone(),tablet:!!o.tablet(),mobilegradea:"A"===i}),e.mobileDetect=o}(window,Modernizr);