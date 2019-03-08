const TableStore = require('tablestore');
const uuidv1 = require('uuid/v1');

const instance = 'TABLE_STORE_INSTANCE';
const tableName = 'TABLE_NAME';

const getTableStoreClient = function (credentials, region) {
  const {accessKeyId, accessKeySecret, securityToken} = credentials;

  return new TableStore.Client({
    accessKeyId,
    secretAccessKey: accessKeySecret,
    stsToken: securityToken,
    endpoint: `https://${instance}.${region}.ots.aliyuncs.com`,
    instancename: instance,
  });
};

const action = async (tableClient, deviceName, level, time) => {
  const addMood = {
    tableName,
    condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
    primaryKey: [{id: uuidv1()}],
    attributeColumns: [{deviceName}, {level}, {time}],
  };

  const tableResponse = await tableClient.putRow(addMood);

  if (tableResponse) {
    return {moodAdded: true};
  } else {
    return {moodAdded: false};
  }
};

exports.handler = function (event, context, callback) {
  const parsedEvent = JSON.parse(event);
  const {deviceName, level, time} = parsedEvent;
  const tableClient = getTableStoreClient(context.credentials, context.region);
  const response = function (err, res) {
    let body;
    if (err !== null) {
      body = JSON.stringify(err);
    } else {
      body = JSON.stringify(res);
    }

    callback(null, {statusCode: 200, headers: {'Content-type': 'application/json'}, body});
  };

  const fetchData = async () => {
    const dataFetched = await action(tableClient, deviceName, level, time);

    if (dataFetched.moodAdded === true) {
      response(null, dataFetched);
    } else {
      response(dataFetched, null);
    }
  };

  fetchData();
};
