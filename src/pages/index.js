import * as React from "react"
import { Link, graphql } from "gatsby"
import { Email } from "../components/email"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li className="post-list-item" key={post.fields.slug}>
              <article itemScope itemType="http://schema.org/Article">
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <p>
                    <small>{post.frontmatter.date}</small>
                  </p>
                  {post.frontmatter.site && (
                    <p>
                      <small>Guest post at {post.frontmatter.site}</small>
                    </p>
                  )}
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
        <li className="contact-list-item">
          <article>
            <header>
              <h2>Subscribe</h2>
            </header>
            <p>
              Get notified whenever I post and get it sent straight to your
              inbox
            </p>
            <Email />
            <p>
              I promise I won't send spam 😇. You can unsubscribe at any time.
            </p>
          </article>
        </li>
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          site
        }
      }
    }
  }
`
