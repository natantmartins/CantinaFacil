import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity , Image,StatusBar,ListView,ScrollView} from 'react-native';
import {createStackNavigator, createAppContainer, HeaderStyleInterpolator} from'react-navigation';
console.disableYellowBox = true;
import Orientation from 'react-native-orientation';

import "numeral/locales/pt-br";
const Numeral = require('numeral');
Numeral.locale('pt-br');

import {
  HideNavigationBar,
  ShowNavigationBar,
} from 'react-native-navigation-bar-color';

import Accordion from 'react-native-collapsible/Accordion';
import Collapsible from 'react-native-collapsible';

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { whileStatement } from '@babel/types';

const produtosBalas =[]
const produtos =[{id: 35, nome: 'Cheeseburguer', categoria: 'Salgados', preco: '3.10'},
{id: 36, nome: 'Hamburguer', categoria: 'Salgados', preco: '5'},
{id: 37, nome: 'Mini pizza', categoria: 'Salgados', preco: '5'},
{id: 38, nome: 'Pão de queijo', categoria: 'Salgados', preco: '2.5'},
{id: 39, nome: 'Pipoca Salgada', categoria: 'Salgados', preco: '2.5'},
{id: 40, nome: 'Queijo quente', categoria: 'Salgados', preco: '5'},
{id: 41, nome: 'Salgados', categoria: 'Salgados', preco: '4.5'},
]
const produtosBebidas =[{id: 0, nome: 'guaravita', categoria: 'Bebidas', preco: '1.5'},
{id: 1, nome: 'H20!', categoria: 'Bebidas', preco: '4.5'},
{id: 2, nome: 'Mate Leão', categoria: 'Bebidas', preco: '4'},
{id: 3, nome: 'Refrigerante garrafinha', categoria: 'Bebidas', preco: '3'},
{id: 4, nome: 'Refrigerante Lata', categoria: 'Bebidas', preco: '4.5'},
{id: 5, nome: 'suco', categoria: 'Bebidas', preco: '2'},
{id: 6, nome: 'Toddynho', categoria: 'Bebidas', preco: '2.5'},
]
const produtosBiscoitos =[{id: 7, nome: 'Look', categoria: 'Biscoitos', preco: '2.5'},
{id: 8, nome: 'Polvilho', categoria: 'Biscoitos', preco: '1.5'},
{id: 9, nome: 'Salgadinho', categoria: 'Biscoitos', preco: '4'},
{id: 10, nome: 'Torcida', categoria: 'Biscoitos', preco: '2'},
{id: 11, nome: 'Trakinas', categoria: 'Biscoitos', preco: '2.5'},
]
const produtosChocolates =[{id: 12, nome: 'Batom', categoria: 'Chocolates', preco: '1'},
{id: 13, nome: 'Bombom', categoria: 'Chocolates', preco: '1'},
{id: 14, nome: 'Chokito', categoria: 'Chocolates', preco: '2'},
{id: 15, nome: 'Diamante Negro', categoria: 'Chocolates', preco: '2'},
{id: 16, nome: 'Galak', categoria: 'Chocolates', preco: '2'},
{id: 17, nome: 'Maxi Chocolate', categoria: 'Chocolates', preco: '0.6'},
{id: 18, nome: 'Trento', categoria: 'Chocolates', preco: '1.5'},
{id: 19, nome: 'Trio Light', categoria: 'Chocolates', preco: '1.5'},
]
const produtosDoces =[{id: 20, nome: 'Açai', categoria: 'Doces', preco: '3.5'},
{id: 21, nome: 'Amendoim', categoria: 'Doces', preco: '1'},
{id: 22, nome: 'Bala', categoria: 'Doces', preco: '0.2'},
{id: 23, nome: 'Bala Garoto menta', categoria: 'Doces', preco: '1'},
{id: 24, nome: 'Bananada', categoria: 'Doces', preco: '0.5'},
{id: 25, nome: 'Fini', categoria: 'Doces', preco: '1'},
{id: 26, nome: 'Halls', categoria: 'Doces', preco: '1.3'},
{id: 27, nome: 'Jujuba', categoria: 'Doces', preco: '0.5'},
{id: 28, nome: 'Mentos', categoria: 'Doces', preco: '1.5'},
{id: 29, nome: 'Paçoca', categoria: 'Doces', preco: '0.5'},
{id: 30, nome: 'Pingo de leite', categoria: 'Doces', preco: '0.5'},
{id: 31, nome: 'Pipoca Doce', categoria: 'Doces', preco: '4'},
{id: 32, nome: 'Pirulito', categoria: 'Doces', preco: '0.5'},
{id: 33, nome: 'Tic Tac', categoria: 'Doces', preco: '2'},
{id: 34, nome: 'Torrone', categoria: 'Doces', preco: '1'},
]

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

