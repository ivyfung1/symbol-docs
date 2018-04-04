/*
 *
 * Copyright 2018 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {
    Account,
    Address, Deadline, Mosaic, MosaicId, NetworkType, PlainMessage, TransactionHttp,
    TransferTransaction, UInt64, XEM,
} from 'nem2-sdk';

// Replace with private key
const privateKey = process.env.PRIVATE_KEY as string;

// Replace with recipient address
const recipientAddress = 'SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54';

const account = Account.createFromPrivateKey(privateKey,NetworkType.MIJIN_TEST);

const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    Address.createFromRawAddress(recipientAddress),
    [
        new Mosaic( new MosaicId('alice:token'), UInt64.fromUint(10)),
        XEM.createRelative(10),
    ],
    PlainMessage.create('sending multiple mosaics'),
    NetworkType.MIJIN_TEST,
);

//Signing and announcing the transaction
const signedTransaction = account.sign(transferTransaction);
const transactionHttp = new TransactionHttp('http://localhost:3000');

transactionHttp.announce(signedTransaction).subscribe(
    x => console.log(x),
    err => console.error(err)
);