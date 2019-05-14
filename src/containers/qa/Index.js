import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import BaseView from '../../components/BaseView';

import style from '../../styles/index';
import colors from '../../styles/colors';

import { getKnowledgeList } from '../../redux/qa/actions';

/**
 * 问答首页
 */
const styles = StyleSheet.create({
  list: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  image: {
    width: 120,
    height: 70,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  title: {
    flexWrap: 'wrap',
    flex: 7,
  },
});
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.actions.getKnowledgeList();
  }

  keyExtractor(rowData) {
    return rowData._id;
  }

  renderRow(rowData) {
    const { item, index } = rowData;
    return(
      <TouchableOpacity
        activeOpacity={1}
        style={[style.p15,styles.list]}
        onPress={() => {Actions.Browser({ uri: item.url })}}
      >
        <View>
          <Image source={require('../../images/auto.png')} style={styles.image} />
        </View>
        <View style={[style.ml10, styles.title]}>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { ListFetching, questionList } = this.props;
    return (
      <BaseView title="问答" leftButton={null}>
        <FlatList
          data={questionList}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
        />
      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  const { ListFetching, questionList } = state.qa;
  return { ListFetching, questionList };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getKnowledgeList }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
