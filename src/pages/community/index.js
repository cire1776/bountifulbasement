import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import ResourceCard from "../../components/ResourceCard";
import "./community.scss";

function Index({ data, location }) {
  const resources = data.allAirtable.nodes;
  const featured_resources = resources.filter(
    (resource) => resource.data.featured
  );
  const other_resources = resources.filter(
    (resource) => !resource.data.featured
  );

  return (
    <Layout>
      <section className="resources">
        {featured_resources.length !== 0 && (
          <h1>Special Community Resources</h1>
        )}
        <ul>
          {featured_resources.map((resource) => {
            return (
              <li key={resource.id || resource.data.Name}>
                <ResourceCard
                  name={resource.data.Name}
                  phone={resource.data.phone}
                  website={resource.data.website}
                  tags={resource.data.tags}
                  featured={true}
                />
              </li>
            );
          })}
        </ul>
        {other_resources.length !== 0 && <h1>Other Nearby Resources</h1>}
        <ul>
          {other_resources.map((resource) => {
            return (
              <li key={resource.id || resource.data.Name}>
                <ResourceCard
                  name={resource.data.Name}
                  phone={resource.data.phone}
                  website={resource.data.website}
                  tags={resource.data.tags}
                  featured={false}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}

export default Index;

export const pageQuery = graphql`
  query {
    allAirtable {
      nodes {
        data {
          Name
          website
          phone
          tags
          published
          featured
        }
      }
    }
  }
`;
