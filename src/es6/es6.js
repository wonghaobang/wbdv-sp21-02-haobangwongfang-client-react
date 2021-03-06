let someObject = {
    anObjectProperty: {
        anotherObjectProp: {q: 111, w: 222},
        anotherArrayProp: [321, 432, 543]
    },
    aNumberArrayProp: [1, 2, 3],
    anObjectArrayProp: [
        {a: 123, b: 234}, {a: 321, b: 432}]
}

console.log(someObject.anObjectProperty.anotherObjectProp.q)

let anotherObject = {}
anotherObject["newProp"] = 123
console.log(anotherObject.newProp)

function addEs5(a, b) {
    console.log(a, b)
    return a + b
}

let ewq = addEs5(2, 3)
console.log(ewq)

const addES6 = (a, b) => a + b
ewq = addES6(2, 3)
console.log(ewq)

const square = (b) => b * b
ewq = square(4)
console.log(ewq)

let all = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
/*  returns a new array
    Filter takes a function (the below is an arrow function)
    Filter calls the function with every single element in the array. If true, keep the element, otherwise dont keep
 */
let even = all.filter(i => i % 2 === 0)
// let even = all.filter((i) => {
//     return i % 2 ===0
// })
let odd = all.filter(i => i % 2 !== 0)

console.log(all, even, odd)


/*
    map computes a new array
    the value of the new array will be whatever the function returns
    I don;t think this mutates the array, but rather creates a new one
 */
all = [1, 2, 3, 4]
let square2 = all.map((i) => i * i)
console.log(all, square2)


const array = [1, 3, 4, 2, 5]
// find returns the first value that matches
let x = array.find(x => x > 3)
let y = array.findIndex(x => x > 3)
// filter returns an array of all elements that matches. It returns a new array, doesnt touch the original one
let z = array.filter(x => x > 3)
console.log(x)
console.log(y)
console.log(z)


const list = [1, 2, 3]
// I can use below shortcut to destruct, but having issues using the values to swap or maybe using it somewhere else
// const [a, , b] = list
let a = list[0]
let b = list[2]
let temp;

temp = a;
a = b;
b = temp;

console.log(a)
console.log(b)


// ES5 parameter matching
// function h (arg) {              // I think arg is just the object itself
//     var name = arg.name
//     var val  = arg.val
//     console.log(arg.name, arg.val)
// }
// h({ name: "bar", val: 42 })


// ES6 parameter matching  ----- In destructors, parameters must have parantheses
const h = ({ name, val }) => console.log(name, val)
h({ name: "bar", val: 42 })

// exactly same thing except the parameters order are switched, param names are match by object names in objects
const h2 = ({ val, name }) => console.log(name, val)
h2({ name: "bar", val: 42 })

// In arrays, the param order goes by index, so the order does matter
const h3 = (([name, val]) => console.log(name, val))
h3([ "bar", 42 ])




// Property shorthand for ES5
// let i = 0, j = 0
// obj = { i: i, j: j }

// Use ES6 shorthand instead
let i = 0, j = 0
let obj = { i, j }
console.log(obj)



const rooms = [{
    coveyRoomID: "RS7EMh6yvEW1",
    roomUpdatePassword: "19B6JhYrtcE7t2_gytO3DZSx",
    friendlyName: "ice-cream",
    isPubliclyListed: false
}]

function updateRoom(coveyRoomID, coveyRoomPassword, friendlyName, makePublic) {
    const roomToUpdate = rooms.find( room => room.coveyRoomID === coveyRoomID && room.roomUpdatePassword === coveyRoomPassword );
    if (roomToUpdate !== undefined) {
        if (friendlyName !== undefined) {
            roomToUpdate.friendlyName = friendlyName;
        }
        if (makePublic !== undefined) {
            roomToUpdate.isPubliclyListed = makePublic;
        }
        return true;
    }
    return false;
}

console.log(updateRoom("RS7EMh6yvEW1", "19B6JhYrtcE7t2_gytO3DZSx", "mango", true))
console.log(rooms)



function hello1() { return "Hello" }
console.log(hello1())

async function hello2() { return "Hello" }
// hello2().then((value) => console.log(value))


const user1 = {
    name: 'Jen',
    age: 22,
};

const user2 = {
    name: "Andrew",
    location: "Philadelphia"
};

const mergedUsers = {...user1, ...user2};
console.log(mergedUsers)

