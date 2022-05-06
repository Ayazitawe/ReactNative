
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal,TextInput,ScrollView,SafeAreaView,FlatList,Alert,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PushNotification from "react-native-push-notification";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import YouT from './YouT'
import YoutubePlayer from "react-native-youtube-iframe";

import DatePicker from 'react-native-datepicker';
import DateTime from './DateTime';
import Search from './Search';
import LottieView from 'lottie-react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import { ProgressBar} from 'react-native-paper';
import Loader from "./Loader.js";
const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text>{title}</Text>
    </View>
  );
};
  



const renderItem = ({ item }) => <Item title={item.title} />;
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Emailname: this.props.route.params.ORGEmailName,
      flag: true,
      box: false,
      modalVisibleEvents: false,
      modalVisibleYou:false,
      modalVisibleSearch:false,
      modalVisibleEventsEdit: false,
      modalVisibleDonate: false,
      modalVisibleDonateEdit: false,
      modalVisibleDonation:false,
      modalVisibleGoing:false,
      mydate:"",
      playing:false,
      Loading:true,
      message: "" ,
      message2: "" ,
     Name:"",
     date:"",
     date1:"",
     Name1:"",
     Name2:"",
     st:"",
     et:"",
     dataEvent:"",
     dataYouT:"",

     dataDonate:"",
     dataDonation:"",
     dataGoing:"",
     descripV:'',
     link:'',
     id:"",
     EOrT:'1',//events
     picD:'',
     yout:false,
     
    };

    this.arrayholder = this.state.data;
  }
  addImage=(id,str)=>{
      
    var id = id;
    var pic = str;
   
      var APIURL = "http://192.168.1.16/Ekfal/addImage.php";
  
      var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };
            
      var Data ={
       id: id,
       pic :pic, 
      };
  
      fetch(APIURL,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
      .then((response) => response.json())
    .then((responseJson) => {
  
  // Showing response message coming from server after inserting records.
    //this.alert (responseJson);
    this.getEvent()
  }) .catch((error)=>{
        console.error("ERROR FOUND" + error);
      })
    }
    getNotificationChat=()=>{
      var APIURL = "http://192.168.1.16/Ekfal/getNotificationChat.php";
      var headers = {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        };
        var Data ={
          Email: this.state.Emailname,
          flag:'0',
        };
      fetch(APIURL,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
      .then((Response)=> Response.json())
      .then((Response)=>{
       if(Response=="No Results Found"){}
       else {
         //console.log(Response)
        // .log(Response)
          for (var i=0;i<Response.length;i++){
              this.GetInfo(Response[i].userEmail,1)
            }
      }})
      .catch((error)=>{
        console.error("ERROR FOUND" + error);
      })
  
    }
  uploadImage = (id) => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
     };
    launchImageLibrary(options, response => {
       if (response.didCancel) {
        setToastMessage('Cancelled image selection');
       } else if (response.errorCode == 'permission') {
        setToastMessage('Permission not satisfied');
       } else if (response.errorCode == 'others') {
        setToastMessage(response.errorMessage);
       } else if (response.assets[0].fileSize > 2097152) {
        Alert.alert(
           'Maximum image size exceeded',
            'Please choose a file under 2 MB',
  
          [{text: 'OK'}],
  
        );
  
      } else {
        this.setState({pic:'data:Image/png;base64,' + response.assets[0].base64});
      this.addImage(id,this.state.pic)
       
  // console.log(response.assets[0]);
      }
  
    });
  
  };
  uploadImage1 = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
     };
    launchImageLibrary(options, response => {
       if (response.didCancel) {
        setToastMessage('Cancelled image selection');
       } else if (response.errorCode == 'permission') {
        setToastMessage('Permission not satisfied');
       } else if (response.errorCode == 'others') {
        setToastMessage(response.errorMessage);
       } else if (response.assets[0].fileSize > 2097152) {
        Alert.alert(
           'Maximum image size exceeded',
            'Please choose a file under 2 MB',
  
          [{text: 'OK'}],
  
        );
  
      } else {
      
        this.setState({picD:'data:image/png;base64,' + response.assets[0].base64});
  // console.log(response.assets[0]);
      }
  
    });
  
  };
  alert (msg){
    Alert.alert(
      "",
      msg,
      [
        {
          text: "",
        },
        {
          text: "موافق",
        }
      ]
    );
  }
