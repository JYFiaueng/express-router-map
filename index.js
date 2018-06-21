const _ = require('lodash');

class Router {
	constructor(router) {
    const self = this;

		self.__router = router;

		const methods = ['get', 'post', 'put', 'delete', 'use'];
		methods.forEach(method => {
			self[method] = function (map) {
				self.__mapping(method, map);
			}
		});
	}

	__mount(action, args) {
		const uri = _.first(args);
		const middlewares = _(args).filter(func => _.isFunction(func)).valueOf();
		this.__router[action](uri, ...middlewares);
	}

	__mapping(method, map) {
		const self = this;

		_.forIn(map, (value, key) => {
			const args = _.union([key], _.isArray(value) ? value : [value]);
			self.__mount(method, args);
		});
	}

}

module.exports = Router;