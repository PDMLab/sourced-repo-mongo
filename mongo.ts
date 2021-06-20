// import { EventEmitter } from "events";
const log = require("debug")("sourced-repo-mongo");
import { Db, MongoClient } from "mongodb";
// const Server = require("mongodb").Server;
import url from "url";
// import util from "util";

export default class Mongo {
  client: MongoClient = null;
  db: Db = null;
  // EventEmitter.call(this);

  async connect(
    mongoUrl: string,
    database?: string,
    options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  ): Promise<void> {
    // return new Promise((resolve, reject) => {
    // this.on("connected", (db) => {
    //   resolve(db);
    // });
    // this.on("error", (err) => {
    //   reject(err);
    // });
    const client = await MongoClient.connect(mongoUrl, options);
    console.log("client connected");
    // function (err, client) {
    //   if (err) {
    //     log(
    //       "✗ MongoDB Connection Error. Please make sure MongoDB is running: ",
    //       err
    //     );
    //     this.emit("error", err);
    //   }
    const expanded = url.parse(mongoUrl);
    // replica set url does not include db, it is passed in separately
    const dbName = database || expanded.pathname.replace("/", "");
    console.log("dbName", dbName);
    this.client = client;
    const db = client.db(dbName);
    console.log("mongodb:", db);
    this.db = db;
    console.log("initialized connection to mongo at %s", mongoUrl);
    // this.emit("connected", db);
    // }
    // );
    // });
  }

  async close(): Promise<void> {
    log("closing sourced mongo connection");
    await this.client.close();
    log("closed sourced mongo connection");
  }
}

// util.inherits(Mongo, EventEmitter);

// Mongo.prototype.connect = function connect (mongoUrl, database, options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }) {
//   var self = this;
//   return new Promise((resolve, reject) => {
//     self.on('connected', (db) => {
//       resolve(db)
//     })
//     self.on('error', (err) => {
//       reject(err)
//     })
//     MongoClient.connect(mongoUrl, options, function (err, client) {
//       if (err) {
//         log('✗ MongoDB Connection Error. Please make sure MongoDB is running: ', err);
//         self.emit('error', err);
//       }
//       var expanded = url.parse(mongoUrl);
//       // replica set url does not include db, it is passed in separately
//       var dbName = database || expanded.pathname.replace('/', '');
//       self.client = client;
//       var db = client.db(dbName);
//       self.db = db;
//       log('initialized connection to mongo at %s', mongoUrl);
//       self.emit('connected', db);
//     });
//   })
// };

// Mongo.prototype.close = function (cb) {
//   log('closing sourced mongo connection');
//   return this.client.close((err) => {
//     log('closed sourced mongo connection');
//     cb(err)
//   });
// };
