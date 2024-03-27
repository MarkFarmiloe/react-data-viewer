import express from "express";
import mssql from "mssql";
import csv from "csv-parser";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const serverInstance = process.env.SQL_SERVER || "AERO-APP01\\SQLEXPRESS";
const dbName = process.env.DATABASE || "Aeroplaslivedata";

const config = {
    user: "reports",
    password: "reports",
    server: serverInstance,
    database: dbName,
    //     port: 1433,
    //     dialect: "mssql",
    trustServerCertificate: true,
    driver: 'mssql',
    options: {
        instanceName: ''
    },
    //     dialectOptions: {
    //         instanceName: "SQLEXPRESS",
    //     },
};
if (process.env.DEVELOPMENT) console.log(config);

const router = express.Router();

router.post("/users/login", (req, res) => {
    res.send("Not implemented");
});

router.post("/users", (req, res) => {
    res.send("Not implemented");
});

router.put("/user", (req, res) => {
    res.send("Not implemented");
});

const stockReqdQuery = `
SELECT [oli_id], oli_qty_tbsent, oh_datetime, oli_date_required, 
	[oh_id], oh_cust_order_ref,
	[vad_id], vad_variant_code, vad_description, vad_quantity, vad_weight, vad_uom,
	[cd_id], cd_statement_name, cd_invoice_name, cd_account_customer,
	[pd_id], pd_product_code, pd_description,
	Sum([vsl_overall_stock_quantity]) AS InStock
FROM dbo.order_line_item  
INNER JOIN dbo.order_header ON oli_oh_id = oh_id
INNER JOIN dbo.variant_detail ON oli_vad_id = vad_id
INNER JOIN dbo.customer_detail ON oh_cd_id = cd_id
INNER JOIN dbo.product_detail ON vad_pd_id = pd_id
INNER JOIN dbo.variant_stock_location ON vad_id = vsl_vad_id
WHERE oli_qty_tbsent<>0 
AND oh_order_complete = 0
AND vad_sale_variant = 1
GROUP BY [oli_id], oli_qty_tbsent, oh_datetime, oli_date_required, 
	[oh_id], oh_cust_order_ref,
	[vad_id], vad_variant_code, vad_description, vad_quantity, vad_weight, vad_uom,
	[cd_id], cd_statement_name, cd_invoice_name, cd_account_customer,
	[pd_id], pd_product_code, pd_description
order by pd_product_code, vad_variant_code, oli_date_required;
`;
const stockReqdView = [
    { index: 17, title: "Product code" },
    { index: 7, title: "Stock code" },
    { index: 2, title: "Date Ordered" },
    { index: 3, title: "Date Required" },
    { index: 13, title: "Customer" },
    { index: 5, title: "Cust. Order Ref." },
    { index: 1, title: "O/s Qty" },
    { index: 19, title: "In Stock" },
];

const fixColumns = cols => {
    const columns = [];
    cols.forEach(col => {
        switch (col.type.declaration) {
            case 'bit':
                col.type = 'boolean';
                break;
            case 'varchar':
            case 'nvarchar':
            case 'text':
            case 'ntext':
            case 'char':
            case 'nchar':
                col.type = 'string';
                break;
            case 'int':
            case 'smallint':
            case 'tinyint':
                col.type = 'integer';
                break;
            case 'bigint':
                col.type = 'bigint';
                break;
            case 'float':
            case 'real':
            case 'decimal':
            case 'numeric':
            case 'money': // may lose precision, but only if very big and then only in the pence. 
            case 'smallmoney':
                col.type = 'number';
                break;
            case 'date':
            case 'datetime':
            case 'datetime2':
            case 'datetimeoffset':
            case 'smalldatetime':
            case 'time':
                col.type = 'date';
                break;
            default: // binary, varbinary, image, cursor, hierarchyid, sql_variant, rowversion, uniqueidentifier, xml, table
                     // also Spatial Geometry Types and Spatial Geography Types
                col.type = col.type.declaration;
                break;
        }
        columns.push(col);
    });
    return columns;
};

router.get("/stockReqd", (req, res) => {
    console.log("Asked for StockReqd");
    mssql.connect(config, function (err) {
        if (err) {
            console.error("E1:", err);
            res.statusCode = 500;
            res.send("Oops");
        } else {
            const request = new mssql.Request();
            request.arrayRowMode = true;
            request.query(stockReqdQuery, (err, results) => {
                if (err) console.error("E2", err);
                const columns = fixColumns(results.columns[0]);
                res.send([results.recordset, columns, stockReqdView]);
            });
        }
    });
});

const purchaseOrdersQuery = `
SELECT [poh_id]
,[poh_order_number]
,[poh_datetime]
,[poh_required_date]
,[poh_sd_id]
,[poh_supp_order_ref]
,[poh_all_invoices_received]
,[sd_ow_account]
,[sd_name]
,[sd_address1]
,[sd_address2]
,[sd_address3]
,[sd_town]
,[sd_county]
,[sd_country]
,[sd_postcode]
,[sd_telephone]
,[sd_fax]
,[sd_email]
,[sd_website]
,[sd_vat_number]
,[sd_country_code]
FROM [Aeroplaslivedata].[dbo].[purchase_order_header]
INNER JOIN [Aeroplaslivedata].[dbo].[supplier_detail] ON poh_sd_id = sd_id
SELECT [pol_id]
,[pol_poh_id]
,[pol_vad_description]
,[pol_item_net]
,[pol_item_vat]
,[pol_item_gross]
,[pol_qty_ordered]
,[pol_qty_received]
,[pol_qty_cancelled]
,[pol_service_item]
,[pol_line_net]
,[pol_line_vat]
,[pol_line_gross]
,[pol_foreign_item_net]
,[pol_foreign_item_gross]
,[pol_foreign_item_vat]
,[pol_foreign_line_net]
,[pol_foreign_line_gross]
,[pol_foreign_line_vat]
,[pol_price_obtained]
,[pol_pack_qty]
FROM [Aeroplaslivedata].[dbo].[purchase_order_line];
`;

router.get("/purchase-orders", (req, res) => {
    mssql.connect(config, function (err) {
        if (err) console.error("E1:", err);
        else {
            const request = new mssql.Request();
            request.query(purchaseOrdersQuery, (err, results) => {
                if (err) console.error("E2", err);
                const poHeaders = results.recordsets[0];
                const poLines = results.recordsets[1];
                const pos = poHeaders.map((poh) => {
                    return {
                        ...poh,
                        lines: poLines.filter((pol) => pol.pol_poh_id === poh.poh_id),
                    };
                });
                res.json(pos);
            });
        }
    });
});

router.get("/purchase-orders-csv", (req, res) => {
    const poHeaders = [];
    fs.createReadStream("pos.csv")
        .pipe(csv())
        .on("data", (row) => {
            poHeaders.push(row);
        })
        .on("end", () => {
            const poLines = [];
            fs.createReadStream("polines.csv")
                .pipe(csv())
                .on("data", (row) => {
                    poLines.push(row);
                })
                .on("end", () => {
                    console.log(poLines[0]);
                    poHeaders.forEach((h, i) => {
                        if (i === 0) {
                            console.log(Object.keys(h), h.poh_id, h.poh_order_number, h);
                            for (const c of Object.keys(h)[0]) console.log("c:", c);
                        }
                        h["lines"] = poLines.filter((l) => l.pol_poh_id === h.poh_id);
                    });
                    res.json(poHeaders);
                });
        });
});

export default router;
