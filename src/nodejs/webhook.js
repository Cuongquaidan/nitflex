const express = require("express");
const { setDoc, doc, Timestamp } = require("firebase/firestore");
const { db } = require("../firebase/firebase-config");
const app = express();
const port = 8080;

app.use(express.json());

app.post("/api/webhook-event-handler", (req, res) => {
    let error = req.body.error;
    if (error != 0) {
        //Không làm gì cả.
        res.status(200).send("Error is not 0, no action taken.");
        return;
    }
    //mảng chứa danh sách các giao dịch
    let transactions = req.body.data;
    // console.log(`Received ${transactions.length} transactions`);

    //thêm code xử lý giao dịch ở đây.
    console.log(transactions);

    transactions.forEach((tran) => {
        setDoc(doc(db, "transactions", tran.tid), {
            description: tran.description,
            amount: tran.amount,
            when: Timestamp.fromDate(new Date()),
            bank_sub_acc_id: tran.bank_sub_acc_id,
            subAccId: tran.subAccId,
            bankName: tran.bankName,
            bankAbbreviation: tran.bankAbbreviation,
            corresponsiveName: tran.corresponsiveName,
            corresponsiveAccount: tran.corresponsiveAccount,
            corresponsiveBankId: tran.corresponsiveBankId,
            corresponsiveBankName: tran.corresponsiveBankName,
        })
            .then(() => {
                console.log(`Transaction ${tran.tid} successfully written!`);
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    });

    res.status(200).send("Transactions processed");
});

app.get("/", (req, res) => {
    res.send("okeooek");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
