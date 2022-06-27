"use strict";myApp.service("siteService",["$http","$cookies",function(t,e){this.getSite=function(n,a){var i=getNewKeyAndTimeStamp(),o=e.get("token"),r={url:api.url+"api/site",method:"GET",params:{t:i.t,k:i.k},headers:{"Content-Type":"application/x-www-form-urlencoded",authorization:"bearer "+o}};t(r).then(function(t){n(t)},function(t){a(t)})},this.createSite=function(n,a,i){var o=getNewKeyAndTimeStamp(),r=e.get("token"),c={url:api.url+"api/site",method:"POST",data:$.param({t:o.t,k:o.k,name:n.name,url:n.url,category:n.category.toString(),isActive:"1",maxPhone:n.maxPhone}),headers:{"Content-Type":"application/x-www-form-urlencoded",authorization:"bearer "+r}};t(c).then(function(t){a(t)},function(t){i(t)})},this.deleteSite=function(n,a,i){var o=getNewKeyAndTimeStamp(),r=e.get("token"),c={url:api.url+"api/site",method:"DELETE",data:$.param({t:o.t,k:o.k,_id:n}),headers:{"Content-Type":"application/x-www-form-urlencoded",authorization:"bearer "+r}};t(c).then(function(t){a(t)},function(t){i(t)})},this.changeActiveStatus=function(n,a,i){var o=getNewKeyAndTimeStamp(),r=e.get("token"),c={url:api.url+"api/site",method:"PUT",data:$.param({t:o.t,k:o.k,action:n.action,_id:n._id}),headers:{"Content-Type":"application/x-www-form-urlencoded",authorization:"bearer "+r}};t(c).then(function(t){a(t)},function(t){i(t)})},this.changeMaxPhone=function(n,a,i){var o=getNewKeyAndTimeStamp(),r=e.get("token"),c={url:api.url+"api/site",method:"PUT",data:$.param({t:o.t,k:o.k,action:"max-phone",_id:n._id,maxPhone:n.maxPhone}),headers:{"Content-Type":"application/x-www-form-urlencoded",authorization:"bearer "+r}};t(c).then(function(t){a(t)},function(t){i(t)})}}]);