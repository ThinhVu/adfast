'use strict';

import express from 'express';
import config from '../config/environment';
import User from '../api/user/user.model';
import {isAuthenticated} from './auth.service';

/*Passport configuration*/
require('./local/passport').setup(User);

let router = express.Router();

router.use(require('./local').default);

export default router;

//Todo : ngay khi đăng ký xong 1 tài khoản tạo ngay 1 package mặc định cho người dùng