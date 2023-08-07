const users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

function userCount() {
const uniqueIds = new Set();
users.forEach(item => {
  uniqueIds.add(item.id);
});

const uniqueIdCount = uniqueIds.size;
return uniqueIdCount
}

function newJoinRoom(id, username, room) {
  console.log("users data ", users);
  const user = { id, username, room };
  users.push(user);
  return user;
}
// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function findName(id) {
  let newName = "";
  users.forEach((v) => {
    if (v.id === id) {
      if (v.username) {
        newName = v.username;
      }
    }
  });
  return newName;
}

// Get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,userCount,
  userLeave,
  getRoomUsers,
  findName,
  newJoinRoom,
};
