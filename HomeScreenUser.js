
import React,{ Component }  from 'react';
import { View, Text, StyleSheet ,TouchableOpacity,FlatList,Image,SafeAreaView,Modal,Alert} from 'react-native';
import PushNotification from "react-native-push-notification";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import NumericInput from 'react-native-numeric-input'
import { WebView } from "react-native-webview";
import YouT from './YouT'
import YoutubePlayer from "react-native-youtube-iframe";

import {
  Avatar,
  Title,
  ProgressBar,
  
} from 'react-native-paper';

import * as AddCalendarEvent from 'react-native-add-calendar-event';
//Import moment.js to deal with time
import moment from 'moment';
import Loader from "./Loader.js";
const utcDateToString = (momentInUTC) => {
  let s = moment.utc(momentInUTC)
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  return s;''
};
import {
  TouchableRipple,

} from 'react-native-paper';
export default class HomeScreenUser extends Component  { 
    constructor(props) {
        super(props);
       
        this.state = {
        Emailname:this.props.route.params.EmailName, 
        flag:true,
        def:true,
        dataYouT:"",

        dataPost:"",
        dataFollower:"",
        Loading:true,
        showModal: false,
        orgitem:"",
        flagorgitem:false,
        dataF:"",
        dataEvent:"",
        modalVisible1: false,
        eventitem:"",
        dataDonate: "",
        choose:"1"//1:child, 2:donate, 3:event
         };
      } 
     handleNotification = (str) => {
        PushNotification.localNotification({
           channelId: "test-channel",
           title: "إكفل                                                              " ,
           message:str+ " وافقت على طلب الإشتراك الخاص بك   ",
        });
   
   }
    GetInfo=(str,flag)=>{
   
    var APIURL = "http://192.168.1.16/Ekfal/OrgProfile.php";
          var headers = {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            };
    var Data ={
      Email: str
    };

      fetch(APIURL,{ 
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((Response)=> Response.json())
    .then((Response)=>{
    //  alert(Response)
   if (flag==0) this.handleNotification(Response[0].Message0)
    else {
      PushNotification.localNotification({
        channelId: "test-channel",
        title: "إكفل                                                              " ,
        message: " تم إرسال رسالة بواسطة "+Response[0].Message0+"                       "
     });
    }
    })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  
  }
  
   getNotificationUser=()=>{
    var APIURL = "http://192.168.1.16/Ekfal/getNotificationUser.php";
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
     if(Response=="No Results Found"){}
     else {
        for (var i=0;i<Response.length;i++){
            this.GetInfo(Response[i].OrgEmail,0)
          }
    }})
    .catch((error)=>{
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
  getNotificationChat=()=>{
    var APIURL = "http://192.168.1.16/Ekfal/getNotificationChat.php";
    var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };
      var Data ={
        Email: this.state.Emailname,
        flag:'1',
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
            this.GetInfo(Response[i].orgEmail,1)
          }
    }})
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
  reset() {
    for(let i=0;i<this.state.dataFollower.length;i++){

    this.state.dataFollower[i].color="white";
  }}
  
