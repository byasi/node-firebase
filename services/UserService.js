const { doc,addDoc, getDocs, getDoc, updateDoc, deleteDoc, query, where } = require("firebase/firestore/lite");
const { User } = require("../models");

const createUser = async (userData) => {
  try {
    const docRef = await addDoc(User, userData);
    const user = await getDoc(docRef);
    return {
      id: user.id,
      ...user.data(),
    };
  } catch (error) {
    throw error;
  }
};

const queryUsers = async () => {
  try {
    const snapshot = await getDocs(User);
    const users = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return users;
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    const snapshot = await getDocs(User);
    const users = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const user = users.find((user) => user.email === email);
    return user;
  } catch (error) {
    throw error;
  }
};

const findUserById = async (id) => {
  try {
   const docRef = doc(User, id);
   const user = await getDoc(docRef);
   if(!user.exists()) return null
   return {
    id: user.id,
    ...user.data()
   }
  } catch (error) {
    throw error;
  }
};

const updateUser = async(data, id) => {
    try {
        const docRef = doc(User, id);
        const updateUser = await updateDoc(docRef, data);
        return updateUser;
    } catch (error) {
        throw error;
    }

}

const deleteUser = async(id) => {
    try {
        const docRef = doc(User, id);
        const deleteUser = await deleteDoc(docRef);
        return deleteUser;
    } catch (error) {
        throw error;
    }
}

module.exports = { createUser, queryUsers, findUserByEmail, findUserById, updateUser, deleteUser };
