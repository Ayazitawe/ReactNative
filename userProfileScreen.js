import * as React from 'react';

import { View, Text ,SafeAreaView,StyleSheet, Image, ScrollView,TextInput,Modal,Linking,  Dimensions,
  FlatList,Alert} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
  
} from 'react-native-paper';
import DataTable, { COL_TYPES } from 'react-native-datatable-component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Feather'; 
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import { TouchableOpacity } from 'react-native';
import {Dropdown, } from 'react-native-element-dropdown';
import { ProgressBar} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { now } from 'moment';
import Loader from "./Loader.js";
const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');
import NumericInput from 'react-native-numeric-input'
import { WebView } from "react-native-webview";

const customtInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "#ededed",
        borderTopColor: "white",
       position:'absolute',
         borderRadius:62,
         //padding: 4,
         paddingRight:20,
         margin:10,
         paddingTop:4
        //:"8%",
        //left:18,
      //   width:"85%"
      }}
    />
  );
};
export default class OrgProfileScreen extends React.Component  {
  
  constructor(props) {
    super(props);
   
    this.state = {
      num:'0',
      number:"0",
      dataE:'',
      modalVisible1: false,
      Loading:true,
      modalVisible: false,
      modalVisible2: false,
      modalVisible3: false,
      modalVisible4: false,
      modalVisiblem: false,
      dataFollower:"",
      messageFlag:false,
      eventVisible: false,
      donateVisible: false,
      Emailname:this.props.route.params.EmailName, 
      Name : "" ,
      Phone: "" ,
      City: ""  , 
      dataChild:"",
      item:"",
      password:"", 
      ChildNumber:"",
      itemState:"",
      OrgState:"",
      itemO:'',
      gender:'male',
      Work:"",
      date:'',
      shouldShow:true,
      shouldShow1:true,
      loading:false,
      dataDonate:"",
      choose:1,
      choose1:'',
      childrenVisible: false,
      showModal: false,

      dataEvent:"",
      numGoing:"",
      donateshow:false,
     eventshow:false,
      pic:"https://i.stack.imgur.com/l60Hf.png?fbclid=IwAR3NdP4vktWzNiTPOS7kSHB2vRy4FReqJM6tSsGT0ohzFcXCK7W12jFiK7w",
       data : [
        {label: 'رام الله', value: 'رام الله'},
        {label: 'نابلس', value: 'نابلس'},
        {label: 'جنين', value: 'جنين'},
        {label: 'قلقيلية', value: 'قلقيلية'},
        {label: 'أريحا', value: 'أريحا'},
        {label: 'طولكرم', value: 'طولكرم'},
        {label: 'القدس', value: 'القدس'},
        {label: 'بيت لحم', value: 'بيت لحم'},
        {label: 'الخليل', value: 'الخليل'},
        
    ],
    dataF: "",
    webviewRef: React.createRef(),

    data1 : [
        {label: ' أنثى', value: 'female'},
        {label: 'ذكر', value: 'male'},
       ], 
       flag:'0',
       TimeDateArr :"", 
  };
}
  setModalVisible1 = (visible1) => {
       
    this.setState({ modalVisible1: visible1 });
  }
  numberGoing =()=> {
    // console.log(this.state.item.id );
    var APIURL = "http://192.168.1.16/Ekfal/numberGoing.php";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      id:this.state.item.id,
    };
    fetch(APIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log(Response );
        this.setState({numGoing:Response})
        // if (Response == "true") {
        //  this.setState({flagGoing:true})

        // }
        // else {  this.setState({flagGoing:false})}
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })
  }
  GetInfo=()=>{
    
    var APIURL = "http://192.168.1.16/Ekfal/userProfile.php";
          var headers = {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            };
    var Data ={
      Email: this.state.Emailname
    
    };

      fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((Response)=> Response.json())
    .then((Response)=>{
      
      this.setState({Name:Response[0].Message0})
     this.setState({Phone:Response[0].Message1})
     this.setState({password:Response[0].Message2})
      this.setState({pic:Response[0].Message3})
      this.setState({City:Response[0].Message4})
      this.setState({date:Response[0].Message5})
      this.setState({Work:Response[0].Message6})
      this.setState({gender:Response[0].Message7})
      if(this.state.Work=='')
      this.setState({shouldShow :false}) 
      if(this.state.gender=='')
      this.setState({gender :'male'}) 
      if(this.state.date=='')
      this.setState({shouldShow1 :false}) 
      this.setState({Loading:false})
    })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  
  }
 
  CheckFollowerEvent = (str) => {
    console.log(str)
    var APIURL = "http://192.168.1.16/Ekfal/CheckFollower.php";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      Email: this.state.Emailname,
      org: str,
    };
    fetch(APIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then((Response) => Response.json())
      .then((Response) => {
        //console.log(Response.flagConfirm );
    
       if (Response.flagConfirm == "true") {
          this.eventVisible(true)

        }
       else  if (Response.flagConfirm == "false")  { this.alert("بإنتظار تأكيد الجمعية على إشتراكك !") }
       else if (Response=="No") {this.alert("عليك الاشتراك بالجمعية اولا !")}
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })

  }
  CheckFollowerDonate = (str) => {
    console.log(str)
    var APIURL = "http://192.168.1.16/Ekfal/CheckFollower.php";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      Email: this.state.Emailname,
      org: str,
    };
    fetch(APIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then((Response) => Response.json())
      .then((Response) => {
        //console.log(Response.flagConfirm );
    
       if (Response.flagConfirm == "true") {
          this.donateVisible(true)

        }
       else  if (Response.flagConfirm == "false")  { this.alert("بإنتظار تأكيد الجمعية على إشتراكك !") }
       else if (Response=="No") {this.alert("عليك الاشتراك بالجمعية اولا !")}
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })

  }
  GetInfoChildd = () => {
    // this.setState({id: ''});
    console.log("adasdasfsdf");
    var APIURL = "http://192.168.1.16/Ekfal/ShowChild.php";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      Email: this.state.itemO.orgEmail

    };

    fetch(APIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then((Response) => Response.json())
      .then((Response) => {
        if (Response == "No Results Found") { console.log("يرجى إضافة اطفال") }
        else this.setState({ dataF: Response });

      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })

  }
  handleResponse = data => {
    if (data.title === "success") {
     if(this.state.Don_Ekf==2) this.ekfal();
     else if (this.state.Don_Ekf==1) this.addDonation()
      //console.log(this.state.ekfalchild)
      this.setState({ showModal: false, status: "Complete" });
    } else if (data.title === "cancel") {
      this.setState({ showModal: false, status: "Cancelled" });
    } else {
      return;
    }
  };

  checkGoing =()=> {
     var APIURL = "http://192.168.1.16/Ekfal/checkGoing.php";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      Email: this.state.Emailname,
      org: this.state.Emailname,
      id:this.state.item.id,
    };
    fetch(APIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then((Response) => Response.json())
      .then((Response) => {
       
        if (Response == "true") {
         this.setState({flagGoing:true})
         //console.log(Response+"asdfgh" );
        }
        else {  this.setState({flagGoing:false})}
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })
  }
  numberGoing =()=> {
    // console.log(this.state.item.id );
    var APIURL = "http://192.168.1.16/Ekfal/numberGoing.php";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      id:this.state.item.id,
    };
    fetch(APIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log(Response );
        this.setState({numGoing:Response})
        // if (Response == "true") {
        //  this.setState({flagGoing:true})

        // }
        // else {  this.setState({flagGoing:false})}
      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })
  }
