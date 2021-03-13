import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import ResourceCard from "../../components/ResourceCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsHelping, // assistance
  faUsers, // community
  faGraduationCap, // education
  faAppleAlt, // food
  faHome, // housing
  faGavel, // legal
  faUtensils, // meals
  faUserMd, // medical
  faPrayingHands, // prayer
  faBalanceScale,
  faBolt, // utilities
} from "@fortawesome/free-solid-svg-icons";
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
    <Layout title="Resources">
      <section className="resources">
        <ul className="legend">
          <li>
            <FontAwesomeIcon icon={faHandsHelping} size="1x" /> - Assistance
          </li>
          <li>
            <FontAwesomeIcon icon={faUsers} size="1x" /> - Community
          </li>
          <li>
            <FontAwesomeIcon icon={faGraduationCap} size="1x" /> - Education
          </li>
          <li>
            <FontAwesomeIcon icon={faAppleAlt} size="1x" /> - Food
          </li>
          <li>
            <FontAwesomeIcon icon={faHome} size="1x" /> - Housing
          </li>
          <li>
            <FontAwesomeIcon icon={faGavel} size="1x" /> - Legal
          </li>
          <li>
            <FontAwesomeIcon icon={faUtensils} size="1x" /> - Meals
          </li>
          <li>
            <FontAwesomeIcon icon={faUserMd} size="1x" /> - Medical
          </li>
          <li>
            <FontAwesomeIcon icon={faPrayingHands} size="1x" /> - Prayer
          </li>
          <li>
            <FontAwesomeIcon icon={faBalanceScale} size="1x" /> - Tenant Rights
          </li>{" "}
          <li>
            <FontAwesomeIcon icon={faBolt} size="1x" /> - Utilities
          </li>
        </ul>
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
