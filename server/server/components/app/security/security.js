/**
 * Created by NguyenManh on 8/29/2016.
 */
'use strict';

import rateLimit from 'express-rate-limit';
import expressBrute from 'express-brute';

let store = new expressBrute.MemoryStore();
let bruteForce = new expressBrute(store);

/*Su dung cho tat ca cac yeu cau limited cua app
 * => Khong thich hop cho app su dung cac duong dan static nhieu
 * => Thich hop su dung cho may chu co cac api chi tra ve du lieu json or xml data
 * */
let limiter = new rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100, //Gioi han so request cua moi ip la 100 lan trong vong 15 phut (windowMS)
  delayMs: 0 //
});

/*Su dung cho cac api nao thuc su can thiet va can gioi han toc do
 * => Thich hop cho cac du lieu api thuc su muon gioi han*/
let apiLimiter = new rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  delayMs: 0
});

/*Custom lai nhieu truong hop de dung cho nhieu truong hop khac nhau*/
let accountLimiter = new rateLimit({
  windowMs: 60 * 60 * 1000,
  delayAfter: 1,    //bat dau lam cham phan hoi sau khi gui request dau tien
  delayMs: 3 * 1000,//lam cham cac phan hoi tiep theo bang cach 3s gui 1 phan hoi
  max: 10,          //Chan request sau 10 lan request/1 Ip => block ip request sau windowMs (<=> 1h)
  message: "Ban dang su dung qua nhieu request tren 1 dia chi ip, Vui long thu lai sau 1h!"
});

export default {
  limiter: limiter,
  apiLimiter: apiLimiter,
  accountLimiter: accountLimiter,
  bruteForce: bruteForce
};