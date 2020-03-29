import React from 'react'

export default (props) => {
  console.log(props)
  let { history, match: { params } } = props
  console.log(params)
  return (
    <div>文章详情</div>
  )
}