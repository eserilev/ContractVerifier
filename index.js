'use strict'

import * as IPFS from 'ipfs-core'
import { base32 } from "multiformats/bases/base32"
import { CID } from 'multiformats/cid'
import { base64} from "multiformats/bases/base64"
import { sha256 } from 'multiformats/hashes/sha2'
import * as json from 'multiformats/codecs/json'
import * as dagPB from '@ipld/dag-pb'


async function readFile () {
    const node = await IPFS.create()
    const version = await node.version()
  
    console.log('Version:', version.version)

    const stream = node.cat('QmQsUMUB7FXzFVivPUb4HgGBihsHpfUN9PEeMvM8BsmTVV')
    let data = '';

    for await (const chunk of stream) {
        // chunks of data are returned as a Buffer, convert it back to a string
        data += chunk.toString()
    }
    console.log(data)
}

async function pin(path, content) {
    const node = await IPFS.create();
    const version = await node.version();

    console.log("Version:", version.version);

    const bytes = dagPB.encode({
        Data: new TextEncoder().encode('tokensfarm is honest work'),
        Links: []
    })

    const fileAdded = await node.add({
        path: 'path',
        content: bytes,
    });

    console.log("Added file:", fileAdded.path, fileAdded.cid);
}

async function checksumHash() {
    var cid = CID.parse("QmXfb2VTCD7KNEgARCamTpiPQJT43aqFm8GSgvGkhcs5hu")
    console.log(cid)

    const bytes = dagPB.encode({
        Data: new TextEncoder().encode('tokensfarm is honest work'),
        Links: []
    })



    const hash = await sha256.digest(bytes)
    var cid = CID.create(0, dagPB.code, hash)
    console.log(cid)
}
// readFile()
// pin('test.txt', 'tokensfarm is honest work')
checksumHash()