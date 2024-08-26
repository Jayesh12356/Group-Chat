const request = require('request'),
  objectPath = require('object-path');

const config = Object.assign({},global.gConfig);

const mysso = (req, res, next) => {
 
  if (config.appMgmt.useMySSO && ['GET', 'POST', 'PUT'].indexOf(req.method) > -1) {
    request.get(config.appMgmt.url, {
      headers: {
        'MYSSO': objectPath.get(req, 'cookies.MYSSO') || req.get('MYSSO')
      }
    }, (error, response, body) => {
      if (error) { next({ message: 'Network issue while authenticating' }); }
      else {
        try {
          body = JSON.parse(body);
          const {employee_id, emailID, domain, fullname} = body.data;
          req.body['EmployeeCode'] = employee_id;
          req.body['LoggedInUserEmailId'] = emailID;
          req.body['DomainId'] = domain;
          req.body['LoggedInUserFullName'] = fullname;

          // for apm
          req.user = body.data;
          req.user.sessionId = "OpenAPI";
          if (req.headers.sessionid) {
            req.user.sessionId = req.headers.sessionid;
          }

          next();
        } catch (e) {
          next({ message: 'Error while authenticating. Make sure MYSSO is flowing over your network' })
        }
      }
    })
  } else { next(); }
}

module.exports = mysso;