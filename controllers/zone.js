'use strict';
const debug = require('debug')('restfulmodel:controllers:zones');

function Zones(main) {

    return {
        'search': (req, res, next)=> {


            let zone = req.swagger.params.q;
            main.libs.zones.search(zone)
                .then((zones)=> {
                    res.json(zones);
                })
                .catch((err)=> {
                    next(err);
                });


        },
        'insert': (req, res, next)=> {
            debug('.insert called');
            let zone = req.swagger.params.zone.value;

            main.libs.zones.insert(zone)
                .then((u)=> {
                    res.json(u);
                })
                .catch((err)=> {
                    next(err);
                });
        },

        'remove': (req, res, next)=> {
            debug('.remove called');
            let zone = req.swagger.params._id.value;

            main.libs.zones.remove(zone)
                .then((u)=> {
                    res.json(u);
                })
                .catch((err)=> {
                    next(err);
                });
        },

        'update': (req, res, next)=> {
            debug('.update called');
            let zone = req.swagger.params.zone.value;

            main.libs.zones.update(zone)
                .then((u)=> {
                    res.json(u);
                })
                .catch((err)=> {
                    next(err);
                });
        },
    }
}
module.exports = Zones;