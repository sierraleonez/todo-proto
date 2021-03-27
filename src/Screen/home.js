import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import Component
import TodoItem from '../components/item';
import TopBar from '../components/topBar';
import {saveTodo, saveID, clearID} from '../action/action';

// Screen Dimension
const screenWidth = Dimensions.get('window').width;

export default function home() {
  // Get item from local storage
  let todo = AsyncStorage.getItem('todo_item');
  let id = AsyncStorage.getItem('id');

  // State
  const [input, setInput] = useState('');
  const [counter, setCounter] = useState(0);
  const [desc, setDesc] = useState('');
  const [modalData, setModalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [testState, setTestState] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [date, setDate] = useState(new Date());

  // Add Todo Function
  const currentDate = new Date();
  function todoMaster(inp, dsc) {
    console.log(testState);
    console.log(counter);
    setCounter(counter + 1);
    let input = {
      task: inp,
      description: dsc,
      date: currentDate,
      id: counter,
      done: false,
      due: date,
    };
    setTestState([...testState, input]);
    setDesc('');
    setInput('');
    saveTodo([...testState, input]);
  }

  // Delete Todo Function
  function deleteTodo(id) {
    setTestState(testState.filter((list) => list.id !== id));
    saveTodo(testState.filter((list) => list.id !== id));
  }

  // Clear Todo
  function deleteAllTodo() {
    setTestState([]);
  }
  // Done Todo Function
  function doneTodo(id, done) {
    const index = testState.findIndex((x) => x.id == id);
    if (!done) {
      testState[index].done = true;
      saveTodo(testState.filter((x) => x.id !== -1));
      console.log('done');
    } else {
      testState[index].done = false;
      saveTodo(testState.filter((x) => x.id !== -1));
      console.log('undone');
    }
    setTestState([...testState]);
  }

  // Update Todo
  function updateTodo(id, task, desc) {
    const index = testState.findIndex((x) => x.id == id);
    if (task !== '') {
      testState[index].task = task;
    }
    if (desc == '') {
      testState[index].description = '';
    } else {
      testState[index].description = desc;
    }
    setTestState(testState.filter((x) => x.id !== -1));
    saveTodo(testState);
    setShowModal(false);
  }

  useEffect(() => {
    todo.then((e) => setTestState(JSON.parse(e)));
    id.then((e) => {
      if (e !== 'null') {
        setCounter(parseInt(e));
        console.log(e + 'localID');
      }
      console.log(parseInt(e));
      saveID(counter);
    });
    console.log(testState);
  }, []);
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <TopBar title={`Task(${testState.length})`} />
      <ScrollView>
        <View style={{alignItems: 'center', marginVertical: 32, flex: 1}}>
          <TextInput
            value={input}
            onChangeText={(inp) => {
              setInput(inp);
            }}
            placeholder="Tell Us What You Wanna Do..."
            style={{
              borderColor: '#9f9f9f',
              borderWidth: 1,
              width: screenWidth - 64,
              height: 42,
              borderRadius: 25,
              paddingHorizontal: 16,
            }}
          />
          <TextInput
            value={desc}
            onChangeText={(dsc) => {
              setDesc(dsc);
            }}
            placeholder="Description of your task goes here..."
            style={{
              marginTop: 16,
              borderColor: '#9f9f9f',
              borderWidth: 1,
              width: screenWidth - 64,
              height: 42,
              borderRadius: 25,
              paddingHorizontal: 16,
            }}
          />
          <View>
            <DatePicker
              minimumDate={new Date()}
              date={date}
              onDateChange={(data) => {
                setDate(data);
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              input == ''
                ? alert('Task Cannot Be Empty')
                : todoMaster(input, desc);
            }}
            style={{
              alignSelf: 'flex-end',
              marginHorizontal: 32,
              marginTop: 16,
              paddingHorizontal: 24,
              paddingVertical: 16,
              backgroundColor: 'red',
              justifyContent: 'center',
              borderRadius: 20,
              marginBottom: 16,
            }}>
            <Text style={{color: '#f5f5f5'}}>Add Todo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteAllTodo();
            }}
            style={{
              alignSelf: 'flex-end',
              marginHorizontal: 32,
            }}>
            <Text>Delete All</Text>
          </TouchableOpacity>
          {testState.length == 0 && <Text>Currently no task here</Text>}

          <View style={{alignItems: 'center', backgroundColor: '#fff'}}>
            {testState.map((e) => (
              <TodoItem
                task={e.task}
                done={e.done}
                onPress={() => deleteTodo(e.id)}
                doneTodo={() => doneTodo(e.id, e.done)}
                detail={() => {
                  setShowModal(true);
                  setModalData(e);
                  console.log(e);
                }}
                key={e.id}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modal Component is here cs import export will make this app slower*/}
      <Modal transparent={true} visible={showModal}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: screenWidth - 64,
              padding: 16,
              alignItems: 'center',
            }}>
            <View style={{alignSelf: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={{alignItems: 'flex-end'}}>
                <Icon name="close" size={24} color="#404852" />
              </TouchableOpacity>
            </View>

            <Text>Task Name : {modalData.task}</Text>
            <Text>Description : </Text>
            <Text>{modalData.description}</Text>
            <View
              style={{
                marginVertical: 8,
              }}>
              <TextInput
                onChangeText={(task) => setTaskName(task)}
                style={{
                  width: screenWidth - 84,
                  borderBottomWidth: 1,
                  paddingVertical: 2,
                  paddingHorizontal: 8,
                }}
              />
            </View>
            <View
              style={{
                marginVertical: 4,
              }}>
              <TextInput
                onChangeText={(des) => setTaskDesc(des)}
                style={{
                  width: screenWidth - 84,
                  borderBottomWidth: 1,
                  paddingVertical: 2,
                  paddingHorizontal: 8,
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                marginTop: 8,
              }}
              onPress={() => updateTodo(modalData.id, taskName, taskDesc)}>
              <Icon name="create" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
