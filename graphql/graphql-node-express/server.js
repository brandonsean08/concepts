/**
 * Defining all imports needed for the server
 */
const express = require("express");
var { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

/**
 * Defining the type systems (GraphQL schema) for the server for the cliwent to validate against
 */
var schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

/**
 * Function to retrive a specific course given its ID
 * @param {*} args
 */
const getCourse = function (args) {
  const id = args.id;
  return coursesData.filter((course) => {
    return course.id == id;
  })[0];
};

/**
 * Function to retirve a list of courses given a specific topic
 * @param {*} args
 */
const getCourses = function (args) {
  const courseTopic = args.topic;
  if (courseTopic) {
    return coursesData.filter((course) => {
      return course.topic == courseTopic;
    });
  } else {
    return coursesData;
  }
};

/**
 * Function to update the topic of a given course
 * @param {*} args
 */
const updateCourseTopic = function ({ id, topic }) {
  coursesData.map((course) => {
    if (course.id == id) {
      course.topic = topic;
      return course;
    }
  });
  return coursesData.filter((course) => {
    return course.id === id;
  })[0];
};

/**
 * Create resolver that will execute each time our Query is run
 */
var root = {
  course: getCourse,
  courses: getCourses,
  updateCourseTopic: updateCourseTopic,
};

/**
 * Create Express server and attach the GraphQl endpoint
 */
const app = express();
//Attach graphql middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

/**
 * Starting the server on port 4000
 */
app.listen(4000, () =>
  console.log("Express graphQL server is now running on localhost:4000/graphql")
);

/**
 * Defining the dummy data for the courses. Didn't want to use a database for this tutorial
 */
var coursesData = [
  {
    id: 1,
    title: "The Complete Node.js Developer Course",
    author: "Andrew Mead, Rob Percival",
    description:
      "Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs/",
  },
  {
    id: 2,
    title: "Node.js, Express & MongoDB Dev to Deployment",
    author: "Brad Traversy",
    description:
      "Learn by example building & deploying real-world Node.js applications from absolute scratch",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs-express-mongodb/",
  },
  {
    id: 3,
    title: "JavaScript: Understanding The Weird Parts",
    author: "Anthony Alicea",
    description:
      "An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.",
    topic: "JavaScript",
    url: "https://codingthesmartway.com/courses/understand-javascript/",
  },
];

/**
 * Example Queries to use on the graphiql user interface:
 * 
 * 1) Select the title and author for the book with ID 2
 * 
                query getSingleCourse($courseID: Int!) {
                    course(id: $courseID) {
                        title
                        author
                    }
                }

    2) Select all of the courses for a given topic

                query getCoursesForTopic($courseTopic: String!) {
                    courses(topic: $courseTopic) {
                        title
                        author
                    }
                }

    3) Using Fragments to make multiple queries

                query getCoursesWithFragments($courseId1: Int!, $courseId2: Int!) {
                    course1: course(id: $courseId1) {
                      ...courseFields
                    }
                    course2: course(id: $courseId2) {
                      ...courseFields
                    }
                }

                fragment courseFields on Course {
                  title
                  author
                  description
                  topic
                  url
                }
 */
