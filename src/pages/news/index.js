import React from "react";
import { Link, graphql } from "gatsby";
import "./blog.scss";
import Img from "gatsby-image";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;
  const logo = data.logo.childImageSharp.fixed;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <ol className="blog-list" style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const title = post.frontmatter.title || post.fields.slug;
          const featuredImage =
            post.frontmatter.featured_image?.childImageSharp?.fixed;

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  {featuredImage ? (
                    <Img fixed={featuredImage} />
                  ) : (
                    <Img fixed={logo} />
                  )}
                  <section className="post-header">
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>{post.frontmatter.date}</small>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </header>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    logo: file(relativePath: { eq: "bountifulbasementlogo.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(fromNow: true)
          title
          description
          featured_image {
            childImageSharp {
              fixed(width: 150, height: 150) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`;