InsertRecord1=()=>{
  var Email = this.state.Emailname;
  var Name = this.state.Name;
  var City = this.state.City;
  var Phone = this.state.Phone;
  var Image = this.state.pic;
 // var ChildNum = this.state.ChildNumber;
  var password = this.state.password;
  var BD = this.state.date;
  var WorkPlace = this.state.Work;
  var gender = this.state.gender;
  
    var APIURL = "http:/192.168.1.16/Ekfal/EditUserProf.php";
    var headers = {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    };
          
    var Data ={
     Email: Email,
     Name :Name, 
     City : City,
     Phone :Phone,
    Image :Image,
    // ChildNum :ChildNum,
     password : password,
     BD : BD,
     WorkPlace : WorkPlace,
     gender : gender,
    };

    fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((response) => response.json())
  .then((responseJson) => {
   this.alert(responseJson)
   this.setState({shouldShow:true})
   this.setState({shouldShow1:true})
    this.GetInfo();
}) .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  }
  alert (msg){
    Alert.alert(
      "تنبيه",
      msg,
      [
        {
          text: "",
        },
        {
          text: "موافق", 
        }
      ]
    );}

 uploadImage = () => {
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
// console.log(response.assets[0]);
    }

  });

};
childrenVisible = (visible1) => {
  this.setState({ childrenVisible: visible1 });
  if (visible1 == true) {

    this.GetInfoChildd();
  }
}
CheckFollowerChild = (str) => {
  console.log(str)
  var APIURL = "http://192.168.1.16/Ekfal/CheckFollower.php";
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var Data = {
    Email: this.state.Emailname,
    org: str,
  };
  fetch(APIURL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(Data)
  })
    .then((Response) => Response.json())
    .then((Response) => {
      //console.log(Response.flagConfirm );
  
     if (Response.flagConfirm == "true") {
        this.childrenVisible(true)

      }
     else  if (Response.flagConfirm == "false")  { this.alert("بإنتظار تأكيد الجمعية على إشتراكك !") }
     else if (Response=="No") {this.alert("عليك الاشتراك بالجمعية اولا !")}
    })
    .catch((error) => {
      console.error("ERROR FOUND" + error);
    })

}
setModalVisible = (visible1, item) => {
  this.setState({ modalVisible: visible1 });
  if(visible1 == false){
    this.getInfoUserFollower();

  }
  if (visible1 == true) {
    
    this.setState({ itemO: item }, () => {
      //.GetInfodd();
      this.setState({choose1:'1'})
    this.CheckFollowerChild(this.state.itemO.orgEmail)
    });
  }
}
setModalVisiblem = (visible1,item) => {
  if (visible1==true) this.setState({item:item});
   this.setState({ modalVisiblem: visible1 });
 }
 getChat=(str)=>{
  this.setState({messages:""})
  //console.log(this.state.orgItem.orgEmail)
  var APIURL = "http://192.168.1.16/Ekfal/getChat.php";
       var headers = {
           'Accept' : 'application/json',
           'Content-Type' : 'application/json'
         };
 var Data ={
  Email: this.state.Emailname,//user
  org:str,
 };
 
   fetch(APIURL,{
   method: 'POST',
   headers: headers,
   body: JSON.stringify(Data)
 })
 .then((Response)=> Response.json())
 .then((Response)=>{
 // alert(Response[0].message[0])
  if(Response=="No Results Found"){
      this.setState({
          messages: [ 
            { _id: 1,text:"مرحبًا ، يسعدنا تلقي رسائلك. سنقوم بالرد عليك عندما يكون ذلك ممكنًا!",
            createdAt: new Date(),user: {_id: 2,name: this.state.orgName,
              avatar: this.state.image }, },
                ], 
          }); 
  }
   else {
       this.setState({messages :JSON.parse(Response[0].message)});
      //  for (let i=0 ; i<this.state.messages.length ;i++){
      //     if(this.state.messages[i].user._id !=1)
      //      this.state.messages[i].user._id =1;
      //   else  this.state.messages[i].user._id =2;
          
      //  }
  }
  })
 .catch((error)=>{
   console.error("ERROR FOUND" + error);
 })
 
 }
setModalVisible2 = (visible1) => {
       
  this.setState({ modalVisible2: visible1 });
  this.setState({ modalVisible3: false });
  this.setState({eventshow:false});
  this.setState({donateshow:false});
}
setModalVisible3 = (visible1) => {
       
  this.setState({ modalVisible3: visible1 });
  this.setState({ modalVisible2: false });
  this.setState({eventshow:false});
  this.setState({donateshow:false});
}
setModalVisible4 = (visible1) => {
       
  this.setState({ modalVisible4: visible1 });
 
}
getInfoChild=()=>{
  //console.log(this.state.Emailname)
 var APIURL = "http://192.168.1.16/Ekfal/getInfoChild.php";
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
.then((Response)=> Response.json())
.then((Response)=>{
//console.log (Response)
if(Response=="No Results Found"){console.log("no notification")}
else {this.setState({dataChild :Response});
this.setState({num :this.state.dataChild[0].countChild});
//console.log(this.state.dataChild[0].countChild)
}
//console.log (this.state.dataFollower)
 })
.catch((error)=>{
  console.error("ERROR FOUND" + error);
})

}
getEvent = () => {
 
  var APIURL = "http://192.168.1.16/Ekfal/getEventUser.php";

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
    .then((response) => response.json())
    .then((responseJson) => {
   // console.log(responseJson)
     this.setState({ dataEvent: responseJson });
  
    }).catch((error) => {
      console.error("ERROR FOUND" + error);
    })
}
renderElement(str) {
  for (var i = 0; i < this.state.dataE.length; i++) {
   // console.log(str)
    if (str == this.state.dataE[i].OrgEmail) {

      return true;
    }
  }
 
  return false;
}
renderElement1(str) {
  for (var i = 0; i < this.state.dataE.length; i++) {
    if (str == this.state.dataE[i].OrgEmail) {
      
if ( this.state.dataE[i].flagConfirm == "true"){
      return true;}
      return false;
    }
  }
 

}

 addChat=(str)=>{
  var APIURL = "http://192.168.1.16/Ekfal/addChat.php";
       var headers = {
           'Accept' : 'application/json',
           'Content-Type' : 'application/json'
         };
 var Data ={
  Email: this.state.Emailname,//user
  message:JSON.stringify(this.state.messages),
  org:str,
  flag:'1'
 };
   
   fetch(APIURL,{
   method: 'POST',
   headers: headers,
   body: JSON.stringify(Data)
 })
 .then((Response)=> Response.json())
 .then((Response)=>{
 
})
 .catch((error)=>{
   console.error("ERROR FOUND" + error);
 })
 
 }
