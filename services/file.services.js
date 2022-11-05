const fs = require('fs/promises');
const path = require("path");


const pathToFile = path.join(process.cwd(), 'DataBase', 'users.json')

const reader = async () => {
    try {
        const buffer = await fs.readFile(pathToFile)
        const data = buffer.toString()
        const users = data ? JSON.parse(data) : [];
        return users.sort((a, b) => a.id - b.id);
    } catch (e) {
        console.log(e)
    }
}

const writer = async (data) => {
    try {
        await fs.writeFile(pathToFile, JSON.stringify(data))
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    insertUsers: async (userObject) => {
        const users = await reader();

        userObject.id = users.length ? users[users.length - 1].id + 1 : 1;
        users.push(userObject)

        await writer(users)

        return userObject;
    },

    getUsers: async () => {
        return reader();
    },

    getOneUser: async (id) => {
        const users = await reader();
        return users.find((user) => user.id === id)
    },

    deleteUser: async (id) => {
        const users = await reader();
        const index = users.findIndex((user) => user.id === id)

        if (index < 0) return

        const user = users[index]
        console.log(user)
        user.splice(index, 1)

        await writer(users)

        return user;
    }

}
