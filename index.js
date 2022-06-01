const IPFS = require('ipfs-core')



async function main () {
    const node = await IPFS.create()
    const version = await node.version()
  
    console.log('Version:', version.version)

    const stream = node.cat('QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A')
    let data = '';

    for await (const chunk of stream) {
        // chunks of data are returned as a Buffer, convert it back to a string
        data += chunk.toString()
    }
  }
  
main()
