// 这个接口的原始设计目的，与 WebGL 项目有关。所谓 WebGL，就是指浏览器与显卡之间的通信接口，
// 为了满足 JavaScript 与显卡之间大量的、实时的数据交换，它们之间的数据通信必须是二进制的，
// 而不能是传统的文本格式。文本格式传递一个 32 位整数，
// 两端的 JavaScript 脚本与显卡都要进行格式转化，将非常耗时。这时要是存在一种机制，
// 可以像 C 语言那样，直接操作字节，将 4 个字节的 32 位整数，
// 以二进制形式原封不动地送入显卡，脚本的性能就会大幅提升。

// 二进制数组就是在这种背景下诞生的。它很像 C 语言的数组，允许开发者以数组下标的形式，
// 直接操作内存，大大增强了 JavaScript 处理二进制数据的能力，
// 使得开发者有可能通过 JavaScript 与操作系统的原生接口进行二进制通信。


// ArrayBuffer对象代表存储二进制数据的一段内存 不可直接读写 可作为构造函数分配内存区域
// 只能通过视图来读写(TypedArray视图和DataView视图)
// ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。
// “视图”部署了数组接口，这意味着，可以用数组的方法操作内存。
// ArrayBuffer对象作为内存区域，可以存放多种类型的数据。同一段内存，
// 不同数据有不同的解读方式，这就叫做“视图”（view）
// ArrayBuffer有两种视图，一种是 TypedArray 视图，
// 另一种是DataView视图。前者的数组成员都是同一个数据类型，后者的数组成员可以是不同的数据类型

// TypedArray 数组只是一层视图，本身不储存数据，
// 它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性。

// 同一段内存区域
const buff = new ArrayBuffer(12);

// DataView视图
const dataView = new DataView(buff);
console.log(dataView.getUint8(0));
dataView[0] = 1;
console.log(dataView.getUint8(0));
console.log(dataView);
console.log('------',buff);
// TypedArray视图
const typedArrayX1 = new Int32Array(buff);
console.log(typedArrayX1)
typedArrayX1[0] = 2;
console.log('dataView----',dataView);
console.log('typedArrayX1----',typedArrayX1);
console.log('----',buff);

const typedArrayX2 = new Uint8Array(buff);
console.log(typedArrayX2)
typedArrayX2[0] = 3;
console.log('dataView----',dataView);
console.log('typedArrayX1----',typedArrayX1);
console.log('typedArrayX2----',typedArrayX2);
console.log('----',buff);

// TypedArray 直接分配内存生成底层ArrayBuffer实例

const typedArrayX = new Uint8Array([0,1,2]);
console.log(typedArrayX.length);
typedArrayX[0] = 5;
typedArrayX[4] = 777;

console.log(typedArrayX)





// TypedArray
// 同一个ArrayBuffer对象之上，可以根据不同的数据类型，建立多个视图。
// 创建一个8字节的ArrayBuffer
// 在一段长度为 8 个字节的内存（b）之上，生成了三个视图：v1、v2和v3。
// v1、v2和v3是重叠的：
// v1[0]是一个 32 位整数，指向字节 0 ～字节 3；
// v2[0]是一个 8 位无符号整数，指向字节 2；
// v3[0]是一个 16 位整数，指向字节 2 ～字节 3。
// 只要任何一个视图对内存有所修改，就会在另外两个视图上反应出来。

// 注意，byteOffset必须与所要建立的数据类型一致，否则会报错。
// const buffer = new ArrayBuffer(8);
// const i16 = new Int16Array(buffer, 1);
// Uncaught RangeError: start offset of Int16Array should be a multiple of 2

const b = new ArrayBuffer(8);

// 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
const v1 = new Int32Array(b);

// 创建一个指向b的Uint8视图，开始于字节2，直到缓冲区的末尾
const v2 = new Uint8Array(b, 2);

// 创建一个指向b的Int16视图，开始于字节2，长度为2
const v3 = new Int16Array(b, 2, 2);
