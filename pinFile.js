'use strict'

import * as IPFS from 'ipfs-core'

async function pin(path, content) {
    const node = await IPFS.create();
    const version = await node.version();

    console.log("Version:", version.version);

    const fileAdded = await node.add({
        path: path,
        content: JSON.stringify(content),
    });

    console.log("Added file:", fileAdded.path, fileAdded.cid);
}

export default pin