getInfoUserFollower=()=>{
  //console.log(this.state.Emailname)
 var APIURL = "http://192.168.1.16/Ekfal/getInfoUserFollower.php";
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
.then((Response)=> Response.json())
.then((Response)=>{

 if(Response=="No Results Found"){console.log("no notification")}
else {this.setState({dataFollower :Response});
this.setState({number:Response[0].number})
// console.log(Response[0].Message6)
// console.log(Response[0].Message5)

}
//console.log (this.state.dataFollower)
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

 GetInfoOrg=()=>{
  this.setState({loading:true})
  var APIURL = "http://192.168.1.16/Ekfal/OrgProfile.php";
        var headers = {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          };
  var Data ={
    Email: this.state.itemState.OrgChildEmail
  
  };

    fetch(APIURL,{
    method: 'POST',
    headers: headers,
    body: JSON.stringify(Data)
  })
  .then((Response)=> Response.json())
  .then((Response)=>{
    this.setState({OrgState :Response[0]});
    this.setState({loading:false})
    //console.log.
  })
  .catch((error)=>{
    console.error("ERROR FOUND" + error);
  })

}
deleteFollow = (str) => {
  this.decreaseNumber(str);
  var APIURL = "http://192.168.1.16/Ekfal/DeleteFollow.php";
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var Data = {
    Email: this.state.Emailname,
    org: str,
  };
  fetch(APIURL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(Data)
  })
    .then((Response) => Response.json())
    .then((Response) => {
      //console.log(Response);
      this.GetInfo();
      this.followerState();
    })
    .catch((error) => {
      console.error("ERROR FOUND" + error);
    })

}
increaseNumber = (str) => {
  var APIURL = "http://192.168.1.16/Ekfal/IncreaseNumber.php";
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var Data = {
    org: str,
  };
  fetch(APIURL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(Data)
  })
    .then((Response) => Response.json())
    .then((Response) => {
      this.setState({ follower: Response[0].Message0 })
      //console.log(Response[0].Message0);
      // alert (Response)
    })
    .catch((error) => {
      console.error("ERROR FOUND" + error);
    })

}
decreaseNumber = (str) => {
  var APIURL = "http://192.168.1.16/Ekfal/DecreaseNumber.php";
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var Data = {
    org: str,
  };
  fetch(APIURL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(Data)
  })
    .then((Response) => Response.json())
    .then((Response) => {
      this.setState({ follower: Response[0].Message0 })
      //console.log(Response[0].Message0);
      // alert (Response)
    })
    .catch((error) => {
      console.error("ERROR FOUND" + error);
    })

}
AddFollow = (str) => {
  this.increaseNumber(str);
  var APIURL = "http://192.168.1.16/Ekfal/AddFollow.php";
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var Data = {
    Email: this.state.Emailname,
    org: str,
  };
  fetch(APIURL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(Data)
  })
    .then((Response) => Response.json())
    .then((Response) => {
      //console.log(Response);
      this.GetInfo();
      this.followerState();
    })
    .catch((error) => {
      console.error("ERROR FOUND" + error);
    })

}
getDonate=() =>{
  //var Email = this.props.Email;
  var APIURL = "http://192.168.1.16/Ekfal/getDonateUser.php";

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
 // console.log(responseJson)
  this.setState({dataDonate:responseJson})
  }) .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
}
deleteGoing =(str) => {
  // this.increaseNumber(str);
  this.setState({flagGoing:true})
   var APIURL = "http://192.168.1.16/Ekfal/deleteGoing.php";
   var headers = {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   };
   var Data = {
     org: str,
     Email: this.state.Emailname,
     id:this.state.item.id,
   };
   fetch(APIURL, {
     method: 'POST',
     headers: headers,
     body: JSON.stringify(Data)
   })
     .then((Response) => Response.text())
     .then((Response) => {
       
       console.log(Response);
    this.getEvent();
     })
     .catch((error) => {
       console.error("ERROR FOUND" + error);
     })
 }
 followerState = () => {
  var APIURL = "http://192.168.1.16/Ekfal/FollowerState.php";
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var Data = {
    Email: this.state.Emailname

  };
  fetch(APIURL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(Data)
  })
    .then((Response) => Response.json())
    .then((Response) => {
      this.setState({ dataE: Response });
      

    })
    .catch((error) => {
      console.error("ERROR FOUND" + error);
    })
}
eventVisible = (visible1) => {
  this.setState({ eventVisible: visible1 });
  if (visible1 == true) {

    this.getEvent();
  }
}
donateVisible = (visible1) => {
  this.setState({ donateVisible: visible1 });
  if (visible1 == true) {

    this.getDonate();
  }
}
  render() {
    const { modalVisible2 } = this.state;
    const { modalVisible3 } = this.state;
    const { modalVisible1 } = this.state;
    const { modalVisible4 } = this.state;
    const { modalVisiblem } = this.state;
    const { modalVisible } = this.state;
    const vv = 'mailto:' + `${this.state.Emailname}`;

    if (this.state.dataFollower==""){
      this.getInfoUserFollower();
    }
    if (this.state.dataChild==""){
      this.getInfoChild();
    }
    if (this.state.dataE=='')this.followerState();
   if (this.state.Name==""){this.GetInfo();}
   if(this.state.dataDonate==""){this.getDonate();}
   if(this.state.dataEvent==""){this.getEvent();}
   if ( this.state.Loading) {
      
    return(  <Loader>  </Loader> 
   
    
    );
             
   }
   if (this.state.messageFlag==true){
    return (
        < View style={{flex:1,backgroundColor:"white"}}>
        <View style={[{ width: "100%", height: "9%",backgroundColor:"white",borderBottomColor:"#ede8e8",borderWidth:0.5,elevation: 5,
shadowColor: 'black', }]}>
          <View style={{ flexDirection: 'row-reverse',marginHorizontal:10,top:10,paddingRight:20}}>
             <TouchableOpacity style={{ marginLeft: 0 }} >
            <Icon name="arrow-right" color="black" size={30} style={{  }}
             onPress={() => { this.addChat(this.state.itemO.orgEmail);this.setState({messageFlag:false})}} />
            </TouchableOpacity>
            <Image source={{uri:this.state.image}} style={[{width:45,height:45, borderRadius:35,}]}/>
            <Text style={{  fontSize: 25, fontWeight: 'bold', color: 'black', paddingBottom: 0, }}> {this.state.OrgName}</Text>
            </View>
        </View>
        
            <GiftedChat 
            listViewProps={{style: {backgroundColor: 'white',top:-17}, }}
            placeholder={'اكتب رسالة..'} 
             renderInputToolbar={props => customtInputToolbar(props)}
            messages={this.state.messages} onSend={messages => this.onSend(messages)} user={{ _id: 1,  }}
            renderBubble={this.renderBubble}
            renderSend= {this.renderSend}
            showAvatarForEveryMessage={true}
             />
            
             
        </View>
         ); 
  }
   
   else {
    return (
    <View style={styles.containerall}>
      <Modal
         statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => {
             this.setModalVisible1(!modalVisible1);
          }}
          coverScreen={false}
        >
    <View style={styles.container1}>

    <View style={styles.whiteSheet1}>
         <TouchableOpacity onPress={()=> {this.InsertRecord1();this.setModalVisible1(!modalVisible1)}}>
          <Icon name="check" color="#924c9e" size={34} style={{marginLeft:5}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft:270}} onPress={()=> {this.GetInfo();this.setModalVisible1(!modalVisible1)}}>
          <Icon name="close" color="black" size={34} style={{marginLeft:5}}/>
        </TouchableOpacity>
                <Text style={styles.title1}>تعديل الملف الشخصي</Text>
        </View>
      <View style={styles.centerContent1}>

        <TouchableOpacity
        style={{alignItems:'center',bottom:20}}
          onPress={() => this.uploadImage()}
          underlayColor="rgba(0,0,0,0)">
             <Avatar.Image
             size={120}
            source={{uri:  this.state.pic}}
            />
             
           <Text style={{color:"#924c9e",fontSize:20,alignItems:'center',top:12}}>تغيير الصورة الشخصية</Text>
          </TouchableOpacity>
       </View>

       <SafeAreaView style={styles.form1}>
              
              <ScrollView style={{height:400,bottom:0}}>
               
              <TextInput
              style={styles.input1}
              placeholder="الاسم
              "
              autoCapitalize="none"
              keyboardType="default"
              value={this.state.Name}
              textContentType="givenName"
              onChangeText={Name=>this.setState({Name})}
              />
              <TextInput
              style={styles.input1}
              placeholder="رقم الهاتف 
            "autoCapitalize="none"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              value={this.state.Phone}
              onChangeText={Phone => this.setState({Phone})}
              /> 
              <DatePicker
      style={{backgroundColor:"#F6F7FB", height:58,marginBottom:20,fontSize:16, borderRadius:10,padding:12,
      textAlign:'right',width:308}}
      date={this.state.date}
      mode="date"
      placeholder="تاريخ الميلاد
      &#xf073;"
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
          fontSize: 17,
          color: "gray"
          ,fontFamily: 'FontAwesome'
        },
        dateText: {
          fontSize: 17,
          marginRight: 0
        }
      }}
      onDateChange={date=>this.setState({date})}
    />
     <Dropdown
            style={styles.dropdown2}
            containerStyle={styles.shadow2}
            data={this.state.data1}
            labelField="label"
            valueField="value"
            label="Dropdown"
            value={this.state.gender}
            placeholder=" الجنس"
            maxHeight={120}
            onChange={(gender)=> {
            //setDropdown(item.value);
              this.setState({gender:gender.value})
                console.log('selected', gender);
            }}
           // renderItem={item => renderItem(item)}
            textError="Error"
        />
         
              <Dropdown
                style={styles.dropdown1}
                containerStyle={styles.shadow1}
                data={this.state.data}
                labelField="label"
                valueField="value"
                label="Dropdown"
                value={this.state.City}
                placeholder=" المحافظة"
                maxHeight={120}
                onChange={(City)=> {
                //setDropdown(item.value);
                  this.setState({City:City.value})
                    console.log('selected', City);
                }}
               // renderItem={item => renderItem(item)}
                textError="Error"
            />
             
             <TextInput 
              secureTextEntry={false} 
              style={styles.input1}
              placeholder="كلمة المرور"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              value={this.state.password}
              onChangeText={password => this.setState({password})}
              />
              <TextInput
              style={[styles.input1,{marginBottom:180}]}
              placeholder="مكان العمل
              "
              autoCapitalize="none"
              keyboardType="default"
              value={this.state.Work}
              textContentType="givenName"
              onChangeText={Work=>this.setState({Work})}
              />
        
               
              </ScrollView>
              
             
          </SafeAreaView>

    </View>
    </Modal>
      <SafeAreaView style={styles.container}>
 <>
 <Modal
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}
        >

          <TouchableOpacity style={{ marginLeft: 310, top: -15 }} >
            <Icon name="arrow-right" color="black" size={30} style={{ marginLeft: 0 }} onPress={() => {
              this.setState({ showModal: false })
            }} />
          </TouchableOpacity>

          <WebView
            source={{ uri: "http://192.168.1.16:3000" }}
            onNavigationStateChange={data =>
              this.handleResponse(data)
            }
            // ref={this.state.webviewRef}
            //onMessage={this.onMessage}
            injectedJavaScript={`document.f1.submit()`}
          />
        </Modal>

 <Modal
          statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}
          coverScreen={false}
        >

        
          <View style={styles1.containerall}>
          <SafeAreaView style={styles1.container}>
          <View style={styles1.whiteSheet2}>
                <TouchableOpacity style={{ marginLeft: 0 }} >
                  <Icon name="arrow-right" color="black" size={30} style={{ marginLeft: 0 }} onPress={() => {
                    this.setModalVisible(!modalVisible, ""); 
                  }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black', paddingBottom: 0, }}> {this.state.OrgName}</Text>

              </View>
              <View style={styles1.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: -50 }}>
                <View style={{ marginLeft: 20,top:-15 }}>
                <Title style={[styles1.title, {
                      marginTop: 25,
                      marginBottom: 5,

                    }]}> {this.state.itemO.orgName} </Title>
                  <View style={{ flexDirection: 'row', top: -15, left: 35 }}>
                  <View style={{ flexDirection: 'row', marginRight: 20 }}>
                        <Caption style={{ color: 'black', top: 5, right: 5 }}>الأطفال</Caption>
                        <Title>{this.convertstr(this.state.itemO.Message5+'')}</Title>
                      </View>
                      <View style={{ flexDirection: 'row' }} >
                        <Caption style={{ color: 'black', top: 5, right: 5 }}>المشتركين</Caption>
                        {/* <Text> {this.state.itemO.Message6}</Text> */}
                        <Title>{this.convertstr(this.state.itemO.Message6+'')}</Title>
                      </View>
                    </View>

                </View>
                <Avatar.Image
                    source={{
                      uri: this.state.itemO.image,
                    }}
                    size={80}
                  // style={{borderColor:"#e0e0e0",borderWidth:2}}

                  />
                  </View>
                </View>

                <View style={[styles1.userInfoSection,{top:-35}]}>
                <View style={styles1.row}>
                  <Icon name="map-marker-radius" color="black" size={20} />
                  <Text style={{ color: "black", marginLeft: 23 }}> {this.state.itemO.orgCity}</Text>

                </View>
                <View style={styles1.row}>
                  <Icon name="phone" color="black" size={20} />
                  <Text style={{ color: "black", marginLeft: 23 }}>{this.state.itemO.orgPhone}</Text>

                </View>
                <View style={styles1.row}>
                  <Icon name="email" color="black" size={20} />
                  <Text style={{ color: "black", marginLeft: 23 }}> {this.state.itemO.orgEmail}</Text>

                </View>
              </View>
              <View style={{ flexDirection: 'row', left: -30,top:-30 }}>
                <TouchableRipple style={[styles1.editsp, { marginHorizontal:2 }]} onPress={() => Linking.openURL(vv)} >
                  <Text style={{ color: "black", fontSize: 20, alignSelf: 'center', top: 4 }}> تواصل معنا</Text>
                </TouchableRipple>
               
                <TouchableRipple style={[styles1.editsp, {marginHorizontal:2 ,width:"25%"}]} 
                onPress={()=>{
                 this.setState({messages:""});this.setState({ orgItem:"" }, () => { this.getChat(this.state.itemO.orgEmail)});this.setState({messageFlag:true})}}>
                 
                  <Text style={{ color: "black", fontSize: 20, alignSelf: 'center', top: 4 }}>مراسلة</Text>
                </TouchableRipple>

                {this.renderElement(this.state.itemO.orgEmail) == true ? (
                <TouchableOpacity
                style={[styles1.editsp, { backgroundColor: '#e0c1e6',width:"25%", marginHorizontal:2 }]}
                onPress={() => this.deleteFollow(this.state.itemO.orgEmail)}>
                  {this.renderElement1(this.state.itemO.orgEmail) == true ?(
                    <Text style={{ color: "black", fontSize: 20, alignSelf: 'center', top: 4 }}>مشترك</Text>
                  ):(<Text style={{ color: "black", fontSize: 20, alignSelf: 'center', top: 4 }}>تم الطلب</Text>)}
                
              </TouchableOpacity>
   ) : (
                  <TouchableOpacity onPress={() => { this.AddFollow(this.state.itemO.orgEmail) }}
                    style={[styles1.editsp, { marginHorizontal:2 ,backgroundColor: '#9E11B5',width:"25%"}]}>
                    <Text style={{ color: "white", fontSize: 20, alignSelf: 'center', top: 4 }}>إشتراك</Text>
                  </TouchableOpacity>)}
                 </View>
             
                 <View style={styles1.menuWrapper}>
                 {this.state.choose1 == '1' ? (<TouchableOpacity style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: "33%" }}
                  onPress={() => { this.setState({ choose1: '1' }); this.CheckFollowerChild(this.state.itemO.orgEmail), this.eventVisible(false), this.donateVisible(false) }}>
                   <Icon name="human-male-boy" color="black" size={26} style={{ alignSelf: 'center', top: -3 }} />
                </TouchableOpacity>) : (
                  <TouchableOpacity style={{ borderBottomColor: '#e0e0e0', borderBottomWidth: 1, width: "33%" }} 
                  onPress={() => { this.setState({ choose1: '1' }); this.CheckFollowerChild(this.state.itemO.orgEmail), this.eventVisible(false), this.donateVisible(false) }}>
                     <Icon name="human-male-boy" color="#c9c9c9" size={26} style={{ alignSelf: 'center', top: -3 }} />
                  </TouchableOpacity>
                )}
                {this.state.choose1 == '2' ? (<TouchableOpacity style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: "33%" }} 
                  onPress={() => {this.setState({ choose1: '2' });this.CheckFollowerEvent(this.state.itemO.orgEmail), this.childrenVisible(false),this.donateVisible(false) }}>
                  <Icon name="calendar" color="black" size={26} style={{ alignSelf: 'center', top: -3 }} />
                </TouchableOpacity>) : (
                  <TouchableOpacity style={{ borderBottomColor: '#e0e0e0', borderBottomWidth: 1, width: "33%" }} 
                  onPress={() => {this.setState({ choose1: '2' });this.CheckFollowerEvent(this.state.itemO.orgEmail), this.childrenVisible(false),this.donateVisible(false) }}>
                    <Icon name="calendar" color="#c9c9c9" size={26} style={{ alignSelf: 'center', top: -3 }} />
                  </TouchableOpacity>
                )}
                {this.state.choose1 == '3' ? (<TouchableOpacity style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: "34%" }}
                  onPress={() => {this.setState({ choose1: '3' });this.CheckFollowerDonate(this.state.itemO.orgEmail), this.eventVisible(false), this.childrenVisible(false) }}>
                  <Icon name="charity" color="black" size={29} style={{ alignSelf: 'center', top: 2 }} />
                </TouchableOpacity>) : (
                  <TouchableOpacity style={{ borderBottomColor: '#e0e0e0', borderBottomWidth: 1, width: "34%" }} 
                  onPress={() => {this.setState({ choose1: '3' });this.CheckFollowerDonate(this.state.itemO.orgEmail), this.eventVisible(false), this.childrenVisible(false) }}>
                   <Icon name="charity" color="#c9c9c9" size={29} style={{ alignSelf: 'center', top: -3 }} />
                  </TouchableOpacity>
                )}
                   </View>
          </SafeAreaView>
          <SafeAreaView style={{ flex: 1 }}>
              {this.state.childrenVisible == true ? (
                <FlatList style={[{top:0}]}
                // style={{top:-50}}
                  contentContainerStyle={styles1.listContainer}
                  data={this.state.dataF}
                  horizontal={false}
                  numColumns={1}
                  keyExtractor={(item) => {
                    return item.id;
                  }}
                  renderItem={({ item }) => {
                    return (<>
                      <View style={styles1.card}  >
                        <View style={styles1.card1}>
                          <View style={styles1.whiteSheet1}>
                            <Image style={styles1.userImage} source={{ uri: item.ChildImage }} />
                          </View>
                          <View style={styles1.cardFooter}>
                            {/* <View style={{ justifyContent:"center"}}> */}
                            <View>
                              <Text style={styles1.name}>{item.ChildGender == "female" ? "الطفلة " : "الطفل "}{item.ChildName}</Text>
                              <View style={styles1.infoBox}></View>
                              <View style={{ flexDirection: 'column', alignItems: 'flex-end', right: 18 }}>
                                <Text style={styles1.position}>{item.ChildBD} <Icon name="cake-variant" color="black" size={20} /></Text>
                                <Text style={[styles1.position]}>{item.ChildMoney} <Icon name="hand-coin" color="black" size={20} /></Text>
                                <View style={{ flexDirection: 'row-reverse', width: 200 }}>
                                <Icon name="android-messages" color="black" size={20} />
                                <Text style={[styles1.position, { width: 140 }]}>"{item.ChildStory}" </Text>

                                </View>

                              </View>


                            </View>
                          </View>
                        </View>
                        {item.userEkfal == "empty" ? (
                          <TouchableRipple style={[styles1.edit1, { backgroundColor: '#9E11B5' }]}
                            onPress={() => { this.setState({Don_Ekf:2});this.setState({ ekfalchild: item.id }); this.setState({ showModal: true }) }}>
                            <Text style={{ color: "white", alignContent: "center", alignSelf: 'center', height: 35, top: 5, fontSize: 20 }}>إكفل</Text>
                          </TouchableRipple>

                        ) : (<TouchableRipple style={[styles1.edit1, { backgroundColor: '#e0c1e6' }]}
                          onPress={() => { this.alert("لقد قمت بالكفالة هذا الشهر، سيتم تذكيرك بالكفالة الشهر القادم") }}>
                          <Text style={{ color: "black", alignContent: "center", alignSelf: 'center', height: 35, top: 5, fontSize: 20 }}>مكفول</Text>
                        </TouchableRipple>)}

                      </View>

                    </>
                    )
                  }} />) : null}


              {this.state.eventVisible == true ? (
                <FlatList
                  data={this.state.dataEvent}
                  style={{ marginTop: -20, left: 20, backgroundColor: "white" }}
                  windowSize={5}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <View style={[styles11.card, styles11.elevation, { left: 7, top: 0, width: 290, height: 260 }]}
                        >
                        <View style={{ top: -30, left: 30, width: 180, height: 180 }} onPress={() => { this.uploadImage(item.id) }}>
                          {item.pic == "" ? (
                            <LottieView
                              source={require('../../assets/lf30_editor_pbzoamjb.json')}
                              autoPlay
                              loop={true}
                              speed={1.5}
                            />
                          ) : (
                            <Image style={styles11.userImage} source={{ uri: item.pic }} />
                          )}
                        </View>

                        <View style={{ top: -75 }}>
                         
                          <TouchableOpacity onPress={() => { this.alert(item.desEvent) }}>
                            <Text style={{ top: -20, fontWeight: 'bold', fontSize: 22 }}>{item.nameEvent}</Text>
                          </TouchableOpacity>
                          <Text style={{ top: -20, fontSize: 18 }}>{item.locEvent}</Text>
                          </View>
                         <View style={{ flexDirection: 'row', top: -65 }}>
                         <View style={{ flexDirection: 'row', top: -65 }}>
                     
                     </View>
                          <TouchableRipple style={[{ marginHorizontal: 15, borderWidth: 1, height: "130%", borderColor: "#e0e0e0", bottom: 20, width: "80%", borderRadius: 7, }]} 
                          onPress={() => {   this.setModalVisiblem(true, item) }} >
                            <Text style={{ color: "black", fontSize: 20, alignSelf: 'center', top: 4 }}>عرض التفاصيل</Text>
                          </TouchableRipple>
                          </View>

                      </View>
                    )
                  }}
                />) : null}
                {this.state.donateVisible == true ? (
                <FlatList
                  data={this.state.dataDonate}
                  style={{ marginTop: -20, left: 20, backgroundColor: "white" }}
                  windowSize={5}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <View style={[styles11.card, styles11.elevation, { left: 7, top: 0, width: 290, height: 280 }]}
                        >
                        <View style={{ top: -30, left: 30, width: 180, height: 180 }} onPress={() => { this.uploadImage(item.id) }}>
                          {item.pic == "" ? (
                            <LottieView
                              source={require('../../assets/lf30_editor_pbzoamjb.json')}
                              autoPlay
                              loop={true}
                              speed={1.5}
                            />
                          ) : (
                            <Image style={styles11.userImage} source={{ uri: item.picD }} />
                          )}
                        </View>

                        <View style={{ top: -75 }}>
                         
                          <TouchableOpacity onPress={() => { this.alert(item.descr) }}>
                            <Text style={{ top: -20, fontWeight: 'bold', fontSize: 22 }}>{item.Name}</Text>
                          </TouchableOpacity>
                          <Text style={{ top: -190, fontSize: 18 }}>{item.Money}</Text>
                          <Text style={{top:-20,fontSize:14}}> تم جمع مبلغ {this.convertstr(item.donation)} من إجمالي {this.convertstr(item.money)}</Text>
                         <ProgressBar style={{ marginTop:-50,transform: [{ rotateY: '180deg' }]}} progress={parseFloat(item.donation/item.money)} color="#924c9e" />
                          {/* {console.log(item.Money)} */}
                          </View>
                         <View style={{ flexDirection: 'row', top: -80 }}>
                          <NumericInput
                            value={this.state.value}
                            onChange={value => this.setState({ value })}
                            minValue={10}
                            maxValue={parseInt(item.money-item.donation)}
                            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                            totalWidth={110}
                            totalHeight={40}
                            iconSize={25}
                            step={10}
                            valueType='integer'
                            separatorWidth={0}
                            rounded
                            textColor='black'
                            iconStyle={{ color: 'white' }}
                            rightButtonBackgroundColor='#924c9e'
                            leftButtonBackgroundColor='#d2bad6'
                          />
                          {item.money==item.donation?(
                             <TouchableRipple style={[{ marginHorizontal: 15, borderWidth: 1, height: 39, borderColor: "#e0e0e0", bottom: 20, width: "50%", borderRadius: 7,top:1 }]} 
                             onPress={() => {  this.alert("تم إكتمال المبلغ المطلوب") }} >
                               <Text style={{ color: "black", fontSize: 20, alignSelf: 'center', top: 1}}>تبرع الان</Text>
                             </TouchableRipple>
                          ):(
                             <TouchableRipple style={[{ marginHorizontal: 15, borderWidth: 1, height: 39, borderColor: "#e0e0e0", bottom: 20, width: "50%", borderRadius: 7,top:1 }]} 
                             onPress={() => {  this.setState({item:item}); this.setState({Don_Ekf:1});this.setState({ showModal: true }) }} >
                               <Text style={{ color: "black", fontSize: 20, alignSelf: 'center', top: 1}}>تبرع الان</Text>
                             </TouchableRipple>
                          )}
                        
                          </View>

                      </View>
                    )
                  }}
                />) : null}
            </SafeAreaView>
          </View>
        </Modal>
          <View style={styles.userInfoSection}>
         <View style={{flexDirection: 'row', marginTop: 15}}>
                {/* <TouchableOpacity style={{ top: 30, right: 100 }} onPress={() => {
                  this.setState({ eventshow: true }), this.setState({ donateshow: false }), this.setState({ modalVisible3: false });
                  this.setState({ modalVisible2: false });
                }} >
                  <Ionicons name="calendar" color="black" size={26} style={{ marginLeft: 5, top: 2 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ top: 30, right: 95 }} onPress={() => {
                  this.setState({ donateshow: true }), this.setState({ modalVisible3: false });
                  this.setState({ modalVisible2: false });
                  this.setState({ eventshow: false });
                }}>
                  <Icon name="charity" color="black" size={29} style={{ marginLeft: 3, top: 2 }} />
                </TouchableOpacity> */}
         <View style={{flexDirection:'column',top:-15}}>
              <Title style={[styles.title, {
                marginTop:25,
                marginBottom: 5,
                left:50
               
              }]}> {this.state.Name}</Title>
              <View style={{flexDirection:'row',top:-15,left:-11}}>
              
                  <View style={{flexDirection:'row',marginRight:20}} >
            <Caption style={{color:'black',top:5,right:5}}>أنشطة</Caption>
            <Title>{this.convertstr(this.state.number + "")}</Title>
                  </View>
              <View style={{flexDirection:'row',marginRight:20}}>
              <Caption  style={{color:'black',top:5,right:5}}>المكفولين</Caption>
              <Title>{this.convertstr(this.state.num+"")}</Title>
            </View>
            <View style={{flexDirection:'row'}} >
            <Caption style={{color:'black',top:5,right:5}}>جمعيات</Caption>
            <Title>{this.convertstr(this.state.number + "")}</Title>
                  </View>
                  
              </View>
                  
                </View> 
         <Avatar.Image  
              source={{
                uri: this.state.pic,
              }}
              size={80}
              
          />
          
                    

         </View>
         </View> 
        
         <View style={[styles.userInfoSection,{top:-45}]}>
         {this.state.City==""?(null):(
          <View style={styles.row}>
          <Icon name="home" color="black" size={20}/>
            <Text style={{color:"black", marginLeft: 23}}>{this.state.gender =="female"? "تقيم في ":"يقيم في " }{this.state.City}
                  </Text>
            
            </View>)}
            {this.state.Phone==""?(null):(
          <View style={styles.row}>
          <Icon name="phone" color="black" size={20}/>
          <Text style={{color:"black", marginLeft: 23}}>{this.state.Phone}</Text>
           </View>)}
           {this.state.shouldShow1 ? (
           <View style={styles.row}>
          <Icon name="cake-variant" color="black" size={20}/>
          <Text style={{color:"black", marginLeft: 23}}>{this.state.date}</Text>
           </View>
           ) : null}
           {this.state.shouldShow ? (
          <View style={styles.row}>
          <Icon name="office-building-marker" color="black" size={20}/>
          <Text style={{color:"black", marginLeft: 23}}>{this.state.gender =="female"? "تعمل لدى ":"يعمل لدى " }{this.state.Work}</Text>
          </View>
        ) : null}
           
          <View style={styles.row}>
          <Icon name="email" color="black" size={20}/>
          <Text style={{color:"black", marginLeft: 23}}> {this.state.Emailname}</Text>
          </View>
        </View>
        <View style={{flexDirection:'row-reverse',top:-35}}>
        <TouchableRipple  style={[styles.edit,{marginRight: 32} ]} onPress={()=>  {this.setModalVisible1(!modalVisible1)}}>
           <Text style={{color:"black",alignSelf:'center',fontSize:20,}}>تعديل الملف الشخصي</Text>
         </TouchableRipple>
         <TouchableRipple  style={[styles.edit,{marginRight: 10} ]} onPress={() => {this.props.navigation.push("Login")}}>
           <Text style={{color:"black",alignSelf:'center',fontSize:20,}}>تسجيل الخروج</Text>
         </TouchableRipple>
        </View>
        
        {/* <View style={{borderTopColor: "#e0e0e0", borderTopWidth: 1,height: 500,}}> */}
            {/* <TouchableOpacity style={styles.infoBox} onPress={()=>  {this.setModalVisible3(!modalVisible3)}}>
            <Title>{this.convertstr(this.state.num+"")}</Title>
              <Caption>اطفالي</Caption>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoBox} onPress={()=>  {this.setModalVisible2(!modalVisible2)}}>
            <Title>{this.convertstr(this.state.number+"")}</Title>
              <Caption>جمعية تم الاشتراك بها</Caption>
            </TouchableOpacity> */}
            <View style={{flexDirection:'row',top:-75}}>
          {this.state.choose=='3'? (<TouchableOpacity style={{borderBottomColor:'black',borderBottomWidth:1,width:"25%" }} 
            onPress={() => { this.setState({choose:'3'});
            this.setState({ donateshow: true }), this.setState({ modalVisible3: false });
            this.setState({ modalVisible2: false });
            this.setState({ eventshow: false });
          }}>        
             <Icon name="charity" color="black" size={29} style={{ alignSelf:'center' ,top:2}} />
          </TouchableOpacity>):(
            <TouchableOpacity style={{borderBottomColor:'#e0e0e0',borderBottomWidth:1,width:"25%" }} 
            onPress={() => { this.setState({choose:'3'});
              this.setState({ donateshow: true }), this.setState({ modalVisible3: false });
              this.setState({ modalVisible2: false });
              this.setState({ eventshow: false });
            }}>
           
            <Icon name="charity" color="#c9c9c9" size={29} style={{ alignSelf:'center' ,top:-3}} />
          </TouchableOpacity>
          )}
        {this.state.choose=='2'? (<TouchableOpacity style={{borderBottomColor:'black',borderBottomWidth:1,width:"25%" }} 
        onPress={() => {this.setState({choose:'2'});this.setState({ eventshow: true }), this.setState({ donateshow: false }), this.setState({ modalVisible3: false });
          this.setState({ modalVisible2: false });
        }} >
        <Ionicons name="calendar" color="black" size={26} style={{ alignSelf:'center' ,top:-3}} />
          </TouchableOpacity>):( 
            <TouchableOpacity style={{borderBottomColor:'#e0e0e0',borderBottomWidth:1,width:"25%" }} 
            onPress={() => {this.setState({choose:'2'});this.setState({ eventshow: true }), this.setState({ donateshow: false }), this.setState({ modalVisible3: false });
            this.setState({ modalVisible2: false });
          }} >
            <Ionicons name="calendar" color="#c9c9c9" size={26} style={{ alignSelf:'center' ,top:-3}} />
          </TouchableOpacity>
          )}
           {this.state.choose=='4'? (<TouchableOpacity style={{borderBottomColor:'black',borderBottomWidth:1,width:"25%" }}
              onPress={()=>  {this.setState({choose:'4'});this.setModalVisible2(!modalVisible2)}}>
              <FontAwesome name="building" color="black" size={23} style={{ alignSelf:'center',top:-1}} />
          </TouchableOpacity>):(
            <TouchableOpacity style={{borderBottomColor:'#e0e0e0',borderBottomWidth:1,width:"25%" }} 
              onPress={()=>  {this.setState({choose:'4'});this.setModalVisible2(!modalVisible2)}}>
          <FontAwesome name="building" color="#c9c9c9" size={23} style={{ alignSelf:'center',top:-1}} />
          </TouchableOpacity>
          )}
         {this.state.choose=='1'? (<TouchableOpacity style={{borderBottomColor:'black',borderBottomWidth:1,width:"25%" }} 
              onPress={()=>  {this.setState({choose:'1'});this.setModalVisible3(!modalVisible3)}}>
              <FontAwesome name="child" color="black" size={26} style={{ alignSelf:'center',top:-3}} />
          </TouchableOpacity>):(
            <TouchableOpacity style={{borderBottomColor:'#e0e0e0',borderBottomWidth:1,width:"25%" }} 
              onPress={()=>  {this.setState({choose:'1'});this.setModalVisible3(!modalVisible3)}}>
          <FontAwesome name="child" color="#c9c9c9" size={26} style={{ alignSelf:'center',top:-3}} />
          </TouchableOpacity>
          )}
    
         
      
        </View> 
         
        {/* </View> */}
        </> 
        
        <Modal
                  statusBarTranslucent={true}
                  animationType="slide"
                  transparent={true}
                  visible={modalVisiblem}
                  onRequestClose={() => {
                    this.setModalVisiblem(!modalVisiblem);
                  }}
                  coverScreen={false}
                >
                
                  <View style={styles1.containerall}>
                    <SafeAreaView style={styles1.container}>
                      <View style={styles1.whiteSheet2}>
                        <TouchableOpacity style={{ marginLeft: 0 }} >
                          <Icon name="arrow-right" color="black" size={30} style={{left: 50 ,position:'absolute'}} onPress={() => {this.getEvent()
                            ;this.setModalVisiblem(!modalVisiblem);
                          }} />
                        </TouchableOpacity>
                        {/* <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black', paddingBottom: 0, }}> </Text> */}
                       <Image source={{uri:this.state.item.pic}} style={{width:"130%",height:220,top:120,right:50}}/>
                       </View>
                       <View style={{flexDirection:'row-reverse',top:140}}>
                         {this.state.item.flag=="ST" ?(
                            <TouchableOpacity onPress={() => {this.deleteGoing(this.state.item.org);this.setModalVisiblem(!modalVisiblem)}}
                            style={[ { backgroundColor: '#9E11B5', borderWidth: 1, height: "130%",left:15, borderColor: "#e0e0e0", bottom: 20,  width: "80%", borderRadius: 7, }]}>
                            <Text style={{ color: "white", fontSize: 20, alignSelf: 'center', top: 4 }}>عدم الذهاب </Text>
                          </TouchableOpacity>
                         ) :(
                          <TouchableOpacity 
                          style={[ { backgroundColor: '#e0c1e6', borderWidth: 1, height: "130%",left:15, borderColor: "#e0c1e6", bottom: 20,  width: "80%", borderRadius: 7, }]}>
                          <Text style={{ color: "black", fontSize: 20, alignSelf: 'center', top: 4 }}>تم الحضور </Text>
                        </TouchableOpacity>
                         )}
                         
                          <TouchableOpacity  onPress={() => { 
                            this.state.flagGoing==true? (
                              this.addToCalendar(this.state.item.nameEvent, this.state.item.sdEvent,this.state.item.stEvent,this.state.item.edEvent,this.state.item.etEvent,this.state.item.locEvent)
                            ):(
                              this.alert("عليك تأكيد الذهاب أولا قبل إضافة المناسبة الى التقويم الخاص بك")
                            )
                              }}
                            style={[ { backgroundColor: 'white' , height: "130%",  bottom: 20,  width: "10%",left:25}]}>
                              <Icon name="calendar-plus" size={35} style={{ color: "black", alignSelf: 'center', top: 4 }}></Icon>
                          </TouchableOpacity>
                        </View>
                        <Icon name="arrow-right" color="white" size={30} style={{right: 18,top:-150}} />

                        <Text style={[{ right: 25,fontSize:25,fontWeight:'bold',top:12}]}>{this.state.item.nameEvent}</Text>

                        <View style={[styles.column, { alignItems: 'flex-end', alignContent: 'flex-end', alignSelf: 'flex-end',top:90 }]}>
                        
                    <Text style={[{ right: 25,fontSize:25,fontWeight:'bold' ,top:-10}]}>التفاصيل</Text>
                    <View style={[styles.infoBoxWrapper, { right: 25 }]}>
                      <View style={styles.infoBox}>
                        <Text></Text>
                      </View>
                    </View>
                    {this.state.modalVisiblem==true?(this.state.numGoing==""?(this.numberGoing()):(null)):(null)}
                    <View style={{ flexDirection: 'row', right: 25, top: -5 }}>
                      <Text style={{fontSize:18}}> سيحضر هذه المناسبة {this.convertstr(this.state.numGoing+"")} من الأشخاص </Text>
                      <MaterialIcons name="group" color="black" size={22} />
                    </View>
                    <View style={{ flexDirection: 'row', right: 26, top:5 ,width:280}}>
                      <Text style={{fontSize:18}}> تبدأ المناسبة بتاريخ {this.state.item.sdEvent} في تمام الساعة {this.state.item.stEvent}</Text>
                      <Icon name="clock-time-three" color="black" size={22} />
                    </View>
                    <View style={{ flexDirection: 'row', right: 25, top: 11 }}>
                      <Text style={{fontSize:18}}>تقام المناسبة في {this.state.item.locEvent}</Text>
                      <Icon name="map-marker" color="black" size={22} />
                    </View>
                    <View style={{ flexDirection: 'row', right: 34, top: 22 ,width:280}}>
                      <Text style={{fontSize:18,top:-4}}> تنتهي المناسبة بتاريخ {this.state.item.edEvent} في تمام الساعة {this.state.item.etEvent}</Text>
                      <Fontisto name="hourglass-end" color="black" size={15} />
                    </View>
                    <View style={{ flexDirection: 'row', right: 45, top: 25,width:280 }}>
                      <Text style={{fontSize:18}}> {this.state.item.desEvent}</Text>
                      <MaterialIcons name="description" color="black" size={22} />
                    </View>
                   
                    
                   </View>
                    </SafeAreaView>
                  </View>
                </Modal>


        {this.state.donateshow==true?(
             

               <FlatList
                      data={this.state.dataDonate}
                      style={{ width: 360, top: -30,alignSelf: 'center' , backgroundColor: "white" }}
                      windowSize={5}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => {
                        return (
                          <View style={[styles1.cardd, styles1.elevationd, { left: 7, top: 0, width: 300, height: 360 }]}>
                            <Image style={{ height: 180, width: 300, alignSelf: 'center', top: -46, left: 0 }} source={{ uri: item.picD }} />
                            <View style={{ top: -20 }}>

                              <TouchableOpacity onPress={() => { this.alert(item.descr) }}>
                                <Text style={{ top: -20, fontWeight: 'bold', fontSize: 22 }}>{item.Name}</Text>
                              </TouchableOpacity>

                              <Text style={{ top: -20, fontSize: 14 }}>لقد قمت بتبرع بمبلغ مقداره{this.convertstr(item.DonationMoney+"")}</Text>
                              <Text style={{ top: -20, fontSize: 14 }}>تم جمع مبلغ {this.convertstr(item.donation+"")} من إجمالي {this.convertstr(item.money+"")}</Text>
                              {/* <Text style={{top:-20,fontSize:14}}>مقدار التبرع {this.convertstr(item.money)} شيكل</Text> */}
                             <ProgressBar style={{ marginTop: -10, marginBottom: 25, transform: [{ rotateY: '180deg' }] }} progress={parseFloat(item.donation / item.money)} color="#924c9e" />
                         
                            </View>
                     

                          </View>
                        )
                      }}
                    />
                   

             ):(null)}


