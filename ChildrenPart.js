import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
 SafeAreaView,
  Image,
  Alert,
  ScrollView,
  FlatList,  StatusBar,

  TouchableRipple,TextInput,
  Modal,TouchableHighlight 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
import {launchImageLibrary} from 'react-native-image-picker';
import {Dropdown, } from 'react-native-element-dropdown';
import Loader from "./screens/Loader";
import DataTable, { COL_TYPES } from 'react-native-datatable-component';

export default class ChildrenPart extends Component {

  constructor(props) {

    super(props);
    this.state = {
      modalVisible: false,
      modalVisible1: false,
      modalVisibleEkfal: false,
      dataEkfal:'',
      ORGEmailName:this.props.route.params.EmailName, 
      ChildGender:'',
      ChildName:'',
      ChildMoney:'',
      ChildStory:'',
      Loading:true,
      kafelState:'',
      idff:'',
      ChildBD:'',
      flag:'1',
      ff:false,
      Pic:'https://i.stack.imgur.com/l60Hf.png',
      data: "",
      data1 : [
        {label: ' أنثى', value: 'female'},
        {label: 'ذكر', value: 'male'},
       ],
    };
  }
  alert (msg,item){
    Alert.alert(
      "تنبيه",
      msg,
      [
        {
          text: "إلغاء",
        },
        {
          text: "موافق", onPress: () => this.DeleteInfo(item)
        }
      ]
    );}
    convertstr=(str)=>{
      var arabicNumbers = ["٠","١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩" ]  
      for(var i=0; i <10; i++)
       {
         for (var j=0;j<str.length;j++)
         str = str.replace(i,arabicNumbers[i] );
       }
       return str;
     }
    alert1 (msg){
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
      setModalVisible = (visible) => {
        this.setState({ChildName:''});
  this.setState({date:''});
  this.setState({ChildStory:''});
  this.setState({ChildGender:''});
  this.setState({ChildMoney:''});
  this.setState({Pic:'https://i.stack.imgur.com/l60Hf.png'});
        this.setState({ modalVisible: visible });
      }
      setModalVisible1 = (visible1) => {
       
        this.setState({ modalVisible1: visible1 });
      }
      setModalVisibleEkfal = (visible1) => {
       
        this.setState({ modalVisibleEkfal: visible1 });
      }
      setModalVisible2 = (visible1,item) => {
        this.clickEventListener1(item);
        this.setState({ modalVisible1: visible1 });
      }
      GetInfoUser=(str)=>{
        this.setState({loading:true})
        var APIURL = "http://192.168.1.16/Ekfal/userProfile.php";
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
          this.setState({kafelState :Response[0]});
          this.setState({loading:false})
          //console.log.
        })
        .catch((error)=>{
          console.error("ERROR FOUND" + error);
        })
      
      }
  GetInfo=()=>{
    // this.setState({id: ''});
    console.log("adasdasfsdf");
    var APIURL = "http://192.168.1.16/Ekfal/ShowChild.php";
          var headers = {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            };
    var Data ={
      Email: this.state.ORGEmailName
    
    };

      fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((Response)=> Response.json())
    .then((Response)=>{
     if(Response=="No Results Found"){console.log("يرجى إضافة اطفال")}
    else {this.setState({data :   Response});
    this.setState({Loading:false});
    }
     
      
      
     
    })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  
  }
  deletehandler=(item)=>{
    this.alert("هل تريد حذف الطفل؟",item)

  }
  DeleteInfo=(item)=>{
    //console.log("adasdasfsdf");
  
    
    var APIURL = "http://192.168.1.16/Ekfal/DeleteChild.php";
          var headers = {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            };
    var Data ={
      id: item.id
    
    };

      fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((Response)=> Response.json())
    .then((Response)=>{
      alert (Response);
   
      this.setState({data: ''});
      this.GetInfo();
     
     })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  
  }
  clickEventListener(item) {
    Alert.alert(item.name)
    }

clickEventListener1(item) {
  this.setState({id: item.id});
  this.setState({ChildGender: item.ChildGender});
  this.setState({ChildName: item.ChildName});
  this.setState({ChildMoney: item.ChildMoney});
  this.setState({ChildStory: item.ChildStory});
  this.setState({ChildBD: item.ChildBD});
  this.setState({Pic: item.ChildImage});
       
 }

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
    
      this.setState({Pic:'data:image/png;base64,' + response.assets[0].base64});
// console.log(response.assets[0]);
    }

  });

};
  getEkfalChild = () => {

    var APIURL = "http://192.168.1.16/Ekfal/getEkfalChild.php";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      Email: this.state.ORGEmailName

    };

    fetch(APIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then((Response) => Response.json())
      .then((Response) => {
        // console.log(Response)
        if (Response=='No Results Found'){console.log("sSsa")}
        else  {this.setState({ dataEkfal: Response });
        // console.log(this.state.dataEkfal[0].ChildName)

      }
        //this.GetInfo();

      })
      .catch((error) => {
        console.error("ERROR FOUND" + error);
      })
  }
