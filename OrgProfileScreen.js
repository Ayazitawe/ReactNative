import * as React from 'react';
import { View, Text ,SafeAreaView,StyleSheet, Image, ScrollView,TextInput,Modal, FlatList,} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple
} from 'react-native-paper';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import YoutubePlayer from "react-native-youtube-iframe";

import { TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Dropdown, } from 'react-native-element-dropdown';
import {launchImageLibrary} from 'react-native-image-picker';
import Loader from "./Loader.js";
export default class OrgProfileScreen extends React.Component  {
  
  constructor(props) {
    super(props);
   
    this.state = {
      modalVisible1: false,
      modalVisible2: false,
      modalVisible3: false,
      modalVisibleYou:true,
      dataYouT:"",

      Emailname:this.props.route.params.ORGEmailName, 
      Name : "" ,
      Phone: "" ,
      City: ""  , 
      choose:'2',
      password:"", 
      ChildNumber:'0',
      followerNumber:"",
      EmailUser:"", 
      NameUser : "" ,
      PhoneUser: "" ,
      CityUser: ""  , 
      passwordUser:"", 
      genderUser:'male',
      WorkUser:"",
      dateUser:'',
      picUser:"",
      Loading:true,
      shouldShow:true,
      shouldShow1:true,
      pic:'https://i.stack.imgur.com/l60Hf.png',
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
    dataFollower:"",
      
  };
  }
  GetInfoFollower=()=>{
    //console.log("ayazitawe")
   var APIURL = "http://192.168.1.16/Ekfal/GetInfoFollower.php";
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
  else this.setState({dataFollower :Response});
  
   })
  .catch((error)=>{
    console.error("ERROR FOUND" + error);
  })

}
  setModalVisible1 = (visible1) => {
       
    this.setState({ modalVisible1: visible1 });
  }
  setModalVisible2 = (visible1) => {
       
    this.setState({ modalVisible2: visible1 });
  }
  setModalVisible3 = (visible1,str1) => {
    this.setState({ modalVisible3: visible1 });
    if (visible1==true) {
     this.setState({ EmailUser: str1 }, () => {
      this.GetInfodd(); 
    }); 
   
    }
   
  }
  GetInfo=()=>{
   
    var APIURL = "http://192.168.1.16/Ekfal/OrgProfile.php";
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
      //console.log(Response)
      this.setState({Name:Response[0].Message0})
      this.setState({Phone:Response[0].Message1})
      this.setState({City:Response[0].Message2})
      this.setState({pic:Response[0].Message3})
      this.setState({password:Response[0].Message4})
      this.setState({ChildNumber:Response[0].Message5})
      this.setState({followerNumber:Response[0].Message6})
      this.setState({Loading:false})
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
InsertRecord1=()=>{
  if (this.state.ChildGender == ""||this.state.ChildMoney== ""||this.state.ChildName== ""
  ||this.state.ChildStory== ""||this.state.data== ""||this.state.Pic== "https://i.stack.imgur.com/l60Hf.png"){
   // Alert.alert("الرجاء ادخال كافة المعلومات!");
   this.alert ("الرجاء ادخال كافة المعلومات!");
  }
  else{
  var Email = this.state.Emailname;
  var Name = this.state.Name;
  var City = this.state.City;
  var Phone = this.state.Phone;
  var Image = this.state.pic;
  var ChildNum = this.state.ChildNumber;
  var password = this.state.password;
  
  
  
    var APIURL = "http://192.168.1.16/Ekfal/EditOrgProf.php";

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
     ChildNum :ChildNum,
     password : password,
    };

    fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson)
    this.GetInfo();
}) .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  }}

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
    
      this.setState({pic:'data:image/png;base64,' + response.assets[0].base64});
