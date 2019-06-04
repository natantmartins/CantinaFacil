import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity , Image,StatusBar,ListView,ScrollView} from 'react-native';
import {createStackNavigator, createAppContainer, HeaderStyleInterpolator} from'react-navigation';
console.disableYellowBox = true;
import Orientation from 'react-native-orientation';
import SQLite from 'react-native-sqlite-storage';
import Timeline from 'react-native-timeline-listview'
import "numeral/locales/pt-br";

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


const Numeral = require('numeral');
Numeral.locale('pt-br');
import {
  HideNavigationBar,
  ShowNavigationBar
} from 'react-native-navigation-bar-color';

import Accordion from 'react-native-collapsible/Accordion';
import Collapsible from 'react-native-collapsible';

import { gestureHandlerRootHOC, FlatList } from 'react-native-gesture-handler';
import { whileStatement } from '@babel/types';

const produtos =[{id: 35, nome: 'Cheeseburguer', categoria: 'Salgados', preco: '6', enabled:true},
{id: 36, nome: 'Hamburguer', categoria: 'Salgados', preco: '5', enabled:true},
{id: 37, nome: 'Mini pizza', categoria: 'Salgados', preco: '5', enabled:true},
{id: 38, nome: 'Pão de queijo', categoria: 'Salgados', preco: '2.5', enabled:true},
{id: 39, nome: 'Pipoca Salgada', categoria: 'Salgados', preco: '3', enabled:true},
{id: 40, nome: 'Queijo quente', categoria: 'Salgados', preco: '5', enabled:true},
{id: 41, nome: 'Salgados', categoria: 'Salgados', preco: '4.5', enabled:true},
]
const produtosBebidas =[{id: 8, nome: 'guaravita', categoria: 'Bebidas', preco: '1.5', enabled:true},
{id: 9, nome: 'H20!', categoria: 'Bebidas', preco: '4.5', enabled:true},
{id: 10, nome: 'Mate Leão', categoria: 'Bebidas', preco: '4', enabled:true},
{id: 11, nome: 'Refrigerante garrafinha', categoria: 'Bebidas', preco: '3', enabled:true},
{id: 12, nome: 'Refrigerante Lata', categoria: 'Bebidas', preco: '4.5', enabled:true},
{id: 13, nome: 'suco', categoria: 'Bebidas', preco: '2', enabled:true},
{id: 14, nome: 'Toddynho', categoria: 'Bebidas', preco: '2.5', enabled:true},
]
const produtosBiscoitos =[{id: 15, nome: 'Look', categoria: 'Biscoitos', preco: '2.5', enabled:true},
{id: 16, nome: 'Polvilho', categoria: 'Biscoitos', preco: '1.5', enabled:true},
{id: 17, nome: 'Salgadinho', categoria: 'Biscoitos', preco: '4', enabled:true},
{id: 18, nome: 'Torcida', categoria: 'Biscoitos', preco: '2', enabled:true},
{id: 19, nome: 'Trakinas', categoria: 'Biscoitos', preco: '2.5', enabled:true},
]
const produtosChocolates =[{id: 20, nome: 'Batom', categoria: 'Chocolates', preco: '1', enabled:true},
{id: 21, nome: 'Bombom', categoria: 'Chocolates', preco: '1', enabled:true},
{id: 22, nome: 'Chokito', categoria: 'Chocolates', preco: '2', enabled:true},
{id: 23, nome: 'Diamante Negro', categoria: 'Chocolates', preco: '2', enabled:true},
{id: 24, nome: 'Galak', categoria: 'Chocolates', preco: '2', enabled:true},
{id: 25, nome: 'Maxi Chocolate', categoria: 'Chocolates', preco: '0.6', enabled:true},
{id: 26, nome: 'Trento', categoria: 'Chocolates', preco: '1.5', enabled:true},
{id: 27, nome: 'Trio Light', categoria: 'Chocolates', preco: '1.5', enabled:true},
]
const produtosDoces =[{id: 28, nome: 'Açai', categoria: 'Doces', preco: '3.5', enabled:true},
{id: 29, nome: 'Amendoim', categoria: 'Doces', preco: '1', enabled:true},
{id: 30, nome: 'Bananada', categoria: 'Doces', preco: '0.5', enabled:true},
{id: 31, nome: 'Paçoca', categoria: 'Doces', preco: '0.5', enabled:true},
{id: 32, nome: 'Pingo de leite', categoria: 'Doces', preco: '0.5', enabled:true},
{id: 33, nome: 'Pipoca Doce', categoria: 'Doces', preco: '4', enabled:true},
{id: 34, nome: 'Torrone', categoria: 'Doces', preco: '1', enabled:true},
]
const produtosBalas =[
{id: 0, nome: 'Bala', categoria: 'Balas', preco: '0.2', enabled:true},
{id: 1, nome: 'Bala Garoto menta', categoria: 'Balas', preco: '1', enabled:true},
{id: 2, nome: 'Fini', categoria: 'Balas', preco: '1', enabled:true},
{id: 3, nome: 'Halls', categoria: 'Balas', preco: '1.3', enabled:true},
{id: 4, nome: 'Jujuba', categoria: 'Balas', preco: '0.5', enabled:true},
{id: 5, nome: 'Mentos', categoria: 'Balas', preco: '1.5', enabled:true},
{id: 6, nome: 'Pirulito', categoria: 'Balas', preco: '0.5', enabled:true},
{id: 7, nome: 'Tic Tac', categoria: 'Balas', preco: '2', enabled:true},
]
function roundN(num,n){
  return parseFloat(Math.round(num * Math.pow(10, n)) /Math.pow(10,n)).toFixed(n);
}

var cart=[];
var totalBruto=0;
var fichas=[
  {
    id: 1,
    cor: "Cinza",
    valor:4.5,
  },{
    id: 2,
    cor:"Laranja",
    valor:2.5,
  },{
    id: 3,
    cor:"Amarelo",
    valor:1.5,
  },{
    id: 4,
    cor:"Azul",
    valor:1,
  },{
    id: 5,
    cor:"Ciano",
    valor:0.5,
  },
  {
    id: 6,
    cor:"Verde",
    valor:0.15,
  },
];

var textFichas=''
var fichasToBuy=[]



//var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'teste01', createFromLocation:'~cantinafacil.db'})



valorFichas=0;
class HomeScreen extends React.Component{



  static navigationOptions={
    header: null
  }

