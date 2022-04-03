const {createClient} = require('redis') ;

const REDIS_URL = 'lna-redis-frank.meoaje.0001.euc1.cache.amazonaws.com:6379';

exports.handler = async (event) => {
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect({
        url: REDIS_URL
    });

    console.log('connected');

    let nowDate = await client.get('nowDate');
    if (!nowDate) {
        nowDate = Date.now().toString();
        await client.set('nowDate', nowDate, { EX: 20 });
    }
    console.log({nowDate})

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            text: `Hello yo:`,
            nowDate,
        }),
    };
    return response;
};

exports.handler()
