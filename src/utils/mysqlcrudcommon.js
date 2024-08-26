const SequelizeConn = require("../connections/database");

// const SequelizeConn = new (require('../connections/database'))();
// SequelizeConn = require('../connections/database')
SequelizeConn_Sc = new SequelizeConn();
const create = async ({ createObj, modelName }) => {
  const schema = SequelizeConn_Sc.getSequelizeSchema();
  const model = schema[modelName];
  return await model.create(createObj);
};

const update = async ({ updateObj, filter, modelName }) => {
  const schema = SequelizeConn_Sc.getSequelizeSchema();
  const model = schema[modelName];
  console.log("update -schema:" + schema);
  return await model.update(updateObj, {
    where: filter,
  });
};
const deleteMySql = async ({ updateObj, filter, modelName }) => {
  const schema = SequelizeConn_Sc.getSequelizeSchema();
  const model = schema[modelName];

  return await model.update(updateObj, {
    where: filter,
  });
};

const findAll = async ({ filter = {}, modelName }) => {
  const schema = SequelizeConn_Sc.getSequelizeSchema();
  const model = schema[modelName];

  const result = await model.findAll({
    where: filter,
  });
  return result;
};

const find = async ({ filter, modelName }) => {
  const schema = SequelizeConn_Sc.getSequelizeSchema();
  const model = schema[modelName];
  const result = await model.findAll({
    where: filter,
  });
  return result;
};

const createAutoId = async (_refname, _spName) => {
  const model = SequelizeConn_Sc.getSequelizeConn();
  const result = await model.query(`CALL ${_spName}(:_refname)`, {
    replacements: { _refname },
  });
  return result;
};

const empDetails = async ({ filter, modelName }) => {
  const schema = SequelizeConn_Sc.getSequelizeSchema();
  const model = schema[modelName];
  const result = await model.findAll({
    where: filter,
  });
  return result;
};

const hardDelete = async ({ filter, modelName }) => {
  const schema = SequelizeConn_Sc.getSequelizeSchema();
  const model = schema[modelName];
  const result = await model.destroy({
    where: filter,
  });
  return result;
};

const upsert = async ({ createObj, modelName }) => {
  const schema = SequelizeConn_Sc.getSequelizeSchema();
  const model = schema[modelName];
  return await model.upsert(createObj);
};

module.exports = {
  findAll,
  create,
  createAutoId,
  update,
  deleteMySql,
  find,
  empDetails,
  hardDelete,
  upsert,
};
