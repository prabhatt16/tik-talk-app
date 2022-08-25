import React, { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import Avatar from "@material-ui/core/Avatar";
import "./Header.css";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Menu, MenuItem } from "@material-ui/core";
import { IoMdPerson } from "react-icons/io";
import { useHistory } from "react-router";
import { BiLogOut, BiLogOutCircle } from "react-icons/bi";
function Header() {
  const [user] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [searchItem, setSearchItem] = useState("");
  const [channels, setChannels] = useState([]);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const SignOut = async () => {
    await auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("logOut");
        history.push("/signin");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  const getChannels = async () => {
    await db.collection("rooms").onSnapshot((snapShot) => {
      setChannels(
        snapShot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
  };

  const onClickSearchItem = (id) => {
    if (id) {
      history.push(`/searchPage/${id}`);
      console.log(id);
    } else {
      console.log("failed to push");
    }
    setSearchItem("");
  };

  useEffect(() => {
    getChannels();
  }, []);
  return (
    <div className="header">
      <div className="header-profile">
        <Avatar alt={user?.displayName} src={user?.photoURL} />
      </div>
      <div className="nav_center">
        <div className="inputSearchArea">
          <input
            type="text"
            name="searchText"
            placeholder="search channels"
            value={searchItem}
            onChange={(event) => setSearchItem(event.target.value)}
          />
        </div>
        <div className="searchList">
          {user &&
            channels
              .filter(({ id: id, data: { name } }) => {
                if (searchItem == "") {
                  return;
                } else if (
                  name.toLowerCase().includes(searchItem.toLocaleLowerCase())
                ) {
                  return name;
                }
              })
              .map(({ id: id, data: { name } }) => {
                return (
                  <div className="searchItems" key={id}>
                    #<p
                      onClick={() => onClickSearchItem(id)}
                      className="searchItem"
                    >
                      {name}
                    </p>
                  </div>
                );
              })}
        </div>
      </div>
      <div className="right-header">
        <BiLogOutCircle className="headerIcon" onClick={handleClick} />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose} style={{ backgroundColor: "white" }}>
            <BiLogOut style={{ marginRight: "10px" }} />
            <p onClick={SignOut}>{user ? "Logout" : "Login"}</p>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
