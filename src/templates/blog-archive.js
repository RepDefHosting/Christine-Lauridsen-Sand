import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { Layout, PostFeed } from '../components'
import { postPropTypes } from '../components/PostCard'
import { featuredImagePropTypes } from '../proptypes'
import { seoProps, getValidDates, addTrailingSlash } from '../utils'
import Banner from '../components/Banner'
import { useSiteData } from '../hooks'

export const BlogArchiveTemplate = ({
  profileImage,
  header,
  subheader,
  posts,
  featuredImage,
  isPreview,
  profileButton
}) => {
  const featuredImageSrc = isPreview ? featuredImage.src : !!featuredImage && !!featuredImage.d && !!featuredImage.d.childImageSharp && !!featuredImage.d.childImageSharp.fluid && !!featuredImage.d.childImageSharp.fluid.src ? featuredImage.d.childImageSharp.fluid.src : '/img/pic-executive-banner-blog-01.webp'

  return (
    <Fragment>
      <section className="sec-hero-sml">
        <Banner
          header={header}
          subheader={''}
          imageSrc={featuredImageSrc}
          imageAlt={!!featuredImage && !!featuredImage.alt ? featuredImage.alt : header}
          profileImage={!!profileImage ? profileImage : null}
        />
      </section>

      <section className="sec-article-list">
        <div className="pg-width">
          <div className="content">
            <div className="all-articles">
              <PostFeed isPreview={isPreview} posts={posts} />
            </div>
            <div class="btn-row">
              {!!profileButton && (
                <Link className="btn-primary" to={addTrailingSlash(profileButton.link)}>
                  {profileButton.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

const BlogArchive = ({ data }) => {
  const { profileImage } = useSiteData()
  const { header, subheader, featuredImage, profileButton } = data.markdownRemark.frontmatter
  const posts = data.allMarkdownRemark.edges.map(({ node }) => {
    const {
      frontmatter: { featuredImage, pageTitle, date: userDate, teaser },
      fields: { slug, gitAuthorTime, gitCreatedTime },
    } = node
    const { date } = getValidDates(userDate, gitAuthorTime, gitCreatedTime)
    return {
      image: !!featuredImage ? featuredImage : null,
      slug,
      pageTitle,
      date,
      teaser,
    }
  })
  const pageProps = {
    profileImage,
    header,
    subheader,
    featuredImage,
    posts,
    profileButton,
  }

  return (
    <Layout seoProps={seoProps(data)}>
      <BlogArchiveTemplate {...pageProps} />
    </Layout>
  )
}

BlogArchiveTemplate.propTypes = {
  profileImage: PropTypes.object,
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.shape(postPropTypes)),
  featuredImage: featuredImagePropTypes,
  isPreview: PropTypes.bool,
  profileButton: PropTypes.shape({
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
}

export default BlogArchive

export const pageQuery = graphql`
  query BlogArchiveTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "blog-archive" } }) {
      fields {
        slug
        gitAuthorTime
        gitCreatedTime
      }
      frontmatter {
        templateKey
        pageTitle
        metaDescription
        schemaType
        header
        subheader
        profileButton {
          link
          label
        }
        featuredImage {
          src {
            childImageSharp {
              fluid {
                originalName
              }
              original {
                height
                width
              }
            }
          }
          d: src {
            childImageSharp {
              fluid(maxWidth: 1440, maxHeight: 270, quality: 100, cropFocus: CENTER) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          m: src {
            childImageSharp {
              fluid(maxWidth: 720, maxHeight: 270, quality: 100, cropFocus: CENTER) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          square: src {
            childImageSharp {
              fluid(maxWidth: 270, maxHeight: 270, quality: 100, cropFocus: CENTER) {
                ...GatsbyImageSharpFluid_withWebp
                originalName
              }
              original {
                height
                width
              }
            }
          }
          alt
          caption
        }
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          published: { eq: true }
        }
      }
    ) {
      edges {
        node {
          fields {
            slug
            gitAuthorTime
            gitCreatedTime
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            pageTitle
            teaser
            featuredImage {
              src {
                childImageSharp {
                  fluid {
                    originalName
                  }
                  original {
                    height
                    width
                  }
                }
              }
              m: src {
                childImageSharp {
                  fluid(maxWidth: 720, maxHeight: 270, quality: 100, cropFocus: CENTER) {
                    ...GatsbyImageSharpFluid_withWebp
                    originalName
                  }
                  original {
                    height
                    width
                  }
                }
              }
              d: src {
                childImageSharp {
                  fluid(maxWidth: 1440, maxHeight: 270, quality: 100, cropFocus: CENTER) {
                    ...GatsbyImageSharpFluid_withWebp
                    originalName
                  }
                  original {
                    height
                    width
                  }
                }
              }
              square: src {
                childImageSharp {
                  fluid(maxWidth: 270, maxHeight: 270, quality: 100, cropFocus: CENTER) {
                    ...GatsbyImageSharpFluid_withWebp
                    originalName
                  }
                  original {
                    height
                    width
                  }
                }
              }
              alt
              caption
            }
          }
        }
      }
    }
  }
`
