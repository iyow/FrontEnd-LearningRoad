function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


async function test() {
    console.log('Hello')
    await sleep(1000)
    console.log('world!')
}

test()