InsertRecord1=()=>{
  
  var Id= this.state.id;  
  var Email = this.state.ORGEmailName;
  var Name = this.state.ChildName;
  var BD = this.state.ChildBD;
  var Story = this.state.ChildStory;
  var Image = this.state.Pic;
  var gender = this.state.ChildGender;
  var Money = this.state.ChildMoney;
  // this.setState({ChildName:''});
  // this.setState({date:''});
  // this.setState({ChildStory:''});
  // this.setState({ChildGender:''});
  // this.setState({ChildMoney:''});
  // this.setState({Pic:'https://i.stack.imgur.com/l60Hf.png'});
  
    var APIURL = "http://192.168.1.16/Ekfal/EditChild.php";

    var headers = {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    };
          
    var Data ={
     Id:Id,
     Email: Email,
     Name :Name, 
     BD : BD,
     Story :Story,
     Image :Image,
     gender :gender,
     Money : Money,
    };

    fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((response) => response.text())
  .then((responseJson) => {
    this.GetInfo();
}) .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  }

InsertRecord=()=>{
  if (this.state.ChildGender == ""||this.state.ChildMoney== ""||this.state.ChildName== ""
  ||this.state.ChildStory== ""||this.state.Pic== "https://i.stack.imgur.com/l60Hf.png"){
   // Alert.alert("الرجاء ادخال كافة المعلومات!");
   this.alert ("الرجاء ادخال كافة المعلومات!");
  }
  else{
       
  var Email = this.state.ORGEmailName;
  var Name = this.state.ChildName;
  var BD = this.state.date;
  var Story = this.state.ChildStory;
  var Image = this.state.Pic;
  var gender = this.state.ChildGender;
  var Money = this.state.ChildMoney;
  this.setState({ChildName:''});
  this.setState({date:''});
  this.setState({ChildStory:''});
  this.setState({ChildGender:''});
  this.setState({ChildMoney:''});
  this.setState({Pic:'https://i.stack.imgur.com/l60Hf.png'});
  
    var APIURL = "http://192.168.1.16/Ekfal/OrgProfileChildren.php";

    var headers = {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    };
          
    var Data ={
     Email: Email,
     Name :Name, 
     BD : BD,
     Story :Story,
     Image :Image,
     gender :gender,
     Money : Money,
    };

    fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((response) => response.text())
  .then((responseJson) => {

// Showing response message coming from server after inserting records.
  this.alert1 (responseJson);
  
}) .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  }}
  ListEmptyView = () => {
    return (

        <Text style={{textAlign: 'center'}}> لا يوجد أطفال موجودون في القائمة</Text>

    );
  }
  render() {
    const { modalVisible } = this.state;
    const { modalVisible1 } = this.state;
    const { modalVisibleEkfal } = this.state;
 if (this.state.dataEkfal==''){
   this.getEkfalChild()
 }
    if (this.state.data==""&&modalVisible==false){
      console.log("sdfghj")
      this.GetInfo();}
      if ( this.state.Loading) {
      
        return(  <Loader>  </Loader> 
       
        
        );
                 
       }
       else{
    return (
      <View style={styles.container}>
    <StatusBar 
          backgroundColor="#fff"
          barStyle="dark-content"
        />
         <View style={styles.whiteSheet}>
           
         <TouchableOpacity style={{marginLeft:'15%',top:5}}   onPress={()=>  {this.setModalVisible(!modalVisible)}}>
         
         <Icon name="plus-circle"  size={28} style={{marginLeft:-35}}/> 
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:9,top:5}}   onPress={()=>  {this.setModalVisibleEkfal(!modalVisibleEkfal)}}>
<Icon name='account-heart' size={28} ></Icon>
</TouchableOpacity>
          <Text style={{marginLeft:120,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black'
    ,top:5,
    paddingBottom: 0,}}>أطفال الجمعية</Text>

         
         </View>         
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
         <View style={styles.container1}>

<View style={[styles.whiteSheet2,{flexDirection:'row-reverse'}]}>
<TouchableOpacity style={{marginRight:'6%'}} onPress={()=> {this.setModalVisible(!modalVisible);this.GetInfo()}}>
      <Icon name="close" color="black" size={30} style={{marginLeft:5}}/>
    </TouchableOpacity>
    <Text style={styles.title4}>إضافة طفل</Text>
    
    </View>
    
  <View style={styles.centerContent2}>
  
    <TouchableHighlight
      onPress={() => this.uploadImage()}
      underlayColor="rgba(0,0,0,0)">
         <Avatar.Image
         size={150}
        source={{uri:  this.state.Pic}}
        />
         
       
      </TouchableHighlight>
   </View>
  
   <SafeAreaView style={styles.form2}>
          
          <ScrollView style={{height:280}}>
           
          <TextInput
          style={styles.input2}
          placeholder="الإسم
          &#xf007;"
          autoCapitalize="none"
          keyboardType="default"
          value={this.state.ChildName}
          textContentType="givenName"
          onChangeText={ChildName=>this.setState({ChildName})}
          />
          <Dropdown
            style={styles.dropdown2}
            containerStyle={styles.shadow2}
            data={this.state.data1}
            labelField="label"
            valueField="value"
            label="Dropdown"
            value={this.state.ChildGender}
            placeholder=" الجنس"
            maxHeight={120}
            onChange={(ChildGender)=> {
            //setDropdown(item.value);
              this.setState({ChildGender:ChildGender.value})
                console.log('selected', ChildGender);
            }}
           // renderItem={item => renderItem(item)}
            textError="Error"
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
        <TextInput
          style={styles.input2}
          placeholder="المبلغ المطلوب 
          &#xf155; "
          autoCapitalize="none"
          keyboardType="numeric"
         
          value={this.state.ChildMoney}
          onChangeText={ChildMoney => this.setState({ChildMoney})}
          />  
           <TextInput
          style={styles.input1}
          placeholder="رسالة الطفل
          &#xf2b9;"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="emailAddress"
          numberOfLines={10}
          multiline={true}
          value={this.state.ChildStory}
           onChangeText={ChildStory=>this.setState({ChildStory})}
          /> 
          </ScrollView>
          <TouchableOpacity style={styles.button1} onPress={this.InsertRecord}>
           <Text style={{fontWeight:'bold', color:'#fff', fontSize:18}}> إضافة</Text>
         </TouchableOpacity>
         
      </SafeAreaView>

</View>
</Modal>
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

  
        <View style={styles.whiteSheet2}>
         <TouchableOpacity onPress={()=> {this.InsertRecord1();this.setModalVisible1(!modalVisible1)}}>
          <Icon name="check" color="#924c9e" size={34} style={{marginLeft:5}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft:270}} onPress={()=> {this.setModalVisible1(!modalVisible1)}}>
          <Icon name="close" color="black" size={34} style={{marginLeft:5}}/>
        </TouchableOpacity>
        <Text style={styles.title}>تعديل طفل</Text>
        </View>
      <View style={styles.centerContent2}>

        <TouchableOpacity
          onPress={() => this.uploadImage()}
          underlayColor="rgba(0,0,0,0)">
             <Avatar.Image
             size={150}
            source={{uri:  this.state.Pic}}
            />
            <Text style={{color:"#924c9e",fontSize:20,alignItems:'center',top:12}}>تغيير الصورة الشخصية</Text> 
           
          </TouchableOpacity>
       </View>

       <SafeAreaView style={styles.form2}>
              
              <ScrollView style={{height:350,bottom:14}}>
             
              <TextInput
              style={styles.input2}
              placeholder="الإسم
              &#xf007;"
              autoCapitalize="none"
              keyboardType="default"
              value={this.state.ChildName} 
              textContentType="givenName"
              onChangeText={ChildName=>this.setState({ChildName})}
             
              />
              <Dropdown
                style={styles.dropdown2}
                containerStyle={styles.shadow2}
                data={this.state.data1}
                labelField="label"
                valueField="value"
                label="Dropdown"
                value={this.state.ChildGender}
                placeholder=" الجنس"
                maxHeight={120}
                onChange={(ChildGender)=> {
                //setDropdown(item.value);
                  this.setState({ChildGender:ChildGender.value})
                    console.log('selected', ChildGender);
                }}
               // renderItem={item => renderItem(item)}
                textError="Error"
            />
              <DatePicker
          style={{backgroundColor:"#F6F7FB", height:58,marginBottom:20,fontSize:16, borderRadius:10,padding:12,
          textAlign:'right',width:308}}
          date={this.state.ChildBD}
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
            <TextInput
              style={styles.input2}
              placeholder="المبلغ المطلوب 
              &#xf155; "
              autoCapitalize="none"
              keyboardType="numeric"
             
              value={this.state.ChildMoney}
              onChangeText={ChildMoney => this.setState({ChildMoney})}
              />  
               <TextInput
              style={styles.input1}
              placeholder="رسالة الطفل
              &#xf2b9;"
              autoCapitalize="none"
              keyboardType="default"
              textContentType="emailAddress"
              numberOfLines={10}
              multiline={true}
              value={this.state.ChildStory}
               onChangeText={ChildStory=>this.setState({ChildStory})}
              /> 
              </ScrollView>
             
             
          </SafeAreaView>

    </View>
