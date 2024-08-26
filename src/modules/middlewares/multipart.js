const config = Object.assign({},global.gConfig);

const request = require('request');
const objectPath = require('object-path');

const fileMgmt = require('../utils/file-mgmt');
const multer = require('multer');

let storage = multer.memoryStorage();
let upload = multer({ storage: storage }).array('file');

exports.uploadFiles = (req, res, next) => {
  let files = [], body = {};
  upload(req, res, (err) => {
    if (err) { next({ message: 'Erorr while parsing form!' }); }
    else {
      if (req.files) {
        let promises = [];
        req.files.forEach((e) => {
          try {
            e.originalname = decodeURI(e.originalname);
            e.originalname = JSON.parse(e.originalname);
            e.tag = e.originalname.tag; e.originalname = e.originalname.filename;
          } catch (e) { next({ message: 'Invalid filename!' }); }
        });
        req.files.forEach((e) => {
          promises.push(
            fileMgmt.upload(config.projectDetails.fileMgmt.upload.url,
              config.projectDetails.fileMgmt.upload.folder_id,
              { buffer: e.buffer, mimetype: e.mimetype, originalname: e.originalname })
          )
        });
        Promise.all(promises).then((data) => {
          try {
            body = JSON.parse(req.body.data);
          } catch (e) { }
          if (Array.isArray(data)) {
            files = data.map((e, i) => {
              return {
                FileID: e.data.filename, FileName: req.files[i].originalname,
                Tag: req.files[i].tag
              }
            });
          }
          req.body = body;
          if (Array.isArray(req.body.lstFile)) { req.body.lstFile = req.body.lstFile.concat(files); }
          else { req.body.lstFile = files; }
          next();
        }).catch((err) => {
          console.error(err);
          next({ message: 'Error while uploading files!' })
        })
      } else { next(); }
    }
  });
}