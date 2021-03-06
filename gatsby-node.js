const path = require('path');

exports.createPages = async ({ reporter, actions, graphql }) => {
  const { createPage } = actions;
  const workTemplate = path.resolve(`./src/templates/work.js`);

  const result = await graphql(`
    {
      allPrismicImagecollection {
        nodes {
          uid
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running graphql query`);
    return;
  }

  result.data.allPrismicImagecollection.nodes.forEach((node) => {
    createPage({
      path: `/work/${node.uid}`,
      component: workTemplate,
      context: {
        uid: node.uid,
      },
    });
  });
};