  componentDidMount() {
    /*
    db.transaction((tx)=>{
      tx.executeSql('delete from vendas')
      tx.executeSql('delete from vendas_fichas')
      tx.executeSql('delete from vendas_produtos')
    })*/
    
    StatusBar.setHidden(true);
    //HideNavigationBar();
    Orientation.lockToLandscape();
  }

  render() {
    return (
      <View style={styles.containerHome}>
          <Image style={styles.logoHome}
            source={require('./src/images/Logo.png')}>
          </Image>
          <TouchableOpacity  style={styles.botaoHome}
            onPress={()=>this.props.navigation.navigate('Produtos')}
          ><Text style={styles.botaoHomeText}>VENDER</Text></TouchableOpacity >
          <TouchableOpacity  style={styles.botaoHome}
            onPress={()=>this.props.navigation.navigate('Calendario')}
          ><Text style={styles.botaoHomeText}>HISTÓRICO</Text></TouchableOpacity >
      </View>
    );
  }
}

//const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

// mover pra fora da pagina e substituir o ds
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
fichasToBuy=[];



class ProdutosScreen extends React.Component{
  constructor(props) {
    super(props);
    this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.setState({is_updated:true});
        //this.zerarTudo()
        this.setState({
          cartDataSource: ds.cloneWithRows(cart)
        });
        
    this.calculos()
      }
);
    this.state = {
      depositoDataSource: ds.cloneWithRows(produtos),
      balasDataSource: ds.cloneWithRows(produtosBalas),
      docesDataSource: ds.cloneWithRows(produtosDoces),
      chocolatesDataSource: ds.cloneWithRows(produtosChocolates),
      bebidasDataSource: ds.cloneWithRows(produtosBebidas),
      biscoitosDataSource: ds.cloneWithRows(produtosBiscoitos),
      colapsadoSalgados: false,
      colapsadoBalas: false,
      colapsadoDoces: false,
      colapsadoChocolates: false,
      colapsadoBebidas: false,
      colapsadoBiscoitos: false,
      cartDataSource: ds.cloneWithRows([]),
      fichasDataSource: ds.cloneWithRows([])
    };
    this.renderRow= this.renderRow.bind(this);
    this.docesRenderRow= this.renderRow.bind(this);
    this.biscoitosRenderRow= this.renderRow.bind(this);
    this.bebidasRenderRow= this.renderRow.bind(this);
    this.balasRenderRow= this.renderRow.bind(this);
    this.chocolatesRenderRow= this.renderRow.bind(this);
    this.cartRenderRow = this.cartRenderRow.bind(this)
    this.adicionarCart = this.adicionarCart.bind(this)
    this.removerCart = this.removerCart.bind(this)
  }
  removerCart(index){
    if(cart[index].qntd>1){
      
      cart[index].qntd=cart[index].qntd-1
      cart[index].total=cart[index].qntd*cart[index].preco
      
    
    this.setState({
      //substituir aqui por ds
      cartDataSource: ds.cloneWithRows(cart)
    });
    this.calculos()
    }else{
    if (index > -1) {
      cart.splice(index, 1);
    }
    
    this.setState({
      //substituir aqui por ds
      cartDataSource: ds.cloneWithRows(cart)
    });
    this.calculos()
  }
  }

  static navigationOptions={
    header: null
  }
  adicionarCart(ide){
    var igual = false
    const data={
      id: ide.id,
      nome: ide.nome,
      preco: ide.preco,
      qntd: 1,
      total:ide.preco,
    }

    if(cart.length>0){
      for(i=0;i<cart.length;i++){
        if(cart[i].id==data.id){
          //alert(i+"é igual altera a quantidade"+cart[i].qntd)
          igual=true
          cart[i].qntd=cart[i].qntd+1
          cart[i].total=(cart[i].qntd*cart[i].preco).toFixed(2)
          break
        }else{
          //alert("NÃO é igual só adiciona")
          igual=false
        }
      }
    }else{
    }
    if(igual==false){
      cart.push(data);

    }
    this.setState({
      cartDataSource: ds.cloneWithRows(cart)
    });
    this.calculos()
  }
  calcularFichas(preBruto){
    //Fazendo as fichas
    valorAtual=preBruto;
    textFichas='';
    fichasToBuy=[];
    j=0;
    valorFichas=0;
    totalfichas=0;
    while(j<fichas.length){
      if(valorAtual>=fichas[j].valor){
        qntdFichas=Math.floor(valorAtual/fichas[j].valor)
        valorAtual=parseFloat(valorAtual-(fichas[j].valor*qntdFichas)).toFixed(2)
        
        totalfichas=(totalfichas+(fichas[j].valor*qntdFichas))
        valorFichas=(preBruto-totalfichas).toFixed(2)
        

        const data={
          id:fichas[j].id,
          cor:fichas[j].cor,
          qntd:qntdFichas,
          valor:fichas[j].valor,
          qntdfichas:fichas[j].valor
        }
        fichasToBuy.push(data)
        
      }else{
        j++
      }
    }
  }
  calculos(){
    if(cart.length==0){
      this.setState({
        fichasDataSource: ds.cloneWithRows([])
      });
    }
    //Fazendo e mostrando o total
    totalBruto=0
    for(i=0;i<cart.length;i++){
      totalBruto=(parseFloat(totalBruto)+parseFloat(cart[i].total)).toFixed(2)
    }

    this.calcularFichas(totalBruto)
    valortmp=totalBruto
    count=0
    if(parseFloat(valorFichas)>0.08){
      temVerde=false
        for(i=0;i<fichasToBuy.length;i++){
          if(fichasToBuy[i].id==6){
            temVerde=true
            valorFichas='5 centavos a mais :)'
            fichasToBuy[i].qntd=fichasToBuy[i].qntd+1
            
            this.setState({
              fichasDataSource: ds.cloneWithRows(fichasToBuy)
            });
          }else{
            this.setState({
              fichasDataSource: ds.cloneWithRows(fichasToBuy)
            });
          }

        }

        if(temVerde){

        }else{
          valorFichas='5 centavos a mais :)'
          const data={
            id:6,
            cor:"Verde",
            qntd:1,
            valor:0.15,
            qntdfichas:0.15
          }
          fichasToBuy.push(data)
          this.setState({
            fichasDataSource: ds.cloneWithRows(fichasToBuy)
          });
        }

    
  }else{
    this.setState({
      fichasDataSource: ds.cloneWithRows(fichasToBuy)
    });
  }
  }
  renderRow(produtossalga) {
    
    return(
      <TouchableOpacity
      style={produtossalga.enabled ? styles.botaoProduto : styles.botaoProdutoDesabilitado }
        onPress={()=>{
          if(produtossalga.enabled){
            this.adicionarCart(produtossalga);
            //alert("adiciona ne")
          }else{
            //alert("nao adiciona")
          }
      }}
      onLongPress={()=>{
        produtossalga.enabled ? produtossalga.enabled=false: produtossalga.enabled=true

        // preciso atualizar a lista pra mostrar a cor atualizada
        this.setState({
          depositoDataSource: ds.cloneWithRows(produtos),
          balasDataSource: ds.cloneWithRows(produtosBalas),
          docesDataSource: ds.cloneWithRows(produtosDoces),
          chocolatesDataSource: ds.cloneWithRows(produtosChocolates),
          bebidasDataSource: ds.cloneWithRows(produtosBebidas),
          biscoitosDataSource: ds.cloneWithRows(produtosBiscoitos),
        });
      }}
      
      
      >
        <Text style={{ fontSize: 15, color: 'white' ,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1}}>{produtossalga.nome}</Text>
    
    <Text style={{ fontSize: 13, color: 'white' ,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1}}>{Numeral(parseFloat(produtossalga.preco)).format("$ 0.00")}</Text>
      </TouchableOpacity>
    )
  }
  cartRenderRow(caart) {
    return(
      <TouchableOpacity style={styles.cartItem}
      onPress={()=>{
        const data={
          id: caart,
        }
      this.removerCart(cart.indexOf(data.id))
      }}>
        <Text style={{ fontSize: 15, color: 'black', height:"100%",textAlignVertical: 'center', paddingRight:8}}>{caart.qntd}x</Text> 
        <Text style={{ fontSize: 15, color: 'black', height:"100%"}}>{caart.nome}{"\n"}{Numeral(parseFloat(caart.preco)).format("$ 0.00")}</Text>
        <Text style={{ fontSize: 15, color: 'black', height:"100%", textAlign: 'center',position:"absolute",right:5}}>Total:{"\n"}{Numeral(parseFloat(caart.total)).format("$ 0.00")}</Text> 
      </TouchableOpacity>
    )

  }
  zerarTudo(){
    cart=[]
    this.setState({
      cartDataSource: ds.cloneWithRows(cart)
    });
    this.calculos()




  }
  fichasRenderRow(fichasbuy) {
    if(fichasbuy.cor=="Amarelo"){
    return(
      <Text style={{fontSize: 15, color: "yellow",textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 0.5}}><Text style={{fontSize: 25,fontWeight:"bold",
      }}>{fichasbuy.qntd}<Text style={{fontSize: 25}}>x - </Text></Text>{fichasbuy.cor} - {Numeral(parseFloat(fichasbuy.qntdfichas)).format("$ 0.00")}</Text>
    )
  }else if(fichasbuy.cor=="Verde"){
    return(
      <Text style={{fontSize: 15, color: "green",textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 0.5}}><Text style={{fontSize: 25,fontWeight:"bold",
      }}>{fichasbuy.qntd}<Text style={{fontSize: 25}}>x - </Text></Text>{fichasbuy.cor} - {Numeral(parseFloat(fichasbuy.qntdfichas)).format("$ 0.00")}</Text>
    )
  }else if(fichasbuy.cor=="Ciano"){
    return(
      <Text style={{fontSize: 15, color: "#33ccff",textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 0.5}}><Text style={{fontSize: 25, fontWeight:"bold",
      }}>{fichasbuy.qntd}<Text style={{fontSize: 25}}>x - </Text></Text>{fichasbuy.cor} - {Numeral(parseFloat(fichasbuy.qntdfichas)).format("$ 0.00")}</Text>
    )
  }else if(fichasbuy.cor=="Laranja"){
    return(
      <Text style={{fontSize: 15,color: "orange",textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 0.5}}><Text style={{fontSize: 25, fontWeight:"bold",
      }}>{fichasbuy.qntd}<Text style={{fontSize: 25}}>x - </Text></Text>{fichasbuy.cor} - {Numeral(parseFloat(fichasbuy.qntdfichas)).format("$ 0.00")}</Text>
    )
  }else if(fichasbuy.cor=="Azul"){
    return(
      <Text style={{fontSize: 15, color: "blue",textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 0.5}}><Text style={{fontSize: 25,fontWeight:"bold",
      }}>{fichasbuy.qntd}<Text style={{fontSize: 25}}>x - </Text></Text>{fichasbuy.cor} - {Numeral(parseFloat(fichasbuy.qntdfichas)).format("$ 0.00")}</Text>
    )
  }else{
    return(
      <Text style={{fontSize: 15, color:"#808080",textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 0.5}}><Text style={{fontSize: 25,fontWeight:"bold",
        }}>{fichasbuy.qntd}<Text style={{fontSize: 25}}>x - </Text></Text>{fichasbuy.cor} - {Numeral(parseFloat(fichasbuy.qntdfichas)).format("$ 0.00")}</Text>
    )
  }
  }
  componentDidMount(){
    j=-1
    StatusBar.setHidden(true);
    //HideNavigationBar();
    Orientation.lockToLandscape();
    
  }
  
  render() {
    
    return (
      <View style={styles.containerProdutos}>
        <View style={styles.containerProdutos1}>
        <ScrollView style={{width:"100%"}}>


        <View style={styles.menuProdutos}>
          <Text style={styles.textMenuProdutos}>Salgados</Text>
          
          </View>
        <Collapsible style={styles.collapsibleProdutos} collapsed={this.state.colapsadoSalgados}>

        <ListView contentContainerStyle={styles.listViewProdutos}
        initialListSize ={50}
          dataSource={this.state.depositoDataSource}
          renderRow={this.renderRow}
        />
        </Collapsible>

        <View style={styles.menuProdutos}>
          <Text style={styles.textMenuProdutos}>Bebidas</Text>
          
          </View>
        <Collapsible style={styles.collapsibleProdutos} collapsed={this.state.colapsadoBebidas}>

        <ListView contentContainerStyle={styles.listViewProdutos}
        initialListSize ={50}
          dataSource={this.state.bebidasDataSource}
          renderRow={this.bebidasRenderRow}
        />
        </Collapsible>

        <View style={styles.menuProdutos}>
          <Text style={styles.textMenuProdutos}>Biscoitos</Text>
          
          </View>
        <Collapsible style={styles.collapsibleProdutos} collapsed={this.state.colapsadoBiscoitos}>

        <ListView contentContainerStyle={styles.listViewProdutos}
        initialListSize ={50}
          dataSource={this.state.biscoitosDataSource}
          renderRow={this.biscoitosRenderRow}
        />
        </Collapsible>

        <View style={styles.menuProdutos}>
          <Text style={styles.textMenuProdutos}>Chocolates</Text>
          
          </View>
        <Collapsible style={styles.collapsibleProdutos} collapsed={this.state.colapsadoChocolates}>

        <ListView contentContainerStyle={styles.listViewProdutos}
        initialListSize ={50}
          dataSource={this.state.chocolatesDataSource}
          renderRow={this.chocolatesRenderRow}
        />
        </Collapsible>

        <View style={styles.menuProdutos}>
          <Text style={styles.textMenuProdutos}>Balas</Text>
          
          </View>
        <Collapsible style={styles.collapsibleProdutos} collapsed={this.state.colapsadoDoces}>

        <ListView contentContainerStyle={styles.listViewProdutos}
        initialListSize ={50}
          dataSource={this.state.balasDataSource}
          renderRow={this.docesRenderRow}
        />
        </Collapsible>

        <View style={styles.menuProdutos}>
          <Text style={styles.textMenuProdutos}>Doces</Text>
          
          </View>
        <Collapsible style={styles.collapsibleProdutos} collapsed={this.state.colapsadoDoces}>

        <ListView contentContainerStyle={styles.listViewProdutos}
        initialListSize ={50}
          dataSource={this.state.docesDataSource}
          renderRow={this.balasRenderRow}
        />
        </Collapsible>
        
        </ScrollView>
        </View>
          
          <View style={styles.containerProdutos2}>
          <View style={styles.containerProdutos2A1}>
            
          <Text>Resumo do Pedido</Text>
            <ListView contentContainerStyle={styles.listViewProdutos}
        initialListSize ={50}
          dataSource={this.state.cartDataSource}
          renderRow={this.cartRenderRow}
        />
        
          </View>
          <View style={styles.containerProdutos2A2}>

            
          <Text style={{ fontSize: 25, color: 'black' }}>
            <Text style={{color: 'gray' }}>TOTAL: </Text> 
            {Numeral(parseFloat(totalBruto)).format("$ 0.00")}
          </Text>
          <Text style={{ fontSize: 10, color: 'black' }}>FICHAS: {valorFichas}</Text>
            <ListView
              initialListSize ={50}
              dataSource={this.state.fichasDataSource}
              renderRow={this.fichasRenderRow}
              />
              <View style={styles.areaBotoes}>
            <TouchableOpacity style={styles.botaoConcluir} 
            onPress={()=>this.props.navigation.navigate('Troco')}
          ><Text style={{color: "black"}}>CONCLUIR</Text></TouchableOpacity >
            <TouchableOpacity style={styles.botaoSair} 
            onPress={()=>{this.zerarTudo()}}
          ><Text style={{color: "black"}}>ZERAR</Text></TouchableOpacity >
          </View>
          </View>
          </View>
      </View>
    );
  }
}
//---------------------------------------------------------------------------------TROCO-----------------------------------

