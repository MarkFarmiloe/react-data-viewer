import mssql from "mssql";

const config = {
    user: "reports",
    password: "reports",
    server: "172.30.208.1",
    database: "Aero2024-03-10",
    trustServerCertificate: true,
    driver: 'mssql',
    options: {
        instanceName: ''
    },
};

mssql.connect(config, function (err) {
    if (err) console.error("E1:", err);
    else {
        const request = new mssql.Request();
        request.arrayRowMode = true;
        request.query("select 'asdf' as name, 'qwerty' as other_name, 'jkl' as name")
        .then(result => {
            console.log(result);
            console.log(result.columns);
            console.log(JSON.stringify(result));
        })
        .catch(err => console.log(err));
    }
});
