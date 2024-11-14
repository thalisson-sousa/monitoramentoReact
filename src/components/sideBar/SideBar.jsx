import { Container, Content } from "./styles";
import {
  FaTimes,
  FaHome,
  FaRegSun,
  FaUserAlt,
  FaRegFileAlt,
  FaChartBar,
  FaGoogleDrive,
  FaDoorOpen,
  FaFire,
} from "react-icons/fa";

import styles from "./SideBar.module.css";

import SidebarItem from "../sideBarItem/SideBarItem";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ active }) {
  const { logout } = useAuth();

  function closeSidebar() {
    active(false);
  }

  function logOut() {
    logout();
  }

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <SidebarItem Icon={FaHome} Text="Dashboard" to="/" />
        <SidebarItem Icon={FaUserAlt} Text="Users" to="/user" />
        <SidebarItem Icon={FaFire} Text="Firewalls" to="/firewalls" />
        <SidebarItem Icon={FaGoogleDrive} Text="Links" to="/links" />
        <SidebarItem Icon={FaChartBar} Text="Statistics" to="/" />
        <SidebarItem Icon={FaRegFileAlt} Text="Reports" to="/" />
        <SidebarItem Icon={FaRegSun} Text="Settings" to="/" />
        <div className={styles.logoutButton}  onClick={logOut}>
          <FaDoorOpen />
          <p>Logout</p>
        </div>
      </Content>
    </Container>
  );
}