class TrocoScreen extends React.Component{

  static navigationOptions={
    header: null
  }
  constructor(){
    super()
    this.state={
      totalCalculadora: 0.00,
      ultimoSomado:0,
      troco:0,
      fichasDataSource: ds.cloneWithRows(fichasToBuy),
      idVendaNova:""
    }
}

verificarUltimaVenda(){
  db.transaction((tx) => {
    tx.executeSql('select id from vendas order by id desc limit 1',[],(tx, results) => {
      results.rows.item(0) ? this.setState({idVendaNova:"VND"+Numeral(parseInt(results.rows.item(0).id.substr(3,4))+1).format("000")})
      : this.setState({idVendaNova:"VND"+Numeral(1).format("000")})
      /*results.rows.item ? this.setState({idVendaNova:"VND"+Numeral(1).format("000")})
      : this.setState({idVendaNova:"VND"+Numeral(parseInt(results.rows.item(0).id.substr(3,4))+1).format("000")})
    */
    });
  });
}

adicionarComparBD(){
  //="VND"+Numeral(this.state.idVendaNova).format("000")
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
  
    

  trocoInternoBD=this.state.totalCalculadora-totalBruto;
  cinza=0;
  laranja=0;
  ciano=0;
  amarelo=0;
  azul=0;
  verde=0;
  
  for(i=0;i<fichasToBuy.length;i++){
    if(fichasToBuy[i].cor=="Amarelo"){
       amarelo=fichasToBuy[i].qntd;
    }else if(fichasToBuy[i].cor=="Verde"){
      verde=fichasToBuy[i].qntd;
    }else if(fichasToBuy[i].cor=="Ciano"){
      ciano=fichasToBuy[i].qntd;
    }else if(fichasToBuy[i].cor=="Laranja"){
      laranja=fichasToBuy[i].qntd;
    }else if(fichasToBuy[i].cor=="Azul"){
      azul=fichasToBuy[i].qntd;
    }else{
      cinza=fichasToBuy[i].qntd;
    }
  }
  
  console.log('INSERT INTO vendas (id, data, total, pago, troco) VALUES ("'+this.state.idVendaNova
  +'","'+date + '/' + month + '/' + year +'-'+ hours + ':' + min + ':' + sec
  +'","'+totalBruto
  +'","'+this.state.totalCalculadora
  +'","'+trocoInternoBD
  +'");')
  console.log('INSERT INTO vendas_fichas (cinza, laranja, amarelo, azul, ciano, verde, id_venda) VALUES ("'+cinza
  +'","'+laranja
  +'","'+amarelo
  +'","'+azul
  +'","'+ciano
  +'","'+verde
  +'","'+this.state.idVendaNova
  +'");');
  
  db.transaction((tx) => {
    tx.executeSql('INSERT INTO vendas (id, data, total, pago, troco) VALUES ("'+this.state.idVendaNova
    +'","'+date + '/' + month + '/' + year +'-'+ hours + ':' + min + ':' + sec
    +'","'+totalBruto
    +'","'+this.state.totalCalculadora
    +'","'+trocoInternoBD
    +'");');
    //console.log("sql vendas")

    tx.executeSql('INSERT INTO vendas_fichas (cinza, laranja, amarelo, azul, ciano, verde, id_venda) VALUES ("'+cinza
    +'","'+laranja
    +'","'+amarelo
    +'","'+azul
    +'","'+ciano
    +'","'+verde
    +'","'+this.state.idVendaNova
    +'");');
    //console.log("sql fichas")
  });
  
    
  var sql=""
  for(y=0;y<cart.length;y++){
    idproduto = cart[y].id
    nome = cart[y].nome
    quantidade = cart[y].qntd

    sql=sql+"('"+cart[y].id+"', '"+cart[y].nome+"','"+cart[y].qntd+"','"+this.state.idVendaNova+"')"
    if(y==(cart.length-1)){
      sql=sql+";"
    }else{
      sql=sql+","
    }
  }
  db.transaction((tx) => {

    tx.executeSql("INSERT INTO vendas_produtos ('produto_id', 'nome_produto','quantidade','venda_id') VALUES"+sql);
    //console.log("sqllaço")
    console.log("INSERT INTO vendas_produtos ('produto_id', 'nome_produto','quantidade','venda_id') VALUES"+sql);
    //console.log(sql);
  })
  /*
  for(y=0;y<cart.length;y++){
    idproduto = cart[y].id
    nome = cart[y].nome
    quantidade = cart[y].qntd
    //console.log("sqllaço")
      db.transaction((tx) => {

        tx.executeSql('INSERT INTO vendas_produtos (produto_id, nome_produto, quantidade, venda_id) VALUES ("'+
        idproduto+'","'+nome+'","'+quantidade+'","'+this.state.idVendaNova+'");');
        //console.log("sqllaço")
        console.log('INSERT INTO vendas_produtos (produto_id, nome_produto, quantidade, venda_id) VALUES ("'+
    idproduto+'","'+nome+'","'+quantidade+'","'+this.state.idVendaNova+'");');



    
      })
  }*/
}

calcularFichas(preBruto){
  //Fazendo as fichas
  valorAtual=preBruto;
  textFichas='';
  fichasToBuy=[];
  j=0;
  valorFichas=0;
  totalfichas=0;
  while(j<fichas.length){
    if(valorAtual>=fichas[j].valor){
      qntdFichas=Math.floor(valorAtual/fichas[j].valor)
      valorAtual=parseFloat(valorAtual-(fichas[j].valor*qntdFichas)).toFixed(2)
      
      totalfichas=(totalfichas+(fichas[j].valor*qntdFichas))
      valorFichas=(preBruto-totalfichas).toFixed(2)
      

      const data={
        id:fichas[j].id,
        cor:fichas[j].cor,
        qntd:qntdFichas,
        valor:fichas[j].valor,
        qntdfichas:fichas[j].valor
      }
      fichasToBuy.push(data)
      
    }else{
      j++
    }
  }
}
calculos(){
  if(cart.length==0){
    this.setState({
      fichasDataSource: ds.cloneWithRows([])
    });
  }
  //Fazendo e mostrando o total
  totalBruto=0
  for(i=0;i<cart.length;i++){
    totalBruto=(parseFloat(totalBruto)+parseFloat(cart[i].total)).toFixed(2)
  }

  this.calcularFichas(totalBruto)
  valortmp=totalBruto
  count=0
  if(parseFloat(valorFichas)>0.08){
    temVerde=false
      for(i=0;i<fichasToBuy.length;i++){
        if(fichasToBuy[i].id==6){
          temVerde=false
          fichasToBuy[i].qntd=fichasToBuy[i].qntd+1
          
          this.setState({
            fichasDataSource: ds.cloneWithRows(fichasToBuy)
          });
        }else{
          this.setState({
            fichasDataSource: ds.cloneWithRows(fichasToBuy)
          });
        }

      }

      if(temVerde){

      }else{
        valorFichas='5 centavos a mais :)'
        const data={
          id:6,
          cor:"Verde",
          qntd:1,
          valor:0.15,
          qntdfichas:0.15
        }
        fichasToBuy.push(data)
        this.setState({
          fichasDataSource: ds.cloneWithRows(fichasToBuy)
        });
      }

  
}else{
  this.setState({
    fichasDataSource: ds.cloneWithRows(fichasToBuy)
  });
}
}
fichasRenderRow(fichasbuy) {
  if(fichasbuy.cor=="Amarelo"){
  return(
    <Text style={{fontSize: 15, color: "yellow",textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 0.5}}><Text style={{fontSize: 25,fontWeight:"bold",
    }}>{fichasbuy.qntd}<Text style={{fontSize: 25}}>x - </Text></Text>{fichasbuy.cor}{fichasbuy.qntdfichas}</Text>
  )
}else if(fichasbuy.cor=="Verde"){
  return(
    <Text style={{fontSize: 15, color: "green",textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 0.5}}><Text style={{fontSize: 25,fontWeight:"bold",
    }}>{fichasbuy.qntd}<Text style={{fontSize: 25}}>x - </Text></Text>{fichasbuy.cor}{fichasbuy.qntdfichas}</Text>
  )
}else if(fichasbuy.cor=="Ciano"){
  return(
    <Text style={{fontSize: 15, color: "#33ccff",textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 0.5}}><Text style={{fontSize: 25, fontWeight:"bold",
    }}>{fichasbuy.qntd}<Text style={{fontSize: 25}}>x - </Text></Text>{fichasbuy.cor}{fichasbuy.qntdfichas}</Text>
  )
}else if(fichasbuy.cor=="Laranja"){
  return(
    <Text style={{fontSize: 15,color: "orange",textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 0.5}}><Text style={{fontSize: 25, fontWeight:"bold",
    }}>{fichasbuy.qntd}<Text style={{fontSize: 25}}>x - </Text></Text>{fichasbuy.cor}{fichasbuy.qntdfichas}</Text>
  )
}else if(fichasbuy.cor=="Azul"){
  return(
    <Text style={{fontSize: 15, color: "blue",textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 0.5}}><Text style={{fontSize: 25,fontWeight:"bold",
    }}>{fichasbuy.qntd}<Text style={{fontSize: 25}}>x - </Text></Text>{fichasbuy.cor}{fichasbuy.qntdfichas}</Text>
  )
}else{
  return(
    <Text style={{fontSize: 15, color:"#808080",textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 0.5}}><Text style={{fontSize: 25,fontWeight:"bold",
      }}>{fichasbuy.qntd}<Text style={{fontSize: 25}}>x - </Text></Text>{fichasbuy.cor}{fichasbuy.qntdfichas}</Text>
  )
}
}
zerarTudo(){
  cart=[]
  this.setState({
    cartDataSource: ds.cloneWithRows(cart)
  });
  this.calculos()




}
calcularTroco(valorPago){
  trocoInterno=totalBruto-valorPago
  if(trocoInterno==0){
    this.setState({troco: "Não precisa de troco :)"})
  }else
  if(trocoInterno>0){
    
    this.setState({troco: "Falta "+ Numeral(parseFloat(trocoInterno)).format("0.00")})

  }else{
    
    this.setState({troco: "Troco de "+ Numeral(parseFloat(Math.abs(trocoInterno))).format("0.00")})
  }

}
  adicionarTotalCalculador(valor){
    totalCalculadoraHistorico=this.state.totalCalculadora
    totalCalculadoraAtual=0
    valor=valor*0.01;
    if(this.state.totalCalculadora==0.00){
      totalCalculadoraAtual=this.state.totalCalculadora+valor
      this.setState({totalCalculadora: totalCalculadoraAtual,ultimoSomado: valor  })
    }else if(valor==0){
      
      totalCalculadoraAtual=this.state.totalCalculadora*10
      this.setState({totalCalculadora:  totalCalculadoraAtual,ultimoSomado: valor })
    }else{
      totalCalcAnterior=parseFloat((this.state.totalCalculadora*10).toFixed(2))
      totalCalculadoraAtual=parseFloat((valor+totalCalcAnterior).toFixed(2))
    //alert(valor+" | "+totalCalcAnterior+" | "+parseFloat((valor+totalCalcAnterior).toFixed(2)))
      this.setState({totalCalculadora: totalCalculadoraAtual,ultimoSomado: valor })
    }
    //alert(totalCalculadoraAtual)
    this.calcularTroco(totalCalculadoraAtual)
    

  }
  apagarCalcu(){ 
    
    var test = (this.state.totalCalculadora).toFixed(2)
    var lastone = test.toString().split('').pop();

    
    totalCalculadoraHistorico=this.state.totalCalculadora
    totalCalculadoraAtual=0
    
    
    parseInt(lastone);
    if(lastone==0){
      totalCalculadoraAtual=this.state.totalCalculadora/10
    
      this.setState({totalCalculadora: totalCalculadoraAtual})
    }else{
      lastone=lastone*0.01
      valorSemDecimal=parseFloat((this.state.totalCalculadora-lastone).toFixed(2))
      //alert(lastone);
      if((valorSemDecimal)==0){
        
        totalCalculadoraAtual=0
        this.setState({totalCalculadora: totalCalculadoraAtual})
      }else{
        
      totalCalculadoraAtual=(valorSemDecimal)/10
      this.setState({totalCalculadora: totalCalculadoraAtual})}
    }
    
    this.calcularTroco(totalCalculadoraAtual)
  }