// console.log(response.assets[0]);
    }

  });

};
GetInfodd=()=>{
   
  var APIURL = "http://192.168.1.16/Ekfal/userProfile.php";
        var headers = {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          };
  var Data ={
    Email: this.state.EmailUser
  };

    fetch(APIURL,{
    method: 'POST',
    headers: headers,
    body: JSON.stringify(Data)
  })
  .then((Response)=> Response.json())
  .then((Response)=>{
  //  alert(Response)
  this.setState({NameUser:Response[0].Message0})
  this.setState({PhoneUser:Response[0].Message1})
  this.setState({passwordUser:Response[0].Message2})
   this.setState({picUser:Response[0].Message3})
   this.setState({CityUser:Response[0].Message4})
   this.setState({dateUser:Response[0].Message5})
   this.setState({WorkUser:Response[0].Message6})
   this.setState({genderUser:Response[0].Message7})
   if(this.state.Work=='')
      this.setState({shouldShow :false}) 
      if(this.state.gender=='')
      this.setState({gender :'male'}) 
      if(this.state.date=='')
      this.setState({shouldShow1 :false}) 
  })
  .catch((error)=>{
    console.error("ERROR FOUND" + error);
  })

}  
  render() {
    const { modalVisible1 } = this.state;
    const { modalVisible2 } = this.state;
    const { modalVisible3 } = this.state;
    if(this.state.dataYouT==""){
      this.getYouT()
      // this.state.modalVisibleYou
    }
   if (this.state.Name==""){this.GetInfo();}
   if (this.state.dataFollower=="") this.GetInfoFollower();
 
   if ( this.state.Loading) {
  
    return(  <Loader>  </Loader> 
 
    );
        
   }
   else if ( !this.state.Loading){
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
              
              <ScrollView style={{height:350,bottom:50}}>
               
              <TextInput
              style={styles.input1}
              placeholder="اسم الجمعية
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
          style={[styles.input1,{marginBottom:100}]}
          placeholder="عدد اطفال الجمعية"
          autoCapitalize="none"
          keyboardType="numeric"
         
          value={this.state.ChildNumber}
          onChangeText={ChildNumber => this.setState({ChildNumber})}
          />  
               
              </ScrollView>
              
             
          </SafeAreaView>

    </View>
    </Modal>
    
         
         
  


   <Modal
         statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={modalVisible3}
          onRequestClose={() => {
             this.setModalVisible3(!modalVisible3);
          }}
          coverScreen={false}
        >
<View style={styles1.containerall}>
      <SafeAreaView style={styles1.container}>
        <View style={styles1.whiteSheet2}>
        <TouchableOpacity style={{marginLeft:0}} >
          <Icon name="arrow-right" color="black" size={30} style={{marginLeft:0}} onPress={()=>{ 
          this.setModalVisible3(!modalVisible3,"");}}/>
        </TouchableOpacity>
        <Text style={{fontSize:25,fontWeight:'bold',color:'black',paddingBottom:0,}}> {this.state.NameUser}</Text>
        </View>
          <View style={styles1.userInfoSection}>
         <View style={{flexDirection: 'row', marginTop: -50}}>
         <View style={{marginLeft: 20}}>
              <Title style={[styles1.title, {
                marginTop:25,
                marginBottom: 5,
               
              }]}> {this.state.NameUser} </Title>
              
            </View> 
         <Avatar.Image 
              source={{
                uri: this.state.picUser,
              }}
              size={80}
              // style={{borderColor:"#e0e0e0",borderWidth:2}}
              
          />
         </View>
         </View> 
        
         <View style={styles1.userInfoSection}>
          <View style={styles1.row}>
          <Icon name="map-marker-radius" color="black" size={20}/>
            <Text style={{color:"black", marginLeft: 23}}> {this.state.CityUser}</Text>
            
            </View>
          <View style={styles1.row}>
          <Icon name="phone" color="black" size={20}/>
          <Text style={{color:"black", marginLeft: 23}}>{this.state.PhoneUser}</Text>
            
           </View>
          <View style={styles1.row}>
          <Icon name="email" color="black" size={20}/>
          <Text style={{color:"black", marginLeft: 23}}> {this.state.EmailUser}</Text>
          
            </View>
            {this.state.shouldShow1 ? (
           <View style={styles.row}>
          <Icon name="cake-variant" color="black" size={20}/>
          <Text style={{color:"black", marginLeft: 23}}>{this.state.dateUser}</Text>
           </View>
           ) : null}
            {this.state.shouldShow ? (
          <View style={styles.row}>
          <Icon name="office-building-marker" color="black" size={20}/>
          <Text style={{color:"black", marginLeft: 23}}>{this.state.genderUser =="female"? "تعمل لدى ":"يعمل لدى " }{this.state.WorkUser}</Text>
          </View>
        ) : null}
        </View>
        <View style={{flexDirection:'row',left:-30}}>
        <TouchableRipple  style={[styles1.edit,{marginHorizontal:15}]} >
           <Text style={{color:"black",fontSize:20,alignSelf:'center',top:4}}> مراسلة</Text>
         </TouchableRipple>
         <TouchableOpacity style={[styles1.edit,{backgroundColor: '#e0c1e6'}]} >
         <Text style={{color:"black",fontSize:20,alignSelf:'center',top:4}}>مشترك</Text>
         </TouchableOpacity> 
           </View>
      </SafeAreaView>
      
          </View>
    </Modal>




      <SafeAreaView style={styles.container}>
        
          <View style={styles.userInfoSection}>
         <View style={{flexDirection: 'row', marginTop: 15}}>
         <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {
                marginTop:25,
                marginBottom: 5,
               
              }]}> {this.state.Name}</Title>
              <View style={{ flexDirection: 'row', top: -15, left: 35 }}>
                  <View style={{ flexDirection: 'row', marginRight: 20 }}>
                        <Caption style={{ color: 'black', top: 5, right: 5 }}>الأطفال</Caption>
                        <Title>{this.convertstr(this.state.ChildNumber)}</Title>
                      </View>
                      <View style={{ flexDirection: 'row' }} >
                        <Caption style={{ color: 'black', top: 5, right: 5 }}>المشتركين</Caption>
                        <Title>{this.convertstr(this.state.followerNumber)}</Title>
                      </View>
                    </View>
            </View> 
         <Avatar.Image 
              source={{
                uri: this.state.pic,
              }}
              size={80}
              // style={{borderColor:"#e0e0e0",borderWidth:2}}
              
          />
         </View>
         </View> 
        
         <View style={[styles.userInfoSection,{top:-30}]}>
          <View style={styles.row}>
          <Icon name="map-marker-radius" color="black" size={20}/>
            <Text style={{color:"black", marginLeft: 23}}> {this.state.City}</Text>
            
            </View>
          <View style={styles.row}>
          <Icon name="phone" color="black" size={20}/>
          <Text style={{color:"black", marginLeft: 23}}>{this.state.Phone}</Text>
            
           </View>
          <View style={styles.row}>
          <Icon name="email" color="black" size={20}/>
          <Text style={{color:"black", marginLeft: 23}}> {this.state.Emailname}</Text>
          
            </View>
        </View>
        <View style={{flexDirection:'row-reverse',top:-25}}>
        <TouchableRipple  style={[styles.edit,{marginRight: 32,height:39.5,width:"49%"} ]} onPress={()=>  {this.setModalVisible1(!modalVisible1)}}>
           <Text style={{color:"black",alignSelf:'center',fontSize:19,top:5}}>تعديل الملف الشخصي</Text>
         </TouchableRipple>
         <TouchableRipple  style={[styles.edit,{marginRight: 10,height:39.5,width:"35%"} ]} onPress={() => {this.props.navigation.push("Login")}}>
           <Text style={{color:"black",alignSelf:'center',fontSize:19,top:5}}>تسجيل الخروج</Text>
         </TouchableRipple>
        </View>

        <View style={{flexDirection:'row',top:-20}}>
        {this.state.choose=='1'? (<TouchableOpacity style={{borderBottomColor:'black',borderBottomWidth:1,width:"50%" }} 
             onPress={()=>  {this.setState({choose:'1'});this.setState({ modalVisibleYou: false });this.setModalVisible2(!modalVisible2)}}>
              <Icon name="account-group" color="black" size={26} style={{ alignSelf:'center',top:-3}} />
          </TouchableOpacity>):(
            <TouchableOpacity style={{borderBottomColor:'#e0e0e0',borderBottomWidth:1,width:"50%" }} 
            onPress={()=>  {this.setState({choose:'1'});this.setState({ modalVisibleYou: false });this.setModalVisible2(!modalVisible2)}}>
            <Icon name="account-group" color="#c9c9c9" size={26} style={{ alignSelf:'center',top:-3}} />
          </TouchableOpacity>
          )}
        {this.state.choose=='2'? (<TouchableOpacity style={{borderBottomColor:'black',borderBottomWidth:1,width:"50%" }} 
            onPress={() => {this.setState({choose:'2'});this.setState({ modalVisibleYou: true });
            this.setModalVisible2(false)
        }} >
        <Icon name="youtube" color="black" size={26} style={{ alignSelf:'center' ,top:-3}} />
          </TouchableOpacity>):( 
            <TouchableOpacity style={{borderBottomColor:'#e0e0e0',borderBottomWidth:1,width:"50%" }} 
            onPress={() => {this.setState({choose:'2'});this.setState({ modalVisibleYou: true });this.setModalVisible2(false)
          }} >
            <Icon name="youtube" color="#c9c9c9" size={26} style={{ alignSelf:'center' ,top:-3}} />
          </TouchableOpacity>
          )}
           
         
    
         
      
        </View> 
        {/* <View style={styles.infoBoxWrapper}>
            <View style={styles.infoBox}>
              <Title>{this.convertstr(this.state.ChildNumber)}</Title>
              <Caption> أطفال الميتم </Caption>
            </View>
            <TouchableOpacity style={styles.infoBox} onPress={()=>  {this.setModalVisible2(!modalVisible2)}}>
              <Title>{this.convertstr(this.state.followerNumber)}</Title>
              <Caption>المشتركين</Caption>
            </TouchableOpacity>
            
        </View> */}
         {modalVisible2==true ? (
            <View style={styles.container1}>
            {/* <View style={stylesfollower.whiteSheet1}>
            <TouchableOpacity style={{marginLeft:310}} onPress={()=> {this.GetInfo();this.setModalVisible2(!modalVisible2)}}>
            <Icon name="arrow-right" color="black" size={34} style={{marginLeft:5}}/>
            </TouchableOpacity>
            <Text style={{right:"300%",fontSize:25,fontWeight:'bold',color:'black',paddingBottom:0,}}>المشتركين</Text>
            </View> */}
            <FlatList
           style={[stylesfollower.root,{top:0}]}
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
               <View style={[stylesfollower.container,{width:360,right:20}]}>
                <View style={{flexDirection:'row-reverse'}}>
                <Image source={{uri:item.image}} style={stylesfollower.avatar}/>
                 <View style={stylesfollower.content}>
                  
                     <View style={stylesfollower.text}>
                       <Text style={stylesfollower.name}>  {   item.userName    } </Text>
                     </View>
                  </View>
                  <View style={{flexDirection:'row-reverse',marginTop:45,left:-30}}>
                  <TouchableRipple  style={{borderWidth:1,height:30,top:-25,borderColor:"#e0e0e0",alignSelf:'center',bottom:20,width:90,borderRadius:7}} onPress={()=>  {
         this.setModalVisible3(!modalVisible3,item.userEmail);
           }}>
              <Text style={{color:"black",alignSelf:'center',fontSize:20,}}>زيارة</Text>
            </TouchableRipple>
                  
            </View>
                </View> 
               
                  
                 </View>
             );
           }}/>
            </View>
          ):(null)}
          {this.state.modalVisibleYou==true ? (
    <FlatList
    data={this.state.dataYouT}
    ListEmptyComponent={this.ListEmptyView1}
    style={{ width: 320, top:2, right: 20, backgroundColor: "white" }}
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
  />
   ):(null)}

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
    height: 80,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit:{
    borderWidth:1,
    height:"5%",
    borderColor:"#e0e0e0",
    alignSelf:'center',
    bottom:20,width:"80%",
    marginRight: -8,
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
    //alignItems: "center",
   // justifyContent: "center",
    //top:50,
    
    },
    datePickerStyle1: {
      width: 230,
      marginRight:0
    },
    whiteSheet1:{
      width: "100%",
      height: "6%",
      top:10,
      flexDirection: 'row',
      marginBottom:60,
      //backgroundColor:"red"
      
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
    padding: 1,
    // flexDirection: 'row-reverse',
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
    marginBottom:10,
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
  card1:{
    
    flexDirection:'row-reverse',
    marginBottom:12,
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
    marginTop:40,
    
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
   top:-20,
    marginBottom:40,
   
   
    
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
