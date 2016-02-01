import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import {addFilter} from '../actions'

class SuggestionsBox extends Component {
  render () {
    const {addFilter, suggestedTags, suggestedPeople} = this.props
    const isEmpty = suggestedTags.length === 0 && suggestedPeople.length === 0
      ? ' is-empty'
      : ''
    return (
      <div className={'c-suggestion-box o-floating-panel' + isEmpty}>
        <SuggestionList
          key={'tags'}
          prefix='#'
          list={suggestedTags}
          classes={'c-filter-label--tag'}
          actionClick={addFilter}
        />
        <SuggestionList
          key={'people'}
          prefix='@'
          list={suggestedPeople}
          classes={'c-filter-label--people'}
          actionClick={addFilter}
        />
      </div>
    )
  }
}

SuggestionsBox.propTypes = {
  suggestedTags: PropTypes.array,
  suggestedPeople: PropTypes.array,
  addFilter: PropTypes.func
}

const SuggestionList = ({list, classes, actionClick, prefix}) => {
  if (list && list.length > 0) {
    return (
      <div className='o-hlist c-suggestion-box__group'>
        {list.map(t =>
          <Suggestion key={t} classes={classes} term={t} prefix={prefix} actionClick={actionClick}/>
        )}
      </div>
    )
  }
  return <span />
}

const Suggestion = ({term, classes, prefix = '', actionClick}) => {
  const c = ['c-filter-label'].concat([classes])
  return (
    <div
    className={c.join(' ')}
    onClick={() => actionClick(prefix + term)}
    >{term}</div>
  )
}

function mapStateToProps ({suggestedTags, suggestedPeople}) {
  return { suggestedTags, suggestedPeople }
}
export default connect(mapStateToProps, {addFilter})(SuggestionsBox)