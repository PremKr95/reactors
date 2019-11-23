import React from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import Dialogflow from "react-native-dialogflow";
import Tts from 'react-native-tts';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      cardNumber:''
    }
    Dialogflow.setConfiguration(
      "6a0663ee1ea64a10b3419d96cc6a570d", Dialogflow.LANG_ENGLISH
    );
   }

   componentDidMount(){
      // Tts.addEventListener('tts-finish', (event) => {
      //   console.log(event);
      // });
   }
  
   checkCardValidtion(txt){
     while(txt.includes("-") || txt.includes("+") || txt.includes(" ")){
        txt = txt.replace("-","")
        txt = txt.replace("+","")
        txt = txt.replace(" ","")
     }
     txt = txt.trim() 
     console.log("TCL: App -> checkCardValidtion -> txt", txt)
     var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
     if(visaRegEx.test(txt))
          return true
      else
          return false
   }

   dialogflow(){
    setTimeout(()=>{
      Dialogflow.onListeningStarted(() => {
        console.log("listening started");
      });
  
      Dialogflow.onListeningCanceled(() => {
        console.log("listening canceled");
      });
  
      Dialogflow.onListeningFinished(() => {
        console.log("listening finished");
      });
  
      Dialogflow.onAudioLevel(level => {
        console.log(level);
      });
  
      Dialogflow.startListening(result => {
        console.log(result.result.resolvedQuery);
        this.updateData(result.result.resolvedQuery)
      }, error => {
        console.log(error);
      });
    },3000)
   }

   updateData(result){
      console.log("TCL: App -> updateData -> updateData")
      if(this.checkCardValidtion(result)){
        console.log("TCL: App -> updateData -> this.checkCardValidtion(result)")
          Tts.speak(result)
      }
      else{
          Tts.speak("Please speak valid card number")
      }
    
   }

   openAssitant() {
    Tts.speak('Hey, Please Speak your name after the beep');
    this.dialogflow()
  }

  render() {

    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

        <Text>{this.state.cardNumber}</Text>
        <Button
          title="Open Assistant"
          onPress={() => { this.openAssitant() }}
        />
      </View>


    )
  }
}




export default App;