{this.state.eventshow==true?(
             
             <FlatList
             data={this.state.dataEvent}
             style={{ width: 360, top: -30,alignSelf: 'center' , backgroundColor: "white" }}
             windowSize={5}
             keyExtractor={(item) => item.id}
             renderItem={({ item }) => {
               return (
                 <View style={[styles11.card, styles11.elevation, { left: 7, top: 0, width: 290, height: 260 }]}
                   >
                   <View style={{ top: -30, left: 30, width: 180, height: 180 }} >
                     {item.pic == "" ? (
                       <LottieView
                         source={require('../../assets/lf30_editor_pbzoamjb.json')}
                         autoPlay
                         loop={true}
                         speed={1.5}
                       />
                     ) : (
                       <Image style={styles11.userImage} source={{ uri: item.pic }} />
                     )}
                   </View>

                   <View style={{ top: -75 }}>
                    
                     <TouchableOpacity onPress={() => { this.alert(item.desEvent) }}>
                       <Text style={{ top: -20, fontWeight: 'bold', fontSize: 22 }}>{item.nameEvent}</Text>
                     </TouchableOpacity>
                     <Text style={{ top: -20, fontSize: 18 }}>{item.locEvent}</Text>
                     </View>
                    <View style={{ flexDirection: 'row', top: -65 }}>
                     <TouchableRipple style={[{ marginHorizontal: 15, borderWidth: 1, height: "130%", borderColor: "#e0e0e0", bottom: 20, width: "80%", borderRadius: 7, }]} 
                     onPress={() => { this.setModalVisiblem(true, item) }} >
                       <Text style={{ color: "black", fontSize: 20, alignSelf: 'center', top: 4 }}>عرض التفاصيل</Text>
                     </TouchableRipple>
                     </View>

                 </View>
               )
             }}
           />) : null}
        {this.state.modalVisible2==true ? (
         <FlatList
        style={stylesfollower.root}
        data={this.state.dataFollower}
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
            <>
            <TouchableOpacity style={stylesfollower.container } onPress={() => {
                      // this.setState({Loading:true});
                      this.setModalVisible(!modalVisible, item);
                    }}>
         
              <Image source={{uri:item.image}} style={stylesfollower.avatar}/>
              
              <View style={stylesfollower.content}>
               
                  <View style={stylesfollower.text}>
                    <Text style={stylesfollower.name}>  {   item.orgName    } </Text>
                  </View>
                  
                  
               </View>
               </TouchableOpacity>
               {/* <View style={styles.userInfoSection}>
          <View style={styles.row}>
          <Icon name="map-marker-radius" color="black" size={20}/>
            <Text style={{color:"black", marginLeft: 23}}> {item.orgCity}</Text>
            
            </View>
          <View style={styles.row}>
          <Icon name="phone" color="black" size={20}/>
          <Text style={{color:"black", marginLeft: 23}}>{item.orgPhone}</Text>
            
           </View>
          <View style={styles.row}>
          <Icon name="email" color="black" size={20}/>
          <Text style={{color:"black", marginLeft: 23}}> {item.orgEmail}</Text>
          
            </View>
        </View> */}
        </>     
              
          );
        }}/>
      ):null}
      
    <Modal
         statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={modalVisible4}
          onRequestClose={() => {
             this.setModalVisible4(!modalVisible4);
          }}
          coverScreen={false}
        >
            <View style={styles1.list}>
             
                  <View style={styles1.card1}>
                    
                <View style={[styles1.cardFooter,{top:-10,
                  borderBottomColor: "#787878",borderBottomWidth: 1,width:399,right:25}]}>
                 <TouchableOpacity style={{right:-10}} onPress={()=>{this.setModalVisible4(!modalVisible4 )}}>
                 <View ><IconM name="arrow-drop-down" size={28}></IconM></View>
                 </TouchableOpacity>
                 <TouchableOpacity style={{alignItems:"center",marginLeft:30,marginRight:45}} onPress={()=>{this.setState({flag:'1'})}}>
                   <View style={{borderRadius:50,borderWidth:1,width:45,height:45,justifyContent:"center",alignItems:"center",borderColor:"#787878"}}>
                   <Icon name='information-variant' size={28} color="black" ></Icon>
                   </View>
                    <Text>عام</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{alignItems:"center",marginLeft:30,marginRight:6}} onPress={()=>{this.setState({flag:'2'})}}>
                   <View style={{borderRadius:50,borderWidth:1,width:45,height:45,justifyContent:"center",alignItems:"center",borderColor:"#787878"}}>
                   <Icon2 name='paypal' size={20} color="black" ></Icon2>
                   </View>
                    <Text>فواتير</Text>
                 </TouchableOpacity>
                 <TouchableOpacity  style={{alignItems:"center",marginLeft:20,marginRight:6}} onPress={()=>{this.GetInfoOrg();this.setState({flag:'3'})}}>
                   <View style={{borderRadius:50,borderWidth:1,width:45,height:45,justifyContent:"center",alignItems:"center",borderColor:"#787878"}}>
                   <Icon name='home-heart' size={30} color="black" ></Icon>
                   </View>
                    <Text>الجمعية</Text>
                 </TouchableOpacity>
                   </View>
                   </View>
          {this.state.flag=='2' ? (
             <View style={{flexDirection:"row-reverse",left:40,width:290,borderWidth:1,borderColor:"#e3e3e3"}}>
            <DataTable
            data={this.state.itemState.arr} // list of objects
            colNames={['المبلغ', 'تاريخ الدفع', 'الرقم']} //List of Strings
           noOfPages={this.state.itemState.ekfalTimes/3<1 ?(1):(this.state.itemState.ekfalTimes/3)} //number
            backgroundColor={'white'} //Table Background Color
            doSort={false}
        />
        </View>
          ):null}
         {this.state.flag=='1' ? (
           <View style={styles.userInfoSection}>
             <View style={{marginBottom:10}}>
               <Text>لقد قمت بكفالة {this.state.itemState.ChildGender=="female"? "الطفلة":"الطفل " } {this.state.itemState.ChildName} شهريا بقيمة {this.convertstr(this.state.itemState.ChildMoney)} شيكل</Text>
             <Text style={{color:"#787878"}}> معلومات {this.state.itemState.ChildGender=="female"? "الطفلة":"الطفل " }: </Text></View>
             
           <View style={styles.row}>
           <Icon2 name="user" color="black" size={25} style={{right:-5}} />
            <Text style={{color:"black", marginLeft: 23,marginRight:8,fontSize:20}}> {this.state.itemState.ChildName}</Text>
            </View>
           <View style={styles.row}>
           <Icon name="cake-variant" color="black" size={25}/>
           <Text style={{color:"black", marginLeft: 23,fontSize:20}}>
             {this.convertstr(this.state.itemState.ChildBD.split('/')[2])}/
             {this.convertstr(this.state.itemState.ChildBD.split('/')[1])}/
             {this.convertstr(this.state.itemState.ChildBD.split('/')[0])}
           </Text>
          </View>
          <View style={styles.row}>
           <Icon name="hand-coin" color="black" size={25}/>
           <Text style={{color:"black", marginLeft: 23,fontSize:20}}> {this.convertstr(this.state.itemState.ChildMoney)} شيكل</Text>
          </View>
          <View style={styles.row}>
           <Icon name="human-male-female" color="black" size={25}/>
           <Text style={{color:"black", marginLeft: 23,fontSize:20}}> {this.state.itemState.ChildGender =="female"? "أنثى":"ذكر " }</Text>
          </View>
           <View style={styles.row}>
           <Icon name="android-messages" color="black" size={25}/>
           <Text style={{color:"black", marginLeft: 23,fontSize:20}}> {this.state.itemState.ChildStory}</Text>
           
             </View> 
         
          </View> 
         ):null}  
          {this.state.flag=='3' ? (
           
           <View style={styles.userInfoSection}>
          
             <View style={{marginBottom:10}}>
             <Text style={{color:"#787878"}}> معلومات الجمعيةالتي ينتمي اليها الطفل: </Text></View>
             
             <View style={styles.row}>
           <Icon name="office-building" color="black" size={25} style={{right:-5}} />
            <Text style={{color:"black", marginLeft: 23,marginRight:8,fontSize:20}}> {this.state.OrgState.Message0}</Text>
            </View>
           <View style={styles.row}>
           <Icon name="map-marker-radius" color="black" size={25}/>
             <Text style={{color:"black", marginLeft: 23,fontSize:20}}> {this.state.OrgState.Message2}</Text>
             
             </View>
           <View style={styles.row}>
           <Icon name="phone" color="black" size={25}/>
           <Text style={{color:"black", marginLeft: 23,fontSize:20}}>{this.state.OrgState.Message1}</Text>
            </View>
            <View style={styles.row}>
           <Icon3 name="child" color="black" size={25}/>
           <Text style={{color:"black", marginLeft: 23,fontSize:20}}> {this.state.OrgState.Message5} </Text>
             </View>
             <View style={styles.row}>
           <Icon name="account-multiple-plus" color="black" size={25}/>
           <Text style={{color:"black", marginLeft: 23,fontSize:20}}> {this.state.OrgState.Message6} </Text>
             </View>
           <View style={styles.row}>
           <Icon name="email" color="black" size={25}/>
           <Text style={{color:"black", marginLeft: 23,fontSize:20}}> {this.state.itemState.OrgChildEmail}</Text>
           </View>
         </View>
        
         ):null} 
         
                   </View>
                 
        </Modal>
      
  
  {this.state.modalVisible3==true ? (
         <FlatList
        style={stylesfollower.root}
        data={this.state.dataChild}
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
            <>
            <TouchableOpacity style={stylesfollower.container} onPress={()=>{this.setState({itemState:item}),this.setModalVisible4(!modalVisible4 )}}>
              <Image source={{uri:item.ChildImage}} style={stylesfollower.avatar}/>
              <View style={stylesfollower.content}>
               
                  <View style={stylesfollower.text}>
                    <Text style={stylesfollower.name}>  {   item.ChildName    } </Text>
                    
                  </View>
                 


               </View>
              
               {/* <TouchableOpacity style={{right:6,top:20}} onPress={()=>{this.setState({itemState:item}),this.setModalVisible4(!modalVisible4 )}}>
               <Icon1 name='more-vertical'  color="#666666" size={25}></Icon1>
               
                 </TouchableOpacity> */}

               </TouchableOpacity>
               
        </>     
              
          );
        }}/>
      ):null}

      </SafeAreaView>
      </View>
  );
  }}
}

