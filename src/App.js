import logo from './logo.svg';
import './App.css';
import { Auth, API, graphqlOperation } from 'aws-amplify'
import awsconfig from './aws-exports'
import { AmplifySignOut,  withAuthenticator } from '@aws-amplify/ui-react'
import * as queries from './graphql/queries'
import * as mutations from './graphql/mutations'

Auth.configure(awsconfig)
API.configure(awsconfig)

function App() {

  const allTodos = API.graphql(graphqlOperation(queries.listTodos))
  const oneTodo = API.graphql(graphqlOperation(queries.getTodo, {id: 'abf16ffc-e9ff-463b-8f1d-177befb846bc' }))

  console.log(oneTodo);

  Auth.currentAuthenticatedUser({ bypassCache: false })
    .then((user) => {
      console.log(`User: ${JSON.stringify(user)}`);
      const todo = { name: user['username'], description: "bear5's description" }
      const newTodo = API.graphql(graphqlOperation(mutations.createTodo, {input: todo }))
    })
    .catch(err => console.log(err))

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator(App);
