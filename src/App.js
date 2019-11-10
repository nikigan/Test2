import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./header/Header";
import Search from "./search/Search";
import Videos from "./videos/Videos";
import Favorite from "./favorite/Favorite";
import Login from "./login/Login";
import axios from "axios";
import "./app.scss";

export default class App extends Component {
  state = {
    videosList: [],
    query: "",
    loggedIn: localStorage.getItem("userToken") != null,
    maxCount: 12,
    sortBy: ""
  };

  userDB = [
    {
      id: 1,
      login: "admin",
      password: "admin",
      userToken: "OJyqjbs714bsFG",
      favorite: [
        {
          query: "cats",
          name: "котики",
          maxCount: 3,
          sortBy: "viewCount"
        },
        {
          query: "Кто хочет стать миллионером",
          name: "Кто хочет стать миллионером",
          maxCount: 20,
          sortBy: "viewCount"
        }
      ]
    },
    {
      id: 2,
      login: "user",
      password: "user",
      userToken: "dqknDJOSG234f",
      favorite: [
        {
          query: "dogs",
          name: "Cобакены",
          maxCount: 25,
          sortBy: "viewCount"
        },
        {
          query: "Dogs fails",
          name: "Собачьи фейлы онлайн без регистрации",
          maxCount: 25,
          sortBy: "viewCount"
        }
      ]
    }
  ];

  addFavorite = (user, favorite) => {
    this.userDB.find(u => u.id === user).favorite.push(favorite);
  };

  changeFavorite = (oldFavorite, favorite) => {
    const { id: userId } = this.userDB.find(
      u => u.userToken === localStorage.getItem("userToken")
    );
    let dbFavorite = this.userDB.find(u => u.id === userId).favorite;
    let index = dbFavorite.indexOf(oldFavorite);
    dbFavorite.splice(index, 1, favorite);
  };

  clearVideos = () => {
    this.setState({
      query: "",
      videosList: []
    });
  };

  auth = () => {
    const ls = localStorage.getItem("userToken") != null;
    if ((!this.state.loggedIn && ls) || (this.state.loggedIn && !ls)) {
      this.setState({
        loggedIn: ls
      });
    }

    return ls;
  };

  saveFavorite = ({ query, name = "", maxCount = 12, sortBy = "" }) => {
    const { id: userId } = this.userDB.find(
      u => u.userToken === localStorage.getItem("userToken")
    );

    this.addFavorite(userId, {
      query,
      name,
      maxCount,
      sortBy
    });
  };

  searchVideos = (query, maxResults, sortBy = "") => {
    const order = sortBy ? `&order=${sortBy}` : "";
    const api = "AIzaSyCxcy1JDwtULXbfka4bF-4_H818EuFe24o";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&maxResults=${maxResults}&key=${api}${order}`;
    axios
      .get(url)
      .then(({ data: { items } }) => {
        this.setState({
          videosList: items.map(item => ({
            snippet: item.snippet,
            url: `https://www.youtube.com/embed/${item.id.videoId}`
          }))
        });
      })
      .catch(res => {
        console.log(res.message);
      });
  };

  gotVideosHandler = value => {
    this.setState(() => {
      return {
        query: value
      };
    });
    this.searchVideos(value, this.state.maxCount);
  };

  onExecute = ({ query, maxCount, sortBy }) => {
    this.setState({
      query: query,
      maxCount: maxCount,
      sortBy: sortBy
    });
    this.searchVideos(query, maxCount, sortBy);
  };

  render() {
    let login = "";
    if (this.state.loggedIn) {
      login = this.userDB.find(
        u => u.userToken === localStorage.getItem("userToken")
      ).login;
    }
    return (
      <Router>
        {this.state.loggedIn && (
          <Header onLogOut={this.auth} username={login} />
        )}
        <Route
          path="/(search|)/"
          render={() => {
            return (
              <React.Fragment>
                <Search
                  onGotVideos={this.gotVideosHandler}
                  query={this.state.query}
                  maxCount={this.state.maxCount}
                  sortBy={this.state.sortBy}
                  loggedIn={this.auth()}
                  onLike={this.saveFavorite}
                  onClose={this.clearVideos}
                />
                {this.state.videosList && (
                  <Videos
                    videos={this.state.videosList}
                    query={this.state.query}
                  />
                )}
              </React.Fragment>
            );
          }}
        />
        <Route
          path="/favorite"
          render={() => {
            return (
              <Favorite
                data={this.userDB}
                onExecute={this.onExecute}
                onChangeFavorite={this.changeFavorite}
                loggedIn={this.auth()}
              />
            );
          }}
        />
        <Route
          path="/login"
          render={() => {
            return (
              <Login
                onMount={this.clearVideos}
                onLogin={this.auth}
                data={this.userDB}
                loggedIn={this.state.loggedIn}
              ></Login>
            );
          }}
        />
      </Router>
    );
  }
}