const styles = StyleSheet.create({
  containerall: {
    //alignItems: 'flex-end',
    flex: 1,
  },
  textLittle: {
    color: '#FFFFFF',
    fontSize: width * 0.043,
    fontFamily: 'Manrope-Bold',
  },
  centerAll: {
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonPink: {
    borderRadius: 5,
    padding: 8,
    paddingHorizontal: 15,
    backgroundColor: '#9E11B5',
  },
  container: {
    alignItems: 'flex-end',
    flex: 1,
    backgroundColor:"white"
    
  
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop:12,
    // color:'#924c9e',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row-reverse',
    marginBottom: 10,
    
  },
  infoBoxWrapper: {
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    borderTopColor: "#e0e0e0",
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 55,
    top:-45
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  edit:{
    borderWidth:1,
    height:"62%",
    borderColor:"#e0e0e0",
    alignSelf:'center',
    // bottom:-10,
    top:-40,
    width:"40%",
   
    borderRadius:7
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row-reverse',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  container1:{
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    //top:50,
    
    },
    datePickerStyle1: {
      width: 230,
      marginRight:0
    },
    whiteSheet1:{
      width: "100%",
      height: "6%",
      top:-470,
      flexDirection: 'row',
      marginBottom:60
      
  },
    centerContent1: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:-500,
      
      
  
    },
  input1:{
    backgroundColor:"#F6F7FB",
    height:58,
    marginBottom:20,
    fontSize:16,
    borderRadius:10,
    padding:12,
    textAlign:'right',
    fontFamily: 'FontAwesome'

  },
  input11:{
    backgroundColor:"#F6F7FB",
    height:158,
    marginBottom:20,
    fontSize:16,
    borderRadius:10,
    padding:12,
    paddingBottom:115,
    textAlign:'right',
    fontFamily: 'FontAwesome',
    
  },
  button1:{
   backgroundColor:"#924c9e",
    height:58,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop:40,
  },
  title1:{
    right:"540%",
    fontSize:25,
    fontWeight:'bold',
    color:'black',
    
    paddingBottom:0,
      
  },
  form1:{
    flex:1,
    position:"absolute",
    bottom:100,
    width: "85%",
     
  },
  dropdown2: {
    backgroundColor:"#F6F7FB",
    height:58,
    marginBottom:20,
    fontSize:16,
    borderRadius:10,
    padding:12,
    textAlign:'right',
    itemCount:2,
    itemColor:"red"
   
    
  },
  
  shadow2: {
        
    shadowColor: '#000',
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  backimage1: {
    width: "100%",
    height: 210,
   // marginBottom:50,
    top:50,
    resizeMode:'cover',
    // flex: 1,
    // backgroundColor: "#fff",
    
  },
  
  shadow1: {
      
    shadowColor: '#000',
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
},
dropdown1: {
  backgroundColor:"#F6F7FB",
  height:58,
  marginBottom:20,
  fontSize:16,
  borderRadius:10,
  padding:12,
  textAlign:'right',
  itemCount:2,
  itemColor:"red"
 
  
},
item1: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
textItem1: {
  
    flex: 1,
    fontSize: 16,
   
},
  
})
const stylesfollower = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
    width:"100%",
    marginBottom:-40,
    top:-40,
    // height:500
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
    alignItems: 'flex-start',
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

const styles1 = StyleSheet.create({
  containerall: {
    //alignItems: 'flex-end',
    flex: 1,
    backgroundColor:'white'
  },
  editsp: {
    borderWidth: 1,
    height: "130%",
    borderColor: "#e0e0e0",
    // marginright:20,
    bottom: 20,
    width: "33%",
    borderRadius: 7,

  },
  container: {
    alignItems: 'flex-end',
    flex: 1,
    backgroundColor:"white"
    
  
  },
  infoBox: {
    width: 290,
    left:10,
    top:-20,
    borderTopColor: "#e7e1eb",
    borderTopWidth: 1,
    flexDirection: 'row',
   
  },
  card:{
    
    shadowColor: '#00000021',
    
    shadowOffset: {
      width: 0,
      height: 6,
    }, shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor:"white",
    flexBasis: '46%',
    marginHorizontal: 5,
    borderWidth:1,
    borderColor:"#e7e1eb",
    width:350,
   
  },
  cardd: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  elevationd: {
    elevation: 5,
    shadowColor: 'black',
  },
  card1:{
    
    flexDirection:'row-reverse',
    marginBottom:12,
    left:30
  },
  icon:{
    height: 21,
    width: 21.5, 
  },
  icon1:{
    height: 20,
    width: 19.5, 
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row-reverse',
    marginLeft:20,
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  userImage:{
    height: 120,
    width:120,
    borderRadius:150,
    alignSelf:'flex-end',
    borderColor:"#924c9e",
    borderWidth:2,
    top:20,
    right:10,
  },
  name:{
    fontSize:32,
    flex:1,
    top:-5,
    // alignSelf:'center',
    right:20,
    color:"black",
    //fontWeight:'bold'
  },
  whiteSheet1:{
    borderTopLeftRadius:115,
    borderEndColor:"#924c9e",
    borderColor:"#924c9e",
    backgroundColor:"#fff",
    
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop:12,
    // color:'#924c9e',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row-reverse',
    marginBottom: 10,
    
  },
  infoBoxWrapper: {
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    borderTopColor: "#e0e0e0",
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 60,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit:{
    borderWidth:1,
    height:"130%",
    borderColor:"#e0e0e0",
    // marginright:20,
    bottom:20,
    width:"40%",
    borderRadius:7,
    
  },
  edit1:{
    borderWidth:1,
    borderColor:"#e0e0e0",
    marginLeft:30,
    marginBottom:30,
    width:"80%",
    borderRadius:7,
    
  },
  menuWrapper: {
    marginTop: -10,
    flexDirection:'row-reverse'
  },
  list: {
    
    // paddingHorizontal: -50,
    // backgroundColor:"#E6E6E6",
    backgroundColor:"white",
    marginTop:390,
    height:"100%"
   
  },
  listContainer:{
    alignItems:'center',
   },
  menuItem: {
    flexDirection: 'row-reverse',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 17,
    lineHeight:33,
  },
  container1:{
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    //top:50,
    
    },
    datePickerStyle1: {
      width: 230,
      marginRight:0
    },
   
    centerContent1: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:-500,
      
      
  
    },
  input1:{
    backgroundColor:"#F6F7FB",
    height:58,
    marginBottom:20,
    fontSize:16,
    borderRadius:10,
    padding:12,
    textAlign:'right',
    fontFamily: 'FontAwesome'

  },
  input11:{
    backgroundColor:"#F6F7FB",
    height:158,
    marginBottom:20,
    fontSize:16,
    borderRadius:10,
    padding:12,
    paddingBottom:115,
    textAlign:'right',
    fontFamily: 'FontAwesome',
    
  },
  button1:{
   backgroundColor:"#924c9e",
    height:58,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop:40,
  },
  title1:{
    right:"540%",
    fontSize:25,
    fontWeight:'bold',
    color:'black',
    
    paddingBottom:0,
      
  },
  form1:{
    flex:1,
    position:"absolute",
    bottom:100,
    width: "85%",
     
  },
  position:{
    fontSize:14,
    color:"black",
  },
  whiteSheet2:{
    width: "100%",
    height: "10%",
    flexDirection: 'row-reverse',
   marginLeft:20,
   alignItems:'flex-end',
    marginBottom:60,
   
   
    
},
  backimage1: {
    width: "100%",
    height: 210,
   // marginBottom:50,
    top:50,
    resizeMode:'cover',
    // flex: 1,
    // backgroundColor: "#fff",
    
  },
  
  shadow1: {
      
    shadowColor: '#000',
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
},
dropdown1: {
  backgroundColor:"#F6F7FB",
  height:58,
  marginBottom:20,
  fontSize:16,
  borderRadius:10,
  padding:12,
  textAlign:'right',
  itemCount:2,
  itemColor:"red"
 
  
},
item1: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
textItem1: {
  
    flex: 1,
    fontSize: 16,
   
},
  
});
const styles11 = StyleSheet.create({
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
    marginVertical: 7,
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
  input1: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    fontFamily: 'FontAwesome', 
    //right:"50%",
    textAlign: 'right',
  },
  form1: {
    flex: 1,
    position: "absolute",
    //bottom:100,
    width: "85%",
    top: -320,

  },
  userImage: {
    height: 130,
    width: 290,
    // borderRadius:150,
    alignSelf: 'center',
    // borderColor:"#924c9e",
    //borderWidth:1,
    top: -15,
    left: 0
  },


})