</Modal>
<Modal
         statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={modalVisibleEkfal}
          onRequestClose={() => {
             this.setModalVisible2(!modalVisibleEkfal);
          }}
          coverScreen={false}
        >
         <View style={styles.container1}>
         <View style={stylesfollower.whiteSheet1}>
         <TouchableOpacity style={{marginLeft:310}} onPress={()=> {this.setModalVisibleEkfal(!modalVisibleEkfal)}}>
         <Icon name="arrow-right" color="black" size={34} style={{marginLeft:5}}/>
         </TouchableOpacity>
         <Text style={{right:"450%",fontSize:25,fontWeight:'bold',color:'black',paddingBottom:0,}}>الأطفال المكفولين</Text>
         </View>
            <FlatList
              style={stylesfollower.root}
              data={this.state.dataEkfal}
              ItemSeparatorComponent={() => {
                return (
                  <View style={stylesfollower.separator} />
                )
              }}
              keyExtractor={(item) => {
                return item.id;
              }}
              renderItem={({ item }) => {
                var f=false;
                return (
                  <View>
                  <View style={stylesfollower.container}>
                    <Image source={{ uri: item.ChildImage }} style={stylesfollower.avatar} />
                    <View style={stylesfollower.content}>

                      <View style={stylesfollower.text}>
                      <Text style={stylesfollower.name}>{item.ChildGender =="female"? " الطفلة ":" الطفل " }{item.ChildName} </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={{  height: 80,top: 20,left:-8, width: 90, }} 
                    onPress={()=>{this.setState({ff:!this.state.ff});this.setState({idff:item.id})}}>
                    <Icon name='arrow-down-drop-circle' size={30}></Icon>
                    </TouchableOpacity>
                  </View>
                   {this.state.ff==true && this.state.idff==item.id?(
                      <View style={{  top: -18,right:40, width: 120, }}>
                          <View style={{borderBottomColor: "#787878", borderBottomWidth: 1, width: 440, flexDirection: 'row-reverse',}}>
                              
                          <TouchableOpacity style={{ alignItems: "center" ,marginLeft:30,marginRight:125}} onPress={() => { this.setState({ flag: '1' }) }}>
                            <View style={{ borderRadius: 50, borderWidth: 1, width: 45, height: 45, justifyContent: "center", alignItems: "center", borderColor: "#787878" }}>
                              <Icon name='information-variant' size={28} color="black" ></Icon>
                            </View>
                            <Text>عام</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{ alignItems: "center", marginLeft: 30, marginRight: 6 }} onPress={() => { this.setState({ flag: '2' }) }}>
                            <View style={{ borderRadius: 50, borderWidth: 1, width: 45, height: 45, justifyContent: "center", alignItems: "center", borderColor: "#787878" }}>
                              <Icon2 name='paypal' size={20} color="black" ></Icon2>
                            </View>
                            <Text>فواتير</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{ alignItems: "center", marginLeft: 20, marginRight: 6 }} onPress={() => { this.GetInfoUser(item.userEkfal); this.setState({ flag: '3' }) }}>
                            <View style={{ borderRadius: 50, borderWidth: 1, width: 45, height: 45, justifyContent: "center", alignItems: "center", borderColor: "#787878" }}>
                              <Icon name='account-heart' size={30} color="black" ></Icon>
                            </View>
                            <Text>الكافل</Text>
                          </TouchableOpacity>
                          
                            </View>
                            {this.state.flag == '2' ? (
                            <View style={{ flexDirection: "row-reverse",top:5, left: 75,marginBottom:20, width: 290, borderWidth: 1, borderColor: "#e3e3e3" }}>
                              <DataTable
                                data={item.arr} // list of objects
                                colNames={['المبلغ', 'تاريخ الدفع', 'الرقم']} //List of Strings
                                noOfPages={item.ekfalTimes / 3 < 1 ? (1) : (item.ekfalTimes / 3)} //number
                                backgroundColor={'white'} //Table Background Color
                                doSort={false}
                              />
                            </View>
                          ) : null}
                        {this.state.flag == '1' ? (
                            <View style={{ top:5, left: 75,marginBottom:20, width: 290, borderWidth: 1, borderColor: "#e3e3e3" }}>
                            <View style={{ marginBottom: 10 }}>
                              <Text>تمت كفالة {item.ChildGender == "female" ? "الطفلة" : "الطفل "} {item.ChildName} شهريا بقيمة {this.convertstr(item.ChildMoney)} شيكل</Text>
                              <Text style={{ color: "#787878" }}> معلومات {item.ChildGender == "female" ? "الطفلة" : "الطفل "}: </Text></View>

                            <View style={styles.row}>
                              <Icon2 name="user" color="black" size={20} style={{ right: -5 }} />
                              <Text style={{ color: "black", marginLeft: 23, marginRight: 8 }}> {item.ChildName}</Text>
                            </View>
                            <View style={styles.row}>
                              <Icon name="cake-variant" color="black" size={20} />
                              <Text style={{ color: "black", marginLeft: 23 }}>
                                {this.convertstr(item.ChildBD.split('/')[2])}/
                                {this.convertstr(item.ChildBD.split('/')[1])}/
                                {this.convertstr(item.ChildBD.split('/')[0])}
                              </Text>
                            </View>
                            <View style={styles.row}>
                              <Icon name="hand-coin" color="black" size={20} />
                              <Text style={{ color: "black", marginLeft: 23 }}> {this.convertstr(item.ChildMoney)} شيكل</Text>
                            </View>
                            <View style={styles.row}>
                              <Icon name="human-male-female" color="black" size={20} />
                              <Text style={{ color: "black", marginLeft: 23 }}> {item.ChildGender == "female" ? "أنثى" : "ذكر "}</Text>
                            </View>
                            <View style={styles.row}>
                              <Icon name="android-messages" color="black" size={20} />
                              <Text style={{ color: "black", marginLeft: 23 }}> {item.ChildStory}</Text>

                            </View>

                          </View>
                        ) : null} 
                          {this.state.flag=='3' ? (
           
           <View style={{ top:5, left: 75,marginBottom:20, width: 290, borderWidth: 1, borderColor: "#e3e3e3" }}>
          
             <View style={{marginBottom:10}}>
             <Text style={{color:"#787878"}}>معلومات الكافل الذي قام بكفالة الطفل:</Text></View>
             
             <View style={styles.row}>
             <Icon2 name="user" color="black" size={20} style={{ right: -5 }} />
             <Text style={{color:"black", marginLeft: 23,marginRight:8}}> {this.state.kafelState.Message0}</Text>
            </View>
           <View style={styles.row}>
           <Icon name="map-marker-radius" color="black" size={20}/>
             <Text style={{color:"black", marginLeft: 23}}> {this.state.kafelState.Message4}</Text>
             
             </View>
           <View style={styles.row}>
           <Icon name="phone" color="black" size={20}/>
           <Text style={{color:"black", marginLeft: 23}}>{this.convertstr(this.state.kafelState.Message1+'')}</Text>
            </View>
            
             <View style={styles.row}>
             <Icon name="office-building-marker" color="black" size={20}/>
           <Text style={{color:"black", marginLeft: 23}}>{this.state.gender =="female"? "تعمل لدى ":"يعمل لدى " }{this.state.kafelState.Message6} </Text>

           {/* <Text style={{color:"black", marginLeft: 23,fontSize:20}}> {this.state.kafelState.Message6} </Text> */}
             </View>
           <View style={styles.row}>
           <Icon name="email" color="black" size={20}/>
           <Text style={{color:"black", marginLeft: 23}}> {this.state.kafelState.userEmail}</Text>
           </View>
         </View>
        
         ):null}
                        </View>)
                      : (null)
                    } 
                  </View>
                );
              }} />
         </View>
   </Modal>

        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={1}
          ListEmptyComponent={this.ListEmptyView}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <View style={styles.card} >
                <View style={styles.whiteSheet1}>
                  <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.cardHeader} onPress={() => {this.setModalVisible2(!modalVisible1,item)}}>
                  <Image style={styles.icon} source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAApVBMVEX///+AAIB7AHt9AH15AHn//f/++v7CoMKEAISBAIH8+Pz16vX79fvz5vPw4PDOo862draWNZbhxuHp1Om7gLvPqs/37vfBjMGaQZrs2uywa7CpXanRqNHGlcarYqvWtNaSMJLbu9ufS5+OIY6LFYuhUaHo1OjWt9a0fbTiy+K3e7eWNJaxbbHIl8irYKu9hr2jYaOaS5qWQZaSOZLWvdapcamhXKGR5/mVAAAL/0lEQVR4nO1daXviOAwGO6ThCGcJV4FQQqe0tJ22u/3/P23DZRJsh9iW4sw8+37cZ7bxiyTLlnVUKjhwG61Jfzk8YPUUNFyk71hBq/1r9Htdd5Kg0efzcBLYXhoE2svfIXEIpdUr0Pi/Rp+jbc32Co3Q7PSow5NL0iTerm97mbpwV5tYG+XsGEvHG/m2F6uBoBPmoXcEqXafbC9YFZ11fn4HjnTatr1mFawiNX4HZSXdP2Zr9Rfq/A5y9Ja2l54PQ4/o8DuIcfEHiNHt6gnwJMZoYJvALUxCR5/fQYxvtilko183EOBJjC9lPuUsq8YEY4qL8p7KHwD47SluykpxqLuHchRnDdtchFjBSPBAcWqbjAhb803mAmdkmw4PPwIkGEvxwTaha7iPUEZ4gre1TekK92aOngcdt2xzSqEPLMEYzottUkkEIagRniiWKbrxAS/CvZ6WxysOECQYo0SH8BkOQxqVJUDVh95HzyAftqmd8IgjwhheOaJTfTSCVXJvm9wBUzyGVa9pm12MtodHsEo6tunFGGH4wjPK4BPdb0QljWH/YDPAchVHlGCvQTmwXUBD6zFijDN3EsS2mrZxlXQfPrXM8AFXSWM17VkOEO+QlTSmaPfk5mKbYXwRthuTmtSxCdo2xBW2GcZa+mjVEN/wGVYjqx4R815xBrX5aOp+FcHQ5ut+c41P0O4Nqo2/lcYMbb7SPBWw0VRJ1yLDLfapdA+6sMhwVQjDmUWHuCyE4cYiw4dCGI4tJi50/mcIwvD7r2fYsxhR/J/hn89w+NfvNMX4Q5sM0d5GUwxtXvKLOZfaPNMUcreg7/YIViYFEKxSm7cn1NfRM6zegIN1AXEaq1GMYiJRQ4sMsXKF0gytvq91C9hM61Yzowo4mNJXq8kKiNlCjOHOJsFKG51g1bGboVhDzjXZM7Sc8P2CvtV4lpMx0G+IdGyXYKWNLUPruRg17HOb9XyaSheZ4dp6/iXy0wWd2SZYaeJeoMqQYIp7+K6XoPwJ9XWGftvPoMVNGrJ6vz/DxStGsJxpwtDBc/p0XIrKdcSEDGdum9wRCzw1LUfNDN7rBX20Te2EFpbTt5rvlQLSJZH2SlMKjBTcJyXZZ/bA2WtKUpt3AErIzWo+2zVQzjXlOM+cgeAwiP2bYRIYVQmlEiGCEEvXwMUdAwuxXjIRgldelE6ElUptAypEb2KbEA9Qn1iKuz2HHZye0nVpTqRJAMYVy3OpSAMsnGE1dz0LYGc3r3Se4owtDEHzvjRuc9LGee8A6a9ATGMXg/vQI9QbPyBkbULoKY3MroX+gpLDKqgzRngSaHvGFKlZ3W9/fdEj6iHUEBtXrxse1x5SvQ0pRpciQ79Pe0aJCVzVrrMDN8bA6JJBzc6jHf7bZAF+PGobtYg0OswICO63ZnCKBr2EqZEnlHSIJfAdGLWb7RpG1yaSUAp5BE860uxZQ031qS1JfYFX1IZWM1NqHgGW7QEEvCjF17lIUYC0C6kUwW1RQ09N+iUNWUigMEX1I2WGBj2v5vH/fL5RFkbxXX2+xUr3W/c0uQ1LbRG4fEr9vu9pJqy7u0MwmixuSdGZgW43fVWCus+hjenpt7ycQKWKuoOU4kR1N9XsnOC+M2Uhi3P+lFRRIXNVfdWuJ3r1W62k5yWzW1KEzF4JQkWGeje5IEzae4Ki7AAHF6ZU7lyj+Wjv95JUEooqlqLh7SwJZTvUjeP7rykpvjMpim2RbqAYKgcWteMNzV6SorO5YYtgfdCV/aH+PtdMK+osW1HJHRBD5cxhZW8xZwd1PyXFG04DiqF6+ayqx59TKqOY6TSgGOrUJSo9VsxJMss9bYuXSTwCpwHEUCczmqrcLd6OUe0ExbxOA4ahXkRRwVW9nf6+VFHZyChuOAwIw9ZMK06T3xIv92upokptEYJhoEcwf0ws+cIlVVTZAY6YpwP2ezoqelxuL487HqX/vkxRp8L7onk6YH9mMnqNVhc3jfHj6u9LbZE98ST8Il2bhU6Dh1di+LpGqo/DzEV8cOllMlt02BnCZ1KkJi+KtcFLZMrvsAgSdeXKOhJ8QWaLziV2c7JFYtCeIXh4rEPwO6zYkbpGEcEMRWUUj07DoCx8AiO+88KkBGVhWKnTuFCMFVU70aqxeqwC8ssgOJKmeEptkbUraIe60+r2o7dhZ8p1ZRExsYoeQWUU2c/V1ruA+vcRLL94e5BFNa/dRD6KZi/5kx3Y7nIhKPvYrbIVh1EM0lLUT3PcLqrgtTLyI8f9zW9RGUXNEOLgHXJmJSMoU9H7PGPoZYqq4yQGRoczGeQ2+JLrazKK6n2YJgvg7eUIuYq+5KwEIGJFJaFavXS7W0epVZO7iTwqeoRQijRSOo22Rtqj028RNLFBxoanSNVGmg7XOPxiG5RJUK268TKE9kSRKo1rH4yh/R9bmIGbSOOyrRxskYYKl/rmC4KDOALCBhkYxViKZKzwtLyM0Arv5W5CpznMRYrNUCHLxJ85aEXp8sG4O62CMYe9Egb53cSDefKvFFIbrGm39FPO62gusHaYapab0O5fROuKFFd4FpjlJgzSjalSO8naC6IAs1TUpGhThWIbemp6ClI34Rq21aRh3l10BTv3/gpyG5waEsw9/HKOqaEZN/p3Q4L1nAQbuB1YpTbomkrQy0mwtUEmKLPBogimwx3gIFOZDS4MCebdR31ML5hMl7xCbWFW259bgk3c4Y2XdIIrtEwlmNsG9R8680CalOwWtYtWxqgqSkNJiWfNcHPL7wfzRrc0Iav0bejmAJyQW0VlJURQkMVoG6Yqmpsg8tQ/Gop3mZqpBPPPKYduVHIFSVNS19QGc28y6L3kxQVOpieo/CqK12HuvBRhf6QCCcJU1WetRaSkruE1VEFFsTsDi5W0ZUpQJbKNLkJBzwRjFVV5fMG2QlFWS8PYBlUeX/BnqXFKWjNVUbVmKHfYSvrKfXJQoIoWwFCQmTQ3+qQqQXSGgox1ozZhiiqKz5C+cld7rbpo9vci5UomZIaCHKWhSc7t+kmVILoM+aPH5QFGvXhYgyAyQ0EacuucwUt3qvduvX5EyAz56U2sZNhZVUYecQilOdN1lN7oi2IoKOJkp8R9Nbf/T+dj9/P5vfbI7US2UK9cEpehoCb9fN1OnFdrrcCfvN0iqNsyC5WhoISTRUy4OtnsRxNNFcVm6PBXw8sEkOujyTJrJbSnPVIPV0t5yznXYvJPmlldC2ioPzMQkyENuc8F5x4h/FNbRi0xjQyGImIyFBxoWHdevqPnQBrTlIbMrTMUHGhY2lrELVpa8a6UysUDcU6zoLVsg/kKPgAnO5GTnmFfy0+0cDDlOwYyTRQE+gMxQ2LQjOgIvHHignxrVrdP+V22IWxURMbmvcl+sIQoCCMyX8FfG8Wt7MkYoPUq1kxDwWyjJvMVovREQdsCYtY58ow5jp4KIjTMVxBRrIV/4wPrSjZFoSgo4DwfPSUNvK8zoOH6AzY+ERSVRtyrIZuAKevLmtZTiE3mjOAbnqKgt8eE1ecKe/8Ey1RfYuDGeYZJLQIQPquVGTy/y9banTFJJV6TDfCkwGfonD3B5ZcFSukmJZ7W9qNHrr5PNuA9OoEzgwWDfZsXl042zJP4y8X6mh5KK9n4l5xCpucLWl0tk80Ojm0eBvOQipSHPOIMs+x/AXLMuFccOLw3l13PEdsGmaGNg1iGQBwFgdJGOuWDCoV3gPOOOO+iAcRR5CvyvVdQx5Fl+UGhv5H/uvkZ8rejHIlXlJD6bFjAWOf2/Jvf3RQZ8mY4vfEXqUO+n/tFDY+vPX2sJbtAPvDesJU5tJw69KczQdbOa5LxKcPRZSkofxjI/zFxvO7KzjCd4Nfzd33/dqLMkPf3ktwy6lS/5nbHsPjb0e+QKtIUhPMFrYZj4UW/l0aBNCg0gm3neVx3nLxEeYa11+t2SI6z/tiWbNBT0B8+b9b7n56Q7Ec/gQyTN6O9V9g8lEJ4ItTa23/eXn4+v6PqXqhE9MQpYMjsMN42vz76JRiifhNu4LeffnVGz//+fIVrL9Y6BuLwyWy19/2v4TjRv8PSCi8DtVqj0Qj8yWDbXy2Xw+HdL/7fuMO7u7uhX/R8rv8A6XvfM8dbO70AAAAASUVORK5CYII="}}/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.cardHeader,{marginLeft:"63%"}]} onPress={() => {this.deletehandler(item)}}>
                  <Image style={styles.icon1} source={{uri:"data:image/png;base64,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"}}/>
                </TouchableOpacity>
                </View>
                <Image style={styles.userImage} source={{uri:item.ChildImage}}/>
             
                </View>
                <View style={styles.cardFooter}>
                  {/* <View style={{ justifyContent:"center"}}> */}
                  <View>
                   <Text style={styles.name}>{item.ChildGender =="female"? "الطفلة ":"الطفل " }{item.ChildName}</Text>
                   <View style={styles.infoBox}></View>
                   <View style={{ flexDirection: 'column',alignItems: 'flex-end',right:18}}>
                   <Text style={styles.position}>{item.ChildBD} <Icon name="cake-variant" color="#777777" size={20}/></Text>
                   <Text style={[styles.position]}>{item.ChildMoney} <Icon name="hand-coin" color="#777777" size={20}/></Text>
                    <View style={{flexDirection:'row-reverse',width:200}}>
                    <Icon name="android-messages" color="#777777" size={20}/> 
                    <Text style={[styles.position]}>"{item.ChildStory}" </Text>
                    </View>
                   </View>
                    
                
                  </View>
                </View>
              </View>
            )
          }}/>
           
      </View>
      
    );
  }
}
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:15,
    backgroundColor:'white'
    
  },
  list: {
    paddingHorizontal: 5,
    // backgroundColor:"#E6E6E6",
    backgroundColor:"white"
  },
  listContainer:{
   alignItems:'center'
  },
  container1:{
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    
    
    },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor:"white",
    flexBasis: '46%',
    marginHorizontal: 5,
    borderWidth:1,
    borderColor:"#e7e1eb",
    width:290,
   
  },
  button1:{
    backgroundColor:"#924c9e",
     height:58,
     borderRadius:10,
     justifyContent:'center',
     alignItems:'center',
     marginTop:40,
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
  title2:{
    right:"480%",
    fontSize:30,
    fontWeight:'bold',
    color:'#924c9e',
    
    paddingBottom:0,
      
  },
  title:{
    right:"350%",
    fontSize:25,
    fontWeight:'bold',
    color:'black',
    
    paddingBottom:0,
      
  },
  title4:{
    left:"20%",
    fontSize:25,
    fontWeight:'bold',
    color:'black',
    
    paddingBottom:0,
      
  },
  form2:{
    flex:1,
    position:"absolute",
    bottom:80,
    width: "85%",
     
  },
  whiteSheet2:{
    width: "100%",
    height: "6%",
    top:-470,
    flexDirection: 'row',
    marginBottom:60
    
},
centerContent2: {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop:-500,
  
  

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
input2:{
  backgroundColor:"#F6F7FB",
  height:58,
  marginBottom:20,
  fontSize:16,
  borderRadius:10,
  padding:12,
  textAlign:'right',
  fontFamily: 'FontAwesome'

},
input1:{
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
  infoBox: {
    width: 290,
    left:10,
    top:-20,
    borderTopColor: "#e7e1eb",
    borderTopWidth: 1,
    flexDirection: 'row',
   
  },
  whiteSheet:{
    width: "100%",
    height: "8%",
    top:-15,
    marginBottom:-15,
    backgroundColor:"white",
    flexDirection: 'row',
   // borderBottomWidth:1,
   // borderBottomColor:"#e0e0e0"
},
whiteSheet1:{
  borderTopLeftRadius:115,
  borderEndColor:"#924c9e",
  borderColor:"#924c9e",
  backgroundColor:"#fff",
  
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
    height: 150,
    width: 200,
    borderRadius:150,
    alignSelf:'center',
    borderColor:"#924c9e",
    borderWidth:2,
    top:-20,
  },
  name:{
    fontSize:32,
    flex:1,
    top:-32,
    alignSelf:'center',
    color:"#924c9e",
    //fontWeight:'bold'
  },
  position:{
    fontSize:14,
    //flex:1,
//right:-200,

    //alignSelf:'center',
    color:"#696969",
    //flexDirection: 'row-reverse',
  },
  followButton: {
    marginTop:10,
    height:35,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:100,
    backgroundColor: "#00BFFF",
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  icon:{
    height: 21,
    width: 21.5, 
  },
  icon1:{
    height: 20,
    width: 19.5, 
  },
  row: {
    flexDirection: 'row-reverse',
    
    
  },
});
const stylesfollower = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
    //left:100
    width:350,
    height:380
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
    padding: 8,
    flexDirection: 'row-reverse',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    // alignItems: 'flex-start'
  },
  avatar: {
    width:70,
    height:70,
    borderRadius:35,
  },
  text: {
    //marginBottom: 5,
    // right:-30,
     alignItems:'flex-start',
    flexWrap:'wrap',
  
  },
  content: {
    flex: 1,
    alignItems:'flex-end',
    marginLeft: 0,
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
