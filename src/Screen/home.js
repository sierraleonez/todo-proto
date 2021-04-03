import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {notifikasi} from '../../src/notification';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Import Component
import TodoItem from '../components/item';
import TopBar from '../components/topBar';
import {saveTodo, saveID, clearID} from '../action/action';
import AddTodo from '../components/addTodo';

// Screen Dimension
const screenWidth = Dimensions.get('window').width;

export default function home({navigation}) {
  // Get item from local storage
  let todo = AsyncStorage.getItem('todo_item');
  let id = AsyncStorage.getItem('id');

  // State
  const topY = useState(new Animated.Value(hp('100%')))[0];
  const [input, setInput] = useState('');
  const [counter, setCounter] = useState(0);
  const [desc, setDesc] = useState('');
  const [modalData, setModalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [testState, setTestState] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [date, setDate] = useState(new Date());
  const dateNow = new Date();
  const day = dateNow.getDay();

  // Sliding Up function
  function slideUp() {
    Animated.spring(topY, {
      toValue: hp('41%'),
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  function slideDown() {
    Animated.spring(topY, {
      toValue: hp('100%'),
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  // Create dayname
  function dayString() {
    let string;
    day == 1
      ? (string = 'Mon')
      : day == 2
      ? (string = 'Tue')
      : day == 3
      ? (string = 'Wed')
      : day == 4
      ? (string = 'Thurs')
      : day == 5
      ? (string = 'Fri')
      : day == 6
      ? (string = 'Sat')
      : (string = 'Sun');
    return string;
  }

  // Test Notification
  function buatNotif(title, message, alarm) {
    notifikasi.configure();
    notifikasi.createChannel('1');
    notifikasi.scheduleNotif('1', title, message, alarm);
  }

  // Add Todo Function
  const currentDate = new Date();
  function todoMaster(inp, dsc) {
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
    slideDown();
  }

  // Delete Todo Function
  function deleteTodo(id) {
    setTestState(testState.filter((list) => list.id !== id));
    saveTodo(testState.filter((list) => list.id !== id));
  }

  // Clear Todo
  function deleteAllTodo() {
    setTestState([]);
    saveTodo(testState);
  }
  // Done Todo Function
  function doneTodo(id, done) {
    const index = testState.findIndex((x) => x.id == id);
    if (!done) {
      testState[index].done = true;
      saveTodo(testState.filter((x) => x.id !== -1));
      // console.log('done');
    } else {
      testState[index].done = false;
      saveTodo(testState.filter((x) => x.id !== -1));
      // console.log('undone');
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
        // console.log(e + 'localID');
      }
      // console.log(parseInt(e));
      saveID(counter);
    });
    // console.log(testState);
  }, []);
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <TopBar title={`Task(${testState.length})`} />
      <ScrollView
        style={{
          bottom: hp('3%'),
          borderTopLeftRadius: 30,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 32,
            flex: 1,
          }}>
          <View
            style={{
              alignSelf: 'flex-start',
              marginHorizontal: 32,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: '#634DA2',
                borderRadius: 12,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Nunito-Bold',
                  fontSize: 22,
                  color: '#fff',
                  marginBottom: 0,
                }}>
                {dateNow.getDate()}
              </Text>
              <Text
                style={{
                  fontFamily: 'Nunito-Bold',
                  fontSize: 10,
                  color: '#ABB1BB',
                  lineHeight: 12,
                }}>
                {dayString()}
              </Text>
            </View>
            <View style={{marginLeft: 32}}>
              <Text style={{fontFamily: 'Nunito-Regular', fontSize: 14}}>
                8 Hours Per Day
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              // deleteAllTodo();
              slideUp();
            }}
            style={{
              alignSelf: 'flex-end',
              marginHorizontal: 32,
            }}>
            <Text>Delete All</Text>
          </TouchableOpacity>

          {testState.length == 0 && <Text>Currently no task here</Text>}
          <ScrollView>
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
                  }}
                  key={e.id}
                  due={e.due}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('test_screen')}>
          <Text>Go to Test</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          zIndex: 4,
          marginTop: hp('88%'),
          alignSelf: 'flex-end',
          paddingHorizontal: 16,
        }}>
        <Icon name="add-circle" size={64} color="#757EC9" />
      </TouchableOpacity>
      <Animated.View
        style={{
          elevation: 10,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: '#fff',
          position: 'absolute',
          transform: [{translateY: topY}],
        }}>
        <AddTodo
          input={input}
          setInput={setInput}
          desc={desc}
          setDesc={setDesc}
          date={date}
          setDate={setDate}
          todoMaster={todoMaster}
          buatNotif={buatNotif}
        />
      </Animated.View>

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