  componentDidMount(){
    this.verificarUltimaVenda();
  }

  render() {
    return (
      <View style={styles.containerProdutos}>
        <View style={styles.containerTroco1}>
          
          <View style={styles.visorCalcu}>
            <Text style={{fontSize:30, color:"black"}}>
              {Numeral(this.state.totalCalculadora).format("$ 0,0.00a", Math.floor)}
            </Text>
            <TouchableOpacity style={styles.apagarCalc}onPress={()=>{
            this.apagarCalcu()}}>
            <Image style={styles.apagarCalcImage}
            source={require('./src/images/backspaceIcon.png')} />
            
            </TouchableOpacity>
          </View>

          <View style={styles.areaCalculadora}>

          <TouchableOpacity style={styles.botaoCalculadora} onPress={()=>{
            this.adicionarTotalCalculador(1)}}><Text style={{fontSize:40,}}>1</Text></TouchableOpacity>
          <TouchableOpacity style={styles.botaoCalculadora} onPress={()=>{
            this.adicionarTotalCalculador(2)}}><Text style={{fontSize:40,}}>2</Text></TouchableOpacity>
          <TouchableOpacity style={styles.botaoCalculadora} onPress={()=>{
            this.adicionarTotalCalculador(3)}}><Text style={{fontSize:40,}}>3</Text></TouchableOpacity>

          <TouchableOpacity style={styles.botaoCalculadora} onPress={()=>{
            this.adicionarTotalCalculador(4)}}><Text style={{fontSize:40,}}>4</Text></TouchableOpacity>
          <TouchableOpacity style={styles.botaoCalculadora} onPress={()=>{
            this.adicionarTotalCalculador(5)}}><Text style={{fontSize:40,}}>5</Text></TouchableOpacity>
          <TouchableOpacity style={styles.botaoCalculadora} onPress={()=>{
            this.adicionarTotalCalculador(6)}}><Text style={{fontSize:40,}}>6</Text></TouchableOpacity>

          
<TouchableOpacity style={styles.botaoCalculadora} onPress={()=>{
            this.adicionarTotalCalculador(7)}}><Text style={{fontSize:40,}}>7</Text></TouchableOpacity>
          <TouchableOpacity style={styles.botaoCalculadora} onPress={()=>{
            this.adicionarTotalCalculador(8)}}><Text style={{fontSize:40,}}>8</Text></TouchableOpacity>
            <TouchableOpacity style={styles.botaoCalculadora} onPress={()=>{
              this.adicionarTotalCalculador(9)}}><Text style={{fontSize:40,}}>9</Text></TouchableOpacity>


              
          <TouchableOpacity style={styles.botaoCalculadoraZero} onPress={()=>{
            this.adicionarTotalCalculador(0)}}><Text style={{fontSize:40,}}>0</Text></TouchableOpacity>
          
          </View>
        </View>
        <View style={styles.containerTroco2}>
        <View style={styles.containerTroco21A}>
        <Text style={{ fontSize: 25, color: 'black' }}>
            <Text style={{color: 'gray' }}>TOTAL: </Text> 
            {Numeral(parseFloat(totalBruto)).format("$ 0.00")}
          </Text>

          <Text style={{ fontSize: 25, color: 'black' }}>
            <Text style={{color: 'gray' }}></Text> 
            {//Numeral(parseFloat(this.state.troco)).format("$ 0.00")
            this.state.troco
            }

          </Text>
        
        
        </View>
        <View style={styles.containerTroco22A}>

        <ListView
              initialListSize ={50}
              dataSource={this.state.fichasDataSource}
              renderRow={this.fichasRenderRow}
              />
          
              <View style={styles.areaBotoes}>
            <TouchableOpacity style={styles.botaoVoltar} 
            onPress={()=>{this.props.navigation.goBack()}}
          ><Text style={{color: "black"}}>VOLTAR</Text></TouchableOpacity >
            <TouchableOpacity style={styles.botaoFinalizar} 
            onPress={()=>{
              this.adicionarComparBD(),
              this.zerarTudo(), 
              this.props.navigation.goBack()
            
            }}
          ><Text style={{color: "black"}}>FINALIZAR</Text></TouchableOpacity >
          </View>
        </View>
        
        
        </View>
      </View>
    );
  }
}
class CalendarioScreen extends React.Component{
  
