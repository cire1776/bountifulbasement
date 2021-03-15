import React, { useState } from "react";
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
  function filterResources(resource) {
    const result = resource.data.tags.some((tag) => filter.includes(tag));
    return result;
  }

  function toggleFilter(tag) {
    var index = filter.indexOf(tag);

    if (index === -1) {
      filter.push(tag);
    } else {
      filter.splice(index, 1);
    }

    setFilter([...filter]);
  }

  function isSelected(tag) {
    return filter.includes(tag);
  }

  const [filter, setFilter] = useState([]);
  const resources = data.allAirtable.nodes;
  let featured_resources = resources.filter(
    (resource) => resource.data.featured
  );
  let other_resources = resources.filter((resource) => !resource.data.featured);

  if (filter.length !== 0) {
    featured_resources = featured_resources.filter(filterResources);
    other_resources = other_resources.filter(filterResources);
  }

  React.useEffect(() => {}, [filter]);

  return (
    <Layout title="Resources">
      <section className="resources">
        <header>
          <h1>Click Resource Type to Filter</h1>
        </header>
        <ul className="legend">
          <li
            className={isSelected("Assistance") ? "selected" : undefined}
            onClick={() => toggleFilter("Assistance")}
          >
            <FontAwesomeIcon icon={faHandsHelping} size="1x" /> - Assistance
          </li>
          <li
            className={isSelected("Community") ? "selected" : undefined}
            onClick={() => toggleFilter("Community")}
          >
            <FontAwesomeIcon icon={faUsers} size="1x" /> - Community
          </li>
          <li
            className={isSelected("Education") ? "selected" : undefined}
            onClick={() => toggleFilter("Education")}
          >
            <FontAwesomeIcon icon={faGraduationCap} size="1x" /> - Education
          </li>
          <li
            className={isSelected("Food") ? "selected" : undefined}
            onClick={() => toggleFilter("Food")}
          >
            <FontAwesomeIcon icon={faAppleAlt} size="1x" /> - Food
          </li>
          <li
            className={isSelected("Housing") ? "selected" : undefined}
            onClick={() => toggleFilter("Housing")}
          >
            <FontAwesomeIcon icon={faHome} size="1x" /> - Housing
          </li>
          <li
            className={isSelected("Legal") ? "selected" : undefined}
            onClick={() => toggleFilter("Legal")}
          >
            <FontAwesomeIcon icon={faGavel} size="1x" /> - Legal
          </li>
          <li
            className={isSelected("Meals") ? "selected" : undefined}
            onClick={() => toggleFilter("Meals")}
          >
            <FontAwesomeIcon icon={faUtensils} size="1x" /> - Meals
          </li>
          <li
            className={isSelected("Medical") ? "selected" : undefined}
            onClick={() => toggleFilter("Medical")}
          >
            <FontAwesomeIcon icon={faUserMd} size="1x" /> - Medical
          </li>
          <li
            className={isSelected("Prayer") ? "selected" : undefined}
            onClick={() => toggleFilter("Prayer")}
          >
            <FontAwesomeIcon icon={faPrayingHands} size="1x" /> - Prayer
          </li>
          <li
            className={isSelected("Rights") ? "selected" : undefined}
            onClick={() => toggleFilter("Rights")}
          >
            <FontAwesomeIcon icon={faBalanceScale} size="1x" /> - Tenant Rights
          </li>{" "}
          <li
            className={isSelected("Utilities") ? "selected" : undefined}
            onClick={() => toggleFilter("Utilities")}
          >
            <FontAwesomeIcon icon={faBolt} size="1x" /> - Utilities
          </li>
        </ul>
        <footer>
          <h1 onClick={() => setFilter([])}>Clear</h1>
        </footer>
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
        id
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
