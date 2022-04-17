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

  //display variables
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [final, setFinal] = useState('0');
  const [op, setOp] = useState("");
  const [symbol, setSymbol] = useState('');

  //calculation variables
  const [value, setValue] = useState(0);


  //result and value should be same at all times
  useEffect(() => {
    //this will show the result, so naturally we want to clear the expresion in input and operations
    setExpression('');
    if (op.length === 2 && op[1] === '#') setOp(op[0]);
    else if (op.length === 2 && op[1] !== '#') setOp(op[1]);
    else setOp("");
    console.log("cleard op array, value= " + value);
    setFinal(value);
    return setResult(value);
  }, [value])

  //when anything is pushed into operation, a operator is pressed and we must evaluate before expression first
  useEffect(() => {
    console.log("op = " + op);
    if (op.length <= 1) setSymbol(op);
    else if(op[1]==='#') setSymbol(op[0]);
    
    if (op.length > 0) {
      evaluate();
    }
  }, [op])

  //the only function that evaluates the results. NOTE: Workflow is like {input, operator, input, operator -> TRIGGER}, so we need to evalute the second last operator
  function evaluate() {
    var input = parseFloat(expression);
    if (op.length === 2 && op[1] !== '#' && input) {
      switch (op[op.length - 2]) {
        case '+': setValue(value + input); break;
        case '-': setValue(value - input); break;
        case 'x': setValue(value * input); break;
        case '÷': setValue(value / input); break;
        default: setValue(input); break;
      }
    } else if (op.length === 2 && op[1] === '#' && input) {
      //called in cases where we have inputs like 1 + , and evaluate is called due to press of operator
      setValue(input);
    }
    else if (op.length === 1 && input) {
      //should only be invoked if I press = key after entering a operation i.e., 1+2 =  
      switch (op[op.length - 1]) {
        case '+': setValue(value + input); break;
        case '-': setValue(value - input); break;
        case 'x': setValue(value * input); break;
        case '÷': setValue(value / input); break;
        default: setValue(input); break;
      }
    } else if (op.length === 0 && input) {
      //should only be called if I press = key without entering a operation, i.e., 1 =
      setValue(input);
    }
  }


  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <View style={styles.display}>
        <Text style={styles.displayText}> {result} {symbol} {expression}</Text>
        <Text style={styles.displayText}>= {final} </Text>
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
            <Pressable style={styles.btn} onPress={() => { evaluate() }}><Text style={styles.btnText}>=</Text></Pressable>
          </View>
        </View>
        <View style={styles.operations}>
          <Pressable style={styles.btn} onPress={() => {
            setExpression('');
            setResult(0);
            setOp("");
            setValue(0);
          }}><Text style={styles.btnText}>DEL</Text></Pressable>
          <Pressable style={styles.btn} onPress={() => {
            if (op.length === 0) setOp(op + '÷#');
            else if (op.length <= 2) setOp(op + '÷');
          }}><Text style={styles.btnText}>÷</Text></Pressable>
          <Pressable style={styles.btn} onPress={() => {
            if (op.length === 0) setOp(op + 'x#');
            else if (op.length <= 2) setOp(op + 'x');
          }}><Text style={styles.btnText}>x</Text></Pressable>
          <Pressable style={styles.btn} onPress={() => {
            if (op.length === 0) setOp(op + '-#');
            else if (op.length <= 2) setOp(op + '-');
          }}><Text style={styles.btnText}>-</Text></Pressable>
          <Pressable style={styles.btn} onPress={() => {
            if (op.length === 0) setOp(op + '+#');
            else if (op.length <= 2) setOp(op + '+');
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
