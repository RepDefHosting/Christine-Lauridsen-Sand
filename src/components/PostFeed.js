import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import PostCard from './PostCard'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { addTrailingSlash } from '../utils'
import { featuredImagePropTypes } from '../proptypes'

const Moment = moment().constructor

const PostFeed = ({ isPreview, posts }) => (
  <Fragment>
    {!isPreview && !!posts && !!posts.length && (
      <Fragment>
        {posts.map(({ image, slug, pageTitle, date, teaser }, index) => {
          return (
            <PostCard
              key={uuidv4()}
              count={index}
              image={image}
              slug={addTrailingSlash(slug)}
              pageTitle={pageTitle}
              date={date}
              teaser={teaser}
            />
          )
        })}
      </Fragment>
    )}

    {!isPreview && (!posts || !posts.length) && (
      <div>No posts yet. Please check back again soon!</div>
    )}
    {!!isPreview && (
      <div>Your posts will appear here in reverse chronological order</div>
    )}
  </Fragment>
)

PostFeed.propTypes = {
  isPreview: PropTypes.bool,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      image: featuredImagePropTypes,
      slug: PropTypes.string,
      pageTitle: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Moment),
      teaser: PropTypes.string,
    }),
  ),
}

export default PostFeed
