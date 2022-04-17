import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput
} from 'react-native';


const App = () => {

  const [expression, setExpression] = useState('0');
  const [value, setValue] = useState(0.0);
  const [result, setResult] = useState(0);
  const [operation, setOperation] = useState('')

  useEffect(() => {
    console.log("Value="+value +" op_len="+operation.length);
    if (operation.length === 1){
      setResult(value + ' ' + operation);
      setExpression('');
      // setOperation('');
    }else if(operation.length === 2){
      // evaluate();
      setResult(value + ' ' + operation[1])
      setOperation(operation[1]);
      // setExpression('');
    }
    else 
    setResult(value)
  }, [value])

  useEffect(() => {
    console.log("pressed "+operation[operation.length-1]+" btn with value= "+value + "and operation="+ operation.length+ "and expression = "+parseFloat(expression));
    let value2;
    if(operation.length === 2){
      value2=parseFloat(result); 
      console.log("Value taken from result "+value2);
      setValue(value2);
      console.log("After updating state: "+value);
      evaluate(true);
      // setResult(value + ' ' + operation[1])
      // setOperation('');
      setExpression('');
    }else if(operation.length === 1 && parseFloat(expression)){
      value2=parseFloat(expression);
      console.log("reading expression now: "+ value2);
      setValue(value2);
    }
  }, [operation])
  

  function evaluate(calledFromOp){
    let number = parseFloat(expression)
    let op = result[result.length - 1];
    console.log("Value="+value+" number="+number+" last_op="+op);
    if(!calledFromOp){
      console.log("called by = operator")
      setOperation('');}
    switch (op){
      case '+': setValue(value + number)
                break;
      case '-': setValue(value - number)
                break;
      case 'x': setValue(value*number)
                break;
      case '÷': setValue(value/number)
                break;
      default:  setValue(number)

    }
  }

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{expression}</Text>
        <Text style={styles.displayText}>= {result===NaN?result=0:result} </Text>
      </View>
      <View style={styles.keypad}>
        <View style={styles.numbers}>
          <View style={{ flex: 1 }}>
            <Pressable style={styles.btn} onPress={() => { setExpression(expression + 7) }}><Text style={styles.btnText}>7</Text></Pressable>
            <Pressable style={styles.btn} onPress={() => { setExpression(expression + 4) }}><Text style={styles.btnText}>4</Text></Pressable>
            <Pressable style={styles.btn} onPress={() => { setExpression(expression + 1) }}><Text style={styles.btnText}>1</Text></Pressable>
            <Pressable style={styles.btn} onPress={() => { setExpression(expression + '.') }}><Text style={styles.btnText}>.</Text></Pressable>
          </View>
          <View style={{ flex: 1 }}>
            <Pressable style={styles.btn} onPress={() => { setExpression(expression + 8) }}><Text style={styles.btnText}>8</Text></Pressable>
            <Pressable style={styles.btn} onPress={() => { setExpression(expression + 5) }}><Text style={styles.btnText}>5</Text></Pressable>
            <Pressable style={styles.btn} onPress={() => { setExpression(expression + 2) }}><Text style={styles.btnText}>2</Text></Pressable>
            <Pressable style={styles.btn} onPress={() => { setExpression(expression + 0) }}><Text style={styles.btnText}>0</Text></Pressable>
          </View>
          <View style={{ flex: 1 }}>
            <Pressable style={styles.btn} onPress={() => { setExpression(expression + 9) }}><Text style={styles.btnText}>9</Text></Pressable>
            <Pressable style={styles.btn} onPress={() => { setExpression(expression + 6) }}><Text style={styles.btnText}>6</Text></Pressable>
            <Pressable style={styles.btn} onPress={() => { setExpression(expression + 3) }}><Text style={styles.btnText}>3</Text></Pressable>
            <Pressable style={styles.btn} onPress={() => {
              evaluate(false);
            }}><Text style={styles.btnText}>=</Text></Pressable>
          </View>
        </View>
        <View style={styles.operations}>
          <Pressable style={styles.btn} onPress={() => { setExpression(''); setResult('') }}><Text style={styles.btnText}>DEL</Text></Pressable>
          <Pressable style={styles.btn} onPress={() => {
            setOperation(operation+'÷');
          }}><Text style={styles.btnText}>÷</Text></Pressable>
          <Pressable style={styles.btn} onPress={() => {
            setOperation(operation+'x');
          }}><Text style={styles.btnText}>x</Text></Pressable>
          <Pressable style={styles.btn} onPress={() => {
            setOperation(operation+'-');
          }}><Text style={styles.btnText}>-</Text></Pressable>
          <Pressable style={styles.btn} onPress={() => {
            setOperation(operation+'+');
          }}><Text style={styles.btnText}>+</Text></Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F55353',
  },
  display: {
    flex: 4,
    backgroundColor: '#202224',
    padding: 20
  },
  keypad: {
    flex: 6,
    flexDirection: 'row',
    backgroundColor: '#F55353',
  },
  displayText: {
    color: '#fff',
    fontSize: 25
  },
  numbers: {
    flex: 9,
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  operations: {
    flex: 3,
    backgroundColor: '#1de9b7'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#494949'
  }
});

export default App;
