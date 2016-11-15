'use strict';
const debug = require('debug')('restfulmodel:lib:Zones');


class Zones{
    constructor(main){
        debug('Zones instanced');
        this.db = main.db;
    }

    insert(data){
        debug('insert called: '+JSON.stringify(data));
        let self = this;
        return new Promise(( resolve, reject)=>{
                data.q = data.description + " " + data.code;
                self.db.zones.insert(data, (err, doc)=>{
                err? reject(err) : resolve(doc);
    });
    });
    }

    remove(data){
        debug('remove called: '+JSON.stringify(data));
        let self = this;
        return new Promise(( resolve, reject)=>{
            let id = self.db.ObjectId(data);
            self.db.zones.remove({_id : id}, (err, doc)=>{
                err? reject(err) : resolve(doc);
            });
        });
    }

    update(data){

        debug('update called: '+JSON.stringify(data));
        let self = this;
        return new Promise(( resolve, reject)=>{
            data.q = data.description + " " + data.code;

           // self.db.zones.update({_id : data._id}, {zone:data}, (err, doc)=>{
            let id = self.db.ObjectId(data._id);
            delete data._id;
            self.db.zones.update({_id : id}, data, (err, doc)=>{
                err? reject(err) : resolve(doc);
            });
        });
    }

    search(q, limit, page){
        debug('search called: '+JSON.stringify(q));
        debug('search called: '+q);

        let self = this;
        return new Promise((resolve, reject)=>{
                self.db.zones.find({q: new RegExp(q.value, "i") },  (err, docs)=> {
                    err ? reject(err) : resolve(docs)

                });
            debug('search called: '+JSON.stringify(q));
    });
    }
}

module.exports = Zones;