  getDateEkfal=()=>{
    var APIURL = "http://192.168.1.16/Ekfal/getDateEkfal.php";
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
     if(Response=="No Results Found"){}
     else {
        //console.log(Response)
        for (var i=0;i<Response.length;i++){
          PushNotification.localNotification({
            channelId: "test-channel",
            title: "إكفل                                                              " ,
            message:  "تذكير بكفالة الطفل "+ Response[i].ChildName +" بقيمة "+this.convertstr(Response[i].ChildMoney)+" شيكل                       ",
         });
        }
    }})
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
  this.setState({Loading:false});
  //this.setState({number:Response[0].number})
  }
  //console.log (this.state.dataFollower)
   })
  .catch((error)=>{
    console.error("ERROR FOUND" + error);
  })
  
  }
  GetInfoChild = () => {
    console.log(this.state.orgitem.orgEmail+"huuuuuuu")
    var APIURL = "http://192.168.1.16/Ekfal/ShowChild.php";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      Email: this.state.orgitem.orgEmail

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
  getEvent = () => {
    //var Email = this.props.Email;
    var APIURL = "http://192.168.1.16/Ekfal/getEventHome.php";

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var Data = {
      Email: this.state.orgitem.orgEmail,
       EmailUser:this.state.Emailname
    };

    fetch(APIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson)
        if (responseJson=="no result") {}
       else this.setState({ dataEvent: responseJson })
      }).catch((error) => {
        console.error("ERROR FOUND" + error);
      })
  }
  homeUser =()=>{
    var APIURL = "http://192.168.1.16/Ekfal/homeUser.php";
    var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };
      var Data ={
        Email:this.state.Emailname,
        
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
       this.setState({dataPost:Response})
        //console.log(Response.id)
        
    }})
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })

  }
  alert1 (msg){
    Alert.alert(
      "تنبيه",
      msg,
      [
        {
          text: "إلغاء",
        },
        {
          text: "موافق", onPress: () =>this.addToCalendar(this.state.eventitem.nameEvent, this.state.eventitem.sdEvent,this.state.eventitem.stEvent,this.state.eventitem.edEvent,this.state.eventitem.etEvent,this.state.eventitem.locEvent)

        }
      ]
    );}
  componentDidUpdate(){
    this.getNotificationUser()
    this.getDateEkfal()
    this.getNotificationChat()
  }
  getYouT=() =>{
    //var Email = this.props.Email;
    console.log(this.state.orgitem.orgEmail
      )
    var APIURL = "http://192.168.1.16/Ekfal/getYouT.php";
  
      var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };
            
      var Data ={
        Email: this.state.orgitem.orgEmail,
       
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
  addToCalendar = (title, startDateUTC,startTime,enddate,endTime,loc) => {
    console.log(moment.utc())
   const eventConfig = {
     title,
     startDate: utcDateToString(moment.utc(startDateUTC).format('YYYY-DD-MM')+"T"+startTime) ,
     endDate: 
     utcDateToString(moment.utc(enddate).format('YYYY-DD-MM')+"T"+endTime),
     location:loc,
     notes: 'تذكير بموعد المناسبة!',
     navigationBarIOS: {
       tintColor: 'orange',
       backgroundColor: 'green',
       titleColor: 'blue',
     }, 
   };
 
   AddCalendarEvent.presentEventCreatingDialog(eventConfig)
     .then((eventInfo) => {
       console.log(JSON.stringify(eventInfo))
       if (JSON.stringify(eventInfo)==JSON.stringify({"action": "CANCELED"}))  alert("تم إلغاء اضافة المناسبة الى التقويم");
       else alert("تم اضافة المناسبة الى التقويم");
       
     })
     .catch((error) => {
       // handle error such as when user rejected permissions
       alert('Error -> ' + error);
     });
 };
  ListEmptyView = () => {
    return (

        <Text style={{left:-100,width:350}}>لا يوجد جمعيات تم الإشتراك بها</Text>

    );
  }
  setModalVisible1 = (visible1,item) => {
    if (visible1==true) this.setState({eventitem:item});
     this.setState({ modalVisible1: visible1 });
   }
   addGoing =() => {
    // this.increaseNumber(str);
    this.setState({flagGoing:true})
     var APIURL = "http://192.168.1.16/Ekfal/addGoing.php";
     var headers = {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     };
     var Data = {
      Email: this.state.Emailname,
       org:  this.state.orgitem.orgEmail,
       id:this.state.eventitem.id,
     };
     fetch(APIURL, {
       method: 'POST',
       headers: headers,
       body: JSON.stringify(Data)
     })
       .then((Response) => Response.json())
       .then((Response) => {
         console.log(Response);
         this.alert1("هل تريد إضافة المناسبة الى التقويم؟")
         this.setModalVisible1(false)
         this.getEvent();
         
       })
       .catch((error) => {
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
       Email: this.state.orgitem.orgEmail,

       };
  
      fetch(APIURL,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
      .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson=="No Results Found") console.log("no donate")
    else this.setState({dataDonate:responseJson})
    }) .catch((error)=>{
        console.error("ERROR FOUND" + error);
      })
  }
   render(){
    const { modalVisible1 } = this.state;

       if (this.state.flag==true){
         this.state.flag=false;
           this.getNotificationUser()
           this.getDateEkfal()
           this.getNotificationChat()
         }
        //  if(this.state.dataYouT==""){
        //   this.getYouT()
        // }
         if(this.state.dataFollower=="") this.getInfoUserFollower()
         if(this.state.orgitem!="" && this.state.flagorgitem==false &&this.state.choose=='1') {
           this.GetInfoChild()
           this.state.flagorgitem=true
        }
        if(this.state.orgitem!="" && this.state.flagorgitem==false &&this.state.choose=='2') {
          this.setState({dataEvent:""})
          this.getEvent();
          this.state.flagorgitem=true;
       }
       if(this.state.orgitem!="" && this.state.flagorgitem==false &&this.state.choose=='3') {
        this.setState({dataDonate:""})
        this.getDonate();
        this.state.flagorgitem=true;
     }
     if(this.state.orgitem!="" && this.state.flagorgitem==false &&this.state.choose=='4') {
      this.setState({dataYouT:""})
      this.getYouT();
      this.state.flagorgitem=true;
   }
     if ( this.state.Loading) {
      
      return(  <Loader>  </Loader> 
     
      
      );
               
     }
     else{
    return (
        
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "white"}}>
             <View style={[styles.whiteSheet2, { flexDirection: 'row-reverse' }]}>
          <Text style={{left: "38%",fontSize: 25,fontWeight: 'bold',color: 'black',paddingBottom: 0,
  }}>إكفل</Text>
         </View>
        
        <FlatList
          data={this.state.dataFollower}
          style={{ width: 320, top: -50, right: 0, backgroundColor: "white", height: 10,marginBottom:-20 }}
          windowSize={5}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={this.ListEmptyView}
          inverted
           renderItem={({ item ,index}) => {
            var isEnd = index;
            // {console.log (index)}
            return (
              <View style={{ flexDirection: 'row' }}>
                
                  {isEnd==0&& this.state.def==true?(
                   // isEnd++,
                this.reset(),
                this.setState({flagorgitem:false}),
                this.setState({orgitem:item}) ,
               
                item.color='grey',
               this.setState({choose:"1"}),
                this.setState({def:false}),
               console.log(item.orgName)
              ):( null)} 
                <TouchableOpacity style={{ width: 130, height: 46,backgroundColor:item.color, borderColor: "#e0e0e0", borderRadius: 40, borderWidth: 1, margin: 3, flexDirection: 'row-reverse', alignContent: 'center' }}
             
                onPress={()=> {this.reset();this.setState({flagorgitem:false});this.setState({orgitem:item}) ;item.color='grey';this.setState({choose:"1"})}}>

                  <Image source={{ uri: item.image }} style={{ width: 30, height: 30, borderWidth: 1,borderColor:'grey', borderRadius: 30, alignSelf: 'center', left: 15 }}></Image>
                  <Text style={{ fontSize: 14, alignSelf: 'center', left: 20 }}>
                    {item.orgName}
                  </Text>
                 
                </TouchableOpacity>
              </View>
            )
          }}
        />
        <View style={{flexDirection:'row',top:-15}}>
        {this.state.choose=='4'? (<TouchableOpacity style={{borderBottomColor:'black',borderBottomWidth:1,width:"25%" }} onPress={() => {  this.setState({choose:'4'}); this.setState({flagorgitem:false}) }}>
         <FontAwesome name="youtube-play" color="black" size={26} style={{ alignSelf:'center',top:-3}} />
          </TouchableOpacity>):(
            <TouchableOpacity style={{borderBottomColor:'#e0e0e0',borderBottomWidth:1,width:"25%" }} onPress={() => {  this.setState({choose:'4'}); this.setState({flagorgitem:false}) }}>
          <FontAwesome name="youtube-play" color="#c9c9c9" size={26} style={{ alignSelf:'center',top:-3}} />
          </TouchableOpacity>
          )}
          {this.state.choose=='3'? (<TouchableOpacity style={{borderBottomColor:'black',borderBottomWidth:1,width:"25%" }} onPress={() => {  this.setState({choose:'3'}); this.setState({flagorgitem:false}) }}>
            <Icon name="charity" color="black" size={29} style={{ alignSelf:'center' ,top:2}} />
          </TouchableOpacity>):(
            <TouchableOpacity style={{borderBottomColor:'#e0e0e0',borderBottomWidth:1,width:"25%" }} onPress={() => {  this.setState({choose:'3'}); this.setState({flagorgitem:false}) }}>
            <Icon name="charity" color="#c9c9c9" size={29} style={{ alignSelf:'center' ,top:-3}} />
          </TouchableOpacity>
          )}
        {this.state.choose=='2'? (<TouchableOpacity style={{borderBottomColor:'black',borderBottomWidth:1,width:"25%" }} onPress={() => {  this.setState({choose:'2'}); this.setState({flagorgitem:false}) }}>
        <Ionicons name="calendar" color="black" size={26} style={{ alignSelf:'center' ,top:-3}} />
          </TouchableOpacity>):(
            <TouchableOpacity style={{borderBottomColor:'#e0e0e0',borderBottomWidth:1,width:"25%" }} onPress={() => {  this.setState({choose:'2'}); this.setState({flagorgitem:false}) }}>
            <Ionicons name="calendar" color="#c9c9c9" size={26} style={{ alignSelf:'center' ,top:-3}} />
          </TouchableOpacity>
          )}
         {this.state.choose=='1'? (<TouchableOpacity style={{borderBottomColor:'black',borderBottomWidth:1,width:"25%" }} onPress={() => {  this.setState({choose:'1'}); this.setState({flagorgitem:false}) }}>
         <FontAwesome name="child" color="black" size={26} style={{ alignSelf:'center',top:-3}} />
          </TouchableOpacity>):(
            <TouchableOpacity style={{borderBottomColor:'#e0e0e0',borderBottomWidth:1,width:"25%" }} onPress={() => {  this.setState({choose:'1'}); this.setState({flagorgitem:false}) }}>
          <FontAwesome name="child" color="#c9c9c9" size={26} style={{ alignSelf:'center',top:-3}} />
          </TouchableOpacity>
          )}
         
      
        </View>
        <View style={{ height: 520 ,backgroundColor:"white",bottom:-140}}>
          {this.state.choose == "1" ? (
              <SafeAreaView style={{ top:-110 }}>
            <FlatList style={styles1.list}
              contentContainerStyle={styles1.listContainer}
              data={this.state.dataF}
              horizontal={false}
              numColumns={1}
              keyExtractor={(item) => {
                return item.id;
              }}
              renderItem={({ item }) => {
                return (<>
                  {item.userEkfal == "empty" ? (
                  <View style={styles1.card}  >
                    <View style={styles1.card1}>
                      <View style={styles1.whiteSheet1}>
                        <Image style={styles1.userImage} source={{ uri: item.ChildImage }} />
                      </View>
                      <View style={styles1.cardFooter}>
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
                    <TouchableRipple style={[styles1.edit1, { backgroundColor: '#9E11B5' }]}
                            onPress={() => { this.setState({Don_Ekf:2});this.setState({ ekfalchild: item.id }); this.setState({ showModal: true }) }}>
                            <Text style={{ color: "white", alignContent: "center", alignSelf: 'center', height: 35, top: 5, fontSize: 20 }}>إكفل</Text>
                    </TouchableRipple>
                   </View>
                  ):(null)}

                </>
                )
              }}
            />
            </SafeAreaView>
          ) : (null)}
          
          {this.state.choose == "2" ? (
            <FlatList
            data={this.state.dataEvent}
            style={{ marginTop: -130,width:320, backgroundColor: "white" ,marginBottom:150}}
            ListEmptyComponent={<Text style={{left:-100,width:350}}>لا يوجد مناسبات تم إضافتها</Text>}
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
                    onPress={() => { this.setModalVisible1(true, item) }} >
                      <Text style={{ color: "black", fontSize: 20, alignSelf: 'center', top: 4 }}>عرض التفاصيل</Text>
                    </TouchableRipple>
                    </View>

                </View>
              )
            }}
          />
          ):(null)}
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
          {this.state.choose == "3" ? (
            <FlatList
            data={this.state.dataDonate}
            style={{ marginTop: -130,width:320, backgroundColor: "white" ,marginBottom:150}}
            windowSize={5}
            ListEmptyComponent={<Text style={{left:-100,width:350}}>لا يوجد تبرعات تمت إضافتها</Text>}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
         <>
         
         {item.money!=item.donation?(
           <View style={[styles11.card, styles11.elevation, { left: 7, top: 0, width: 290, height: 280 }]}
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
             
                <TouchableRipple style={[{ marginHorizontal: 15, borderWidth: 1, height: 39, borderColor: "#e0e0e0", bottom: 20, width: "50%", borderRadius: 7,top:1 }]} 
                onPress={() => {  this.setState({item:item}); this.setState({Don_Ekf:1});this.setState({ showModal: true }) }} >
                  <Text style={{ color: "black", fontSize: 20, alignSelf: 'center', top: 1}}>تبرع الان</Text>
                </TouchableRipple>
             
           
             </View>

         </View>
         ):(null)}

              </>  
              )
            }}
          />
          ):(null)}
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
                  <View style={styles1.containerall}>
                    <SafeAreaView style={styles1.container}>
                      <View style={styles1.whiteSheet2}>
                        <TouchableOpacity style={{ marginLeft: 0 }} >
                          <Icon name="arrow-right" color="black" size={30} style={{left: 50 ,position:'absolute'}} 
                          onPress={() => {this.setModalVisible1(!modalVisible1);
                          }} />
                        </TouchableOpacity>
                       <Image source={{uri:this.state.eventitem.pic}} style={{width:"130%",height:220,top:120,right:50}}/>
                       </View>
                       <View style={{flexDirection:'row-reverse',top:140}}>
                      
                            <TouchableOpacity onPress={() => {this.addGoing()}}
                            style={[ { backgroundColor: '#9E11B5', borderWidth: 1, height: "130%",left:15, borderColor: "#e0e0e0", bottom: 20,  width: "80%", borderRadius: 7, }]}>
                            <Text style={{ color: "white", fontSize: 20, alignSelf: 'center', top: 4 }}>ذهاب</Text>
                          </TouchableOpacity>
                        
                         
                          {/* <TouchableOpacity  onPress={() => { 
                            this.state.flagGoing==true? (
                              this.addToCalendar(this.state.eventitem.nameEvent, this.state.eventitem.sdEvent,this.state.eventitem.stEvent,this.state.eventitem.edEvent,this.state.eventitem.etEvent,this.state.eventitem.locEvent)
                            ):(
                              this.alert("عليك تأكيد الذهاب أولا قبل إضافة المناسبة الى التقويم الخاص بك")
                            )
                              }}
                            style={[ { backgroundColor: 'white' , height: "130%",  bottom: 20,  width: "10%",left:25}]}>
                              <Icon name="calendar-plus" size={35} style={{ color: "black", alignSelf: 'center', top: 4 }}></Icon>
                          </TouchableOpacity> */}
                        </View>
                        <Icon name="arrow-right" color="white" size={30} style={{right: 18,top:-150}} />

                        <Text style={[{ right: 25,fontSize:25,fontWeight:'bold',top:12}]}>{this.state.eventitem.nameEvent}</Text>

                        <View style={[styles.column, { alignItems: 'flex-end', alignContent: 'flex-end', alignSelf: 'flex-end',top:90 }]}>
                        
                    <Text style={[{ right: 25,fontSize:25,fontWeight:'bold' ,top:-10}]}>التفاصيل</Text>
                    <View style={[styles.infoBoxWrapper, { right: 25 }]}>
                      <View style={styles.infoBox}>
                        <Text></Text>
                      </View>
                    </View>
                    {this.state.modalVisible1==true?(this.state.numGoing==""?(this.numberGoing()):(null)):(null)}
                    <View style={{ flexDirection: 'row', right: 25, top: -5 }}>
                      <Text style={{fontSize:18}}> سيحضر هذه المناسبة {this.convertstr(this.state.numGoing+"")} من الأشخاص </Text>
                      <MaterialIcons name="group" color="black" size={22} />
                    </View>
                    <View style={{ flexDirection: 'row', right: 26, top:5 ,width:280}}>
                      <Text style={{fontSize:18}}> تبدأ المناسبة بتاريخ {this.state.eventitem.sdEvent} في تمام الساعة {this.state.eventitem.stEvent}</Text>
                      <Icon name="clock-time-three" color="black" size={22} />
                    </View>
                    <View style={{ flexDirection: 'row', right: 25, top: 11 }}>
                      <Text style={{fontSize:18}}>تقام المناسبة في {this.state.eventitem.locEvent}</Text>
                      <Icon name="map-marker" color="black" size={22} />
                    </View>
                    <View style={{ flexDirection: 'row', right: 34, top: 22 ,width:280}}>
                      <Text style={{fontSize:18,top:-4}}> تنتهي المناسبة بتاريخ {this.state.eventitem.edEvent} في تمام الساعة {this.state.eventitem.etEvent}</Text>
                      <Fontisto name="hourglass-end" color="black" size={15} />
                    </View>
                    <View style={{ flexDirection: 'row', right: 45, top: 25,width:280 }}>
                      <Text style={{fontSize:18}}> {this.state.eventitem.desEvent}</Text>
                      <MaterialIcons name="description" color="black" size={22} />
                    </View>
                    {/* //{console.log("j")} */}
                    
                   </View>
                    </SafeAreaView>
                  </View>
                </Modal>
          {this.state.choose == "4" ? (
            <FlatList
              data={this.state.dataYouT}
              ListEmptyComponent={this.ListEmptyView1}
              style={{ width: 320, top: -140, right: 0, backgroundColor: "white" }}
              windowSize={5}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={[styles1.card, styles1.elevation, { left: 7, top: 0, width: 300, height: 310 }]}>

                    <View style={{ flexDirection: 'row-reverse', top: 15, right: 13 }}>
                      <Avatar.Image
                        size={77}
                        source={{ uri: item.Message3 }}
                      />
                      <Text style={{ color: 'black', fontSize: 22, fontFamily: 'Manrope-Bold', top: 20, right: -10 }}>
                        {item.Message0}
                      </Text>

                    </View>
                    <Text style={{ top: 20, fontSize: 20,right:20, marginBottom: 30 }}>{item.descripV}</Text>

                    <View style={{ width: 300, left: 0 }}>
                      {/* <Text>{item.idLink.split('/')[3]}</Text> */}
                      <YoutubePlayer
                        height={300}
                        play={this.state.playing}
                        videoId={item.idLink.split('/')[3]}
                      // onChangeState={onStateChange}
                      />

                    </View>

                  </View>
                )
              }}
            />) : (null)}

        </View>
   
    </View>
    );
}}
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
  containerall: {
    //alignItems: 'flex-end',
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    alignItems: 'flex-end',
    flex: 1,
    backgroundColor: "white"


  },
  infoBox: {
    width: 290,
    left: 10,
    top: -20,
    borderTopColor: "#e7e1eb",
    borderTopWidth: 1,
    flexDirection: 'row',

  },
  card: {
    shadowColor: '#00000021',

    shadowOffset: {
      width: 0,
      height: 6,
    }, shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor: "white",
    flexBasis: '46%',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#e7e1eb",
    width: 350,

  },
  card1: {

    flexDirection: 'row-reverse',
    marginBottom: 12,
  },
  icon: {
    height: 21,
    width: 21.5,
  },
  icon1: {
    height: 20,
    width: 19.5,
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row-reverse',
    marginLeft: 20,
    justifyContent: "center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 150,
    alignSelf: 'flex-end',
    borderColor: "#924c9e",
    borderWidth: 2,
    top: 20,
    right: 10,
  },
  name: {
    fontSize: 32,
    flex: 1,
    top: -5,
    // alignSelf:'center',
    right: 20,
    color: "black",
    //fontWeight:'bold'
  },
  whiteSheet1: {
    borderTopLeftRadius: 115,
    borderEndColor: "#924c9e",
    borderColor: "#924c9e",
    backgroundColor: "#fff",

  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: 12,
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
  edit: {
    borderWidth: 1,
    height: "130%",
    borderColor: "#e0e0e0",
    // marginright:20,
    bottom: 20,
    width: "40%",
    borderRadius: 7,

  },
  edit1: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginLeft: 30,
    marginBottom: 30,
    width: "80%",
    borderRadius: 7,

  },
  menuWrapper: {
    marginTop: -10,
    flexDirection: 'row-reverse'
  },
  list: {
    // paddingHorizontal: -50,
    // backgroundColor:"#E6E6E6",
    backgroundColor: "white",
   top:-30,
   
   //bottom:50 height:600 

  },
  listContainer: {
   
    alignItems: 'center',
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
    lineHeight: 33,
  },
  container1: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    //top:50,

  },
  datePickerStyle1: {
    width: 230,
    marginRight: 0
  },

  centerContent1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -500,



  },
  input1: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    textAlign: 'right',
    fontFamily: 'FontAwesome'

  },
  input11: {
    backgroundColor: "#F6F7FB",
    height: 158,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    paddingBottom: 115,
    textAlign: 'right',
    fontFamily: 'FontAwesome',

  },
  button1: {
    backgroundColor: "#924c9e",
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  title1: {
    right: "540%",
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',

    paddingBottom: 0,

  },
  form1: {
    flex: 1,
    position: "absolute",
    bottom: 100,
    width: "85%",

  },
  position: {
    fontSize: 14,
    color: "black",
  },
  whiteSheet2: {
    width: "100%",
    height: "10%",
    flexDirection: 'row-reverse',
    marginLeft: 20,
    alignItems: 'flex-end',
    marginBottom: 60,



  },
  backimage1: {
    width: "100%",
    height: 210,
    // marginBottom:50,
    top: 50,
    resizeMode: 'cover',
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
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    textAlign: 'right',
    itemCount: 2,
    itemColor: "red"


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
