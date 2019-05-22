var ListViewExample = React.createClass({

  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
      r1 !== r2
    }});
    var rows = ['row 1', 'row 2', 'row 3'];
    return {
      dataSource: ds.cloneWithRows(rows),
    };
  },

  _deleteRow() {
    var rows = ['row 1', 'row 3'];
    this.setState({dataSource: this.state.dataSource.cloneWithRows(rows)})
  },

  renderRow(rowData, sectionID, rowID) {
    return <TouchableOpacity onPress={this._deleteRow}
      style={{height: 60, flex: 1, borderBottomWidth: 1}}>
      <Text>{rowData}</Text>
    </TouchableOpacity>
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }

});


<TouchableOpacity style={styles.botaoSair} 
            onPress={()=>this.props.navigation.goBack()}
          ><Text>Sair</Text></TouchableOpacity >