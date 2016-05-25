var $ = require('jquery'),
	_ = require('underscore');

//Polyfill Array.isArray;
if (!Array.isArray) {
	Array.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}

window.Wkt = require('wicket/wicket');

require('wicket/wicket-gmap3');

let MapiWkt = {
	wkt: Wkt,

	addObjectFromWKT({groupId = 'wkt', id = _.uniqueId('wkt'), wkt, ...options}) {
		var mapi = this;
		
		if (typeof wkt === 'object') {
			wkt = JSON.stringify(wkt);
		}
		else {
			wkt = wkt.replace('\n', '').replace('\r', '').replace('\t', '');
		}

		var wicket = new Wkt.Wkt();
		wicket.read(wkt);

		var obj = wicket.toObject(options); // Make an object

		var addObject = function (object, idx) {
			object.setMap(mapi.map);
			
			if(idx) {
				mapi.addObject({
					groupId, 
					id: id + '_' + idx, 
					object
				});
			} else {
				mapi.addObject({groupId, id, object});
			}
			
			if (options.onClick) {
				google.maps.event.addListener(object, 'click', options.onClick);
			}

			if (options.tooltip) {
				this.addTooltip(object, options.tooltip, options.tooltipCss);
			}
		};
		
		if(Array.isArray(obj)) {
			_(obj).each(addObject);
		} else {
			addObject(obj);
		} 

		return obj;
	},

	getWKTFromObject({groupId, id}) {
		var wicket = new Wkt.Wkt();
		
		console.log(wicket);
		
		if (id) {
			if (this.objects[groupId][id]) {
				wicket.fromObject(this.objects[groupId][id]);

				return wicket.write();
			}
		}
		else {
			var objects = {};

			_.each(this.objects[groupId], function (obj, objId) {
				wicket.fromObject(obj);
				objects[objId] = wicket.write();
			});

			return objects;
		}
	}
}

window.Wkt = null;

module.exports = MapiWkt;