  static navigationOptions={
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      //defauilt value of the date time
      date: '',
    };
  }
  componentDidMount() {
    Orientation.lockToPortrait();
    var that = this;
    var date = new Date().getDate()-1; //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      date:
      year + '-' + month + '-' + date,
    });
  }
  render(){
    return (
      <View><Text>{}</Text>
        <CalendarList
  
        // Enable horizontal scrolling, default = false
  horizontal={true}
  // Enable paging on horizontal, default = false
  pagingEnabled={true}
  // Set custom calendarWidth.
  calendarWidth={500}
  // Initially visible month. Default = Date()
  current={Date()}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  //minDate={'2012-05-10'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={this.state.date}
  // Handler which gets executed on day press. Default = undefined
  onDayPress={(day) => {console.log('selected day', day)}}

  onDayPress={(dateString) => {this.props.navigation.navigate('Historico',{parametroData: dateString})}}

  // Handler which gets executed on day long press. Default = undefined
  onDayLongPress={(day) => {console.log('selected day', day)}}
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  monthFormat={'MMMM - yyyy'}
  // Handler which gets executed when visible month changes in calendar. Default = undefined
  onMonthChange={(month) => {console.log('month changed', month)}}
  // Hide month navigation arrows. Default = false
  //hideArrows={true}
  // Replace default arrows with custom ones (direction can be 'left' or 'right')
  renderArrow={(direction) => (direction=="left" ? <Text>{"<"}</Text> : <Text>{">"}</Text>)}
  // Do not show days of other months in month page. Default = false
  hideExtraDays={false}
  // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
  // day from another month that is visible in calendar page. Default = false
  disableMonthChange={true}
  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
  firstDay={1}
  // Hide day names. Default = false
  hideDayNames={false}
  // Show week numbers to the left. Default = false
  showWeekNumbers={true}
  // Handler which gets executed when press arrow icon left. It receive a callback can go back month
  onPressArrowLeft={substractMonth => substractMonth()}
  // Handler which gets executed when press arrow icon left. It receive a callback can go next month
  onPressArrowRight={addMonth => addMonth()}
/>
      </View>
    )
  }
}

