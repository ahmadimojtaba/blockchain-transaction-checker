const express = require('express');
const axios = require('axios');

class hashController
{
    showForm (req, res)
    {
        res.render('../views/index.ejs',{status : 0} )
    }

    hashProcces (req, res)
    {
        const hash_type = req.body.type;
        const hash_code = req.body.hash;
   
        if (hash_type == 'bsc')
        {
            const f_link = "https://api.bscscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=";
            const l_link = "&apikey=RHIZ271EYR5HP3DQVHNEHXP95DQFXJS9RR";
            const link = f_link + hash_code + l_link;
            axios.get(link)
                .then(function (response) {
                    if (response.data.status != 1)  //if transaction unconfirmed
                    {
                        res.render('../views/index.ejs',{status : "UnConfirmed"});
                    }

                    if (response.data.status == 1) //if transaction confirmed
                    {
                        res.render('../views/index.ejs',{status : "Confirmed"});
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
   
        if (hash_type == 'ether')
        {
            const f_link = "https://api.etherscan.io/api?module=transaction&action=getstatus&txhash=";
            const l_link = "&apikey=PZ4R8H2RJDDX8SQJJIGJHAZ8G3596BYT2B";
            const link = f_link + hash_code + l_link;
            axios.get(link)
                .then(function (response) {
                    if (response.data.status != 1)  //if transaction unconfirmed
                    {
                        res.render('../views/index.ejs',{status : "UnConfirmed"});
                    }

                    if (response.data.status == 1) //if transaction confirmed
                    {
                        res.render('../views/index.ejs',{status : "Confirmed"});
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        if (hash_type == 'trx')
        {
            const f_link = "https://apilist.tronscan.org/api/transaction-info?hash=";
            const link = f_link + hash_code;
            axios.get(link)
                .then(function (response) {
                    if (!response.data.confirmed)  //if transaction unconfirmed
                    {
                        res.render('../views/index.ejs',{status : "UnConfirmed"});
                    }

                    if (response.data.confirmed) //if transaction confirmed
                    {
                        res.render('../views/index.ejs',{status : "Confirmed"});
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        if (hash_type == 'omni')
        {
            const f_link = "https://api.omniexplorer.info/v1/transaction/tx/";
            const link = f_link + hash_code;
            axios.get(link)
                .then(function (response) {
                    if (!response.data.valid)  //if transaction unconfirmed
                    {
                        res.render('../views/index.ejs',{status : "UnConfirmed"});
                    }

                    if (response.data.valid) //if transaction confirmed
                    {
                        res.render('../views/index.ejs',{status : "Confirmed"});
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        
        if (hash_type == 'algo')
        {
            const f_link = "https://algoexplorerapi.io/v2/transactions/pending/";
            const link = f_link + hash_code;
            axios.get(link)
                .then(function (response) {
                    if (response.data.txn.txn.fv < 10)  //if transaction unconfirmed
                    {
                        res.render('../views/index.ejs',{status : "UnConfirmed"});
                    }

                    if (response.data.txn.txn.fv > 10) //if transaction confirmed
                    {
                        res.render('../views/index.ejs',{status : "Confirmed"});
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}

module.exports = new hashController();