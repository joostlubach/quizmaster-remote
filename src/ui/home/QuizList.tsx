import * as React from 'react'
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native'
import {observer} from 'mobx-react'
import {quizStore, Quiz} from '@src/stores'
import {colors, layout} from '@ui/styles'
import {Label} from '@ui/components'

export interface Props {
  style?:      ViewStyleProp
  onQuizPress: (quiz: Quiz) => any
}

@observer
export default class QuizList extends React.Component<Props> {

  componentDidMount() {
    quizStore.quizzes.fetch()
  }

  render() {
    const {style} = this.props

    return (
      <FlatList
        style={style}
        contentContainerStyle={[$.listContent, quizStore.quizzes.empty && $.listContentEmpty]}
        data={quizStore.quizzes.data}
        ListEmptyComponent={this.ListEmptyComponent}
        keyExtractor={quiz => quiz.id!}
        renderItem={({item}) => this.renderItem(item)}
      />
    )
  }

  ListEmptyComponent = this.renderEmpty.bind(this)

  renderEmpty() {
    return (
      <Label dim italic>No quizzes yet</Label>
    )
  }

  renderItem(quiz: Quiz) {
    return (
      <View style={$.item}>
        {this.renderQuiz(quiz)}
      </View>
    )
  }

  renderQuiz(quiz: Quiz) {
    return (
      <TouchableOpacity style={$.quiz} onPress={() => { this.props.onQuizPress(quiz) }}>
        <Label>{quiz.title}</Label>
      </TouchableOpacity>
    )
  }

}

const $ = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },

  listContentEmpty: {
    ...layout.center,
  },

  item: {
    borderBottomWidth: 4,
    borderBottomColor: colors.green
  },

  quiz: {
    padding: layout.padding.l
  }
})