valorFichas=0;
class HomeScreen extends React.Component{



  static navigationOptions={
    header: null
  }

  componentDidMount() {
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
          ><Text style={styles.botaoHomeText}>INICIAR</Text></TouchableOpacity >
          <TouchableOpacity  style={styles.botaoHome}
            onPress={()=>this.props.navigation.navigate('Historico')}
          ><Text style={styles.botaoHomeText}>HISTÓRICO</Text></TouchableOpacity >
      </View>
    );
  }
}

//const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

// mover pra fora da pagina e substituir o ds
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class ProdutosScreen extends React.Component{

  constructor(props) {
    super(props);
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
      fichasDataSource: ds.cloneWithRows([]),
    }
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

    //Fazendo as fichas
    valorAtual=totalBruto;//COMENTADO PRA TESTAR DEPOIS QUE TESTAR VOLTA
    //valorAtual=0
    textFichas='';
    fichasToBuy=[];
    j=0;
    valorFichas=0;
    totalfichas=0;
    valorAtualtmp=totalBruto
    count=0;
    achou=true;
    while(j<fichas.length){
      //alert(valorAtual)
      if(valorAtual>=fichas[j].valor){
        qntdFichas=Math.floor(valorAtual/fichas[j].valor)
        valorAtual=parseFloat(valorAtual-(fichas[j].valor*qntdFichas)).toFixed(2)
        totalfichas=(totalfichas+(fichas[j].valor*qntdFichas))
        valorFichas=(totalfichas-totalBruto).toFixed(2)
        if(valorFichas!=0){
          while(achou){
            valorAtualtmp=valorAtualtmp-0.15
            resto2=valorAtualtmp%2
            resto05=valorAtualtmp%0.5
            count++;
            if(resto2==0){
              qntdFichas=Math.floor(valorAtualtmp/fichas[j].valor)
              valorAtualtmp=parseFloat(valorAtualtmp-(fichas[j].valor*qntdFichas)).toFixed(2)
              const dataVerde={
                id:6,
                cor:"Verde",
                qntd:count,
                valor:0.15,
                qntdfichas:0.15
              }
              const data={
                id:fichas[j].id,
                cor:fichas[j].cor,
                qntd:qntdFichas,
                valor:fichas[j].valor,
                qntdfichas:fichas[j].valor
              }
              fichasToBuy.push(dataVerde)
              fichasToBuy.push(data)
              //textFichas = textFichas+','+qntdFichas+"- "+fichas[j].cor+"; "+qntdFichas*fichas[j].valor
              //textFichas=fichasToBuy
              this.setState({
                fichasDataSource: ds.cloneWithRows(fichasToBuy)
              })




              achou=false;
            }else if(resto05==0){
              qntdFichas=Math.floor(valorAtualtmp/fichas[j].valor)
              valorAtualtmp=parseFloat(valorAtualtmp-(fichas[j].valor*qntdFichas)).toFixed(2)
              const dataVerde={
                id:6,
                cor:"Verde",
                qntd:count,
                valor:0.15,
                qntdfichas:0.15
              }
              const data={
                id:fichas[j].id,
                cor:fichas[j].cor,
                qntd:qntdFichas,
                valor:fichas[j].valor,
                qntdfichas:fichas[j].valor
              }
              fichasToBuy.push(dataVerde)
              fichasToBuy.push(data)
              //textFichas = textFichas+','+qntdFichas+"- "+fichas[j].cor+"; "+qntdFichas*fichas[j].valor
              //textFichas=fichasToBuy
              this.setState({
                fichasDataSource: ds.cloneWithRows(fichasToBuy)
              })



              achou=false
            }else{
              achou=true;
            }
        }
        }else{
          const data={
          id:fichas[j].id,
          cor:fichas[j].cor,
          qntd:qntdFichas,
          valor:fichas[j].valor,
          qntdfichas:fichas[j].valor
        }
        //valorFichas=totalBruto-(valorFichas+(fichas[j].valor*qntdFichas))
        fichasToBuy.push(data)
        //textFichas = textFichas+','+qntdFichas+"- "+fichas[j].cor+"; "+qntdFichas*fichas[j].valor
        //textFichas=fichasToBuy
        this.setState({
          fichasDataSource: ds.cloneWithRows(fichasToBuy)
        });}

        
      }else{
        j++
      }
    }

    /*while(j<fichas.length){
      count=0
      
      //alert(valorAtual)
      if(valorAtual>=fichas[j].valor){
        count++
        qntdFichas=Math.floor(valorAtual/fichas[j].valor)
        valorAtual=parseFloat(valorAtual-(fichas[j].valor*qntdFichas)).toFixed(2)
        const data={
          id:fichas[j].id,
          cor:fichas[j].cor,
          qntd:qntdFichas,
          valor:fichas[j].valor,
          qntdfichas:fichas[j].valor
        }
        valorFichas=(valorFichas+(fichas[j].valor*qntdFichas))
        fichasToBuy.push(data)
        //textFichas = textFichas+','+qntdFichas+"- "+fichas[j].cor+"; "+qntdFichas*fichas[j].valor
        //textFichas=fichasToBuy
        this.setState({
          fichasDataSource: ds.cloneWithRows(fichasToBuy)
        });
      }else{
        j++
        count++
      }
    }*/
    
    //alert(text)
  }

  
  renderRow(produtossalga) {
    
    return(
      <TouchableOpacity style={styles.botaoProduto}
        onPress={()=>{
        this.adicionarCart(produtossalga)
      }}>
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
  bebidasRenderRow(produtosbebidas) {
    if(produtosbebidas.categoria=="Bebidas"){
    return(
      <TouchableOpacity style={styles.botaoProduto}
        onPress={()=>{
          quantidadene=Math.floor(0.3/0.15)
          //alert(quantidadene)
        this.adicionarCart(produtosbebidas)
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>{produtosbebidas.nome}</Text>
      </TouchableOpacity>
    )}else{
      return null;
    }
  }
  docesRenderRow(produtosDoces) {
    if(produtosDoces.categoria=="Doces"){
    return(
      <TouchableOpacity style={styles.botaoProduto}
        onPress={()=>{
          quantidadene=Math.floor(0.3/0.15)
          //alert(quantidadene)
        this.adicionarCart(produtosDoces)
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>{produtosDoces.nome}</Text>
      </TouchableOpacity>
    )}else{
      return null;
    }
  }
  biscoitosRenderRow(produtosBiscoitos) {
    if(produtosBiscoitos.categoria=="Biscoitos"){
    return(
      <TouchableOpacity style={styles.botaoProduto}
        onPress={()=>{
          quantidadene=Math.floor(0.3/0.15)
          //alert(quantidadene)
        this.adicionarCart(produtosBiscoitos)
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>{produtosBiscoitos.nome}</Text>
      </TouchableOpacity>
    )}else{
      return null;
    }
  }
  chocolatesRenderRow(produtos) {
    if(produtos.categoria=="Chocolates"){
    return(
      <TouchableOpacity style={styles.botaoProduto}
        onPress={()=>{
          quantidadene=Math.floor(0.3/0.15)
          //alert(quantidadene)
        this.adicionarCart(produtos)
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>{produtos.nome}</Text>
      </TouchableOpacity>
    )}else{
      return null;
    }
  }
  balasRenderRow(produtos) {
    if(produtos.categoria=="Balas"){
    return(
      <TouchableOpacity style={styles.botaoProduto}
        onPress={()=>{
          quantidadene=Math.floor(0.3/0.15)
          //alert(quantidadene)
        this.adicionarCart(produtos)
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>{produtos.nome}</Text>
      </TouchableOpacity>
    )}else{
      return null;
    }
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
          <Text style={styles.textMenuProdutos}>Doces</Text>
          
          </View>
        <Collapsible style={styles.collapsibleProdutos} collapsed={this.state.colapsadoDoces}>

        <ListView contentContainerStyle={styles.listViewProdutos}
        initialListSize ={50}
          dataSource={this.state.docesDataSource}
          renderRow={this.docesRenderRow}
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
            <TouchableOpacity style={styles.botaoFinalizar} 
            onPress={()=>{this.zerarTudo()}}
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

class HistoricoScreen extends React.Component{

  static navigationOptions={
    header: null
  }

  render() {
    return (
      <View style={styles.containerHome}>
          <Text>Produtos</Text>
          <TouchableOpacity  title="Voltar"
          onPress={()=>{
            this.zerarTudo()
          }}
          ></TouchableOpacity >
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  
  Produtos:{
    screen: ProdutosScreen
  },Home:{
    screen: HomeScreen
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
    width:480,
    height: 186.54,
    marginTop:20
  },
  botaoHome:{
    width:300,
    height:65,
    marginTop:80,
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
  botaoFinalizar:{
    width:"50%",
    height:50,
    position: "absolute",
    left:0,
    //padding:10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00b33c',

  },
  botaoSair:{
    width:"50%",
    height:50,
    position: "absolute",
    right:0,
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
    width:170,
    height: 100,
    //borderWidth: 1,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
    justifyContent: "flex-end",
    alignItems: 'center',
    borderRadius:5,
    color:"white"
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
    height:'50%',
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
    height:'50%',
  },
});
