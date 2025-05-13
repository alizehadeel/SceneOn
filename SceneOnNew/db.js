const sql = require('mssql');

const config = {
    user: 'sceneon_user',
    password: 'HassannnAgha1@',
    server: 'localhost',
    port: 1433,
    database: 'SceneOn',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('✅ Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('❌ Database Connection Failed:', err);
        process.exit(1);
    });

module.exports = { sql, poolPromise };