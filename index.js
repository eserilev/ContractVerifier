'use strict'

import * as IPFS from 'ipfs-core'
import *  as all from 'it-all'
import {Blob} from 'node:buffer';

async function readFile () {
    const node = await IPFS.create()
    const version = await node.version()
  
    console.log('Version:', version.version)

    const stream = node.cat('QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A')
    let data = '';

    for await (const chunk of stream) {
        // chunks of data are returned as a Buffer, convert it back to a string
        data += chunk.toString()
    }
    console.log(data)
}

async function writeFile () {
  const node = await IPFS.create()
  const version = await node.version()

  console.log('Version:', version.version)

  const fileText = "Hello World"

  const blob = new Blob([fileText], {type: 'text/plain; charset=utf-8'});

  const file = await node.content({
    path: 'hello.txt',
    content: blob
  })

  console.log('Added file:', file.path, file.cid.toString())

  const data = await all(node.cat(file.cid))

  console.log('Added file contents:', data)
}
  
writeFile()
