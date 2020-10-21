
import ConsistentHashing from './hash.js'

self.onmessage = function (e) {
    if (e.data === 'run') {
        main()
        self.postMessage('run----done')
    }
}
function main() {
    // debugger
    let copyRate = [
        1,
        32,
        1024,
        2048,
        3072,
        // 1048576
    ]
    for (const cp of copyRate) {
        console.log('-----------------rate--------------------', cp)
        const ch = new ConsistentHashing(cp);
        ch.init()

        // 初始情况
        ch.dumpObjectNodeMap("初始情况", 0, 65536);
        // 删除物理节点
        ch.removePhysicalNode("192.168.1.103");
        ch.dumpObjectNodeMap("删除物理节点", 0, 65536);
        // 添加物理节点
        ch.addPhysicalNode("192.168.1.108");
        ch.dumpObjectNodeMap("添加物理节点", 0, 65536);

        ch.destroy()
        console.log('-----------------rate--------------------', cp)

    }
}
export default main