class HistoricoScreen extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      colapsadoHistorico: [],
      dataEstado:[]
    };
    this.data = []
    this.data2 = []
    this.collapsedHistorico=[]



    
    db.transaction((tx) => {
      tx.executeSql('Select * from vendas v inner join vendas_fichas f on f.id_venda = v.id where substr(data,1,8)="'+this.props.navigation.state.params.parametroData.day+'/'+this.props.navigation.state.params.parametroData.month+'/'+this.props.navigation.state.params.parametroData.year+'"', [], (tx, results) => {
        len = results.rows.length;
        var row =results.rows.item(0);
        for(i=0;i<len;i++){
          this.collapsedHistorico.push({id:i, collapsed:true, venda:results.rows.item(i).id})
          this.setState({colapsadoHistorico: this.collapsedHistorico})
          this.data.push({time: i,
                          title: Numeral(i+1).format("000")+" - Total: "+Numeral(results.rows.item(i).pago-results.rows.item(i).troco).format("$ 0.00")+" | Pago: "+Numeral(results.rows.item(i).pago).format("$ 0.00"),
                          description: "",
                          fichas:[
                            {
                            cor: "Cinza",
                            qntd:results.rows.item(i).cinza,
                            valor:4.5},
                            {
                            cor:"Laranja",
                            qntd:results.rows.item(i).laranja,
                            valor:2.5},
                            {
                            cor:"Amarelo",
                            qntd:results.rows.item(i).amarelo,
                            valor:1.5},
                            {
                            cor:"Azul",
                            qntd:results.rows.item(i).azul,
                            valor:1},
                            {
                            cor:"Ciano",
                            qntd:results.rows.item(i).ciano,
                            valor:0.5},
                            {
                            cor:"Verde",
                            qntd:results.rows.item(i).verde,
                            valor:0.15}
                          ]
                        })
            this.setState({dataEstado: this.data})
        }
      for(y=0;y<len;y++){
        //console.log(this.state.colapsadoHistorico[0].venda)
        tx.executeSql('SELECT * FROM vendas_produtos where venda_id= "'+this.state.colapsadoHistorico[y].venda+'"', [], (tx, resultsP) => {
          var lenProdutos = resultsP.rows.length;
          SQLprodutosVenda = ""
          //console.log('SELECT * FROM vendas_produtos where venda_id= "'+this.state.colapsadoHistorico[0].venda+'"')
          //console.log(lenProdutos)
           for(z=0;z<lenProdutos;z++){
            SQLprodutosVenda=SQLprodutosVenda+resultsP.rows.item(z).quantidade+"X - "+resultsP.rows.item(z).nome_produto+"\n"
            //console.log(resultsP.rows.item(z).nome_produto)
          }this.data2.push({produtosVenda: SQLprodutosVenda})
        });
      }
      });
  });

  }

  static navigationOptions={
    header: null
  }
  componentDidMount(){
/*
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO vendas_fichas (cinza, laranja, amarelo,azul,ciano,verde,id_venda) VALUES ("0","0","0","1","0","4","VND001")');
      tx.executeSql('INSERT INTO vendas_fichas (cinza, laranja, amarelo,azul,ciano,verde,id_venda) VALUES ("1","2","0","2","0","0","VND002")');
      tx.executeSql('INSERT INTO vendas_fichas (cinza, laranja, amarelo,azul,ciano,verde,id_venda) VALUES ("0","2","0","1","0","3","VND003")');
      
    });*/
/*
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO vendas_produtos (produto_id, quantidade, venda_id) VALUES ("32","2","VND001");');
      
      tx.executeSql('INSERT INTO vendas_produtos (produto_id, quantidade, venda_id) VALUES ("5","1","VND001");');
      tx.executeSql('INSERT INTO vendas_produtos (produto_id, quantidade, venda_id) VALUES ("12","1","VND001");');
      tx.executeSql('INSERT INTO vendas_produtos (produto_id, quantidade, venda_id) VALUES ("43","1","VND002");');
      
      tx.executeSql('INSERT INTO vendas_produtos (produto_id, quantidade, venda_id) VALUES ("10","1","VND003");');
      tx.executeSql('INSERT INTO vendas_produtos (produto_id, quantidade, venda_id) VALUES ("8","3","VND003");');
  
    });*/
    StatusBar.setHidden(false);
    StatusBar.setBackgroundColor("#f2f2f2");
    StatusBar.setBarStyle("dark-content");
    /*
    
    <FlatList
      data={[{}]}
      renderItem={({item}) => <Text>oi</Text>}
      />
      
      
      */
  }

  render() {
    return (
      <View style={styles.containerHomeHistorico}>
         <View style={{
            width:500,
            height:20,
            position: "relative",
            left:0}}>
              <View style={{
            backgroundColor:"#007AFF",
            padding: 3,
            //alignItems: 'center',
            justifyContent: 'center',
            width:80,
            height:20}}>
            <Text style={{
            color:"white",
            fontWeight:"bold",}}
            >{this.props.navigation.state.params.parametroData.day+'/'+this.props.navigation.state.params.parametroData.month+'/'+this.props.navigation.state.params.parametroData.year}</Text></View>
            </View>
            <Timeline
          showTime={false}
          style={{width:500,}}
          data={this.data}
          innerCircle={'dot'}
          datahistorico={this.collapsedHistorico}
          datinha2={this.data2}
        />
        
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  
  
  Home:{
    screen: HomeScreen
  },
  Produtos:{
    screen: ProdutosScreen
  },
  Troco:{
    screen: TrocoScreen
  },
  Calendario:{
    screen: CalendarioScreen
  },
  Historico:{
    screen: HistoricoScreen
  },
});

