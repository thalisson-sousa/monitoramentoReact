import { Container } from './styles';
import { Link } from 'react-router-dom';

export default function SidebarItem({ Icon, Text, to }) {
  return (
    <Container>
      <Link to={to} style={{textDecoration: "none", color: "white"}}>
        <Icon style={{marginRight: "10px"}} />
        {Text}
      </Link>
    </Container>
  );
}
