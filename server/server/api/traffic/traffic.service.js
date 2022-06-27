/**
 * @author ManhNV on 3/6/2017.
 * @supported:
 */

import Traffic from './traffic.model';
import moment from 'moment';
import Q from 'q';

import {validationCatchError} from '../../components/app/middlewares/support.middleware';

/**
 * @method {getMessageTimeInterval}
 */
export function getMessageTimeInterval() {
	let deferred = Q.defer();
	const lastDate = moment().toISOString();
	const startDate = moment().subtract(5, 'm').toISOString();
	const option = {requestTime: {$gte: startDate, $lte: lastDate}};
	Traffic.find(option).exec()
		.then(traffics => {
			deferred.resolve(traffics);
		})
		.catch(validationCatchError(deferred));

	return deferred.promise;
}
