import * as React from 'react'
import {StyleSheet, View, FlatList} from 'react-native'
import {observer} from 'mobx-react'
import {quizStore, Quiz} from '@src/stores'
import {colors, layout} from '@ui/styles'
import {Label, ListRow} from '@ui/components'
import {images} from '@res'

export interface Props {
  style?:      ViewStyleProp
  onQuizPress: (quiz: Quiz) => any
}

interface State {
  refreshing:    boolean
  scrollEnabled: boolean
}

@observer
export default class QuizList extends React.Component<Props, State> {

  state: State = {
    refreshing:    false,
    scrollEnabled: true
  }

  componentDidMount() {
    quizStore.quizzes.fetch()
  }

  async refresh() {
    this.setState({refreshing: true})
    await quizStore.quizzes.fetch()
    this.setState({refreshing: false})
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
        scrollEnabled={this.state.scrollEnabled}

        onRefresh={() => { this.refresh() }}
        refreshing={this.state.refreshing}
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
        <ListRow
          icon={<images.trophy color={colors.fg.dim}/>}
          caption={quiz.title}
          accessory='chevronRight'
          actions={[
            {
              color:   colors.red,
              icon:    'trash',
              label:   "DELETE",
              onPress: this.onDeleteQuiz.bind(null, quiz)
            }
          ]}
          onPress={() => { this.props.onQuizPress(quiz) }}

          onSwipeStart={() => { console.log("START"); this.setState({scrollEnabled: false}) }}
          onSwipeEnd={() => { console.log("END"); this.setState({scrollEnabled: true}) }}
        />
      </View>
    )
  }

  onDeleteQuiz = (quiz: Quiz) => {
    quizStore.quizzes.delete(quiz.id!)
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
  }
})