addEvent=()=>{
  if (this.state.date == ""||this.state.date1== ""||this.state.Name== ""
  ||this.state.Name1== ""||this.state.st== ""||this.state.et== ""){
   // Alert.alert("الرجاء ادخال كافة المعلومات!");
   this.alert ("الرجاء ادخال كافة المعلومات!");
  }
  else{
    this.setmodalVisibleEvents(false)
  var Email = this.state.Emailname;
  var Name = this.state.Name;
  var date1= this.state.date1;
  var date = this.state.date;
  var des = this.state.Name1;
  var loc1=this.state.message;
  var loc2=this.state.message2;
  var st=this.state.st;
  var et=this.state.et;
  this.setState({Name:''});
  this.setState({date1:''});
  this.setState({date:''});
  this.setState({Name1:''});
  this.setState({message:''});
  this.setState({message2:''});
  this.setState({st:''});
  this.setState({et:''});
    var APIURL = "http://192.168.1.16/Ekfal/AddEvent.php";

    var headers = {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    };
          
    var Data ={
     Email: Email,
     Name :Name, 
     des:des,
     date1:date1,
     date:date,
     st:st,
     et:et,
     loc1:loc1,
     loc2:loc2,
  
    };

    fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((response) => response.json())
  .then((responseJson) => {

// Showing response message coming from server after inserting records.
  this.alert (responseJson);
  this.getEvent()
}) .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  }}
  addYouT=()=>{
    if (this.state.link == ""||this.state.descripV== ""){
     // Alert.alert("الرجاء ادخال كافة المعلومات!");
     this.alert ("الرجاء ادخال كافة المعلومات!");
    }
    else{
      this.setmodalVisibleYou(false)
    var Email = this.state.Emailname;
    var link = this.state.link;
    var descripV= this.state.descripV;
   
    this.setState({link:''});
    this.setState({descripV:''});
   
  
      var APIURL = "http://192.168.1.16/Ekfal/addYouT.php";
  
      var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };
            
      var Data ={
       Email: Email,
       link :link, 
       descripV:descripV,
       
    
      };
  
      fetch(APIURL,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
      .then((response) => response.json())
    .then((responseJson) => {
  
  // Showing response message coming from server after inserting records.
    this.alert (responseJson);
    this.getEvent()
  }) .catch((error)=>{
        console.error("ERROR FOUND" + error);
      })
    }}
  addDonate=()=>{
  if (this.state.date1== ""||this.state.Name== ""
  ||this.state.Name1== ""||this.state.Name2== ""){
   // Alert.alert("الرجاء ادخال كافة المعلومات!");
   this.alert ("الرجاء ادخال كافة المعلومات!");
  }
  else{
    this.setmodalVisibleDonate(false)
  var Email = this.state.Emailname;
  var Name = this.state.Name;
  var date1= this.state.date1;
  var Name2 = this.state.Name2;
  var Name1 = this.state.Name1;
  var picD=this.state.picD;
  this.setState({Name:''});
  this.setState({date1:''});
  this.setState({Name2:''});
  this.setState({Name1:''});
  this.setState({picD:''});
  
    var APIURL = "http://192.168.1.16/Ekfal/addDonate.php";

    var headers = {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    };
          
    var Data ={
     Email: Email,
     Name :Name, 
     Name1:Name1,
     date1:date1,
     Name2:Name2,
     picD:picD,
    
  
    };

    fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((response) => response.json())
  .then((responseJson) => {

// Showing response message coming from server after inserting records.
  this.alert (responseJson);
  this.getDonate()
}) .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  }}
  GetInfoDonation=(str)=>{
    //console.log("ayazitawe")
   var APIURL = "http://192.168.1.16/Ekfal/GetInfoDonation.php";
        var headers = {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          };
  var Data ={
   id: str,
  
  };

    fetch(APIURL,{
    method: 'POST',
    headers: headers,
    body: JSON.stringify(Data)
  })
  .then((Response)=> Response.json())
  .then((Response)=>{

   if(Response=="No Results Found"){console.log("no notification")}
  else this.setState({dataDonation :Response});
  
   })
  .catch((error)=>{
    console.error("ERROR FOUND" + error);
  })

}
GetInfoGoing=(str)=>{
  //console.log("ayazitawe")
 var APIURL = "http://192.168.1.16/Ekfal/GetInfoGoing.php";
      var headers = {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        };
var Data ={
 id: str,

};

  fetch(APIURL,{
  method: 'POST',
  headers: headers,
  body: JSON.stringify(Data)
})
.then((Response)=> Response.json())
.then((Response)=>{

 if(Response=="No Results Found"){console.log("no notification")}
else this.setState({dataGoing :Response});

 })
.catch((error)=>{
  console.error("ERROR FOUND" + error);
})

}
  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {
      const item_data = `${item.title.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    this.setState({ data: updatedData, searchValue: text });
  };
  setmodalVisibleEvents = (visible1) => {

    this.setState({ modalVisibleEvents: visible1 });
  }
  setmodalVisibleYou = (visible1) => {

    this.setState({ modalVisibleYou: visible1 });
  }
  setmodalVisibleDonate = (visible1) => {

    this.setState({ modalVisibleDonate: visible1 });
  }
  setmodalVisibleDonation =(visible1,str) =>{
    if (visible1==true)this.GetInfoDonation(str)
    this.setState({ modalVisibleDonation: visible1 });

  }
  setModalVisibleGoing =(visible1,str) =>{
    if (visible1==true)this.GetInfoGoing(str)
    this.setState({ modalVisibleGoing: visible1 });

  }
  setmodalVisibleDonateEdit = (visible1,item) => {
    if(visible1==false){
      this.setState({Name:''});
      this.setState({date1:''});
      this.setState({Name2:''});
      this.setState({Name1:''});
      this.setState({picD:''});
     }
    if(visible1==true){
     this.setState({id: item.id});
      this.setState({Name: item.Name});
      this.setState({date1: item.date});
      this.setState({Name2: item.money});
      this.setState({Name1: item.descr});
      this.setState({picD: item.picD});
    }
    this.setState({ modalVisibleDonateEdit: visible1 });
  }
  setmodalVisibleEventsEdit = (visible1,item) => {
    if(visible1==false){
      this.setState({id: ''});
       this.setState({st:''});
       this.setState({Name:''});
       this.setState({et: ''});
       this.setState({date1: ''});
       this.setState({date: ''});
       this.setState({Name1: ''});
       this.setState({message: ''});
     }
    if(visible1==true){
     this.setState({id: item.id});
      this.setState({st: item.stEvent});
      this.setState({Name: item.nameEvent});
      this.setState({et: item.etEvent});
      this.setState({date1: item.edEvent});
      this.setState({date: item.sdEvent});
      this.setState({Name1: item.desEvent});
      this.setState({message: item.locEvent});
    } 
      this.setState({ modalVisibleEventsEdit: visible1 });
  }
  setmodalVisibleSearch = (visible1) => {

    this.setState({ modalVisibleSearch: visible1 });
  }
  handleNotification = (str, str1) => {
    //console.log(str1)
    PushNotification.localNotification({
      channelId: "test-channel",
      title: "إكفل                                                              ",
      message: "" + str1 + " " + str + "                                 ",
    });

  }
  handleNotificationEkfal = (str, str1, str3) => {
    //console.log(str1)
    PushNotification.localNotification({
      channelId: "test-channel",
      title: "إكفل                                                              ",
      message: "" + str3 + "" + str1 + " " + str + "                                 ",
    });

  }
  GetInfo = (str,flag) => {

    var APIURL = "http://192.168.1.16/Ekfal/userProfile.php";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      Email: str

    };

    fetch(APIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then((Response) => Response.json())
      .then((Response) => {
      if(flag==1)  {
        PushNotification.localNotification({
          channelId: "test-channel",
          title: "إكفل                                                              " ,
          message: " تم إرسال رسالة بواسطة "+Response[0].Message0+"                       "
       });
      }
      else {
        this.handleNotification(Response[0].Message0, "حازت جمعيتك على إشتراك ")
      }
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })

  }
  
  GetInfoEkfal = (str, str3, ekfalTimes) => {

    var APIURL = "http://192.168.1.16/Ekfal/userProfile.php";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      Email: str

    };

    fetch(APIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then((Response) => Response.json())
      .then((Response) => {
        if (ekfalTimes == 1) this.handleNotificationEkfal("        " + Response[0].Message0, " قام بكفالة الطفل", str3)
        else this.handleNotificationEkfal(str3, " قام بالدفع الشهري للطفل", Response[0].Message0)
      }
      )
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })

  }
  getNotification = () => {
    var APIURL = "http://192.168.1.16/Ekfal/getNotification.php";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      Email: this.state.Emailname,

    };
    fetch(APIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then((Response) => Response.json())
      .then((Response) => {
        if (Response == "No Results Found") { }
        else {
          for (var i = 0; i < Response.length; i++) {
            this.GetInfo(Response[i].UserEmail, "1", "")
          }
        }
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })

  }
  getNotificationEvent = () => {
    var APIURL = "http://192.168.1.16/Ekfal/getNotificationEvent.php";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      Email: this.state.Emailname,

    };
    fetch(APIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then((Response) => Response.json())
      .then((Response) => {
        if (Response == "No Results Found") { }
        else {
        //  console.log(Response)
          for (var i = 0; i < Response.length; i++) {
            PushNotification.localNotification({
              channelId: "test-channel",
              title: "إكفل                                                              ",
              // message: "" + "قام بتأكيد الحضور" + " " + Response[i].userName + "                                 ",
              message: "" + Response[i].userName + " " + "قام بتأكيد الحضور "  + "إلى مناسبة "+Response[i].nameEvent+"        "

            });
           
          }
        }
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })

  }
  getNotificationDonation = () => {
    var APIURL = "http://192.168.1.16/Ekfal/getNotificationDonation.php";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      Email: this.state.Emailname,

    };
    fetch(APIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then((Response) => Response.json())
      .then((Response) => {
        if (Response == "No Results Found") { }
        else {
        //  console.log(Response)
          for (var i = 0; i < Response.length; i++) {
            PushNotification.localNotification({
              channelId: "test-channel",
              title: "إكفل                                                              ",
              // message: "" + "قام بتأكيد الحضور" + " " + Response[i].userName + "                                 ",
              message: "" + Response[i].userName + " " + "قام بالتبرع لصالح " +Response[i].Name+" "+"بقيمة "+this.convertstr(Response[i].money+"")+" "+"شيكل"

            });
           
          }
        }
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })

  }
  getNotificationEkfal = () => {

    var APIURL = "http://192.168.1.16/Ekfal/getNotificationEkfal.php";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      Email: this.state.Emailname,  //org email

    };
    fetch(APIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then((Response) => Response.json())
      .then((Response) => {
        // console.log(Response)
        if (Response == "No Results Found") {
          //console.log(Response)
        }
        else {
          //console.log(Response)

          for (var i = 0; i < Response.length; i++) {
            this.GetInfoEkfal(Response[i].userEkfal, Response[i].ChildName, Response[i].ekfalTimes)

          }
        }
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })

  }
  componentDidUpdate() {
    this.getNotification()
    this.getNotificationEkfal()
    this.getNotificationEvent()
    this.getNotificationDonation()
    this.getNotificationChat()


  }
  changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.mydate;
    this.setState({mydate:currentDate});
  };
   showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
 };
  displayTimepicker = () => {
    showMode('time');
 };
 callbackFunction = (childData1,childData2) => {
   this.setmodalVisibleSearch(false)
   console.log (childData1)
  this.setState({message: childData1})
  console.log (childData2)
  this.setState({message2: childData2})
}
callbackFunction1 = (childData1,childData2) => {
  if (childData1=='str1'){this.setState({et: childData2})}
  if (childData2=='str2'){this.setState({st: childData1})}

}
getEvent=() =>{
  //var Email = this.props.Email;
  var APIURL = "http://192.168.1.16/Ekfal/getEvent.php";

    var headers = {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    };
          
    var Data ={
      Email: this.state.Emailname,
     
    };

    fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((response) => response.json())
  .then((responseJson) => {
    if (responseJson=="No Results Found"){}
    else{
    //console.log(responseJson)
  this.setState({dataEvent:responseJson})}
  }) .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
}
getYouT=() =>{
  //var Email = this.props.Email;
  var APIURL = "http://192.168.1.16/Ekfal/getYouT.php";

    var headers = {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    };
          
    var Data ={
      Email: this.state.Emailname,
     
    };

    fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((response) => response.json())
  .then((responseJson) => {
    if (responseJson=="No Results Found"){}
    else{
    //console.log(responseJson)
  this.setState({dataYouT:responseJson})}
  }) .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
}
getDonate=() =>{
  //var Email = this.props.Email;
  var APIURL = "http://192.168.1.16/Ekfal/getDonate.php";

    var headers = {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    };
          
    var Data ={
      Email: this.state.Emailname,
     };

    fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((response) => response.json())
  .then((responseJson) => {
    if (responseJson=="No Results Found"){ this.setState({Loading:false}) }
    else {
  //console.log(responseJson)
  this.setState({dataDonate:responseJson}); this.setState({Loading:false})
}
  }) .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
}

deleteEvent=(id) =>{
  var APIURL = "http://192.168.1.16/Ekfal/deleteEvent.php";
  var headers = {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    };

var Data ={
id: id

};

fetch(APIURL,{
method: 'POST',
headers: headers,
body: JSON.stringify(Data)
})
.then((Response)=> Response.json())
.then((Response)=>{
alert (Response);

this.setState({dataEvent: ''});
this.getEvent();

})
.catch((error)=>{
console.error("ERROR FOUND" + error);
})
}
deleteDonate=(id) =>{
  var APIURL = "http://192.168.1.16/Ekfal/deleteDonate.php";
  var headers = {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    };

var Data ={
id: id

};

fetch(APIURL,{
method: 'POST',
headers: headers,
body: JSON.stringify(Data)
})
.then((Response)=> Response.json())
.then((Response)=>{
alert (Response);

this.setState({dataEvent: ''});
this.addDonate();

})
.catch((error)=>{
console.error("ERROR FOUND" + error);
})
}
editEvent=() =>{
  this.setmodalVisibleEventsEdit(false)
  var id=this.state.id;
  var Name = this.state.Name;
  var date1= this.state.date1;
  var date = this.state.date;
  var des = this.state.Name1;
  var loc1=this.state.message;
  var loc2=this.state.message2;
  var st=this.state.st;
  var et=this.state.et;
  this.setState({Name:''});
  this.setState({date1:''});
  this.setState({date:''});
  this.setState({Name1:''});
  this.setState({message:''});
  this.setState({message2:''});
  this.setState({st:''});
  this.setState({et:''});
  var APIURL = "http://192.168.1.16/Ekfal/editEvent.php";
  var headers = {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    };
var Data ={
  id:id,
  Name :Name, 
  des:des,
  date1:date1,
  date:date,
  st:st,
  et:et,
  loc1:loc1,
  loc2:loc2,

};

fetch(APIURL,{
method: 'POST',
headers: headers,
body: JSON.stringify(Data)
})
.then((Response)=> Response.json())
.then((Response)=>{
this.alert ("تم التعديل بنجاح");

this.setState({dataEvent: ''});
this.getEvent();

})
.catch((error)=>{
console.error("ERROR FOUND" + error);
})
}
editDonate=() =>{
  this.setmodalVisibleDonateEdit(false)
  var id=this.state.id;
  var Name = this.state.Name;
  var date1= this.state.date1;
  var Name2 = this.state.Name2;
  var Name1 = this.state.Name1;
  var picD= this.state.picD;
  this.setState({ Name: '' });
  this.setState({ date1: '' });
  this.setState({ Name2: '' });
  this.setState({ Name1: '' });
  this.setState({ picD: '' });
  var APIURL = "http://192.168.1.16/Ekfal/editDonate.php";
  var headers = {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    };
var Data ={
  id:id,
  Name :Name, 
  Name1 :Name1, 
  Name2 :Name2,
  date1:date1,
  picD:picD,
};

fetch(APIURL,{
method: 'POST',
headers: headers,
body: JSON.stringify(Data)
})
.then((Response)=> Response.json())
.then((Response)=>{
this.alert ("تم التعديل بنجاح");

this.setState({dataDonate: ''});
this.getDonate();

})
.catch((error)=>{
console.error("ERROR FOUND" + error);
})
}
convertstr=(str)=>{
  var arabicNumbers = ["٠","١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩" ]  
  for(var i=0; i <10; i++)
   {
     for (var j=0;j<str.length;j++)
     str = str.replace(i,arabicNumbers[i] );
   }
   return str;
 }
 ListEmptyView = () => {
  return (

      <Text style={{textAlign: 'center'}}> لا يوجد مناسبات  في القائمة</Text>

  );
}
ListEmptyView1 = () => {
  return (

      <Text style={{textAlign: 'center'}}> لا يوجد تبرعات  في القائمة</Text>

  );
}
  render() {
    const { modalVisibleEvents } = this.state;
    const { modalVisibleYou } = this.state;
    const { modalVisibleSearch } = this.state;
    const { modalVisibleEventsEdit } = this.state;
    const { modalVisibleDonateEdit } = this.state;
    const { modalVisibleDonate } = this.state;
    const { modalVisibleDonation } = this.state;
    const { modalVisibleGoing} = this.state;
    if (this.state.flag == true) {
      this.state.flag = false;
      this.getNotification()
      this.getNotificationEkfal()
      this.getNotificationEvent()
      this.getNotificationDonation()
      this.getNotificationChat()
    }
    if(this.state.dataEvent==""){
      this.getEvent()
    }
    if(this.state.dataYouT==""){
      this.getYouT()
    }
    if(this.state.dataDonate==""){
      this.getDonate()

    }
    if ( this.state.Loading) {
      
      return(  <Loader>  </Loader> 
     
      
      );
               
     }
     else {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "white" }}>
        <View style={[styles.whiteSheet2, { flexDirection: 'row-reverse' }]}>
          <Text style={styles.title4}>
          {this.state.EOrT=='1' ?("مناسبات إكفل "):("")}
          {this.state.EOrT=='2' ?("تبرعات إكفل "):("")} 
          {this.state.EOrT=='' ?("مقاطع الفيديو"):("")}
          </Text>
          {this.state.EOrT=='1'? (
            <TouchableOpacity style={{ marginRight: '28%' }} onPress={() => { this.setState({EOrT:'2'}) }}>
            <Icon name="charity" color="black" size={29} style={{ marginLeft: 3 ,top:2}} />
          </TouchableOpacity>
          ) :(
            null
          )}
          {this.state.EOrT=='2'? (
            <TouchableOpacity style={{ marginRight: '32%' }} onPress={() => { this.setState({EOrT:'1'}) }}>
            <Ionicons name="calendar" color="black" size={26} style={{ marginLeft: 5 ,top:2}} />
          </TouchableOpacity>
          ) :(
            null
          )}
          {this.state.EOrT==''? (
            <TouchableOpacity style={{ marginRight: '28%' }} onPress={() => { this.setState({EOrT:'2'}) }}>
            <Icon name="charity" color="black" size={29} style={{ marginLeft: 3 ,top:2}} />
          </TouchableOpacity>
          ) :(
            null
          )}
          <TouchableOpacity style={{ marginRight: '3%' }} 
           onPress={() => { this.setState({yout:!this.state.yout});this.setState({EOrT:''})}}>
          <Ionicons name="md-logo-youtube" color="black" size={29} style={{ marginLeft: 5 ,top:2}} />
          </TouchableOpacity>
          
          <TouchableOpacity style={{ marginRight: '3%' }} onPress={() => { 
            {this.state.EOrT=='1' ? (this.setmodalVisibleEvents(true)):null}
            {this.state.EOrT=='2' ? (this.setmodalVisibleDonate(true)):null}
            {this.state.EOrT=='' && this.state.yout==true ? (this.setmodalVisibleYou(true)):null}

          }}>
            <Ionicons name="add-circle" color="black" size={30} style={{ marginLeft: 5 }} />
          </TouchableOpacity>
        </View>
   
  {this.state.EOrT=='1' ? (
  <FlatList
  data={this.state.dataEvent}
  ListEmptyComponent={this.ListEmptyView}
  style={{width:320,top:-30,right:0,backgroundColor:"white"}}
  windowSize={5}
  keyExtractor={(item) => item.id}
  renderItem={({item}) => {
    return(
        <View style={[styles1.card, styles1.elevation, { left: 7, top: 0, width: 300, height: 360}]}>
         <TouchableOpacity style={{top:-30,left:30,width:180,height:180}}  onPress={()=>{this.uploadImage(item.id)}}> 
        {item.pic==""?(
          <LottieView
          source={require('../../assets/lf30_editor_pbzoamjb.json')}
          autoPlay
          loop={true}
          speed={1.5}
         />
        ):(
        <Image style={styles1.userImage} source={{uri:item.pic}}/>
       )}
          </TouchableOpacity> 

          
       {this.state.dataEvent =="" ?(null):(
        <View style={{top:-20}}>


<Text style={{top:-20,fontSize:14}}>يبدأ في  {this.convertstr(item.sdEvent.split('/')[1])}/
          {this.convertstr(item.sdEvent.split('/')[0])} الساعة {this.convertstr(item.stEvent.split(':')[0])}:
          {this.convertstr(item.stEvent.split(':')[1])} 
          </Text>
          <TouchableOpacity onPress={() => {this.alert(item.desEvent)}}>
          <Text style={{top:-20,fontWeight:'bold',fontSize:22}}>{item.nameEvent}</Text>
          </TouchableOpacity>
          <Text style={{top:-20,fontSize:18}}>{item.locEvent}</Text>
          <Text style={{top:-20,fontSize:14}}>ينتهي في  {this.convertstr(item.edEvent.split('/')[1])}/
          {this.convertstr(item.edEvent.split('/')[0])} الساعة {this.convertstr(item.etEvent.split(':')[0])}:
          {this.convertstr(item.etEvent.split(':')[1])} 
          </Text> 
          <TouchableOpacity onPress={() => {this.setModalVisibleGoing(true,item.id)}}>             
          <Text style={{top:-20,fontSize:14}}>أشخاص سيحضرون: {this.convertstr(item.num+"")}</Text>
           </TouchableOpacity>

          </View>
       )}  
        <View style={{flexDirection:'row-reverse',top:-25}}>
          <TouchableOpacity style={{backgroundColor:'#ebebeb',width:199,height:35,right:10,borderRadius:7}} onPress={() => {this.setmodalVisibleEventsEdit(true,item)}}>
            <Text style={{fontSize:18,fontWeight:'bold',alignSelf:'center',top:3}}>تعديل</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'#ebebeb',width:60,height:35,borderRadius:7}} onPress={()=>{this.deleteEvent(item.id)}}>
           <Icon name='delete' size={25} style={{alignSelf:'center',top:3}}></Icon>
          </TouchableOpacity>
        </View>

      </View> 
    )}}
/>

  ):(
    null
  )}

{this.state.EOrT=='2' ? (
   <FlatList
   data={this.state.dataDonate}
   ListEmptyComponent={this.ListEmptyView1}
   style={{width:320,top:-30,right:0,backgroundColor:"white"}}
   windowSize={5}
   keyExtractor={(item) => item.id}
   renderItem={({item}) => {
     return(
         <View style={[styles1.card, styles1.elevation, { left: 7, top: 0, width: 300, height: 360}]}>
           <Image style={{ height: 180, width: 300, alignSelf:'center', top:-46,left:0}} source={{uri:item.picD}}/>
          
           {this.state.dataDonate==""?(null):(
              <View style={{top:-20}}>
          
              <TouchableOpacity onPress={() => {this.alert(item.desEvent)}}>
              <Text style={{top:-20,fontWeight:'bold',fontSize:22}}>{item.Name}</Text>
              </TouchableOpacity>
              <Text style={{top:-20,fontSize:14}}>تم جمع مبلغ {this.convertstr(item.donation)} من إجمالي {this.convertstr(item.money)}</Text>
           {/* <Text style={{top:-20,fontSize:14}}>مقدار التبرع {this.convertstr(item.money)} شيكل</Text> */}
            <ProgressBar style={{ marginTop:-10,marginBottom:25,transform: [{ rotateY: '180deg' }]}} progress={parseFloat(item.donation/item.money)} color="#924c9e" />
            <TouchableOpacity onPress={() => {this.setmodalVisibleDonation(true,item.id)}}>             
           <Text style={{top:-20,fontSize:14}}>تبرع {this.convertstr(item.num+"")} شخصا</Text>
            </TouchableOpacity>
           </View>
           )}
         
         <View style={{flexDirection:'row-reverse',top:-25}}>
           <TouchableOpacity style={{backgroundColor:'#ebebeb',width:199,height:35,right:10,borderRadius:7}} onPress={() => {this.setmodalVisibleDonateEdit(true,item)}}>
             <Text style={{fontSize:18,fontWeight:'bold',alignSelf:'center',top:3}}>تعديل</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{backgroundColor:'#ebebeb',width:60,height:35,borderRadius:7}} onPress={()=>{this.deleteDonate(item.id)}}>
            <Icon name='delete' size={25} style={{alignSelf:'center',top:3}}></Icon>
           </TouchableOpacity>
         </View>
 
       </View> 
     )}}
 />

  ):(
   null
  )}
   {this.state.yout==true ? (
    <FlatList
   data={this.state.dataYouT}
   ListEmptyComponent={this.ListEmptyView1}
   style={{width:320,top:-30,right:0,backgroundColor:"white"}}
   windowSize={5}
   keyExtractor={(item) => item.id}
   renderItem={({item}) => {
     return(
         <View style={[styles1.card, styles1.elevation, { left: 7, top: 0, width: 300, height: 310}]}>
            
         <View style={{flexDirection:'row-reverse',top:-30,right:-8}}>
           <Avatar.Image
             size={77}
             source={{ uri: item.Message3 }}
           />
           <Text style={{ color: 'black', fontSize: 22, fontFamily: 'Manrope-Bold', top:20,right: -10 }}>
             {item.Message0}
           </Text>
           
         </View>
           <Text style={{top:-25,fontSize:20,marginBottom:-15}}>{item.descripV}</Text>
         
           <View style={{width:300,left:-27}}>
             {/* <Text>{item.idLink.split('/')[3]}</Text> */}
      <YoutubePlayer
        height={300}
        play={this.state.playing}
        videoId={item.idLink.split('/')[3]}
        // onChangeState={onStateChange}
      />
    
        </View>

       </View> 
     )}}
 />
   ):(null)}
   <Modal
         statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={modalVisibleDonation}
          onRequestClose={() => {
             this.setmodalVisibleDonation(!modalVisibleDonation);
          }}
          coverScreen={false}
        >
         <View style={styles.container1}>
         <View style={stylesfollower.whiteSheet1}>
         <TouchableOpacity style={{marginLeft:310}} onPress={()=> {this.setmodalVisibleDonation(!modalVisibleDonation)}}>
         <Icon name="arrow-right" color="black" size={34} style={{marginLeft:5}}/>
         </TouchableOpacity>
         <Text style={{right:"300%",fontSize:25,fontWeight:'bold',color:'black',paddingBottom:0,}}>المتبرعين</Text>
         </View>
         <FlatList
        style={stylesfollower.root}
        data={this.state.dataDonation}
        ItemSeparatorComponent={() => {
          return (
            <View style={stylesfollower.separator}/>
          )
        }}
        keyExtractor={(item)=>{
            return item.id;
        }}
        renderItem={({item}) => {
          return(
            <View style={stylesfollower.container}>
              <Image source={{uri:item.image}} style={stylesfollower.avatar}/>
              <View style={stylesfollower.content}>
               
                  <View style={stylesfollower.text}>
                    <Text style={stylesfollower.name}>  {   item.userName    } </Text>
                    <Text style={{top:15}}>  المبلغ المتبرع به هو: {this.convertstr(item.DonationMoney)} </Text>
                  </View>
               </View>
               <View style={{flexDirection:'row-reverse',marginTop:45}}>
              
               {/* <TouchableOpacity style={{backgroundColor:"#924c9e",width:50,height:30}} onPress={()=>this.confirm(item.userEmail)} >
           <Text style={{color:"white",alignSelf:'center',top:6}} >   </Text>
         </TouchableOpacity> */}
         </View>
              </View>
          );
        }}/>
         </View>
   </Modal>
        
   <Modal
         statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={modalVisibleGoing}
          onRequestClose={() => {
             this.setModalVisibleGoing(!modalVisibleGoing);
          }}
          coverScreen={false}
        >
         <View style={styles.container1}>
         <View style={stylesfollower.whiteSheet1}>
         <TouchableOpacity style={{marginLeft:310}} onPress={()=> {this.setModalVisibleGoing(!modalVisibleGoing)}}>
         <Icon name="arrow-right" color="black" size={34} style={{marginLeft:5}}/>
         </TouchableOpacity>
         <Text style={{right:"300%",fontSize:25,fontWeight:'bold',color:'black',paddingBottom:0,}}>الحضور</Text>
         </View>
         <FlatList
        style={stylesfollower.root}
        data={this.state.dataGoing}
        ItemSeparatorComponent={() => {
          return (
            <View style={stylesfollower.separator}/>
          )
        }}
        keyExtractor={(item)=>{
            return item.id;
        }}
        renderItem={({item}) => {
          return(
            <View style={stylesfollower.container}>
              <Image source={{uri:item.image}} style={stylesfollower.avatar}/>
              <View style={stylesfollower.content}>
                 
                  <View style={stylesfollower.text}>
                    <Text style={stylesfollower.name}>  {   item.userName    } </Text>
                    {/* <Text style={{top:15}}>  المبلغ المتبرع به هو: {this.convertstr(item.DonationMoney)} </Text> */}
                  </View>
               </View>
               <View style={{flexDirection:'row-reverse',marginTop:45}}>
              
         </View>
              </View>
          );
        }}/>
         </View>
   </Modal>
         <Modal
          statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={modalVisibleSearch}
          onRequestClose={() => {
            this.setmodalVisibleSearch(!modalVisibleSearch);
          }}
          coverScreen={false}
        >
       <Search parentCallback = {this.callbackFunction}></Search>
       <Text>{this.state.message} </Text>
        </Modal>
        <Modal
          statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={modalVisibleEvents}
          onRequestClose={() => {
            this.setmodalVisibleEvents(!modalVisibleEvents);
          }}
          coverScreen={false}
        >
        <View style={{flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center"}}>

        <View style={styles.whiteSheetEvent}>
        <TouchableOpacity onPress={()=> {this.addEvent();}}>
        <Icon name="check" color="#924c9e" size={34} style={{marginLeft:5}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft:270}} onPress={()=> {this.setmodalVisibleEvents(!modalVisibleEvents)}}>
        <Icon name="close" color="black" size={34} style={{marginLeft:5}}/>
        </TouchableOpacity>
        <Text style={{right: 230,fontSize: 25,fontWeight: 'bold',color: 'black',paddingBottom: 0,}}>  إنشاء مناسبة جديدة</Text>
        </View>
       <View style={styles.centerContent1}>
      <SafeAreaView style={styles.form1}>
      <ScrollView style={{left:-150,height:600,width:300}}>
        <TextInput
        style={styles.input1}
        placeholder="اسم المناسبة"
        autoCapitalize="none"
        keyboardType="default"
        value={this.state.Name}
        textContentType="givenName"
        onChangeText={Name=>this.setState({Name})}
        />
        <DateTime parentCallback = {this.callbackFunction1} ></DateTime>
        <DatePicker
        style={[styles.input1,{width:300}]}
        date={this.state.date}
        mode="date"
        placeholder="تاريخ البدء"
        format="DD/MM/YYYY"
        minDate="01-01-1900"
        confirmBtnText="Confirm"
        value={this.state.date}
        cancelBtnText="Cancel"
        customStyles={{
        dateIcon: {
          position: 'absolute',
          right: -5,
          top: 4,
          marginLeft: 0,
          width:30,
          height:30,
          // tintColor: "gray",
          opacity:0.0
        },
        dateInput: {
          borderColor : "gray",
          alignItems: "flex-end",
          borderWidth: 0,
          borderBottomWidth: 1,
          
        },
        placeholderText: {
          fontSize: 16,
          color: "#a1a1a1"
          ,fontFamily: 'FontAwesome'
        },
        dateText: {
          fontSize: 17,
          marginRight: 0
        }
        }}
        onDateChange={date=>this.setState({date})}
       />
       <DatePicker
        style={[styles.input1,{width:300}]}
        date={this.state.date1}
        mode="date"
        placeholder="تاريخ الإنتهاء"
        format="DD/MM/YYYY"
        minDate="01-01-1900"
        confirmBtnText="Confirm"
        value={this.state.date1}
        cancelBtnText="Cancel"
        customStyles={{
        dateIcon: {
          position: 'absolute',
          right: -5,
          top: 4,
          marginLeft: 0,
          width:30,
          height:30,
          // tintColor: "gray",
          opacity:0.0
        },
        dateInput: {
          borderColor : "gray",
          alignItems: "flex-end",
          borderWidth: 0,
          borderBottomWidth: 1,
          
        },
        placeholderText: {
          fontSize: 16,
          color: "#a1a1a1"
          ,fontFamily: 'FontAwesome'
        },
        dateText: {
          fontSize: 17,
          marginRight: 0
        }
        }}
        onDateChange={date1=>this.setState({date1})}
       />
     <TouchableOpacity style={styles.input1} onPress={()=> this.setmodalVisibleSearch(true)}>
       {this.state.message=="" ? (
         <Text style={{ fontSize: 16,color: "#a1a1a1" ,fontFamily: 'FontAwesome'}}>الموقع</Text>
       ):(
        <Text style={{ fontSize: 16,color: "black" ,fontFamily: 'FontAwesome'}}>{this.state.message}/ {this.state.message2}</Text>
       )} 
      </TouchableOpacity>  
      <TextInput
        style={[styles.input1,{marginBottom:260}]}
        placeholder=" الوصف"
        autoCapitalize="none"
        keyboardType="default"
        value={this.state.Name1}
        textContentType="givenName"
        onChangeText={Name1=>this.setState({Name1})}
      />
      
     
       
      
    </ScrollView>
      </SafeAreaView> 

    </View>
    </View>
       </Modal>
       <Modal
          statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={modalVisibleYou}
          onRequestClose={() => {
            this.setmodalVisibleYou(!modalVisibleYou);
          }}
          coverScreen={false}
        >
        <View style={{flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center"}}>

        <View style={styles.whiteSheetEvent}>
        <TouchableOpacity onPress={()=> {this.addYouT();}}>
        <Icon name="check" color="#924c9e" size={34} style={{marginLeft:5}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft:270}} onPress={()=> {this.setmodalVisibleYou(!modalVisibleYou)}}>
        <Icon name="close" color="black" size={34} style={{marginLeft:5}}/>
        </TouchableOpacity>
        <Text style={{right: 270,fontSize: 25,fontWeight: 'bold',color: 'black',paddingBottom: 0,}}>إضافة مقطع فيديو جديد</Text>
        </View>
       <View style={styles.centerContent1}>
      <SafeAreaView style={styles.form1}>
      <ScrollView style={{left:-150,height:600,width:300}}>
      <Image style={{ height: "32%", width: 300, alignSelf:'center', top:16,bottom:10,left:0}} source={require('./rr.png')}/>

        <TextInput
        style={[styles.input1,{top:80}]}
        placeholder="رابط الفيديو"
        autoCapitalize="none"
        keyboardType="default"
        dataDetectorTypes="link"
        value={this.state.link}
        // textContentType="givenName"
        onChangeText={link=>this.setState({link})}
        />
        
      <TextInput
        style={[styles.input1,{marginBottom:260,top:70}]}
        placeholder=" الوصف"
        autoCapitalize="none"
        keyboardType="default"
        value={this.state.descripV}
        textContentType="givenName"
        onChangeText={descripV=>this.setState({descripV})}
      />

      
     
       
      
    </ScrollView>
      </SafeAreaView> 

    </View>
    </View>
       </Modal>
       <Modal
          statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={modalVisibleDonate}
          onRequestClose={() => {
            this.setmodalVisibleDonate(!modalVisibleDonate);
          }}
          coverScreen={false}
        >
        <View style={{flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center"}}>

        <View style={styles.whiteSheetEvent}>
        <TouchableOpacity onPress={()=> {this.addDonate();}}>
        <Icon name="check" color="#924c9e" size={34} style={{marginLeft:5}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft:270}} onPress={()=> {this.setmodalVisibleDonate(!modalVisibleDonate)}}>
        <Icon name="close" color="black" size={34} style={{marginLeft:5}}/>
        </TouchableOpacity>
        <Text style={{right: 230,fontSize: 25,fontWeight: 'bold',color: 'black',paddingBottom: 0,}}>  إنشاء تبرع جديد</Text>
        </View>
       <View style={styles.centerContent1}>
      <SafeAreaView style={styles.form1}>
      <ScrollView style={{left:-150,height:600,width:300,top:-20}}>
        <TouchableOpacity style={{flexDirection:'column',width:150,height:120,backgroundColor:'#F6F7FB',alignSelf:"center",borderColor:'#f2f2f2',borderWidth:1}} onPress={()=> {this.uploadImage1()}}>
        {this.state.picD=='' ? (
          <Image style={{width:70,height:70,alignSelf:"center",top:30}} source={{uri:'https://scontent.fjrs1-2.fna.fbcdn.net/v/t1.15752-9/278340560_717802682964623_2930919463595657142_n.png?_nc_cat=106&ccb=1-5&_nc_sid=ae9488&_nc_ohc=mBsBbdJ4G6sAX8k3cTi&_nc_ht=scontent.fjrs1-2.fna&oh=03_AVJg5pOYgsj0Ud7MVrY5X4mFYlt3UQ-8ZCkNhG9WC-wShw&oe=628083E6'}}></Image>

        ):(
          <Image style={{width:150,height:120,alignSelf:"center"}} source={{uri:this.state.picD}}></Image>

        )}
        </TouchableOpacity>
        <Text style={{alignSelf:'center',top:10,marginBottom:20, color: "#7d7c7d"}}>إختر صورة</Text>

        <TextInput
        style={styles.input1}
        placeholder="عنوان التبرع "
        autoCapitalize="none"
        keyboardType="default"
        value={this.state.Name}
        textContentType="givenName"
        onChangeText={Name=>this.setState({Name})}
        />
       
       <DatePicker
        style={[styles.input1,{width:300}]}
        date={this.state.date1}
        mode="date"
        placeholder="تاريخ إنتهاء التبرع"
        format="DD/MM/YYYY"
        minDate="01-01-1900"
        confirmBtnText="Confirm"
        value={this.state.date1}
        cancelBtnText="Cancel"
        customStyles={{
        dateIcon: {
          position: 'absolute',
          right: -5,
          top: 4,
          marginLeft: 0,
          width:30,
          height:30,
          // tintColor: "gray",
          opacity:0.0
        },
        dateInput: {
          borderColor : "gray",
          alignItems: "flex-end",
          borderWidth: 0,
          borderBottomWidth: 1,
          
        },
        placeholderText: {
          fontSize: 16,
          color: "#a1a1a1"
          ,fontFamily: 'FontAwesome'
        },
        dateText: {
          fontSize: 17,
          marginRight: 0
        }
        }}
        onDateChange={date1=>this.setState({date1})}
       />
       <TextInput
              style={styles.input1}
              placeholder="المبلغ المطلوب"
              autoCapitalize="none"
              keyboardType="numeric"
              value={this.state.Name2}
              onChangeText={Name2 => this.setState({Name2})}
              /> 
      
      <TextInput
        style={[styles.input1,{marginBottom:260}]}
        placeholder=" الوصف"
        autoCapitalize="none"
        keyboardType="default"
        value={this.state.Name1}
        textContentType="givenName"
        onChangeText={Name1=>this.setState({Name1})}
      />
      
     
       
      
    </ScrollView>
      </SafeAreaView> 

    </View>
    </View>
       </Modal>
       <Modal
          statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={modalVisibleEventsEdit}
          onRequestClose={() => {
            this.setmodalVisibleEvents(!modalVisibleEventsEdit);
          }}
          coverScreen={false}
        >
        <View style={{flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center"}}>

        <View style={styles.whiteSheetEvent}>
        <TouchableOpacity onPress={()=> {this.editEvent();}}>
        <Icon name="check" color="#924c9e" size={34} style={{marginLeft:5}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft:270}} onPress={()=> {this.setmodalVisibleEventsEdit(false)}}>
        <Icon name="close" color="black" size={34} style={{marginLeft:5}}/>
        </TouchableOpacity>
        <Text style={{right: 230,fontSize: 25,fontWeight: 'bold',color: 'black',paddingBottom: 0,}}>  تعديل مناسبة </Text>
        </View>
       <View style={styles.centerContent1}>
      <SafeAreaView style={styles.form1}>
      <ScrollView style={{left:-150,height:600,width:300}}>
        <TextInput
        style={styles.input1}
        placeholder="اسم المناسبة"
        autoCapitalize="none"
        keyboardType="default"
        value={this.state.Name}
        textContentType="givenName"
        onChangeText={Name=>this.setState({Name})}
        />
        <DateTime parentCallback = {this.callbackFunction1} st={this.state.st} et={this.state.et}></DateTime>
        <DatePicker
        style={[styles.input1,{width:300}]}
        date={this.state.date}
        mode="date"
        placeholder="تاريخ البدء"
        format="DD/MM/YYYY"
        minDate="01-01-1900"
        confirmBtnText="Confirm"
        value={this.state.date}
        cancelBtnText="Cancel"
        customStyles={{
        dateIcon: {
          position: 'absolute',
          right: -5,
          top: 4,
          marginLeft: 0,
          width:30,
          height:30,
          // tintColor: "gray",
          opacity:0.0
        },
        dateInput: {
          borderColor : "gray",
          alignItems: "flex-end",
          borderWidth: 0,
          borderBottomWidth: 1,
          
        },
        placeholderText: {
          fontSize: 16,
          color: "#a1a1a1"
          ,fontFamily: 'FontAwesome'
        },
        dateText: {
          fontSize: 17,
          marginRight: 0
        }
        }}
        onDateChange={date=>this.setState({date})}
       />
       <DatePicker
        style={[styles.input1,{width:300}]}
        date={this.state.date1}
        mode="date"
        placeholder="تاريخ الإنتهاء"
        format="DD/MM/YYYY"
        minDate="01-01-1900"
        confirmBtnText="Confirm"
        value={this.state.date1}
        cancelBtnText="Cancel"
        customStyles={{
        dateIcon: {
          position: 'absolute',
          right: -5,
          top: 4,
          marginLeft: 0,
          width:30,
          height:30,
          // tintColor: "gray",
          opacity:0.0
        },
        dateInput: {
          borderColor : "gray",
          alignItems: "flex-end",
          borderWidth: 0,
          borderBottomWidth: 1,
          
        },
        placeholderText: {
          fontSize: 16,
          color: "#a1a1a1"
          ,fontFamily: 'FontAwesome'
        },
        dateText: {
          fontSize: 17,
          marginRight: 0
        }
        }}
        onDateChange={date1=>this.setState({date1})}
       />
     <TouchableOpacity style={styles.input1} onPress={()=> this.setmodalVisibleSearch(true)}>
       {this.state.message=="" ? (
         <Text style={{ fontSize: 16,color: "#a1a1a1" ,fontFamily: 'FontAwesome'}}>الموقع</Text>
       ):(
        <Text style={{ fontSize: 16,color: "black" ,fontFamily: 'FontAwesome'}}>{this.state.message}/ {this.state.message2}</Text>
       )} 
      </TouchableOpacity>  
      <TextInput
        style={[styles.input1,{marginBottom:260}]}
        placeholder=" الوصف"
        autoCapitalize="none"
        keyboardType="default"
        value={this.state.Name1}
        textContentType="givenName"
        onChangeText={Name1=>this.setState({Name1})}
      />
      
     
       
      
    </ScrollView>
      </SafeAreaView> 

    </View>
    </View>
       </Modal>
       <Modal
          statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={modalVisibleDonateEdit}
          onRequestClose={() => {
            this.setmodalVisibleDonateEdit(!modalVisibleDonateEdit);
          }}
          coverScreen={false}
        >
        <View style={{flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center"}}>

        <View style={styles.whiteSheetEvent}>
        <TouchableOpacity onPress={()=> {this.editDonate();}}>
        <Icon name="check" color="#924c9e" size={34} style={{marginLeft:5}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft:270}} onPress={()=> {this.setmodalVisibleDonateEdit(false)}}>
        <Icon name="close" color="black" size={34} style={{marginLeft:5}}/>
        </TouchableOpacity>
        <Text style={{right: 230,fontSize: 25,fontWeight: 'bold',color: 'black',paddingBottom: 0,}}>  تعديل التبرعات </Text>
        </View>
       <View style={styles.centerContent1}>
      <SafeAreaView style={styles.form1}>
      <ScrollView style={{left:-150,height:600,width:300,top:-20}}>
        <TouchableOpacity style={{flexDirection:'column',width:150,height:120,backgroundColor:'#F6F7FB',alignSelf:"center",borderColor:'#f2f2f2',borderWidth:1}} onPress={()=> {this.uploadImage1()}}>
        {this.state.picD=='' ? (
          <Image style={{width:70,height:70,alignSelf:"center",top:30}} source={{uri:'https://scontent.fjrs1-2.fna.fbcdn.net/v/t1.15752-9/278340560_717802682964623_2930919463595657142_n.png?_nc_cat=106&ccb=1-5&_nc_sid=ae9488&_nc_ohc=mBsBbdJ4G6sAX8k3cTi&_nc_ht=scontent.fjrs1-2.fna&oh=03_AVJg5pOYgsj0Ud7MVrY5X4mFYlt3UQ-8ZCkNhG9WC-wShw&oe=628083E6'}}></Image>

        ):(
          <Image style={{width:150,height:120,alignSelf:"center"}} source={{uri:this.state.picD}}></Image>

        )}
        </TouchableOpacity>
        <Text style={{alignSelf:'center',top:10,marginBottom:20, color: "#7d7c7d"}}>إختر صورة</Text>

        <TextInput
        style={styles.input1}
        placeholder="عنوان التبرع "
        autoCapitalize="none"
        keyboardType="default"
        value={this.state.Name}
        textContentType="givenName"
        onChangeText={Name=>this.setState({Name})}
        />
       
       <DatePicker
        style={[styles.input1,{width:300}]}
        date={this.state.date1}
        mode="date"
        placeholder="تاريخ إنتهاء التبرع"
        format="DD/MM/YYYY"
        minDate="01-01-1900"
        confirmBtnText="Confirm"
        value={this.state.date1}
        cancelBtnText="Cancel"
        customStyles={{
        dateIcon: {
          position: 'absolute',
          right: -5,
          top: 4,
          marginLeft: 0,
          width:30,
          height:30,
          // tintColor: "gray",
          opacity:0.0
        },
        dateInput: {
          borderColor : "gray",
          alignItems: "flex-end",
          borderWidth: 0,
          borderBottomWidth: 1,
          
        },
        placeholderText: {
          fontSize: 16,
          color: "#a1a1a1"
          ,fontFamily: 'FontAwesome'
        },
        dateText: {
          fontSize: 17,
          marginRight: 0
        }
        }}
        onDateChange={date1=>this.setState({date1})}
       />
       <TextInput
              style={styles.input1}
              placeholder="المبلغ المطلوب"
              autoCapitalize="none"
              keyboardType="numeric"
              value={this.state.Name2}
              onChangeText={Name2 => this.setState({Name2})}
              /> 
      
      <TextInput
        style={[styles.input1,{marginBottom:260}]}
        placeholder=" الوصف"
        autoCapitalize="none"
        keyboardType="default"
        value={this.state.Name1}
        textContentType="givenName"
        onChangeText={Name1=>this.setState({Name1})}
      />
      
     
       
      
    </ScrollView>
      </SafeAreaView> 

    </View>
    </View>
       </Modal>
       
      </View>//main
    );}
  }
}
const styles = StyleSheet.create({
  container1:{
    flex: 1,
    backgroundColor: "#fff",
    },
  whiteSheet2: {
    width: "100%",
    height: "6%",
    top:10,
    flexDirection: 'row',
    marginBottom: 60

  },
  whiteSheetEvent: {
    width: "100%",
    height: "6%",
    top: -300,
    flexDirection: 'row',
    marginBottom: 60

  },
  title4: {
    left: "38%",
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 0,
  },
  row: {
    flexDirection: 'row-reverse',
    marginBottom: 10,
    left: 13,
    top: -22
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
  box: {
    borderBottomColor: "#ede8e8",
    borderBottomWidth: 1,
    width: 120,
    left: -25, top: -15
  },
  input1:{
    backgroundColor:"#F6F7FB",
    height:58,
    marginBottom:20,
    fontSize:16,
    borderRadius:10,
    padding:12,
    fontFamily: 'FontAwesome',
    //right:"50%",
    textAlign:'right',
  },
  form1:{
    flex:1,
    position:"absolute",
    //bottom:100,
    width: "85%",
    top:-320,
     
  },
 


})
const styles1 = StyleSheet.create({
  whiteSheet2: {
    width: "100%",
    height: "6%",
    top: -285,
    flexDirection: 'row',
    marginBottom: 60

  },
  whiteSheetEvent: {
    width: "100%",
    height: "6%",
    top: -300,
    flexDirection: 'row',
    marginBottom: 60

  },
  row: {
    flexDirection: 'row-reverse',
    marginBottom: 10,
    
  },
  title4: {
    left: "38%",
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 0,
  },
  row: {
    flexDirection: 'row-reverse',
    marginBottom: 10,
    left: 13,
    top: -22
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  elevation: {
    elevation: 5,
    shadowColor: 'black',
  },
  box: {
    borderBottomColor: "#ede8e8",
    borderBottomWidth: 1,
    width: 120,
    left: -25, top: -15
  },
  input1:{
    backgroundColor:"#F6F7FB",
    height:58,
    marginBottom:20,
    fontSize:16,
    borderRadius:10,
    padding:12,
    fontFamily: 'FontAwesome',
    //right:"50%",
    textAlign:'right',
  },
  form1:{
    flex:1,
    position:"absolute",
    //bottom:100,
    width: "85%",
    top:-320,
     
  },
  userImage:{
      height: 180,
      width: 300,
     // borderRadius:150,
     alignSelf:'center',
     // borderColor:"#924c9e",
      //borderWidth:1,
      top:-15,
      left:5
    },
 


})
const stylesfollower = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  whiteSheet1:{
    width: "100%",
    height: "6%",
    top:10,
    flexDirection: 'row',
   // marginBottom:60,
    //backgroundColor:"red"
    
},
  container: {
    padding: 16,
    flexDirection: 'row-reverse',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start'
  },
  avatar: {
    width:70,
    height:70,
    borderRadius:35,
  },
  text: {
    marginBottom: 5,
    alignItems:'flex-end',
    flexWrap:'wrap',
  
  },
  content: {
    flex: 1,
    alignItems:'flex-end',
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  },
  separator: {
    height: 1,
    backgroundColor: "#e6e6e6"
  },
  timeAgo:{
    fontSize:12,
    color:"#696969"
  },
  name:{
    top:16,
    fontSize:24,
    color:"black"
  }
}); 