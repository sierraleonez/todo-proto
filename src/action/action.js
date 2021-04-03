import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export let todos;
export async function saveTodo(todo) {
  try {
    await AsyncStorage.setItem('todo_item', JSON.stringify(todo));
  } catch (err) {
    alert('Cant save todo!');
  }
}

export async function saveID(id) {
  try {
    await AsyncStorage.setItem('id', JSON.stringify(id));
  } catch (error) {
    alert('id not saved');
  }
}

export async function clearID() {
  try {
    await AsyncStorage.removeItem('id');
  } catch (error) {
    console.log(error);
  }
  console.log('done');
}

export function getRandomQuote() {}
