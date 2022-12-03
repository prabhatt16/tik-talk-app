import React, { useEffect, useState } from "react";
import { RiMessage3Line } from "react-icons/ri";
import { MdFiberManualRecord, MdEdit } from "react-icons/md";
import { IoIosAdd, IoIosBrowsers, IoMdPeople } from "react-icons/io";
import { GoMention } from "react-icons/go";
import { HiOutlineSave } from "react-icons/hi";
import { BsFiles } from "react-icons/bs";
import { RiAppsLine } from "react-icons/ri";
import { BiSitemap } from "react-icons/bi";
import "../components/Sidebar.css";
import SidebarOption from "./SidebarOption";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar() {
  const [user] = useAuthState(auth);

  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      )
    );
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_info">
          <h3>{user?.email}</h3>
          <h2>
            <MdFiberManualRecord className="active_icon" />
            {user?.displayName}
          </h2>
        </div>
        <MdEdit />
      </div>
      <SidebarOption Icon={RiMessage3Line} title="Threads" />
      <SidebarOption Icon={GoMention} title="Mentions" />
      <SidebarOption Icon={HiOutlineSave} title="Saved items" />
      <SidebarOption Icon={IoIosBrowsers} title="Channel browser" />
      <SidebarOption Icon={BsFiles} title="File browser" />
      <div className="hl" />
      <SidebarOption Icon={BiSitemap} title="Channels" />
      <div className="hl" />
      <SidebarOption Icon={IoIosAdd} addChannelOption title="Add channel" />
      <div className="channelArea">
        {channels.map((channel) => (
          <SidebarOption
            title={channel.name}
            id={channel.id}
            key={channel.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