export default createAppContainer(AppNavigator);


const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  containerHomeHistorico: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  logoHome:{
    width:308.78,
    height: 120,
    marginTop:20
  },
  botaoHome:{
    width:300,
    height:65,
    marginTop:40,
    backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoHomeText:{
    color:"white",
  },
  
  containerProdutos:{
    flex:1,
    flexDirection: 'row',
    backgroundColor: 'white',

  },
  areaBotoes:{
    flexDirection:"row",
    width:"100%",
    height:50,
    position: "absolute",
    bottom:0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoConcluir:{
    width:"50%",
    height:50,
    position: "absolute",
    right:0,
    //padding:10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00b33c',

  },
  botaoSair:{
    width:"50%",
    height:50,
    position: "absolute",
    left:0,
    //padding:10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e60000',
  },
  botaoSairText:{
    color:"black",
  },
  containerProdutos1:{
    alignItems: 'center',
    width:"65%",
    borderRightColor:"black",
    borderRightWidth:1,
  },
  menuProdutos:{
    justifyContent: 'center',
    borderLeftWidth:8,
    borderColor:"gray",
    width:"100%",
    height:50,
    padding:5,
    borderTopWidth:1,
  },
  collapsibleProdutos:{
    flexDirection: 'row',
    //borderBottomWidth:1,
    width:"100%",
    marginTop:10,
    marginBottom: 30,
    borderColor:"gray",
    backgroundColor:"white",
  },
  listViewProdutos:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor:"white",
  },
  textMenuProdutos:{
    color: "rgba(0,0,0,0.7)",
    fontSize: 20,

  },
  botaoProduto:{
    backgroundColor:"#0099ff",
    width:120,
    height: 80,
    //borderWidth: 1,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
    justifyContent: "flex-end",
    alignItems: 'center',
    borderRadius:5,
    color:"white"
    },
botaoProdutoDesabilitado:{
    backgroundColor:"grey",
    width:120,
    height: 80,
    //borderWidth: 1,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
    justifyContent: "flex-end",
    alignItems: 'center',
    borderRadius:5,
    color:"white",
    opacity: 0.4,
    },
  containerProdutos2:{
    alignItems: 'center',
    width:"35%",
    height:'100%',
  },
  containerProdutos2A1:{
    marginRight:0,
    alignItems: 'center',
    width:"100%",
    height:'45%',
    borderBottomColor:"black",
    borderBottomWidth:1,
  },
  cartItem:{
    width:"100%",
    height:50,
    marginTop:3,
    backgroundColor:"#f2f2f2",
    flexDirection: 'row',
  },
  containerProdutos2A2:{
    alignItems: 'center',
    width:"100%",
    height:'55%',
  },


  //--------------------------------------------------------------TROCO CSS---------------------------
  containerTroco1:{
    width:"45%",
    borderRightColor:"black",
    borderRightWidth:1,
  },
  visorCalcu:{
    alignItems:"center",
    flexDirection: 'row',
    borderWidth:1,
    height:"20%",
    width:"100%",
    justifyContent:"space-between",
    padding:15
  },
  areaCalculadora:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    height:"80%",
    width:"100%",
  },
  botaoCalculadora:{
    width:"33.33%",
    height:"25%",
    borderColor:"gray",
    borderRightWidth:1,
    borderBottomWidth:1,
    alignItems:"center",
    justifyContent:"center",
  },
  botaoCalculadoraZero:{
    width:"100%",
    height:"25%",
    borderColor:"gray",
    borderRightWidth:1,
    borderBottomWidth:1,
    alignItems:"center",
    justifyContent:"center"
  },
  apagarCalc:{
    width:70,
    height:45,
  },
  apagarCalcImage:{
    width:70,
    height:45,
    opacity:0.8,
  },
  containerTroco2:{
    alignItems: 'center',
    width:"55%",
    height:'100%',
  },
  containerTroco21A:{
    marginRight:0,
    alignItems: 'center',
    width:"100%",
    height:'30%',
    borderBottomColor:"black",
    borderBottomWidth:1,
  },
  containerTroco22A:{
  alignItems: 'center',
  width:"100%",
  height:'70%',
  },
  botaoVoltar:{
    width:"50%",
    height:50,
    position: "absolute",
    left:0,
    //padding:10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#0099ff",
  },
  
  botaoFinalizar:{
    width:"50%",
    height:50,
    position: "absolute",
    right:0,
    //padding:10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00b33c',

  },
  botaoSairText:{
    color:"black",
  },
});
