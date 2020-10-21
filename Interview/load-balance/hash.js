// 该方法返回其键大于minKey的映射部分。
Map.prototype.tailMap = function (minKey) {
    let tailResult = new Map()
    for (let [key, value] of this.entries()) {
        key > minKey && tailResult.set(key, value)
    }
    return tailResult
}
Map.prototype.isEmpty = function () {
    return this.size === 0
}
Map.prototype.firstKey = function () {
    let itKeys = this.keys()
    let arrKeys = Array.from(itKeys)

    // return arrKeys.sort((a, b) => a - b)[0]
    return arrKeys.reduce((num1, num2) => num1 > num2 ? num2 : num1)
    // return Math.min.apply(null, arrKeys)
}

// 一致性 hash 算法简单实现 并使用 32位 FNV 哈希算法(alternative：FNV算法，Chord算法，KAD算法) 实现负载均衡
class ConsistentHashing {
    constructor(copys = 1) {
        this.VIRTUAL_COPIES = copys; // 物理节点至虚拟节点的复制倍数
        this.physicalNodes = null
        this.virtualNodes = null
    }
    init() {
        this.physicalNodes = new Set(
            ["192.168.1.101",
                "192.168.1.102",
                "192.168.1.211",
                "192.168.1.111",
                "192.168.2.104",
            ])
        this.virtualNodes = new Map()
        // 根据物理节点，构建虚拟节点映射表
        for (let nodeIp of this.physicalNodes) {
            this.addPhysicalNode(nodeIp);
        }
    }
    destroy() {
        this.physicalNodes = null
        this.virtualNodes = null
    }
    // 32位的 Fowler-Noll-Vo 哈希算法
    // FNV - 1 a形式：
    // hash = offset_basis
    // for each octet_of_data to be hashed
    // hash = hash xor octet_of_data
    // hash = hash * FNV_prime
    // return hash
    // 32 bit FNV_prime = 2**24 + 2**8 + 0x93 = 16777619
    // https://github.com/tjwebb/fnv-plus/blob/master/index.js
    FNVHash(key) {
        let p = 16777619;
        let hash = 2166136261;
        for (let idx = 0, num = key.length; idx < num; ++idx) {
            hash = (hash ^ key.charAt(idx)) * p;
        }
        hash += hash << 13;
        hash ^= hash >> 7;
        hash += hash << 3;
        hash ^= hash >> 17;
        hash += hash << 5;

        if (hash < 0) {
            hash = Math.abs(hash);
        }
        return hash;
    }
    // 添加物理节点
    addPhysicalNode(nodeIp) {
        for (let idx = 0; idx < this.VIRTUAL_COPIES; ++idx) {
            let hash = this.FNVHash(nodeIp + "#" + idx);
            this.virtualNodes.set(hash, nodeIp);
        }
    }
    // 删除物理节点
    removePhysicalNode(nodeIp) {
        for (let idx = 0; idx < this.VIRTUAL_COPIES; ++idx) {
            let hash = this.FNVHash(nodeIp + "#" + idx);
            this.virtualNodes.delete(hash);
        }
    }
    // 查找对象映射的节点
    getObjectNode(object) {
        let hash = this.FNVHash(object);
        // 所有大于 hash 的节点
        let tailMap = this.virtualNodes.tailMap(hash);
        // console.log(this.physicalNodes)
        // console.log(this.virtualNodes)
        // console.log(hash, tailMap)
        let key = tailMap.isEmpty() ? this.virtualNodes.firstKey() : tailMap.firstKey();
        return this.virtualNodes.get(key);
    }

    // 统计对象与节点的映射关系
    dumpObjectNodeMap(label, objectMin, objectMax) {
        // 统计
        let objectNodeMap = new Map(); // IP => COUNT
        for (let object = objectMin; object <= objectMax; ++object) {
            let nodeIp = this.getObjectNode(String(object));
            let count = objectNodeMap.get(nodeIp);
            objectNodeMap.set(nodeIp, (count == null ? 0 : count + 1));
        }

        // 打印
        let totalCount = objectMax - objectMin + 1;
        console.log("======== " + label + " ========", objectNodeMap);
        for (let [key, values] of objectNodeMap.entries()) {
            let percent = (100 * values / totalCount);
            console.log("IP=" + key + ": RATE=" + percent + "%");
        }
    }
}
export default ConsistentHashing