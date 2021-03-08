import React, { useState, useRef } from "react";
const Airtable = require("airtable-node");
import Layout from "../../components/layout";
import Protected from "../../components/Protected";
import { graphql } from "gatsby";
import ResourceCard from "../../components/ResourceCard";
import "./community.scss";

async function fetchResources(refresher) {
  const airtable = await new Airtable({
    apiKey: process.env.GATSBY_AIRTABLE_API_KEY,
  })
    .base("appN5n5h3z6FsZU59")
    .table("resources");
  const { records } = await airtable.list();

  if (refresher) {
    refresher(records);
  }
}

async function deleteResource(id, refresher) {
  const airtable = await new Airtable({
    apiKey: process.env.GATSBY_AIRTABLE_API_KEY,
  })
    .base("appN5n5h3z6FsZU59")
    .table("resources");
  await airtable.delete(id);

  if (refresher) {
    refresher();
  }
}

async function createResource(fields, refresher) {
  const airtable = await new Airtable({
    apiKey: process.env.GATSBY_AIRTABLE_API_KEY,
  })
    .base("appN5n5h3z6FsZU59")
    .table("resources");
  await airtable.create({ fields });
  console.log("creating", fields);
  if (refresher) {
    refresher();
  }
}

async function updateResource(id, fields, refresher) {
  const airtable = await new Airtable({
    apiKey: process.env.GATSBY_AIRTABLE_API_KEY,
  })
    .base("appN5n5h3z6FsZU59")
    .table("resources");
  await airtable.update(id, { fields });
  console.log("updating", fields);
  if (refresher) {
    refresher();
  }
}

function collectOptions(select) {
  const selectedOptions = [...select.options]
    .filter((option) => option.selected)
    .map((option) => option.value);

  return selectedOptions;
}

function ResourceEditor({ data, location }) {
  const [selection, setSelection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [resources, setResources] = useState([]);

  const nameField = useRef(null);
  const phoneField = useRef(null);
  const websiteField = useRef(null);
  const tagsField = useRef(null);
  const featuredField = useRef(null);
  const publishedField = useRef(null);

  React.useEffect(() => {
    fetchResources(setResources);
  }, [refresh]);

  React.useEffect(() => {
    let resource = {};
    if (selection) {
      resource = { ...selectedItem };
    } else {
      resource = { fields: {} };
    }

    if (!nameField.current) {
      return;
    }

    nameField.current.value = resource.fields.Name || "";
    phoneField.current.value = resource.fields.phone || "";
    websiteField.current.value = resource.fields.website || "";
    tagsField.current.value = resource.fields.tags || [];
    featuredField.current.checked = resource.fields.featured || false;
    publishedField.current.checked = resource.fields.published || false;
  }, [selection, selectedItem]);

  function beginEditResource(id) {
    console.log("editing", id);
    setSelection(id);
    const resource = resources.find((resource) => resource.id === id);
    setSelectedItem(resource);
  }

  function changeHandler(event) {
    event.preventDefault();
    const newItem = { ...selectedItem };
    newItem[event.target.name] = event.target.value;
    setSelectedItem(newItem);
  }

  function acceptEditing(data) {
    const fields = {
      Name: nameField.current.value,
      phone: phoneField.current.value,
      website: websiteField.current.value,
      tags: collectOptions(tagsField.current),
      featured: featuredField.current.checked,
      published: publishedField.current.checked,
    };

    if (selection) {
      updateResource(selection, fields);
    } else {
      createResource(fields);
    }
    setRefresh((c) => c + 1);
    cancelEditing();
  }

  function cancelEditing() {
    setSelection(null);
    setSelectedItem(null);
    nameField.current.value = "";
    phoneField.current.value = "";
    websiteField.current.value = "";
    tagsField.current.value = "";
    featuredField.current.checked = false;
    publishedField.current.checked = false;
  }
  console.log(resources);
  return (
    <Protected>
      <Layout>
        <section className="resource-editor">
          <form>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              ref={nameField}
              onChange={changeHandler}
              value={selectedItem && selectedItem.name}
            />
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              ref={phoneField}
              value={selectedItem && selectedItem.phone}
            />
            <label htmlFor="website">Website</label>
            <input
              type="text"
              name="website"
              id="website"
              ref={websiteField}
              value={selectedItem && selectedItem.website}
            />
            <label htmlFor="tags">Tags</label>
            <select
              name="tags"
              id="tags"
              multiple
              ref={tagsField}
              value={selectedItem && selectedItem.tag}
            >
              <option value="Assistance">Assistance</option>
              <option value="Community">Community</option>
              <option value="Education">Education</option>
              <option value="Housing">Housing</option>
              <option value="Legal">Legal</option>
              <option value="Medical">Medical</option>
              <option value="Utilities">Utilities</option>
              <option value="Prayer">Prayer</option>
            </select>
            <label htmlFor="featured">Featured</label>
            <input
              type="checkbox"
              name="featured"
              id="featured"
              ref={featuredField}
              value={selectedItem && selectedItem.featured}
            />
            <label htmlFor="published">Published</label>
            <input
              type="checkbox"
              name="published"
              id="published"
              ref={publishedField}
              value={selectedItem && selectedItem.published}
            />
            <div className="button-group">
              <button type="button" onClick={cancelEditing}>
                Cancel
              </button>
              <button type="button" onClick={() => acceptEditing(data)}>
                {selection ? "Save" : "Add"}
              </button>
            </div>
          </form>
          <ul>
            <h1>Community Resources</h1>

            {resources &&
              resources.map((resource) => {
                const id = resource.id;
                resource = resource.fields;
                console.log("-->", resource);
                return (
                  <li key={id}>
                    <ResourceCard
                      id={id}
                      name={resource.Name}
                      phone={resource.phone}
                      tags={resource.tags || []}
                      website={resource.website}
                      featured={resource.featured}
                      published={resource.published}
                      forEditor={true}
                      selection={selection}
                      editor={beginEditResource}
                      deleter={(id) =>
                        deleteResource(id, () => setRefresh((c) => c + 1))
                      }
                    />
                  </li>
                );
              })}
          </ul>
        </section>
      </Layout>
    </Protected>
  );
}

export default ResourceEditor;
