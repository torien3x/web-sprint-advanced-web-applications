import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axios from 'axios'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

const ProtectedRoute = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState(null)
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    localStorage.removeItem('token');
    setMessage("Goodbye!");
    navigate('/');
  }

  const login = async ({ username, password }) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    try {
      const response = await axios.post(`${loginUrl}`, {username, password});
      setMessage(response.data.message)
      localStorage.setItem('token', response.data.token)
    } catch (error) {
      console.error("There was an error!", error);
      alert('Failed to add user');
    }


    // HERE YOU PUT THE NAVIGATE FUNCTIONALITY
    navigate('articles');

  }

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
    const fetchData = async () => {


      const authToken = localStorage.getItem('token')
        
        // Set up the authorization header
        const config = {
          headers: {
            Authorization: authToken
          }}
      try {
        setSpinnerOn(true)
        const response = await axios.get(`${articlesUrl}`, config);
          setArticles(response.data.articles);
          setMessage(response.data.message)
      } catch (error) {
        console.error('There was an error fetching the data:', error);
      } finally {
        setSpinnerOn(false)
      }
    };

    fetchData();
  }

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    const authToken = localStorage.getItem('token')
        
        // Set up the authorization header
        const config = {
          headers: {
            Authorization: authToken
          }}
    axios.post(`${articlesUrl}`,  article, config)
    .then((res) => {
      const articleCopy = [...articles, article]
      setArticles(articleCopy)
      setMessage(res.data.message)
    })
    .catch(error =>  console.error("There was an error!", error))

  }

  const updateArticle = async ({ article_id, article }) => {
    try {
        const authToken = localStorage.getItem('token');

        const config = {
            headers: {
                Authorization: authToken
            }
        };

        const response = await axios.put(`${articlesUrl}/${article_id}`, article, config);

        // Assuming articles state contains the list of articles
        const index = articles.findIndex(article => article.article_id === article_id);
        
        if (index !== -1) { // If the article with the given article_id is found
            const updatedArticles = [...articles];
            updatedArticles[index] = response.data.article; // Update the article at the found index with the updated article data
            setArticles(updatedArticles); // Update the articles state with the updated list of articles
        }

        setMessage(response.data.message); // Set the success message

        return true; // Indicate success
    } catch (error) {
        console.error('Error updating article:', error);
        return false; // Indicate failure
    }
};

  const deleteArticle = (article_id) => {
    // Get the authorization token from local storage
    const authToken = localStorage.getItem('token');
  
    // Set up the authorization header
    const config = {
      headers: {
        Authorization: authToken
      }
    };
    axios.delete(`${articlesUrl}/${article_id}`, config)
      .then(response => {
        const updatedArticles = articles.filter(article => article.article_id !== article_id);
        setArticles(updatedArticles);
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error deleting article:', error);
      });
  };

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn}/>
      <Message message={message}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login}/>} />
          <Route render={() => <Navigate to="/" />} />
          <Route
          path="/articles"
          element={
            <ProtectedRoute token={localStorage.getItem('token')}>
                  <ArticleForm
                    postArticle={postArticle}
                    getArticles={getArticles}
                    updateArticle={updateArticle}
                    currentArticleId={currentArticleId}
                    setCurrentArticleId={setCurrentArticleId}

                  />
                  <Articles
                    articles={articles}
                    getArticles={getArticles}
                    deleteArticle={deleteArticle}
                    setCurrentArticleId={setCurrentArticleId}
                  />
            </ProtectedRoute>
          }
        />
    </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}

    
  
