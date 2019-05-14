import React, { PropTypes } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import SafeComponent from '../../components/SafeComponent';

import styles from '../../styles';

const style = StyleSheet.create({
  steps: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  step: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },

  bgWhite: {
    backgroundColor: '#ffffff',
  },
  bgGray: {
    backgroundColor: '#f1f1f1',
  },
  stepText: {
    color: '#a2a9b0',
    fontSize: 10,
  },
});

const ItemPropShape = {
  title: PropTypes.string.isRequired,
  image: Image.propTypes.source,
  activeImage: Image.propTypes.source,
};

const STEP_ARROW_11 = require('./step_arrow_11.png');
const STEP_ARROW_10 = require('./step_arrow_10.png');
const STEP_ARROW_00 = require('./step_arrow_00.png');


export default class Steps extends SafeComponent {
  static propTypes = {
    position: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.shape(ItemPropShape)),
    onPressStep: PropTypes.func,
  };

  static defaultProps = {
    position: 0,
    items: [{
      title: '步骤1',
    }, {
      title: '步骤2',
    }, {
      title: '步骤3',
    }],
  };


  constructor(props) {
    super(props);

    [
      'handlePressStep',
    ].map(method => this[method] = this[method].bind(this));
  }

  handlePressStep() {
    const { onPressStep } = this.props;
    if (typeof onPressStep === 'function') {
      onPressStep();
    }
  }

  renderStep(item, index) {
    const { position, items, onPressStep } = this.props;
    const isPast = index + 1 <= position;
    const isActive = index <= position;
    const stepsCount = items && items.length;
    const isLast = stepsCount === index + 1;
    const displayImage = isPast
      ? item.passImage || item.activeImage || item.image
      : isActive
        ? item.activeImage || item.image
        : item.image;

    const Tag = typeof onPressStep === 'function' ? TouchableOpacity : View;

    return (
      <Tag
        style={[style.step, isPast ? style.bgWhite : style.bgGray]}
        key={index}
        onPress={this.handlePressStep}
      >
        <View style={[style.textWrapper, isActive ? style.bgWhite : style.bgGray]}>
          {displayImage ? (<Image style={styles.mr5} source={displayImage} />) : (null)}
          <Text style={[style.stepText]}>{item.title}</Text>
        </View>
        {isLast ? (null) : (
          <Image source={isPast ? STEP_ARROW_11 : isActive ? STEP_ARROW_10 : STEP_ARROW_00 } />
        )}
      </Tag>
    );
  }

  render() {
    const { items } = this.props;

    return (
      <View style={style.steps}>
        {items.map((item, index) => this.renderStep(item, index))}
      </View>
    );
  }
}
